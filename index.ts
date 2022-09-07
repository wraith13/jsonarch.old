module Jsonarch
{
    // const isConsoleMode = (typeof window !== 'undefined');
    export const schema = "https://raw.githubusercontent.com/wraith13/jsonarch/master/json-schema.json#";
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
    interface IoHandler
    {
    }
    interface EvaluateEntry<TemplateType>
    {
        template: TemplateType;
        parameter:Jsonable;
        setting: Setting;
        handler: IoHandler;
    }
    export const isEvaluateEntryBase = (entry: EvaluateEntry<Jsonable>): entry is EvaluateEntry<JsonarchBase> => isJsonarch(entry.template);
    export const isEvaluateEntry = <Type extends JsonarchBase>(type: Type["$arch"]) => ((entry: EvaluateEntry<Jsonable>): entry is EvaluateEntry<Type> => isJsonarch(entry.template) && type === entry.template.$arch);
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
    export const isStaticData = isEvaluateEntry<StaticTemplate>("static");
    interface IncludeStaticJsonTemplate extends JsonarchBase
    {
        $arch: "include-static-json";
        path: string;
    }
    export const isIncludeStaticJsonData = isEvaluateEntry<IncludeStaticJsonTemplate>("include-static-json");
    export const evaluateStatic = (entry: EvaluateEntry<StaticTemplate>): Jsonable =>
        entry.template.return;
    export const evaluate = (entry: EvaluateEntry<JsonarchBase>): Jsonable =>
    {
        if (isStaticData(entry))
        {
            return evaluateStatic(entry);
        }
        if (isIncludeStaticJsonData(entry))
        {
            return entry.template.path;
        }
        return entry.template;
    };
    export const apply = (entry: EvaluateEntry<Jsonable>): Jsonable =>
    {
        if (null === entry.template || "object" !== typeof entry.template)
        {
            return entry.template;
        }
        else
        if (isEvaluateEntryBase(entry))
        {
            return evaluate(entry);
        }
        else
        if (Array.isArray(entry.template))
        {
            return entry.template.map
            (
                i => apply
                ({
                    ...entry,
                    ...
                    {
                        template: i,
                    }
                })
            );
        }
        else
        {
            const result: JsonableObject = { };
            const template = entry.template;
            objectKeys(template).forEach
            (
                key => result[key] = apply
                ({
                    ...entry,
                    ...
                    {
                        template: template[key] as Jsonable,
                    }
                })
            );
            return result;
        }
    };
    export const compile = async (data: EvaluateEntry<Jsonable>):Promise<Result> =>
    {
        const output = apply(data);
        const result: Result =
        {
            $arch: "result",
            output,
            cache: data.setting.cache,
        };
        return result;
    };
}
