import * as System from "./system";
import * as Comparer from "./comparer";
import bootSettingJson from "./boot.setting.json";
import settingJson from "./setting.json";
import librarygJson from "./library.json";
import * as Locale from "./locale";
export * as Locale from "./locale";
export module Jsonarch
{
    export function undefinedable<ParameterType, ReturnType>(target: (parameter: ParameterType) => ReturnType): (parameter: ParameterType | undefined) => ReturnType | undefined;
    export function undefinedable<ParameterType, ReturnType, DefaultType>(target: (parameter: ParameterType) => ReturnType, defaultResult: DefaultType): (parameter: ParameterType | undefined) => ReturnType | DefaultType;
    export function undefinedable<ParameterType, ReturnType, DefaultType>(target: (parameter: ParameterType) => ReturnType, defaultResult?: DefaultType)
    {
        return (parameter: ParameterType | undefined) => undefined === parameter ? defaultResult: target(parameter);
    }
    export interface StructureObject<Element>
    {
        [key: string]: Structure<Element>;
    }
    export type Structure<Element> = Element | Structure<Element>[] | StructureObject<Element>;
    export const structure = <Element, ResultType>(processor: (value: Element, key?: number | string) => ResultType) =>
    {
        const self = (value: Structure<Element>, key?: number | string): Structure<ResultType> =>
        {
            if (Array.isArray(value))
            {
                return value.map((i, ix) => self(i, ix));
            }
            else
            if (null !== value && "object" === typeof value)
            {
                const result: StructureObject<ResultType> = { };
                objectKeys(value).forEach
                (
                    key => result[key] = self(<Element>value[key], key)
                );
                return result;
            }
            else
            {
                return processor(value, key);
            }
        };
        return self;
    };
    export const structureAsync = <Element, ResultType>(processor: (value: Element, key?: number | string) => Promise<ResultType>) =>
    {
        const self = async (value: Structure<Element>, key?: number | string): Promise<Structure<Element | ResultType>> =>
        {
            if (Array.isArray(value))
            {
                return await Promise.all(value.map(async (i, ix) => await self(i, ix)));
            }
            else
            if (null !== value && "object" === typeof value)
            {
                const result: StructureObject<Element | ResultType> = { };
                await Promise.all(objectKeys(value).map(async key => result[key] = await self(<Element>value[key], key)));
                return result;
            }
            else
            {
                return await processor(value, key);
            }
        };
        return self;
    };
    export const hasStructure = <Element>(processor: (value: Element, key?: number | string) => boolean) =>
    {
        const self = (value: Structure<Element>, key?: number | string): boolean =>
        {
            if (Array.isArray(value))
            {
                return value.some((i, ix) => self(i, ix));
            }
            else
            if (null !== value && "object" === typeof value)
            {
                return objectKeys(value).some(key => self(<Element>value[key], key));
            }
            else
            {
                return processor(value, key);
            }
        };
        return self;
    };
    export const structureObject = <Element, ResultType>(processor: (value: StructureObject<Element>, key?: number | string) => ResultType | undefined) =>
    {
        const self = (value: Structure<Element>, key?: number | string): Structure<Element | ResultType> =>
        {
            if (Array.isArray(value))
            {
                return value.map((i, ix) => self(i, ix));
            }
            else
            if (null !== value && "object" === typeof value)
            {
                const processed = processor(<StructureObject<Element>>value, key);
                if (undefined !== processed)
                {
                    return processed;
                }
                else
                {
                    const result: StructureObject<Element | ResultType> = { };
                    objectKeys(value).forEach
                    (
                        key => result[key] = self(<Element>value[key], key)
                    );
                    return result;
                }
            }
            else
            {
                return value;
            }
        };
        return self;
    };
    export const structureObjectAsync = <Element, ResultType>(processor: (value: StructureObject<Element>, key?: number | string) => Promise<ResultType | undefined>) =>
    {
        const self = async (value: Structure<Element>, key?: number | string): Promise<Structure<Element | ResultType>> =>
        {
            if (Array.isArray(value))
            {
                return await Promise.all(value.map(async (i, ix) => await self(i, ix)));
            }
            else
            if (null !== value && "object" === typeof value)
            {
                const processed = await processor(<StructureObject<Element>>value, key);
                if (undefined !== processed)
                {
                    return processed;
                }
                else
                {
                    const result: StructureObject<Element | ResultType> = { };
                    await Promise.all(objectKeys(value).map(async key => result[key] = await self(<Element>value[key], key)));
                    return result;
                }
            }
            else
            {
                return value;
            }
        };
        return self;
    };
    export const hasStructureObject = <Element>(processor: (value: StructureObject<Element>, key?: number | string) => boolean) =>
    {
        const self = (value: Structure<Element>, key?: number | string): boolean =>
        {
            if (Array.isArray(value))
            {
                return value.some((i, ix) => self(i, ix));
            }
            else
            if (null !== value && "object" === typeof value)
            {
                return processor(<StructureObject<Element>>value, key) || objectKeys(value).some(key => self(<Element>value[key], key));
            }
            else
            {
                return false;
            }
        };
        return self;
    };
    export type JsonableValue = undefined | null | boolean | number | string;
    export type JsonableObject = StructureObject<JsonableValue>;
    export type Jsonable = Structure<JsonableValue>;
    export type JsonablePartial<Target> = { [key in keyof Target]?: Target[key] } & JsonableObject;
    export const jsonStringify = <T extends Jsonable>(source: T, replacer?: (this: any, key: string, value: any) => any, space?: string | number) =>
        JSON.stringify(source, replacer, space);
    export const jsonParse = <T extends Jsonable = Jsonable>(text: string, reviver?: (this: any, key: string, value: any) => any) =>
        JSON.parse(text, reviver) as T;
    export const isJsonableValue = (value: unknown): value is JsonableValue =>
        null === value || [ "boolean", "number", "string" ].includes(typeof value);
    export const isJsonableObject = (value: unknown): value is JsonableObject =>
        null !== value &&
        "object" === typeof value &&
        ! Array.isArray(value) &&
        objectValues(value).every(i => undefined === i || isJsonable(i));
    export const isJsonableArray = (value: unknown): value is Jsonable[] =>
        Array.isArray(value) && value.every(i => isJsonable(i));
    export const isJsonable = (value: unknown): value is Jsonable =>
        isJsonableValue(value) || isJsonableArray(value) || isJsonableObject(value);
    export const objectKeys = <T extends { }>(target: T) => Object.keys(target) as (keyof T & string)[];
    export const objectValues = <T extends { }>(target: T) => Object.values(target) as (T[keyof T])[];
    export const regulateJsonable = <TargetType extends Jsonable>(value: TargetType, shallowOrDeep: "shallow" | "deep"): TargetType =>
    {
        if (undefined === value || null === value)
        {
            return null as TargetType;
        }
        else
        if (Array.isArray(value))
        {
            if ("shallow" === shallowOrDeep)
            {
                return value;
            }
            else
            {
                return (<Jsonable[]>value).map(i => regulateJsonable(i, shallowOrDeep)) as TargetType;
            }
        }
        else
        if ("object" === typeof value)
        {
            const result: JsonableObject = { };
            objectKeys(value).forEach
            (
                key =>
                {
                    const v = value[key];
                    if (undefined !== v)
                    {
                        if ("shallow" === shallowOrDeep)
                        {
                            result[key] = v;
                        }
                        else
                        {
                            result[key] = regulateJsonable(v, shallowOrDeep);
                        }
                    }
                }
            );
            return result as TargetType;
        }
        else
        {
            return value;
        }
    };
    export const toJsonable = (value: any, maxDepth: number = 10, currentDepth: number = 0): Jsonable =>
    {
        if (maxDepth <= currentDepth)
        {
            return "$over-depth";
        }
        if (null !== value)
        {
            if ("object" === typeof value)
            {
                if (Array.isArray(value))
                {
                    return value.map(i => toJsonable(i, maxDepth, currentDepth +1));
                }
                else
                {
                    const result: { [key: string]: Jsonable } = { };
                    objectKeys(value).forEach
                    (
                        key =>
                        {
                            if (undefined !== value[key])
                            {
                                result[key] = toJsonable(value[key], maxDepth, currentDepth +1);
                            }
                        }
                    );
                    return result;
                }
            }
            else
            {
                const type = typeof value;
                switch(type)
                {
                case "boolean":
                case "number":
                case "string":
                    return value;
                case "undefined":
                    return "$undefined";
                default:
                    return `$${type}:${value.toString()}`;
                }
            }
        }
        return value;
    };
    export const getJsonableErrors = (value: any, path: string = "root"): string[] =>
    {
        const result: string[] = [];
        if (Array.isArray(value))
        {
            value.forEach((i, ix) => result.push(...getJsonableErrors(i, `${path}/${ix}`)));
        }
        else
        if (null !== value && "object" === typeof value)
        {
            objectKeys(value).forEach(key => result.push(...getJsonableErrors(value[key], `${path}/${key}`)));
        }
        else
        {
            if ( ! ["boolean", "number", "string"].includes(typeof value))
            {
                result.push(path);
            }
        }
        return result;
    };
    export type IsType<Type> = (value: unknown) => value is Type;
    export const isAny = (_value: unknown): _value is any => true;
    export const isJust = <Type>(type: Type) => (value: unknown): value is Type => type === value;
    export const isUndefined = isJust(undefined);
    export const isNull = isJust(null);
    export const isUndefinedOr = <T>(isType: IsType<T>) => isTypeOr(isUndefined, isType);
    export const isNullOr = <T>(isType: IsType<T>) => isTypeOr(isNull, isType);
    export const isUndefinedOrNullOr = <T>(isType: IsType<T>) => isTypeOr(isUndefined, isNull, isType);
    export const isJustValue = <Type>(type: Type) => (value: unknown): value is Type => type === value;
    export const isBoolean = (value: unknown): value is boolean => "boolean" === typeof value;
    export const isNumber = (value: unknown): value is number => "number" === typeof value;
    export const isString = (value: unknown): value is string => "string" === typeof value;
    export const isFunction = <FunctionType extends Function>(value: unknown): value is FunctionType => "function" === typeof value;
    export const isObject = <T extends { }>(isMember: Required<{ [key in keyof T]: IsType<T[key]> }>): (value: unknown) => value is T =>
        (value: unknown): value is T =>
            null !== value &&
            "object" === typeof value &&
            ! Array.isArray(value) &&
            objectKeys(isMember).every(key => isMember[key]((<{ [key:string]: unknown }>value)[key]));
    export const isMapObject = <T extends { [key: string | number]: U}, U>(isType: IsType<U>): (value: unknown) => value is T =>
        (value: unknown): value is T =>
            null !== value &&
            "object" === typeof value &&
            ! Array.isArray(value) &&
            objectValues(value).every(i => isType(i));
    export const isArray = <T>(isType: IsType<T>): (value: unknown) => value is T[] =>
        (value: unknown): value is T[] => Array.isArray(value) && value.every(i => isType(i));
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
        return (value: unknown) => Array.isArray(value) && isTypeList.every((i, ix) => i(value[ix]));
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
        return (value: unknown) => list.includes(value);
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
    export type LazyValue<T extends Structure<JsonableValue | undefined | Function>> = T | (() => T);
    export const getLazyValue = <T extends Structure<JsonableValue | undefined | Function>>(lazy: LazyValue<T>): T =>
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
        $arch: JsonarchType;
    }
    export const isJsonarch = <Type extends AlphaJsonarch>(type: Type["$arch"]) =>
        ((template: unknown): template is Type =>
            isAlphaJsonarch(template) && type === template.$arch);
    export const isAlphaJsonarch = (template: any): template is AlphaJsonarch =>
        null !== template &&
        "object" === typeof template &&
        "$arch" in template &&
        "string" === typeof template.$arch;
    export type Intermediate = IntermediateTarget<Jsonable>;
    export interface IntermediateTarget<TargetType extends Jsonable> extends AlphaJsonarch
    {
        $arch: "intermediate";
        type: Type;
        value: IntermediateTargetNest<TargetType>;
        origin: Origin;
    }
    export type IntermediateTargetNest<TargetType extends Jsonable> =
        TargetType extends (infer ItemType extends Jsonable)[] ? IntermediateTarget<ItemType>[]:
        TargetType extends JsonableObject ? { [key in keyof TargetType]: IntermediateTarget<TargetType[key]>; }:
        TargetType;
    export const isIntermediate = isJsonarch<Intermediate>("intermediate");
    export const isIntermediateTargetObject =
        <TargetType extends JsonableObject>(isMember: Required<{ [key in keyof TargetType]: undefined extends TargetType[key] ? IsType<undefined | IntermediateTarget<TargetType[key]>>: IsType<IntermediateTarget<TargetType[key]>> }>) =>
        (value: unknown): value is IntermediateTarget<TargetType> =>
            isIntermediate(value) &&
            objectKeys(isMember).every(key => isMember[key]((<{ [key:string]: unknown }>value.value)[key]));
    export const isIntermediateTargetValue =
        <TargetType extends Jsonable>(isType: IsType<TargetType>) =>
        (value: unknown): value is IntermediateTarget<TargetType> =>
            isIntermediate(value) && isType(value.value);
    export const isIntermediateJsonarch = (template: unknown): template is IntermediateTarget<AlphaJsonarch> =>
        isIntermediate(template) &&
        null !== template.value &&
        "object" === typeof template.value &&
        "$arch" in template.value && "string" === typeof template.value.$arch.value;
    export const getIntermediateJsonarchType = (template: unknown): JsonarchType | undefined =>
        isIntermediateJsonarch(template) ? template.value.$arch.value: undefined;
    export const isIntermediateJsonarchTarget = <Type extends AlphaJsonarch>(type: Type["$arch"]) =>
        (template: unknown): template is IntermediateTarget<Type> =>
            type === getIntermediateJsonarchType(template);
    export const makeOutput = (intermediate: Intermediate | Jsonable, base: Origin): { output: Jsonable; originMap: OriginMap; } =>
    {
        const originMap: OriginMap = { };
        if (isIntermediate(intermediate))
        {
            originMap[jsonStringify(base)] = intermediate.origin;
        }
        const value = getValueFromIntermediateOrValue(intermediate);
        if (Array.isArray(value))
        {
            const output: Jsonable[] = [ ];
            for(const i in value)
            {
                const ix = parseInt(i);
                const v = value[ix];
                const r = makeOutput(v, makeOrigin(base, ix));
                output.push(r.output);
                Object.assign(originMap, r.originMap);
            }
            return { output, originMap, };
        }
        else
        if (null !== value && "object" === typeof value)
        {
            const output: JsonableObject = { };
            const keys = objectKeys<JsonableObject>(value);
            for(const i in keys)
            {
                const key = keys[i];
                const v = value[key];
                if (undefined !== v)
                {
                    const r = makeOutput(v, makeOrigin(base, key));
                    output[key] = r.output;
                    Object.assign(originMap, r.originMap);
                }
            }
            return { output, originMap, };
        }
        else
        {
            const output = value;
            return { output, originMap, };
        }
    };
    export const makeSolid = <TargetType extends Jsonable>(intermediate: IntermediateTarget<TargetType>): TargetType =>
    {
        const value = getValueFromIntermediateOrValue(intermediate);
        if (Array.isArray(value))
        {
            return value.map(i => makeSolid(i)) as TargetType;
        }
        else
        if (null !== value && "object" === typeof value)
        {
            const output: JsonableObject = { };
            const keys = objectKeys(value);
            keys.forEach(key => output[key] = makeSolid(value[key] as IntermediateTarget<Jsonable>));
            return output as TargetType;
        }
        else
        {
            return value as TargetType;
        }
    };
    // export const makeIntermediate = async (entry: EvaluateEntry<Jsonable>, value: Jsonable, origin: Origin): Promise<Intermediate> =>
    // ({
    //     $arch: "intermediate",
    //     type: await typeOfResult(entry, value),
    //     value,
    //     origin,
    // });
    export const makeInputIntermediate = async <TargetType extends Jsonable>(entry: ContextOrEntry, target: TargetType, origin: Origin): Promise<IntermediateTarget<TargetType>> =>
    {
        if (isIntermediate(target))
        {
            return target as IntermediateTarget<TargetType>;
        }
        else
        {
            let value: IntermediateTargetNest<TargetType>;
            if (Array.isArray(target))
            {
                const result: Intermediate[] = [ ];
                for(const i in target)
                {
                    const ix = parseInt(i);
                    const v = target[ix];
                    result.push(await makeInputIntermediate(entry, v, makeOrigin(origin, ix)));
                }
                value = <IntermediateTargetNest<TargetType>>result;
            }
            else
            if (null !== target && "object" === typeof target)
            {
                const result: IntermediateTargetNest<Jsonable> = { };
                const keys = objectKeys<JsonableObject>(target);
                for(const i in keys)
                {
                    const key = keys[i];
                    const v = target[key] as Jsonable;
                    result[key] = await makeInputIntermediate(entry, v, makeOrigin(origin, key));
                }
                value = <IntermediateTargetNest<TargetType>>result;
            }
            else
            {
                value = <IntermediateTargetNest<TargetType>>target;
            }
            const result: IntermediateTarget<TargetType> =
            {
                $arch: "intermediate",
                type: await typeOfInput(entry, value),
                value: value as IntermediateTargetNest<TargetType>,
                origin,
            };
            return result;
        }
    };
    export const makeOutputIntermediate = async <TargetType extends Jsonable>(entry: EvaluateEntry<Jsonable> | ContextOrEntry, target: TargetType | IntermediateTarget<TargetType>, origin: Origin): Promise<IntermediateTarget<TargetType>> => profile
    (
        entry, "makeOutputIntermediate", async () =>
        {
            if (isIntermediate(target))
            {
                return target;
                // throw await new ErrorJson(entry, "never", { target, origin, });
            }
            else
            {
                let value: IntermediateTargetNest<TargetType>;
                if (Array.isArray(target))
                {
                    const result: Intermediate[] = [ ];
                    for(const i in target)
                    {
                        const ix = parseInt(i);
                        const v = target[ix];
                        result.push(await makeOutputIntermediate(entry, v, makeOrigin(origin, ix)));
                    }
                    value = <IntermediateTargetNest<TargetType>>result;
                }
                else
                if (null !== target && "object" === typeof target)
                {
                    const result: IntermediateTargetNest<Jsonable> = { };
                    const keys = objectKeys<JsonableObject>(target);
                    for(const i in keys)
                    {
                        const key = keys[i];
                        const v = target[key] as Jsonable;
                        result[key] = await makeOutputIntermediate(entry, v, makeOrigin(origin, key));
                    }
                    value = <IntermediateTargetNest<TargetType>>result;
                }
                else
                {
                    value = <IntermediateTargetNest<TargetType>>target;
                }
                const result: IntermediateTarget<TargetType> =
                {
                    $arch: "intermediate",
                    type: await typeOfResult(entry, target),
                    value,
                    origin,
                };
                return result;
            }
        }
    );
    export const makeErrorIntermediate = async <TemplateType extends Jsonable, DetailType extends Jsonable>(entry: EvaluateEntry<TemplateType> | ContextOrEntry, target: JsonarchError<DetailType>): Promise<IntermediateTarget<JsonarchError<DetailType>>> =>
        isEvaluateEntry(isAny)(entry) ?
            await makeOutputIntermediate(entry, target, entry.path):
            await makeOutputIntermediate(entry, target, { root: { category: "system", id: "jsonarch.json", }, refer: "root", });
    export const getValueFromIntermediateOrValue = <ValueType>(intermediateOrValue: ValueType | Intermediate): ValueType =>
        isIntermediate(intermediateOrValue) ? <ValueType>intermediateOrValue.value: intermediateOrValue;
    
    export interface ProfileScore extends JsonableObject
    {
        count: number;
        time: number;
    }
    export interface Profile extends JsonableObject
    {
        isProfiling: boolean;
        score: { [scope: string]: ProfileScore };
        template: { [path: string]: ProfileScore };
        parameter: { [path: string]: ProfileScore };
        stack: ProfileEntry[];
        startAt: number;
    }
    export const makeProfile = (data: Partial<Profile> = { }): Profile =>
    ({
        isProfiling: true,
        score: { },
        template: { },
        parameter: { },
        stack: [ ],
        startAt: getTicks(),
        ...data,
    });
    export interface ProfileEntry extends JsonableObject
    {
        scope: string;
        template: string;
        parameter: string[];
        startTicks: number;
        childrenTicks: number;
    }
    export const isProfileEntry = isObject<ProfileEntry>
    ({
        scope: isString,
        template: isString,
        parameter: isArray(isString),
        startTicks: isNumber,
        childrenTicks: isNumber,
    });
    export const isProfileScore = isObject<ProfileScore>({ count: isNumber, time: isNumber, });
    export const isProfile = isObject<Profile>
    ({
        isProfiling: isBoolean,
        score: isMapObject(isProfileScore),
        template: isMapObject(isProfileScore),
        parameter: isMapObject(isProfileScore),
        stack: isArray(isProfileEntry),
        startAt: isNumber,
    });
    export const makeProfileReport = (profile: Profile) =>
    {
        const total = objectValues(profile.score).map(i => i.time).reduce((a, b) => a +b, 0);
        const makeData = (score: ProfileScore) =>
        ({
            count: score.count,
            time: score.time,
            percent: (score.time /total) *100,
        });
        const result =
        {
            parameter: objectKeys(profile.parameter).map
            (
                path =>
                ({
                    parameter: jsonParse(path),
                    ...makeData(profile.template[path]),
                })
            )
            .sort
            (
                Comparer.make<{ parameter: Jsonable, count: number, time: number, }>
                ([
                    item => -item.time,
                    item => -item.count,
                    item => jsonStringify(item.parameter),
                ])
            ),
            template: objectKeys(profile.template).map
            (
                path =>
                ({
                    template: jsonParse(path),
                    ...makeData(profile.template[path]),
                })
            )
            .sort
            (
                Comparer.make<{ template: Jsonable, count: number, time: number, }>
                ([
                    item => -item.time,
                    item => -item.count,
                    item => jsonStringify(item.template),
                ])
            ),
            system: objectKeys(profile.score).map
            (
                scope =>
                ({
                    scope,
                    ...makeData(profile.score[scope]),
                })
            )
            .sort
            (
                Comparer.make<{ scope: string, count: number, time: number, }>
                ([
                    item => -item.time,
                    item => -item.count,
                    item => item.scope,
                ])
            ),
        };
        return result;
    };
    export type SystemFileType = "jsonarch.json" | "boot-setting.json" | "default-setting.json" | "library.json";
    export const isSystemFileType = isEnum<"jsonarch.json", "boot-setting.json", "default-setting.json", "library.json">
    ([
        "jsonarch.json",
        "boot-setting.json",
        "default-setting.json",
        "library.json"
    ]);
    export type HashType = string;
    export interface SystemFileContext extends JsonableObject
    {
        category: "system";
        id: SystemFileType;
        hash?: HashType;
    }
    export interface NoneFileContext<DataType extends Jsonable = Jsonable> extends JsonableObject
    {
        category: "none";
        data: DataType;
        hash?: HashType;
    }
    export interface NetFileContext extends JsonableObject
    {
        category: "net";
        path: string;
        hash?: HashType;
    }
    export interface LocalFileContext extends JsonableObject
    {
        category: "local";
        path: string;
        hash?: HashType;
    }
    export type FilePathCategory<DataType extends Jsonable = Jsonable> = FileContext<DataType>["category"];
    export type FileContext<DataType extends Jsonable = Jsonable> = SystemFileContext | NoneFileContext<DataType> | NetFileContext | LocalFileContext;
    export const isSystemFileContext = isObject<SystemFileContext>({ category: isJust("system"), id: isSystemFileType, hash: isUndefinedOr(isString), });
    export const isNoneFileContext = isObject<NoneFileContext<Jsonable>>({ category: isJust("none"), data: isJsonable, hash: isUndefinedOr(isString), });
    export const isNoneFileContextStrict = <DataType extends Jsonable>(isType: IsType<DataType>) =>
        isObject<NoneFileContext<DataType>>({ category: isJust("none"), data: isType, hash: isUndefinedOr(isString), });
    export const isNetFileContext = isObject<NetFileContext>({ category: isJust("net"), path: isString, hash: isUndefinedOr(isString), });
    export const isLocalFileContext = isObject<LocalFileContext>({ category: isJust("local"), path: isString, hash: isUndefinedOr(isString), });
    export const isFileContext = isTypeOr<SystemFileContext, NoneFileContext<Jsonable>, NetFileContext, LocalFileContext>(isSystemFileContext, isNoneFileContextStrict(isJsonable), isNetFileContext, isLocalFileContext);
    export const isFileContextStrict = <DataType extends Jsonable>(isType: IsType<DataType>) =>
        isTypeOr<SystemFileContext, NoneFileContext<DataType>, NetFileContext, LocalFileContext>(isSystemFileContext, isNoneFileContextStrict(isType), isNetFileContext, isLocalFileContext);
    export const makeFullPath = (contextOrEntry: ContextOrEntry, path: string): string =>
    {
        const context = getContext(contextOrEntry);
        if (/^\.\.?\//.test(path))
        {
            if (isSystemFileContext(context.process.template))
            {
                throw new Error("makeFullPath({ templte:{ category: system }, },...)");
            }
            else
            if (isNoneFileContext(context.process.template))
            {
                throw new Error("makeFullPath({ templte:{ category: none }, },...)");
            }
            else
            {
                let parent = context.process.template.path
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
            if (isSystemFileContext(context.process.template))
            {
                throw new Error("makeFullPath({ templte:{ category: system }, },...)");
            }
            else
            if (isNoneFileContext(context.process.template))
            {
                throw new Error("makeFullPath({ templte:{ category: none }, },...)");
            }
            else
            {
                return context.process.template.path.replace(/^(https?\:\/\/[^/]+\/).*$/, "$1") +path;
            }
        }
        else
        {
            return path;
        }
    };
    export const getSystemFileContext = (id: SystemFileType): SystemFileContext => ({ category: "system", id, });
    export const jsonToFileContext = <DataType extends Jsonable = Jsonable>(data: DataType, hash?: HashType): NoneFileContext<DataType> =>
        regulateJsonable({ category: "none", data, hash, }, "shallow");
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
        regulateJsonable
        (
            /^system\:/.test(argument) ? { category: "system", id: argument.replace(/^system\:/, "") as SystemFileType, hash: getHashFromPath(argument), }:
            /^https?\:\/\//.test(argument) ? { category: "net", path: argument, hash: getHashFromPath(argument), }:
            { category: "local", path: argument, hash: getHashFromPath(argument), },
            "shallow"
        );
    export interface Process extends JsonableObject
    {
        startAt?: string;
        duration?: number;
        template: FileContext;
        parameter?: FileContext;
        cache?: FileContext<Cache>;
        setting?: FileContext<Setting>;
    }
    export const isProcess = isObject<Process>
    ({
        startAt: isUndefinedOr(isString),
        duration: isUndefinedOr(isNumber),
        template: isFileContext,
        parameter: isUndefinedOr(isFileContext),
        cache: isUndefinedOr(<IsType<FileContext<Cache>>>isFileContext),
        setting: isUndefinedOr(<IsType<FileContext<Setting>>>isFileContext),
    });
    export interface Context
    {
        process: Process;
        profile: Profile;
        nestDepth?: number;
    }
    export const isContext = isObject<Context>
    ({
        process: isProcess,
        profile: isProfile,
        nestDepth: isUndefinedOr(isNumber),
    });
    export type ContextOrEntry = Context | { context: Context; };
    export const getContext = (contextOrEntry: ContextOrEntry): Context =>
        isContext(contextOrEntry) ? contextOrEntry: contextOrEntry.context;
    export interface Cache extends AlphaJsonarch
    {
        $arch: "cache";
        json?: { [path: string]: Jsonable };
        template?: { [key: string]: Jsonable; };
        type?: { [key: string]: Jsonable; };
        value?: { [key: string]: Jsonable; };
        call?: { [key: string]: Jsonable; };
    }
    export const isCache = isJsonarch<Cache>("cache");
    export interface Setting extends AlphaJsonarch
    {
        $arch: "setting";
        locale?:
        {
            language?: string;
        };
        process?:
        {
            lazyEvaluation?: boolean;
        };
        limit?:
        {
            processTimeout?: number;
            maxCallNestDepth?: number;
            maxArrayLength?: number;
            maxObjectNestDepth?: number;
            maxObjectMembers?: number;
        };
        metrics?:
        {
            trace?: "stdout" | "stderr" | boolean;
            profile?: false | "template" | "parameter" | "both";
            originMap?: false | "template" | "parameter" | "both";
            influenceMap?: false | "template" | "parameter" | "both";
            callGraph?: boolean;
        };
        outputFormat?:
        {
            indent?: "minify" | "smart" | "tab" | number;
            text?: boolean;
            digest?:
            {
                minTargetSize?: number;
                maxStringLength?: number;
                maxArrayLength?: number;
                maxObjectNestDepth?: number;
                maxObjectMembers?: number;
            };
        };
    }
    export const isSetting = isJsonarch<Setting>("setting");
    // const bootSettingJson: Setting =
    // {
    //     "$schema": settingSchema,
    //     "$arch": "setting"
    // };
    export interface CallStackEntry extends JsonableObject
    {
        path: FullRefer;
        parameter: Jsonable;
        originMap?: OriginMap;
        caller: FullRefer;
    }
    export const isCallStackEntry = (value: unknown): value is CallStackEntry =>
        isObject<CallStackEntry>
        ({
            path: isFullRefer,
            parameter: isJsonable,
            originMap: isUndefinedOr(isOriginMap),
            caller: isFullRefer,
        })
        (value);
    export const makeCallStack = (callStack: CallStackEntry[], next: CallStackEntry) => [ ...callStack, next, ];
    export interface ReturnOrigin extends JsonableObject
    {
        root: OriginRoot;
        template: Refer;
        parameter: Jsonable;
        originMap?: OriginMap;
    }
    export const isReturnOrigin = (value: unknown): value is ReturnOrigin =>
        isObject<ReturnOrigin>({ root: isOriginRoot, template: isRefer, parameter: isJsonable, originMap: isUndefinedOr(isOriginMap), })(value);
    export interface ValueOrigin extends JsonableObject
    {
        root: OriginRoot;
        refer: Refer;
    }
    export const isValueOrigin = (value: unknown): value is ValueOrigin =>
        isObject<ValueOrigin>({ root: isOriginRoot, refer: isRefer, })(value);
    export type OriginRoot = FileContext | ReturnOrigin;
    export const isOriginRoot = (value: unknown): value is OriginRoot =>
        isTypeOr<FileContext, ReturnOrigin>(isFileContext, isReturnOrigin)(value);
    export type Origin = OriginRoot | ValueOrigin | FullRefer;
    export const isOrigin = (value: unknown): value is Origin =>
        isTypeOr<OriginRoot, ValueOrigin>(isOriginRoot, isValueOrigin)(value);
    export type OriginMap = { [key: string | number]: Origin | OriginMap };
    export const isOriginMap = (value: unknown): value is OriginMap =>
        isMapObject(isTypeOr<Origin, OriginMap>(isOrigin, isOriginMap))(value);
    export const getRootOrigin = (origin: Origin): OriginRoot => isOriginRoot(origin) ? origin: origin.root;
    export const getOriginPath = (origin: Origin): Refer => isOriginRoot(origin) ? []: toLeafFullRefer(origin).refer;
    export const makeOrigin = (parent: Origin, refer: ReferElement): ValueOrigin =>
    ({
        root: getRootOrigin(parent),
        refer: getOriginPath(parent).concat([refer]),
    });
    export interface ValueEntry<ValueType extends Jsonable> extends JsonableObject
    {
        origin: Origin;
        value:
            // ValueType extends (infer ElementType extends Jsonable)[] ?
            //     ValueEntry<ElementType>[]: // does not work for Tuple
            ValueType extends { [key in keyof ValueType]: Jsonable } ? { [key in keyof ValueType]:
                ValueEntry<ValueType[key]> }:
                ValueType;
    }
    interface LoadEntry<ContextType extends FileContext = FileContext>
    {
        context: Context;
        cache: Cache;
        setting: Setting;
        handler: Handler;
        file: ContextType;
        originMap?: OriginMap;
    }
    export const isSystemFileLoadEntry = (entry: LoadEntry): entry is LoadEntry<SystemFileContext> => isSystemFileContext(entry.file);
    export const isNoneFileLoadEntry = (entry: LoadEntry): entry is LoadEntry<NoneFileContext<Jsonable>> => isNoneFileContextStrict(isJsonable)(entry.file);
    export const isNoneFileLoadEntryStrict = <DataType extends Jsonable>(isType: IsType<DataType>) => (entry: LoadEntry): entry is LoadEntry<NoneFileContext<DataType>> => isNoneFileContextStrict(isType)(entry.file);
    export const isNetFileLoadEntry = (entry: LoadEntry): entry is LoadEntry<NetFileContext> => isNetFileContext(entry.file);
    export const isLocalFileLoadEntry = (entry: LoadEntry): entry is LoadEntry<LocalFileContext> => isLocalFileContext(entry.file);
    export interface Handler
    {
        load?: (entry: LoadEntry<NetFileContext | LocalFileContext>) => Promise<string>;
    }
    export const isHandler = isObject<Handler>({ load: isUndefinedOr(isFunction<(entry: LoadEntry<NetFileContext | LocalFileContext>) => Promise<string>>), });
    interface EvaluateEntry<TemplateType extends Jsonable>
    {
        context: Context;
        this?:
        {
            template: IntermediateTarget<Template>;
            path: FullRefer;
        };
        template: IntermediateTarget<TemplateType>;
        parameter: IntermediateTarget<Jsonable> | undefined;
        callStack: CallStackEntry[];
        path: FullRefer;
        // origin: Origin;
        originMap?: OriginMap;
        scope?: JsonableObject | undefined;
        cache: Cache;
        setting: Setting;
        handler: Handler;
    }
    export const isEvaluateEntry = <TemplateType extends Jsonable>(isTemplateType: (template: unknown) => template is IntermediateTarget<TemplateType>) =>
        isObject<EvaluateEntry<TemplateType>>
        ({
            context: isContext,
            this: isUndefinedOr(isObject({ template: isIntermediateJsonarchTarget<Template>("template"), path: isFullRefer, })),
            template: isTemplateType,
            parameter: isUndefinedOr(isIntermediate),
            callStack: isArray(isCallStackEntry),
            path: isFullRefer,
            originMap: isUndefinedOr(isOriginMap),
            scope: isUndefinedOr(isJsonableObject),
            cache: isCache,
            setting: isSetting,
            handler: isHandler,
        });
    interface Lazy extends AlphaJsonarch
    {
        $arch: "lazy";
        type: Type;
        thisPath?: FullRefer;
        parameter: IntermediateTarget<Jsonable> | undefined;
        callStack: CallStackEntry[];
        path: FullRefer;
        // origin: Origin;
        originMap?: OriginMap;
        scope?: JsonableObject | undefined;
    }
    export const isLazy = isJsonarch<Lazy>("lazy");
    export const isIntermediateLazy = isIntermediateJsonarchTarget<Lazy>("lazy");
    export const makeLazy = async <TemplateType extends AlphaJsonarch>(entry: EvaluateEntry<TemplateType>): Promise<Lazy> => regulateJsonable<Lazy>
    (
        {
            $arch: "lazy",
            type: await evaluateResultType(entry),
            thisPath: entry.this?.path,
            parameter: entry.parameter,
            callStack: entry.callStack,
            path: entry.path,
            originMap: entry.originMap,
            scope: entry.scope,
        },
        "shallow"
    );
    export const restoreThis = async (entry: EvaluateEntry<Jsonable>, lazy: Lazy): Promise<{ template: IntermediateTarget<Template>; path: FullRefer; }> => profile
    (
        entry, "restoreThis", async () =>
        <{ template: IntermediateTarget<Template>; path: FullRefer; }>
        (
            undefined !== lazy.thisPath ?
            {
                template:<IntermediateTarget<Template>>await turnRefer<JsonableValue>
                (
                    entry,
                    <StructureObject<JsonableValue>>entry.cache.json?.[<string>lazy.thisPath.root.path],
                    toLeafFullRefer(lazy.thisPath).refer.filter(i => "this" !== i)
                ),
                path: lazy.thisPath,
            }:
            undefined
        )
    );
    export const restoreFromLazy = async (entry: EvaluateEntry<Jsonable>, lazy: IntermediateTarget<Lazy>, solid = makeSolid(lazy)): Promise<EvaluateEntry<AlphaJsonarch>> => profile
    (
        entry, "restoreFromLazy", async () =>
        ({
            context: entry.context,
            ...solid,
            this: await restoreThis(entry, solid),
            template: await getLazyTemplate(entry, solid),
            cache: entry.cache,
            setting: entry.setting,
            handler: entry.handler,
        })
    );
    export const resolveLazy = async (entry: EvaluateEntry<Jsonable>, lazy: Jsonable): Promise<IntermediateTarget<Jsonable>> => await profile
    (
        entry, "resolveLazy", async () => <IntermediateTarget<Jsonable>> await structureObjectAsync
        (
            async (value: Jsonable) =>
            {
                return isIntermediateLazy(value) ?
                    await resolveLazy(entry, await evaluateLazy(entry, value)):
                    undefined;
            }
        )
        (lazy)
    );
    export const hasLazy = hasStructureObject((value: Structure<JsonableValue | undefined | Function>) => isLazy(value));
    interface ErrorStatus extends JsonableObject
    {
        this?: FullRefer;
        // template: TemplateType;
        parameter: Jsonable | undefined;
        callStack:
        {
            template: CallStackEntry[];
            system:
            {
                scope: string;
                template: Jsonable;
            }[];
        };
        path: FullRefer;
        originMap?: OriginMap;
        scope?: JsonableObject | undefined;
    }
    
    export const toErrorStatusFromEvaluateEntry = <TemplateType extends Jsonable>(entry: EvaluateEntry<TemplateType>): ErrorStatus =>
    ({
        this: entry.this?.path,
        path: entry.path,
        // template: entry.template,
        parameter: entry.parameter,
        callStack:
        {
            template: entry.callStack,
            system: entry.context.profile.stack.map(i => ({ scope: i.scope, template: jsonParse(i.template), })),
        },
        orignMap: entry.originMap,
        scope: entry.scope,
    });
    interface CompileEntry extends Context
    {
        handler: Handler;
    }
    const isPureDataType = (type: JsonarchType) =>
        [ "setting", "cache", ].includes(type);
    export const isEvaluateTargetEntry = (entry: EvaluateEntry<Jsonable>): entry is EvaluateEntry<AlphaJsonarch> =>
    {
        const type = getIntermediateJsonarchType(entry.template);
        return undefined !== type && ! isPureDataType(type);
    };
    const isLazyableJsonarchType = (type: JsonarchType) =>
        [ "call", ].includes(type);
    export const isLazyableEvaluateTargetEntry = (entry: EvaluateEntry<Jsonable>): entry is EvaluateEntry<AlphaJsonarch> =>
    {
        const type = getIntermediateJsonarchType(entry.template);
        return undefined !== type && isLazyableJsonarchType(type);
    };
    export interface Result extends AlphaJsonarch
    {
        $arch: "result";
        process: Process;
        output: Jsonable;
        profile?: any;
        trace?: any;
        originMap?: any;
        influenceMap?: any;
        callGraph?: any;
        setting: Setting;
    }
    export const isResult = isJsonarch<Result>("result");
    export interface JsonarchError<DetailType extends Jsonable> extends AlphaJsonarch
    {
        $arch: "error";
        message: string;
        detail?: DetailType;
        status?: ErrorStatus;
    }
    export const isError = isJsonarch<JsonarchError<Jsonable>>("error");
    export const isIntermediateError =     isIntermediateJsonarchTarget<JsonarchError<Jsonable>>("error");
    // export const getTicks = () => new Date().getTime();
    export const getTicks = () => performance.now();
    const beginProfileScope = (context: Context, scope: string, template: string, parameter: string[]): ProfileEntry =>
    {
        const result: ProfileEntry =
        {
            scope,
            template,
            parameter,
            startTicks: 0,
            childrenTicks: 0,
        };
        if (context.profile?.isProfiling ?? false)
        {
            result.startTicks = getTicks();
            context.profile?.stack.push(result);
        }
        return result;
    };
    const recordProfileScore = (score: { [key: string]: ProfileScore }, key: string, time: number, countUp: boolean = true) =>
    {
        if (undefined === score[key])
        {
            score[key] = { count:0, time:0, };
        }
        if (countUp)
        {
            score[key].count += 1;
        }
        score[key].time += time;
    };
    const endProfileScope = (context: Context, entry: ProfileEntry) =>
    {
        const profileScore = context.profile?.score;
        const profileTemplate = context.profile?.template;
        const profileParameter = context.profile?.parameter;
        const entryStack = context.profile?.stack;
        if (0 !== entry.startTicks && entryStack)
        {
            const wholeTicks = getTicks() -entry.startTicks;
            const time = wholeTicks -entry.childrenTicks;
            if (profileScore)
            {
                recordProfileScore(profileScore, entry.scope, time);
            }
            if (profileTemplate)
            {
                recordProfileScore
                (
                    profileTemplate,
                    entry.template,
                    time,
                    [
                        "apply",
                        "evaluateCall.library",
                        "evaluateCall.template",
                        "evaluateCases",
                        "evaluateCasePattern",
                    ]
                    .includes(entry.scope)
                );
            }
            if (profileParameter)
            {
                entry.parameter.forEach(parameter => recordProfileScore(profileParameter, parameter, time));
            }
            entryStack.pop();
            if (0 < entryStack.length)
            {
                entryStack[entryStack.length -1].childrenTicks += wholeTicks;
            }
        }
    };
    export const getPathFromContextOrEntry = (contextOrEntry: ContextOrEntry): FullRefer | undefined =>
    {
        if ("path" in contextOrEntry)
        {
            const path = contextOrEntry["path"];
            if (isFullRefer(path))
            {
                return path;
            }
        }
        return undefined;
    };
    export const getParameterOriginFromContextOrEntry = (_contextOrEntry: ContextOrEntry): FullRefer[] =>
    {
        return [];
    };
    export const profile = async <ResultT>(contextOrEntry: ContextOrEntry, scope: string, target: () => Promise<ResultT>): Promise<ResultT> =>
    {
        const context = getContext(contextOrEntry);
        const template = jsonStringify(getPathFromContextOrEntry(contextOrEntry) ?? "root");
        const parameter: string[] = getParameterOriginFromContextOrEntry(contextOrEntry).map(i => jsonStringify(i));
        const entry = beginProfileScope(context, scope, template, parameter);
        try
        {
            return await target();
        }
        finally
        {
            endProfileScope(context, entry);
        }
    };
    export const makeError = <TemplateType extends Jsonable, DetailType extends Jsonable>(entry: EvaluateEntry<TemplateType> | ContextOrEntry, message: string, detail?: DetailType): JsonarchError<DetailType> =>
    ({
        $arch: "error",
        message,
        detail,
        status: undefinedable(toErrorStatusFromEvaluateEntry)(isEvaluateEntry(isAny)(entry) ? entry: undefined),
    });
    export const ErrorJson = async function<TemplateType extends Jsonable, DetailType extends Jsonable>(entry: EvaluateEntry<TemplateType> | ContextOrEntry, message: string, detail?: DetailType)
    {
        return new Error(`json:${jsonStringify(await makeErrorIntermediate(entry, makeError(entry, message, detail)))}`);
    } as {
        new <TemplateType extends Jsonable, DetailType extends Jsonable>(entry: EvaluateEntry<TemplateType> | ContextOrEntry, message: string, detail?: DetailType): Promise<Error>;
        <TemplateType extends Jsonable, DetailType extends Jsonable>(entry: EvaluateEntry<TemplateType> | ContextOrEntry, message: string, detail?: DetailType): Promise<Error>;
    };
    export const parseErrorJson = async (entry: EvaluateEntry<Jsonable> | ContextOrEntry, error: unknown): Promise<IntermediateTarget<JsonarchError<Jsonable>>> =>
    {
        if (isError(error))
        {
            return await makeErrorIntermediate(entry, error);
        }
        else
        if (isIntermediateError(error))
        {
            return error;
        }
        else
        if (error instanceof Error)
        {
            if (error.message.startsWith("json:"))
            {
                return jsonParse<IntermediateTarget<JsonarchError<Jsonable>>>(error.message.replace(/^json\:/, ""));
            }
            else
            {
                const result = <JsonarchError<Jsonable>>
                {
                    $arch: "error",
                    message: "System Error",
                    detail:
                    {
                        name: error.name,
                        message: error.message,
                        stack: undefinedable(toLineArrayOrAsIs)(error.stack),
                    }
                };
                return await makeErrorIntermediate(entry, result);
            }
        }
        else
        {
            const result = <JsonarchError<Jsonable>>
            {
                $arch: "error",
                message: "Unknown Error",
                detail: toJsonable(error),
            };
            return await makeErrorIntermediate(entry, result);
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
            throw await new ErrorJson(entry, "never");
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
    export const load = <DataType extends Jsonable = Jsonable>(entry: LoadEntry<FileContext<DataType>>): Promise<IntermediateTarget<DataType>> => profile
    (
        entry, "load", async (): Promise<IntermediateTarget<DataType>> =>
        {
            if (isSystemFileLoadEntry(entry))
            {
                const json = await loadSystemJson<DataType>(entry);
                const result = await makeInputIntermediate(entry, json, entry.file);
                return result;
            }
            else
            if (isNoneFileLoadEntry(entry))
            {
                const json = <DataType>entry.file.data;
                const result = await makeInputIntermediate(entry, json, entry.file);
                return result;
            }
            else
            if (isNetFileLoadEntry(entry) || isLocalFileLoadEntry(entry))
            {
                const cache = entry.cache?.json?.[entry.file.path];
                if (undefined !== cache)
                {
                    return cache as IntermediateTarget<DataType>;
                }
                if ( ! entry.cache)
                {
                    entry.cache = { $arch: "cache", };
                }
                if ( ! entry.cache.json)
                {
                    entry.cache.json = { };
                }
                const json = jsonParse<DataType>(await loadFile(entry));
                const result = await makeInputIntermediate(entry, json, entry.file);
                entry.cache.json[entry.file.path] = result;
                return result;
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
    export const isIntermediateStaticData = isIntermediateJsonarchTarget<StaticTemplate>("static");
    export const evaluateStatic = (entry: EvaluateEntry<StaticTemplate>): Promise<Jsonable> =>
        profile(entry, "evaluateStatic", async () => encode(entry.template.return));
    export const evaluateStaticResultType = (entry: EvaluateEntry<StaticTemplate>): Promise<Type> =>
        profile(entry, "evaluateStaticResultType", async () => await typeOfResult(entry, entry.template.return));
    export interface IncludeStaticJsonTemplate extends AlphaJsonarch
    {
        $arch: "include-static-json";
        path: string;
    }
    export const isIncludeStaticJsonData = isJsonarch<IncludeStaticJsonTemplate>("include-static-json");
    export const isIntermediateIncludeStaticJsonData = isIntermediateJsonarchTarget<IncludeStaticJsonTemplate>("include-static-json");
    export const evaluateIncludeStaticJson = (entry: EvaluateEntry<IncludeStaticJsonTemplate>): Promise<Jsonable> => profile
    (
        entry, "evaluateIncludeStaticJson", async () =>
        encode
        (
            await loadFile
            ({
                ...entry,
                file: pathToFileContext(entry, entry.template.value.path.value)
            })
        )
    );
    export const evaluateIncludeStaticJsonResultType = (entry: EvaluateEntry<IncludeStaticJsonTemplate>): Promise<Type> => profile
    (
        entry, "evaluateIncludeStaticJsonResultType", async () =>
        typeOfResult
        (
            entry,
            await loadFile
            ({
                ...entry,
                file: pathToFileContext(entry, entry.template.value.path.value)
            })
        )
    );
    type ReferKeyElement = string;
    type ReferIndextElement = number;
    type ReferElement = ReferKeyElement | ReferIndextElement;
    type Refer = ReferElement[];
    export const isRefer = isArray(isTypeOr<string, number>(isString, isNumber));
    export interface RootFullRefer extends JsonableObject
    {
        root: OriginRoot;
        refer: "root";
    }
    export const isRootFullRefer = isObject({ root: isOriginRoot, refer: isJustValue("root"), });
    export interface LeafFullRefer extends JsonableObject
    {
        root: OriginRoot;
        refer: Refer;
    }
    export type FullRefer = RootFullRefer | LeafFullRefer;
    export const isLeafFullRefer = isObject({ root: isOriginRoot, refer: isRefer, });
    export const isFullRefer = (value: unknown): value is FullRefer => isTypeOr(isRootFullRefer, isLeafFullRefer)(value);
    export const toLeafFullRefer = (refer: FullRefer): LeafFullRefer => isRootFullRefer(refer) ? { root: refer.root, refer: [], }: refer;
    export const regulateFullRefer = (refer: FullRefer): FullRefer => isLeafFullRefer(refer) && refer.refer.length <= 0 ? { root: refer.root, refer: "root", }: refer;
    export const resolveThisPath = (this_: FullRefer | undefined, path: FullRefer): FullRefer => this_ && "this" === path.refer[0] ?
        regulateFullRefer
        ({
            root: this_.root,
            refer: toLeafFullRefer(this_).refer.concat(toLeafFullRefer(path).refer.filter((_i, ix) => 0 < ix)),
        }):
        path;
    export const makeFullRefer = (parent: FullRefer, refer: ReferElement): FullRefer =>
    ({
        root: parent.root,
        refer: [ ...toLeafFullRefer(parent).refer, refer, ],
    });
    export interface AlphaType extends AlphaJsonarch
    {
        $arch: "type";
        type: PrimitiveType;
        optional?: boolean;
        lazyable?: boolean;
    }
    export interface TypeHasMinMaxLength extends AlphaType
    {
        minLength?: number;
        maxLength?: number;
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
    export interface RegularNumberValueType extends AlphaType
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
    export type NumberValueType = RegularNumberValueType | EnumNumberValueType;
    export const isNumberValueTypeData = isAlphaTypeData<NumberValueType>("number");
    export const isRangeNumberValueTypeData = (value: unknown): value is RegularNumberValueType =>
        isAlphaTypeData<NumberValueType>("number")(value) &&
        isObject({ integerOnly: isUndefinedOr(isBoolean), minValue: isUndefinedOr(isNumber), maxValue: isUndefinedOr(isNumber), enum:isUndefined, })(value);
    export const isEnumNumberValueTypeData = (value: unknown): value is EnumNumberValueType =>
        isAlphaTypeData<NumberValueType>("number")(value) && isObject({ enum: isArray(isNumber), })(value);
    export interface RegularStringValueType extends TypeHasMinMaxLength
    {
        type: "string";
        format?: string;
    }
    export interface EnumStringValueType extends AlphaEnumType<string>
    {
        type: "string";
    }
    export type StringValueType = RegularStringValueType | EnumStringValueType;
    export const isStringValueTypeData = isAlphaTypeData<StringValueType>("string");
    export type ValueType = NullValueType | BooleanValueType | NumberValueType | StringValueType;
    export type PrimitiveValueType = ValueType["type"];
    export const isValueTypeData = (template: unknown): template is ValueType =>
        isNullValueTypeData(template) ||
        isBooleanValueTypeData(template) ||
        isNumberValueTypeData(template) ||
        isStringValueTypeData(template);
    export interface ArrayType extends TypeHasMinMaxLength
    {
        type: "array";
        itemType: Type;
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
    export const getMemberType = (parent: Type, member: string): Type =>
    {
        if (isObjectTypeData(parent))
        {
            return parent.member[member] ?? { $arch: "type", type: "never" };
        }
        else
        if (isOrCompositeTypeData(parent))
        {
            return regulateType
            ({
                $arch: "type",
                type: "or",
                list: parent.list.map(i => getMemberType(i, member)),
            });
        }
        else
        if (isAndCompositeTypeData(parent))
        {
            return regulateType
            ({
                $arch: "type",
                type: "and",
                list: parent.list.map(i => getMemberType(i, member)),
            });
        }
        else
        {
            return { $arch: "type", type: "never" };
        }
    };
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
    export const isIntermediateTypeData = isIntermediateJsonarchTarget<Type>("type");
    export interface Call extends AlphaJsonarch
    {
        $arch: "call";
        cache?: boolean;
        refer: Refer;
        parameter?: Jsonable;
    }
    export const isCallData = isJsonarch<Call>("call");
    export const isIntermediateCallData = isIntermediateJsonarchTarget<Call>("call");
    export interface Value extends AlphaJsonarch
    {
        $arch: "value";
        type?: Type;
        refer: Refer;
    }
    export const isValueData = isJsonarch<Value>("value");
    export const isIntermediateValueData = isIntermediateJsonarchTarget<Value>("value");
    export const typeOfJsonable = (json: Jsonable | undefined): Type =>
    {
        if (isIntermediate(json))
        {
            return json.type;
        }
        else
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
            if (isIntermediate(json))
            {
                return json.type;
            }
            else
            {
                const member: { [key:string]: Type } = { };
                objectKeys(json).forEach(i => member[i] = typeOfJsonable(json[i]));
                return { $arch: "type", type: "object", member, };
            }
        }
        // else
        // if ("function" === typeof json)
        // {
        //     return { $arch: "type", type: "function", };
        // }
        // else
        // {
            return { $arch: "type", type: "never", };
        // }
    };
    export interface CallTypeInterface extends JsonableObject
    {
        parameter: Type;
        return: Type;
    }
    export const isCallTypeInterface = (value: unknown): value is CallTypeInterface =>
        isObject<CallTypeInterface>({ parameter: isTypeData, return: isTypeData, })(value);
    export interface Template extends AlphaJsonarch
    {
        $arch: "template";
        type?: CallTypeInterface | CallTypeInterface[];
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
        cache?: boolean;
        template?: { [name: string]: Template };
        value?: { [name: string]: Jsonable };
        return: Jsonable;
        catch?: Case[];
    }
    export const isTemplateData = isJsonarch<Template>("template");
    export const isIntermediateTemplateData = isIntermediateJsonarchTarget<Template>("template");
    export interface Throw extends AlphaJsonarch
    {
        $arch: "throw";
        throw: Jsonable;
    }
    export const isThrowData = isJsonarch<Throw>("throw");
    export const isIntermediateThrowData = isIntermediateJsonarchTarget<Throw>("throw");
    export interface Match extends AlphaJsonarch
    {
        $arch: "match";
        type?:
        {
            parameter?: Type;
            return?: Type;
        };
        default:
        {
            parameter?: Jsonable;
            return: Jsonable;
        };
        parameter?: Jsonable;
        cases: Case[];
    }
    export const isMatchData = isJsonarch<Match>("match");
    export const isIntermediateMatchData = isIntermediateJsonarchTarget<Match>("match");
    export interface Case extends JsonableObject
    {
        case?: CasePattern;
        return: Jsonable;
    }
    export interface ValueCasePattern extends JsonableObject
    {
        value: Jsonable;
    }
    export interface ListCasePattern extends JsonableObject
    {
        list: Jsonable[];
    }
    export interface TypeCasePattern extends JsonableObject
    {
        type: Type;
    }
    export interface IfCasePattern extends JsonableObject
    {
        if: Jsonable;
    }
    export interface IfCaseCasePattern extends JsonableObject
    {
        ifCase: CasePattern;
        parameter: Jsonable;
    }
    export interface NotCasePattern extends JsonableObject
    {
        not: CasePattern;
    }
    export interface OrCasePattern extends JsonableObject
    {
        or: CasePattern[];
    }
    export interface AndCasePattern extends JsonableObject
    {
        and: CasePattern[];
    }
    export const isValueCasePattern = isObject<ValueCasePattern>({ value: isJsonable, });
    export const isIntermediateValueCasePattern = isIntermediateTargetObject<ValueCasePattern>({ value: isIntermediate, });
    export const isListCasePattern = isObject<ListCasePattern>({ list: isArray(isJsonable), });
    export const isIntermediateListCasePattern = isIntermediateTargetObject<ListCasePattern>({ list: isIntermediateTargetValue(isArray(isIntermediate)), });
    export const isTypeCasePattern = isObject<TypeCasePattern>({ type: isTypeData, });
    export const isIntermediateTypeCasePattern = isIntermediateTargetObject<TypeCasePattern>({ type: isIntermediateTypeData, });
    export const isIfCasePattern = isObject<IfCasePattern>({ if: isJsonable, });
    export const isIntermediateIfCasePattern = isIntermediateTargetObject<IfCasePattern>({ if: isIntermediate, });
    export const isIfCaseCasePattern = (value: unknown): value is IfCaseCasePattern => isObject<IfCaseCasePattern>({ ifCase: isCasePattern, parameter: isJsonable, })(value);
    export const isIntermediateIfCaseCasePattern = (value: unknown): value is IntermediateTarget<IfCaseCasePattern> => isIntermediateTargetObject<IfCaseCasePattern>({ ifCase: isIntermediateCasePattern, parameter: isIntermediate, })(value);
    export const isNotCasePattern = (value: unknown): value is NotCasePattern => isObject<NotCasePattern>({ not: isCasePattern, })(value);
    export const isIntermediateNotCasePattern = (value: unknown): value is IntermediateTarget<NotCasePattern> => isIntermediateTargetObject<NotCasePattern>({ not: isIntermediateCasePattern, })(value);
    export const isOrCasePattern = (value: unknown): value is OrCasePattern => isObject<OrCasePattern>({ or: isArray(isCasePattern), })(value);
    export const isIntermediateOrCasePattern = (value: unknown): value is IntermediateTarget<OrCasePattern> => isIntermediateTargetObject<OrCasePattern>({ or: isIntermediateTargetValue(isArray(isIntermediateCasePattern)), })(value);
    export const isAndCasePattern = (value: unknown): value is AndCasePattern => isObject<AndCasePattern>({ and: isArray(isCasePattern), })(value);
    export const isIntermediateAndCasePattern = (value: unknown): value is IntermediateTarget<AndCasePattern> => isIntermediateTargetObject<AndCasePattern>({ and: isIntermediateTargetValue(isArray(isIntermediateCasePattern)), })(value);
    export const isCasePattern = isTypeOr<ValueCasePattern, ListCasePattern, TypeCasePattern, IfCasePattern, IfCaseCasePattern, NotCasePattern, OrCasePattern, AndCasePattern>
    (
        isValueCasePattern,
        isListCasePattern,
        isTypeCasePattern,
        isIfCasePattern,
        isIfCaseCasePattern,
        isNotCasePattern,
        isOrCasePattern,
        isAndCasePattern
    );
    export const isIntermediateCasePattern = isTypeOr<IntermediateTarget<ValueCasePattern>, IntermediateTarget<ListCasePattern>, IntermediateTarget<TypeCasePattern>, IntermediateTarget<IfCasePattern>, IntermediateTarget<IfCaseCasePattern>, IntermediateTarget<NotCasePattern>, IntermediateTarget<OrCasePattern>, IntermediateTarget<AndCasePattern>>
    (
        isIntermediateValueCasePattern,
        isIntermediateListCasePattern,
        isIntermediateTypeCasePattern,
        isIntermediateIfCasePattern,
        isIntermediateIfCaseCasePattern,
        isIntermediateNotCasePattern,
        isIntermediateOrCasePattern,
        isIntermediateAndCasePattern
    );
    export type CasePattern = ValueCasePattern | ListCasePattern | TypeCasePattern | IfCasePattern | IfCaseCasePattern | NotCasePattern | OrCasePattern | AndCasePattern;
    export interface Loop extends AlphaJsonarch
    {
        $arch: "loop";
        parameter?: Jsonable;
        loop: AlphaJsonarch;
    }
    export const isLoopData = isJsonarch<Loop>("loop");
    export const isIntermediateLoopData = isIntermediateJsonarchTarget<Loop>("loop");
    export interface LoopFalseResult extends JsonableObject
    {
        continue: false;
    }
    export interface LoopRegularResult extends JsonableObject
    {
        continue?: boolean;
        return: Jsonable;
    }
    export type LoopResult = LoopFalseResult | LoopRegularResult;
    // export const isLoopFalseResultData = isObject<LoopFalseResult>({ continue: isJustValue<false>(false), });
    // export const isLoopRegularResultData = isObject<LoopRegularResult>({ continue: isUndefinedOr(isBoolean), return: isJsonable, });
    // export const isLoopResultData = isTypeOr<LoopFalseResult, LoopRegularResult>(isLoopFalseResultData, isLoopRegularResultData);
    export const isIntermediateLoopFalseResultData = isIntermediateTargetObject<LoopFalseResult>({ continue: isIntermediateTargetValue(isJustValue<false>(false)), });
    export const isIntermediateLoopRegularResultData = isIntermediateTargetObject<LoopRegularResult>({ continue: isUndefinedOr(isIntermediateTargetValue(isBoolean)), return: isIntermediate, });
    export const isIntermediateLoopResultData = isTypeOr(isIntermediateLoopFalseResultData, isIntermediateLoopRegularResultData);
    export interface Iterator extends AlphaJsonarch
    {
        $arch: "iterator";
        // parameter: Jsonable[] | Call | Template | Value;
        parameter: Jsonable;
    }
    export interface Step extends AlphaJsonarch
    {
        $arch: "step";
        // parameter: Iterator | Loop;
        parameter: Jsonable;
    }
    export interface Chain extends AlphaJsonarch
    {
        $arch: "chain";
        // list: [Jsonable, ...(Template | Call)[] ];
        list: Jsonable[];
    }
    // export const isChainData = isObject<Chain>({ $arch: isJustValue("chain"), list: isArray(isJsonable), });
    export const isIntermediateChainData = isIntermediateTargetObject<Chain>({ $arch: isIntermediateTargetValue(isJustValue<"chain">("chain")), list: isIntermediateTargetValue(isArray(isIntermediate)), });
    export type JsonarchType =
    (
        Cache |
        Setting |
        Lazy |
        Intermediate |
        Result |
        JsonarchError<Jsonable> |
        StaticTemplate |
        IncludeStaticJsonTemplate |
        AlphaType |
        Call |
        Value |
        Template |
        Throw |
        Match |
        Loop |
        Iterator |
        Step |
        Chain
    )["$arch"];
    export const applyDefault = <DataType extends Jsonable>(...defaults: (DataType | undefined)[]): DataType | undefined =>
    {
        let result: DataType | undefined;
        defaults.forEach
        (
            i =>
            {
                if (undefined !== i)
                {
                    if (isJsonableObject(result) && isJsonableObject(i))
                    {
                        objectKeys(i).forEach
                        (
                            key => (<JsonableObject>result)[key] = applyDefault
                            (
                                (<JsonableObject>result)[key],
                                i[key]
                            )
                        );
                    }
                    else
                    {
                        result = i;
                    }
                }
            }
        );
        return result;
    };
    export const evaluateTemplate = (entry: EvaluateEntry<Template>): Promise<IntermediateTarget<Jsonable>> => profile
    (
        entry, "evaluateTemplate", async () =>
        {
            const parameter = applyDefault
            (
                entry.template.value.default?.value?.parameter,
                entry.parameter,
                entry.template.value.override?.value?.parameter
            );
            const this_ =
            {
                template: entry.template,
                path: entry.this ?
                    resolveThisPath(entry.this.path, entry.path):
                    entry.path,
            };
            if (entry.template.value.catch?.value)
            {
                try
                {
                    return await apply
                    ({
                        ...entry,
                        this: this_,
                        path: makeFullRefer(entry.path, "return"),
                        template: entry.template.value.return,
                        parameter,
                    });
                }
                catch(error)
                {
                    // const xxxx = parseErrorJson(error);
                    if (isIntermediate(error))
                    {
                        const result = await evaluateCases
                        ({
                            ...entry,
                            this: this_,
                            path: makeFullRefer(entry.path, "catch"),
                            template: entry.template.value.catch as IntermediateTarget<Case[]>,
                            parameter: error,
                        });
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
                return await apply
                ({
                    ...entry,
                    this: this_,
                    path: makeFullRefer(entry.path, "return"),
                    template: entry.template.value.return,
                    parameter,
                });
            }
        }
    );
    export const evaluateTemplateResultType = (entry: EvaluateEntry<Template>): Promise<Type> => profile
    (
        entry, "evaluateTemplateResultType", async () =>
        {
            const parameter = applyDefault
            (
                entry.template.value.default?.value?.parameter,
                entry.parameter,
                entry.template.value.override?.value?.parameter
            );
            const parameterType = await typeOfResult(entry, <Jsonable>parameter);
            const type = entry.template.type;
            if (type)
            {
                const types = Array.isArray(type) ? type: [type];
                for(const i in types)
                {
                    const t = types[i];
                    if (isBaseOrEqual(compareType(t.parameter, parameterType)))
                    {
                        return t.return;
                    }
                }
            }
            return typeOfResult(entry, entry.template.return);
        }
    );
    export const evaluateThrow = (entry: EvaluateEntry<Throw>): Promise<IntermediateTarget<Jsonable>> => profile
    (
        entry, "evaluateThrow", async () =>
        {
            throw await apply
            ({
                ...entry,
                path: makeFullRefer(entry.path, "throw"),
                template: entry.template.value.throw,
            });
        }
    );
    export const evaluateThrowResultType = (entry: EvaluateEntry<Throw>): Promise<Type> => profile
    (
        entry, "evaluateTemplateResultType", async () => ({ $arch: "type", type: "never", })
    );
    export const evaluateMatch = (entry: EvaluateEntry<Match>): Promise<Jsonable> => profile
    (
        entry, "evaluateMatch", async () =>
        {
            const parameter = applyDefault
            (
                entry.template.value.default,
                undefined !== entry.template.value.parameter ?
                    await apply
                    ({
                        ...entry,
                        path: makeFullRefer(entry.path, "parameter"),
                        template: entry.template.value.parameter,
                    }):
                    entry.parameter
            );
            const result = await evaluateCases
            ({
                ...entry,
                path: makeFullRefer(entry.path, "cases"),
                template: entry.template.value.cases,
                parameter,
            });
            if (undefined !== result)
            {
                return result;
            }
            return entry.template.value.default.value.return;
        }
    );
    export const evaluateMatchResultType = (entry: EvaluateEntry<Match>): Promise<Type> => profile
    (
        entry, "evaluateMatchResultType", async () =>
        {
            const parameter = applyDefault
            (
                entry.template.value.default,
                undefined !== entry.template.value.parameter ?
                    await lazyableApply
                    ({
                        ...entry,
                        path: makeFullRefer(entry.path, "parameter"),
                        template: entry.template.value.parameter,
                    }):
                    entry.parameter
            );
            const caseTypes = await evaluateCasesType
            ({
                ...entry,
                path: makeFullRefer(entry.path, "cases"),
                template: entry.template.value.cases,
                parameter,
            });
            const result: OrCompositeType =
            {
                $arch: "type",
                type: "or",
                list:
                [
                    ...caseTypes,
                    await typeOfResult
                    (
                        <EvaluateEntry<Jsonable>>
                        {
                            ...entry,
                            parameter,
                        },
                        entry.template.value.default.value.return
                    ),
                ]
            };
            return result;
        }
    );
    export const evaluateValueCasePattern = (entry: EvaluateEntry<ValueCasePattern>): Promise<boolean> => profile
    (
        entry, "evaluateValueCasePattern", async () =>
        {
            if (undefined !== entry.parameter)
            {
                return jsonStringify(makeSolid(<IntermediateTarget<Jsonable>>entry.parameter)) === jsonStringify(makeSolid(entry.template).value);
            }
            else
            {
                throw await new ErrorJson(entry, "Unknown Jsonarch TypeUnspecified Parameter");
            }
        }
    );
    export const evaluateListCasePattern = (entry: EvaluateEntry<ListCasePattern>): Promise<boolean> => profile
    (
        entry, "evaluateListCasePattern", async () =>
        {
            const entryParameter = entry.parameter;
            if (undefined !== entryParameter)
            {
                // return entry.template.value.list.value.some(i => jsonStringify(entryParameter) === jsonStringify(i)) ;
                return entry.template.value.list.value.some(i => jsonStringify(makeSolid(<IntermediateTarget<Jsonable>>entryParameter)) === jsonStringify(makeSolid(i)));
            }
            else
            {
                throw await new ErrorJson(entry, "Unknown Jsonarch TypeUnspecified Parameter");
            }
        }
    );
    export const evaluateTypeCasePattern = (entry: EvaluateEntry<TypeCasePattern>): Promise<boolean> => profile
    (
        entry, "evaluateTypeCasePattern", async () =>
        {
            if (undefined !== entry.parameter)
            {
                const parameterType = typeOfJsonable(entry.parameter);
                const comppareTypeResult = compareType(entry.template.type, parameterType);
                return isBaseOrEqual(comppareTypeResult);
            }
            else
            {
                throw await new ErrorJson(entry, "Unknown Jsonarch TypeUnspecified Parameter");
            }
        }
    );
    export const evaluateIfCasePattern = (entry: EvaluateEntry<IfCasePattern>): Promise<boolean> => profile
    (
        entry, "evaluateIfCasePattern", async () =>
        {
            const result = await apply
            ({
                ...entry,
                path: makeFullRefer(entry.path, "if"),
                template: entry.template.value.if,
            });
            if ("boolean" !== typeof result.value)
            {
                throw await new ErrorJson
                (
                    entry, "Unmatch if result type",
                    {
                        template: entry.template.if,
                        result,
                    }
                );
            }
            return result.value;
        }
    );
    export const evaluateIfCaseCasePattern = (entry: EvaluateEntry<IfCaseCasePattern>): Promise<boolean> => profile
    (
        entry, "evaluateIfCaseCasePattern", async (): Promise<boolean> =>
        {
            const parameter = await apply
            ({
                ...entry,
                path: makeFullRefer(entry.path, "parameter"),
                template: entry.template.value.parameter,
            });
            const result = await evaluateCasePattern
            ({
                ...entry,
                path: makeFullRefer(entry.path, "ifCase"),
                template: entry.template.value.ifCase,
                parameter,
            });
            if ("boolean" !== typeof result)
            {
                throw await new ErrorJson
                (
                    entry, "Unmatch if-case result type",
                    {
                        template: entry.template,
                        parameter,
                        result,
                    }
                );
            }
            return result;
        }
    );
    export const evaluateNotCasePattern = (entry: EvaluateEntry<NotCasePattern>): Promise<boolean> => profile
    (
        entry, "evaluateNotCasePattern", async () =>
        {
            const result = await evaluateCasePattern
            ({
                ...entry,
                path: makeFullRefer(entry.path, "not"),
                template: entry.template.value.not,
            });
            if ("boolean" !== typeof result)
            {
                throw await new ErrorJson
                (
                    entry, "Unmatch not result type",
                    {
                        template: entry.template.value.not,
                        result,
                    }
                );
            }
            return ! result;
        }
    );
    export const evaluateOrCasePattern = (entry: EvaluateEntry<OrCasePattern>): Promise<boolean> => profile
    (
        entry, "evaluateOrCasePattern", async () =>
        {
            const basePath = makeFullRefer(entry.path, "or");
            for(let i in entry.template.value.or.value)
            {
                const template = entry.template.value.or.value[i];
                const result = await evaluateCasePattern
                ({
                    ...entry,
                    path: makeFullRefer(basePath, i),
                    template,
                });
                if ("boolean" !== typeof result)
                {
                    throw await new ErrorJson
                    (
                        entry, "Unmatch or result type",
                        {
                            template,
                            result,
                        }
                    );
                }
                if (result)
                {
                    return true;
                }
            }
            return false;
        }
    );
    export const evaluateAndCasePattern = (entry: EvaluateEntry<AndCasePattern>): Promise<boolean> => profile
    (
        entry, "evaluateAndCasePattern", async () =>
        {
            const basePath = makeFullRefer(entry.path, "and");
            for(let i in entry.template.value.and.value)
            {
                const template = entry.template.value.and.value[i];
                const result = await evaluateCasePattern
                ({
                    ...entry,
                    path: makeFullRefer(basePath, i),
                    template,
                });
                if ("boolean" !== typeof result)
                {
                    throw await new ErrorJson
                    (
                        entry, "Unmatch and result type",
                        {
                            template,
                            result,
                        }
                    );
                }
                if ( ! result)
                {
                    return false;
                }
            }
            return true;
        }
    );
    export const evaluateIfMatchCasePattern = <CasePatternType extends CasePattern>(isMatch: ((entry: Jsonable) => entry is IntermediateTarget<CasePatternType>), evaluateTarget: (entry: EvaluateEntry<CasePatternType>) => Promise<boolean>) =>
        async (entry: EvaluateEntry<CasePattern>): Promise<boolean | undefined> =>
            isMatch(entry.template) ? evaluateTarget(<EvaluateEntry<CasePatternType>>entry): undefined;
    const casePatternEvaluatorList: ((entry: EvaluateEntry<CasePattern>) => Promise<boolean | undefined>)[] =
    [
        evaluateIfMatchCasePattern(isIntermediateValueCasePattern, evaluateValueCasePattern),
        evaluateIfMatchCasePattern(isIntermediateListCasePattern, evaluateListCasePattern),
        evaluateIfMatchCasePattern(isIntermediateTypeCasePattern, evaluateTypeCasePattern),
        evaluateIfMatchCasePattern(isIntermediateIfCasePattern, evaluateIfCasePattern),
        evaluateIfMatchCasePattern(isIntermediateIfCaseCasePattern, evaluateIfCaseCasePattern),
        evaluateIfMatchCasePattern(isIntermediateNotCasePattern, evaluateNotCasePattern),
        evaluateIfMatchCasePattern(isIntermediateOrCasePattern, evaluateOrCasePattern),
        evaluateIfMatchCasePattern(isIntermediateAndCasePattern, evaluateAndCasePattern),
    ];
    export const evaluateCasePattern = (entry: EvaluateEntry<CasePattern>): Promise<boolean | undefined> => profile
    (
        entry, "evaluateCasePattern", async () =>
        {
            for(const i in casePatternEvaluatorList)
            {
                const result = await casePatternEvaluatorList[i](entry);
                if (undefined !== result)
                {
                    return result;
                }
            }
            throw await new ErrorJson
            (
                entry, "Unknown Case Pattern",
                {
                    template: entry.template,
                }
            );
        }
    );
    export const evaluateCases = (entry: EvaluateEntry<Case[]>): Promise<IntermediateTarget<Jsonable> | undefined> => profile
    (
        entry, "evaluateCases", async () =>
        {
            for(const i in entry.template.value)
            {
                const ix = parseInt(i);
                const case_ = entry.template.value[ix];
                const path = makeFullRefer(entry.path, ix);
                if
                (
                    undefined === case_.value.case ||
                    await evaluateCasePattern
                    ({
                        ...entry,
                        path: makeFullRefer(path, "case"),
                        template: case_.value.case as IntermediateTarget<CasePattern>,
                    })
                )
                {
                    return await apply
                    ({
                        ...entry,
                        path: makeFullRefer(path, "return"),
                        template: case_.value.return,
                    });
                }
            }
            return undefined;
        }
    );
    export const evaluateCasesType = (entry: EvaluateEntry<Case[]>): Promise<Type[]> => profile
    (
        entry, "evaluateCasesType", async () =>
            await Promise.all(entry.template.value.map(i => typeOfResult(entry, i.return)))
    );
    export const evaluateLoop = (entry: EvaluateEntry<Loop>): Promise<Jsonable> => profile
    (
        entry, "evaluateLoop", async () =>
        {
            const result = [];
            let index = 0;
            while(true)
            {
                const scope =
                {
                    ...entry.scope,
                    $loop: { index, }
                };
                const path = makeFullRefer(entry.path, "loop");
                const current = await apply
                ({
                    ...Limit.incrementNestDepth(entry),
                    callStack: makeCallStack
                    (
                        entry.callStack,
                        {
                            path,
                            parameter: scope,
                            caller: entry.path,
                        }
                    ),
                    path,
                    template: entry.template.value.loop,
                    scope,
                }) as IntermediateTarget<LoopResult>;
                if ( ! isIntermediateLoopResultData(current))
                {
                    throw await new ErrorJson
                    (
                        entry, "Unknown Lopp Result",
                        {
                            result: current,
                        }
                    );
                }
                if (true !== (current.value.continue?.value ?? true) || undefined === current.value.return.value)
                {
                    break;
                }
                result.push(current.value.return);
                ++index;
            }
            return result;
        }
    );
    export const evaluateLoopResultType = (entry: EvaluateEntry<Loop>): Promise<Type> => profile
    (
        entry, "evaluateLoopResultType", async () =>
        {
            // const scope = { ...entry.scope, $loop: { index, } };
            const loopType = await typeOfResult
            (
                <EvaluateEntry<Jsonable>>
                {
                    ...entry,
                    path: makeFullRefer(entry.path, "loop"),
                    // scope,
                },
                entry.template.loop
            );
            const result: ArrayType =
            {
                $arch: "type",
                type: "array",
                itemType: getMemberType(loopType, "return"),
            };
            return result;
        }
    );
    export const evaluateChain = (entry: EvaluateEntry<Chain>): Promise<Jsonable> => profile
    (
        entry, "evaluateChain", async () =>
        {
            let current = entry.parameter;
            const basePath = makeFullRefer(entry.path, "list");
            const list = entry.template.value.list.value;
            for(const i in list)
            {
                const path = makeFullRefer(basePath, i);
                current = await apply
                ({
                    ...Limit.incrementNestDepth(entry),
                    callStack: makeCallStack
                    (
                        entry.callStack,
                        {
                            path,
                            parameter: current,
                            caller: entry.path,
                        }
                    ),
                    path,
                    template: list[i],
                    parameter: current,
                });
            }
            return current;
        }
    );
    export const evaluateChainResultType = (entry: EvaluateEntry<Chain>): Promise<Type> => profile
    (
        entry, "evaluateChainResultType", async () =>
        {
            const list = entry.template.value.list.value;
            if (list.some(_ => true))
            {
                return typeOfResult(entry, list[list.length -1]);
            }
            throw await new ErrorJson(entry, "NYI"); // このケースでも本来は正常に稼働しないといけないが、パラメーター対応が済まない対応できない。
        }
    );
    export const makeParameter = async (entry: EvaluateEntry<Call>) =>
    {
        if (undefined !== entry.template.value.parameter)
        {
            return await lazyableApply
            ({
                ...entry,
                path: makeFullRefer(entry.path, "parameter"),
                template: entry.template.value.parameter,
            });
        }
        if (undefined !== entry.parameter)
        {
            return await lazyableApply
            ({
                ...entry,
                path: makeFullRefer(entry.path, "parameter"),
                template: entry.parameter,
            });
        }
        return undefined;
    };
    export interface CallTemplateRegular extends JsonableObject
    {
        template: IntermediateTarget<Template>;
        type: CallTypeInterface;
        parameter: IntermediateTarget<Jsonable> | undefined;
        cacheKey?: string;
    }
    export interface CallTemplateCache extends JsonableObject
    {
        template: IntermediateTarget<Template>;
        parameter: IntermediateTarget<Jsonable> | undefined;
        cacheKey: string;
        result: Jsonable;
    }
    export const isCallTemplateCache = isObject<CallTemplateCache>({ template: isIntermediateTemplateData, parameter: isIntermediate, cacheKey: isString, result: isJsonable, });
    export type CallTemplate = CallTemplateRegular | CallTemplateCache;
    export const makeCallCacheKey = (template: Refer, parameter: Jsonable) => jsonStringify({ template, parameter, });
    export let intermediateLibrarygJson: IntermediateTarget<typeof librarygJson>;
    export const makeSureIntermediateLibrarygJson = async <TargetType extends Jsonable>(entry: EvaluateEntry<TargetType>) =>
    {
        if ( ! intermediateLibrarygJson)
        {
            intermediateLibrarygJson = await makeInputIntermediate(entry, librarygJson, getSystemFileContext("library.json"));
        }
        return intermediateLibrarygJson;
    };
    export const getTemplate = async (entry: EvaluateEntry<Call>, systemOrTemplate: "system" | "template", parameter: IntermediateTarget<Jsonable> | undefined): Promise<CallTemplate> => profile
    (
        entry, "getTemplate", async (): Promise<CallTemplate> =>
        {
            const refer = makeSolid(entry.template.value.refer);
            await makeSureIntermediateLibrarygJson(entry);
            const template = await turnRefer<JsonableValue | Function>
            (
                entry,
                {
                    ...intermediateLibrarygJson,
                    value:
                    {
                        ...intermediateLibrarygJson.value,
                        this: entry.this?.template,
                    }
                },
                refer,
                {
                    template: entry.path,
                }
                // entry.originMap
            );
            if (isIntermediateTemplateData(template))
            {
                if (template.value.type)
                {
                    const useCache = entry.template.value.cache?.value ?? template.value.cache?.value ?? false;
                    const liquid = "system" === systemOrTemplate || useCache ?
                        await resolveLazy(entry, parameter ?? null):
                        parameter;
                    const cacheKey = useCache ? makeCallCacheKey(refer, liquid): undefined;
                    if (undefined !== cacheKey)
                    {
                        const result = entry.cache.call?.[cacheKey];
                        if (undefined !== result)
                        {
                            return { template, parameter: liquid, cacheKey, result, };
                        }
                    }
                    const parameterType = hasLazy(liquid) ?
                        await typeOfResult(entry, liquid):
                        typeOfJsonable(liquid);
                    const types0 = makeSolid(template.value.type);
                    const types = undefined === types0 ? []: Array.isArray(types0) ? types0: [types0];
                    const type = types.find(t => isBaseOrEqual(compareType(t.parameter, parameterType)));
                    if (type)
                    {
                        return { template, type, parameter: liquid, cacheKey };
                    }
                    else
                    {
                        throw await new ErrorJson
                        (
                            entry, "Unmatch parameter type",
                            {
                                refer,
                                debug:
                                {
                                    template: makeSolid(template.value.type),
                                    hasLazy: hasLazy(liquid),
                                    resolveLazy: await resolveLazy(entry, parameter ?? null),
                                    liquid,
                                    parameter,
                                },
                                type:
                                {
                                    template: template.value.type,
                                    parameter: parameterType,
                                },
                                parameter,
                            }
                        );
                    }
                }
                else
                {
                    throw await new ErrorJson
                    (
                        entry, "Not found type define",
                        {
                            refer,
                        }
                    );
                }
            }
            else
            {
                throw await new ErrorJson
                (
                    entry, "Not found template",
                    {
                        refer,
                    }
                );
            }
        }
    );
    export const validateReturnType = async <ResultType extends Jsonable>(entry: EvaluateEntry<Call>, parameterInfo: CallTemplateRegular, result: ResultType): Promise<ResultType> =>
    {
        const parameter = parameterInfo.parameter;
        const parameterType = isIntermediate(parameter) ? parameter.type: typeOfJsonable(parameter);
        const resultType = isIntermediate(result) ? result.type: typeOfJsonable(result);
        const type = parameterInfo.type;
        const compareTypeResult = compareType(type.return, resultType);
        if (isBaseOrEqual(compareTypeResult))
        {
            return result;
        }
        else
        {
            throw await new ErrorJson
            (
                entry, "Unmatch return type",
                {
                    refer: entry.template.refer,
                    compareTypeResult,
                    type:
                    {
                        template: type,
                        parameter: parameterType,
                        result: resultType,
                    },
                    parameter,
                }
            );
        }
    };
    export const UnmatchParameterTypeDefineError = async (entry: EvaluateEntry<Call>, parameter: Jsonable | undefined): Promise<Error> =>
        await new ErrorJson
        (
            entry, "Internal Error ( Unmatch parameter type define )",
            {
                parameter: parameter,
            }
        );
    export const library =
    {
        object:
        {
            typeOf: (_entry: EvaluateEntry<Call>, parameter: Jsonable | undefined): Type =>
                typeOfJsonable(parameter),
            equal: (_entry: EvaluateEntry<Call>, parameter: Jsonable | undefined): Jsonable | undefined =>
            {
                if (isArray(isAny)(parameter) && 2 === parameter.length)
                {
                    return parameter[0] === parameter[1];
                }
                return undefined;
            }
        },
        array:
        {
            contain: (_entry: EvaluateEntry<Call>, parameter: Jsonable | undefined): Jsonable | undefined =>
            {
                if (isTuple<any[], any>(isArray(isAny), isAny)(parameter))
                {
                    return parameter[0].includes(parameter[1]);
                }
                return undefined;
            }
        },
        boolean:
        {
            not: (_entry: EvaluateEntry<Call>, parameter: Jsonable | undefined): Jsonable | undefined =>
            {
                if (isBoolean(parameter))
                {
                    return ! parameter;
                }
                return undefined;
            },
            or: (_entry: EvaluateEntry<Call>, parameter: Jsonable | undefined): Jsonable | undefined =>
            {
                if (isArray(isBoolean)(parameter))
                {
                    return parameter.some(i => i);
                }
                return undefined;
            },
            and: (_entry: EvaluateEntry<Call>, parameter: Jsonable | undefined): Jsonable | undefined =>
            {
                if (isArray(isBoolean)(parameter))
                {
                    return parameter.every(i => i);
                }
                return undefined;
            },
            xor: (_entry: EvaluateEntry<Call>, parameter: Jsonable | undefined): Jsonable | undefined =>
            {
                if (isArray(isBoolean)(parameter) && 2 === parameter.length)
                {
                    return parameter[0] !== parameter[1];
                }
                return undefined;
            },
        },
        number:
        {
            compare: async (entry: EvaluateEntry<Call>, parameter: Jsonable | undefined): Promise<Jsonable | undefined> =>
            {
                if (isArray(isNumber)(parameter) && 2 === parameter.length)
                {
                    if (parameter[0] < parameter[1])
                    {
                        return "<";
                    }
                    if (parameter[0] === parameter[1])
                    {
                        return "=";
                    }
                    if (parameter[0] > parameter[1])
                    {
                        return ">";
                    }
                    throw await new ErrorJson
                    (
                        entry, "never",
                        {
                            parameter,
                        }
                    );
                }
                return undefined;
            },
            sum: (_entry: EvaluateEntry<Call>, parameter: Jsonable | undefined): Jsonable | undefined =>
            {
                if (isArray(isNumber)(parameter))
                {
                    return parameter.reduce((a, b) => a +b, 0);
                }
                return undefined;
            },
            remainder: (_entry: EvaluateEntry<Call>, parameter: Jsonable | undefined): Jsonable | undefined =>
            {
                if (isTuple<number, number>(isNumber, isNumber)(parameter))
                {
                    return parameter[0] % parameter[1];
                }
                return undefined;
            }
        },
        string:
        {
            join: (_entry: EvaluateEntry<Call>, parameter: Jsonable | undefined): Jsonable | undefined =>
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
            },
        }
    };
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
    export const compositeCompareTypeResult = (...list: LazyValue<CompareTypeResult | undefined>[]): CompareTypeResult =>
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
            const aHasUnmatch = aEnum.some(i => ! bEnum.includes(i));
            const bHasUnmatch = bEnum.some(i => ! aEnum.includes(i));
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
            const aHasUnmatch = aNeverEnum.some(i => ! bNeverEnum.includes(i));
            const bHasUnmatch = bNeverEnum.some(i => ! aNeverEnum.includes(i));
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
    export const getMinValue = (value: NumberValueType): number | undefined =>
        isRangeNumberValueTypeData(value) ? value.minValue:
        isEnumNumberValueTypeData(value) && 0 < (value.enum?.length ?? 0) ? Math.min(...value.enum ?? []):
        undefined;
    export const getMaxValue = (value: NumberValueType): number | undefined =>
        isRangeNumberValueTypeData(value) ? value.maxValue:
        isEnumNumberValueTypeData(value) && 0 < (value.enum?.length ?? 0) ? Math.max(...value.enum ?? []):
        undefined;
    export const compareTypeMinValue = (a: NumberValueType, b: NumberValueType): CompareTypeResult =>
    {
        const aMinValue = getMinValue(a);
        const bMinValue = getMinValue(b);
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
        const aMaxValue = getMaxValue(a);
        const bMaxValue = getMaxValue(b);
        if (aMaxValue === bMaxValue)
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
    export const asIntegerOnly = (type: NumberValueType): boolean =>
    {
        if (isRangeNumberValueTypeData(type))
        {
            return type.integerOnly ?? false;
        }
        else
        if (isEnumNumberValueTypeData(type) && type.enum)
        {
            return type.enum.every(i => i === Math.floor(i));
        }
        return false;
    };
    export const compareTypeIntegerOnly = (a: NumberValueType, b: NumberValueType): CompareTypeResult =>
    {
        const aIntegerOnly = asIntegerOnly(a);
        const bIntegerOnly = asIntegerOnly(b);
        if (aIntegerOnly === bIntegerOnly)
        {
            return "equal";
        }
        else
        if (aIntegerOnly)
        {
            return "extended";
        }
        else
        if (bIntegerOnly)
        {
            return "base";
        }
        else
        {
            // throw await new ErrorJson({ $arch: "error", message: "Unreachable xxx", }); の方が望ましい。
            return "unmatch";
        }
    };
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
    export const compareTypeMinLength = <TargetType extends TypeHasMinMaxLength>(a: TargetType, b: TargetType): CompareTypeResult =>
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
    export const compareTypeMaxLength = <TargetType extends TypeHasMinMaxLength>(a: TargetType, b: TargetType): CompareTypeResult =>
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
    export const compareTypeMinMaxLength = <TargetType extends TypeHasMinMaxLength>(a: TargetType, b: TargetType): CompareTypeResult => compositeCompareTypeResult
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
                .map((_i, ix) => <LazyValue<CompareTypeResult | undefined>>(() => compareType(a[ix], b[ix]))),
            commonLength < a.length ? "extended": undefined,
            commonLength < b.length ? "base": undefined,
        );
    };
    export const compareTypeObjectMember = (a: ObjectType, b: ObjectType): CompareTypeResult =>
    {
        const aMemberList = objectKeys(a.member);
        const bMemberList = objectKeys(b.member);
        const commonMemberList = aMemberList.filter(a => bMemberList.includes(a));
        const aOnlyMemberList = aMemberList.filter(a => ! commonMemberList.includes(a));
        const bOnlyMemberList = bMemberList.filter(b => ! commonMemberList.includes(b));
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
        if (resultList.every(i => "equal" === i) && isOrCompositeTypeData(b) && a.list.length === b.list.length)
        {
            return "equal";
        }
        if (resultList.some(i => isBaseOrEqual(i)))
        {
            return "base";
        }
        if (resultList.every(i => isEqualOrExtented(i)))
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
        compareTypeIntegerOnly,
    ]);
    export const compareStringValueType = compositeCompareType<StringValueType>
    ([
        compareTypeOptional,
        compareTypeEnum,
        compareTypeNeverEnum,
        compareTypeFormat,
        compareTypeMinMaxLength,
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
        if (isAnyTypeData(a) && ! isAnyTypeData(b))
        {
            return "base";
        }
        else
        if ( ! isAnyTypeData(a) && isAnyTypeData(b))
        {
            return "extended";
        }
        else
        if (isAnyTypeData(a) && isAnyTypeData(b))
        {
            return "equal";
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
                result.enum = aEnum.filter(i => bEnum.includes(i));
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
                    result.neverEnum = aNeverEnum.concat(bNeverEnum.filter(i => ! aNeverEnum.includes(i)));
                }
            }
            const neverEnum = result.neverEnum;
            if (undefined !== neverEnum)
            {
                if (undefined !== result.enum)
                {
                    result.enum = result.enum.filter(i => ! neverEnum.includes(i));
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
    export const andTypeMinMaxLength = <TargetType extends TypeHasMinMaxLength>(a: TargetType, b: TargetType): TargetType | NeverType =>
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
        andTypeMinMaxLength,
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
    export const turnRefer = async <Element extends JsonableValue | Function>(entry: EvaluateEntry<Jsonable>, root: Structure<Element>, refer: Refer, sourceMap?: OriginMap): Promise<Structure<Element> | undefined> =>
    {
        let rest = refer.map(i => i);
        let current: Structure<Element> | undefined = root;
        while(true)
        {
            if (rest.length <= 0)
            {
                return current;
            }
            if (isIntermediate(current))
            {
                current = <Structure<Element>>current.value;
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
                throw await new ErrorJson
                (
                    entry, "Unmatch refer path",
                    {
                        refer,
                        sourceMap,
                        root: toJsonable(root),
                    }
                );
            }
        }
    };
    export const resolveValueRefer = async (entry: EvaluateEntry<AlphaJsonarch & { refer: Refer }>): Promise<Jsonable | undefined> =>
    {
        return await turnRefer<JsonableValue>
        (
            entry,
            {
                template: entry.cache.template,
                type: entry.cache.type,
                value: entry.cache.value,
                scope: entry.scope,
                parameter: entry.parameter,
            },
            makeSolid(entry.template.value.refer),
            {
                template: entry.path,
            }
            // entry.originMap
        );
    };
    export const evaluateCall = (entry: EvaluateEntry<Call>): Promise<IntermediateTarget<Jsonable>> => profile
    (
        entry, "evaluateCall", async () =>
        {
            await Limit.throwIfOverTheCallDepth(entry);
            const parameter = await makeParameter(entry);
            const refer = makeSolid(entry.template.value.refer);
            const path = resolveThisPath
            (
                entry.this?.path,
                {
                    root: entry.context.process.template,
                    refer,
                }
            );
            const nextDepthEntry =
            {
                ...Limit.resetNestDepth(entry, entry.template.value.refer.value.length),
                callStack: makeCallStack
                (
                    entry.callStack,
                    {
                        path,
                        parameter,
                        caller: entry.path,
                    }
                ),
                path,
                // origin:
                // {
                //     root: getRootOrigin(entry.origin),
                //     template: getOriginPath(entry.origin),
                //     parameter,
                //     originMap: entry.originMap,
                // },
            };
            const target = await turnRefer<JsonableValue | Function>
            (
                entry,
                {
                    ...library,
                    this: entry.this?.template,
                    template: entry.cache.template,
                },
                refer,
                {
                    template: entry.path,
                }
                // entry.originMap
            );
            if ("function" === typeof target)
            {
                return await profile
                (
                    nextDepthEntry, "evaluateCall.library", async () =>
                    {
                        const parameterInfo = await getTemplate(nextDepthEntry, "system", parameter);
                        if (isCallTemplateCache(parameterInfo))
                        {
                            return parameterInfo.result;
                        }
                        const result = await profile
                        (
                            nextDepthEntry,
                            `library.${entry.template.value.refer.value.map(i => i.value).join(".")}`,
                            async () => await target(nextDepthEntry, parameterInfo.parameter)
                        );
                        if (undefined === result)
                        {
                            throw await UnmatchParameterTypeDefineError(nextDepthEntry, parameterInfo.parameter);
                        }
                        await validateReturnType(nextDepthEntry, parameterInfo, result);
                        if (undefined !== parameterInfo.cacheKey)
                        {
                            if (undefined === entry.cache.call)
                            {
                                entry.cache.call = { };
                            }
                            entry.cache.call[parameterInfo.cacheKey] = result;
                        }
                        return result;
                    }
                );
            }
            else
            if (isIntermediateTemplateData(target))
            {
                return await profile
                (
                    nextDepthEntry, "evaluateCall.template", async () =>
                    {
                        const parameterInfo = await getTemplate(nextDepthEntry, "template", parameter);
                        if (isCallTemplateCache(parameterInfo))
                        {
                            return parameterInfo.result;
                        }
                        const result = await evaluateTemplate
                        ({
                            ...nextDepthEntry,
                            template: target,
                            parameter: parameterInfo.parameter,
                        });
                        if (undefined !== parameterInfo.cacheKey)
                        {
                            if (undefined === entry.cache.call)
                            {
                                entry.cache.call = { };
                            }
                            entry.cache.call[parameterInfo.cacheKey] = result;
                        }
                        return result;
                    }
                );
            }
            else
            {
                throw await new ErrorJson
                (
                    entry, "Unknown refer call",
                    {
                        path,
                        refer,
                        target: toJsonable(target),
                    }
                );
            }
        }
    );
    export const evaluateCallResultType = (entry: EvaluateEntry<Call>): Promise<Type> => profile
    (
        entry, "evaluateCallResultType", async () =>
        {
            await Limit.throwIfOverTheCallDepth(entry);
            const parameter = await makeParameter(entry) ?? null;
            const path = resolveThisPath
            (
                entry.this?.path,
                {
                    root: entry.context.process.template,
                    refer: makeSolid(entry.template.value.refer),
                }
            );
            const nextDepthEntry =
            {
                ...Limit.resetNestDepth(entry, entry.template.value.refer.value.length),
                callStack: makeCallStack
                (
                    entry.callStack,
                    {
                        path,
                        parameter,
                        caller: entry.path,
                    }
                ),
                path,
                // origin:
                // {
                //     root: getRootOrigin(entry.origin),
                //     template: getOriginPath(entry.origin),
                //     parameter,
                //     originMap: entry.originMap,
                // },
            };
            const refer = makeSolid(entry.template.value.refer);
            await makeSureIntermediateLibrarygJson(entry);
            const functionTemplate = await turnRefer<JsonableValue | Function>
            (
                entry,
                {
                    ...intermediateLibrarygJson,
                    value:
                    {
                        ...intermediateLibrarygJson.value,
                        this: entry.this?.template,
                        template: entry.cache.template,
                    },
                },
                refer,
                {
                    template: entry.path,
                }
                // entry.originMap
            );
            if (isIntermediateTemplateData(functionTemplate))
            {
                const type = undefinedable(makeSolid)(functionTemplate.value.type);
                if (type)
                {
                    const parameterType = await typeOfResult(nextDepthEntry, parameter);
                    const types = Array.isArray(type) ? type: [type];
                    const compareTypeResult = types.map(t => ({ return: t.return, compareTypeResult: compareType(t.parameter, parameterType)}));
                    const match = compareTypeResult.find(r => isBaseOrEqual(r.compareTypeResult));
                    if (match)
                    {
                        return match.return;
                    }
                    else
                    {
                        throw await new ErrorJson
                        (
                            entry, "Unmatch parameter type",
                            {
                                refer,
                                compareTypeResult,
                                type:
                                {
                                    template: type,
                                    parameter: parameterType,
                                },
                                parameter,
                            }
                        );
                        }
                }
                else
                {
                    throw await new ErrorJson
                    (
                        entry, "Not found type define",
                        {
                            refer,
                        }
                    );
                }
            }
            else
            {
                throw await new ErrorJson
                (
                    entry, "Not found template",
                    {
                        refer,
                        template: toJsonable(functionTemplate),
                    }
                );
            }
    
        }
    );
    export const typeOfInput = async (entry: ContextOrEntry, json: Jsonable | undefined): Promise<Type> => profile
    (
        entry, "typeOfInput", async () =>
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
                return { $arch: "type", type: "tuple", list: await Promise.all(json.map(i => typeOfInput(entry, i))), };
            }
            else
            if ("object" === typeof json)
            {
                if (isIntermediate(json))
                {
                    return json.type;
                }
                else
                if (isLazy(json))
                {
                    console.log(getJsonableErrors(entry, "entry"));
                    throw await new ErrorJson(entry, "never: Lazy in Loading", toJsonable(entry));
                }
                else
                {
                    const member: { [key:string]: Type } = { };
                    const keys = objectKeys(json);
                    for(const i in keys)
                    {
                        const key = keys[i];
                        member[key] = await typeOfInput(entry, <Jsonable>json[key]);
                    }
                    return { $arch: "type", type: "object", member, };
                }
            }
            // else
            // if ("function" === typeof json)
            // {
            //     return { $arch: "type", type: "function", };
            // }
            // else
            // {
                return { $arch: "type", type: "never", };
            // }
        }
    );
    export const typeOfResult = async (entry: ContextOrEntry, json: Jsonable | undefined): Promise<Type> => profile
    (
        entry, "typeOfResult", async () =>
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
                return { $arch: "type", type: "tuple", list: await Promise.all(json.map(i => typeOfResult(entry, i))), };
            }
            else
            if ("object" === typeof json)
            {
                if (isIntermediate(json))
                {
                    return json.type;
                }
                else
                if (isLazy(json))
                {
                    // if (isEvaluateEntry(isAny)(entry))
                    // {
                    //     return await evaluateLazyResultType(entry, json);
                    // }
                    // else
                    // {
                    //     console.log(getJsonableErrors(entry, "entry"));
                    //     throw await new ErrorJson(undefined, "never: Lazy in Loading", toJsonable(entry));
                    // }
                    return json.type;
                }
                else
                {
                    const member: { [key:string]: Type } = { };
                    const keys = objectKeys(json);
                    for(const i in keys)
                    {
                        const key = keys[i];
                        member[key] = await typeOfResult(entry, <Jsonable>json[key]);
                    }
                    return { $arch: "type", type: "object", member, };
                }
            }
            // else
            // if ("function" === typeof json)
            // {
            //     return { $arch: "type", type: "function", };
            // }
            // else
            // {
                return { $arch: "type", type: "never", };
            // }
        }
    );
    export const evaluateValue = (entry: EvaluateEntry<Value>): Promise<Jsonable> => profile
    (
        entry, "evaluateValue", async () =>
        {
            const result = await resolveValueRefer(entry);
            if (undefined === result)
            {
                throw await new ErrorJson
                (
                    entry, "Unknown refer value",
                    {
                        value: entry.template,
                    }
                );
            }
            return result;
        }
    );
    export const evaluateValueResultType = (entry: EvaluateEntry<Value>): Promise<Type> => profile
    (
        entry, "evaluateValueResultType", async () =>
        {
            if (entry.template.type)
            {
                return entry.template.type;
            }
            const result = await resolveValueRefer(entry);
            if (undefined === result)
            {
                throw await new ErrorJson
                (
                    entry, "Unknown refer value",
                    {
                        value: entry.template,
                    }
                );
            }
            return await typeOfResult(entry, result);
        }
    );
    export const evaluateIfMatch = <TargetType extends AlphaJsonarch>(isMatch: ((entry: AlphaJsonarch) => entry is IntermediateTarget<TargetType>), evaluateTarget: (entry: EvaluateEntry<TargetType>) => Promise<Jsonable>) =>
        async (entry: EvaluateEntry<AlphaJsonarch>): Promise<Jsonable | undefined> =>
            isMatch(entry.template) ? evaluateTarget(<EvaluateEntry<TargetType>>entry): undefined;
    const evaluatorList: ((entry: EvaluateEntry<AlphaJsonarch>) => Promise<Jsonable | undefined>)[] =
    [
        evaluateIfMatch(isIntermediateStaticData, evaluateStatic),
        evaluateIfMatch(isIntermediateIncludeStaticJsonData, evaluateIncludeStaticJson),
        evaluateIfMatch(isIntermediateTemplateData, evaluateTemplate),
        evaluateIfMatch(isIntermediateThrowData, evaluateThrow),
        evaluateIfMatch(isIntermediateMatchData, evaluateMatch),
        evaluateIfMatch(isIntermediateLoopData, evaluateLoop),
        evaluateIfMatch(isIntermediateChainData, evaluateChain),
        evaluateIfMatch(isIntermediateCallData, evaluateCall),
        evaluateIfMatch(isIntermediateValueData, evaluateValue),
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
            throw await new ErrorJson
            (
                entry, "Unknown Jsonarch Type",
                {
                    template: entry.template,
                }
            );
            // return entry.template;
        }
    );
    export const evaluateResultTypeIfMatch = <TargetType extends AlphaJsonarch>(isMatch: ((entry: AlphaJsonarch) => entry is IntermediateTarget<TargetType>), evaluateTarget: (entry: EvaluateEntry<TargetType>) => Promise<Type>) =>
        async (entry: EvaluateEntry<AlphaJsonarch>): Promise<Type | undefined> =>
            isMatch(entry.template) ? evaluateTarget(<EvaluateEntry<TargetType>>entry): undefined;
    const evaluatorResultTypeList: ((entry: EvaluateEntry<AlphaJsonarch>) => Promise<Type | undefined>)[] =
    [
        evaluateResultTypeIfMatch(isIntermediateStaticData, evaluateStaticResultType),
        evaluateResultTypeIfMatch(isIntermediateIncludeStaticJsonData, evaluateIncludeStaticJsonResultType),
        evaluateResultTypeIfMatch(isIntermediateTemplateData, evaluateTemplateResultType),
        evaluateResultTypeIfMatch(isIntermediateMatchData, evaluateMatchResultType),
        evaluateResultTypeIfMatch(isIntermediateLoopData, evaluateLoopResultType),
        evaluateResultTypeIfMatch(isIntermediateChainData, evaluateChainResultType),
        evaluateResultTypeIfMatch(isIntermediateCallData, evaluateCallResultType),
        evaluateResultTypeIfMatch(isIntermediateValueData, evaluateValueResultType),
    ];
    export const evaluateResultType = (entry: EvaluateEntry<AlphaJsonarch>): Promise<Type> => profile
    (
        entry, "evaluateResultType", async () =>
        {
            for(const i in evaluatorResultTypeList)
            {
                const result = await evaluatorResultTypeList[i](entry);
                if (undefined !== result)
                {
                    return result;
                }
            }
            throw await new ErrorJson
            (
                entry, "Unknown Jsonarch Type",
                {
                    template: entry.template,
                }
            );
            // return entry.template;
        }
    );
    export const getLazyTemplate = async (entry: EvaluateEntry<Jsonable>, lazy: Lazy) => profile
    (
        entry, "getLazyTemplate", async () =>
        {
            return <IntermediateTarget<AlphaJsonarch>> await makeInputIntermediate
            (
                entry,
                <AlphaJsonarch> await turnRefer<JsonableValue>
                (
                    entry,
                    <StructureObject<JsonableValue>>entry.cache.json?.[<string>lazy.path.root.path],
                    toLeafFullRefer(lazy.path).refer
                ),
                lazy.path.root
            );
        }
    );
    export const evaluateLazy = async (entry: EvaluateEntry<Jsonable>, lazy: IntermediateTarget<Lazy>) =>
        await apply(await restoreFromLazy(entry, lazy));
    export const evaluateLazyResultType = async (entry: EvaluateEntry<Jsonable>, lazy: IntermediateTarget<Lazy>) =>
        await evaluateResultType(await restoreFromLazy(entry, lazy));
    export module Limit
    {
        export const getProcessTimeout = (entry: EvaluateEntry<Jsonable>) =>
            entry.setting.limit?.processTimeout ??
            settingJson.limit.processTimeout ??
            1000;
        export const getMaxCallNestDepth = (entry: EvaluateEntry<Jsonable>) =>
            entry.setting.limit?.maxCallNestDepth ??
            settingJson.limit.maxCallNestDepth ??
            16;
        export const getMaxArrayLength = (entry: EvaluateEntry<Jsonable>) =>
            entry.setting.limit?.maxArrayLength ??
            settingJson.limit.maxArrayLength ??
            1000;
        export const getMaxObjectNestDepth = (entry: EvaluateEntry<Jsonable>) =>
            entry.setting.limit?.maxObjectNestDepth ??
            settingJson.limit.maxObjectNestDepth ??
            32;
        export const getMaxObjectMembers = (entry: EvaluateEntry<Jsonable>) =>
            entry.setting.limit?.maxObjectMembers ??
            settingJson.limit.maxObjectMembers ??
            32;
        export const throwIfOverTheProcessTimeout = async (entry: EvaluateEntry<Jsonable>) =>
        {
            const processTimeout = getProcessTimeout(entry);
            const now = getTicks();
            const elapsed = now - entry.context.profile.startAt;
            if (processTimeout < elapsed)
            {
                throw await new ErrorJson
                (
                    entry, "Process Timeout",
                    {
                        processTimeout,
                        elapsed,
                    }
                );
            }
        };
        export const throwIfOverTheNestDepth = async (entry: EvaluateEntry<Jsonable>) =>
        {
            const maxObjectNestDepth = getMaxObjectNestDepth(entry);
            const nestDepth = entry.context.nestDepth ?? 0;
            if (maxObjectNestDepth < nestDepth)
            {
                throw await new ErrorJson
                (
                    entry, "Too Deep Object Nest",
                    {
                        maxObjectNestDepth,
                        nestDepth,
                    }
                );
            }
        };
        export const throwIfOverTheCallDepth = async (entry: EvaluateEntry<Jsonable>) =>
        {
            const maxCallNestDepth = getMaxCallNestDepth(entry);
            const callDepth = entry.callStack.length;
            if (maxCallNestDepth < callDepth)
            {
                throw await new ErrorJson
                (
                    entry, "Too Deep Call Nest",
                    {
                        maxCallNestDepth,
                        callDepth,
                    }
                );
            }
        };
        export const resetNestDepth = <Entry extends EvaluateEntry<Jsonable>>(entry: Entry, nestDepth: number = 0): Entry =>
        ({
            ...entry,
            context:
            {
                ...entry.context,
                nestDepth,
            },
        });
        export const incrementNestDepth = <Entry extends EvaluateEntry<Jsonable>>(entry: Entry): Entry =>
            resetNestDepth(entry, (entry.context.nestDepth ?? 0) +1);
    }
    export const apply = (entry: EvaluateEntry<Jsonable>, lazyable: boolean = false): Promise<IntermediateTarget<Jsonable>> => profile
    (
        entry, "apply", async () =>
        {
            await Limit.throwIfOverTheProcessTimeout(entry);
            await Limit.throwIfOverTheNestDepth(entry);
            const template = entry.template;
            const value = template.value;
            if (null === value || "object" !== typeof value)
            {
                if (isIntermediate(value))
                {
                    return template;
                }
                else
                {
                    const result = template;
                    return await makeOutputIntermediate(entry, result, entry.path);
                }
            }
            else
            if (isEvaluateTargetEntry(entry))
            {
                const result = await profile
                (
                    entry, "apply.evaluate", async () =>
                        lazyable && isLazyableEvaluateTargetEntry(entry) ?
                            await profile(entry, "apply.makeLazy", async () => jsonParse(jsonStringify(await makeLazy(entry)))):
                            // <Jsonable><unknown>(async () => await evaluate(entry)):
                            // await evaluate(entry):
                            await evaluate(entry)
                );
                return await makeOutputIntermediate(entry, result, entry.path);
            }
            else
            if (Array.isArray(value))
            {
                return await profile
                (
                    entry, "apply.array", async () =>
                    {
                        const maxArrayLength = Limit.getMaxArrayLength(entry);
                        if (maxArrayLength < value.length)
                        {
                            throw await new ErrorJson
                            (
                                entry, "Too Long Array Length",
                                {
                                    maxArrayLength,
                                    templateLength: value.length,
                                }
                            );
                        }
                        const nextDepthEntry = Limit.incrementNestDepth(entry);
                        const result: Jsonable[] = [];
                        for(const i in value)
                        {
                            const ix = parseInt(i);
                            result.push
                            (
                                await apply
                                (
                                    {
                                        ...nextDepthEntry,
                                        path: makeFullRefer(entry.path, ix),
                                        template: value[ix],
                                    },
                                    lazyable
                                )
                            );
                        }
                        return await makeOutputIntermediate(entry, result, entry.path);
                    }
                );
            }
            else
            {
                return await profile
                (
                    entry, "apply.object", async () =>
                    {
                        const result: JsonableObject = { };
                        const maxObjectMembers = Limit.getMaxObjectMembers(entry);
                        if (maxObjectMembers < objectKeys(value).length)
                        {
                            throw await new ErrorJson
                            (
                                entry, "Too Many Object Members",
                                {
                                    maxObjectMembers,
                                    templateMembers: objectKeys(value).length,
                                }
                            );
                        }
                        const nextDepthEntry = Limit.incrementNestDepth(entry);
                        const keys = objectKeys(value);
                        for(const i in keys)
                        {
                            const key = keys[i];
                            result[key] = await apply
                            (
                                {
                                    ...nextDepthEntry,
                                    path: makeFullRefer(entry.path, key),
                                    template: value[key],
                                },
                                lazyable
                            );
                        }
                        return await makeOutputIntermediate(entry, result, entry.path);
                    }
                );
            }
        }
    );
    export const lazyableApply = (entry: EvaluateEntry<Jsonable>) => apply(entry, entry.setting.process?.lazyEvaluation ?? true);
    export interface ApplyRootResult extends JsonableObject
    {
        process: Process;
        intermediateResult: IntermediateTarget<Jsonable>;
        profile: Profile;
        cache: Cache;
        setting: Setting;
    }
    export const applyRoot = (entry: CompileEntry, template: IntermediateTarget<Jsonable>, parameter: IntermediateTarget<Jsonable> | undefined, cache: Cache, setting: Setting, lazy?: "resolveLazy"): Promise<ApplyRootResult> => profile
    (
        entry, "applyRoot", async () =>
        {
            const handler = entry.handler;
            const process = regulateJsonable(entry.process, "deep");
            const profile = makeProfile();
            const context =
            {
                process,
                profile,
            };
            // const origin = entry.template;
            const callStack: CallStackEntry[] = [];
            const path: FullRefer = { root: process.template, refer: [] };
            const rootEvaluateEntry: EvaluateEntry<Jsonable> =
            {
                context,
                template,
                callStack,
                path,
                // origin,
                parameter,
                cache,
                setting,
                handler,
                originMap: <OriginMap>
                (
                    process.parameter ?
                    ({
                        paremter: <Origin>
                        {
                            root: process.parameter,
                            refer: "root",
                        },
                    }):
                    undefined
                ),
            };
            try
            {
                const intermediateResult = "resolveLazy" === lazy ?
                        await resolveLazy(rootEvaluateEntry, await apply(rootEvaluateEntry)):
                        await apply(rootEvaluateEntry);
                const result: ApplyRootResult =
                {
                    process,
                    intermediateResult,
                    profile,
                    cache,
                    setting,
                };
                return result;
            }
            catch(error: any)
            {
                const intermediateResult = await parseErrorJson(entry, error);
                const result: ApplyRootResult =
                {
                    process,
                    intermediateResult,
                    profile,
                    cache,
                    setting,
                };
                return result;
            }
        }
    );
    export const applyRootResultToProcessResult = (root: ApplyRootResult): Result =>
    {
        const profile = makeProfileReport(root.profile);
        const { output, originMap, } = makeOutput
        (
            root,
            root.process.template
        );
        const result: Result =
        {
            $arch: "result",
            process: root.process,
            output: decode(output),
            originMap,
            profile,
            cache: root.cache,
            setting: root.setting,
        };
        return result;
    };
    export const process = async (entry: CompileEntry):Promise<Result> =>
    {
        const startAt = new Date();
        const startAtTicks = getTicks();
        const handler = entry.handler;
        const process = entry.process;
        const emptyCache: Cache = { "$arch": "cache" };
        const cache = process.cache ?
            makeSolid(await load({ context: entry, cache:emptyCache, setting: bootSettingJson as Setting, handler, file: process.cache })):
            emptyCache;
        const settingFileContext =
            process.setting ??
            getSystemFileContext("default-setting.json");
        const settingResult = await applyRoot
        (
            {
                handler,
                process:
                {
                    template: settingFileContext,
                    cache: process.cache,
                    setting: getSystemFileContext("boot-setting.json"),
                },
                profile: makeProfile(),
            },
            await load({ context: entry, cache, setting: bootSettingJson as Setting, handler, file: settingFileContext }),
            undefined,
            cache,
            bootSettingJson as Setting,
            "resolveLazy"
        );
        if (isError(settingResult.intermediateResult))
        {
            return applyRootResultToProcessResult(settingResult);
        }
        const setting: Setting = settingResult.output as Setting ?? { "$arch": "setting", };
        const parameterResult = process.parameter ?
            await applyRoot
            (
                {
                    process:
                    {
                        template: process.parameter,
                        cache: process.cache,
                        setting: settingFileContext,
                    },
                    profile: makeProfile(),
                    handler,
                },
                await load({ context: entry, cache, setting, handler, file: process.parameter }),
                undefined,
                cache,
                setting
            ):
            undefined;
        const parameter: IntermediateTarget<Jsonable> | undefined = parameterResult?.intermediateResult;
        if (parameterResult && isError(parameterResult.intermediateResult))
        {
            return applyRootResultToProcessResult(parameterResult);
        }
        const template = await load({ context: entry, cache, setting, handler, file: process.template});
        const result = applyRootResultToProcessResult(await applyRoot(entry, template, parameter, cache, setting, "resolveLazy"));
        if (undefined === result.process.startAt)
        {
            //  将来的に UI ができた際は toLocaleString() の値ではなく、 getTime() の値を格納するように変更
            result.process.startAt = startAt.toLocaleString(result.setting.locale?.language);
        }
        result.process.duration = getTicks() -startAtTicks;
        return result;
    };
    export const encode = structure
    (
        (json: JsonableValue, key?: number | string) =>
            "$arch" === key && "string" === typeof json ? "$" +json: json
    );
    export const decode = structure
    (
        (json: JsonableValue, key?: number | string) =>
            "$arch" === key && "string" === typeof json && json.startsWith("$") ? json.substring(1): json
    );
    export const toLineArrayOrAsIs = (text: string) =>
        0 <= text.indexOf("\n") ? text.split("\n"): text;
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
            if (objectValues(json).some(i => isJsonableObject(i) || Array.isArray(i) || 60 < JSON.stringify(i).length))
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
            if (json.some(i => isJsonableObject(i) || Array.isArray(i) || 60 < JSON.stringify(i).length))
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
    export const digest = (json: Jsonable, setting: Setting, nestDepth?: number): Jsonable =>
    {
        const digestSetting = setting.outputFormat?.digest;
        const minTargetSize = (digestSetting?.minTargetSize ?? 0);
        const isFirstDepth = (nestDepth ?? 0) <= 0;
        if (digestSetting && ( ! isFirstDepth || minTargetSize <= 0 || minTargetSize < jsonStringify(json).length))
        {
            const nextNestDepth = (nestDepth ?? 0) +1;
            if (Array.isArray(json))
            {
                if (digestSetting.maxObjectNestDepth && digestSetting.maxObjectNestDepth < nextNestDepth)
                {
                    return `@digest: cliped array ( items: ${json.length} )`;
                }
                else
                {
                    const result = [];
                    if (isFirstDepth)
                    {
                        result.push({ $digest: true });
                    }
                    if (digestSetting.maxArrayLength && digestSetting.maxArrayLength < json.length)
                    {
                        for(let i = 0; i < Math.ceil(digestSetting.maxArrayLength /2); ++i)
                        {
                            result.push(digest(json[i], setting, nextNestDepth));
                        }
                        result.push(`@digest: cliped items ( ${json.length -digestSetting.maxArrayLength} )`);
                        for(let i = json.length -Math.floor(digestSetting.maxArrayLength /2); i < json.length; ++i)
                        {
                            result.push(digest(json[i], setting, nextNestDepth));
                        }
                    }
                    else
                    {
                        for(const i in json)
                        {
                            result.push(digest(json[i], setting, nextNestDepth));
                        }
                    }
                    return result;
                }
            }
            else
            if (null !== json && "object" === typeof json)
            {
                if (digestSetting.maxObjectNestDepth && digestSetting.maxObjectNestDepth < nextNestDepth)
                {
                    return `@digest: cliped object ( ${JSON.stringify(json).substring(0, 32)}... )`;
                }
                else
                {
                    const result: JsonableObject = { };
                    if (isFirstDepth)
                    {
                        result["$digest"] = true;
                    }
                    const keys = objectKeys(json);
                    if (digestSetting.maxObjectMembers && digestSetting.maxObjectMembers < keys.length)
                    {
                        for(let i = 0; i < Math.ceil(digestSetting.maxObjectMembers /2); ++i)
                        {
                            const key = keys[i];
                            result[key] = digest(<Jsonable>json[key], setting, nextNestDepth);
                        }
                        result["@digest"] = `@digest: cliped members ( ${keys.length -digestSetting.maxObjectMembers} )`;
                        for(let i = keys.length -Math.floor(digestSetting.maxObjectMembers /2); i < keys.length; ++i)
                        {
                            const key = keys[i];
                            result[key] = digest(<Jsonable>json[key], setting, nextNestDepth);
                        }
                    }
                    else
                    {
                        for(const i in keys)
                        {
                            const key = keys[i];
                            result[key] = digest(<Jsonable>json[key], setting, nextNestDepth);
                        }
                    }
                    return result;
                }
            }
            if ("string" === typeof json && digestSetting.maxStringLength && digestSetting.maxStringLength < json.length)
            {
                return `@digest: cliped string ( ${JSON.stringify(json.substring(0, digestSetting.maxStringLength))}... )`;
            }
            else
            {
                return json;
            }
        }
        else
        {
            return json;
        }
    };
    export const jsonToString = (json: Jsonable, asType: "result" | "output", setting: Setting): string =>
    {
        const digested = digest(json, setting);
        const indent = setting.outputFormat?.indent ?? "smart";
        if ("output" === asType && setting.outputFormat?.text && "string" === typeof digested)
        {
            return digested;
        }
        else
        if ("output" === asType && setting.outputFormat?.text && Array.isArray(digested) && digested.every(line => "string" === typeof line))
        {
            return digested.join("\n");
        }
        else
        if ("number" === typeof indent)
        {
            return jsonStringify(digested, undefined, indent);
        }
        else
        if ("tab" === indent)
        {
            return jsonStringify(digested, undefined, "\t");
        }
        else
        if ("smart" === indent)
        {
            return smartJsonStringify(digested, 4);
        }
        else
        {
            // "minify" === indent
            return jsonStringify(digested);
        }
    };
    export const throwIfError = <DataType extends Jsonable>(json: DataType): DataType =>
    {
        if (isError(json))
        {
            throw new Error(`json:${jsonStringify(json)}`);
        }
        return json;
    };
}
