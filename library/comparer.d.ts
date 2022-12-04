export declare type TypeOfResultType = "unknown" | "object" | "boolean" | "number" | "bigint" | "string" | "symbol" | "function" | string;
export declare type CompareResultType = -1 | 0 | 1;
export declare type ComparerType<objectT> = (a: objectT, b: objectT) => CompareResultType;
export declare const basic: <valueT>(a: valueT, b: valueT) => CompareResultType;
export interface RawSource<objectT> {
    raw: ComparerType<objectT>;
}
export interface Source<objectT, valueT, valueT2> {
    condition?: ((a: objectT, b: objectT) => boolean) | TypeSource<objectT, valueT2>;
    getter: (object: objectT) => valueT;
}
export interface TypeSource<objectT, valueT> {
    getter?: (object: objectT) => valueT;
    type: TypeOfResultType;
}
export declare const make: <objectT, valueT = unknown, valueT2 = unknown>(source: RawSource<objectT> | Source<objectT, valueT, valueT2> | ((object: objectT) => valueT) | (RawSource<objectT> | Source<objectT, valueT, valueT2> | ((object: objectT) => valueT))[]) => ComparerType<objectT>;
export declare const lowerCase: ComparerType<string>;
