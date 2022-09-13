#! /usr/bin/env node
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseCommandLineParameters = void 0;
var process = __importStar(require("process"));
var library_1 = require("../library");
console.log("Hello, Jsonarch!");
console.log("template.json JSON Schema: ".concat(library_1.Jsonarch.templateSchema));
console.log("process.argv: ".concat(JSON.stringify(process.argv)));
console.log("locale:".concat(library_1.Jsonarch.Locale.getSystemLocale()));
var parseCommandLineParameters = function (argv) {
    var result = {};
    var key = "default";
    result[key] = [];
    for (var i in argv) {
        var current = argv[i];
        if (current.startsWith("-")) {
            key = current;
            result[key] = [];
        }
        else {
            result[key].push(current);
        }
    }
    return result;
};
exports.parseCommandLineParameters = parseCommandLineParameters;
var commandLineParameters = (0, exports.parseCommandLineParameters)(process.argv.filter(function (_i, ix) { return 2 <= ix; }));
console.log("commandLineParameters: ".concat(JSON.stringify(commandLineParameters)));
//# sourceMappingURL=index.js.map