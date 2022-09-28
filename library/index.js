"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Jsonarch = exports.Locale = void 0;
var System = __importStar(require("./system"));
var boot_setting_json_1 = __importDefault(require("./boot.setting.json"));
var setting_json_1 = __importDefault(require("./setting.json"));
var Locale = __importStar(require("./locale"));
exports.Locale = __importStar(require("./locale"));
var Jsonarch;
(function (Jsonarch) {
    var _this = this;
    Jsonarch.jsonStringify = function (source, replacer, space) { return JSON.stringify(source, replacer, space); };
    Jsonarch.jsonParse = function (text, reviver) { return JSON.parse(text, reviver); };
    Jsonarch.objectKeys = function (target) { return Object.keys(target); };
    Jsonarch.objectValues = function (target) { return Object.values(target); };
    Jsonarch.isString = function (value) { return "string" === typeof value; };
    Jsonarch.isNumber = function (value) { return "number" === typeof value; };
    Jsonarch.isObject = function (value, isMember) {
        if (isMember === void 0) { isMember = {}; }
        return null !== value &&
            "object" === typeof value &&
            !Array.isArray(value) &&
            0 === Jsonarch.objectKeys(isMember).filter(function (key) { var _a; return !(((_a = isMember[key]) === null || _a === void 0 ? void 0 : _a.call(isMember, value[key])) || true); }).length;
    };
    Jsonarch.isArray = function (value, isType) {
        return Array.isArray(value) && 0 === value.filter(function (i) { return !isType(i); }).length;
    };
    Jsonarch.getLazyValue = function (lazy) {
        return "function" === typeof lazy ?
            lazy() :
            lazy;
    };
    Jsonarch.getTemporaryDummy = Locale.getSystemLocale();
    Jsonarch.packageJson = require("../package.json");
    Jsonarch.name = Jsonarch.packageJson.name;
    Jsonarch.version = Jsonarch.packageJson.version;
    Jsonarch.templateSchema = "https://raw.githubusercontent.com/wraith13/jsonarch/master/json-schema/template-json-schema.json#";
    Jsonarch.settingSchema = "https://raw.githubusercontent.com/wraith13/jsonarch/master/json-schema/setting-json-schema.json#";
    Jsonarch.isJsonarch = function (type) {
        return (function (template) {
            return Jsonarch.isAlphaJsonarch(template) && type === template.$arch;
        });
    };
    Jsonarch.isAlphaJsonarch = function (template) {
        return null !== template &&
            "object" === typeof template &&
            "$arch" in template &&
            "string" === typeof template.$arch;
    };
    Jsonarch.isSystemFileContext = function (file) { return "system" === file.category; };
    Jsonarch.isNoneFileContext = function (file) { return "none" === file.category; };
    Jsonarch.isNetFileContext = function (file) { return "net" === file.category; };
    Jsonarch.isLocalFileContext = function (file) { return "local" === file.category; };
    Jsonarch.makeFullPath = function (contextOrEntry, path) {
        var context = Jsonarch.getContext(contextOrEntry);
        if (/^\.\.?\//.test(path)) {
            if (Jsonarch.isSystemFileContext(context.template)) {
                throw new Error("makeFullPath({ templte:{ category: system }, },...)");
            }
            else if (Jsonarch.isNoneFileContext(context.template)) {
                throw new Error("makeFullPath({ templte:{ category: none }, },...)");
            }
            else {
                var parent_1 = context.template.path
                    .replace(/#.*/, "")
                    .replace(/\/[^/]*$/, "");
                var current = path.replace(/^\.\//, "").replace(/\/\.\//, "/");
                while (/^\.\.\//.test(current)) {
                    var newParent = parent_1.replace(/\/[^/]*$/, "");
                    if (parent_1 === newParent) {
                        break;
                    }
                    parent_1 = newParent;
                    current = current.replace(/^\.\.\//, "");
                }
                return "".concat(parent_1, "/").concat(current);
            }
        }
        else if (!System.isConsoleMode && /^\//.test(path)) {
            if (Jsonarch.isSystemFileContext(context.template)) {
                throw new Error("makeFullPath({ templte:{ category: system }, },...)");
            }
            else if (Jsonarch.isNoneFileContext(context.template)) {
                throw new Error("makeFullPath({ templte:{ category: none }, },...)");
            }
            else {
                return context.template.path.replace(/^(https?\:\/\/[^/]+\/).*$/, "$1") + path;
            }
        }
        else {
            return path;
        }
    };
    Jsonarch.getSystemFileContext = function (id) { return ({ category: "system", id: id, }); };
    Jsonarch.jsonToFileContext = function (data, hash) {
        return ({ category: "none", data: data, hash: hash, });
    };
    Jsonarch.pathToFileContext = function (contextOrEntry, path) {
        return (!System.isConsoleMode) || /^https?\:\/\//.test(path) ?
            { category: "net", path: Jsonarch.makeFullPath(contextOrEntry, path), } :
            { category: "local", path: Jsonarch.makeFullPath(contextOrEntry, path) };
    };
    Jsonarch.getHashFromPath = function (path) {
        var index = path.indexOf("#");
        if (0 < index) {
            return path.substring(index + 1);
        }
        else {
            return undefined;
        }
    };
    Jsonarch.commandLineArgumentToFileContext = function (argument) {
        return /^system\:/.test(argument) ? { category: "system", id: argument.replace(/^system\:/, ""), hash: Jsonarch.getHashFromPath(argument), } :
            /^https?\:\/\//.test(argument) ? { category: "net", path: argument, hash: Jsonarch.getHashFromPath(argument), } :
                { category: "local", path: argument, hash: Jsonarch.getHashFromPath(argument), };
    };
    Jsonarch.getContext = function (contextOrEntry) {
        return "context" in contextOrEntry ? contextOrEntry.context : contextOrEntry;
    };
    Jsonarch.isCache = Jsonarch.isJsonarch("cache");
    Jsonarch.isSetting = Jsonarch.isJsonarch("setting");
    Jsonarch.isSystemFileLoadEntry = function (entry) { return Jsonarch.isSystemFileContext(entry.file); };
    Jsonarch.isNoneFileLoadEntry = function (entry) { return Jsonarch.isNoneFileContext(entry.file); };
    Jsonarch.isNetFileLoadEntry = function (entry) { return Jsonarch.isNetFileContext(entry.file); };
    Jsonarch.isLocalFileLoadEntry = function (entry) { return Jsonarch.isLocalFileContext(entry.file); };
    var isPureDataType = function (template) {
        return 0 <= ["setting", "cache",].indexOf(template.$arch);
    };
    Jsonarch.isEvaluateTargetEntry = function (entry) {
        return Jsonarch.isAlphaJsonarch(entry.template) && !isPureDataType(entry.template);
    };
    Jsonarch.isResult = Jsonarch.isJsonarch("result");
    Jsonarch.isError = Jsonarch.isJsonarch("error");
    Jsonarch.getTicks = function () { return new Date().getTime(); };
    var beginProfileScope = function (context, name) {
        var _a, _b;
        var result = {
            name: name,
            startTicks: 0,
            childrenTicks: 0,
        };
        if ((_a = context.profile) === null || _a === void 0 ? void 0 : _a.isProfiling) {
            result.startTicks = Jsonarch.getTicks();
            (_b = context.profile) === null || _b === void 0 ? void 0 : _b.stack.push(result);
        }
        return result;
    };
    var endProfileScope = function (context, entry) {
        var _a, _b;
        var profileScore = (_a = context.profile) === null || _a === void 0 ? void 0 : _a.score;
        var entryStack = (_b = context.profile) === null || _b === void 0 ? void 0 : _b.stack;
        if (0 !== entry.startTicks && profileScore && entryStack) {
            var wholeTicks = Jsonarch.getTicks() - entry.startTicks;
            if (undefined === profileScore[entry.name]) {
                profileScore[entry.name] = 0;
            }
            profileScore[entry.name] += wholeTicks - entry.childrenTicks;
            entryStack.pop();
            if (0 < entryStack.length) {
                entryStack[entryStack.length - 1].childrenTicks += wholeTicks;
            }
        }
    };
    Jsonarch.profile = function (contextOrEntry, name, target) { return __awaiter(_this, void 0, void 0, function () {
        var context, entry;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    context = Jsonarch.getContext(contextOrEntry);
                    entry = beginProfileScope(context, name);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, , 3, 4]);
                    return [4 /*yield*/, target()];
                case 2: return [2 /*return*/, _a.sent()];
                case 3:
                    endProfileScope(context, entry);
                    return [7 /*endfinally*/];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    Jsonarch.ErrorJson = function (json) {
        return new Error("json:".concat(Jsonarch.jsonStringify(json)));
    };
    Jsonarch.parseErrorJson = function (error) {
        if (error.message.startsWith("json:")) {
            return Jsonarch.jsonParse(error.message.replace(/^json\:/, ""));
        }
        else {
            var result = __assign({ "$arch": "error" }, error);
            return result;
        }
    };
    Jsonarch.loadSystemJson = function (entry) { return Jsonarch.profile(entry, "loadSystemJson", function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (entry.file.id) {
                case "boot-setting.json":
                    return [2 /*return*/, boot_setting_json_1.default];
                case "default-setting.json":
                    return [2 /*return*/, setting_json_1.default];
            }
            throw new Error("never");
        });
    }); }); };
    Jsonarch.loadNetFile = function (entry) {
        return Jsonarch.profile(entry, "loadNetFile", function () { return System.loadNetFile(entry.file.path); });
    };
    Jsonarch.loadLocalFile = function (entry) {
        return Jsonarch.profile(entry, "loadLocalFile", function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
            return [2 /*return*/, System.loadLocalFile(entry.file.path)];
        }); }); });
    };
    Jsonarch.loadFile = function (entry) { return Jsonarch.profile(entry, "loadFile", function () { return __awaiter(_this, void 0, void 0, function () {
        var loardHandler;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    loardHandler = entry.handler.load;
                    if (!loardHandler) return [3 /*break*/, 2];
                    return [4 /*yield*/, Jsonarch.profile(entry, "handler.load", function () { return loardHandler(entry); })];
                case 1: return [2 /*return*/, _a.sent()];
                case 2:
                    if (!Jsonarch.isNetFileLoadEntry(entry)) return [3 /*break*/, 4];
                    return [4 /*yield*/, Jsonarch.loadNetFile(entry)];
                case 3: return [2 /*return*/, _a.sent()];
                case 4:
                    if (!Jsonarch.isLocalFileLoadEntry(entry)) return [3 /*break*/, 6];
                    return [4 /*yield*/, Jsonarch.loadLocalFile(entry)];
                case 5: return [2 /*return*/, _a.sent()];
                case 6: throw new Error("never");
            }
        });
    }); }); };
    Jsonarch.load = function (entry) { return Jsonarch.profile(entry, "load", function () { return __awaiter(_this, void 0, void 0, function () {
        var cache, result, _a;
        var _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    if (!Jsonarch.isSystemFileLoadEntry(entry)) return [3 /*break*/, 2];
                    return [4 /*yield*/, Jsonarch.loadSystemJson(entry)];
                case 1: return [2 /*return*/, _d.sent()];
                case 2:
                    if (!Jsonarch.isNoneFileLoadEntry(entry)) return [3 /*break*/, 3];
                    return [2 /*return*/, entry.file.data];
                case 3:
                    if (!(Jsonarch.isNetFileLoadEntry(entry) || Jsonarch.isLocalFileLoadEntry(entry))) return [3 /*break*/, 5];
                    cache = (_c = (_b = entry.cache) === null || _b === void 0 ? void 0 : _b.json) === null || _c === void 0 ? void 0 : _c[entry.file.path];
                    if (undefined !== cache) {
                        return [2 /*return*/, cache];
                    }
                    _a = Jsonarch.jsonParse;
                    return [4 /*yield*/, Jsonarch.loadFile(entry)];
                case 4:
                    result = _a.apply(void 0, [_d.sent()]);
                    if (!entry.cache) {
                        entry.cache = { $arch: "cache", };
                    }
                    if (!entry.cache.json) {
                        entry.cache.json = {};
                    }
                    entry.cache.json[entry.file.path] = result;
                    return [2 /*return*/, result];
                case 5: throw new Error("never");
            }
        });
    }); }); };
    Jsonarch.isStaticData = Jsonarch.isJsonarch("static");
    Jsonarch.evaluateStatic = function (entry) {
        return Jsonarch.profile(entry, "evaluateStatic", function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
            return [2 /*return*/, entry.template.return];
        }); }); });
    };
    Jsonarch.isIncludeStaticJsonData = Jsonarch.isJsonarch("include-static-json");
    Jsonarch.evaluateIncludeStaticJson = function (entry) { return Jsonarch.profile(entry, "evaluateIncludeStaticJson", function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, Jsonarch.loadFile(__assign(__assign({}, entry), { file: Jsonarch.pathToFileContext(entry, entry.template.path) }))];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    }); }); };
    Jsonarch.isTemplateData = Jsonarch.isJsonarch("template");
    Jsonarch.applyDefault = function (defaults, parameter) {
        if (undefined === defaults) {
            return parameter;
        }
        else if (undefined === parameter || "object" !== typeof defaults || "object" !== typeof parameter) {
            return defaults;
        }
        else {
            return __assign(__assign({}, defaults), parameter);
        }
    };
    Jsonarch.evaluateTemplate = function (entry) { return Jsonarch.profile(entry, "evaluateTemplate", function () { return __awaiter(_this, void 0, void 0, function () {
        var parameter;
        var _a;
        return __generator(this, function (_b) {
            parameter = Jsonarch.applyDefault(Jsonarch.applyDefault(entry.template.default, entry.parameter), (_a = entry.template.override) === null || _a === void 0 ? void 0 : _a.setting);
            if (entry.template.catch) {
                try {
                    return [2 /*return*/, Jsonarch.apply(__assign(__assign({}, entry), { template: entry.template.return, parameter: parameter }))];
                }
                catch (error) {
                    //  🚧 call match(entry.template.catch, error)
                    throw error;
                }
            }
            else {
                return [2 /*return*/, Jsonarch.apply(__assign(__assign({}, entry), { template: entry.template.return, parameter: parameter }))];
            }
            return [2 /*return*/];
        });
    }); }); };
    Jsonarch.isAlphaTypeData = function (type) {
        return (function (template) {
            return Jsonarch.isTypeData(template) && type === template.type;
        });
    };
    Jsonarch.isTypeReferData = Jsonarch.isAlphaTypeData("refer");
    Jsonarch.isNullValueTypeData = Jsonarch.isAlphaTypeData("null");
    Jsonarch.isBooleanValueTypeData = Jsonarch.isAlphaTypeData("boolean");
    Jsonarch.isStringValueTypeData = Jsonarch.isAlphaTypeData("string");
    Jsonarch.isNumberValueTypeData = Jsonarch.isAlphaTypeData("number");
    Jsonarch.isValueTypeData = function (template) {
        return Jsonarch.isNullValueTypeData(template) ||
            Jsonarch.isBooleanValueTypeData(template) ||
            Jsonarch.isNumberValueTypeData(template) ||
            Jsonarch.isStringValueTypeData(template);
    };
    Jsonarch.isArrayTypeData = Jsonarch.isAlphaTypeData("array");
    Jsonarch.isTupleTypeData = Jsonarch.isAlphaTypeData("tuple");
    Jsonarch.isObjectTypeData = Jsonarch.isAlphaTypeData("object");
    Jsonarch.isStructureTypeData = function (template) {
        return Jsonarch.isArrayTypeData(template) ||
            Jsonarch.isTupleTypeData(template) ||
            Jsonarch.isObjectTypeData(template);
    };
    Jsonarch.isOrCompositeTypeData = Jsonarch.isAlphaTypeData("or");
    Jsonarch.isAndCompositeTypeData = Jsonarch.isAlphaTypeData("and");
    Jsonarch.isCompositeTypeData = function (template) {
        return Jsonarch.isOrCompositeTypeData(template) ||
            Jsonarch.isAndCompositeTypeData(template);
    };
    Jsonarch.isTemplateTypeData = Jsonarch.isAlphaTypeData("template");
    Jsonarch.isMetaTypeData = Jsonarch.isAlphaTypeData("meta");
    Jsonarch.isTypeData = Jsonarch.isJsonarch("type");
    Jsonarch.isCallData = Jsonarch.isJsonarch("call");
    Jsonarch.isValueData = Jsonarch.isJsonarch("value");
    var Library;
    (function (Library) {
        var String;
        (function (String) {
            String.json = function (parameter) {
                if (Jsonarch.isArray(parameter, Jsonarch.isString)) {
                    return parameter.join("");
                }
                else {
                    throw new Jsonarch.ErrorJson({
                        "$arch": "error",
                        "message": "Unmatch parameter type",
                        "refer": "string.join",
                        "parameter": parameter,
                    });
                }
            };
        })(String = Library.String || (Library.String = {}));
    })(Library = Jsonarch.Library || (Jsonarch.Library = {}));
    Jsonarch.regulateType = function (compositeType) {
        return compositeType;
    };
    Jsonarch.isBaseOrEqual = function (result) { return "base" === result || "equal" === result; };
    Jsonarch.isEqualOrExtented = function (result) { return "equal" === result || "extended" === result; };
    Jsonarch.reverseCompareTypeResult = function (result) {
        switch (result) {
            case "base":
                return "extended";
            case "extended":
                return "base";
            default:
                return result;
        }
    };
    Jsonarch.compositeCompareTypeResult = function (list) {
        var result = "equal";
        for (var i in list) {
            switch (Jsonarch.getLazyValue(list[i])) {
                case undefined:
                    break;
                case "equal":
                    break;
                case "base":
                    switch (result) {
                        case "equal":
                            result = "base";
                            break;
                        case "extended":
                            result = "unmatch";
                            break;
                    }
                    break;
                case "extended":
                    switch (result) {
                        case "base":
                            result = "unmatch";
                            break;
                        case "equal":
                            result = "extended";
                            break;
                    }
                    break;
                case "unmatch":
                    result = "unmatch";
                    break;
            }
            if ("unmatch" === result) {
                break;
            }
        }
        return result;
    };
    Jsonarch.compareTypeOptional = function (a, b) {
        var _a, _b, _c;
        if ((_b = (_a = a.optional) !== null && _a !== void 0 ? _a : false === b.optional) !== null && _b !== void 0 ? _b : false) {
            return "equal";
        }
        else if ((_c = a.optional) !== null && _c !== void 0 ? _c : false) {
            return "base";
        }
        else {
            return "extended";
        }
    };
    Jsonarch.compareTypeEnum = function (a, b) {
        var aEnum = a.enum;
        var bEnum = b.enum;
        if (undefined === aEnum && undefined === bEnum) {
            return "equal";
        }
        else if (undefined === aEnum) {
            return "base";
        }
        else if (undefined === bEnum) {
            return "extended";
        }
        else {
            var aHasUnmatch = aEnum.some(function (i) { return bEnum.indexOf(i) < 0; });
            var bHasUnmatch = bEnum.some(function (i) { return aEnum.indexOf(i) < 0; });
            if ((!aHasUnmatch) && (!bHasUnmatch)) {
                return "equal";
            }
            else if (!aHasUnmatch) {
                return "extended";
            }
            else if (!bHasUnmatch) {
                return "base";
            }
            else {
                return "unmatch";
            }
        }
    };
    Jsonarch.compareTypeMinValue = function (a, b) {
        if (a.minValue === b.minValue) {
            return "equal";
        }
        else if (undefined === a.minValue) {
            return "base";
        }
        else if (undefined === b.minValue) {
            return "extended";
        }
        else if (a.minValue < b.minValue) {
            return "base";
        }
        else {
            return "extended";
        }
    };
    Jsonarch.compareTypeMaxValue = function (a, b) {
        if (a.maxValue === b.maxValue) {
            return "equal";
        }
        else if (undefined === a.maxValue) {
            return "base";
        }
        else if (undefined === b.maxValue) {
            return "extended";
        }
        else if (a.maxValue < b.maxValue) {
            return "extended";
        }
        else {
            return "base";
        }
    };
    Jsonarch.compareTypeMinMaxValue = function (a, b) { return Jsonarch.compositeCompareTypeResult([
        Jsonarch.compareTypeMinValue(a, b),
        Jsonarch.compareTypeMaxValue(a, b)
    ]); };
    Jsonarch.compareTypeFormat = function (a, b) {
        if (a.format === b.format) {
            return "equal";
        }
        else if (undefined === a.format) {
            return "base";
        }
        else if (undefined === b.format) {
            return "extended";
        }
        else {
            //  細かい比較検証は行わず unmatch と見做す。
            return "unmatch";
        }
    };
    Jsonarch.compareTypeMinLength = function (a, b) {
        if (a.minLength === b.minLength) {
            return "equal";
        }
        else if (undefined === a.minLength) {
            return "base";
        }
        else if (undefined === b.minLength) {
            return "extended";
        }
        else if (a.minLength < b.minLength) {
            return "base";
        }
        else {
            return "extended";
        }
    };
    Jsonarch.compareTypeMaxLength = function (a, b) {
        if (a.maxLength === b.maxLength) {
            return "equal";
        }
        else if (undefined === a.maxLength) {
            return "base";
        }
        else if (undefined === b.maxLength) {
            return "extended";
        }
        else if (a.maxLength < b.maxLength) {
            return "extended";
        }
        else {
            return "base";
        }
    };
    Jsonarch.compareTypeMinMaxLength = function (a, b) { return Jsonarch.compositeCompareTypeResult([
        Jsonarch.compareTypeMinLength(a, b),
        Jsonarch.compareTypeMaxLength(a, b),
    ]); };
    Jsonarch.compareTypeList = function (a, b) {
        var commonLength = Math.min(a.length, b.length);
        return Jsonarch.compositeCompareTypeResult(__spreadArray(__spreadArray([], a
            .filter(function (_i, ix) { return ix < commonLength; })
            .map(function (_i, ix) { return (function () { return Jsonarch.compareType(a[ix], b[ix]); }); }), true), [
            commonLength < a.length ? "extended" : undefined,
            commonLength < b.length ? "base" : undefined,
        ], false));
    };
    Jsonarch.compareTypeObjectMember = function (a, b) {
        var aMemberList = Jsonarch.objectKeys(a.member);
        var bMemberList = Jsonarch.objectKeys(b.member);
        var commonMemberList = aMemberList.filter(function (a) { return bMemberList.some(function (b) { return a === b; }); });
        var aOnlyMemberList = aMemberList.filter(function (a) { return !commonMemberList.some(function (i) { return a === i; }); });
        var bOnlyMemberList = bMemberList.filter(function (b) { return !commonMemberList.some(function (i) { return b === i; }); });
        return Jsonarch.compositeCompareTypeResult(__spreadArray(__spreadArray([], commonMemberList.map(function (i) { return function () { return Jsonarch.compareType(a.member[i], b.member[i]); }; }), true), [
            function () {
                if (0 === aOnlyMemberList.length && 0 === bOnlyMemberList.length) {
                    return "equal";
                }
                else if (0 === aOnlyMemberList.length) {
                    return "base";
                }
                else if (0 === bOnlyMemberList.length) {
                    return "extended";
                }
                else {
                    return "unmatch";
                }
            }
        ], false));
    };
    Jsonarch.compareTypeOrComposite = function (a, b) {
        var resultList = a.list.map(function (i) { return Jsonarch.compareType(i, b); });
        if ((!resultList.some(function (i) { return "equal" !== i; })) && Jsonarch.isOrCompositeTypeData(b) && a.list.length === b.list.length) {
            return "equal";
        }
        if (resultList.some(function (i) { return Jsonarch.isBaseOrEqual(i); })) {
            return "base";
        }
        if ((!resultList.some(function (i) { return !Jsonarch.isEqualOrExtented(i); }))) {
            return "extended";
        }
        return "unmatch";
    };
    Jsonarch.compositeCompareType = function (comparer) {
        return function (a, b) {
            return Jsonarch.compositeCompareTypeResult(comparer.map(function (i) { return i(a, b); }));
        };
    };
    Jsonarch.compareNullValueType = Jsonarch.compositeCompareType([
        Jsonarch.compareTypeOptional,
    ]);
    Jsonarch.compareBoolanValueType = Jsonarch.compositeCompareType([
        Jsonarch.compareTypeOptional,
        Jsonarch.compareTypeEnum,
    ]);
    Jsonarch.compareNumberValueType = Jsonarch.compositeCompareType([
        Jsonarch.compareTypeOptional,
        Jsonarch.compareTypeEnum,
        Jsonarch.compareTypeMinMaxValue,
    ]);
    Jsonarch.compareStringValueType = Jsonarch.compositeCompareType([
        Jsonarch.compareTypeOptional,
        Jsonarch.compareTypeEnum,
        Jsonarch.compareTypeFormat,
    ]);
    Jsonarch.compareArrayType = Jsonarch.compositeCompareType([
        Jsonarch.compareTypeOptional,
        Jsonarch.compareTypeMinMaxLength,
        function (a, b) { return Jsonarch.compareType(a.itemType, b.itemType); },
    ]);
    Jsonarch.compareTupleType = Jsonarch.compositeCompareType([
        Jsonarch.compareTypeOptional,
        function (a, b) { return Jsonarch.compareTypeList(a.list, b.list); },
    ]);
    Jsonarch.compareObjectType = Jsonarch.compositeCompareType([
        Jsonarch.compareTypeOptional,
        Jsonarch.compareTypeObjectMember,
    ]);
    Jsonarch.compareTemplateType = Jsonarch.compositeCompareType([
        Jsonarch.compareTypeOptional,
        function (a, b) { return Jsonarch.compositeCompareTypeResult([
            function () { return Jsonarch.compareType(a.parameter, b.parameter); },
            function () { return Jsonarch.compareType(a.return, b.return); },
        ]); },
    ]);
    Jsonarch.compareMetaType = Jsonarch.compositeCompareType([
        Jsonarch.compareTypeOptional,
        function (a, b) { return Jsonarch.compositeCompareTypeResult([
            function () { return Jsonarch.compareType(a.parameter, b.parameter); },
            function () { return Jsonarch.compareType(a.return, b.return); },
        ]); },
    ]);
    Jsonarch.compareIfMatch = function (isMatch, compareTarget) {
        return function (a, b) {
            return isMatch(a) && isMatch(b) ? compareTarget(a, b) : undefined;
        };
    };
    var compareTypeEntryList = [
        Jsonarch.compareIfMatch(Jsonarch.isNullValueTypeData, Jsonarch.compareNullValueType),
        Jsonarch.compareIfMatch(Jsonarch.isBooleanValueTypeData, Jsonarch.compareBoolanValueType),
        Jsonarch.compareIfMatch(Jsonarch.isNumberValueTypeData, Jsonarch.compareNumberValueType),
        Jsonarch.compareIfMatch(Jsonarch.isStringValueTypeData, Jsonarch.compareStringValueType),
        Jsonarch.compareIfMatch(Jsonarch.isArrayTypeData, Jsonarch.compareArrayType),
        Jsonarch.compareIfMatch(Jsonarch.isTupleTypeData, Jsonarch.compareTupleType),
        Jsonarch.compareIfMatch(Jsonarch.isObjectTypeData, Jsonarch.compareObjectType),
        Jsonarch.compareIfMatch(Jsonarch.isTemplateTypeData, Jsonarch.compareTemplateType),
        Jsonarch.compareIfMatch(Jsonarch.isMetaTypeData, Jsonarch.compareMetaType),
    ];
    Jsonarch.compareType = function (a, b) {
        if (a.type === b.type) {
            return Jsonarch.compositeCompareTypeResult(compareTypeEntryList.map(function (i) { return i(a, b); }));
        }
        else if (Jsonarch.isOrCompositeTypeData(a)) {
            return Jsonarch.compareTypeOrComposite(a, b);
        }
        else if (Jsonarch.isOrCompositeTypeData(b)) {
            return Jsonarch.reverseCompareTypeResult(Jsonarch.compareTypeOrComposite(b, a));
        }
        else {
            return "unmatch";
        }
    };
    Jsonarch.isCompatibleType = function (source, destination) {
        return Jsonarch.isEqualOrExtented(Jsonarch.compareType(source, destination));
    };
    Jsonarch.turnRefer = function (root, refer) {
        var rest = refer.map(function (i) { return i; });
        var current = root;
        while (true) {
            if (rest.length <= 0) {
                return current;
            }
            if (undefined === current || null === current || "object" !== typeof current) {
                return undefined;
            }
            var key = rest.shift();
            if ("number" === typeof key && Array.isArray(current)) {
                current = current[key];
            }
            else if ("string" === typeof key && !Array.isArray(current) && key in current) {
                current = current[key];
            }
            else {
                throw new Jsonarch.ErrorJson({
                    "$arch": "error",
                    "message": "Unmatch refer path",
                });
            }
        }
    };
    Jsonarch.resolveRefer = function (entry) {
        return Jsonarch.turnRefer({
            template: entry.cache.template,
            type: entry.cache.type,
            value: entry.cache.value,
            parameter: entry.parameter,
        }, entry.template.refer);
    };
    Jsonarch.evaluateCall = function (entry) { return Jsonarch.profile(entry, "evaluateCall", function () { return __awaiter(_this, void 0, void 0, function () {
        var parameter, _a, target;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    if (!(undefined === entry.template.parameter)) return [3 /*break*/, 1];
                    _a = undefined;
                    return [3 /*break*/, 3];
                case 1: return [4 /*yield*/, Jsonarch.apply(__assign(__assign({}, entry), { template: entry.template.parameter }))];
                case 2:
                    _a = _b.sent();
                    _b.label = 3;
                case 3:
                    parameter = _a;
                    target = Jsonarch.turnRefer({
                        string: {
                            join: Library.String.json,
                        },
                        template: entry.cache.template,
                    }, entry.template.refer);
                    if (!("function" === typeof target)) return [3 /*break*/, 4];
                    return [2 /*return*/, target(parameter)];
                case 4:
                    if (!Jsonarch.isTemplateData(target)) return [3 /*break*/, 6];
                    return [4 /*yield*/, Jsonarch.evaluateTemplate(__assign(__assign({}, entry), { template: target }))];
                case 5: return [2 /*return*/, _b.sent()];
                case 6: throw new Jsonarch.ErrorJson({
                    "$arch": "error",
                    "message": "Unknown refer call",
                    "refer": entry.template.refer,
                });
            }
        });
    }); }); };
    Jsonarch.evaluateValue = function (entry) { return Jsonarch.profile(entry, "evaluateValue", function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            //entry.template.refer;
            return [2 /*return*/, entry.parameter.name];
        });
    }); }); };
    Jsonarch.evaluateIfMatch = function (isMatch, evaluateTarget) {
        return function (entry) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
            return [2 /*return*/, isMatch(entry.template) ? evaluateTarget(entry) : undefined];
        }); }); };
    };
    var evaluatorList = [
        Jsonarch.evaluateIfMatch(Jsonarch.isStaticData, Jsonarch.evaluateStatic),
        Jsonarch.evaluateIfMatch(Jsonarch.isIncludeStaticJsonData, Jsonarch.evaluateIncludeStaticJson),
        Jsonarch.evaluateIfMatch(Jsonarch.isTemplateData, Jsonarch.evaluateTemplate),
        Jsonarch.evaluateIfMatch(Jsonarch.isCallData, Jsonarch.evaluateCall),
        Jsonarch.evaluateIfMatch(Jsonarch.isValueData, Jsonarch.evaluateValue),
    ];
    Jsonarch.evaluate = function (entry) { return Jsonarch.profile(entry, "evaluate", function () { return __awaiter(_this, void 0, void 0, function () {
        var _a, _b, _c, i, result;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    _a = [];
                    for (_b in evaluatorList)
                        _a.push(_b);
                    _c = 0;
                    _d.label = 1;
                case 1:
                    if (!(_c < _a.length)) return [3 /*break*/, 4];
                    i = _a[_c];
                    return [4 /*yield*/, evaluatorList[i](entry)];
                case 2:
                    result = _d.sent();
                    if (undefined !== result) {
                        return [2 /*return*/, result];
                    }
                    _d.label = 3;
                case 3:
                    _c++;
                    return [3 /*break*/, 1];
                case 4: throw new Jsonarch.ErrorJson({
                    "$arch": "error",
                    "message": "Unknown Jsonarch Type",
                    "template": entry.template,
                });
            }
        });
    }); }); };
    Jsonarch.apply = function (entry) { return Jsonarch.profile(entry, "apply", function () { return __awaiter(_this, void 0, void 0, function () {
        var result_1, template_1;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!(null === entry.template || "object" !== typeof entry.template)) return [3 /*break*/, 1];
                    return [2 /*return*/, entry.template];
                case 1:
                    if (!Jsonarch.isEvaluateTargetEntry(entry)) return [3 /*break*/, 3];
                    return [4 /*yield*/, Jsonarch.evaluate(entry)];
                case 2: return [2 /*return*/, _a.sent()];
                case 3:
                    if (!Array.isArray(entry.template)) return [3 /*break*/, 5];
                    return [4 /*yield*/, Promise.all(entry.template.map(function (i) { return Jsonarch.apply(__assign(__assign({}, entry), {
                            template: i,
                        })); }))];
                case 4: return [2 /*return*/, _a.sent()];
                case 5:
                    result_1 = {};
                    template_1 = entry.template;
                    return [4 /*yield*/, Promise.all(Jsonarch.objectKeys(template_1).map(function (key) { return __awaiter(_this, void 0, void 0, function () {
                            var _a, _b;
                            return __generator(this, function (_c) {
                                switch (_c.label) {
                                    case 0:
                                        _a = result_1;
                                        _b = key;
                                        return [4 /*yield*/, Jsonarch.apply(__assign(__assign({}, entry), {
                                                template: template_1[key],
                                            }))];
                                    case 1: return [2 /*return*/, _a[_b] = _c.sent()];
                                }
                            });
                        }); }))];
                case 6:
                    _a.sent();
                    return [2 /*return*/, result_1];
            }
        });
    }); }); };
    Jsonarch.applyRoot = function (entry, template, parameter, cache, setting) { return Jsonarch.profile(entry, "applyRoot", function () { return __awaiter(_this, void 0, void 0, function () {
        var handler, context, rootEvaluateEntry, output, result, error_1, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    handler = entry.handler;
                    context = {
                        template: entry.template,
                        paremter: entry.parameter,
                        cache: entry.cache,
                        setting: entry.setting,
                    };
                    rootEvaluateEntry = {
                        context: context,
                        template: template,
                        parameter: parameter,
                        cache: cache,
                        setting: setting,
                        handler: handler,
                    };
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, Jsonarch.apply(rootEvaluateEntry)];
                case 2:
                    output = _a.sent();
                    result = {
                        $arch: "result",
                        output: output,
                        cache: cache,
                        setting: setting,
                    };
                    return [2 /*return*/, result];
                case 3:
                    error_1 = _a.sent();
                    result = {
                        $arch: "result",
                        output: Jsonarch.parseErrorJson(error_1),
                        cache: cache,
                        setting: setting,
                    };
                    return [2 /*return*/, result];
                case 4: return [2 /*return*/];
            }
        });
    }); }); };
    Jsonarch.process = function (entry) { return __awaiter(_this, void 0, void 0, function () {
        var handler, emptyCache, cache, _a, settingFileContext, settingResult, _b, _c, setting, parameterResult, _d, _e, _f, parameter, template;
        var _g, _h, _j;
        return __generator(this, function (_k) {
            switch (_k.label) {
                case 0:
                    handler = entry.handler;
                    emptyCache = { "$arch": "cache" };
                    if (!entry.cache) return [3 /*break*/, 2];
                    return [4 /*yield*/, Jsonarch.load({ context: entry, cache: emptyCache, setting: boot_setting_json_1.default, handler: handler, file: entry.cache })];
                case 1:
                    _a = _k.sent();
                    return [3 /*break*/, 3];
                case 2:
                    _a = emptyCache;
                    _k.label = 3;
                case 3:
                    cache = _a;
                    settingFileContext = (_g = entry.setting) !== null && _g !== void 0 ? _g : Jsonarch.getSystemFileContext("default-setting.json");
                    _b = Jsonarch.applyRoot;
                    _c = [{
                            handler: handler,
                            template: settingFileContext,
                            cache: entry.cache,
                            setting: Jsonarch.getSystemFileContext("boot-setting.json"),
                        }];
                    return [4 /*yield*/, Jsonarch.load({ context: entry, cache: cache, setting: boot_setting_json_1.default, handler: handler, file: settingFileContext })];
                case 4: return [4 /*yield*/, _b.apply(void 0, _c.concat([_k.sent(), null,
                        cache,
                        boot_setting_json_1.default]))];
                case 5:
                    settingResult = _k.sent();
                    setting = (_h = settingResult === null || settingResult === void 0 ? void 0 : settingResult.output) !== null && _h !== void 0 ? _h : { "$arch": "setting", };
                    if (!entry.parameter) return [3 /*break*/, 8];
                    _e = Jsonarch.applyRoot;
                    _f = [{
                            handler: handler,
                            template: entry.parameter,
                            cache: entry.cache,
                            setting: settingFileContext,
                        }];
                    return [4 /*yield*/, Jsonarch.load({ context: entry, cache: cache, setting: setting, handler: handler, file: entry.parameter })];
                case 6: return [4 /*yield*/, _e.apply(void 0, _f.concat([_k.sent(), null,
                        cache,
                        setting]))];
                case 7:
                    _d = _k.sent();
                    return [3 /*break*/, 9];
                case 8:
                    _d = undefined;
                    _k.label = 9;
                case 9:
                    parameterResult = _d;
                    parameter = (_j = parameterResult === null || parameterResult === void 0 ? void 0 : parameterResult.output) !== null && _j !== void 0 ? _j : null;
                    return [4 /*yield*/, Jsonarch.load({ context: entry, cache: cache, setting: setting, handler: handler, file: entry.template })];
                case 10:
                    template = _k.sent();
                    return [2 /*return*/, Jsonarch.applyRoot(entry, template, parameter, cache, setting)];
            }
        });
    }); };
    Jsonarch.multiplyString = function (text, count) {
        return count < 1 ? "" : (Jsonarch.multiplyString(text + text, Math.floor(count / 2)) + (0 === count % 2 ? "" : text));
    };
    Jsonarch.smartJsonStringify = function (json, indent, base) {
        if (indent === void 0) { indent = 4; }
        if (base === void 0) { base = 0; }
        var result = "";
        var baseIndent = "tab" === indent ?
            Jsonarch.multiplyString("\t", base) :
            Jsonarch.multiplyString(" ", indent * base);
        var nextIndent = "tab" === indent ?
            Jsonarch.multiplyString("\t", base + 1) :
            Jsonarch.multiplyString(" ", indent * (base + 1));
        if (Jsonarch.isObject(json)) {
            if (Jsonarch.objectValues(json).some(function (i) { return Jsonarch.isObject(i) || Array.isArray(i); })) {
                result += baseIndent + "{\n";
                var isFirst_1 = true;
                Jsonarch.objectKeys(json).forEach(function (key) {
                    var value = json[key];
                    if (undefined !== value) {
                        if (isFirst_1) {
                            isFirst_1 = false;
                        }
                        else {
                            result += ",\n";
                        }
                        var valueJson = Jsonarch.smartJsonStringify(value, indent, base + 1);
                        if (0 <= valueJson.indexOf("\n")) {
                            result += nextIndent + Jsonarch.jsonStringify(key) + ":\n";
                            result += valueJson;
                        }
                        else {
                            result += nextIndent + Jsonarch.jsonStringify(key) + ": " + valueJson;
                        }
                    }
                });
                result += "\n" + baseIndent + "}";
            }
            else {
                result += "{";
                var isFirst_2 = true;
                Jsonarch.objectKeys(json).forEach(function (key) {
                    var value = json[key];
                    if (undefined !== value) {
                        if (isFirst_2) {
                            isFirst_2 = false;
                        }
                        else {
                            result += ",";
                        }
                        result += " " + Jsonarch.jsonStringify(key) + ": " + Jsonarch.jsonStringify(value);
                    }
                });
                result += " }";
            }
        }
        else if (Array.isArray(json)) {
            if (json.some(function (i) { return Jsonarch.isObject(i) || Array.isArray(i); })) {
                result += baseIndent + "[\n";
                var isFirst_3 = true;
                json.forEach(function (value) {
                    if (isFirst_3) {
                        isFirst_3 = false;
                    }
                    else {
                        result += ",\n";
                    }
                    var valueJson = Jsonarch.smartJsonStringify(value, indent, base + 1);
                    if (0 <= valueJson.indexOf("\n")) {
                        result += valueJson;
                    }
                    else {
                        result += nextIndent + valueJson;
                    }
                });
                result += "\n" + baseIndent + "]";
            }
            else {
                result += "[";
                var isFirst_4 = true;
                json.forEach(function (value) {
                    if (isFirst_4) {
                        isFirst_4 = false;
                    }
                    else {
                        result += ",";
                    }
                    result += " " + Jsonarch.jsonStringify(value);
                });
                result += " ]";
            }
        }
        else {
            result += Jsonarch.jsonStringify(json);
        }
        if (base <= 0) {
            result += "\n";
        }
        return result;
    };
    Jsonarch.jsonToString = function (json, asType, setting) {
        var _a;
        var indent = (_a = setting.indent) !== null && _a !== void 0 ? _a : "smart";
        if ("output" === asType && setting.textOutput && "string" === typeof json) {
            return json;
        }
        else if ("output" === asType && setting.textOutput && Array.isArray(json) && 0 === json.filter(function (line) { return "string" !== typeof line; }).length) {
            return json.join("\n");
        }
        else if ("number" === typeof indent) {
            return Jsonarch.jsonStringify(json, undefined, indent);
        }
        else if ("tab" === indent) {
            return Jsonarch.jsonStringify(json, undefined, "\t");
        }
        else if ("smart" === indent) {
            return Jsonarch.smartJsonStringify(json, 4);
        }
        else {
            // "minify" === indent
            return Jsonarch.jsonStringify(json);
        }
    };
    Jsonarch.throwIfError = function (json) {
        if (Jsonarch.isError(json)) {
            throw new Jsonarch.ErrorJson(json);
        }
        return json;
    };
})(Jsonarch = exports.Jsonarch || (exports.Jsonarch = {}));
//# sourceMappingURL=index.js.map