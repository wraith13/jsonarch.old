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
    export const compile = (template: Jsonable, _params?:Jsonable, _settings?: Jsonable):Jsonable =>
    {
        return template;
    };
}
