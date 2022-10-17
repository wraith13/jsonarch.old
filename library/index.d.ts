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
    export const isJsonableValue: (value: unknown) => value is JsonableValue;
    export const isJsonableObject: (value: unknown) => value is JsonableObject;
    export const isJsonableArray: (value: unknown) => value is Jsonable[];
    export const isJsonable: (value: unknown) => value is Jsonable;
    export const objectKeys: <T extends {}>(target: T) => (keyof T & string)[];
    export const objectValues: <T extends {}>(target: T) => T[keyof T][];
    export type IsType<Type> = (value: unknown) => value is Type;
    export const isJust: <Type_1>(type: Type_1) => (value: unknown) => value is Type_1;
    export const isUndefined: (value: unknown) => value is undefined;
    export const isNull: (value: unknown) => value is null;
    export const isUndefinedOr: <T>(isType: IsType<T>) => IsType<T | undefined>;
    export const isNullOr: <T>(isType: IsType<T>) => IsType<T | null>;
    export const isUndefinedOrNullOr: <T>(isType: IsType<T>) => IsType<T | null | undefined>;
    export const isBoolean: (value: unknown) => value is boolean;
    export const isNumber: (value: unknown) => value is number;
    export const isString: (value: unknown) => value is string;
    export const isObject: <T extends {}>(isMember: { [key in keyof T]: IsType<T[key]>; }) => (value: unknown) => value is T;
    export const isArray: <T>(isType: IsType<T>) => (value: unknown) => value is T[];
    export function isTuple<TypeA, TypeB>(isA: IsType<TypeA>, isB: IsType<TypeB>): IsType<[TypeA, TypeB]>;
    export function isTuple<TypeA, TypeB, TypeC>(isA: IsType<TypeA>, isB: IsType<TypeB>, isC: IsType<TypeC>): IsType<[TypeA, TypeB, TypeC]>;
    export function isTuple<TypeA, TypeB, TypeC, TypeD>(isA: IsType<TypeA>, isB: IsType<TypeB>, isC: IsType<TypeC>, isD: IsType<TypeD>): IsType<[TypeA, TypeB, TypeC, TypeD]>;
    export function isTuple<TypeA, TypeB, TypeC, TypeD, TypeE>(isA: IsType<TypeA>, isB: IsType<TypeB>, isC: IsType<TypeC>, isD: IsType<TypeD>, isE: IsType<TypeE>): IsType<[TypeA, TypeB, TypeC, TypeD, TypeE]>;
    export function isTuple<TypeA, TypeB, TypeC, TypeD, TypeE, TypeF>(isA: IsType<TypeA>, isB: IsType<TypeB>, isC: IsType<TypeC>, isD: IsType<TypeD>, isE: IsType<TypeE>, isF: IsType<TypeF>): IsType<[TypeA, TypeB, TypeC, TypeD, TypeE, TypeF]>;
    export function isTuple<TypeA, TypeB, TypeC, TypeD, TypeE, TypeF, TypeG>(isA: IsType<TypeA>, isB: IsType<TypeB>, isC: IsType<TypeC>, isD: IsType<TypeD>, isE: IsType<TypeE>, isF: IsType<TypeF>, isG: IsType<TypeG>): IsType<[TypeA, TypeB, TypeC, TypeD, TypeE, TypeF, TypeG]>;
    export function isTuple<TypeA, TypeB, TypeC, TypeD, TypeE, TypeF, TypeG, TypeH>(isA: IsType<TypeA>, isB: IsType<TypeB>, isC: IsType<TypeC>, isD: IsType<TypeD>, isE: IsType<TypeE>, isF: IsType<TypeF>, isG: IsType<TypeG>, isH: IsType<TypeH>): IsType<[TypeA, TypeB, TypeC, TypeD, TypeE, TypeF, TypeG, TypeH]>;
    export function isTuple<TypeA, TypeB, TypeC, TypeD, TypeE, TypeF, TypeG, TypeH, TypeI>(isA: IsType<TypeA>, isB: IsType<TypeB>, isC: IsType<TypeC>, isD: IsType<TypeD>, isE: IsType<TypeE>, isF: IsType<TypeF>, isG: IsType<TypeG>, isH: IsType<TypeH>, isI: IsType<TypeI>): IsType<[TypeA, TypeB, TypeC, TypeD, TypeE, TypeF, TypeG, TypeH, TypeI]>;
    export function isEnum<TypeA, TypeB>(list: [TypeA, TypeB]): IsType<TypeA | TypeB>;
    export function isEnum<TypeA, TypeB, TypeC>(list: [TypeA, TypeB, TypeC]): IsType<TypeA | TypeB | TypeC>;
    export function isEnum<TypeA, TypeB, TypeC, TypeD>(list: [TypeA, TypeB, TypeC, TypeD]): IsType<TypeA | TypeB | TypeC | TypeD>;
    export function isEnum<TypeA, TypeB, TypeC, TypeD, TypeE>(list: [TypeA, TypeB, TypeC, TypeD, TypeE]): IsType<TypeA | TypeB | TypeC | TypeD | TypeE>;
    export function isEnum<TypeA, TypeB, TypeC, TypeD, TypeE, TypeF>(list: [TypeA, TypeB, TypeC, TypeD, TypeE, TypeF]): IsType<TypeA | TypeB | TypeC | TypeD | TypeE | TypeF>;
    export function isEnum<TypeA, TypeB, TypeC, TypeD, TypeE, TypeF, TypeG>(list: [TypeA, TypeB, TypeC, TypeD, TypeE, TypeF, TypeG]): IsType<TypeA | TypeB | TypeC | TypeD | TypeE | TypeF | TypeG>;
    export function isEnum<TypeA, TypeB, TypeC, TypeD, TypeE, TypeF, TypeG, TypeH>(list: [TypeA, TypeB, TypeC, TypeD, TypeE, TypeF, TypeG, TypeH]): IsType<TypeA | TypeB | TypeC | TypeD | TypeE | TypeF | TypeG | TypeH>;
    export function isEnum<TypeA, TypeB, TypeC, TypeD, TypeE, TypeF, TypeG, TypeH, TypeI>(list: [TypeA, TypeB, TypeC, TypeD, TypeE, TypeF, TypeG, TypeH, TypeI]): IsType<TypeA | TypeB | TypeC | TypeD | TypeE | TypeF | TypeG | TypeH | TypeI>;
    export function isEnum<TypeA, TypeB, TypeC, TypeD, TypeE, TypeF, TypeG, TypeH, TypeI, TypeJ>(list: [TypeA, TypeB, TypeC, TypeD, TypeE, TypeF, TypeG, TypeH, TypeI, TypeJ]): IsType<TypeA | TypeB | TypeC | TypeD | TypeE | TypeF | TypeG | TypeH | TypeI | TypeJ>;
    export function isEnum<TypeA, TypeB, TypeC, TypeD, TypeE, TypeF, TypeG, TypeH, TypeI, TypeJ, TypeK>(list: [TypeA, TypeB, TypeC, TypeD, TypeE, TypeF, TypeG, TypeH, TypeI, TypeJ, TypeK]): IsType<TypeA | TypeB | TypeC | TypeD | TypeE | TypeF | TypeG | TypeH | TypeI | TypeJ | TypeK>;
    export function isEnum<TypeA, TypeB, TypeC, TypeD, TypeE, TypeF, TypeG, TypeH, TypeI, TypeJ, TypeK, TypeL>(list: [TypeA, TypeB, TypeC, TypeD, TypeE, TypeF, TypeG, TypeH, TypeI, TypeJ, TypeK, TypeL]): IsType<TypeA | TypeB | TypeC | TypeD | TypeE | TypeF | TypeG | TypeH | TypeI | TypeJ | TypeK | TypeL>;
    export function isEnum<TypeA, TypeB, TypeC, TypeD, TypeE, TypeF, TypeG, TypeH, TypeI, TypeJ, TypeK, TypeL, TypeM>(list: [TypeA, TypeB, TypeC, TypeD, TypeE, TypeF, TypeG, TypeH, TypeI, TypeJ, TypeK, TypeL, TypeM]): IsType<TypeA | TypeB | TypeC | TypeD | TypeE | TypeF | TypeG | TypeH | TypeI | TypeJ | TypeK | TypeL | TypeM>;
    export function isEnum<TypeA, TypeB, TypeC, TypeD, TypeE, TypeF, TypeG, TypeH, TypeI, TypeJ, TypeK, TypeL, TypeM, TypeN>(list: [TypeA, TypeB, TypeC, TypeD, TypeE, TypeF, TypeG, TypeH, TypeI, TypeJ, TypeK, TypeL, TypeM, TypeN]): IsType<TypeA | TypeB | TypeC | TypeD | TypeE | TypeF | TypeG | TypeH | TypeI | TypeJ | TypeK | TypeL | TypeM | TypeN>;
    export function isEnum<TypeA, TypeB, TypeC, TypeD, TypeE, TypeF, TypeG, TypeH, TypeI, TypeJ, TypeK, TypeL, TypeM, TypeN, TypeO>(list: [TypeA, TypeB, TypeC, TypeD, TypeE, TypeF, TypeG, TypeH, TypeI, TypeJ, TypeK, TypeL, TypeM, TypeN, TypeO]): IsType<TypeA | TypeB | TypeC | TypeD | TypeE | TypeF | TypeG | TypeH | TypeI | TypeJ | TypeK | TypeL | TypeM | TypeN | TypeO>;
    export function isEnum<TypeA, TypeB, TypeC, TypeD, TypeE, TypeF, TypeG, TypeH, TypeI, TypeJ, TypeK, TypeL, TypeM, TypeN, TypeO, TypeP>(list: [TypeA, TypeB, TypeC, TypeD, TypeE, TypeF, TypeG, TypeH, TypeI, TypeJ, TypeK, TypeL, TypeM, TypeN, TypeO, TypeP]): IsType<TypeA | TypeB | TypeC | TypeD | TypeE | TypeF | TypeG | TypeH | TypeI | TypeJ | TypeK | TypeL | TypeM | TypeN | TypeO | TypeP>;
    export function isTypeOr<TypeA, TypeB>(isA: IsType<TypeA>, isB: IsType<TypeB>): IsType<TypeA | TypeB>;
    export function isTypeOr<TypeA, TypeB, TypeC>(isA: IsType<TypeA>, isB: IsType<TypeB>, isC: IsType<TypeC>): IsType<TypeA | TypeB | TypeC>;
    export function isTypeOr<TypeA, TypeB, TypeC, TypeD>(isA: IsType<TypeA>, isB: IsType<TypeB>, isC: IsType<TypeC>, isD: IsType<TypeD>): IsType<TypeA | TypeB | TypeC | TypeD>;
    export function isTypeOr<TypeA, TypeB, TypeC, TypeD, TypeE>(isA: IsType<TypeA>, isB: IsType<TypeB>, isC: IsType<TypeC>, isD: IsType<TypeD>, isE: IsType<TypeE>): IsType<TypeA | TypeB | TypeC | TypeD | TypeE>;
    export function isTypeOr<TypeA, TypeB, TypeC, TypeD, TypeE, TypeF>(isA: IsType<TypeA>, isB: IsType<TypeB>, isC: IsType<TypeC>, isD: IsType<TypeD>, isE: IsType<TypeE>, isF: IsType<TypeF>): IsType<TypeA | TypeB | TypeC | TypeD | TypeE | TypeF>;
    export function isTypeOr<TypeA, TypeB, TypeC, TypeD, TypeE, TypeF, TypeG>(isA: IsType<TypeA>, isB: IsType<TypeB>, isC: IsType<TypeC>, isD: IsType<TypeD>, isE: IsType<TypeE>, isF: IsType<TypeF>, isG: IsType<TypeG>): IsType<TypeA | TypeB | TypeC | TypeD | TypeE | TypeF | TypeG>;
    export function isTypeOr<TypeA, TypeB, TypeC, TypeD, TypeE, TypeF, TypeG, TypeH>(isA: IsType<TypeA>, isB: IsType<TypeB>, isC: IsType<TypeC>, isD: IsType<TypeD>, isE: IsType<TypeE>, isF: IsType<TypeF>, isG: IsType<TypeG>, isH: IsType<TypeH>): IsType<TypeA | TypeB | TypeC | TypeD | TypeE | TypeF | TypeG | TypeH>;
    export function isTypeOr<TypeA, TypeB, TypeC, TypeD, TypeE, TypeF, TypeG, TypeH, TypeI>(isA: IsType<TypeA>, isB: IsType<TypeB>, isC: IsType<TypeC>, isD: IsType<TypeD>, isE: IsType<TypeE>, isF: IsType<TypeF>, isG: IsType<TypeG>, isH: IsType<TypeH>, isI: IsType<TypeI>): IsType<TypeA | TypeB | TypeC | TypeD | TypeE | TypeF | TypeG | TypeH | TypeI>;
    export type Lazy<T extends Structure<JsonableValue | undefined>> = T | (() => T);
    export const getLazyValue: <T extends Structure<JsonableValue | undefined>>(lazy: Lazy<T>) => T;
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
    export interface AlphaJsonarch extends JsonableObject {
        $arch: string;
    }
    export const isJsonarch: <Type_1 extends AlphaJsonarch>(type: Type_1["$arch"]) => (template: unknown) => template is Type_1;
    export const isAlphaJsonarch: (template: any) => template is AlphaJsonarch;
    export interface Profile {
        isProfiling: boolean;
        score: {
            [scope: string]: number;
        };
        stack: ProfileEntry[];
    }
    export interface ProfileEntry {
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
    export interface Cache extends AlphaJsonarch {
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
    export const isCache: (template: unknown) => template is Cache;
    export interface Setting extends AlphaJsonarch {
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
    export const isSetting: (template: unknown) => template is Setting;
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
    export interface Handler {
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
    export const isEvaluateTargetEntry: (entry: EvaluateEntry<Jsonable>) => entry is EvaluateEntry<AlphaJsonarch>;
    export interface Result extends AlphaJsonarch {
        $arch: "result";
        output: Jsonable;
        profile?: any;
        trace?: any;
        originMap?: any;
        influenceMap?: any;
        callGraph?: any;
        setting: Setting;
    }
    export const isResult: (template: unknown) => template is Result;
    export interface JsonarchError extends AlphaJsonarch {
        $arch: "error";
        message: string;
    }
    export const isError: (template: unknown) => template is JsonarchError;
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
    export interface StaticTemplate extends AlphaJsonarch {
        $arch: "static";
        return: Jsonable;
    }
    export const isStaticData: (template: unknown) => template is StaticTemplate;
    export const evaluateStatic: (entry: EvaluateEntry<StaticTemplate>) => Promise<Jsonable>;
    export interface IncludeStaticJsonTemplate extends AlphaJsonarch {
        $arch: "include-static-json";
        path: string;
    }
    export const isIncludeStaticJsonData: (template: unknown) => template is IncludeStaticJsonTemplate;
    export const evaluateIncludeStaticJson: (entry: EvaluateEntry<IncludeStaticJsonTemplate>) => Promise<Jsonable>;
    export interface Template extends AlphaJsonarch {
        $arch: "template";
        type?: {
            parameter?: Type;
            return?: Type;
        };
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
    export const isTemplateData: (template: unknown) => template is Template;
    export const applyDefault: (defaults: Jsonable | undefined, parameter: Jsonable | undefined) => Jsonable | undefined;
    export const evaluateTemplate: (entry: EvaluateEntry<Template>) => Promise<Jsonable>;
    type ReferKeyElement = string;
    type ReferIndextElement = number;
    type ReferElement = ReferKeyElement | ReferIndextElement;
    type Refer = ReferElement[];
    export interface AlphaType extends AlphaJsonarch {
        $arch: "type";
        type: PrimitiveType;
        optional?: boolean;
    }
    export const isAlphaTypeData: <Type_1 extends AlphaType>(type: Type_1["type"]) => (template: unknown) => template is Type_1;
    export interface AlphaEnumType<ValueType extends JsonableValue> extends AlphaType {
        enum?: ValueType[];
        neverEnum?: ValueType[];
    }
    export interface TypeRefer extends AlphaType {
        type: "refer";
        refer: Refer;
        parameter?: Jsonable;
    }
    export const isTypeReferData: (template: unknown) => template is TypeRefer;
    export interface NeverType extends AlphaType {
        type: "never";
    }
    export const isNeverTypeData: (template: unknown) => template is NeverType;
    export interface UnknownType extends AlphaType {
        type: "unknown";
    }
    export const isUnknownTypeData: (template: unknown) => template is UnknownType;
    export interface AnyType extends AlphaType {
        type: "any";
    }
    export const isAnyTypeData: (template: unknown) => template is AnyType;
    export interface NullValueType extends AlphaType {
        type: "null";
    }
    export const isNullValueTypeData: (template: unknown) => template is NullValueType;
    export interface BooleanValueType extends AlphaEnumType<boolean> {
        type: "boolean";
    }
    export const isBooleanValueTypeData: (template: unknown) => template is BooleanValueType;
    export interface FormatStringValueType extends AlphaType {
        type: "string";
        format?: string;
    }
    export interface EnumStringValueType extends AlphaEnumType<string> {
        type: "string";
    }
    export type StringValueType = FormatStringValueType | EnumStringValueType;
    export const isStringValueTypeData: (template: unknown) => template is StringValueType;
    export interface RangeNumberValueType extends AlphaType {
        type: "number";
        integerOnly?: boolean;
        minValue?: number;
        maxValue?: number;
        enum: never;
    }
    export interface EnumNumberValueType extends AlphaEnumType<number> {
        type: "number";
        integerOnly: never;
        minValue: never;
        maxValue: never;
    }
    export type NumberValueType = RangeNumberValueType | EnumNumberValueType;
    export const isNumberValueTypeData: (template: unknown) => template is NumberValueType;
    export const isRangeNumberValueTypeData: (value: unknown) => value is RangeNumberValueType;
    export const isEnumNumberValueTypeData: (value: unknown) => value is EnumNumberValueType;
    export type ValueType = NullValueType | BooleanValueType | NumberValueType | StringValueType;
    export type PrimitiveValueType = ValueType["type"];
    export const isValueTypeData: (template: unknown) => template is ValueType;
    export interface ArrayType extends AlphaType {
        type: "array";
        itemType: Type;
        minLength?: number;
        maxLength?: number;
    }
    export const isArrayTypeData: (template: unknown) => template is ArrayType;
    export interface TupleType extends AlphaType {
        type: "tuple";
        list: Type[];
    }
    export const isTupleTypeData: (template: unknown) => template is TupleType;
    export interface ObjectType extends AlphaType {
        type: "object";
        member: {
            [key: string]: Type;
        };
    }
    export const isObjectTypeData: (template: unknown) => template is ObjectType;
    export type StructureType = ArrayType | TupleType | ObjectType;
    export type PrimitiveStructureType = StructureType["type"];
    export const isStructureTypeData: (template: unknown) => template is StructureType;
    export interface OrCompositeType extends AlphaType {
        type: "or";
        list: Type[];
    }
    export const isOrCompositeTypeData: (template: unknown) => template is OrCompositeType;
    export interface AndCompositeType extends AlphaType {
        type: "and";
        list: Type[];
    }
    export const isAndCompositeTypeData: (template: unknown) => template is AndCompositeType;
    export type CompositeType = OrCompositeType | AndCompositeType;
    export type PrimitiveCompositeType = CompositeType["type"];
    export const isCompositeTypeData: (template: unknown) => template is CompositeType;
    export interface TemplateType extends AlphaType {
        type: "template";
        parameter: Type;
        return: Type;
    }
    export const isTemplateTypeData: (template: unknown) => template is TemplateType;
    export interface MetaType extends AlphaType {
        type: "meta";
        parameter: Type;
        return: Type;
    }
    export const isMetaTypeData: (template: unknown) => template is MetaType;
    export type Type = TypeRefer | NeverType | UnknownType | AnyType | ValueType | ArrayType | TupleType | ObjectType | CompositeType | TemplateType | MetaType;
    export type PrimitiveType = Type["type"];
    export const isTypeData: (template: unknown) => template is Type;
    export interface Call extends AlphaJsonarch {
        $arch: "call";
        refer: Refer;
        parameter?: Jsonable;
    }
    export const isCallData: (template: unknown) => template is Call;
    export interface Value extends AlphaJsonarch {
        $arch: "value";
        refer: Refer;
    }
    export const isValueData: (template: unknown) => template is Value;
    export const typeOfJsonable: (json: Jsonable | undefined) => Type;
    export module Library {
        module String {
            const json: (parameter: Jsonable | undefined) => string;
        }
    }
    export type CompareTypeResult = "unmatch" | "base" | "equal" | "extended";
    export const isBaseOrEqual: (result: CompareTypeResult) => boolean;
    export const isEqualOrExtented: (result: CompareTypeResult) => boolean;
    export const reverseCompareTypeResult: (result: CompareTypeResult) => CompareTypeResult;
    export const compositeCompareTypeResult: (...list: Lazy<CompareTypeResult | undefined>[]) => CompareTypeResult;
    export const compareTypeOptional: (a: Type, b: Type) => CompareTypeResult;
    export const compareTypeEnum: <ValueType_1 extends JsonableValue>(a: AlphaEnumType<ValueType_1>, b: AlphaEnumType<ValueType_1>) => CompareTypeResult;
    export const compareTypeNeverEnum: <ValueType_1 extends JsonableValue>(a: AlphaEnumType<ValueType_1>, b: AlphaEnumType<ValueType_1>) => CompareTypeResult;
    export const compareTypeMinValue: (a: NumberValueType, b: NumberValueType) => CompareTypeResult;
    export const compareTypeMaxValue: (a: NumberValueType, b: NumberValueType) => CompareTypeResult;
    export const compareTypeMinMaxValue: (a: NumberValueType, b: NumberValueType) => CompareTypeResult;
    export const compareTypeFormat: (a: StringValueType, b: StringValueType) => CompareTypeResult;
    export const compareTypeMinLength: (a: ArrayType, b: ArrayType) => CompareTypeResult;
    export const compareTypeMaxLength: (a: ArrayType, b: ArrayType) => CompareTypeResult;
    export const compareTypeMinMaxLength: (a: ArrayType, b: ArrayType) => CompareTypeResult;
    export const compareTypeList: (a: Type[], b: Type[]) => CompareTypeResult;
    export const compareTypeObjectMember: (a: ObjectType, b: ObjectType) => CompareTypeResult;
    export const compareTypeOrComposite: (a: OrCompositeType, b: Type) => CompareTypeResult;
    export const compareTypeMeta: (_a: MetaType, _b: Type) => CompareTypeResult;
    export const compositeCompareType: <TargetType extends Type>(comparer: ((a: TargetType, b: TargetType) => CompareTypeResult)[]) => (a: TargetType, b: TargetType) => CompareTypeResult;
    export const compareNullValueType: (a: NullValueType, b: NullValueType) => CompareTypeResult;
    export const compareBoolanValueType: (a: BooleanValueType, b: BooleanValueType) => CompareTypeResult;
    export const compareNumberValueType: (a: NumberValueType, b: NumberValueType) => CompareTypeResult;
    export const compareStringValueType: (a: StringValueType, b: StringValueType) => CompareTypeResult;
    export const compareArrayType: (a: ArrayType, b: ArrayType) => CompareTypeResult;
    export const compareTupleType: (a: TupleType, b: TupleType) => CompareTypeResult;
    export const compareObjectType: (a: ObjectType, b: ObjectType) => CompareTypeResult;
    export const compareTemplateType: (a: TemplateType, b: TemplateType) => CompareTypeResult;
    export const compareMetaType: (a: MetaType, b: MetaType) => CompareTypeResult;
    export const compareIfMatch: <TargetType extends Type>(isMatch: (type: Type) => type is TargetType, compareTarget: (a: TargetType, b: TargetType) => CompareTypeResult) => (a: Type, b: Type) => CompareTypeResult | undefined;
    export const compareTypeArrayAndTuple: (a: ArrayType, b: TupleType) => CompareTypeResult;
    export const compareType: (a: Type, b: Type) => CompareTypeResult;
    export const isCompatibleType: (source: Type, destination: Type) => boolean;
    export const andTypeOptional: <TargetType extends Type>(a: TargetType, b: TargetType) => TargetType;
    export const andTypeEnum: <ValueType_1 extends JsonableValue, TargetType extends AlphaEnumType<ValueType_1>>(a: TargetType, b: TargetType) => NeverType | TargetType;
    export const andTypeMinMaxValue: <TargetType extends NumberValueType>(a: TargetType, b: TargetType) => NeverType | TargetType;
    export const andTypeFormat: <TargetType extends StringValueType>(a: TargetType, b: TargetType) => NeverType | TargetType;
    export const andTypeMinMaxLength: <TargetType extends ArrayType>(a: TargetType, b: TargetType) => NeverType | TargetType;
    export const andTypeItemType: <TargetType extends ArrayType>(a: TargetType, b: TargetType) => NeverType | TargetType;
    export const andTypeList: <TargetType extends TupleType>(a: TargetType, b: TargetType) => NeverType | TargetType;
    export const andTypeObjectMember: <TargetType extends ObjectType>(a: TargetType, b: TargetType) => NeverType | TargetType;
    export const andTypeParameter: <TargetType extends Type & {
        parameter: Type;
    }>(a: TargetType, b: TargetType) => NeverType | TargetType;
    export const andTypeReturn: <TargetType extends Type & {
        return: Type;
    }>(a: TargetType, b: TargetType) => NeverType | TargetType;
    export const compositeAndType: <TargetType extends Type>(merger: ((a: TargetType, b: TargetType) => NeverType | TargetType)[]) => (a: TargetType, b: TargetType) => NeverType | TargetType;
    export const andNullValueType: (a: NullValueType, b: NullValueType) => NeverType | NullValueType;
    export const andBoolanValueType: (a: BooleanValueType, b: BooleanValueType) => NeverType | BooleanValueType;
    export const andNumberValueType: (a: NumberValueType, b: NumberValueType) => NeverType | NumberValueType;
    export const andStringValueType: (a: StringValueType, b: StringValueType) => NeverType | StringValueType;
    export const andArrayType: (a: ArrayType, b: ArrayType) => NeverType | ArrayType;
    export const andTupleType: (a: TupleType, b: TupleType) => NeverType | TupleType;
    export const andObjectType: (a: ObjectType, b: ObjectType) => NeverType | ObjectType;
    export const andTemplateType: (a: TemplateType, b: TemplateType) => NeverType | TemplateType;
    export const andMetaType: (a: MetaType, b: MetaType) => NeverType | MetaType;
    export const andIfMatch: <TargetType extends Type>(isMatch: (type: Type) => type is TargetType, mergeTarget: (a: TargetType, b: TargetType) => NeverType | TargetType) => (a: Type, b: Type) => NeverType | TargetType | undefined;
    export const andType: (list: Type[]) => Type;
    export const regulateType: (compositeType: Type) => Type;
    export const turnRefer: <Element_1 extends Function | JsonableValue>(root: Structure<Element_1>, refer: Refer) => Structure<Element_1> | undefined;
    export const resolveRefer: (entry: EvaluateEntry<AlphaJsonarch & {
        refer: Refer;
    }>) => Jsonable | undefined;
    export const evaluateCall: (entry: EvaluateEntry<Call>) => Promise<Jsonable>;
    export const evaluateValue: (entry: EvaluateEntry<Value>) => Promise<Jsonable>;
    export const evaluateIfMatch: <TargetType extends AlphaJsonarch>(isMatch: (entry: AlphaJsonarch) => entry is TargetType, evaluateTarget: (entry: EvaluateEntry<TargetType>) => Promise<Jsonable>) => (entry: EvaluateEntry<AlphaJsonarch>) => Promise<Jsonable | undefined>;
    export const evaluate: (entry: EvaluateEntry<AlphaJsonarch>) => Promise<Jsonable>;
    export const apply: (entry: EvaluateEntry<Jsonable>) => Promise<Jsonable>;
    export const applyRoot: (entry: CompileEntry, template: Jsonable, parameter: Jsonable, cache: Cache, setting: Setting) => Promise<Result>;
    export const process: (entry: CompileEntry) => Promise<Result>;
    export const multiplyString: (text: string, count: number) => string;
    export const smartJsonStringify: (json: Jsonable, indent?: "tab" | number, base?: number) => string;
    export const jsonToString: (json: Jsonable, asType: "result" | "output", setting: Setting) => string;
    export const throwIfError: <DataType extends Jsonable>(json: DataType) => DataType;
    export {};
}
