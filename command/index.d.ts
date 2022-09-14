#! /usr/bin/env node
export declare const parseCommandLineParameters: (argv: string[]) => {
    [key: string]: string[];
};
interface RegulatedCommandLineParameters {
    template: string;
    parameter?: string;
    setting?: string;
    result?: string;
    output?: string;
}
export declare const regulateCommandLineParameters: (params: {
    [key: string]: string[];
}) => RegulatedCommandLineParameters | null;
export declare const callJsonarch: (argv: RegulatedCommandLineParameters) => Promise<void>;
export {};
