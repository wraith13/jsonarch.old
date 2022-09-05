module PlasticJson
{
    const isConsoleMode = (typeof window !== 'undefined');
    export type JsonableValue = null | boolean | number | string;
    export interface JsonableObject
    {
        [key: string]: undefined | Jsonable;
    }
    export type Jsonable = JsonableValue | Jsonable[] | JsonableObject;
    export type JsonablePartial<Target> = { [key in keyof Target]?: Target[key] } & JsonableObject;
    export const jsonStringify = <T extends Jsonable>(source: T, replacer?: (this: any, key: string, value: any) => any, space?: string | number) => JSON.stringify(source, replacer, space);
    interface Settings extends JsonableObject
    {
        language?: string;
        indent?: "minify" | "tab" | number;
        timeout?: number;
        profile?: boolean;
        trace?: "stdout" | "stderr" | boolean;
        originMap?: boolean;
        callGraph?: boolean;
    }
    interface Results extends JsonableObject
    {
        result: Jsonable;
        profile?: any;
        trace?: any;
        callGraph?: any;
    }
    export const compile = (template: Jsonable, _params?:Jsonable, _settings?: Settings):Results =>
    {
        const result =
        {
            result: template,
        };
        return result;
    };
}
