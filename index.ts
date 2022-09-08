module Jsonarch
{
    const isConsoleMode = typeof window !== 'undefined';
    const fs = isConsoleMode ? require("fs"): undefined;
    export const schema = "https://raw.githubusercontent.com/wraith13/jsonarch/master/json-schema.json#";
    export type JsonableValue = null | boolean | number | string;
    export interface JsonableObject
    {
        [key: string]: undefined | Jsonable;
    }
    export type Jsonable = JsonableValue | Jsonable[] | JsonableObject;
    export type JsonablePartial<Target> = { [key in keyof Target]?: Target[key] } & JsonableObject;
    export const jsonStringify = <T extends Jsonable>(source: T, replacer?: (this: any, key: string, value: any) => any, space?: string | number) => JSON.stringify(source, replacer, space);
    export const jsonParse = <T extends Jsonable = Jsonable>(text: string, reviver?: (this: any, key: string, value: any) => any) => JSON.parse(text, reviver) as T;
    export const objectKeys = <T extends JsonableObject>(target: T) => Object.keys(target) as (keyof T & string)[];
    interface JsonarchBase extends JsonableObject
    {
        $arch: string;
    }
    export const isJsonarchBase = (template: Jsonable): template is JsonarchBase =>
        null !== template &&
        "object" === typeof template &&
        "$arch" in template &&
        "string" === typeof template.$arch;
    export type FilePathCategory = "none" | "net" | "local";
    export interface NoneFileContext
    {
        category: "none";
        data: string;
    }
    export interface NetFileContext
    {
        category: "net";
        path: string;
    }
    export interface LocalFileContext
    {
        category: "local";
        path: string;
    }
    export type FileContext = NoneFileContext | NetFileContext | LocalFileContext;
    export const isNoneFileContext = (file: FileContext): file is NoneFileContext => "none" === file.category;
    export const isNetFileContext = (file: FileContext): file is NetFileContext => "net" === file.category;
    export const isLocalFileContext = (file: FileContext): file is LocalFileContext => "local" === file.category;
    export interface Context
    {
        template: FileContext;
        paremter: FileContext;
        setting: FileContext;
    }
    export interface Cache extends JsonarchBase
    {
        $arch: "cache";
        json?: { [path: string]: Jsonable };
        values?: { [key: string]: Jsonable; };
        templates?: { [key: string]: Jsonable; };
    }
    interface Setting extends JsonarchBase
    {
        $arch: "setting";
        language?: string;
        indent?: "minify" | "tab" | number;
        timeout?: number;
        profile?: boolean;
        trace?: "stdout" | "stderr" | boolean;
        originMap?: false | "template" | "parameter" | "both";
        influenceMap?: false | "template" | "parameter" | "both";
        callGraph?: boolean;
        cache?: Cache;
    }
    interface LoadEntry<ContextType extends FileContext = FileContext>
    {
        setting: Setting;
        handler: Handler;
        file: ContextType;
    }
    export const isNoneFileLoadEntry = (entry: LoadEntry): entry is LoadEntry<NoneFileContext> => isNoneFileContext(entry.file);
    export const isNetFileLoadEntry = (entry: LoadEntry): entry is LoadEntry<NetFileContext> => isNetFileContext(entry.file);
    export const isLocalFileLoadEntry = (entry: LoadEntry): entry is LoadEntry<LocalFileContext> => isNetFileContext(entry.file);
    interface Handler
    {
        load?: (entry: LoadEntry<NetFileContext | LocalFileContext>) => Promise<string>;
    }
    interface EvaluateEntry<TemplateType>
    {
        context: Context;
        template: TemplateType;
        parameter:Jsonable;
        setting: Setting;
        handler: Handler;
    }
    interface CompileEntry extends Context
    {
        handler: Handler;
    }
    export const isEvaluateTargetEntry = (entry: EvaluateEntry<Jsonable>): entry is EvaluateEntry<JsonarchBase> =>
        isJsonarchBase(entry.template);
    export const isJsonarch = <Type extends JsonarchBase>(type: Type["$arch"]) =>
        ((template: Jsonable): template is Type =>
            isJsonarchBase(template) && type === template.$arch);
    interface Result extends JsonarchBase
    {
        $arch: "result";
        output: Jsonable;
        profile?: any;
        trace?: any;
        originMap?: any;
        influenceMap?: any;
        callGraph?: any;
        cache?: Cache;
    }
    export const loadNetFile = (entry: LoadEntry<NetFileContext>): Promise<string> => new Promise<string>
    (
        (resolve, reject) =>
        {
            const request = new XMLHttpRequest();
            request.open('GET', entry.file.path, true);
            request.onreadystatechange = function()
            {
                if (4 === request.readyState)
                {
                    if (200 <= request.status && request.status < 300)
                    {
                        resolve(request.responseText);
                    }
                    else
                    {
                        reject();
                    }
                }
            };
            request.send(null);
        }
    );
    export const loadLocalFile = async (entry: LoadEntry<LocalFileContext>): Promise<string> =>
    {
        if (fs)
        {
            return fs.readFileSync(entry.file.path, { encoding: "utf-8" });
        }
        else
        {
            throw new Error("Not support to load local file on web.");
        }
    };
    export const loadFile = async (entry: LoadEntry<NetFileContext | LocalFileContext>): Promise<string> =>
    {
        if (entry.handler.load)
        {
            return await entry.handler.load(entry);
        }
        else
        {
            if (isNetFileLoadEntry(entry))
            {
                return await loadNetFile(entry);
            }
            if (isLocalFileLoadEntry(entry))
            {
                return await loadLocalFile(entry);
            }
        }
        throw new Error("never");
    };
    export const load = async (entry: LoadEntry): Promise<Jsonable> =>
    {
        if (isNoneFileLoadEntry(entry))
        {
            return jsonParse(entry.file.data);
        }
        else
        if (isNetFileLoadEntry(entry) || isLocalFileLoadEntry(entry))
        {
            const cache = entry.setting.cache?.json?.[entry.file.path];
            if (undefined !== cache)
            {
                return cache;
            }
            const result = await loadFile(entry);
            if ( ! entry.setting.cache)
            {
                entry.setting.cache = { $arch: "cache", };
            }
            if ( ! entry.setting.cache.json)
            {
                entry.setting.cache.json = { };
            }
            entry.setting.cache.json[entry.file.path] = result;
            return result;
        }
        throw new Error("never");
    };
    interface StaticTemplate extends JsonarchBase
    {
        $arch: "static";
        return: Jsonable;
    }
    export const isStaticData = isJsonarch<StaticTemplate>("static");
    export const evaluateStatic = async (entry: EvaluateEntry<JsonarchBase>): Promise<Jsonable | undefined> =>
        isStaticData(entry.template) ? entry.template.return: undefined;
    interface IncludeStaticJsonTemplate extends JsonarchBase
    {
        $arch: "include-static-json";
        path: string;
    }
    export const isIncludeStaticJsonData = isJsonarch<IncludeStaticJsonTemplate>("include-static-json");
    export const evaluateIncludeStaticJson = async (entry: EvaluateEntry<JsonarchBase>): Promise<Jsonable | undefined> =>
        isIncludeStaticJsonData(entry.template) ? entry.template.path: undefined;
    export const evaluate = async (entry: EvaluateEntry<JsonarchBase>): Promise<Jsonable> =>
    {
        const evaluatorList: ((entry: EvaluateEntry<JsonarchBase>) => Promise<Jsonable | undefined>)[] =
        [
            evaluateStatic,
            evaluateIncludeStaticJson,
        ];
        for(const i in evaluatorList)
        {
            const result = await evaluatorList[i](entry);
            if (undefined !== result)
            {
                return result;
            }
        }
        return entry.template;
    };
    export const apply = async (entry: EvaluateEntry<Jsonable>): Promise<Jsonable> =>
    {
        if (null === entry.template || "object" !== typeof entry.template)
        {
            return entry.template;
        }
        else
        if (isEvaluateTargetEntry(entry))
        {
            return await evaluate(entry);
        }
        else
        if (Array.isArray(entry.template))
        {
            return await Promise.all
            (
                entry.template.map
                (
                    i => apply
                    ({
                        ...entry,
                        ...
                        {
                            template: i,
                        }
                    })
                )
            );
        }
        else
        {
            const result: JsonableObject = { };
            const template = entry.template;
            await Promise.all
            (
                objectKeys(template).map
                (
                    async key => result[key] = await apply
                    ({
                        ...entry,
                        ...
                        {
                            template: template[key] as Jsonable,
                        }
                    })
                )
            );
            return result;
        }
    };
    export const compile = async (entry: CompileEntry):Promise<Result> =>
    {
        const handler = entry.handler;
        const setting = (await load({ setting: { "$arch": "setting", }, handler: entry.handler, file: entry.setting})) as Setting;
        const template = await load({ setting, handler, file: entry.setting});
        const parameter = await load({ setting, handler, file: entry.setting});
        const context =
        {
            template: entry.template,
            paremter: entry.paremter,
            setting: entry.setting,
        };
        const rootEvaluateEntry: EvaluateEntry<Jsonable> =
        {
            context,
            template,
            parameter,
            setting,
            handler,
        };
        const output = await apply(rootEvaluateEntry);
        const cache = rootEvaluateEntry.setting.cache;
        const result: Result =
        {
            $arch: "result",
            output,
            cache,
        };
        return result;
    };
}
