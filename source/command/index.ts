#! /usr/bin/env node
import * as process from "process";
import * as fs from "fs";
import { Jsonarch } from "../library";
// console.log(`process.argv: ${JSON.stringify(process.argv)}`);
// console.log(`locale:${Jsonarch.Locale.getSystemLocale()}`);
const parseCommandLineParameters = (argv: string[]) =>
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
interface RegulatedCommandLineParameters
{
    template: string;
    parameter?: string;
    cache?: string;
    setting?: string;
    result?: string;
    output?: string;
}
const showUsage = () =>
{
    console.log("usage: jsonarch template.json -p parameter.json -c cache.json -s setting.json -r result.json -o output.json");
    console.log("usage: jsonarch -v");
    console.log("Jsonarch Commandline Tool Reference: https://github.com/wraith13/jsonarch/blob/master/document/commandline.md");
};
const showVersion = () =>
{
    console.log(`${Jsonarch.name} v${Jsonarch.version}`);
};
const regulateCommandLineParameters = (params: { [key: string]: string[] }): RegulatedCommandLineParameters | null =>
{
    if (1 === Object.keys(params).length && 0 === params["default"].length)
    {
        showUsage();
        return null;
    }
    else
    if (2 === Object.keys(params).length && 0 === params["default"].length && undefined !== params["-v"])
    {
        showVersion();
        return null;
    }
    else
    {
        const errors: string[] = [];
        const knownParameters = [ "default", "-p", "-c", "-s", "-r", "-o" ];
        const unknownParameters = Object.keys(params).filter(i => knownParameters.indexOf(i) < 0);
        unknownParameters.forEach(i => errors.push(`"${i}" is unknown option`));
        const requireParameters = [ "-t" ];
        const lackParameters = requireParameters.filter(i => params[i]?.length <= 0);
        lackParameters.forEach(i => errors.push(`"${i}" option is required.`));
        const singleParameters = [ "default", "-p", "-c", "-s", "-r", "-o" ];
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
                template: params["default"][0],
                parameter: params["-p"]?.[0],
                cache: params["-c"]?.[0],
                setting: params["-s"]?.[0],
                result: params["-r"]?.[0],
                output: params["-o"]?.[0],
            };
            return result;
        }
    }
};
const callJsonarch = async (argv: RegulatedCommandLineParameters) =>
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
        fs.writeFileSync(argv.result, Jsonarch.jsonToString(result, "result", result.setting));
    }
    if (argv.output)
    {
        fs.writeFileSync(argv.output, Jsonarch.jsonToString(result.output, "output", result.setting));
    }
    if ( ! (argv.result || argv.output))
    {
        console.log(Jsonarch.jsonToString(result.output, "output", result.setting));
    }
};
const commandLineParameters = parseCommandLineParameters(process.argv.filter((_i, ix) => 2 <= ix));
// console.log(`commandLineParameters: ${JSON.stringify(commandLineParameters)}`);
const argv = regulateCommandLineParameters(commandLineParameters);
if (argv)
{
    callJsonarch(argv);
}
