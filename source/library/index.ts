import * as System from "./system";
import bootSettingJson from "./boot.setting.json";
import settingJson from "./setting.json";
import librarygJson from "./library.json";
import * as Locale from "./locale";
export * as Locale from "./locale";
export module Jsonarch
{
    export interface StructureObject<Element>
    {
        [key: string]: undefined | Structure<Element>;
    }
    export type Structure<Element> = Element | Structure<Element>[] | StructureObject<Element>;
    export type JsonableValue = null | boolean | number | string;
    export type JsonableObject = StructureObject<JsonableValue>;
    export type Jsonable = Structure<JsonableValue>;
    export type JsonablePartial<Target> = { [key in keyof Target]?: Target[key] } & JsonableObject;
    export const jsonStringify = <T extends Jsonable>(source: T, replacer?: (this: any, key: string, value: any) => any, space?: string | number) => JSON.stringify(source, replacer, space);
    export const jsonParse = <T extends Jsonable = Jsonable>(text: string, reviver?: (this: any, key: string, value: any) => any) => JSON.parse(text, reviver) as T;
    export const isJsonableValue = (value: unknown): value is JsonableValue =>
        null === value || 0 <= [ "boolean", "number", "string" ].indexOf(typeof value);
    export const isJsonableObject = (value: unknown): value is JsonableObject =>
        null !== value &&
        "object" === typeof value &&
        ! Array.isArray(value) &&
        ! objectValues(value).some(i => ! isJsonable(i));
    export const isJsonableArray = (value: unknown): value is Jsonable[] =>
        Array.isArray(value) && ! value.some(i => ! isJsonable(i));
    export const isJsonable = (value: unknown): value is Jsonable =>
        isJsonableValue(value) || isJsonableArray(value) || isJsonableObject(value);
    export const objectKeys = <T extends { }>(target: T) => Object.keys(target) as (keyof T & string)[];
    export const objectValues = <T extends { }>(target: T) => Object.values(target) as (T[keyof T])[];
    export type IsType<Type> = (value: unknown) => value is Type;
    export const isJust = <Type>(type: Type) => (value: unknown): value is Type => type === typeof value;
    export const isUndefined = isJust(undefined);
    export const isNull = isJust(null);
    export const isUndefinedOr = <T>(isType: IsType<T>) => isTypeOr(isUndefined, isType);
    export const isNullOr = <T>(isType: IsType<T>) => isTypeOr(isNull, isType);
    export const isUndefinedOrNullOr = <T>(isType: IsType<T>) => isTypeOr(isUndefined, isNull, isType);
    export const isBoolean = (value: unknown): value is boolean => "boolean" === typeof value;
    export const isNumber = (value: unknown): value is number => "number" === typeof value;
    export const isString = (value: unknown): value is string => "string" === typeof value;
    export const isObject = <T extends { }>(isMember: { [key in keyof T]: IsType<T[key]> }): (value: unknown) => value is T =>
        (value: unknown): value is T =>
            null !== value &&
            "object" === typeof value &&
            ! Array.isArray(value) &&
            ! objectKeys(isMember).some(key => ! (isMember[key]?.((<{ [key:string]: unknown }>value)[key]) || true));
    export const isArray = <T>(isType: IsType<T>): (value: unknown) => value is T[] =>
        (value: unknown): value is T[] => Array.isArray(value) && 0 === value.filter(i => ! isType(i)).length;
    export function isTuple<TypeA, TypeB>(isA: IsType<TypeA>, isB: IsType<TypeB>):
        IsType<[ TypeA, TypeB, ]>;
    export function isTuple<TypeA, TypeB, TypeC>(isA: IsType<TypeA>, isB: IsType<TypeB>, isC: IsType<TypeC>):
        IsType<[ TypeA, TypeB, TypeC, ]>;
    export function isTuple<TypeA, TypeB, TypeC, TypeD>(isA: IsType<TypeA>, isB: IsType<TypeB>, isC: IsType<TypeC>, isD: IsType<TypeD>):
        IsType<[ TypeA, TypeB, TypeC, TypeD, ]>;
    export function isTuple<TypeA, TypeB, TypeC, TypeD, TypeE>(isA: IsType<TypeA>, isB: IsType<TypeB>, isC: IsType<TypeC>, isD: IsType<TypeD>, isE: IsType<TypeE>):
        IsType<[ TypeA, TypeB, TypeC, TypeD, TypeE, ]>;
    export function isTuple<TypeA, TypeB, TypeC, TypeD, TypeE, TypeF>(isA: IsType<TypeA>, isB: IsType<TypeB>, isC: IsType<TypeC>, isD: IsType<TypeD>, isE: IsType<TypeE>, isF: IsType<TypeF>):
        IsType<[ TypeA, TypeB, TypeC, TypeD, TypeE, TypeF, ]>;
    export function isTuple<TypeA, TypeB, TypeC, TypeD, TypeE, TypeF, TypeG>(isA: IsType<TypeA>, isB: IsType<TypeB>, isC: IsType<TypeC>, isD: IsType<TypeD>, isE: IsType<TypeE>, isF: IsType<TypeF>, isG: IsType<TypeG>):
        IsType<[ TypeA, TypeB, TypeC, TypeD, TypeE, TypeF, TypeG, ]>;
    export function isTuple<TypeA, TypeB, TypeC, TypeD, TypeE, TypeF, TypeG, TypeH>(isA: IsType<TypeA>, isB: IsType<TypeB>, isC: IsType<TypeC>, isD: IsType<TypeD>, isE: IsType<TypeE>, isF: IsType<TypeF>, isG: IsType<TypeG>, isH: IsType<TypeH>):
        IsType<[ TypeA, TypeB, TypeC, TypeD, TypeE, TypeF, TypeG, TypeH, ]>;
    export function isTuple<TypeA, TypeB, TypeC, TypeD, TypeE, TypeF, TypeG, TypeH, TypeI>(isA: IsType<TypeA>, isB: IsType<TypeB>, isC: IsType<TypeC>, isD: IsType<TypeD>, isE: IsType<TypeE>, isF: IsType<TypeF>, isG: IsType<TypeG>, isH: IsType<TypeH>, isI: IsType<TypeI>):
        IsType<[ TypeA, TypeB, TypeC, TypeD, TypeE, TypeF, TypeG, TypeH, TypeI, ]>;
    export function isTuple(...isTypeList: ((value: unknown) => boolean)[])
    {
        return (value: unknown) => Array.isArray(value) && ! isTypeList.some((i, ix) => ! i(value[ix]));
    }
    export function isEnum<TypeA, TypeB>(list: [TypeA, TypeB]):
        IsType<TypeA | TypeB>;
    export function isEnum<TypeA, TypeB, TypeC>(list: [TypeA, TypeB, TypeC]):
        IsType<TypeA | TypeB | TypeC>;
    export function isEnum<TypeA, TypeB, TypeC, TypeD>(list: [TypeA, TypeB, TypeC, TypeD]):
        IsType<TypeA | TypeB | TypeC | TypeD>;
    export function isEnum<TypeA, TypeB, TypeC, TypeD, TypeE>(list: [TypeA, TypeB, TypeC, TypeD, TypeE]):
        IsType<TypeA | TypeB | TypeC | TypeD | TypeE>;
    export function isEnum<TypeA, TypeB, TypeC, TypeD, TypeE, TypeF>(list: [TypeA, TypeB, TypeC, TypeD, TypeE, TypeF]):
        IsType<TypeA | TypeB | TypeC | TypeD | TypeE | TypeF>;
    export function isEnum<TypeA, TypeB, TypeC, TypeD, TypeE, TypeF, TypeG>(list: [TypeA, TypeB, TypeC, TypeD, TypeE, TypeF, TypeG]):
        IsType<TypeA | TypeB | TypeC | TypeD | TypeE | TypeF | TypeG>;
    export function isEnum<TypeA, TypeB, TypeC, TypeD, TypeE, TypeF, TypeG, TypeH>(list: [TypeA, TypeB, TypeC, TypeD, TypeE, TypeF, TypeG, TypeH]):
        IsType<TypeA | TypeB | TypeC | TypeD | TypeE | TypeF | TypeG | TypeH>;
    export function isEnum<TypeA, TypeB, TypeC, TypeD, TypeE, TypeF, TypeG, TypeH, TypeI>(list: [TypeA, TypeB, TypeC, TypeD, TypeE, TypeF, TypeG, TypeH, TypeI]):
        IsType<TypeA | TypeB | TypeC | TypeD | TypeE | TypeF | TypeG | TypeH | TypeI>;
    export function isEnum<TypeA, TypeB, TypeC, TypeD, TypeE, TypeF, TypeG, TypeH, TypeI, TypeJ>(list: [TypeA, TypeB, TypeC, TypeD, TypeE, TypeF, TypeG, TypeH, TypeI, TypeJ]):
        IsType<TypeA | TypeB | TypeC | TypeD | TypeE | TypeF | TypeG | TypeH | TypeI | TypeJ>;
    export function isEnum<TypeA, TypeB, TypeC, TypeD, TypeE, TypeF, TypeG, TypeH, TypeI, TypeJ, TypeK>(list: [TypeA, TypeB, TypeC, TypeD, TypeE, TypeF, TypeG, TypeH, TypeI, TypeJ, TypeK]):
        IsType<TypeA | TypeB | TypeC | TypeD | TypeE | TypeF | TypeG | TypeH | TypeI | TypeJ | TypeK>;
    export function isEnum<TypeA, TypeB, TypeC, TypeD, TypeE, TypeF, TypeG, TypeH, TypeI, TypeJ, TypeK, TypeL>(list: [TypeA, TypeB, TypeC, TypeD, TypeE, TypeF, TypeG, TypeH, TypeI, TypeJ, TypeK, TypeL]):
        IsType<TypeA | TypeB | TypeC | TypeD | TypeE | TypeF | TypeG | TypeH | TypeI | TypeJ | TypeK | TypeL>;
    export function isEnum<TypeA, TypeB, TypeC, TypeD, TypeE, TypeF, TypeG, TypeH, TypeI, TypeJ, TypeK, TypeL, TypeM>(list: [TypeA, TypeB, TypeC, TypeD, TypeE, TypeF, TypeG, TypeH, TypeI, TypeJ, TypeK, TypeL, TypeM]):
        IsType<TypeA | TypeB | TypeC | TypeD | TypeE | TypeF | TypeG | TypeH | TypeI | TypeJ | TypeK | TypeL | TypeM>;
    export function isEnum<TypeA, TypeB, TypeC, TypeD, TypeE, TypeF, TypeG, TypeH, TypeI, TypeJ, TypeK, TypeL, TypeM, TypeN>(list: [TypeA, TypeB, TypeC, TypeD, TypeE, TypeF, TypeG, TypeH, TypeI, TypeJ, TypeK, TypeL, TypeM, TypeN]):
        IsType<TypeA | TypeB | TypeC | TypeD | TypeE | TypeF | TypeG | TypeH | TypeI | TypeJ | TypeK | TypeL | TypeM | TypeN>;
    export function isEnum<TypeA, TypeB, TypeC, TypeD, TypeE, TypeF, TypeG, TypeH, TypeI, TypeJ, TypeK, TypeL, TypeM, TypeN, TypeO>(list: [TypeA, TypeB, TypeC, TypeD, TypeE, TypeF, TypeG, TypeH, TypeI, TypeJ, TypeK, TypeL, TypeM, TypeN, TypeO]):
        IsType<TypeA | TypeB | TypeC | TypeD | TypeE | TypeF | TypeG | TypeH | TypeI | TypeJ | TypeK | TypeL | TypeM | TypeN | TypeO>;
    export function isEnum<TypeA, TypeB, TypeC, TypeD, TypeE, TypeF, TypeG, TypeH, TypeI, TypeJ, TypeK, TypeL, TypeM, TypeN, TypeO, TypeP>(list: [TypeA, TypeB, TypeC, TypeD, TypeE, TypeF, TypeG, TypeH, TypeI, TypeJ, TypeK, TypeL, TypeM, TypeN, TypeO, TypeP]):
        IsType<TypeA | TypeB | TypeC | TypeD | TypeE | TypeF | TypeG | TypeH | TypeI | TypeJ | TypeK | TypeL | TypeM | TypeN | TypeO | TypeP>;
    export function isEnum(list: unknown[])
    {
        return (value: unknown) => list.some(i => i === value);
    }
    export function isTypeOr<TypeA, TypeB>(isA: IsType<TypeA>, isB: IsType<TypeB>):
        IsType<TypeA | TypeB>;
    export function isTypeOr<TypeA, TypeB, TypeC>(isA: IsType<TypeA>, isB: IsType<TypeB>, isC: IsType<TypeC>):
        IsType<TypeA | TypeB | TypeC>;
    export function isTypeOr<TypeA, TypeB, TypeC, TypeD>(isA: IsType<TypeA>, isB: IsType<TypeB>, isC: IsType<TypeC>, isD: IsType<TypeD>):
        IsType<TypeA | TypeB | TypeC | TypeD>;
    export function isTypeOr<TypeA, TypeB, TypeC, TypeD, TypeE>(isA: IsType<TypeA>, isB: IsType<TypeB>, isC: IsType<TypeC>, isD: IsType<TypeD>, isE: IsType<TypeE>):
        IsType<TypeA | TypeB | TypeC | TypeD | TypeE>;
    export function isTypeOr<TypeA, TypeB, TypeC, TypeD, TypeE, TypeF>(isA: IsType<TypeA>, isB: IsType<TypeB>, isC: IsType<TypeC>, isD: IsType<TypeD>, isE: IsType<TypeE>, isF: IsType<TypeF>):
        IsType<TypeA | TypeB | TypeC | TypeD | TypeE | TypeF>;
    export function isTypeOr<TypeA, TypeB, TypeC, TypeD, TypeE, TypeF, TypeG>(isA: IsType<TypeA>, isB: IsType<TypeB>, isC: IsType<TypeC>, isD: IsType<TypeD>, isE: IsType<TypeE>, isF: IsType<TypeF>, isG: IsType<TypeG>):
        IsType<TypeA | TypeB | TypeC | TypeD | TypeE | TypeF | TypeG>;
    export function isTypeOr<TypeA, TypeB, TypeC, TypeD, TypeE, TypeF, TypeG, TypeH>(isA: IsType<TypeA>, isB: IsType<TypeB>, isC: IsType<TypeC>, isD: IsType<TypeD>, isE: IsType<TypeE>, isF: IsType<TypeF>, isG: IsType<TypeG>, isH: IsType<TypeH>):
        IsType<TypeA | TypeB | TypeC | TypeD | TypeE | TypeF | TypeG | TypeH>;
    export function isTypeOr<TypeA, TypeB, TypeC, TypeD, TypeE, TypeF, TypeG, TypeH, TypeI>(isA: IsType<TypeA>, isB: IsType<TypeB>, isC: IsType<TypeC>, isD: IsType<TypeD>, isE: IsType<TypeE>, isF: IsType<TypeF>, isG: IsType<TypeG>, isH: IsType<TypeH>, isI: IsType<TypeI>):
        IsType<TypeA | TypeB | TypeC | TypeD | TypeE | TypeF | TypeG | TypeH | TypeI>;
    export function isTypeOr(...isTypeList: ((value: unknown) => boolean)[])
    {
        return (value: unknown) => isTypeList.some(i => i(value));
    }
    export type Lazy<T extends Structure<JsonableValue | undefined>> = T | (() => T);
    export const getLazyValue = <T extends Structure<JsonableValue | undefined>>(lazy: Lazy<T>): T =>
        "function" === typeof lazy ?
            lazy():
            lazy;
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
    export interface AlphaJsonarch extends JsonableObject
    {
        $arch: string;
    }
    export const isJsonarch = <Type extends AlphaJsonarch>(type: Type["$arch"]) =>
        ((template: unknown): template is Type =>
            isAlphaJsonarch(template) && type === template.$arch);
    export const isAlphaJsonarch = (template: any): template is AlphaJsonarch =>
        null !== template &&
        "object" === typeof template &&
        "$arch" in template &&
        "string" === typeof template.$arch;
    export interface Profile
    {
        isProfiling: boolean;
        score: { [scope: string]: number };
        stack: ProfileEntry[];
    }
    export interface ProfileEntry
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
    export interface Cache extends AlphaJsonarch
    {
        $arch: "cache";
        json?: { [path: string]: Jsonable };
        template?: { [key: string]: Jsonable; };
        type?: { [key: string]: Jsonable; };
        value?: { [key: string]: Jsonable; };
    }
    export const isCache = isJsonarch<Cache>("cache");
    export interface Setting extends AlphaJsonarch
    {
        $arch: "setting";
        language?: string;
        indent?: "minify" | "smart" | "tab" | number;
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
    export interface Handler
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
    const isPureDataType = (template: AlphaJsonarch) =>
        0 <= [ "setting", "cache", ].indexOf(template.$arch);
    export const isEvaluateTargetEntry = (entry: EvaluateEntry<Jsonable>): entry is EvaluateEntry<AlphaJsonarch> =>
        isAlphaJsonarch(entry.template) && ! isPureDataType(entry.template);
    export interface Result extends AlphaJsonarch
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
    export interface JsonarchError extends AlphaJsonarch
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
    export interface StaticTemplate extends AlphaJsonarch
    {
        $arch: "static";
        return: Jsonable;
    }
    export const isStaticData = isJsonarch<StaticTemplate>("static");
    export const evaluateStatic = (entry: EvaluateEntry<StaticTemplate>): Promise<Jsonable> =>
        profile(entry, "evaluateStatic", async () => entry.template.return);
    export interface IncludeStaticJsonTemplate extends AlphaJsonarch
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
    export interface Template extends AlphaJsonarch
    {
        $arch: "template";
        type?:
        {
            parameter?: Type;
            return?: Type;
        };
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
        catch?: Case[];
    }
    export interface Case extends AlphaJsonarch
    {
        if: Jsonable;
        return: Jsonable;
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
                    if (isJsonable(error))
                    {
                        const result = await evaluateCases({...entry, template: entry.template.catch, parameter: error, });
                        if (undefined !== result)
                        {
                            return result;
                        }
                    }
                    throw error;
                }
            }
            else
            {
                return apply({...entry, template: entry.template.return, parameter, });
            }
        }
    );
    export const evaluateCases = (entry: EvaluateEntry<Case[]>): Promise<Jsonable | undefined> => profile
    (
        entry, "evaluateCases", async () =>
        {
            for(let i in entry.template)
            {
                const case_ = entry.template[i];
                if (await apply({...entry, template: case_.if, }))
                {
                    return await apply({...entry, template: case_.return, });
                }
            }
            return undefined;
        }
    );
    type ReferKeyElement = string;
    type ReferIndextElement = number;
    type ReferElement = ReferKeyElement | ReferIndextElement;
    type Refer = ReferElement[];
    export interface AlphaType extends AlphaJsonarch
    {
        $arch: "type";
        type: PrimitiveType;
        optional?: boolean;
    }
    export const isAlphaTypeData = <Type extends AlphaType>(type: Type["type"]) =>
        ((template: unknown): template is Type =>
            isTypeData(template) && type === template.type);
    export interface AlphaEnumType<ValueType extends JsonableValue> extends AlphaType
    {
        enum?: ValueType[];
        neverEnum?: ValueType[];
    }
    export interface TypeRefer extends AlphaType
    {
        type: "refer";
        refer: Refer;
        parameter?: Jsonable;
    }
    export const isTypeReferData = isAlphaTypeData<TypeRefer>("refer");
    export interface NeverType extends AlphaType
    {
        type: "never";
    }
    export const isNeverTypeData = isAlphaTypeData<NeverType>("never");
    export interface UnknownType extends AlphaType
    {
        type: "unknown";
    }
    export const isUnknownTypeData = isAlphaTypeData<UnknownType>("unknown");
    export interface AnyType extends AlphaType
    {
        type: "any";
    }
    export const isAnyTypeData = isAlphaTypeData<AnyType>("any");
    export interface NullValueType extends AlphaType
    {
        type: "null";
    }
    export const isNullValueTypeData = isAlphaTypeData<NullValueType>("null");
    export interface BooleanValueType extends AlphaEnumType<boolean>
    {
        type: "boolean";
    }
    export const isBooleanValueTypeData = isAlphaTypeData<BooleanValueType>("boolean");
    export interface FormatStringValueType extends AlphaType
    {
        type: "string";
        format?: string;
    }
    export interface EnumStringValueType extends AlphaEnumType<string>
    {
        type: "string";
    }
    export type StringValueType = FormatStringValueType | EnumStringValueType;
    export const isStringValueTypeData = isAlphaTypeData<StringValueType>("string");
    export interface RangeNumberValueType extends AlphaType
    {
        type: "number";
        integerOnly?: boolean;
        minValue?: number;
        maxValue?: number;
        enum: never;
    }
    export interface EnumNumberValueType extends AlphaEnumType<number>
    {
        type: "number";
        integerOnly: never;
        minValue: never;
        maxValue: never;
    }
    export type NumberValueType = RangeNumberValueType | EnumNumberValueType;
    export const isNumberValueTypeData = isAlphaTypeData<NumberValueType>("number");
    export const isRangeNumberValueTypeData = (value: unknown): value is RangeNumberValueType =>
        isAlphaTypeData<NumberValueType>("number")(value) &&
        isObject({ integerOnly: isUndefinedOr(isBoolean), minValue: isUndefinedOr(isNumber), maxValue: isUndefinedOr(isNumber), enum:isUndefined, })(value);
    export const isEnumNumberValueTypeData = (value: unknown): value is EnumNumberValueType =>
        isAlphaTypeData<NumberValueType>("number")(value) && isObject({ enum: isArray(isNumber), })(value);
    export type ValueType = NullValueType | BooleanValueType | NumberValueType | StringValueType;
    export type PrimitiveValueType = ValueType["type"];
    export const isValueTypeData = (template: unknown): template is ValueType =>
        isNullValueTypeData(template) ||
        isBooleanValueTypeData(template) ||
        isNumberValueTypeData(template) ||
        isStringValueTypeData(template);
    export interface ArrayType extends AlphaType
    {
        type: "array";
        itemType: Type;
        minLength?: number;
        maxLength?: number;
    }
    export const isArrayTypeData = isAlphaTypeData<ArrayType>("array");
    export interface TupleType extends AlphaType
    {
        type: "tuple";
        list: Type[];
    }
    export const isTupleTypeData = isAlphaTypeData<TupleType>("tuple");
    export interface ObjectType extends AlphaType
    {
        type: "object";
        member: { [key: string]: Type; };
    }
    export const isObjectTypeData = isAlphaTypeData<ObjectType>("object");
    export type StructureType = ArrayType | TupleType | ObjectType;
    export type PrimitiveStructureType = StructureType["type"];
    export const isStructureTypeData = (template: unknown): template is StructureType =>
        isArrayTypeData(template) ||
        isTupleTypeData(template) ||
        isObjectTypeData(template);
    export interface OrCompositeType extends AlphaType
    {
        type: "or";
        list: Type[];
    }
    export const isOrCompositeTypeData = isAlphaTypeData<OrCompositeType>("or");
    export interface AndCompositeType extends AlphaType
    {
        type: "and";
        list: Type[];
    }
    export const isAndCompositeTypeData = isAlphaTypeData<AndCompositeType>("and");
    export type CompositeType = OrCompositeType | AndCompositeType;
    export type PrimitiveCompositeType = CompositeType["type"];
    export const isCompositeTypeData = (template: unknown): template is CompositeType =>
        isOrCompositeTypeData(template) ||
        isAndCompositeTypeData(template);
    export interface TemplateType extends AlphaType
    {
        type: "template";
        parameter: Type;
        return: Type;
    }
    export const isTemplateTypeData = isAlphaTypeData<TemplateType>("template");
    export interface MetaType extends AlphaType
    {
        type: "meta";
        parameter: Type;
        return: Type;
    }
    export const isMetaTypeData = isAlphaTypeData<MetaType>("meta");
    export type Type = TypeRefer | NeverType | UnknownType | AnyType | ValueType | ArrayType | TupleType | ObjectType | CompositeType | TemplateType | MetaType;
    export type PrimitiveType = Type["type"];
    export const isTypeData = isJsonarch<Type>("type");
    export interface Call extends AlphaJsonarch
    {
        $arch: "call";
        refer: Refer;
        parameter?: Jsonable;
    }
    export const isCallData = isJsonarch<Call>("call");
    export interface Value extends AlphaJsonarch
    {
        $arch: "value";
        refer: Refer;
    }
    export const isValueData = isJsonarch<Value>("value");
    export const typeOfJsonable = (json: Jsonable | undefined): Type =>
    {
        if (undefined === json)
        {
            return { $arch: "type", type: "never", };
        }
        else
        if (null === json)
        {
            return { $arch: "type", type: "null", };
        }
        else
        if ("boolean" === typeof json)
        {
            return { $arch: "type", type: "boolean", enum: [ json, ], };
        }
        else
        if ("number" === typeof json)
        {
            if (isNaN(json) || ( ! isFinite(json)))
            {
                return { $arch: "type", type: "null", };
            }
            else
            {
                return <NumberValueType>{ $arch: "type", type: "number", enum: [ json, ], };
            }
        }
        else
        if ("string" === typeof json)
        {
            return { $arch: "type", type: "string", enum: [ json, ], };
        }
        else
        if (Array.isArray(json))
        {
            return { $arch: "type", type: "tuple", list: json.map(i => typeOfJsonable(i)), };
        }
        else
        if ("object" === typeof json)
        {
            const member: { [key:string]: Type } = { };
            objectKeys(json).forEach(i => member[i] = typeOfJsonable(json[i]));
            return { $arch: "type", type: "object", member, };
        }
        // else
        // {
            return { $arch: "type", type: "never", };
        // }
    };
    export const makeParameter = async (entry: EvaluateEntry<Call>) =>
        undefined === entry.template.parameter ?
            undefined:
            await apply({...entry, template: entry.template.parameter, });
    export const validateParameterType = <parameterType extends Jsonable | undefined>(entry: EvaluateEntry<Call>, parameter: parameterType): parameterType =>
    {
        const functionTemplate = turnRefer<JsonableValue | Function>
        (
            librarygJson,
            entry.template.refer
        );
        if (isTemplateData(functionTemplate))
        {
            const type = functionTemplate.type;
            if (type)
            {
                const typeParameter = type.parameter;
                if (typeParameter)
                {
                    const parameterType = typeOfJsonable(parameter);
                    const comppareTypeResult = compareType(typeParameter, parameterType);
                    if ( ! isBaseOrEqual(comppareTypeResult))
                    {
                        throw new ErrorJson
                        ({
                            "$arch": "error",
                            "message": "Unmatch parameter type",
                            "refer": entry.template.refer,
                            comppareTypeResult,
                            "type":
                            {
                                "template.parameter": typeParameter,
                                "parameter": parameterType,
                            },
                            parameter,
                        });
                    }
                    else
                    {
                        return parameter;
                    }
                }
                else
                {
                    throw new ErrorJson
                    ({
                        "$arch": "error",
                        "message": "Not found parameter type define",
                        "refer": entry.template.refer,
                    });
                }
            }
            else
            {
                throw new ErrorJson
                ({
                    "$arch": "error",
                    "message": "Not found type define",
                    "refer": entry.template.refer,
                });
            }
        }
        else
        {
            throw new ErrorJson
            ({
                "$arch": "error",
                "message": "Not found template",
                "refer": entry.template.refer,
            });
        }
    };
    export const UnmatchParameterTypeDefineError = (_entry: EvaluateEntry<Call>, parameter: Jsonable | undefined): Error =>
        new ErrorJson
        ({
            "$arch": "error",
            "message": "Internal Error ( Unmatch parameter type define )",
            "refer": [ "string", "join" ],
            "parameter": parameter,
        });
    export module Library
    {
        export module String
        {
            export const json = (_entry: EvaluateEntry<Call>, parameter: Jsonable | undefined): Jsonable | undefined =>
            {
                if (isArray(isString)(parameter))
                {
                    return parameter.join("");
                }
                else
                if (isObject({ list: isArray(isString), separator: isString, })(parameter))
                {
                    return parameter.list.join(parameter.separator);
                }
                return undefined;
            };
        }
    }
    export type CompareTypeResult = "unmatch" | "base" | "equal" | "extended";
    export const isBaseOrEqual = (result: CompareTypeResult) => "base" === result || "equal" === result;
    export const isEqualOrExtented = (result: CompareTypeResult) => "equal" === result || "extended" === result;
    export const reverseCompareTypeResult = (result: CompareTypeResult): CompareTypeResult =>
    {
        switch(result)
        {
        case "base":
            return "extended";
        case "extended":
            return "base";
        default:
            return result;
        }
    };
    export const compositeCompareTypeResult = (...list: Lazy<CompareTypeResult | undefined>[]): CompareTypeResult =>
    {
        let result: CompareTypeResult = "equal";
        for(const i in list)
        {
            switch(getLazyValue(list[i]))
            {
            case undefined:
                break;
            case "equal":
                break;
            case "base":
                switch(result)
                {
                case "equal":
                    result = "base";
                    break;
                case "extended":
                    result = "unmatch";
                    break;
                }
                break;
            case "extended":
                switch(result)
                {
                case "base":
                    result = "unmatch";
                    break;
                case "equal":
                    result = "extended";
                    break;
                }
                break;
            case "unmatch":
                result = "unmatch";
                break;
            }
            if ("unmatch" === result)
            {
                break;
            }
        }
        return result;
    };
    export const compareTypeOptional = (a: Type, b: Type): CompareTypeResult =>
    {
        if ((a.optional ?? false) === (b.optional ?? false))
        {
            return "equal";
        }
        else
        if (a.optional ?? false)
        {
            return "base";
        }
        else
        {
            return "extended";
        }
    };
    export const compareTypeEnum = <ValueType extends JsonableValue>(a: AlphaEnumType<ValueType>, b: AlphaEnumType<ValueType>): CompareTypeResult =>
    {
        const aEnum = a.enum;
        const bEnum = b.enum;
        if (undefined === aEnum && undefined === bEnum)
        {
            return "equal";
        }
        else
        if (undefined === aEnum)
        {
            return "base";
        }
        else
        if (undefined === bEnum)
        {
            return "extended";
        }
        else
        {
            const aHasUnmatch = aEnum.some(i => bEnum.indexOf(i) < 0);
            const bHasUnmatch = bEnum.some(i => aEnum.indexOf(i) < 0);
            if (( ! aHasUnmatch) && ( ! bHasUnmatch))
            {
                return "equal";
            }
            else
            if ( ! aHasUnmatch)
            {
                return "extended";
            }
            else
            if ( ! bHasUnmatch)
            {
                return "base";
            }
            else
            {
                return "unmatch";
            }
        }
    };
    export const compareTypeNeverEnum = <ValueType extends JsonableValue>(a: AlphaEnumType<ValueType>, b: AlphaEnumType<ValueType>): CompareTypeResult =>
    {
        const aNeverEnum = a.neverEnum;
        const bNeverEnum = b.neverEnum;
        if (undefined === aNeverEnum && undefined === bNeverEnum)
        {
            return "equal";
        }
        else
        if (undefined === aNeverEnum)
        {
            return "base";
        }
        else
        if (undefined === bNeverEnum)
        {
            return "extended";
        }
        else
        {
            const aHasUnmatch = aNeverEnum.some(i => bNeverEnum.indexOf(i) < 0);
            const bHasUnmatch = bNeverEnum.some(i => aNeverEnum.indexOf(i) < 0);
            if (( ! aHasUnmatch) && ( ! bHasUnmatch))
            {
                return "equal";
            }
            else
            if ( ! aHasUnmatch)
            {
                return "base";
            }
            else
            if ( ! bHasUnmatch)
            {
                return "extended";
            }
            else
            {
                return "unmatch";
            }
        }
    };
    export const compareTypeMinValue = (a: NumberValueType, b: NumberValueType): CompareTypeResult =>
    {
        const aMinValue = a.minValue ?? undefined;
        const bMinValue = b.minValue ?? undefined;
        if (aMinValue === bMinValue)
        {
            return "equal";
        }
        else
        if (undefined === aMinValue)
        {
            return "base";
        }
        else
        if (undefined === bMinValue)
        {
            return "extended";
        }
        else
        if (aMinValue < bMinValue)
        {
            return "base";
        }
        else
        {
            return "extended";
        }
    };
    export const compareTypeMaxValue = (a: NumberValueType, b: NumberValueType): CompareTypeResult =>
    {
        const aMaxValue = a.maxValue ?? undefined;
        const bMaxValue = b.maxValue ?? undefined;
        if (aMaxValue === b.maxValue)
        {
            return "equal";
        }
        else
        if (undefined === aMaxValue)
        {
            return "base";
        }
        else
        if (undefined === bMaxValue)
        {
            return "extended";
        }
        else
        if (aMaxValue < bMaxValue)
        {
            return "extended";
        }
        else
        {
            return "base";
        }
    };
    export const compareTypeMinMaxValue = (a: NumberValueType, b: NumberValueType): CompareTypeResult => compositeCompareTypeResult
    (
        compareTypeMinValue(a, b),
        compareTypeMaxValue(a, b)
    );
    export const compareTypeFormat = (a: StringValueType, b: StringValueType): CompareTypeResult =>
    {
        if (a.format === b.format)
        {
            return "equal";
        }
        else
        if (undefined === a.format)
        {
            return "base";
        }
        else
        if (undefined === b.format)
        {
            return "extended";
        }
        else
        {
            //  細かい比較検証は行わず unmatch と見做す。
            return "unmatch";
        }
    };
    export const compareTypeMinLength = (a: ArrayType, b: ArrayType): CompareTypeResult =>
    {
        if (a.minLength === b.minLength)
        {
            return "equal";
        }
        else
        if (undefined === a.minLength)
        {
            return "base";
        }
        else
        if (undefined === b.minLength)
        {
            return "extended";
        }
        else
        if (a.minLength < b.minLength)
        {
            return "base";
        }
        else
        {
            return "extended";
        }
    };
    export const compareTypeMaxLength = (a: ArrayType, b: ArrayType): CompareTypeResult =>
    {
        if (a.maxLength === b.maxLength)
        {
            return "equal";
        }
        else
        if (undefined === a.maxLength)
        {
            return "base";
        }
        else
        if (undefined === b.maxLength)
        {
            return "extended";
        }
        else
        if (a.maxLength < b.maxLength)
        {
            return "extended";
        }
        else
        {
            return "base";
        }
    };
    export const compareTypeMinMaxLength = (a: ArrayType, b: ArrayType): CompareTypeResult => compositeCompareTypeResult
    (
        compareTypeMinLength(a, b),
        compareTypeMaxLength(a, b),
    );
    export const compareTypeList = (a: Type[], b: Type[]): CompareTypeResult =>
    {
        const commonLength = Math.min(a.length, b.length);
        return compositeCompareTypeResult
        (
            ...a
                .filter((_i, ix) => ix < commonLength)
                .map((_i, ix) => <Lazy<CompareTypeResult | undefined>>(() => compareType(a[ix], b[ix]))),
            commonLength < a.length ? "extended": undefined,
            commonLength < b.length ? "base": undefined,
        );
    };
    export const compareTypeObjectMember = (a: ObjectType, b: ObjectType): CompareTypeResult =>
    {
        const aMemberList = objectKeys(a.member);
        const bMemberList = objectKeys(b.member);
        const commonMemberList = aMemberList.filter(a => bMemberList.some(b => a === b));
        const aOnlyMemberList = aMemberList.filter(a => ! commonMemberList.some(i => a === i));
        const bOnlyMemberList = bMemberList.filter(b => ! commonMemberList.some(i => b === i));
        return compositeCompareTypeResult
        (
            ...commonMemberList.map(i => () => compareType(a.member[i], b.member[i])),
            () =>
            {
                if (0 === aOnlyMemberList.length && 0 === bOnlyMemberList.length)
                {
                    return "equal";
                }
                else
                if (0 === aOnlyMemberList.length)
                {
                    return "base";
                }
                else
                if (0 === bOnlyMemberList.length)
                {
                    return "extended";
                }
                else
                {
                    return "unmatch";
                }
            }
        );
    };
    export const compareTypeOrComposite = (a: OrCompositeType, b: Type): CompareTypeResult =>
    {
        const resultList = a.list.map(i => compareType(i, b));
        if (( ! resultList.some(i => "equal" !== i)) && isOrCompositeTypeData(b) && a.list.length === b.list.length)
        {
            return "equal";
        }
        if (resultList.some(i => isBaseOrEqual(i)))
        {
            return "base";
        }
        if (( ! resultList.some(i => ! isEqualOrExtented(i))))
        {
            return "extended";
        }
        return "unmatch";
    };
    export const compareTypeMeta = (_a: MetaType, _b: Type): CompareTypeResult =>
    {
        return "unmatch";
    };
    export const compositeCompareType = <TargetType extends Type>(comparer: ((a: TargetType, b: TargetType) => CompareTypeResult)[]) =>
        (a: TargetType, b: TargetType): CompareTypeResult =>
            compositeCompareTypeResult(...comparer.map(i => i(a,b)));
    export const compareNullValueType = compositeCompareType<NullValueType>
    ([
        compareTypeOptional,
    ]);
    export const compareBoolanValueType = compositeCompareType<BooleanValueType>
    ([
        compareTypeOptional,
        compareTypeEnum,
        compareTypeNeverEnum,
    ]);
    export const compareNumberValueType = compositeCompareType<NumberValueType>
    ([
        compareTypeOptional,
        compareTypeEnum,
        compareTypeNeverEnum,
        compareTypeMinMaxValue,
    ]);
    export const compareStringValueType = compositeCompareType<StringValueType>
    ([
        compareTypeOptional,
        compareTypeEnum,
        compareTypeNeverEnum,
        compareTypeFormat,
    ]);
    export const compareArrayType = compositeCompareType<ArrayType>
    ([
        compareTypeOptional,
        compareTypeMinMaxLength,
        (a: ArrayType, b: ArrayType) => compareType(a.itemType, b.itemType),
    ]);
    export const compareTupleType = compositeCompareType<TupleType>
    ([
        compareTypeOptional,
        (a: TupleType, b: TupleType) => compareTypeList(a.list, b.list),
    ]);
    export const compareObjectType = compositeCompareType<ObjectType>
    ([
        compareTypeOptional,
        compareTypeObjectMember,
    ]);
    export const compareTemplateType = compositeCompareType<TemplateType>
    ([
        compareTypeOptional,
        (a: TemplateType, b: TemplateType) => compositeCompareTypeResult
        (
            () => compareType(a.parameter, b.parameter),
            () => compareType(a.return, b.return),
        ),
    ]);
    export const compareMetaType = compositeCompareType<MetaType>
    ([
        compareTypeOptional,
        (a: MetaType, b: MetaType) => compositeCompareTypeResult
        (
            () => compareType(a.parameter, b.parameter),
            () => compareType(a.return, b.return),
        ),
    ]);
    export const compareIfMatch = <TargetType extends Type>(isMatch: ((type: Type) => type is TargetType), compareTarget: (a: TargetType, b: TargetType) => CompareTypeResult) =>
        (a: Type, b: Type): CompareTypeResult | undefined =>
            isMatch(a) && isMatch(b) ? compareTarget(a, b): undefined;
    const compareTypeEntryList: ((a: Type, b: Type) => CompareTypeResult | undefined)[] =
    [
        compareIfMatch(isNullValueTypeData, compareNullValueType),
        compareIfMatch(isBooleanValueTypeData, compareBoolanValueType),
        compareIfMatch(isNumberValueTypeData, compareNumberValueType),
        compareIfMatch(isStringValueTypeData, compareStringValueType),
        compareIfMatch(isArrayTypeData, compareArrayType),
        compareIfMatch(isTupleTypeData, compareTupleType),
        compareIfMatch(isObjectTypeData, compareObjectType),
        compareIfMatch(isTemplateTypeData, compareTemplateType),
        compareIfMatch(isMetaTypeData, compareMetaType),
    ];
    export const compareTypeArrayAndTuple = (a: ArrayType, b: TupleType): CompareTypeResult =>
    {
        const optionalCount = b.list.map(i => i.optional ?? false).reverse().indexOf(false);
        const minLength = b.list.length -optionalCount;
        const maxLength = b.list.length;
        return compositeCompareTypeResult
        (
            compareTypeOptional(a, b),
            compareTypeMinMaxLength(a, { ...a, minLength, maxLength, }),
            ...b.list.map(i => compareType(a.itemType, i))
        );
    };
    export const compareType = (a: Type, b: Type): CompareTypeResult =>
    {
        if (a.type === b.type)
        {
            return compositeCompareTypeResult(...compareTypeEntryList.map(i => i(a,b)));
        }
        else
        if (isArrayTypeData(a) && isTupleTypeData(b))
        {
            return compareTypeArrayAndTuple(a, b);
        }
        else
        if (isTupleTypeData(a) && isArrayTypeData(b))
        {
            return reverseCompareTypeResult(compareTypeArrayAndTuple(b, a));
        }
        else
        if (isOrCompositeTypeData(a))
        {
            return compareTypeOrComposite(a, b);
        }
        else
        if (isOrCompositeTypeData(b))
        {
            return reverseCompareTypeResult(compareTypeOrComposite(b, a));
        }
        else
        if (isMetaTypeData(a))
        {
            return compareTypeMeta(a, b);
        }
        else
        if (isMetaTypeData(b))
        {
            return reverseCompareTypeResult(compareTypeMeta(b, a));
        }
        else
        {
            return "unmatch";
        }
    };
    export const isCompatibleType = (source: Type, destination: Type) =>
        isEqualOrExtented(compareType(source, destination));
    export const andTypeOptional = <TargetType extends Type>(a: TargetType, b: TargetType): TargetType =>
    {
        const result = { ...a };
        if (a.optional !== b.optional && (a.optional ?? true) && ! (b.optional ?? false))
        {
            if (undefined === b.optional)
            {
                delete result.optional;
            }
            else
            {
                result.optional = b.optional;
            }
        }
        return result;
    };
    export const andTypeEnum = <ValueType extends JsonableValue, TargetType extends AlphaEnumType<ValueType>>(a: TargetType, b: TargetType): TargetType | NeverType =>
    {
        let result: TargetType | NeverType = { ...a };
        const aEnum = a.enum;
        const bEnum = b.enum;
        if (undefined !== aEnum || undefined !== bEnum)
        {
            if (undefined === aEnum)
            {
                result.enum = bEnum;
            }
            else
            if (undefined !== aEnum && undefined !== bEnum)
            {
                result.enum = aEnum.filter(i => 0 <= bEnum.indexOf(i));
            }
        }
        if ( ! isNeverTypeData(result))
        {
            const aNeverEnum = a.neverEnum;
            const bNeverEnum = b.neverEnum;
            if (undefined !== aNeverEnum || undefined !== bNeverEnum)
            {
                if (undefined === aNeverEnum)
                {
                    result.neverEnum = bNeverEnum;
                }
                else
                if (undefined !== aNeverEnum && undefined !== bNeverEnum)
                {
                    result.neverEnum = aNeverEnum.concat(bNeverEnum.filter(i => aNeverEnum.indexOf(i) < 0));
                }
            }
            const neverEnum = result.neverEnum;
            if (undefined !== neverEnum)
            {
                if (undefined !== result.enum)
                {
                    result.enum = result.enum.filter(i => neverEnum.indexOf(i) < 0);
                    result.neverEnum = undefined;
                }
                else
                {
                    result.neverEnum = neverEnum;
                }
            }
        }
        if (undefined !== result.enum && result.enum.length <= 0)
        {
            result = { $arch: "type", type: "never", };
        }
        return result;
    };
    export const andTypeMinMaxValue = <TargetType extends NumberValueType>(a: TargetType, b: TargetType): TargetType | NeverType =>
    {
        let result: TargetType | NeverType = { ...a };
        let resultMinValue = <number | undefined>result.minValue;
        const bMinValue = <number | undefined>b.minValue;
        if (undefined !== bMinValue && (undefined === resultMinValue || resultMinValue < bMinValue))
        {
            result.minValue = resultMinValue = bMinValue;
        }
        let resultMaxValue = <number | undefined>result.maxValue;
        const bMaxValue = <number | undefined>b.maxValue;
        if (undefined !== bMaxValue && (undefined === resultMaxValue || bMaxValue < resultMaxValue))
        {
            result.maxValue = resultMaxValue = bMaxValue;
        }
        if (b.integerOnly ?? false)
        {
            result.integerOnly = b.integerOnly;
        }
        if
        (
            isNumberValueTypeData(result) && undefined !== resultMinValue && undefined !== resultMaxValue &&
            (
                resultMaxValue < resultMinValue ||
                ((result.integerOnly ?? false) && Math.floor(resultMaxValue) < Math.ceil(resultMinValue))
            )
        )
        {
            result = { $arch: "type", type: "never", };
        }
        return result;
    };
    export const andTypeFormat = <TargetType extends StringValueType>(a: TargetType, b: TargetType): TargetType | NeverType =>
    {
        let result: TargetType | NeverType = { ...a };
        if (undefined !== b.format)
        {
            if (undefined === result.format)
            {
                result.minValue = b.minValue;
            }
            else
            {
                result = { $arch: "type", type: "never", };
            }
        }
        return result;
    };
    export const andTypeMinMaxLength = <TargetType extends ArrayType>(a: TargetType, b: TargetType): TargetType | NeverType =>
    {
        let result: TargetType | NeverType = { ...a };
        if (undefined !== b.minLength && (undefined === result.minLength || result.minLength < b.minLength))
        {
            result.minLength = b.minLength;
        }
        if (undefined !== b.maxLength && (undefined === result.maxLength || b.maxLength < result.maxLength))
        {
            result.maxLength = b.maxLength;
        }
        if (isArrayTypeData(result) && undefined !== result.minLength && undefined !== result.maxLength && result.maxLength < result.minLength)
        {
            result = { $arch: "type", type: "never", };
        }
        return result;
    };
    export const andTypeItemType = <TargetType extends ArrayType>(a: TargetType, b: TargetType): TargetType | NeverType =>
    {
        let result: TargetType | NeverType = { ...a };
        const itemType = andType([ a.itemType, b.itemType, ]);
        if (isNeverTypeData(itemType))
        {
            result = { $arch: "type", type: "never", };
        }
        else
        {
            result.itemType = itemType;
        }
        return result;
    };
    export const andTypeList = <TargetType extends TupleType>(a: TargetType, b: TargetType): TargetType | NeverType =>
    {
        let result: TargetType | NeverType = { ...a };
        const commonListLength = Math.min(a.list.length, b.list.length);
        const list: Type[] = a.list
            .map((i, ix) => andType([ i, b.list[ix] ]))
            .concat(a.list.filter((_i, ix) => commonListLength <= ix))
            .concat(b.list.filter((_i, ix) => commonListLength <= ix));
        if (list.some(i => isNeverTypeData(i)))
        {
            result = { $arch: "type", type: "never", };
        }
        else
        {
            result.list = list;
        }
        return result;
    };
    export const andTypeObjectMember = <TargetType extends ObjectType>(a: TargetType, b: TargetType): TargetType | NeverType =>
    {
        let result: TargetType | NeverType = { ...a, member: { ...a.member, ...b.member, }, };
        const keys = objectKeys(result.member);
        for(const i in keys)
        {
            const key = keys[i];
            const ai = a.member[key];
            const bi = b.member[key];
            if (undefined !== ai && undefined !== bi)
            {
                const current = andType([ ai, bi, ]);
                if (isNeverTypeData(current))
                {
                    result = { $arch: "type", type: "never", };
                    break;
                }
                else
                {
                    result.member[key] = current;
                }
            }
        }
        return result;
    };
    export const andTypeParameter = <TargetType extends (Type & { parameter: Type })>(a: TargetType, b: TargetType): TargetType | NeverType =>
    {
        let result: TargetType | NeverType = { ...a, };
        const parameter = andType([ a.parameter, b.parameter, ]);
        if (isNeverTypeData(parameter))
        {
            result = { $arch: "type", type: "never", };
        }
        else
        {
            result.parameter = parameter;
        }
        return result;
    };
    export const andTypeReturn = <TargetType extends (Type & { return: Type })>(a: TargetType, b: TargetType): TargetType | NeverType =>
    {
        let result: TargetType | NeverType = { ...a, };
        const returnType = andType([ a.return, b.return, ]);
        if (isNeverTypeData(returnType))
        {
            result = { $arch: "type", type: "never", };
        }
        else
        {
            result.return = returnType;
        }
        return result;
    };
    export const compositeAndType = <TargetType extends Type>(merger: ((a: TargetType, b: TargetType) => TargetType | NeverType)[]) =>
        (a: TargetType, b: TargetType): TargetType | NeverType =>
        {
            let result: TargetType | NeverType = { ...a, };
            for(const i in merger)
            {
                if (isNeverTypeData(result))
                {
                    break;
                }
                else
                {
                    result = merger[i](result, b);
                }
            }
            return result;
        };
    export const andNullValueType = compositeAndType<NullValueType>
    ([
        andTypeOptional,
    ]);
    export const andBoolanValueType = compositeAndType<BooleanValueType>
    ([
        andTypeOptional,
        andTypeEnum,
    ]);
    export const andNumberValueType = compositeAndType<NumberValueType>
    ([
        andTypeOptional,
        andTypeEnum,
        andTypeMinMaxValue,
    ]);
    export const andStringValueType = compositeAndType<StringValueType>
    ([
        andTypeOptional,
        andTypeEnum,
        andTypeFormat,
    ]);
    export const andArrayType = compositeAndType<ArrayType>
    ([
        andTypeOptional,
        andTypeMinMaxLength,
        andTypeItemType,
    ]);
    export const andTupleType = compositeAndType<TupleType>
    ([
        andTypeOptional,
        andTypeList,
    ]);
    export const andObjectType = compositeAndType<ObjectType>
    ([
        andTypeOptional,
        andTypeObjectMember,
    ]);
    export const andTemplateType = compositeAndType<TemplateType>
    ([
        andTypeOptional,
        andTypeParameter,
        andTypeReturn,
    ]);
    export const andMetaType = compositeAndType<MetaType>
    ([
        andTypeOptional,
        andTypeParameter,
        andTypeReturn,
    ]);
    export const andIfMatch = <TargetType extends Type>(isMatch: ((type: Type) => type is TargetType), mergeTarget: (a: TargetType, b: TargetType) => TargetType | NeverType) =>
        (a: Type, b: Type): TargetType | NeverType | undefined =>
            isMatch(a) && isMatch(b) ? mergeTarget(a, b): undefined;
    const andTypeEntryList: ((a: Type, b: Type) => Type | undefined)[] =
    [
        andIfMatch(isNullValueTypeData, andNullValueType),
        andIfMatch(isBooleanValueTypeData, andBoolanValueType),
        andIfMatch(isNumberValueTypeData, andNumberValueType),
        andIfMatch(isStringValueTypeData, andStringValueType),
        andIfMatch(isArrayTypeData, andArrayType),
        andIfMatch(isTupleTypeData, andTupleType),
        andIfMatch(isObjectTypeData, andObjectType),
        andIfMatch(isTemplateTypeData, andTemplateType),
        andIfMatch(isMetaTypeData, andMetaType),
    ];
    export const andType = (list: Type[]): Type =>
    {
        if (0 < list.length)
        {
            let result: Type =
            {
                ...list[0],
            };
            for(let i = 1; i < list.length; ++i)
            {
                const current = list[0];
                if (result.type !== current.type)
                {
                    return { $arch: "type", type: "never", };
                }
                for(let j in andTypeEntryList)
                {
                    const x = andTypeEntryList[j](result, current);
                    if (undefined !== x)
                    {
                        result = x;
                        break;
                    }
                }
            }
            return result;
        }
        else
        {
            return { $arch: "type", type: "never", };
        }
    };
    export const regulateType = (compositeType: Type): Type =>
    {
        // if (isTypeReferData(compositeType))
        // {
        //     compositeType.refer
        // }
        // else
        if (isAndCompositeTypeData(compositeType))
        {
            return regulateType(andType(compositeType.list));
        }
        else
        if (isOrCompositeTypeData(compositeType))
        {
            return <OrCompositeType>{ ...compareType, list: compositeType.list.map(i => regulateType(i)), };
        }
        else
        if (isArrayTypeData(compositeType))
        {
            return <ArrayType>{ ...compareType, itemType: regulateType(compositeType.itemType), };
        }
        else
        if (isTupleTypeData(compositeType))
        {
            return <TupleType>{ ...compareType, list: compositeType.list.map(i => regulateType(i)), };
        }
        else
        if (isObjectTypeData(compositeType))
        {
            const member: { [key: string]: Type; } = { };
            objectKeys(compositeType.member).forEach(key => member[key] = regulateType(compositeType.member[key]));
            return <ObjectType>{ ...compositeType, member, };
        }
        else
        {
            return compositeType;
        }
    };
    export const turnRefer = <Element extends JsonableValue | Function>(root: Structure<Element>, refer: Refer): Structure<Element> | undefined =>
    {
        let rest = refer.map(i => i);
        let current: Structure<Element> | undefined = root;
        while(true)
        {
            if (rest.length <= 0)
            {
                return current;
            }
            if (undefined === current || null === current || "object" !== typeof current)
            {
                return undefined;
            }
            const key = rest.shift();
            if ("number" === typeof key && Array.isArray(current))
            {
                current = current[key];
            }
            else
            if ("string" === typeof key && ! Array.isArray(current) && key in current)
            {
                current = current[key];
            }
            else
            {
                throw new ErrorJson
                ({
                    "$arch": "error",
                    "message": "Unmatch refer path",
                });
            }
        }
    };
    export const resolveRefer = (entry: EvaluateEntry<AlphaJsonarch & { refer: Refer }>): Jsonable | undefined =>
    {
        return turnRefer<JsonableValue>
        (
            {
                template: entry.cache.template,
                type: entry.cache.type,
                value: entry.cache.value,
                parameter: entry.parameter,
            },
            entry.template.refer
        );
    };
    export const evaluateCall = (entry: EvaluateEntry<Call>): Promise<Jsonable> => profile
    (
        entry, "evaluateCall", async () =>
        {
            const target = turnRefer<JsonableValue | Function>
            (
                {
                    string:
                    {
                        join: Library.String.json,
                    },
                    template: entry.cache.template,
                },
                entry.template.refer
            );
            if ("function" === typeof target)
            {
                const parameter = validateParameterType(entry, await makeParameter(entry));
                const result = await target(entry, parameter);
                if (undefined === result)
                {
                    throw UnmatchParameterTypeDefineError(entry, parameter);
                }
                return result;
            }
            else
            if (isTemplateData(target))
            {
                return await evaluateTemplate
                ({
                    ...entry,
                    template: target,
                });
            }
            else
            {
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
    export const evaluateIfMatch = <TargetType extends AlphaJsonarch>(isMatch: ((entry: AlphaJsonarch) => entry is TargetType), evaluateTarget: (entry: EvaluateEntry<TargetType>) => Promise<Jsonable>) =>
        async (entry: EvaluateEntry<AlphaJsonarch>): Promise<Jsonable | undefined> =>
            isMatch(entry.template) ? evaluateTarget(<EvaluateEntry<TargetType>>entry): undefined;
    const evaluatorList: ((entry: EvaluateEntry<AlphaJsonarch>) => Promise<Jsonable | undefined>)[] =
    [
        evaluateIfMatch(isStaticData, evaluateStatic),
        evaluateIfMatch(isIncludeStaticJsonData, evaluateIncludeStaticJson),
        evaluateIfMatch(isTemplateData, evaluateTemplate),
        evaluateIfMatch(isCallData, evaluateCall),
        evaluateIfMatch(isValueData, evaluateValue),
    ];
    export const evaluate = (entry: EvaluateEntry<AlphaJsonarch>): Promise<Jsonable> => profile
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
    export const multiplyString = (text: string, count: number): string =>
        count < 1 ? "": (multiplyString(text +text, Math.floor(count /2)) + (0 === count % 2 ? "": text));
    export const smartJsonStringify = (json: Jsonable, indent: "tab" | number = 4, base: number = 0): string =>
    {
        let result = "";
        const baseIndent = "tab" === indent ?
            multiplyString("\t", base):
            multiplyString(" ", indent *base);
        const nextIndent = "tab" === indent ?
            multiplyString("\t", base +1):
            multiplyString(" ", indent *(base +1));
        if (isJsonableObject(json))
        {
            if (objectValues(json).some(i => isJsonableObject(i) || Array.isArray(i)))
            {
                result += baseIndent +"{\n";
                let isFirst = true;
                objectKeys(json).forEach
                (
                    key =>
                    {
                        const value = json[key];
                        if (undefined !== value)
                        {
                            if (isFirst)
                            {
                                isFirst = false;
                            }
                            else
                            {
                                result += ",\n";
                            }
                            const valueJson = smartJsonStringify(value, indent, base +1);
                            if (0 <= valueJson.indexOf("\n"))
                            {
                                result += nextIndent +jsonStringify(key) +":\n";
                                result += valueJson;
                            }
                            else
                            {
                                result += nextIndent +jsonStringify(key) +": " +valueJson;
                            }
                        }
                    }
                );
                result += "\n" +baseIndent +"}";
            }
            else
            {
                result += "{";
                let isFirst = true;
                objectKeys(json).forEach
                (
                    key =>
                    {
                        const value = json[key];
                        if (undefined !== value)
                        {
                            if (isFirst)
                            {
                                isFirst = false;
                            }
                            else
                            {
                                result += ",";
                            }
                            result += " " +jsonStringify(key) +": " +jsonStringify(value);
                        }
                    }
                );
                result += " }";
            }
        }
        else
        if (Array.isArray(json))
        {
            if (json.some(i => isJsonableObject(i) || Array.isArray(i)))
            {
                result += baseIndent +"[\n";
                let isFirst = true;
                json.forEach
                (
                    value =>
                    {
                        if (isFirst)
                        {
                            isFirst = false;
                        }
                        else
                        {
                            result += ",\n";
                        }
                        const valueJson = smartJsonStringify(value, indent, base +1);
                        if (0 <= valueJson.indexOf("\n"))
                        {
                            result += valueJson;
                        }
                        else
                        {
                            result += nextIndent +valueJson;
                        }
                    }
                );
                result += "\n" +baseIndent +"]";
            }
            else
            {
                result += "[";
                let isFirst = true;
                json.forEach
                (
                    value =>
                    {
                        if (isFirst)
                        {
                            isFirst = false;
                        }
                        else
                        {
                            result += ",";
                        }
                        result += " " +jsonStringify(value);
                    }
                );
                result += " ]";
            }
        }
        else
        {
            result += jsonStringify(json);
        }
        if (base <= 0)
        {
            result += "\n";
        }
        return result;
    };
    export const jsonToString = (json: Jsonable, asType: "result" | "output", setting: Setting): string =>
    {
        const indent = setting.indent ?? "smart";
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
        if ("smart" === indent)
        {
            return smartJsonStringify(json, 4);
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
