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
var library_json_1 = __importDefault(require("./library.json"));
var Locale = __importStar(require("./locale"));
exports.Locale = __importStar(require("./locale"));
var Jsonarch;
(function (Jsonarch) {
    var _this = this;
    Jsonarch.jsonStringify = function (source, replacer, space) { return JSON.stringify(source, replacer, space); };
    Jsonarch.jsonParse = function (text, reviver) { return JSON.parse(text, reviver); };
    Jsonarch.isJsonableValue = function (value) {
        return null === value || 0 <= ["boolean", "number", "string"].indexOf(typeof value);
    };
    Jsonarch.isJsonableObject = function (value) {
        return null !== value &&
            "object" === typeof value &&
            !Array.isArray(value) &&
            !Jsonarch.objectValues(value).some(function (i) { return !Jsonarch.isJsonable(i); });
    };
    Jsonarch.isJsonableArray = function (value) {
        return Array.isArray(value) && !value.some(function (i) { return !Jsonarch.isJsonable(i); });
    };
    Jsonarch.isJsonable = function (value) {
        return Jsonarch.isJsonableValue(value) || Jsonarch.isJsonableArray(value) || Jsonarch.isJsonableObject(value);
    };
    Jsonarch.objectKeys = function (target) { return Object.keys(target); };
    Jsonarch.objectValues = function (target) { return Object.values(target); };
    Jsonarch.isJust = function (type) { return function (value) { return type === typeof value; }; };
    Jsonarch.isUndefined = Jsonarch.isJust(undefined);
    Jsonarch.isNull = Jsonarch.isJust(null);
    Jsonarch.isUndefinedOr = function (isType) { return isTypeOr(Jsonarch.isUndefined, isType); };
    Jsonarch.isNullOr = function (isType) { return isTypeOr(Jsonarch.isNull, isType); };
    Jsonarch.isUndefinedOrNullOr = function (isType) { return isTypeOr(Jsonarch.isUndefined, Jsonarch.isNull, isType); };
    Jsonarch.isBoolean = function (value) { return "boolean" === typeof value; };
    Jsonarch.isNumber = function (value) { return "number" === typeof value; };
    Jsonarch.isString = function (value) { return "string" === typeof value; };
    Jsonarch.isObject = function (isMember) {
        return function (value) {
            return null !== value &&
                "object" === typeof value &&
                !Array.isArray(value) &&
                !Jsonarch.objectKeys(isMember).some(function (key) { var _c; return !(((_c = isMember[key]) === null || _c === void 0 ? void 0 : _c.call(isMember, value[key])) || true); });
        };
    };
    Jsonarch.isArray = function (isType) {
        return function (value) { return Array.isArray(value) && 0 === value.filter(function (i) { return !isType(i); }).length; };
    };
    function isTuple() {
        var isTypeList = [];
        for (var _c = 0; _c < arguments.length; _c++) {
            isTypeList[_c] = arguments[_c];
        }
        return function (value) { return Array.isArray(value) && !isTypeList.some(function (i, ix) { return !i(value[ix]); }); };
    }
    Jsonarch.isTuple = isTuple;
    function isEnum(list) {
        return function (value) { return list.some(function (i) { return i === value; }); };
    }
    Jsonarch.isEnum = isEnum;
    function isTypeOr() {
        var isTypeList = [];
        for (var _c = 0; _c < arguments.length; _c++) {
            isTypeList[_c] = arguments[_c];
        }
        return function (value) { return isTypeList.some(function (i) { return i(value); }); };
    }
    Jsonarch.isTypeOr = isTypeOr;
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
        var _c, _d;
        var result = {
            name: name,
            startTicks: 0,
            childrenTicks: 0,
        };
        if ((_c = context.profile) === null || _c === void 0 ? void 0 : _c.isProfiling) {
            result.startTicks = Jsonarch.getTicks();
            (_d = context.profile) === null || _d === void 0 ? void 0 : _d.stack.push(result);
        }
        return result;
    };
    var endProfileScope = function (context, entry) {
        var _c, _d;
        var profileScore = (_c = context.profile) === null || _c === void 0 ? void 0 : _c.score;
        var entryStack = (_d = context.profile) === null || _d === void 0 ? void 0 : _d.stack;
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
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    context = Jsonarch.getContext(contextOrEntry);
                    entry = beginProfileScope(context, name);
                    _c.label = 1;
                case 1:
                    _c.trys.push([1, , 3, 4]);
                    return [4 /*yield*/, target()];
                case 2: return [2 /*return*/, _c.sent()];
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
        return __generator(this, function (_c) {
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
        return Jsonarch.profile(entry, "loadLocalFile", function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_c) {
            return [2 /*return*/, System.loadLocalFile(entry.file.path)];
        }); }); });
    };
    Jsonarch.loadFile = function (entry) { return Jsonarch.profile(entry, "loadFile", function () { return __awaiter(_this, void 0, void 0, function () {
        var loardHandler;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    loardHandler = entry.handler.load;
                    if (!loardHandler) return [3 /*break*/, 2];
                    return [4 /*yield*/, Jsonarch.profile(entry, "handler.load", function () { return loardHandler(entry); })];
                case 1: return [2 /*return*/, _c.sent()];
                case 2:
                    if (!Jsonarch.isNetFileLoadEntry(entry)) return [3 /*break*/, 4];
                    return [4 /*yield*/, Jsonarch.loadNetFile(entry)];
                case 3: return [2 /*return*/, _c.sent()];
                case 4:
                    if (!Jsonarch.isLocalFileLoadEntry(entry)) return [3 /*break*/, 6];
                    return [4 /*yield*/, Jsonarch.loadLocalFile(entry)];
                case 5: return [2 /*return*/, _c.sent()];
                case 6: throw new Error("never");
            }
        });
    }); }); };
    Jsonarch.load = function (entry) { return Jsonarch.profile(entry, "load", function () { return __awaiter(_this, void 0, void 0, function () {
        var cache, result, _c;
        var _d, _e;
        return __generator(this, function (_f) {
            switch (_f.label) {
                case 0:
                    if (!Jsonarch.isSystemFileLoadEntry(entry)) return [3 /*break*/, 2];
                    return [4 /*yield*/, Jsonarch.loadSystemJson(entry)];
                case 1: return [2 /*return*/, _f.sent()];
                case 2:
                    if (!Jsonarch.isNoneFileLoadEntry(entry)) return [3 /*break*/, 3];
                    return [2 /*return*/, entry.file.data];
                case 3:
                    if (!(Jsonarch.isNetFileLoadEntry(entry) || Jsonarch.isLocalFileLoadEntry(entry))) return [3 /*break*/, 5];
                    cache = (_e = (_d = entry.cache) === null || _d === void 0 ? void 0 : _d.json) === null || _e === void 0 ? void 0 : _e[entry.file.path];
                    if (undefined !== cache) {
                        return [2 /*return*/, cache];
                    }
                    _c = Jsonarch.jsonParse;
                    return [4 /*yield*/, Jsonarch.loadFile(entry)];
                case 4:
                    result = _c.apply(void 0, [_f.sent()]);
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
        return Jsonarch.profile(entry, "evaluateStatic", function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_c) {
            return [2 /*return*/, entry.template.return];
        }); }); });
    };
    Jsonarch.isIncludeStaticJsonData = Jsonarch.isJsonarch("include-static-json");
    Jsonarch.evaluateIncludeStaticJson = function (entry) { return Jsonarch.profile(entry, "evaluateIncludeStaticJson", function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0: return [4 /*yield*/, Jsonarch.loadFile(__assign(__assign({}, entry), { file: Jsonarch.pathToFileContext(entry, entry.template.path) }))];
                case 1: return [2 /*return*/, _c.sent()];
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
        var parameter, error_1, result;
        var _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    parameter = Jsonarch.applyDefault(Jsonarch.applyDefault(entry.template.default, entry.parameter), (_c = entry.template.override) === null || _c === void 0 ? void 0 : _c.setting);
                    if (!entry.template.catch) return [3 /*break*/, 6];
                    _d.label = 1;
                case 1:
                    _d.trys.push([1, 2, , 5]);
                    return [2 /*return*/, Jsonarch.apply(__assign(__assign({}, entry), { template: entry.template.return, parameter: parameter }))];
                case 2:
                    error_1 = _d.sent();
                    if (!Jsonarch.isJsonable(error_1)) return [3 /*break*/, 4];
                    return [4 /*yield*/, Jsonarch.evaluateCases(__assign(__assign({}, entry), { template: entry.template.catch, parameter: error_1 }))];
                case 3:
                    result = _d.sent();
                    if (undefined !== result) {
                        return [2 /*return*/, result];
                    }
                    _d.label = 4;
                case 4: throw error_1;
                case 5: return [3 /*break*/, 7];
                case 6: return [2 /*return*/, Jsonarch.apply(__assign(__assign({}, entry), { template: entry.template.return, parameter: parameter }))];
                case 7: return [2 /*return*/];
            }
        });
    }); }); };
    Jsonarch.evaluateCases = function (entry) { return Jsonarch.profile(entry, "evaluateCases", function () { return __awaiter(_this, void 0, void 0, function () {
        var _c, _d, _e, i, case_;
        return __generator(this, function (_f) {
            switch (_f.label) {
                case 0:
                    _c = [];
                    for (_d in entry.template)
                        _c.push(_d);
                    _e = 0;
                    _f.label = 1;
                case 1:
                    if (!(_e < _c.length)) return [3 /*break*/, 5];
                    i = _c[_e];
                    case_ = entry.template[i];
                    return [4 /*yield*/, Jsonarch.apply(__assign(__assign({}, entry), { template: case_.if }))];
                case 2:
                    if (!_f.sent()) return [3 /*break*/, 4];
                    return [4 /*yield*/, Jsonarch.apply(__assign(__assign({}, entry), { template: case_.return }))];
                case 3: return [2 /*return*/, _f.sent()];
                case 4:
                    _e++;
                    return [3 /*break*/, 1];
                case 5: return [2 /*return*/, undefined];
            }
        });
    }); }); };
    Jsonarch.isAlphaTypeData = function (type) {
        return (function (template) {
            return Jsonarch.isTypeData(template) && type === template.type;
        });
    };
    Jsonarch.isTypeReferData = Jsonarch.isAlphaTypeData("refer");
    Jsonarch.isNeverTypeData = Jsonarch.isAlphaTypeData("never");
    Jsonarch.isUnknownTypeData = Jsonarch.isAlphaTypeData("unknown");
    Jsonarch.isAnyTypeData = Jsonarch.isAlphaTypeData("any");
    Jsonarch.isNullValueTypeData = Jsonarch.isAlphaTypeData("null");
    Jsonarch.isBooleanValueTypeData = Jsonarch.isAlphaTypeData("boolean");
    Jsonarch.isStringValueTypeData = Jsonarch.isAlphaTypeData("string");
    Jsonarch.isNumberValueTypeData = Jsonarch.isAlphaTypeData("number");
    Jsonarch.isRangeNumberValueTypeData = function (value) {
        return Jsonarch.isAlphaTypeData("number")(value) &&
            Jsonarch.isObject({ integerOnly: Jsonarch.isUndefinedOr(Jsonarch.isBoolean), minValue: Jsonarch.isUndefinedOr(Jsonarch.isNumber), maxValue: Jsonarch.isUndefinedOr(Jsonarch.isNumber), enum: Jsonarch.isUndefined, })(value);
    };
    Jsonarch.isEnumNumberValueTypeData = function (value) {
        return Jsonarch.isAlphaTypeData("number")(value) && Jsonarch.isObject({ enum: Jsonarch.isArray(Jsonarch.isNumber), })(value);
    };
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
    Jsonarch.typeOfJsonable = function (json) {
        if (undefined === json) {
            return { $arch: "type", type: "never", };
        }
        else if (null === json) {
            return { $arch: "type", type: "null", };
        }
        else if ("boolean" === typeof json) {
            return { $arch: "type", type: "boolean", enum: [json,], };
        }
        else if ("number" === typeof json) {
            if (isNaN(json) || (!isFinite(json))) {
                return { $arch: "type", type: "null", };
            }
            else {
                return { $arch: "type", type: "number", enum: [json,], };
            }
        }
        else if ("string" === typeof json) {
            return { $arch: "type", type: "string", enum: [json,], };
        }
        else if (Array.isArray(json)) {
            return { $arch: "type", type: "tuple", list: json.map(function (i) { return Jsonarch.typeOfJsonable(i); }), };
        }
        else if ("object" === typeof json) {
            var member_1 = {};
            Jsonarch.objectKeys(json).forEach(function (i) { return member_1[i] = Jsonarch.typeOfJsonable(json[i]); });
            return { $arch: "type", type: "object", member: member_1, };
        }
        // else
        // {
        return { $arch: "type", type: "never", };
        // }
    };
    Jsonarch.makeParameter = function (entry) { return __awaiter(_this, void 0, void 0, function () {
        var _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    if (!(undefined === entry.template.parameter)) return [3 /*break*/, 1];
                    _c = undefined;
                    return [3 /*break*/, 3];
                case 1: return [4 /*yield*/, Jsonarch.apply(__assign(__assign({}, entry), { template: entry.template.parameter }))];
                case 2:
                    _c = _d.sent();
                    _d.label = 3;
                case 3: return [2 /*return*/, _c];
            }
        });
    }); };
    Jsonarch.validateParameterType = function (entry, parameter) {
        var functionTemplate = Jsonarch.turnRefer(library_json_1.default, entry.template.refer);
        if (Jsonarch.isTemplateData(functionTemplate)) {
            var type = functionTemplate.type;
            if (type) {
                var typeParameter = type.parameter;
                if (typeParameter) {
                    var parameterType = Jsonarch.typeOfJsonable(parameter);
                    var comppareTypeResult = Jsonarch.compareType(typeParameter, parameterType);
                    if (!Jsonarch.isBaseOrEqual(comppareTypeResult)) {
                        throw new Jsonarch.ErrorJson({
                            "$arch": "error",
                            "message": "Unmatch parameter type",
                            "refer": entry.template.refer,
                            comppareTypeResult: comppareTypeResult,
                            "type": {
                                "template.parameter": typeParameter,
                                "parameter": parameterType,
                            },
                            parameter: parameter,
                        });
                    }
                    else {
                        return parameter;
                    }
                }
                else {
                    throw new Jsonarch.ErrorJson({
                        "$arch": "error",
                        "message": "Not found parameter type define",
                        "refer": entry.template.refer,
                    });
                }
            }
            else {
                throw new Jsonarch.ErrorJson({
                    "$arch": "error",
                    "message": "Not found type define",
                    "refer": entry.template.refer,
                });
            }
        }
        else {
            throw new Jsonarch.ErrorJson({
                "$arch": "error",
                "message": "Not found template",
                "refer": entry.template.refer,
            });
        }
    };
    Jsonarch.UnmatchParameterTypeDefineError = function (_entry, parameter) {
        return new Jsonarch.ErrorJson({
            "$arch": "error",
            "message": "Internal Error ( Unmatch parameter type define )",
            "refer": ["string", "join"],
            "parameter": parameter,
        });
    };
    var Library;
    (function (Library) {
        var String;
        (function (String) {
            String.json = function (_entry, parameter) {
                if (Jsonarch.isArray(Jsonarch.isString)(parameter)) {
                    return parameter.join("");
                }
                else if (Jsonarch.isObject({ list: Jsonarch.isArray(Jsonarch.isString), separator: Jsonarch.isString, })(parameter)) {
                    return parameter.list.join(parameter.separator);
                }
                return undefined;
            };
        })(String = Library.String || (Library.String = {}));
    })(Library = Jsonarch.Library || (Jsonarch.Library = {}));
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
    Jsonarch.compositeCompareTypeResult = function () {
        var list = [];
        for (var _c = 0; _c < arguments.length; _c++) {
            list[_c] = arguments[_c];
        }
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
        var _c, _d, _e;
        if (((_c = a.optional) !== null && _c !== void 0 ? _c : false) === ((_d = b.optional) !== null && _d !== void 0 ? _d : false)) {
            return "equal";
        }
        else if ((_e = a.optional) !== null && _e !== void 0 ? _e : false) {
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
    Jsonarch.compareTypeNeverEnum = function (a, b) {
        var aNeverEnum = a.neverEnum;
        var bNeverEnum = b.neverEnum;
        if (undefined === aNeverEnum && undefined === bNeverEnum) {
            return "equal";
        }
        else if (undefined === aNeverEnum) {
            return "base";
        }
        else if (undefined === bNeverEnum) {
            return "extended";
        }
        else {
            var aHasUnmatch = aNeverEnum.some(function (i) { return bNeverEnum.indexOf(i) < 0; });
            var bHasUnmatch = bNeverEnum.some(function (i) { return aNeverEnum.indexOf(i) < 0; });
            if ((!aHasUnmatch) && (!bHasUnmatch)) {
                return "equal";
            }
            else if (!aHasUnmatch) {
                return "base";
            }
            else if (!bHasUnmatch) {
                return "extended";
            }
            else {
                return "unmatch";
            }
        }
    };
    Jsonarch.compareTypeMinValue = function (a, b) {
        var _c, _d;
        var aMinValue = (_c = a.minValue) !== null && _c !== void 0 ? _c : undefined;
        var bMinValue = (_d = b.minValue) !== null && _d !== void 0 ? _d : undefined;
        if (aMinValue === bMinValue) {
            return "equal";
        }
        else if (undefined === aMinValue) {
            return "base";
        }
        else if (undefined === bMinValue) {
            return "extended";
        }
        else if (aMinValue < bMinValue) {
            return "base";
        }
        else {
            return "extended";
        }
    };
    Jsonarch.compareTypeMaxValue = function (a, b) {
        var _c, _d;
        var aMaxValue = (_c = a.maxValue) !== null && _c !== void 0 ? _c : undefined;
        var bMaxValue = (_d = b.maxValue) !== null && _d !== void 0 ? _d : undefined;
        if (aMaxValue === b.maxValue) {
            return "equal";
        }
        else if (undefined === aMaxValue) {
            return "base";
        }
        else if (undefined === bMaxValue) {
            return "extended";
        }
        else if (aMaxValue < bMaxValue) {
            return "extended";
        }
        else {
            return "base";
        }
    };
    Jsonarch.compareTypeMinMaxValue = function (a, b) { return Jsonarch.compositeCompareTypeResult(Jsonarch.compareTypeMinValue(a, b), Jsonarch.compareTypeMaxValue(a, b)); };
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
    Jsonarch.compareTypeMinMaxLength = function (a, b) { return Jsonarch.compositeCompareTypeResult(Jsonarch.compareTypeMinLength(a, b), Jsonarch.compareTypeMaxLength(a, b)); };
    Jsonarch.compareTypeList = function (a, b) {
        var commonLength = Math.min(a.length, b.length);
        return Jsonarch.compositeCompareTypeResult.apply(void 0, __spreadArray(__spreadArray([], a
            .filter(function (_i, ix) { return ix < commonLength; })
            .map(function (_i, ix) { return (function () { return Jsonarch.compareType(a[ix], b[ix]); }); }), false), [commonLength < a.length ? "extended" : undefined,
            commonLength < b.length ? "base" : undefined], false));
    };
    Jsonarch.compareTypeObjectMember = function (a, b) {
        var aMemberList = Jsonarch.objectKeys(a.member);
        var bMemberList = Jsonarch.objectKeys(b.member);
        var commonMemberList = aMemberList.filter(function (a) { return bMemberList.some(function (b) { return a === b; }); });
        var aOnlyMemberList = aMemberList.filter(function (a) { return !commonMemberList.some(function (i) { return a === i; }); });
        var bOnlyMemberList = bMemberList.filter(function (b) { return !commonMemberList.some(function (i) { return b === i; }); });
        return Jsonarch.compositeCompareTypeResult.apply(void 0, __spreadArray(__spreadArray([], commonMemberList.map(function (i) { return function () { return Jsonarch.compareType(a.member[i], b.member[i]); }; }), false), [function () {
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
            }], false));
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
    Jsonarch.compareTypeMeta = function (_a, _b) {
        return "unmatch";
    };
    Jsonarch.compositeCompareType = function (comparer) {
        return function (a, b) {
            return Jsonarch.compositeCompareTypeResult.apply(void 0, comparer.map(function (i) { return i(a, b); }));
        };
    };
    Jsonarch.compareNullValueType = Jsonarch.compositeCompareType([
        Jsonarch.compareTypeOptional,
    ]);
    Jsonarch.compareBoolanValueType = Jsonarch.compositeCompareType([
        Jsonarch.compareTypeOptional,
        Jsonarch.compareTypeEnum,
        Jsonarch.compareTypeNeverEnum,
    ]);
    Jsonarch.compareNumberValueType = Jsonarch.compositeCompareType([
        Jsonarch.compareTypeOptional,
        Jsonarch.compareTypeEnum,
        Jsonarch.compareTypeNeverEnum,
        Jsonarch.compareTypeMinMaxValue,
    ]);
    Jsonarch.compareStringValueType = Jsonarch.compositeCompareType([
        Jsonarch.compareTypeOptional,
        Jsonarch.compareTypeEnum,
        Jsonarch.compareTypeNeverEnum,
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
        function (a, b) { return Jsonarch.compositeCompareTypeResult(function () { return Jsonarch.compareType(a.parameter, b.parameter); }, function () { return Jsonarch.compareType(a.return, b.return); }); },
    ]);
    Jsonarch.compareMetaType = Jsonarch.compositeCompareType([
        Jsonarch.compareTypeOptional,
        function (a, b) { return Jsonarch.compositeCompareTypeResult(function () { return Jsonarch.compareType(a.parameter, b.parameter); }, function () { return Jsonarch.compareType(a.return, b.return); }); },
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
    Jsonarch.compareTypeArrayAndTuple = function (a, b) {
        var optionalCount = b.list.map(function (i) { var _c; return (_c = i.optional) !== null && _c !== void 0 ? _c : false; }).reverse().indexOf(false);
        var minLength = b.list.length - optionalCount;
        var maxLength = b.list.length;
        return Jsonarch.compositeCompareTypeResult.apply(void 0, __spreadArray([Jsonarch.compareTypeOptional(a, b),
            Jsonarch.compareTypeMinMaxLength(a, __assign(__assign({}, a), { minLength: minLength, maxLength: maxLength }))], b.list.map(function (i) { return Jsonarch.compareType(a.itemType, i); }), false));
    };
    Jsonarch.compareType = function (a, b) {
        if (a.type === b.type) {
            return Jsonarch.compositeCompareTypeResult.apply(void 0, compareTypeEntryList.map(function (i) { return i(a, b); }));
        }
        else if (Jsonarch.isArrayTypeData(a) && Jsonarch.isTupleTypeData(b)) {
            return Jsonarch.compareTypeArrayAndTuple(a, b);
        }
        else if (Jsonarch.isTupleTypeData(a) && Jsonarch.isArrayTypeData(b)) {
            return Jsonarch.reverseCompareTypeResult(Jsonarch.compareTypeArrayAndTuple(b, a));
        }
        else if (Jsonarch.isOrCompositeTypeData(a)) {
            return Jsonarch.compareTypeOrComposite(a, b);
        }
        else if (Jsonarch.isOrCompositeTypeData(b)) {
            return Jsonarch.reverseCompareTypeResult(Jsonarch.compareTypeOrComposite(b, a));
        }
        else if (Jsonarch.isMetaTypeData(a)) {
            return Jsonarch.compareTypeMeta(a, b);
        }
        else if (Jsonarch.isMetaTypeData(b)) {
            return Jsonarch.reverseCompareTypeResult(Jsonarch.compareTypeMeta(b, a));
        }
        else {
            return "unmatch";
        }
    };
    Jsonarch.isCompatibleType = function (source, destination) {
        return Jsonarch.isEqualOrExtented(Jsonarch.compareType(source, destination));
    };
    Jsonarch.andTypeOptional = function (a, b) {
        var _c, _d;
        var result = __assign({}, a);
        if (a.optional !== b.optional && ((_c = a.optional) !== null && _c !== void 0 ? _c : true) && !((_d = b.optional) !== null && _d !== void 0 ? _d : false)) {
            if (undefined === b.optional) {
                delete result.optional;
            }
            else {
                result.optional = b.optional;
            }
        }
        return result;
    };
    Jsonarch.andTypeEnum = function (a, b) {
        var result = __assign({}, a);
        var aEnum = a.enum;
        var bEnum = b.enum;
        if (undefined !== aEnum || undefined !== bEnum) {
            if (undefined === aEnum) {
                result.enum = bEnum;
            }
            else if (undefined !== aEnum && undefined !== bEnum) {
                result.enum = aEnum.filter(function (i) { return 0 <= bEnum.indexOf(i); });
            }
        }
        if (!Jsonarch.isNeverTypeData(result)) {
            var aNeverEnum_1 = a.neverEnum;
            var bNeverEnum = b.neverEnum;
            if (undefined !== aNeverEnum_1 || undefined !== bNeverEnum) {
                if (undefined === aNeverEnum_1) {
                    result.neverEnum = bNeverEnum;
                }
                else if (undefined !== aNeverEnum_1 && undefined !== bNeverEnum) {
                    result.neverEnum = aNeverEnum_1.concat(bNeverEnum.filter(function (i) { return aNeverEnum_1.indexOf(i) < 0; }));
                }
            }
            var neverEnum_1 = result.neverEnum;
            if (undefined !== neverEnum_1) {
                if (undefined !== result.enum) {
                    result.enum = result.enum.filter(function (i) { return neverEnum_1.indexOf(i) < 0; });
                    result.neverEnum = undefined;
                }
                else {
                    result.neverEnum = neverEnum_1;
                }
            }
        }
        if (undefined !== result.enum && result.enum.length <= 0) {
            result = { $arch: "type", type: "never", };
        }
        return result;
    };
    Jsonarch.andTypeMinMaxValue = function (a, b) {
        var _c, _d;
        var result = __assign({}, a);
        var resultMinValue = result.minValue;
        var bMinValue = b.minValue;
        if (undefined !== bMinValue && (undefined === resultMinValue || resultMinValue < bMinValue)) {
            result.minValue = resultMinValue = bMinValue;
        }
        var resultMaxValue = result.maxValue;
        var bMaxValue = b.maxValue;
        if (undefined !== bMaxValue && (undefined === resultMaxValue || bMaxValue < resultMaxValue)) {
            result.maxValue = resultMaxValue = bMaxValue;
        }
        if ((_c = b.integerOnly) !== null && _c !== void 0 ? _c : false) {
            result.integerOnly = b.integerOnly;
        }
        if (Jsonarch.isNumberValueTypeData(result) && undefined !== resultMinValue && undefined !== resultMaxValue &&
            (resultMaxValue < resultMinValue ||
                (((_d = result.integerOnly) !== null && _d !== void 0 ? _d : false) && Math.floor(resultMaxValue) < Math.ceil(resultMinValue)))) {
            result = { $arch: "type", type: "never", };
        }
        return result;
    };
    Jsonarch.andTypeFormat = function (a, b) {
        var result = __assign({}, a);
        if (undefined !== b.format) {
            if (undefined === result.format) {
                result.minValue = b.minValue;
            }
            else {
                result = { $arch: "type", type: "never", };
            }
        }
        return result;
    };
    Jsonarch.andTypeMinMaxLength = function (a, b) {
        var result = __assign({}, a);
        if (undefined !== b.minLength && (undefined === result.minLength || result.minLength < b.minLength)) {
            result.minLength = b.minLength;
        }
        if (undefined !== b.maxLength && (undefined === result.maxLength || b.maxLength < result.maxLength)) {
            result.maxLength = b.maxLength;
        }
        if (Jsonarch.isArrayTypeData(result) && undefined !== result.minLength && undefined !== result.maxLength && result.maxLength < result.minLength) {
            result = { $arch: "type", type: "never", };
        }
        return result;
    };
    Jsonarch.andTypeItemType = function (a, b) {
        var result = __assign({}, a);
        var itemType = Jsonarch.andType([a.itemType, b.itemType,]);
        if (Jsonarch.isNeverTypeData(itemType)) {
            result = { $arch: "type", type: "never", };
        }
        else {
            result.itemType = itemType;
        }
        return result;
    };
    Jsonarch.andTypeList = function (a, b) {
        var result = __assign({}, a);
        var commonListLength = Math.min(a.list.length, b.list.length);
        var list = a.list
            .map(function (i, ix) { return Jsonarch.andType([i, b.list[ix]]); })
            .concat(a.list.filter(function (_i, ix) { return commonListLength <= ix; }))
            .concat(b.list.filter(function (_i, ix) { return commonListLength <= ix; }));
        if (list.some(function (i) { return Jsonarch.isNeverTypeData(i); })) {
            result = { $arch: "type", type: "never", };
        }
        else {
            result.list = list;
        }
        return result;
    };
    Jsonarch.andTypeObjectMember = function (a, b) {
        var result = __assign(__assign({}, a), { member: __assign(__assign({}, a.member), b.member) });
        var keys = Jsonarch.objectKeys(result.member);
        for (var i in keys) {
            var key = keys[i];
            var ai = a.member[key];
            var bi = b.member[key];
            if (undefined !== ai && undefined !== bi) {
                var current = Jsonarch.andType([ai, bi,]);
                if (Jsonarch.isNeverTypeData(current)) {
                    result = { $arch: "type", type: "never", };
                    break;
                }
                else {
                    result.member[key] = current;
                }
            }
        }
        return result;
    };
    Jsonarch.andTypeParameter = function (a, b) {
        var result = __assign({}, a);
        var parameter = Jsonarch.andType([a.parameter, b.parameter,]);
        if (Jsonarch.isNeverTypeData(parameter)) {
            result = { $arch: "type", type: "never", };
        }
        else {
            result.parameter = parameter;
        }
        return result;
    };
    Jsonarch.andTypeReturn = function (a, b) {
        var result = __assign({}, a);
        var returnType = Jsonarch.andType([a.return, b.return,]);
        if (Jsonarch.isNeverTypeData(returnType)) {
            result = { $arch: "type", type: "never", };
        }
        else {
            result.return = returnType;
        }
        return result;
    };
    Jsonarch.compositeAndType = function (merger) {
        return function (a, b) {
            var result = __assign({}, a);
            for (var i in merger) {
                if (Jsonarch.isNeverTypeData(result)) {
                    break;
                }
                else {
                    result = merger[i](result, b);
                }
            }
            return result;
        };
    };
    Jsonarch.andNullValueType = Jsonarch.compositeAndType([
        Jsonarch.andTypeOptional,
    ]);
    Jsonarch.andBoolanValueType = Jsonarch.compositeAndType([
        Jsonarch.andTypeOptional,
        Jsonarch.andTypeEnum,
    ]);
    Jsonarch.andNumberValueType = Jsonarch.compositeAndType([
        Jsonarch.andTypeOptional,
        Jsonarch.andTypeEnum,
        Jsonarch.andTypeMinMaxValue,
    ]);
    Jsonarch.andStringValueType = Jsonarch.compositeAndType([
        Jsonarch.andTypeOptional,
        Jsonarch.andTypeEnum,
        Jsonarch.andTypeFormat,
    ]);
    Jsonarch.andArrayType = Jsonarch.compositeAndType([
        Jsonarch.andTypeOptional,
        Jsonarch.andTypeMinMaxLength,
        Jsonarch.andTypeItemType,
    ]);
    Jsonarch.andTupleType = Jsonarch.compositeAndType([
        Jsonarch.andTypeOptional,
        Jsonarch.andTypeList,
    ]);
    Jsonarch.andObjectType = Jsonarch.compositeAndType([
        Jsonarch.andTypeOptional,
        Jsonarch.andTypeObjectMember,
    ]);
    Jsonarch.andTemplateType = Jsonarch.compositeAndType([
        Jsonarch.andTypeOptional,
        Jsonarch.andTypeParameter,
        Jsonarch.andTypeReturn,
    ]);
    Jsonarch.andMetaType = Jsonarch.compositeAndType([
        Jsonarch.andTypeOptional,
        Jsonarch.andTypeParameter,
        Jsonarch.andTypeReturn,
    ]);
    Jsonarch.andIfMatch = function (isMatch, mergeTarget) {
        return function (a, b) {
            return isMatch(a) && isMatch(b) ? mergeTarget(a, b) : undefined;
        };
    };
    var andTypeEntryList = [
        Jsonarch.andIfMatch(Jsonarch.isNullValueTypeData, Jsonarch.andNullValueType),
        Jsonarch.andIfMatch(Jsonarch.isBooleanValueTypeData, Jsonarch.andBoolanValueType),
        Jsonarch.andIfMatch(Jsonarch.isNumberValueTypeData, Jsonarch.andNumberValueType),
        Jsonarch.andIfMatch(Jsonarch.isStringValueTypeData, Jsonarch.andStringValueType),
        Jsonarch.andIfMatch(Jsonarch.isArrayTypeData, Jsonarch.andArrayType),
        Jsonarch.andIfMatch(Jsonarch.isTupleTypeData, Jsonarch.andTupleType),
        Jsonarch.andIfMatch(Jsonarch.isObjectTypeData, Jsonarch.andObjectType),
        Jsonarch.andIfMatch(Jsonarch.isTemplateTypeData, Jsonarch.andTemplateType),
        Jsonarch.andIfMatch(Jsonarch.isMetaTypeData, Jsonarch.andMetaType),
    ];
    Jsonarch.andType = function (list) {
        if (0 < list.length) {
            var result = __assign({}, list[0]);
            for (var i = 1; i < list.length; ++i) {
                var current = list[0];
                if (result.type !== current.type) {
                    return { $arch: "type", type: "never", };
                }
                for (var j in andTypeEntryList) {
                    var x = andTypeEntryList[j](result, current);
                    if (undefined !== x) {
                        result = x;
                        break;
                    }
                }
            }
            return result;
        }
        else {
            return { $arch: "type", type: "never", };
        }
    };
    Jsonarch.regulateType = function (compositeType) {
        // if (isTypeReferData(compositeType))
        // {
        //     compositeType.refer
        // }
        // else
        if (Jsonarch.isAndCompositeTypeData(compositeType)) {
            return Jsonarch.regulateType(Jsonarch.andType(compositeType.list));
        }
        else if (Jsonarch.isOrCompositeTypeData(compositeType)) {
            return __assign(__assign({}, Jsonarch.compareType), { list: compositeType.list.map(function (i) { return Jsonarch.regulateType(i); }) });
        }
        else if (Jsonarch.isArrayTypeData(compositeType)) {
            return __assign(__assign({}, Jsonarch.compareType), { itemType: Jsonarch.regulateType(compositeType.itemType) });
        }
        else if (Jsonarch.isTupleTypeData(compositeType)) {
            return __assign(__assign({}, Jsonarch.compareType), { list: compositeType.list.map(function (i) { return Jsonarch.regulateType(i); }) });
        }
        else if (Jsonarch.isObjectTypeData(compositeType)) {
            var member_2 = {};
            Jsonarch.objectKeys(compositeType.member).forEach(function (key) { return member_2[key] = Jsonarch.regulateType(compositeType.member[key]); });
            return __assign(__assign({}, compositeType), { member: member_2 });
        }
        else {
            return compositeType;
        }
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
        var target, parameter, _c, _d, result;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    target = Jsonarch.turnRefer({
                        string: {
                            join: Library.String.json,
                        },
                        template: entry.cache.template,
                    }, entry.template.refer);
                    if (!("function" === typeof target)) return [3 /*break*/, 3];
                    _c = Jsonarch.validateParameterType;
                    _d = [entry];
                    return [4 /*yield*/, Jsonarch.makeParameter(entry)];
                case 1:
                    parameter = _c.apply(void 0, _d.concat([_e.sent()]));
                    return [4 /*yield*/, target(entry, parameter)];
                case 2:
                    result = _e.sent();
                    if (undefined === result) {
                        throw Jsonarch.UnmatchParameterTypeDefineError(entry, parameter);
                    }
                    return [2 /*return*/, result];
                case 3:
                    if (!Jsonarch.isTemplateData(target)) return [3 /*break*/, 5];
                    return [4 /*yield*/, Jsonarch.evaluateTemplate(__assign(__assign({}, entry), { template: target }))];
                case 4: return [2 /*return*/, _e.sent()];
                case 5: throw new Jsonarch.ErrorJson({
                    "$arch": "error",
                    "message": "Unknown refer call",
                    "refer": entry.template.refer,
                });
            }
        });
    }); }); };
    Jsonarch.evaluateValue = function (entry) { return Jsonarch.profile(entry, "evaluateValue", function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_c) {
            //entry.template.refer;
            return [2 /*return*/, entry.parameter.name];
        });
    }); }); };
    Jsonarch.evaluateIfMatch = function (isMatch, evaluateTarget) {
        return function (entry) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_c) {
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
        var _c, _d, _e, i, result;
        return __generator(this, function (_f) {
            switch (_f.label) {
                case 0:
                    _c = [];
                    for (_d in evaluatorList)
                        _c.push(_d);
                    _e = 0;
                    _f.label = 1;
                case 1:
                    if (!(_e < _c.length)) return [3 /*break*/, 4];
                    i = _c[_e];
                    return [4 /*yield*/, evaluatorList[i](entry)];
                case 2:
                    result = _f.sent();
                    if (undefined !== result) {
                        return [2 /*return*/, result];
                    }
                    _f.label = 3;
                case 3:
                    _e++;
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
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    if (!(null === entry.template || "object" !== typeof entry.template)) return [3 /*break*/, 1];
                    return [2 /*return*/, entry.template];
                case 1:
                    if (!Jsonarch.isEvaluateTargetEntry(entry)) return [3 /*break*/, 3];
                    return [4 /*yield*/, Jsonarch.evaluate(entry)];
                case 2: return [2 /*return*/, _c.sent()];
                case 3:
                    if (!Array.isArray(entry.template)) return [3 /*break*/, 5];
                    return [4 /*yield*/, Promise.all(entry.template.map(function (i) { return Jsonarch.apply(__assign(__assign({}, entry), {
                            template: i,
                        })); }))];
                case 4: return [2 /*return*/, _c.sent()];
                case 5:
                    result_1 = {};
                    template_1 = entry.template;
                    return [4 /*yield*/, Promise.all(Jsonarch.objectKeys(template_1).map(function (key) { return __awaiter(_this, void 0, void 0, function () {
                            var _c, _d;
                            return __generator(this, function (_e) {
                                switch (_e.label) {
                                    case 0:
                                        _c = result_1;
                                        _d = key;
                                        return [4 /*yield*/, Jsonarch.apply(__assign(__assign({}, entry), {
                                                template: template_1[key],
                                            }))];
                                    case 1: return [2 /*return*/, _c[_d] = _e.sent()];
                                }
                            });
                        }); }))];
                case 6:
                    _c.sent();
                    return [2 /*return*/, result_1];
            }
        });
    }); }); };
    Jsonarch.applyRoot = function (entry, template, parameter, cache, setting) { return Jsonarch.profile(entry, "applyRoot", function () { return __awaiter(_this, void 0, void 0, function () {
        var handler, context, rootEvaluateEntry, output, result, error_2, result;
        return __generator(this, function (_c) {
            switch (_c.label) {
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
                    _c.label = 1;
                case 1:
                    _c.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, Jsonarch.apply(rootEvaluateEntry)];
                case 2:
                    output = _c.sent();
                    result = {
                        $arch: "result",
                        output: output,
                        cache: cache,
                        setting: setting,
                    };
                    return [2 /*return*/, result];
                case 3:
                    error_2 = _c.sent();
                    result = {
                        $arch: "result",
                        output: Jsonarch.parseErrorJson(error_2),
                        cache: cache,
                        setting: setting,
                    };
                    return [2 /*return*/, result];
                case 4: return [2 /*return*/];
            }
        });
    }); }); };
    Jsonarch.process = function (entry) { return __awaiter(_this, void 0, void 0, function () {
        var handler, emptyCache, cache, _c, settingFileContext, settingResult, _d, _e, setting, parameterResult, _f, _g, _h, parameter, template;
        var _j, _k, _l;
        return __generator(this, function (_m) {
            switch (_m.label) {
                case 0:
                    handler = entry.handler;
                    emptyCache = { "$arch": "cache" };
                    if (!entry.cache) return [3 /*break*/, 2];
                    return [4 /*yield*/, Jsonarch.load({ context: entry, cache: emptyCache, setting: boot_setting_json_1.default, handler: handler, file: entry.cache })];
                case 1:
                    _c = _m.sent();
                    return [3 /*break*/, 3];
                case 2:
                    _c = emptyCache;
                    _m.label = 3;
                case 3:
                    cache = _c;
                    settingFileContext = (_j = entry.setting) !== null && _j !== void 0 ? _j : Jsonarch.getSystemFileContext("default-setting.json");
                    _d = Jsonarch.applyRoot;
                    _e = [{
                            handler: handler,
                            template: settingFileContext,
                            cache: entry.cache,
                            setting: Jsonarch.getSystemFileContext("boot-setting.json"),
                        }];
                    return [4 /*yield*/, Jsonarch.load({ context: entry, cache: cache, setting: boot_setting_json_1.default, handler: handler, file: settingFileContext })];
                case 4: return [4 /*yield*/, _d.apply(void 0, _e.concat([_m.sent(), null,
                        cache,
                        boot_setting_json_1.default]))];
                case 5:
                    settingResult = _m.sent();
                    setting = (_k = settingResult === null || settingResult === void 0 ? void 0 : settingResult.output) !== null && _k !== void 0 ? _k : { "$arch": "setting", };
                    if (!entry.parameter) return [3 /*break*/, 8];
                    _g = Jsonarch.applyRoot;
                    _h = [{
                            handler: handler,
                            template: entry.parameter,
                            cache: entry.cache,
                            setting: settingFileContext,
                        }];
                    return [4 /*yield*/, Jsonarch.load({ context: entry, cache: cache, setting: setting, handler: handler, file: entry.parameter })];
                case 6: return [4 /*yield*/, _g.apply(void 0, _h.concat([_m.sent(), null,
                        cache,
                        setting]))];
                case 7:
                    _f = _m.sent();
                    return [3 /*break*/, 9];
                case 8:
                    _f = undefined;
                    _m.label = 9;
                case 9:
                    parameterResult = _f;
                    parameter = (_l = parameterResult === null || parameterResult === void 0 ? void 0 : parameterResult.output) !== null && _l !== void 0 ? _l : null;
                    return [4 /*yield*/, Jsonarch.load({ context: entry, cache: cache, setting: setting, handler: handler, file: entry.template })];
                case 10:
                    template = _m.sent();
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
        if (Jsonarch.isJsonableObject(json)) {
            if (Jsonarch.objectValues(json).some(function (i) { return Jsonarch.isJsonableObject(i) || Array.isArray(i); })) {
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
            if (json.some(function (i) { return Jsonarch.isJsonableObject(i) || Array.isArray(i); })) {
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
        var _c;
        var indent = (_c = setting.indent) !== null && _c !== void 0 ? _c : "smart";
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