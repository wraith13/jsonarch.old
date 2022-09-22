export * as Locale from "./locale";
export declare module Jsonarch {
    export interface StructureObject<Element> {
        [key: string]: undefined | Structure<Element>;
    }
    export type Structure<Element> = Element | Structure<Element>[] | StructureObject<Element>;
    export type JsonableValue = null | boolean | number | string;
    export type JsonableObject = StructureObject<JsonableValue>;
    export type Jsonable = Structure<JsonableValue>;
    export type JsonablePartial<Target> = {
        [key in keyof Target]?: Target[key];
    } & JsonableObject;
    export const jsonStringify: <T extends Jsonable>(source: T, replacer?: ((this: any, key: string, value: any) => any) | undefined, space?: string | number) => string;
    export const jsonParse: <T extends Jsonable = Jsonable>(text: string, reviver?: ((this: any, key: string, value: any) => any) | undefined) => T;
    export const objectKeys: <T extends object>(target: T) => (keyof T & string)[];
    export const isString: (value: unknown) => value is string;
    export const isNumber: (value: unknown) => value is number;
    export const isObject: (value: unknown, isMember?: {
        [key: string]: (x: unknown) => boolean;
    }) => value is object;
    export const isArray: <T>(value: unknown, isType: (x: unknown) => x is T) => value is T[];
    export const getTemporaryDummy: "en" | "ja";
    export const packageJson: {
        name: string;
        version: string;
        preview: boolean;
        description: string;
        author: string;
        license: string;
    };
    export const name: string;
    export const version: string;
    export const templateSchema = "https://raw.githubusercontent.com/wraith13/jsonarch/master/json-schema/template-json-schema.json#";
    export const settingSchema = "https://raw.githubusercontent.com/wraith13/jsonarch/master/json-schema/setting-json-schema.json#";
    interface JsonarchBase extends JsonableObject {
        $arch: string;
    }
    export const isJsonarch: <Type extends JsonarchBase>(type: Type["$arch"]) => (template: any) => template is Type;
    export const isJsonarchBase: (template: any) => template is JsonarchBase;
    interface Profile {
        isProfiling: boolean;
        score: {
            [scope: string]: number;
        };
        stack: ProfileEntry[];
    }
    interface ProfileEntry {
        name: string;
        startTicks: number;
        childrenTicks: number;
    }
    export type SystemFileType = "boot-setting.json" | "default-setting.json";
    export type HashType = string;
    export interface SystemFileContext {
        category: "system";
        id: SystemFileType;
        hash?: HashType;
    }
    export interface NoneFileContext<DataType extends Jsonable = Jsonable> {
        category: "none";
        data: DataType;
        hash?: HashType;
    }
    export interface NetFileContext {
        category: "net";
        path: string;
        hash?: HashType;
    }
    export interface LocalFileContext {
        category: "local";
        path: string;
        hash?: HashType;
    }
    export type FilePathCategory<DataType extends Jsonable = Jsonable> = FileContext<DataType>["category"];
    export type FileContext<DataType extends Jsonable = Jsonable> = SystemFileContext | NoneFileContext<DataType> | NetFileContext | LocalFileContext;
    export const isSystemFileContext: (file: FileContext) => file is SystemFileContext;
    export const isNoneFileContext: <DataType extends Jsonable = Jsonable>(file: FileContext) => file is NoneFileContext<DataType>;
    export const isNetFileContext: (file: FileContext) => file is NetFileContext;
    export const isLocalFileContext: (file: FileContext) => file is LocalFileContext;
    export const makeFullPath: (contextOrEntry: ContextOrEntry, path: string) => string;
    export const getSystemFileContext: (id: SystemFileType) => SystemFileContext;
    export const jsonToFileContext: <DataType extends Jsonable = Jsonable>(data: DataType, hash?: HashType) => NoneFileContext<DataType>;
    export const pathToFileContext: (contextOrEntry: ContextOrEntry, path: string) => NetFileContext | LocalFileContext;
    export const getHashFromPath: (path: string) => HashType | undefined;
    export const commandLineArgumentToFileContext: <DataType extends Jsonable = Jsonable>(argument: string) => FileContext<DataType>;
    export interface Context {
        template: FileContext;
        parameter?: FileContext;
        cache?: FileContext<Cache>;
        setting?: FileContext<Setting>;
        profile?: Profile;
    }
    export type ContextOrEntry = Context | {
        context: Context;
    };
    export const getContext: (contextOrEntry: ContextOrEntry) => Context;
    export interface Cache extends JsonarchBase {
        $arch: "cache";
        json?: {
            [path: string]: Jsonable;
        };
        template?: {
            [key: string]: Jsonable;
        };
        type?: {
            [key: string]: Jsonable;
        };
        value?: {
            [key: string]: Jsonable;
        };
    }
    export const isCache: (template: any) => template is Cache;
    export interface Setting extends JsonarchBase {
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
    export const isSetting: (template: any) => template is Setting;
    interface LoadEntry<ContextType extends FileContext = FileContext> {
        context: Context;
        cache: Cache;
        setting: Setting;
        handler: Handler;
        file: ContextType;
    }
    export const isSystemFileLoadEntry: (entry: LoadEntry) => entry is LoadEntry<SystemFileContext>;
    export const isNoneFileLoadEntry: <DataType extends Jsonable = Jsonable>(entry: LoadEntry) => entry is LoadEntry<NoneFileContext<DataType>>;
    export const isNetFileLoadEntry: (entry: LoadEntry) => entry is LoadEntry<NetFileContext>;
    export const isLocalFileLoadEntry: (entry: LoadEntry) => entry is LoadEntry<LocalFileContext>;
    interface Handler {
        load?: (entry: LoadEntry<NetFileContext | LocalFileContext>) => Promise<string>;
    }
    interface EvaluateEntry<TemplateType> {
        context: Context;
        template: TemplateType;
        parameter: Jsonable | undefined;
        cache: Cache;
        setting: Setting;
        handler: Handler;
    }
    interface CompileEntry extends Context {
        handler: Handler;
    }
    export const isEvaluateTargetEntry: (entry: EvaluateEntry<Jsonable>) => entry is EvaluateEntry<JsonarchBase>;
    interface Result extends JsonarchBase {
        $arch: "result";
        output: Jsonable;
        profile?: any;
        trace?: any;
        originMap?: any;
        influenceMap?: any;
        callGraph?: any;
        setting: Setting;
    }
    export const isResult: (template: any) => template is Result;
    interface JsonarchError extends JsonarchBase {
        $arch: "error";
        message: string;
    }
    export const isError: (template: any) => template is JsonarchError;
    export const getTicks: () => number;
    export const profile: <ResultT>(contextOrEntry: Context | {
        context: Context;
    }, name: string, target: () => Promise<ResultT>) => Promise<ResultT>;
    export const ErrorJson: {
        (json: JsonarchError): Error;
        new (json: JsonarchError): Error;
    };
    export const parseErrorJson: (error: Error) => JsonarchError;
    export const loadSystemJson: <DataType extends Jsonable = Jsonable>(entry: LoadEntry<SystemFileContext>) => Promise<DataType>;
    export const loadNetFile: (entry: LoadEntry<NetFileContext>) => Promise<string>;
    export const loadLocalFile: (entry: LoadEntry<LocalFileContext>) => Promise<string>;
    export const loadFile: (entry: LoadEntry<NetFileContext | LocalFileContext>) => Promise<string>;
    export const load: <DataType extends Jsonable = Jsonable>(entry: LoadEntry<FileContext<DataType>>) => Promise<DataType>;
    interface StaticTemplate extends JsonarchBase {
        $arch: "static";
        return: Jsonable;
    }
    export const isStaticData: (template: any) => template is StaticTemplate;
    export const evaluateStatic: (entry: EvaluateEntry<StaticTemplate>) => Promise<Jsonable>;
    interface IncludeStaticJsonTemplate extends JsonarchBase {
        $arch: "include-static-json";
        path: string;
    }
    export const isIncludeStaticJsonData: (template: any) => template is IncludeStaticJsonTemplate;
    export const evaluateIncludeStaticJson: (entry: EvaluateEntry<IncludeStaticJsonTemplate>) => Promise<Jsonable>;
    interface Template extends JsonarchBase {
        $arch: "template";
        type?: string;
        default?: {
            parameter?: Jsonable;
            setting?: Setting;
        };
        override?: {
            parameter?: Jsonable;
            setting?: Setting;
        };
        member?: JsonableObject;
        return: Jsonable;
        catch?: JsonableObject;
    }
    export const isTemplateData: (template: any) => template is Template;
    export const applyDefault: (defaults: Jsonable | undefined, parameter: Jsonable | undefined) => Jsonable | undefined;
    export const evaluateTemplate: (entry: EvaluateEntry<Template>) => Promise<Jsonable>;
    type ReferKeyElement = string;
    type ReferIndextElement = number;
    type ReferElement = ReferKeyElement | ReferIndextElement;
    type Refer = ReferElement[];
    interface Call extends JsonarchBase {
        $arch: "call";
        refer: Refer;
        parameter?: Jsonable;
    }
    export const isCallData: (template: any) => template is Call;
    interface Value extends JsonarchBase {
        $arch: "value";
        refer: Refer;
    }
    export const isValueData: (template: any) => template is Value;
    export module Library {
        module String {
            const json: (parameter: Jsonable | undefined) => string;
        }
    }
    export const turnRefer: <Element_1 extends string | number | boolean | Function | null>(root: Structure<Element_1>, refer: Refer) => Structure<Element_1> | undefined;
    export const resolveRefer: (entry: EvaluateEntry<JsonarchBase & {
        refer: Refer;
    }>) => Jsonable | undefined;
    export const evaluateCall: (entry: EvaluateEntry<Call>) => Promise<Jsonable>;
    export const evaluateValue: (entry: EvaluateEntry<Value>) => Promise<Jsonable>;
    export const evaluateIfMatch: <TargetType extends JsonarchBase>(isMatch: (entry: JsonarchBase) => entry is TargetType, evaluateTarget: (entry: EvaluateEntry<TargetType>) => Promise<Jsonable>) => (entry: EvaluateEntry<JsonarchBase>) => Promise<Jsonable | undefined>;
    export const evaluate: (entry: EvaluateEntry<JsonarchBase>) => Promise<Jsonable>;
    export const apply: (entry: EvaluateEntry<Jsonable>) => Promise<Jsonable>;
    export const applyRoot: (entry: CompileEntry, template: Jsonable, parameter: Jsonable, cache: Cache, setting: Setting) => Promise<Result>;
    export const process: (entry: CompileEntry) => Promise<Result>;
    export const jsonToString: (json: Jsonable, asType: "result" | "output", setting: Setting) => string;
    export const throwIfError: <DataType extends Jsonable>(json: DataType) => DataType;
    export {};
}
