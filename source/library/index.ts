import * as System from "./system";
import bootSettingJson from "./boot.setting.json";
import settingJson from "./setting.json";
import * as Locale from "./locale";
export * as Locale from "./locale";
export module Jsonarch
{
    export type JsonableValue = null | boolean | number | string;
    export interface JsonableObject
    {
        [key: string]: undefined | Jsonable;
    }
    export type Jsonable = JsonableValue | Jsonable[] | JsonableObject;
    export type JsonablePartial<Target> = { [key in keyof Target]?: Target[key] } & JsonableObject;
    export const jsonStringify = <T extends Jsonable>(source: T, replacer?: (this: any, key: string, value: any) => any, space?: string | number) => JSON.stringify(source, replacer, space);
    export const jsonParse = <T extends Jsonable = Jsonable>(text: string, reviver?: (this: any, key: string, value: any) => any) => JSON.parse(text, reviver) as T;
    export const objectKeys = <T extends object>(target: T) => Object.keys(target) as (keyof T & string)[];
    export const isString = (value: unknown): value is string => "string" === typeof value;
    export const isNumber = (value: unknown): value is number => "number" === typeof value;
    export const isObject = (value: unknown, isMember: { [key:string]: (x: unknown) => boolean } = { }): value is object =>
        null !== value &&
        "object" === typeof value &&
        ! Array.isArray(value) &&
        0 === objectKeys(isMember).filter(key => ! isMember[key]((<{ [key:string]: unknown }>value)[key])).length;
    export const isArray = <T>(value: unknown, isType: (x: unknown) => x is T): value is T[] =>
        Array.isArray(value) && 0 === value.filter(i => ! isType(i)).length;
    export const getTemporaryDummy = Locale.getSystemLocale();
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
    export const templateSchema = "https://raw.githubusercontent.com/wraith13/jsonarch/master/json-schema/template-json-schema.json#";
    export const settingSchema = "https://raw.githubusercontent.com/wraith13/jsonarch/master/json-schema/setting-json-schema.json#";
    interface JsonarchBase extends JsonableObject
    {
        $arch: string;
    }
    export const isJsonarch = <Type extends JsonarchBase>(type: Type["$arch"]) =>
        ((template: Jsonable): template is Type =>
            isJsonarchBase(template) && type === template.$arch);
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
    export type SystemFileType = "boot-setting.json" | "default-setting.json";
    export type HashType = string;
    export interface SystemFileContext
    {
        category: "system";
        id: SystemFileType;
        hash?: HashType;
    }
    export interface NoneFileContext<DataType extends Jsonable = Jsonable>
    {
        category: "none";
        data: DataType;
        hash?: HashType;
    }
    export interface NetFileContext
    {
        category: "net";
        path: string;
        hash?: HashType;
    }
    export interface LocalFileContext
    {
        category: "local";
        path: string;
        hash?: HashType;
    }
    export type FilePathCategory<DataType extends Jsonable = Jsonable> = FileContext<DataType>["category"];
    export type FileContext<DataType extends Jsonable = Jsonable> = SystemFileContext | NoneFileContext<DataType> | NetFileContext | LocalFileContext;
    export const isSystemFileContext = (file: FileContext): file is SystemFileContext => "system" === file.category;
    export const isNoneFileContext = <DataType extends Jsonable = Jsonable>(file: FileContext): file is NoneFileContext<DataType> => "none" === file.category;
    export const isNetFileContext = (file: FileContext): file is NetFileContext => "net" === file.category;
    export const isLocalFileContext = (file: FileContext): file is LocalFileContext => "local" === file.category;
    export const makeFullPath = (contextOrEntry: ContextOrEntry, path: string): string =>
    {
        const context = getContext(contextOrEntry);
        if (/^\.\.?\//.test(path))
        {
            if (isSystemFileContext(context.template))
            {
                throw new Error("makeFullPath({ templte:{ category: system }, },...)");
            }
            else
            if (isNoneFileContext(context.template))
            {
                throw new Error("makeFullPath({ templte:{ category: none }, },...)");
            }
            else
            {
                let parent = context.template.path
                    .replace(/#.*/, "")
                    .replace(/\/[^/]*$/, "");
                let current = path.replace(/^\.\//, "").replace(/\/\.\//, "/");
                while(/^\.\.\//.test(current))
                {
                    const newParent = parent.replace(/\/[^/]*$/, "");
                    if (parent === newParent)
                    {
                        break;
                    }
                    parent = newParent;
                    current = current.replace(/^\.\.\//, "");
                }
                return `${parent}/${current}`;
            }
        }
        else
        if ( ! System.isConsoleMode && /^\//.test(path))
        {
            if (isSystemFileContext(context.template))
            {
                throw new Error("makeFullPath({ templte:{ category: system }, },...)");
            }
            else
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
    export const getSystemFileContext = (id: SystemFileType): SystemFileContext => ({ category: "system", id, });
    export const jsonToFileContext = <DataType extends Jsonable = Jsonable>(data: DataType, hash?: HashType): NoneFileContext<DataType> =>
        ({ category: "none", data, hash, });
    export const pathToFileContext = (contextOrEntry: ContextOrEntry, path: string): NetFileContext | LocalFileContext =>
        ( ! System.isConsoleMode) || /^https?\:\/\//.test(path) ?
            { category: "net", path: makeFullPath(contextOrEntry, path), }:
            { category: "local", path: makeFullPath(contextOrEntry, path) };
    export const getHashFromPath = (path: string): HashType | undefined =>
    {
        const index = path.indexOf("#");
        if (0 < index)
        {
            return path.substring(index +1);
        }
        else
        {
            return undefined;
        }
    };
    export const commandLineArgumentToFileContext = <DataType extends Jsonarch.Jsonable = Jsonarch.Jsonable>(argument: string): FileContext<DataType> =>
        /^system\:/.test(argument) ? { category: "system", id: argument.replace(/^system\:/, "") as SystemFileType, hash: getHashFromPath(argument), }:
        /^https?\:\/\//.test(argument) ? { category: "net", path: argument, hash: getHashFromPath(argument), }:
        { category: "local", path: argument, hash: getHashFromPath(argument), };
    export interface Context
    {
        template: FileContext;
        parameter?: FileContext;
        cache?: FileContext<Cache>;
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
    export const isCache = isJsonarch<Cache>("cache");
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
    }
    export const isSetting = isJsonarch<Setting>("setting");
    // const bootSettingJson: Setting =
    // {
    //     "$schema": settingSchema,
    //     "$arch": "setting"
    // };
    interface LoadEntry<ContextType extends FileContext = FileContext>
    {
        context: Context;
        cache: Cache;
        setting: Setting;
        handler: Handler;
        file: ContextType;
    }
    export const isSystemFileLoadEntry = (entry: LoadEntry): entry is LoadEntry<SystemFileContext> => isSystemFileContext(entry.file);
    export const isNoneFileLoadEntry = <DataType extends Jsonable = Jsonable>(entry: LoadEntry): entry is LoadEntry<NoneFileContext<DataType>> => isNoneFileContext<DataType>(entry.file);
    export const isNetFileLoadEntry = (entry: LoadEntry): entry is LoadEntry<NetFileContext> => isNetFileContext(entry.file);
    export const isLocalFileLoadEntry = (entry: LoadEntry): entry is LoadEntry<LocalFileContext> => isLocalFileContext(entry.file);
    interface Handler
    {
        load?: (entry: LoadEntry<NetFileContext | LocalFileContext>) => Promise<string>;
    }
    interface EvaluateEntry<TemplateType>
    {
        context: Context;
        template: TemplateType;
        parameter: Jsonable | undefined;
        cache: Cache;
        setting: Setting;
        handler: Handler;
    }
    interface CompileEntry extends Context
    {
        handler: Handler;
    }
    const isPureDataType = (template: JsonarchBase) =>
        0 <= [ "setting", "cache", ].indexOf(template.$arch);
    export const isEvaluateTargetEntry = (entry: EvaluateEntry<Jsonable>): entry is EvaluateEntry<JsonarchBase> =>
        isJsonarchBase(entry.template) && ! isPureDataType(entry.template);
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
    export const isResult = isJsonarch<Result>("result");
    interface JsonarchError extends JsonarchBase
    {
        $arch: "error";
        message: string;
    }
    export const isError = isJsonarch<JsonarchError>("error");
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
    export const parseErrorJson = (error: Error): JsonarchError =>
    {
        if (error.message.startsWith("json:"))
        {
            return jsonParse(error.message.replace(/^json\:/, ""));
        }
        else
        {
            const result = <JsonarchError>
            {
                "$arch": "error",
                ...error
            };
            return result;
        }
    };
    export const loadSystemJson = <DataType extends Jsonable = Jsonable>(entry: LoadEntry<SystemFileContext>): Promise<DataType> => profile
    (
        entry, "loadSystemJson", async () =>
        {
            switch(entry.file.id)
            {
            case "boot-setting.json":
                return bootSettingJson as any;
            case "default-setting.json":
                return settingJson as any;
            }
            throw new Error("never");
        }
    );
    export const loadNetFile = (entry: LoadEntry<NetFileContext>) =>
        profile(entry, "loadNetFile", () => System.loadNetFile(entry.file.path));
    export const loadLocalFile = (entry: LoadEntry<LocalFileContext>) =>
        profile(entry, "loadLocalFile", async () => System.loadLocalFile(entry.file.path));
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
            if (isSystemFileLoadEntry(entry))
            {
                return await loadSystemJson(entry) as DataType;
            }
            else
            if (isNoneFileLoadEntry(entry))
            {
                return entry.file.data;
            }
            else
            if (isNetFileLoadEntry(entry) || isLocalFileLoadEntry(entry))
            {
                const cache = entry.cache?.json?.[entry.file.path];
                if (undefined !== cache)
                {
                    return cache as DataType;
                }
                const result = jsonParse(await loadFile(entry));
                if ( ! entry.cache)
                {
                    entry.cache = { $arch: "cache", };
                }
                if ( ! entry.cache.json)
                {
                    entry.cache.json = { };
                }
                entry.cache.json[entry.file.path] = result;
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
    export const evaluateStatic = (entry: EvaluateEntry<StaticTemplate>): Promise<Jsonable> =>
        profile(entry, "evaluateStatic", async () => entry.template.return);
    interface IncludeStaticJsonTemplate extends JsonarchBase
    {
        $arch: "include-static-json";
        path: string;
    }
    export const isIncludeStaticJsonData = isJsonarch<IncludeStaticJsonTemplate>("include-static-json");
    export const evaluateIncludeStaticJson = (entry: EvaluateEntry<IncludeStaticJsonTemplate>): Promise<Jsonable> => profile
    (
        entry, "evaluateIncludeStaticJson", async () => await loadFile
        ({
            ...entry,
            file: pathToFileContext(entry, entry.template.path)
        })
    );
    interface Template extends JsonarchBase
    {
        $arch: "template";
        type?: string;
        default?:
        {
            parameter?: Jsonable;
            setting?: Setting;
        };
        override?:
        {
            parameter?: Jsonable;
            setting?: Setting;
        };
        member?: JsonableObject;
        return: Jsonable;
        catch?: JsonableObject;
    }
    export const isTemplateData = isJsonarch<Template>("template");
    export const applyDefault = (defaults: Jsonable | undefined, parameter: Jsonable | undefined) =>
    {
        if (undefined === defaults)
        {
            return parameter;
        }
        else
        if (undefined === parameter || "object" !== typeof defaults || "object" !== typeof parameter)
        {
            return defaults;
        }
        else
        {
            return { ...defaults, ...parameter, };
        }
    };
    export const evaluateTemplate = (entry: EvaluateEntry<Template>): Promise<Jsonable> => profile
    (
        entry, "evaluateTemplate", async () =>
        {
            const parameter = applyDefault
            (
                applyDefault(entry.template.default, entry.parameter),
                entry.template.override?.setting
            );
            if (entry.template.catch)
            {
                try
                {
                    return apply({...entry, template: entry.template.return, parameter, });
                }
                catch(error)
                {
                    //  🚧 call match(entry.template.catch, error)
                    throw error;
                }
            }
            else
            {
                return apply({...entry, template: entry.template.return, parameter, });
            }
        }
    );
    type Refer = string;
    interface Call extends JsonarchBase
    {
        $arch: "call";
        refer: Refer;
        parameter?: Jsonable;
    }
    export const isCallData = isJsonarch<Call>("call");
    interface Value extends JsonarchBase
    {
        $arch: "value";
        refer: Refer;
    }
    export const isValueData = isJsonarch<Value>("value");
    export module Library
    {
        export module String
        {
            export const json = (parameter: Jsonable | undefined) =>
            {
                if (isArray(parameter, isString))
                {
                    return parameter.join("");
                }
                else
                {
                    throw new ErrorJson
                    ({
                        "$arch": "error",
                        "message": "Unmatch parameter type",
                        "refer": "string.join",
                        "parameter": parameter,
                    });
                }
            };
        }
    }
    export const evaluateCall = (entry: EvaluateEntry<Call>): Promise<Jsonable> => profile
    (
        entry, "evaluateCall", async () =>
        {
            const parameter = undefined === entry.template.parameter ?
                undefined:
                await apply({...entry, template: entry.template.parameter, });
            switch(entry.template.refer)
            {
            case "string.join":
                return Library.String.json(parameter);
            default:
                throw new ErrorJson
                ({
                    "$arch": "error",
                    "message": "Unknown refer call",
                    "refer": entry.template.refer,
                });
            }
        }
    );
    export const evaluateValue = (entry: EvaluateEntry<Value>): Promise<Jsonable> => profile
    (
        entry, "evaluateValue", async () =>
        {
            //entry.template.refer;
            return (entry.parameter as any).name;
        }
    );
    export const evaluateIfMatch = <TargetType extends JsonarchBase>(isMatch: ((entry: JsonarchBase) => entry is TargetType), evaluateTarget: (entry: EvaluateEntry<TargetType>) => Promise<Jsonable>) =>
        async (entry: EvaluateEntry<JsonarchBase>): Promise<Jsonable | undefined> =>
            isMatch(entry.template) ? evaluateTarget(<EvaluateEntry<TargetType>>entry): undefined;
    const evaluatorList: ((entry: EvaluateEntry<JsonarchBase>) => Promise<Jsonable | undefined>)[] =
    [
        evaluateIfMatch(isStaticData, evaluateStatic),
        evaluateIfMatch(isIncludeStaticJsonData, evaluateIncludeStaticJson),
        evaluateIfMatch(isTemplateData, evaluateTemplate),
        evaluateIfMatch(isCallData, evaluateCall),
        evaluateIfMatch(isValueData, evaluateValue),
    ];
    export const evaluate = (entry: EvaluateEntry<JsonarchBase>): Promise<Jsonable> => profile
    (
        entry, "evaluate", async () =>
        {
            for(const i in evaluatorList)
            {
                const result = await evaluatorList[i](entry);
                if (undefined !== result)
                {
                    return result;
                }
            }
            throw new ErrorJson
            ({
                "$arch": "error",
                "message": "Unknown Jsonarch Type",
                "template": entry.template,
            });
            // return entry.template;
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
    export const applyRoot = (entry: CompileEntry, template: Jsonable, parameter: Jsonable, cache: Cache, setting: Setting): Promise<Result> => profile
    (
        entry, "applyRoot", async () =>
        {
            const handler = entry.handler;
            const context =
            {
                template: entry.template,
                paremter: entry.parameter,
                cache: entry.cache,
                setting: entry.setting,
            };
            const rootEvaluateEntry: EvaluateEntry<Jsonable> =
            {
                context,
                template,
                parameter,
                cache,
                setting,
                handler,
            };
            try
            {
                const output = await apply(rootEvaluateEntry);
                const result: Result =
                {
                    $arch: "result",
                    output,
                    cache,
                    setting,
                };
                return result;
            }
            catch(error: any)
            {
                const result: Result =
                {
                    $arch: "result",
                    output: parseErrorJson(error),
                    cache,
                    setting,
                };
                return result;
            }
        }
    );
    export const process = async (entry: CompileEntry):Promise<Result> =>
    {
        const handler = entry.handler;

        const emptyCache: Cache = { "$arch": "cache" };
        const cache = entry.cache ?
            await load({ context: entry, cache:emptyCache, setting: bootSettingJson as Setting, handler, file: entry.cache }):
            emptyCache;
        const settingFileContext =
            entry.setting ??
            getSystemFileContext("default-setting.json");
        const settingResult = await applyRoot
        (
            {
                handler,
                template: settingFileContext,
                cache: entry.cache,
                setting: getSystemFileContext("boot-setting.json"),
            },
            await load({ context: entry, cache, setting: bootSettingJson as Setting, handler, file: settingFileContext }),
            null,
            cache,
            bootSettingJson as Setting
        );
        const setting: Setting = settingResult?.output as Setting ?? { "$arch": "setting", };
        const parameterResult = entry.parameter ?
            await applyRoot
            (
                {
                    handler,
                    template: entry.parameter,
                    cache: entry.cache,
                    setting: settingFileContext,
                },
                await load({ context: entry, cache, setting, handler, file: entry.parameter }),
                null,
                cache,
                setting
            ):
            undefined;
        const parameter = parameterResult?.output ?? null;
        const template = await load({ context: entry, cache, setting, handler, file: entry.template});
        return applyRoot(entry, template, parameter, cache, setting);
    };
    export const jsonToString = (json: Jsonable, asType: "result" | "output", setting: Setting): string =>
    {
        const indent = setting.indent ?? 4;
        if ("output" === asType && setting.textOutput && "string" === typeof json)
        {
            return json;
        }
        else
        if ("output" === asType && setting.textOutput && Array.isArray(json) && 0 === json.filter(line => "string" !== typeof line).length)
        {
            return json.join("\n");
        }
        else
        if ("number" === typeof indent)
        {
            return jsonStringify(json, undefined, indent);
        }
        else
        if ("tab" === indent)
        {
            return jsonStringify(json, undefined, "\t");
        }
        else
        {
            // "minify" === indent
            return jsonStringify(json);
        }
    };
    export const throwIfError = <DataType extends Jsonable>(json: DataType): DataType =>
    {
        if (isError(json))
        {
            throw new ErrorJson(json);
        }
        return json;
    };
}
