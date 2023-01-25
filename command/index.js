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
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
var process = __importStar(require("process"));
var fs = __importStar(require("fs"));
var library_1 = require("../library");
// console.log(`process.argv: ${JSON.stringify(process.argv)}`);
// console.log(`locale:${Jsonarch.Locale.getSystemLocale()}`);
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
var showUsage = function () {
    console.log("usage: jsonarch template.json -p parameter.json -c cache.json -s setting.json -r result.json -o output.json");
    console.log("Jsonarch Commandline Tool Reference: https://github.com/wraith13/jsonarch/blob/master/document/commandline.md");
};
var showVersion = function () {
    console.log("".concat(library_1.Jsonarch.name, " v").concat(library_1.Jsonarch.version));
};
var regulateCommandLineParameters = function (params) {
    var _a, _b, _c, _d, _e;
    if (1 === Object.keys(params).length && 0 === params["default"].length) {
        showUsage();
        return null;
    }
    else if (2 === Object.keys(params).length && 0 === params["default"].length && undefined !== params["-v"]) {
        showVersion();
        return null;
    }
    else {
        var errors_1 = [];
        var knownParameters_1 = ["default", "-p", "-c", "-s", "-r", "-o",];
        var unknownParameters = Object.keys(params).filter(function (i) { return knownParameters_1.indexOf(i) < 0; });
        unknownParameters.forEach(function (i) { return errors_1.push("\"".concat(i, "\" is unknown option")); });
        var requireParameters = ["-t",];
        var lackParameters = requireParameters.filter(function (i) { var _a; return ((_a = params[i]) === null || _a === void 0 ? void 0 : _a.length) <= 0; });
        lackParameters.forEach(function (i) { return errors_1.push("\"".concat(i, "\" option is required.")); });
        var singleParameters_1 = ["default", "-p", "-c", "-s", "-r", "-o",];
        var pluralParameters = Object.keys(params).filter(function (i) { return 0 < singleParameters_1.indexOf(i); }).filter(function (i) { return 2 <= params[i].length; });
        pluralParameters.forEach(function (i) { return errors_1.push("Only one \"".concat(i, "\" option can be specified.")); });
        var inputPathParameters = ["default", "-p", "-c", "-s",];
        if (2 <= inputPathParameters.filter(function (key) { var _a, _b; return 0 <= ((_b = (_a = params[key]) === null || _a === void 0 ? void 0 : _a.indexOf("std:in")) !== null && _b !== void 0 ? _b : -1); }).length) {
            errors_1.push("Only one \"std:in\" can be specified.");
        }
        var outputPathParameters = ["-r", "-o",];
        if (2 <= outputPathParameters.filter(function (key) { var _a, _b; return 0 <= ((_b = (_a = params[key]) === null || _a === void 0 ? void 0 : _a.indexOf("std:out")) !== null && _b !== void 0 ? _b : -1); }).length) {
            errors_1.push("Only one \"std:out\" can be specified.");
        }
        if (2 <= outputPathParameters.filter(function (key) { var _a, _b; return 0 <= ((_b = (_a = params[key]) === null || _a === void 0 ? void 0 : _a.indexOf("std:err")) !== null && _b !== void 0 ? _b : -1); }).length) {
            errors_1.push("Only one \"std:err\" can be specified.");
        }
        if (0 < errors_1.length) {
            errors_1.forEach(function (e) { return console.error(e); });
            return null;
        }
        else {
            var result = {
                template: params["default"][0],
                parameter: (_a = params["-p"]) === null || _a === void 0 ? void 0 : _a[0],
                cache: (_b = params["-c"]) === null || _b === void 0 ? void 0 : _b[0],
                setting: (_c = params["-s"]) === null || _c === void 0 ? void 0 : _c[0],
                result: (_d = params["-r"]) === null || _d === void 0 ? void 0 : _d[0],
                output: (_e = params["-o"]) === null || _e === void 0 ? void 0 : _e[0],
            };
            return result;
        }
    }
};
var readOutStdIn = function () { return new Promise(function (resolve) {
    process.stdin.setEncoding("utf8");
    var buffer = "";
    process.stdin.on('readable', function () {
        var chunk;
        while (null !== (chunk = process.stdin.read())) {
            buffer += chunk;
        }
    });
    process.stdin.on("end", function () { return resolve(buffer); });
}); };
function commandLineArgumentToFileContext(path) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, _b, _c;
        var _d;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    _a = path;
                    switch (_a) {
                        case undefined: return [3 /*break*/, 1];
                        case "std:in": return [3 /*break*/, 2];
                    }
                    return [3 /*break*/, 4];
                case 1: return [2 /*return*/, undefined];
                case 2:
                    _d = { category: "none" };
                    _c = (_b = library_1.Jsonarch).jsonParse;
                    return [4 /*yield*/, readOutStdIn()];
                case 3: return [2 /*return*/, (_d.data = _c.apply(_b, [_e.sent()]), _d)];
                case 4: return [2 /*return*/, library_1.Jsonarch.commandLineArgumentToFileContext(path)];
            }
        });
    });
}
var writeFile = function (path, data) {
    switch (path) {
        case "std:out":
            console.log(data);
            break;
        case "std::err":
            console.error(data);
            break;
        default:
            fs.writeFileSync(path, data);
            break;
    }
};
var callJsonarch = function (argv) { return __awaiter(void 0, void 0, void 0, function () {
    var process, result;
    var _a;
    var _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _a = {};
                return [4 /*yield*/, commandLineArgumentToFileContext(argv.template)];
            case 1:
                _a.template = _c.sent();
                return [4 /*yield*/, commandLineArgumentToFileContext(argv.parameter)];
            case 2:
                _a.parameter = _c.sent();
                return [4 /*yield*/, commandLineArgumentToFileContext(argv.cache)];
            case 3:
                _a.cache = _c.sent();
                return [4 /*yield*/, commandLineArgumentToFileContext(argv.setting)];
            case 4:
                process = (_a.setting = _c.sent(),
                    _a);
                return [4 /*yield*/, library_1.Jsonarch.process({
                        process: process,
                        profile: library_1.Jsonarch.makeProfile(),
                        handler: {}
                    })];
            case 5:
                result = _c.sent();
                if (argv.result) {
                    writeFile(argv.result, library_1.Jsonarch.jsonToString(result, "result", result.setting));
                }
                if (argv.output || !argv.result) {
                    writeFile((_b = argv.output) !== null && _b !== void 0 ? _b : "std:out", library_1.Jsonarch.jsonToString(result.output, "output", result.setting));
                }
                return [2 /*return*/];
        }
    });
}); };
var commandLineParameters = parseCommandLineParameters(process.argv.filter(function (_i, ix) { return 2 <= ix; }));
// console.log(`commandLineParameters: ${JSON.stringify(commandLineParameters)}`);
var argv = regulateCommandLineParameters(commandLineParameters);
if (argv) {
    callJsonarch(argv);
}
//# sourceMappingURL=index.js.map