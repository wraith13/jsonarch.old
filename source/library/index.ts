import bootSettingJson from "./boot.setting.json";
import settingJson from "./setting.json";
import languageEn from "./language/en.json";
import languageJa from "./language/ja.json";
export module Jsonarch
{
    export const packageJson = require("../package.json") as
    {
        name: string;
        version: string;
        preview: boolean;
        description: string;
        author: string;
        license: string;
    };
    export const name = packageJson.name;
    export const version = packageJson.version;
    const isConsoleMode = typeof window === 'undefined';
    const fs = isConsoleMode ? require("fs"): undefined;
    const https = isConsoleMode ? require("https"): undefined;
    export module Locale
    {
        export const master =
        {
            en: languageEn,
            ja: languageJa,
        };
        export type LocaleKeyType =
            keyof typeof languageEn &
            keyof typeof languageJa;
        export type LocaleType = keyof typeof master;
        export const locales = Object.keys(master) as LocaleType[];
        export const getSystemLocale = () => isConsoleMode ?
            Intl.DateTimeFormat().resolvedOptions().locale as LocaleType:
            navigator.language as LocaleType;
        export const getShortLocale = (locale: string) => locale.replace(/-.*$/, "");
        export const getMatchLocaleKey = (locale: string) =>
        {
            const index = locales.indexOf(locale as LocaleType);
            if (0 < index)
            {
                return locales[index];
            }
            const shortIndex = locales.indexOf(getShortLocale(locale) as LocaleType);
            if (0 < shortIndex)
            {
                return locales[shortIndex];
            }
            return locales[0];
        };
        let masterKey: LocaleType = getMatchLocaleKey(getSystemLocale());
        export const getLocaleName = (locale: LocaleType) => master[locale].$name;
        export const setLocale = (locale: LocaleType | null) =>
        {
            const key = locale ?? getSystemLocale();
            if (0 <= locales.indexOf(key))
            {
                masterKey = key;
            }
        };
        export const getPrimary = (key : LocaleKeyType) => master[masterKey][key];
        export const getSecondary = (key : LocaleKeyType) => master[locales.filter(locale => masterKey !== locale)[0]][key];
        export const string = (key : string) : string => getPrimary(key as LocaleKeyType) || key;
        export const map = (key : LocaleKeyType) : string => string(key);
        export const parallel = (key : LocaleKeyType) : string => `${getPrimary(key)} / ${getSecondary(key)}`;
    }
    export const templateSchema = "https://raw.githubusercontent.com/wraith13/jsonarch/master/json-schema/template-json-schema.json#";
    export const settingSchema = "https://raw.githubusercontent.com/wraith13/jsonarch/master/json-schema/setting-json-schema.json#";
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
    interface Profile
    {
        isProfiling: boolean;
        score: { [scope: string]: number };
        stack: ProfileEntry[];
    }
    interface ProfileEntry
    {
        name: string;
        startTicks: number;
        childrenTicks: number;
    }
    export interface NoneFileContext<DataType extends Jsonable = Jsonable>
    {
        category: "none";
        data: DataType;
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
    export type FilePathCategory<DataType extends Jsonable = Jsonable> = FileContext<DataType>["category"];
    export type FileContext<DataType extends Jsonable = Jsonable> = NoneFileContext<DataType> | NetFileContext | LocalFileContext;
    export const isNoneFileContext = <DataType extends Jsonable = Jsonable>(file: FileContext): file is NoneFileContext<DataType> => "none" === file.category;
    export const isNetFileContext = (file: FileContext): file is NetFileContext => "net" === file.category;
    export const isLocalFileContext = (file: FileContext): file is LocalFileContext => "local" === file.category;
    export const makeFullPath = (contextOrEntry: ContextOrEntry, path: string): string =>
    {
        const context = getContext(contextOrEntry);
        if (/^\.\.?\//.test(path))
        {
            if (isNoneFileContext(context.template))
            {
                throw new Error("makeFullPath({ templte:{ category: none }, },...)");
            }
            else
            {
                let parent = context.template.path
                    .replace(/#.*/, "")
                    .replace(/\/[^/]*$/, "");
                let current = path.replace(/^\.\//, "");
                while(/^\.\.\//.test(current))
                {
                    parent = parent.replace(/\/[^/]*$/, "");
                    current = current.replace(/^\.\.\//, "");
                }
                return `${parent}/${current}`;
            }
        }
        else
        if ( ! isConsoleMode && /^\//.test(path))
        {
            if (isNoneFileContext(context.template))
            {
                throw new Error("makeFullPath({ templte:{ category: none }, },...)");
            }
            else
            {
                return context.template.path.replace(/^(https?\:\/\/[^/]+\/).*$/, "$1") +path;
            }
        }
        else
        {
            return path;
        }
    };
    export const jsonToFileContext = <DataType extends Jsonable = Jsonable>(data: DataType): NoneFileContext<DataType> =>
        ({ category: "none", data, });
    export const pathToFileContext = (contextOrEntry: ContextOrEntry, path: string): NetFileContext | LocalFileContext =>
        ( ! isConsoleMode) || /^https?\:\/\//.test(path) ?
            { category: "net", path: makeFullPath(contextOrEntry, path), }:
            { category: "local", path: makeFullPath(contextOrEntry, path) };
    export const commandLineArgumentToFileContext = (argument: string): FileContext =>
        /^\{.*\}&/.test(argument) ? { category: "none", data: jsonParse(argument), }:
        /^https?\:\/\//.test(argument) ? { category: "net", path: argument, }:
        { category: "local", path: argument };
    export interface Context
    {
        template: FileContext;
        parameter?: FileContext;
        setting?: FileContext<Setting>;
        profile?: Profile;
    }
    export type ContextOrEntry = Context | { context: Context, };
    export const getContext = (contextOrEntry: ContextOrEntry): Context =>
        "context" in contextOrEntry ? contextOrEntry.context: contextOrEntry;
    export interface Cache extends JsonarchBase
    {
        $arch: "cache";
        json?: { [path: string]: Jsonable };
        values?: { [key: string]: Jsonable; };
        templates?: { [key: string]: Jsonable; };
    }
    export interface Setting extends JsonarchBase
    {
        $arch: "setting";
        language?: string;
        indent?: "minify" | "tab" | number;
        textOutput?: boolean;
        timeout?: number;
        trace?: "stdout" | "stderr" | boolean;
        profile?: false | "template" | "parameter" | "both";
        originMap?: false | "template" | "parameter" | "both";
        influenceMap?: false | "template" | "parameter" | "both";
        callGraph?: boolean;
        cache?: Cache;
    }
    // const bootSettingJson: Setting =
    // {
    //     "$schema": settingSchema,
    //     "$arch": "setting"
    // };
    interface LoadEntry<ContextType extends FileContext = FileContext>
    {
        context: Context;
        setting: Setting;
        handler: Handler;
        file: ContextType;
    }
    export const isNoneFileLoadEntry = <DataType extends Jsonable = Jsonable>(entry: LoadEntry): entry is LoadEntry<NoneFileContext<DataType>> => isNoneFileContext<DataType>(entry.file);
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
        setting: Setting;
    }
    interface JsonarchError extends JsonarchBase
    {
        $arch: "error";
        message: string;
    }
    export const getTicks = () => new Date().getTime();
    const beginProfileScope = (context: Context, name: string): ProfileEntry =>
    {
        const result: ProfileEntry =
        {
            name,
            startTicks: 0,
            childrenTicks: 0,
        };
        if (context.profile?.isProfiling)
        {
            result.startTicks = getTicks();
            context.profile?.stack.push(result);
        }
        return result;
    };
    const endProfileScope = (context: Context, entry: ProfileEntry) =>
    {
        const profileScore = context.profile?.score;
        const entryStack = context.profile?.stack;
        if (0 !== entry.startTicks && profileScore && entryStack)
        {
            const wholeTicks = getTicks() -entry.startTicks;
            if (undefined === profileScore[entry.name])
            {
                profileScore[entry.name] = 0;
            }
            profileScore[entry.name] += wholeTicks -entry.childrenTicks;
            entryStack.pop();
            if (0 < entryStack.length)
            {
                entryStack[entryStack.length -1].childrenTicks += wholeTicks;
            }
        }
    };
    export const profile = async <ResultT>(contextOrEntry: Context | { context: Context, }, name: string, target: () => Promise<ResultT>): Promise<ResultT> =>
    {
        const context = getContext(contextOrEntry);
        const entry = beginProfileScope(context, name);
        try
        {
            return await target();
        }
        finally
        {
            endProfileScope(context, entry);
        }
    };
    export const ErrorJson = function(json: JsonarchError)
    {
        return new Error(`json:${jsonStringify(json)}`);
    } as {
        new (json: JsonarchError): Error;
        (json: JsonarchError): Error;
    };
    export const parseErrorJson = (error: Error): JsonarchError | string =>
    {
        if (error.message.startsWith("json:"))
        {
            return jsonParse(error.message.replace(/^json\:/, ""));
        }
        else
        {
            return error.message;
        }
    };
    export const loadNetFile = (entry: LoadEntry<NetFileContext>) => profile
    (
        entry, "loadNetFile", () => new Promise<string>
        (
            (resolve, reject) =>
            {
                if (isConsoleMode)
                {
                    https.get
                    (
                        entry.file.path, (response: any) =>
                        {
                            //console.log('statusCode:', response.statusCode);
                            //console.log('headers:', response.headers);
                            if (200 <= response.statusCode && response.statusCode < 300)
                            {
                                let buffer = "";
                                response.on("data", (chunk: string) => buffer += chunk);
                                response.on("end", () => resolve(buffer));
                            }
                            else
                            {
                                reject();
                            }
                        }
                    )
                    .on("error", () => reject());
                }
                else
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
            }
        )
    );
    export const loadLocalFile = (entry: LoadEntry<LocalFileContext>) => profile
    (
        entry, "loadLocalFile", async () =>
        {
            if (fs)
            {
                return fs.readFileSync(entry.file.path, { encoding: "utf-8" });
            }
            else
            {
                throw new Error("Not support to load local file on web.");
            }
        }
    );
    
    export const loadFile = (entry: LoadEntry<NetFileContext | LocalFileContext>) => profile
    (
        entry, "loadFile", async () =>
        {
            const loardHandler = entry.handler.load;
            if (loardHandler)
            {
                return await profile(entry, "handler.load", () => loardHandler(entry));
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
        }
    );
    export const load = <DataType extends Jsonable = Jsonable>(entry: LoadEntry<FileContext<DataType>>): Promise<DataType> => profile
    (
        entry, "load", async () =>
        {
            if (isNoneFileLoadEntry(entry))
            {
                return entry.file.data;
            }
            else
            if (isNetFileLoadEntry(entry) || isLocalFileLoadEntry(entry))
            {
                const cache = entry.setting.cache?.json?.[entry.file.path];
                if (undefined !== cache)
                {
                    return cache as DataType;
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
                return result as DataType;
            }
            throw new Error("never");
        }
    )
    ;
    interface StaticTemplate extends JsonarchBase
    {
        $arch: "static";
        return: Jsonable;
    }
    export const isStaticData = isJsonarch<StaticTemplate>("static");
    export const evaluateStatic = (entry: EvaluateEntry<JsonarchBase>): Promise<Jsonable | undefined> => profile
    (
        entry, "evaluateStatic", async () =>
        isStaticData(entry.template) ? entry.template.return: undefined
    );
    interface IncludeStaticJsonTemplate extends JsonarchBase
    {
        $arch: "include-static-json";
        path: string;
    }
    export const isIncludeStaticJsonData = isJsonarch<IncludeStaticJsonTemplate>("include-static-json");
    export const evaluateIncludeStaticJson = (entry: EvaluateEntry<JsonarchBase>): Promise<Jsonable | undefined> => profile
    (
        entry, "evaluateIncludeStaticJson", async () =>
        isIncludeStaticJsonData(entry.template) ?
            await loadFile
            ({
                ...entry,
                file: pathToFileContext(entry, entry.template.path)
            }):
            undefined
    );
    export const evaluate = (entry: EvaluateEntry<JsonarchBase>): Promise<Jsonable> => profile
    (
        entry, "evaluate", async () =>
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
        }
    );
    export const apply = (entry: EvaluateEntry<Jsonable>): Promise<Jsonable> => profile
    (
        entry, "apply", async () =>
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
        }
    );
    export const applyRoot = (entry: CompileEntry, template: Jsonable, parameter: Jsonable, setting: Setting): Promise<Result> => profile
    (
        entry, "applyRoot", async () =>
        {
            const handler = entry.handler;
            const context =
            {
                template: entry.template,
                paremter: entry.parameter,
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
                setting,
            };
            return result;
        }
    );
    export const process = async (entry: CompileEntry):Promise<Result> =>
    {
        const handler = entry.handler;
        const settingFileContext =
            entry.setting ??
            jsonToFileContext(settingJson as Setting);
        const settingResult = await applyRoot
        (
            {
                handler,
                template: settingFileContext,
                setting: jsonToFileContext(bootSettingJson as Setting),
            },
            await load({ context: entry, setting: bootSettingJson as Setting, handler, file: settingFileContext }),
            null,
            bootSettingJson as Setting
        );
        const setting: Setting = settingResult?.output as Setting ?? { "$arch": "setting", };
        const parameterResult = entry.parameter ?
            await applyRoot
            (
                {
                    handler,
                    template: entry.parameter,
                    setting: settingFileContext,
                },
                await load({ context: entry, setting, handler, file: entry.parameter }),
                null,
                setting
            ):
            undefined;
        const parameter = parameterResult?.output ?? null;
        const template = await load({ context: entry, setting, handler, file: entry.template});
        return applyRoot(entry, template, parameter, setting);
    };
    export const jsonToString = (json: Jsonable, asType: "result" | "output", setting: Setting): string =>
    {
        if ("output" === asType && setting.textOutput && "string" === typeof json)
        {
            return json;
        }
        else
        if ("number" === typeof setting.indent)
        {
            return jsonStringify(json, undefined, setting.indent);
        }
        else
        if ("tab" === setting.indent)
        {
            return jsonStringify(json, undefined, "\t");
        }
        else
        {
            // "minify" === setting.indent
            return jsonStringify(json);
        }
    };
}
