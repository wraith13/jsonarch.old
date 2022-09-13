#! /usr/bin/env node
import * as process from "process";
import { Jsonarch } from "../library";
console.log("Hello, Jsonarch!");
console.log(`template.json JSON Schema: ${Jsonarch.templateSchema}`);
console.log(`process.argv: ${JSON.stringify(process.argv)}`);
console.log(`locale:${Jsonarch.Locale.getSystemLocale()}`);
export const parseCommandLineParameters = (argv: string[]) =>
{
    const result: { [key: string]: string[] } = { };
    let key = "default";
    result[key] = [];
    for(let i in argv)
    {
        const current = argv[i];
        if (current.startsWith("-"))
        {
            key = current;
            result[key] = [];
        }
        else
        {
            result[key].push(current);
        }
    }
    return result;
};
const commandLineParameters = parseCommandLineParameters(process.argv.filter((_i, ix) => 2 <= ix));
console.log(`commandLineParameters: ${JSON.stringify(commandLineParameters)}`);
