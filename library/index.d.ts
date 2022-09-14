import languageEn from "./language/en.json";
import languageJa from "./language/ja.json";
export declare module Jsonarch {
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
    export module Locale {
        const master: {
            en: {
                $name: string;
            };
            ja: {
                $name: string;
            };
        };
        type LocaleKeyType = keyof typeof languageEn & keyof typeof languageJa;
        type LocaleType = keyof typeof master;
        const locales: ("en" | "ja")[];
        const getSystemLocale: () => "en" | "ja";
        const getShortLocale: (locale: string) => string;
        const getMatchLocaleKey: (locale: string) => "en" | "ja";
        const getLocaleName: (locale: LocaleType) => string;
        const setLocale: (locale: LocaleType | null) => void;
        const getPrimary: (key: LocaleKeyType) => string;
        const getSecondary: (key: LocaleKeyType) => string;
        const string: (key: string) => string;
        const map: (key: LocaleKeyType) => string;
        const parallel: (key: LocaleKeyType) => string;
    }
    export const templateSchema = "https://raw.githubusercontent.com/wraith13/jsonarch/master/json-schema/template-json-schema.json#";
    export const settingSchema = "https://raw.githubusercontent.com/wraith13/jsonarch/master/json-schema/setting-json-schema.json#";
    export type JsonableValue = null | boolean | number | string;
    export interface JsonableObject {
        [key: string]: undefined | Jsonable;
    }
    export type Jsonable = JsonableValue | Jsonable[] | JsonableObject;
    export type JsonablePartial<Target> = {
        [key in keyof Target]?: Target[key];
    } & JsonableObject;
    export const jsonStringify: <T extends Jsonable>(source: T, replacer?: ((this: any, key: string, value: any) => any) | undefined, space?: string | number) => string;
    export const jsonParse: <T extends Jsonable = Jsonable>(text: string, reviver?: ((this: any, key: string, value: any) => any) | undefined) => T;
    export const objectKeys: <T extends JsonableObject>(target: T) => (keyof T & string)[];
    interface JsonarchBase extends JsonableObject {
        $arch: string;
    }
    export const isJsonarchBase: (template: Jsonable) => template is JsonarchBase;
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
    export interface NoneFileContext<DataType extends Jsonable = Jsonable> {
        category: "none";
        data: DataType;
    }
    export interface NetFileContext {
        category: "net";
        path: string;
    }
    export interface LocalFileContext {
        category: "local";
        path: string;
    }
    export type FilePathCategory<DataType extends Jsonable = Jsonable> = FileContext<DataType>["category"];
    export type FileContext<DataType extends Jsonable = Jsonable> = NoneFileContext<DataType> | NetFileContext | LocalFileContext;
    export const isNoneFileContext: <DataType extends Jsonable = Jsonable>(file: FileContext) => file is NoneFileContext<DataType>;
    export const isNetFileContext: (file: FileContext) => file is NetFileContext;
    export const isLocalFileContext: (file: FileContext) => file is LocalFileContext;
    export const makeFullPath: (contextOrEntry: ContextOrEntry, path: string) => string;
    export const jsonToFileContext: <DataType extends Jsonable = Jsonable>(data: DataType) => NoneFileContext<DataType>;
    export const pathToFileContext: (contextOrEntry: ContextOrEntry, path: string) => NetFileContext | LocalFileContext;
    export const commandLineArgumentToFileContext: (argument: string) => FileContext;
    export interface Context {
        template: FileContext;
        parameter?: FileContext;
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
        values?: {
            [key: string]: Jsonable;
        };
        templates?: {
            [key: string]: Jsonable;
        };
    }
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
        cache?: Cache;
    }
    interface LoadEntry<ContextType extends FileContext = FileContext> {
        context: Context;
        setting: Setting;
        handler: Handler;
        file: ContextType;
    }
    export const isNoneFileLoadEntry: <DataType extends Jsonable = Jsonable>(entry: LoadEntry) => entry is LoadEntry<NoneFileContext<DataType>>;
    export const isNetFileLoadEntry: (entry: LoadEntry) => entry is LoadEntry<NetFileContext>;
    export const isLocalFileLoadEntry: (entry: LoadEntry) => entry is LoadEntry<LocalFileContext>;
    interface Handler {
        load?: (entry: LoadEntry<NetFileContext | LocalFileContext>) => Promise<string>;
    }
    interface EvaluateEntry<TemplateType> {
        context: Context;
        template: TemplateType;
        parameter: Jsonable;
        setting: Setting;
        handler: Handler;
    }
    interface CompileEntry extends Context {
        handler: Handler;
    }
    export const isEvaluateTargetEntry: (entry: EvaluateEntry<Jsonable>) => entry is EvaluateEntry<JsonarchBase>;
    export const isJsonarch: <Type extends JsonarchBase>(type: Type["$arch"]) => (template: Jsonable) => template is Type;
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
    interface JsonarchError extends JsonarchBase {
        $arch: "error";
        message: string;
    }
    export const getTicks: () => number;
    export const profile: <ResultT>(contextOrEntry: Context | {
        context: Context;
    }, name: string, target: () => Promise<ResultT>) => Promise<ResultT>;
    export const ErrorJson: {
        (json: JsonarchError): Error;
        new (json: JsonarchError): Error;
    };
    export const parseErrorJson: (error: Error) => JsonarchError | string;
    export const loadNetFile: (entry: LoadEntry<NetFileContext>) => Promise<string>;
    export const loadLocalFile: (entry: LoadEntry<LocalFileContext>) => Promise<any>;
    export const loadFile: (entry: LoadEntry<NetFileContext | LocalFileContext>) => Promise<any>;
    export const load: <DataType extends Jsonable = Jsonable>(entry: LoadEntry<FileContext<DataType>>) => Promise<DataType>;
    interface StaticTemplate extends JsonarchBase {
        $arch: "static";
        return: Jsonable;
    }
    export const isStaticData: (template: Jsonable) => template is StaticTemplate;
    export const evaluateStatic: (entry: EvaluateEntry<JsonarchBase>) => Promise<Jsonable | undefined>;
    interface IncludeStaticJsonTemplate extends JsonarchBase {
        $arch: "include-static-json";
        path: string;
    }
    export const isIncludeStaticJsonData: (template: Jsonable) => template is IncludeStaticJsonTemplate;
    export const evaluateIncludeStaticJson: (entry: EvaluateEntry<JsonarchBase>) => Promise<Jsonable | undefined>;
    export const evaluate: (entry: EvaluateEntry<JsonarchBase>) => Promise<Jsonable>;
    export const apply: (entry: EvaluateEntry<Jsonable>) => Promise<Jsonable>;
    export const applyRoot: (entry: CompileEntry, template: Jsonable, parameter: Jsonable, setting: Setting) => Promise<Result>;
    export const process: (entry: CompileEntry) => Promise<Result>;
    export const jsonToString: (json: Jsonable, asType: "result" | "output", setting: Setting) => string;
    export {};
}
