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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.callJsonarch = exports.regulateCommandLineParameters = exports.parseCommandLineParameters = void 0;
var process = __importStar(require("process"));
var fs = __importStar(require("fs"));
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
var regulateCommandLineParameters = function (params) {
    var _a, _b, _c, _d;
    if (0 === Object.keys(params).length) {
        console.log("usage: jsonarch -t template.json -p parameter.json -s setting.json -r result.json -o output.json");
        console.log("Jsonarch Commandline Tool Reference: https://github.com/wraith13/jsonarch/blob/master/document/commandline.md");
        return null;
    }
    else {
        var errors_1 = [];
        var knownParameters_1 = ["default", "-t", "-p", "-s", "-r", "-o"];
        var unknownParameters = Object.keys(params).filter(function (i) { return knownParameters_1.indexOf(i) < 0; });
        unknownParameters.concat(params["default"]).forEach(function (i) { return errors_1.push("\"".concat(i, "\" is unknown option")); });
        var requireParameters = ["-t"];
        var lackParameters = requireParameters.filter(function (i) { var _a; return ((_a = params[i]) === null || _a === void 0 ? void 0 : _a.length) <= 0; });
        lackParameters.forEach(function (i) { return errors_1.push("\"".concat(i, "\" option is required.")); });
        var singleParameters_1 = ["-t", "-p", "-s", "-r", "-o"];
        var pluralParameters = Object.keys(params).filter(function (i) { return 0 < singleParameters_1.indexOf(i); }).filter(function (i) { return 2 <= params[i].length; });
        pluralParameters.forEach(function (i) { return errors_1.push("Only one \"".concat(i, "\" option can be specified.")); });
        if (0 < errors_1.length) {
            errors_1.forEach(function (e) { return console.error(e); });
            return null;
        }
        else {
            var result = {
                template: params["-t"][0],
                parameter: (_a = params["-p"]) === null || _a === void 0 ? void 0 : _a[0],
                setting: (_b = params["-s"]) === null || _b === void 0 ? void 0 : _b[0],
                result: (_c = params["-r"]) === null || _c === void 0 ? void 0 : _c[0],
                output: (_d = params["-o"]) === null || _d === void 0 ? void 0 : _d[0],
            };
            return result;
        }
    }
};
exports.regulateCommandLineParameters = regulateCommandLineParameters;
var callJsonarch = function (argv) { return __awaiter(void 0, void 0, void 0, function () {
    var result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, library_1.Jsonarch.process({
                    template: library_1.Jsonarch.commandLineArgumentToFileContext(argv.template),
                    parameter: argv.parameter ?
                        library_1.Jsonarch.commandLineArgumentToFileContext(argv.parameter) :
                        undefined,
                    setting: argv.setting ?
                        library_1.Jsonarch.commandLineArgumentToFileContext(argv.setting) :
                        undefined,
                    //profile?: Profile;
                    handler: {}
                })];
            case 1:
                result = _a.sent();
                if (argv.result) {
                    fs.writeFileSync(argv.result, library_1.Jsonarch.jsonToString(result, result.setting));
                }
                if (argv.output) {
                    fs.writeFileSync(argv.output, library_1.Jsonarch.jsonToString(result.output, result.setting));
                }
                return [2 /*return*/];
        }
    });
}); };
exports.callJsonarch = callJsonarch;
var argv = (0, exports.regulateCommandLineParameters)(commandLineParameters);
if (argv) {
    (0, exports.callJsonarch)(argv);
}
//# sourceMappingURL=index.js.map