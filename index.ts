module Jsonarch
{
    // const isConsoleMode = (typeof window !== 'undefined');
    export type JsonableValue = null | boolean | number | string;
    export interface JsonableObject
    {
        [key: string]: undefined | Jsonable;
    }
    export type Jsonable = JsonableValue | Jsonable[] | JsonableObject;
    export type JsonablePartial<Target> = { [key in keyof Target]?: Target[key] } & JsonableObject;
    export const jsonStringify = <T extends Jsonable>(source: T, replacer?: (this: any, key: string, value: any) => any, space?: string | number) => JSON.stringify(source, replacer, space);
    export const objectKeys = <T extends JsonableObject>(target: T) => Object.keys(target) as (keyof T & string)[];
    interface JsonarchBase extends JsonableObject
    {
        $arch: string;
    }
    export const isJsonarch = (template: Jsonable): template is JsonarchBase =>
        null !== template &&
        "object" === typeof template &&
        "$arch" in template &&
        "string" === typeof template.$arch;
    interface Cache extends JsonarchBase
    {
        $arch: "cache";
        json?: { [key: string]: Jsonable };
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
    interface StaticTemplate extends JsonarchBase
    {
        $arch: "static";
        return: Jsonable;
    }
    export const isStaticTemplate = (template: JsonarchBase): template is StaticTemplate =>
        "static" === template.$arch;
    export const evaluate = (template: JsonarchBase, _parameter?:Jsonable, _setting?: Setting): Jsonable =>
    {
        if (isStaticTemplate(template))
        {
            return template.return;
        }
        return template;
    };
    export const apply = (template: Jsonable, parameter?:Jsonable, setting?: Setting): Jsonable =>
    {
        if (null === template || "object" !== typeof template)
        {
            return template;
        }
        else
        if (isJsonarch(template))
        {
            return evaluate(template, parameter, setting);
        }
        else
        if (Array.isArray(template))
        {
            return template.map(i => apply(i, parameter, setting));
        }
        else
        {
            const result: JsonableObject = { };
            objectKeys(template).forEach
            (
                key => result[key] = apply(template, parameter, setting)
            );
            return result;
        }
    };
    export const compile = (template: Jsonable, parameter: Jsonable = { }, settings: Setting = { $arch: "setting", }):Result =>
    {
        const output = apply(template, parameter, settings);
        const result: Result =
        {
            $arch: "result",
            output,
            cache: settings.cache,
        };
        return result;
    };
}
