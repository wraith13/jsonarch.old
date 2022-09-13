#! /usr/bin/env node
import * as process from "process";
import { Jsonarch } from "../library";

console.log("Hello, Jsonarch!");
console.log(`template.json JSON Schema: ${Jsonarch.templateSchema}`);
console.log(`process.argv: ${JSON.stringify(process.argv)}`);
console.log(`locale:${Jsonarch.Locale.getSystemLocale()}`);
