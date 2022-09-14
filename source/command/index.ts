#! /usr/bin/env node
import * as process from "process";
import * as fs from "fs";
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
interface RegulatedCommandLineParameters
{
    template: string;
    parameter?: string;
    setting?: string;
    result?: string;
    output?: string;
}
export const regulateCommandLineParameters = (params: { [key: string]: string[] }): RegulatedCommandLineParameters | null =>
{
    if (0 === Object.keys(params).length)
    {
        console.log("usage: jsonarch -t template.json -p parameter.json -s setting.json -r result.json -o output.json");
        console.log("Jsonarch Commandline Tool Reference: https://github.com/wraith13/jsonarch/blob/master/document/commandline.md");
        return null;
    }
    else
    {
        const errors: string[] = [];
        const knownParameters = [ "default", "-t", "-p", "-s", "-r", "-o" ];
        const unknownParameters = Object.keys(params).filter(i => knownParameters.indexOf(i) < 0);
        unknownParameters.concat(params["default"]).forEach(i => errors.push(`"${i}" is unknown option`));
        const requireParameters = [ "-t" ];
        const lackParameters = requireParameters.filter(i => params[i]?.length <= 0);
        lackParameters.forEach(i => errors.push(`"${i}" option is required.`));
        const singleParameters = [ "-t", "-p", "-s", "-r", "-o" ];
        const pluralParameters = Object.keys(params).filter(i => 0 < singleParameters.indexOf(i)).filter(i => 2 <= params[i].length);
        pluralParameters.forEach(i => errors.push(`Only one "${i}" option can be specified.`));
        if (0 < errors.length)
        {
            errors.forEach(e => console.error(e));
            return null;
        }
        else
        {
            const result: RegulatedCommandLineParameters =
            {
                template: params["-t"][0],
                parameter: params["-p"]?.[0],
                setting: params["-s"]?.[0],
                result: params["-r"]?.[0],
                output: params["-o"]?.[0],
            };
            return result;
        }
    }
};
export const callJsonarch = async (argv: RegulatedCommandLineParameters) =>
{
    const result = await Jsonarch.process
    ({
        template: Jsonarch.commandLineArgumentToFileContext(argv.template),
        parameter: argv.parameter ?
            Jsonarch.commandLineArgumentToFileContext(argv.parameter):
            undefined,
        setting: argv.setting ?
            Jsonarch.commandLineArgumentToFileContext(argv.setting) as Jsonarch.FileContext<Jsonarch.Setting>:
            undefined,
        //profile?: Profile;
        handler: { }
    });
    if (argv.result)
    {
        fs.writeFileSync(argv.result, Jsonarch.jsonToString(result, result.setting));
    }
    if (argv.output)
    {
        fs.writeFileSync(argv.output, Jsonarch.jsonToString(result.output, result.setting));
    }
};
const argv = regulateCommandLineParameters(commandLineParameters);
if (argv)
{
    callJsonarch(argv);
}
