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
var Comparer = __importStar(require("./comparer"));
var boot_setting_json_1 = __importDefault(require("./boot.setting.json"));
var setting_json_1 = __importDefault(require("./setting.json"));
var library_json_1 = __importDefault(require("./library.json"));
var Locale = __importStar(require("./locale"));
exports.Locale = __importStar(require("./locale"));
var Jsonarch;
(function (Jsonarch) {
    var _this = this;
    function undefinedable(target, defaultResult) {
        return function (parameter) { return undefined === parameter ? defaultResult : target(parameter); };
    }
    Jsonarch.undefinedable = undefinedable;
    Jsonarch.structure = function (processor) {
        var self = function (value, key) {
            if (Array.isArray(value)) {
                return value.map(function (i, ix) { return self(i, ix); });
            }
            else if (null !== value && "object" === typeof value) {
                var result_1 = {};
                Jsonarch.objectKeys(value).forEach(function (key) { return result_1[key] = self(value[key], key); });
                return result_1;
            }
            else {
                return processor(value, key);
            }
        };
        return self;
    };
    Jsonarch.structureAsync = function (processor) {
        var self = function (value, key) { return __awaiter(_this, void 0, void 0, function () {
            var result, _c, _d, _e, i, _f, _g, result, keys, _h, _j, _k, i, key_1, _l, _m;
            return __generator(this, function (_o) {
                switch (_o.label) {
                    case 0:
                        if (!Array.isArray(value)) return [3 /*break*/, 5];
                        result = [];
                        _c = [];
                        for (_d in value)
                            _c.push(_d);
                        _e = 0;
                        _o.label = 1;
                    case 1:
                        if (!(_e < _c.length)) return [3 /*break*/, 4];
                        i = _c[_e];
                        _g = (_f = result).push;
                        return [4 /*yield*/, self(value[i], i)];
                    case 2:
                        _g.apply(_f, [_o.sent()]);
                        _o.label = 3;
                    case 3:
                        _e++;
                        return [3 /*break*/, 1];
                    case 4: return [2 /*return*/, result];
                    case 5:
                        if (!(null !== value && "object" === typeof value)) return [3 /*break*/, 10];
                        result = {};
                        keys = Jsonarch.objectKeys(value);
                        _h = [];
                        for (_j in keys)
                            _h.push(_j);
                        _k = 0;
                        _o.label = 6;
                    case 6:
                        if (!(_k < _h.length)) return [3 /*break*/, 9];
                        i = _h[_k];
                        key_1 = keys[i];
                        _l = result;
                        _m = key_1;
                        return [4 /*yield*/, self(value[key_1], key_1)];
                    case 7:
                        _l[_m] = _o.sent();
                        _o.label = 8;
                    case 8:
                        _k++;
                        return [3 /*break*/, 6];
                    case 9: return [2 /*return*/, result];
                    case 10: return [4 /*yield*/, processor(value, key)];
                    case 11: return [2 /*return*/, _o.sent()];
                }
            });
        }); };
        return self;
    };
    Jsonarch.hasStructure = function (processor) {
        var self = function (value, key) {
            if (Array.isArray(value)) {
                return value.some(function (i, ix) { return self(i, ix); });
            }
            else if (null !== value && "object" === typeof value) {
                return Jsonarch.objectKeys(value).some(function (key) { return self(value[key], key); });
            }
            else {
                return processor(value, key);
            }
        };
        return self;
    };
    Jsonarch.structureObject = function (processor) {
        var self = function (value, key) {
            if (Array.isArray(value)) {
                return value.map(function (i, ix) { return self(i, ix); });
            }
            else if (null !== value && "object" === typeof value) {
                var processed = processor(value, key);
                if (undefined !== processed) {
                    return processed;
                }
                else {
                    var result_2 = {};
                    Jsonarch.objectKeys(value).forEach(function (key) { return result_2[key] = self(value[key], key); });
                    return result_2;
                }
            }
            else {
                return value;
            }
        };
        return self;
    };
    Jsonarch.structureObjectAsync = function (processor) {
        var self = function (value, key) { return __awaiter(_this, void 0, void 0, function () {
            var result, _c, _d, _e, i, _f, _g, processed, result, keys, _h, _j, _k, i, key_2, _l, _m;
            return __generator(this, function (_o) {
                switch (_o.label) {
                    case 0:
                        if (!Array.isArray(value)) return [3 /*break*/, 5];
                        result = [];
                        _c = [];
                        for (_d in value)
                            _c.push(_d);
                        _e = 0;
                        _o.label = 1;
                    case 1:
                        if (!(_e < _c.length)) return [3 /*break*/, 4];
                        i = _c[_e];
                        _g = (_f = result).push;
                        return [4 /*yield*/, self(value[i], i)];
                    case 2:
                        _g.apply(_f, [_o.sent()]);
                        _o.label = 3;
                    case 3:
                        _e++;
                        return [3 /*break*/, 1];
                    case 4: return [2 /*return*/, result];
                    case 5:
                        if (!(null !== value && "object" === typeof value)) return [3 /*break*/, 13];
                        return [4 /*yield*/, processor(value, key)];
                    case 6:
                        processed = _o.sent();
                        if (!(undefined !== processed)) return [3 /*break*/, 7];
                        return [2 /*return*/, processed];
                    case 7:
                        result = {};
                        keys = Jsonarch.objectKeys(value);
                        _h = [];
                        for (_j in keys)
                            _h.push(_j);
                        _k = 0;
                        _o.label = 8;
                    case 8:
                        if (!(_k < _h.length)) return [3 /*break*/, 11];
                        i = _h[_k];
                        key_2 = keys[i];
                        _l = result;
                        _m = key_2;
                        return [4 /*yield*/, self(value[key_2], key_2)];
                    case 9:
                        _l[_m] = _o.sent();
                        _o.label = 10;
                    case 10:
                        _k++;
                        return [3 /*break*/, 8];
                    case 11: return [2 /*return*/, result];
                    case 12: return [3 /*break*/, 14];
                    case 13: return [2 /*return*/, value];
                    case 14: return [2 /*return*/];
                }
            });
        }); };
        return self;
    };
    Jsonarch.hasStructureObject = function (processor) {
        var self = function (value, key) {
            if (Array.isArray(value)) {
                return value.some(function (i, ix) { return self(i, ix); });
            }
            else if (null !== value && "object" === typeof value) {
                return processor(value, key) || Jsonarch.objectKeys(value).some(function (key) { return self(value[key], key); });
            }
            else {
                return false;
            }
        };
        return self;
    };
    Jsonarch.jsonStringify = function (source, replacer, space) { return JSON.stringify(source, replacer, space); };
    Jsonarch.jsonParse = function (text, reviver) { return JSON.parse(text, reviver); };
    Jsonarch.isJsonableValue = function (value) {
        return null === value || ["boolean", "number", "string"].includes(typeof value);
    };
    Jsonarch.isJsonableObject = function (value) {
        return null !== value &&
            "object" === typeof value &&
            !Array.isArray(value) &&
            Jsonarch.objectValues(value).every(function (i) { return Jsonarch.isJsonable(i); });
    };
    Jsonarch.isJsonableArray = function (value) {
        return Array.isArray(value) && value.every(function (i) { return Jsonarch.isJsonable(i); });
    };
    Jsonarch.isJsonable = function (value) {
        return Jsonarch.isJsonableValue(value) || Jsonarch.isJsonableArray(value) || Jsonarch.isJsonableObject(value);
    };
    Jsonarch.objectKeys = function (target) { return Object.keys(target); };
    Jsonarch.objectValues = function (target) { return Object.values(target); };
    Jsonarch.regulateJsonable = function (value, shallowOrDeep) {
        if (undefined === value || null === value) {
            return null;
        }
        else if (Array.isArray(value)) {
            if ("shallow" === shallowOrDeep) {
                return value;
            }
            else {
                return value.map(function (i) { return Jsonarch.regulateJsonable(i, shallowOrDeep); });
            }
        }
        else if ("object" === typeof value) {
            var result_3 = {};
            Jsonarch.objectKeys(value).forEach(function (key) {
                var v = value[key];
                if (undefined !== v) {
                    if ("shallow" === shallowOrDeep) {
                        result_3[key] = v;
                    }
                    else {
                        result_3[key] = Jsonarch.regulateJsonable(v, shallowOrDeep);
                    }
                }
            });
            return result_3;
        }
        else {
            return value;
        }
    };
    Jsonarch.toJsonable = function (value, maxDepth, currentDepth) {
        if (maxDepth === void 0) { maxDepth = 10; }
        if (currentDepth === void 0) { currentDepth = 0; }
        if (maxDepth <= currentDepth) {
            return "$over-depth";
        }
        if (null !== value) {
            if ("object" === typeof value) {
                if (Array.isArray(value)) {
                    return value.map(function (i) { return Jsonarch.toJsonable(i, maxDepth, currentDepth + 1); });
                }
                else {
                    var result_4 = {};
                    Jsonarch.objectKeys(value).forEach(function (key) {
                        if (undefined !== value[key]) {
                            result_4[key] = Jsonarch.toJsonable(value[key], maxDepth, currentDepth + 1);
                        }
                    });
                    return result_4;
                }
            }
            else {
                var type = typeof value;
                switch (type) {
                    case "boolean":
                    case "number":
                    case "string":
                        return value;
                    case "undefined":
                        return "$undefined";
                    default:
                        return "$".concat(type, ":").concat(value.toString());
                }
            }
        }
        return value;
    };
    Jsonarch.getJsonableErrors = function (value, path) {
        if (path === void 0) { path = "root"; }
        var result = [];
        if (Array.isArray(value)) {
            value.forEach(function (i, ix) { return result.push.apply(result, Jsonarch.getJsonableErrors(i, "".concat(path, "/").concat(ix))); });
        }
        else if (null !== value && "object" === typeof value) {
            Jsonarch.objectKeys(value).forEach(function (key) { return result.push.apply(result, Jsonarch.getJsonableErrors(value[key], "".concat(path, "/").concat(key))); });
        }
        else {
            if (!["boolean", "number", "string"].includes(typeof value)) {
                result.push(path);
            }
        }
        return result;
    };
    Jsonarch.isAny = function (_value) { return true; };
    Jsonarch.isJust = function (type) { return function (value) { return type === value; }; };
    Jsonarch.isUndefined = Jsonarch.isJust(undefined);
    Jsonarch.isNull = Jsonarch.isJust(null);
    Jsonarch.isUndefinedOr = function (isType) { return isTypeOr(Jsonarch.isUndefined, isType); };
    Jsonarch.isNullOr = function (isType) { return isTypeOr(Jsonarch.isNull, isType); };
    Jsonarch.isUndefinedOrNullOr = function (isType) { return isTypeOr(Jsonarch.isUndefined, Jsonarch.isNull, isType); };
    Jsonarch.isJustValue = function (type) { return function (value) { return type === value; }; };
    Jsonarch.isBoolean = function (value) { return "boolean" === typeof value; };
    Jsonarch.isNumber = function (value) { return "number" === typeof value; };
    Jsonarch.isString = function (value) { return "string" === typeof value; };
    Jsonarch.isFunction = function (value) { return "function" === typeof value; };
    Jsonarch.isObject = function (isMember) {
        return function (value) {
            return null !== value &&
                "object" === typeof value &&
                !Array.isArray(value) &&
                Jsonarch.objectKeys(isMember).every(function (key) { return isMember[key](value[key]); });
        };
    };
    Jsonarch.isMapObject = function (isType) {
        return function (value) {
            return null !== value &&
                "object" === typeof value &&
                !Array.isArray(value) &&
                Jsonarch.objectValues(value).every(function (i) { return isType(i); });
        };
    };
    Jsonarch.isArray = function (isType) {
        return function (value) { return Array.isArray(value) && value.every(function (i) { return isType(i); }); };
    };
    function isTuple() {
        var isTypeList = [];
        for (var _c = 0; _c < arguments.length; _c++) {
            isTypeList[_c] = arguments[_c];
        }
        return function (value) { return Array.isArray(value) && isTypeList.every(function (i, ix) { return i(value[ix]); }); };
    }
    Jsonarch.isTuple = isTuple;
    function isEnum(list) {
        return function (value) { return list.includes(value); };
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
    Jsonarch.makeProfile = function (data) {
        if (data === void 0) { data = {}; }
        return (__assign({ isProfiling: true, score: {}, template: {}, parameter: {}, stack: [], startAt: Jsonarch.getTicks() }, data));
    };
    Jsonarch.isProfileEntry = Jsonarch.isObject({
        scope: Jsonarch.isString,
        template: Jsonarch.isString,
        parameter: Jsonarch.isArray(Jsonarch.isString),
        startTicks: Jsonarch.isNumber,
        childrenTicks: Jsonarch.isNumber,
    });
    Jsonarch.isProfileScore = Jsonarch.isObject({ count: Jsonarch.isNumber, time: Jsonarch.isNumber, });
    Jsonarch.isProfile = Jsonarch.isObject({
        isProfiling: Jsonarch.isBoolean,
        score: Jsonarch.isMapObject(Jsonarch.isProfileScore),
        template: Jsonarch.isMapObject(Jsonarch.isProfileScore),
        parameter: Jsonarch.isMapObject(Jsonarch.isProfileScore),
        stack: Jsonarch.isArray(Jsonarch.isProfileEntry),
        startAt: Jsonarch.isNumber,
    });
    Jsonarch.makeProfileReport = function (profile) {
        var total = Jsonarch.objectValues(profile.score).map(function (i) { return i.time; }).reduce(function (a, b) { return a + b; }, 0);
        var makeData = function (score) {
            return ({
                count: score.count,
                time: score.time,
                percent: (score.time / total) * 100,
            });
        };
        var result = {
            parameter: Jsonarch.objectKeys(profile.parameter).map(function (path) {
                return (__assign({ parameter: Jsonarch.jsonParse(path) }, makeData(profile.template[path])));
            })
                .sort(Comparer.make([
                function (item) { return -item.time; },
                function (item) { return -item.count; },
                function (item) { return Jsonarch.jsonStringify(item.parameter); },
            ])),
            template: Jsonarch.objectKeys(profile.template).map(function (path) {
                return (__assign({ template: Jsonarch.jsonParse(path) }, makeData(profile.template[path])));
            })
                .sort(Comparer.make([
                function (item) { return -item.time; },
                function (item) { return -item.count; },
                function (item) { return Jsonarch.jsonStringify(item.template); },
            ])),
            system: Jsonarch.objectKeys(profile.score).map(function (scope) {
                return (__assign({ scope: scope }, makeData(profile.score[scope])));
            })
                .sort(Comparer.make([
                function (item) { return -item.time; },
                function (item) { return -item.count; },
                function (item) { return item.scope; },
            ])),
        };
        return result;
    };
    Jsonarch.isSystemFileType = isEnum(["boot-setting.json", "default-setting.json"]);
    Jsonarch.isSystemFileContext = Jsonarch.isObject({ category: Jsonarch.isJust("system"), id: Jsonarch.isSystemFileType, hash: Jsonarch.isUndefinedOr(Jsonarch.isString), });
    Jsonarch.isNoneFileContext = Jsonarch.isObject({ category: Jsonarch.isJust("none"), data: Jsonarch.isJsonable, hash: Jsonarch.isUndefinedOr(Jsonarch.isString), });
    Jsonarch.isNoneFileContextStrict = function (isType) {
        return Jsonarch.isObject({ category: Jsonarch.isJust("none"), data: isType, hash: Jsonarch.isUndefinedOr(Jsonarch.isString), });
    };
    Jsonarch.isNetFileContext = Jsonarch.isObject({ category: Jsonarch.isJust("net"), path: Jsonarch.isString, hash: Jsonarch.isUndefinedOr(Jsonarch.isString), });
    Jsonarch.isLocalFileContext = Jsonarch.isObject({ category: Jsonarch.isJust("local"), path: Jsonarch.isString, hash: Jsonarch.isUndefinedOr(Jsonarch.isString), });
    Jsonarch.isFileContext = isTypeOr(Jsonarch.isSystemFileContext, Jsonarch.isNoneFileContextStrict(Jsonarch.isJsonable), Jsonarch.isNetFileContext, Jsonarch.isLocalFileContext);
    Jsonarch.isFileContextStrict = function (isType) {
        return isTypeOr(Jsonarch.isSystemFileContext, Jsonarch.isNoneFileContextStrict(isType), Jsonarch.isNetFileContext, Jsonarch.isLocalFileContext);
    };
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
        return Jsonarch.regulateJsonable({ category: "none", data: data, hash: hash, }, "shallow");
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
        return Jsonarch.regulateJsonable(/^system\:/.test(argument) ? { category: "system", id: argument.replace(/^system\:/, ""), hash: Jsonarch.getHashFromPath(argument), } :
            /^https?\:\/\//.test(argument) ? { category: "net", path: argument, hash: Jsonarch.getHashFromPath(argument), } :
                { category: "local", path: argument, hash: Jsonarch.getHashFromPath(argument), }, "shallow");
    };
    Jsonarch.isContext = Jsonarch.isObject({
        template: Jsonarch.isFileContext,
        parameter: Jsonarch.isUndefinedOr(Jsonarch.isFileContext),
        cache: Jsonarch.isUndefinedOr(Jsonarch.isFileContext),
        setting: Jsonarch.isUndefinedOr(Jsonarch.isFileContext),
        profile: Jsonarch.isProfile,
        nestDepth: Jsonarch.isUndefinedOr(Jsonarch.isNumber),
    });
    Jsonarch.getContext = function (contextOrEntry) {
        return Jsonarch.isContext(contextOrEntry) ? contextOrEntry : contextOrEntry.context;
    };
    Jsonarch.isCache = Jsonarch.isJsonarch("cache");
    Jsonarch.isSetting = Jsonarch.isJsonarch("setting");
    Jsonarch.isCallStackEntry = function (value) {
        return Jsonarch.isObject({
            path: Jsonarch.isFullRefer,
            parameter: Jsonarch.isJsonable,
            originMap: Jsonarch.isUndefinedOr(Jsonarch.isOriginMap),
            caller: Jsonarch.isFullRefer,
        })(value);
    };
    Jsonarch.makeCallStack = function (callStack, next) { return __spreadArray(__spreadArray([], callStack, true), [next,], false); };
    Jsonarch.isReturnOrigin = function (value) {
        return Jsonarch.isObject({ root: Jsonarch.isOriginRoot, template: Jsonarch.isRefer, parameter: Jsonarch.isJsonable, originMap: Jsonarch.isUndefinedOr(Jsonarch.isOriginMap), })(value);
    };
    Jsonarch.isValueOrigin = function (value) {
        return Jsonarch.isObject({ root: Jsonarch.isOriginRoot, refer: Jsonarch.isRefer, })(value);
    };
    Jsonarch.isOriginRoot = function (value) {
        return isTypeOr(Jsonarch.isFileContext, Jsonarch.isReturnOrigin)(value);
    };
    Jsonarch.isOrigin = function (value) {
        return isTypeOr(Jsonarch.isOriginRoot, Jsonarch.isValueOrigin)(value);
    };
    Jsonarch.isOriginMap = function (value) {
        return Jsonarch.isMapObject(isTypeOr(Jsonarch.isOrigin, Jsonarch.isOriginMap))(value);
    };
    Jsonarch.getRootOrigin = function (origin) { return Jsonarch.isOriginRoot(origin) ? origin : origin.root; };
    Jsonarch.getOriginPath = function (origin) { return Jsonarch.isOriginRoot(origin) ? [] : Jsonarch.toLeafFullRefer(origin).refer; };
    Jsonarch.makeOrigin = function (parent, refer) {
        return ({
            root: Jsonarch.getRootOrigin(parent),
            refer: Jsonarch.getOriginPath(parent).concat([refer]),
        });
    };
    Jsonarch.isSystemFileLoadEntry = function (entry) { return Jsonarch.isSystemFileContext(entry.file); };
    Jsonarch.isNoneFileLoadEntry = function (entry) { return Jsonarch.isNoneFileContextStrict(Jsonarch.isJsonable)(entry.file); };
    Jsonarch.isNoneFileLoadEntryStrict = function (isType) { return function (entry) { return Jsonarch.isNoneFileContextStrict(isType)(entry.file); }; };
    Jsonarch.isNetFileLoadEntry = function (entry) { return Jsonarch.isNetFileContext(entry.file); };
    Jsonarch.isLocalFileLoadEntry = function (entry) { return Jsonarch.isLocalFileContext(entry.file); };
    Jsonarch.isHandler = Jsonarch.isObject({ load: Jsonarch.isUndefinedOr((Jsonarch.isFunction)), });
    Jsonarch.isEvaluateEntry = function (isTemplateType) {
        return Jsonarch.isObject({
            context: Jsonarch.isContext,
            this: Jsonarch.isUndefinedOr(Jsonarch.isObject({ template: Jsonarch.isTemplateData, path: Jsonarch.isFullRefer, })),
            template: isTemplateType,
            parameter: Jsonarch.isUndefinedOr(Jsonarch.isJsonable),
            callStack: Jsonarch.isArray(Jsonarch.isCallStackEntry),
            path: Jsonarch.isFullRefer,
            originMap: Jsonarch.isUndefinedOr(Jsonarch.isOriginMap),
            scope: Jsonarch.isUndefinedOr(Jsonarch.isJsonableObject),
            cache: Jsonarch.isCache,
            setting: Jsonarch.isSetting,
            handler: Jsonarch.isHandler,
        });
    };
    Jsonarch.isLazy = Jsonarch.isJsonarch("lazy");
    Jsonarch.makeLazy = function (entry) {
        var _c;
        return Jsonarch.regulateJsonable({
            $arch: "lazy",
            thisPath: (_c = entry.this) === null || _c === void 0 ? void 0 : _c.path,
            parameter: entry.parameter,
            callStack: entry.callStack,
            path: entry.path,
            originMap: entry.originMap,
            scope: entry.scope,
        }, "shallow");
    };
    Jsonarch.restoreFromLazy = function (entry, lazy) {
        var _c;
        return (__assign(__assign({ context: entry.context }, lazy), { this: (undefined !== lazy.thisPath ?
                {
                    template: Jsonarch.turnRefer(entry, (_c = entry.cache.json) === null || _c === void 0 ? void 0 : _c[lazy.thisPath.root.path], Jsonarch.toLeafFullRefer(lazy.thisPath).refer),
                    path: lazy.thisPath,
                } :
                undefined), template: Jsonarch.getLazyTemplate(entry, lazy), cache: entry.cache, setting: entry.setting, handler: entry.handler }));
    };
    Jsonarch.resolveLazy = function (entry, lazy) { return __awaiter(_this, void 0, void 0, function () {
        var _this = this;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0: return [4 /*yield*/, Jsonarch.profile(entry, "resolveLazy", function () { return __awaiter(_this, void 0, void 0, function () {
                        var _this = this;
                        return __generator(this, function (_c) {
                            switch (_c.label) {
                                case 0: return [4 /*yield*/, Jsonarch.structureObjectAsync(function (value) { return __awaiter(_this, void 0, void 0, function () {
                                        var _c, _d, _e;
                                        return __generator(this, function (_f) {
                                            switch (_f.label) {
                                                case 0:
                                                    if (!Jsonarch.isLazy(value)) return [3 /*break*/, 3];
                                                    _d = Jsonarch.resolveLazy;
                                                    _e = [entry];
                                                    return [4 /*yield*/, Jsonarch.evaluateLazy(entry, value)];
                                                case 1: return [4 /*yield*/, _d.apply(void 0, _e.concat([_f.sent()]))];
                                                case 2:
                                                    _c = _f.sent();
                                                    return [3 /*break*/, 4];
                                                case 3:
                                                    _c = undefined;
                                                    _f.label = 4;
                                                case 4: return [2 /*return*/, _c];
                                            }
                                        });
                                    }); })(lazy)];
                                case 1: return [2 /*return*/, _c.sent()];
                            }
                        });
                    }); })];
                case 1: return [2 /*return*/, _c.sent()];
            }
        });
    }); };
    Jsonarch.hasLazy = Jsonarch.hasStructureObject(function (value) { return Jsonarch.isLazy(value); });
    Jsonarch.isIntermediate = Jsonarch.isJsonarch("intermediate");
    Jsonarch.isIntermediateTarget = function (isMember) {
        return function (value) {
            return Jsonarch.isIntermediate(value) &&
                Jsonarch.objectKeys(isMember).every(function (key) { return isMember[key](value[key]); });
        };
    };
    Jsonarch.makeOutput = function (intermediate, base) {
        var originMap = {};
        if (Jsonarch.isIntermediate(intermediate)) {
            originMap[Jsonarch.jsonStringify(base)] = intermediate.origin;
        }
        var value = Jsonarch.getValueFromIntermediateOrValue(intermediate);
        if (Array.isArray(value)) {
            var output = [];
            for (var i in value) {
                var ix = parseInt(i);
                var v = value[ix];
                var r = Jsonarch.makeOutput(v, Jsonarch.makeOrigin(base, ix));
                output.push(r.output);
                Object.assign(originMap, r.originMap);
            }
            return { output: output, originMap: originMap, };
        }
        else if (null !== value && "object" === typeof value) {
            var output = {};
            var keys = Jsonarch.objectKeys(value);
            for (var i in keys) {
                var key = keys[i];
                var v = value[key];
                if (undefined !== v) {
                    var r = Jsonarch.makeOutput(v, Jsonarch.makeOrigin(base, key));
                    output[key] = r.output;
                    Object.assign(originMap, r.originMap);
                }
            }
            return { output: output, originMap: originMap, };
        }
        else {
            var output = value;
            return { output: output, originMap: originMap, };
        }
    };
    Jsonarch.makeSolid = function (intermediate) {
        var value = Jsonarch.getValueFromIntermediateOrValue(intermediate);
        if (Array.isArray(value)) {
            return value.map(function (i) { return Jsonarch.makeSolid(i); });
        }
        else if (null !== value && "object" === typeof value) {
            var output_1 = {};
            var keys = Jsonarch.objectKeys(value);
            keys.forEach(function (key) { return output_1[key] = Jsonarch.makeSolid(value[key]); });
            return output_1;
        }
        else {
            return value;
        }
    };
    // export const makeIntermediate = async (entry: EvaluateEntry<Jsonable>, value: Jsonable, origin: Origin): Promise<Intermediate> =>
    // ({
    //     $arch: "intermediate",
    //     type: await typeOfResult(entry, value),
    //     value,
    //     origin,
    // });
    Jsonarch.makeIntermediate = function (entry, target, origin) { return __awaiter(_this, void 0, void 0, function () {
        var value, result_5, _c, _d, _e, i, ix, v, _f, _g, result_6, keys, _h, _j, _k, i, key, v, _l, _m, result;
        var _o;
        return __generator(this, function (_p) {
            switch (_p.label) {
                case 0:
                    if (!Jsonarch.isIntermediate(target)) return [3 /*break*/, 1];
                    return [2 /*return*/, target];
                case 1:
                    value = target;
                    if (!Array.isArray(value)) return [3 /*break*/, 6];
                    result_5 = [];
                    _c = [];
                    for (_d in value)
                        _c.push(_d);
                    _e = 0;
                    _p.label = 2;
                case 2:
                    if (!(_e < _c.length)) return [3 /*break*/, 5];
                    i = _c[_e];
                    ix = parseInt(i);
                    v = value[ix];
                    _g = (_f = result_5).push;
                    return [4 /*yield*/, Jsonarch.makeIntermediate(entry, v, Jsonarch.makeOrigin(origin, ix))];
                case 3:
                    _g.apply(_f, [_p.sent()]);
                    _p.label = 4;
                case 4:
                    _e++;
                    return [3 /*break*/, 2];
                case 5:
                    value = result_5;
                    return [3 /*break*/, 11];
                case 6:
                    if (!(null !== value && "object" === typeof value)) return [3 /*break*/, 11];
                    result_6 = {};
                    keys = Jsonarch.objectKeys(value);
                    _h = [];
                    for (_j in keys)
                        _h.push(_j);
                    _k = 0;
                    _p.label = 7;
                case 7:
                    if (!(_k < _h.length)) return [3 /*break*/, 10];
                    i = _h[_k];
                    key = keys[i];
                    v = value[key];
                    _l = result_6;
                    _m = key;
                    return [4 /*yield*/, Jsonarch.makeIntermediate(entry, v, Jsonarch.makeOrigin(origin, key))];
                case 8:
                    _l[_m] = _p.sent();
                    _p.label = 9;
                case 9:
                    _k++;
                    return [3 /*break*/, 7];
                case 10:
                    value = result_6;
                    _p.label = 11;
                case 11:
                    _o = {
                        $arch: "intermediate"
                    };
                    return [4 /*yield*/, Jsonarch.typeOfResult(entry, value)];
                case 12:
                    result = (_o.type = _p.sent(),
                        _o.value = value,
                        _o.origin = origin,
                        _o);
                    return [2 /*return*/, result];
            }
        });
    }); };
    Jsonarch.getValueFromIntermediateOrValue = function (intermediateOrValue) {
        return Jsonarch.isIntermediate(intermediateOrValue) ? intermediateOrValue.value : intermediateOrValue;
    };
    Jsonarch.toErrorStatusFromEvaluateEntry = function (entry) {
        var _c;
        return ({
            this: (_c = entry.this) === null || _c === void 0 ? void 0 : _c.path,
            path: entry.path,
            // template: entry.template,
            parameter: entry.parameter,
            callStack: entry.callStack,
            orignMap: entry.originMap,
            scope: entry.scope,
        });
    };
    var isPureDataType = function (template) {
        return ["setting", "cache",].includes(template.$arch);
    };
    Jsonarch.isEvaluateTargetEntry = function (entry) {
        return Jsonarch.isAlphaJsonarch(entry.template) && !isPureDataType(entry.template);
    };
    var isLazyableJsonarchType = function (template) {
        return ["call",].includes(template.$arch);
    };
    Jsonarch.isLazyableEvaluateTargetEntry = function (entry) {
        return Jsonarch.isAlphaJsonarch(entry.template) && !isLazyableJsonarchType(entry.template);
    };
    Jsonarch.isResult = Jsonarch.isJsonarch("result");
    Jsonarch.isError = Jsonarch.isJsonarch("error");
    // export const getTicks = () => new Date().getTime();
    Jsonarch.getTicks = function () { return performance.now(); };
    var beginProfileScope = function (context, scope, template, parameter) {
        var _c, _d, _e;
        var result = {
            scope: scope,
            template: template,
            parameter: parameter,
            startTicks: 0,
            childrenTicks: 0,
        };
        if ((_d = (_c = context.profile) === null || _c === void 0 ? void 0 : _c.isProfiling) !== null && _d !== void 0 ? _d : false) {
            result.startTicks = Jsonarch.getTicks();
            (_e = context.profile) === null || _e === void 0 ? void 0 : _e.stack.push(result);
        }
        return result;
    };
    var recordProfileScore = function (score, key, time, countUp) {
        if (countUp === void 0) { countUp = true; }
        if (undefined === score[key]) {
            score[key] = { count: 0, time: 0, };
        }
        if (countUp) {
            score[key].count += 1;
        }
        score[key].time += time;
    };
    var endProfileScope = function (context, entry) {
        var _c, _d, _e, _f;
        var profileScore = (_c = context.profile) === null || _c === void 0 ? void 0 : _c.score;
        var profileTemplate = (_d = context.profile) === null || _d === void 0 ? void 0 : _d.template;
        var profileParameter = (_e = context.profile) === null || _e === void 0 ? void 0 : _e.parameter;
        var entryStack = (_f = context.profile) === null || _f === void 0 ? void 0 : _f.stack;
        if (0 !== entry.startTicks && entryStack) {
            var wholeTicks = Jsonarch.getTicks() - entry.startTicks;
            var time_1 = wholeTicks - entry.childrenTicks;
            if (profileScore) {
                recordProfileScore(profileScore, entry.scope, time_1);
            }
            if (profileTemplate) {
                recordProfileScore(profileTemplate, entry.template, time_1, [
                    "apply",
                    "evaluateCall.library",
                    "evaluateCall.template",
                    "evaluateCases",
                    "evaluateCasePattern",
                ]
                    .includes(entry.scope));
            }
            if (profileParameter) {
                entry.parameter.forEach(function (parameter) { return recordProfileScore(profileParameter, parameter, time_1); });
            }
            entryStack.pop();
            if (0 < entryStack.length) {
                entryStack[entryStack.length - 1].childrenTicks += wholeTicks;
            }
        }
    };
    Jsonarch.getPathFromContextOrEntry = function (contextOrEntry) {
        if ("path" in contextOrEntry) {
            var path = contextOrEntry["path"];
            if (Jsonarch.isFullRefer(path)) {
                return path;
            }
        }
        return undefined;
    };
    Jsonarch.getParameterOriginFromContextOrEntry = function (_contextOrEntry) {
        return [];
    };
    Jsonarch.profile = function (contextOrEntry, scope, target) { return __awaiter(_this, void 0, void 0, function () {
        var context, template, parameter, entry;
        var _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    context = Jsonarch.getContext(contextOrEntry);
                    template = Jsonarch.jsonStringify((_c = Jsonarch.getPathFromContextOrEntry(contextOrEntry)) !== null && _c !== void 0 ? _c : "root");
                    parameter = Jsonarch.getParameterOriginFromContextOrEntry(contextOrEntry).map(function (i) { return Jsonarch.jsonStringify(i); });
                    entry = beginProfileScope(context, scope, template, parameter);
                    _d.label = 1;
                case 1:
                    _d.trys.push([1, , 3, 4]);
                    return [4 /*yield*/, target()];
                case 2: return [2 /*return*/, _d.sent()];
                case 3:
                    endProfileScope(context, entry);
                    return [7 /*endfinally*/];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    Jsonarch.makeError = function (entry, message, detail) {
        return ({
            $arch: "error",
            message: message,
            detail: detail,
            status: undefinedable(Jsonarch.toErrorStatusFromEvaluateEntry)(entry),
        });
    };
    Jsonarch.ErrorJson = function (entry, message, detail) {
        return new Error("json:".concat(Jsonarch.jsonStringify(Jsonarch.makeError(entry, message, detail))));
    };
    Jsonarch.parseErrorJson = function (error) {
        if (Jsonarch.isError(error)) {
            return error;
        }
        else if (error instanceof Error) {
            if (error.message.startsWith("json:")) {
                return Jsonarch.jsonParse(error.message.replace(/^json\:/, ""));
            }
            else {
                var result = {
                    $arch: "error",
                    message: "System Error",
                    detail: {
                        name: error.name,
                        message: error.message,
                        stack: undefinedable(Jsonarch.toLineArrayOrAsIs)(error.stack),
                    }
                };
                return result;
            }
        }
        else {
            var result = {
                $arch: "error",
                message: "Unknown Error",
                detail: Jsonarch.toJsonable(error),
            };
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
            throw new Jsonarch.ErrorJson(undefined, "never");
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
            return [2 /*return*/, Jsonarch.encode(entry.template.return)];
        }); }); });
    };
    Jsonarch.evaluateStaticResultType = function (entry) {
        return Jsonarch.profile(entry, "evaluateStaticResultType", function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_c) {
            switch (_c.label) {
                case 0: return [4 /*yield*/, Jsonarch.typeOfResult(entry, entry.template.return)];
                case 1: return [2 /*return*/, _c.sent()];
            }
        }); }); });
    };
    Jsonarch.isIncludeStaticJsonData = Jsonarch.isJsonarch("include-static-json");
    Jsonarch.evaluateIncludeStaticJson = function (entry) { return Jsonarch.profile(entry, "evaluateIncludeStaticJson", function () { return __awaiter(_this, void 0, void 0, function () {
        var _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    _c = Jsonarch.encode;
                    return [4 /*yield*/, Jsonarch.loadFile(__assign(__assign({}, entry), { file: Jsonarch.pathToFileContext(entry, entry.template.path) }))];
                case 1: return [2 /*return*/, _c.apply(void 0, [_d.sent()])];
            }
        });
    }); }); };
    Jsonarch.evaluateIncludeStaticJsonResultType = function (entry) { return Jsonarch.profile(entry, "evaluateIncludeStaticJsonResultType", function () { return __awaiter(_this, void 0, void 0, function () {
        var _c, _d;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    _c = Jsonarch.typeOfResult;
                    _d = [entry];
                    return [4 /*yield*/, Jsonarch.loadFile(__assign(__assign({}, entry), { file: Jsonarch.pathToFileContext(entry, entry.template.path) }))];
                case 1: return [2 /*return*/, _c.apply(void 0, _d.concat([_e.sent()]))];
            }
        });
    }); }); };
    Jsonarch.isRefer = Jsonarch.isArray(isTypeOr(Jsonarch.isString, Jsonarch.isNumber));
    Jsonarch.isRootFullRefer = Jsonarch.isObject({ root: Jsonarch.isOriginRoot, refer: Jsonarch.isJustValue("root"), });
    Jsonarch.isLeafFullRefer = Jsonarch.isObject({ root: Jsonarch.isOriginRoot, refer: Jsonarch.isRefer, });
    Jsonarch.isFullRefer = function (value) { return isTypeOr(Jsonarch.isRootFullRefer, Jsonarch.isLeafFullRefer)(value); };
    Jsonarch.toLeafFullRefer = function (refer) { return Jsonarch.isRootFullRefer(refer) ? { root: refer.root, refer: [], } : refer; };
    Jsonarch.regulateFullRefer = function (refer) { return Jsonarch.isLeafFullRefer(refer) && refer.refer.length <= 0 ? { root: refer.root, refer: "root", } : refer; };
    Jsonarch.resolveThisPath = function (this_, path) { return this_ && "this" === path.refer[0] ?
        Jsonarch.regulateFullRefer({
            root: this_.root,
            refer: Jsonarch.toLeafFullRefer(this_).refer.concat(Jsonarch.toLeafFullRefer(path).refer.filter(function (_i, ix) { return 0 < ix; })),
        }) :
        path; };
    Jsonarch.makeFullRefer = function (parent, refer) {
        return ({
            root: parent.root,
            refer: __spreadArray(__spreadArray([], Jsonarch.toLeafFullRefer(parent).refer, true), [refer,], false),
        });
    };
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
    Jsonarch.isNumberValueTypeData = Jsonarch.isAlphaTypeData("number");
    Jsonarch.isRangeNumberValueTypeData = function (value) {
        return Jsonarch.isAlphaTypeData("number")(value) &&
            Jsonarch.isObject({ integerOnly: Jsonarch.isUndefinedOr(Jsonarch.isBoolean), minValue: Jsonarch.isUndefinedOr(Jsonarch.isNumber), maxValue: Jsonarch.isUndefinedOr(Jsonarch.isNumber), enum: Jsonarch.isUndefined, })(value);
    };
    Jsonarch.isEnumNumberValueTypeData = function (value) {
        return Jsonarch.isAlphaTypeData("number")(value) && Jsonarch.isObject({ enum: Jsonarch.isArray(Jsonarch.isNumber), })(value);
    };
    Jsonarch.isStringValueTypeData = Jsonarch.isAlphaTypeData("string");
    Jsonarch.isValueTypeData = function (template) {
        return Jsonarch.isNullValueTypeData(template) ||
            Jsonarch.isBooleanValueTypeData(template) ||
            Jsonarch.isNumberValueTypeData(template) ||
            Jsonarch.isStringValueTypeData(template);
    };
    Jsonarch.isArrayTypeData = Jsonarch.isAlphaTypeData("array");
    Jsonarch.isTupleTypeData = Jsonarch.isAlphaTypeData("tuple");
    Jsonarch.isObjectTypeData = Jsonarch.isAlphaTypeData("object");
    Jsonarch.getMemberType = function (parent, member) {
        var _c;
        if (Jsonarch.isObjectTypeData(parent)) {
            return (_c = parent.member[member]) !== null && _c !== void 0 ? _c : { $arch: "type", type: "never" };
        }
        else if (Jsonarch.isOrCompositeTypeData(parent)) {
            return Jsonarch.regulateType({
                $arch: "type",
                type: "or",
                list: parent.list.map(function (i) { return Jsonarch.getMemberType(i, member); }),
            });
        }
        else if (Jsonarch.isAndCompositeTypeData(parent)) {
            return Jsonarch.regulateType({
                $arch: "type",
                type: "and",
                list: parent.list.map(function (i) { return Jsonarch.getMemberType(i, member); }),
            });
        }
        else {
            return { $arch: "type", type: "never" };
        }
    };
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
            if (Jsonarch.isIntermediate(json)) {
                return json.type;
            }
            else {
                var member_1 = {};
                Jsonarch.objectKeys(json).forEach(function (i) { return member_1[i] = Jsonarch.typeOfJsonable(json[i]); });
                return { $arch: "type", type: "object", member: member_1, };
            }
        }
        // else
        // if ("function" === typeof json)
        // {
        //     return { $arch: "type", type: "function", };
        // }
        // else
        // {
        return { $arch: "type", type: "never", };
        // }
    };
    Jsonarch.isCallTypeInterface = function (value) {
        return Jsonarch.isObject({ parameter: Jsonarch.isTypeData, return: Jsonarch.isTypeData, })(value);
    };
    Jsonarch.isTemplateData = Jsonarch.isJsonarch("template");
    Jsonarch.isMatchData = Jsonarch.isJsonarch("match");
    Jsonarch.isValueCasePattern = Jsonarch.isObject({ value: Jsonarch.isJsonable, });
    Jsonarch.isListCasePattern = Jsonarch.isObject({ list: Jsonarch.isArray(Jsonarch.isJsonable), });
    Jsonarch.isTypeCasePattern = Jsonarch.isObject({ type: Jsonarch.isTypeData, });
    Jsonarch.isIfCasePattern = Jsonarch.isObject({ if: Jsonarch.isJsonable, });
    Jsonarch.isIfCaseCasePattern = function (value) { return Jsonarch.isObject({ ifCase: Jsonarch.isCasePattern, parameter: Jsonarch.isJsonable, })(value); };
    Jsonarch.isNotCasePattern = function (value) { return Jsonarch.isObject({ not: Jsonarch.isCasePattern, })(value); };
    Jsonarch.isOrCasePattern = function (value) { return Jsonarch.isObject({ or: Jsonarch.isArray(Jsonarch.isCasePattern), })(value); };
    Jsonarch.isAndCasePattern = function (value) { return Jsonarch.isObject({ and: Jsonarch.isArray(Jsonarch.isCasePattern), })(value); };
    Jsonarch.isCasePattern = isTypeOr(Jsonarch.isValueCasePattern, Jsonarch.isListCasePattern, Jsonarch.isTypeCasePattern, Jsonarch.isIfCasePattern, Jsonarch.isIfCaseCasePattern, Jsonarch.isNotCasePattern, Jsonarch.isOrCasePattern, Jsonarch.isAndCasePattern);
    Jsonarch.isLoopData = Jsonarch.isJsonarch("loop");
    Jsonarch.isLoopFalseResultData = Jsonarch.isObject({ continue: Jsonarch.isJustValue(false), });
    Jsonarch.isLoopRegularResultData = Jsonarch.isObject({ continue: Jsonarch.isUndefinedOr(Jsonarch.isBoolean), return: Jsonarch.isJsonable, });
    Jsonarch.isLoopResultData = isTypeOr(Jsonarch.isLoopFalseResultData, Jsonarch.isLoopRegularResultData);
    Jsonarch.applyDefault = function () {
        var defaults = [];
        for (var _c = 0; _c < arguments.length; _c++) {
            defaults[_c] = arguments[_c];
        }
        var result;
        defaults.forEach(function (i) {
            if (undefined !== i) {
                if (Jsonarch.isJsonableObject(result) && Jsonarch.isJsonableObject(i)) {
                    Jsonarch.objectKeys(i).forEach(function (key) { return result[key] = Jsonarch.applyDefault(result[key], i[key]); });
                }
                else {
                    result = i;
                }
            }
        });
        return result;
    };
    Jsonarch.evaluateTemplate = function (entry) { return Jsonarch.profile(entry, "evaluateTemplate", function () { return __awaiter(_this, void 0, void 0, function () {
        var parameter, this_, error_1, result;
        var _c, _d;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    parameter = Jsonarch.applyDefault((_c = entry.template.default) === null || _c === void 0 ? void 0 : _c.parameter, entry.parameter, (_d = entry.template.override) === null || _d === void 0 ? void 0 : _d.parameter);
                    this_ = {
                        template: entry.template,
                        path: entry.path,
                    };
                    if (!entry.template.catch) return [3 /*break*/, 6];
                    _e.label = 1;
                case 1:
                    _e.trys.push([1, 2, , 5]);
                    return [2 /*return*/, Jsonarch.apply(__assign(__assign({}, entry), { this: this_, path: Jsonarch.makeFullRefer(entry.path, "return"), template: entry.template.return, parameter: parameter }))];
                case 2:
                    error_1 = _e.sent();
                    if (!Jsonarch.isJsonable(error_1)) return [3 /*break*/, 4];
                    return [4 /*yield*/, Jsonarch.evaluateCases(__assign(__assign({}, entry), { this: this_, path: Jsonarch.makeFullRefer(entry.path, "catch"), template: entry.template.catch, parameter: error_1 }))];
                case 3:
                    result = _e.sent();
                    if (undefined !== result) {
                        return [2 /*return*/, result];
                    }
                    _e.label = 4;
                case 4: throw error_1;
                case 5: return [3 /*break*/, 7];
                case 6: return [2 /*return*/, Jsonarch.apply(__assign(__assign({}, entry), { this: this_, path: Jsonarch.makeFullRefer(entry.path, "return"), template: entry.template.return, parameter: parameter }))];
                case 7: return [2 /*return*/];
            }
        });
    }); }); };
    Jsonarch.evaluateTemplateResultType = function (entry) { return Jsonarch.profile(entry, "evaluateTemplateResultType", function () { return __awaiter(_this, void 0, void 0, function () {
        var parameter, parameterType, type, types, i, t;
        var _c, _d;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    parameter = Jsonarch.applyDefault((_c = entry.template.default) === null || _c === void 0 ? void 0 : _c.parameter, entry.parameter, (_d = entry.template.override) === null || _d === void 0 ? void 0 : _d.parameter);
                    return [4 /*yield*/, Jsonarch.typeOfResult(entry, parameter)];
                case 1:
                    parameterType = _e.sent();
                    type = entry.template.type;
                    if (type) {
                        types = Array.isArray(type) ? type : [type];
                        for (i in types) {
                            t = types[i];
                            if (Jsonarch.isBaseOrEqual(Jsonarch.compareType(t.parameter, parameterType))) {
                                return [2 /*return*/, t.return];
                            }
                        }
                    }
                    return [2 /*return*/, Jsonarch.typeOfResult(entry, entry.template.return)];
            }
        });
    }); }); };
    Jsonarch.evaluateMatch = function (entry) { return Jsonarch.profile(entry, "evaluateMatch", function () { return __awaiter(_this, void 0, void 0, function () {
        var parameter, _c, _d, _e, result;
        return __generator(this, function (_f) {
            switch (_f.label) {
                case 0:
                    _c = Jsonarch.applyDefault;
                    _d = [entry.template.default];
                    if (!(undefined !== entry.template.parameter)) return [3 /*break*/, 2];
                    return [4 /*yield*/, Jsonarch.apply(__assign(__assign({}, entry), { path: Jsonarch.makeFullRefer(entry.path, "parameter"), template: entry.template.parameter }))];
                case 1:
                    _e = _f.sent();
                    return [3 /*break*/, 3];
                case 2:
                    _e = entry.parameter;
                    _f.label = 3;
                case 3:
                    parameter = _c.apply(void 0, _d.concat([_e]));
                    return [4 /*yield*/, Jsonarch.evaluateCases(__assign(__assign({}, entry), { path: Jsonarch.makeFullRefer(entry.path, "cases"), template: entry.template.cases, parameter: parameter }))];
                case 4:
                    result = _f.sent();
                    if (undefined !== result) {
                        return [2 /*return*/, result];
                    }
                    return [2 /*return*/, entry.template.default.return];
            }
        });
    }); }); };
    Jsonarch.evaluateMatchResultType = function (entry) { return Jsonarch.profile(entry, "evaluateMatchResultType", function () { return __awaiter(_this, void 0, void 0, function () {
        var parameter, _c, _d, _e, caseTypes, result, _f;
        var _g;
        return __generator(this, function (_h) {
            switch (_h.label) {
                case 0:
                    _c = Jsonarch.applyDefault;
                    _d = [entry.template.default];
                    if (!(undefined !== entry.template.parameter)) return [3 /*break*/, 2];
                    return [4 /*yield*/, Jsonarch.lazyableApply(__assign(__assign({}, entry), { path: Jsonarch.makeFullRefer(entry.path, "parameter"), template: entry.template.parameter }))];
                case 1:
                    _e = _h.sent();
                    return [3 /*break*/, 3];
                case 2:
                    _e = entry.parameter;
                    _h.label = 3;
                case 3:
                    parameter = _c.apply(void 0, _d.concat([_e]));
                    return [4 /*yield*/, Jsonarch.evaluateCasesType(__assign(__assign({}, entry), { path: Jsonarch.makeFullRefer(entry.path, "cases"), template: entry.template.cases, parameter: parameter }))];
                case 4:
                    caseTypes = _h.sent();
                    _g = {
                        $arch: "type",
                        type: "or"
                    };
                    _f = [__spreadArray([], caseTypes, true)];
                    return [4 /*yield*/, Jsonarch.typeOfResult(__assign(__assign({}, entry), { parameter: parameter }), entry.template.default.return)];
                case 5:
                    result = (_g.list = __spreadArray.apply(void 0, _f.concat([[
                            _h.sent()
                        ], false])),
                        _g);
                    return [2 /*return*/, result];
            }
        });
    }); }); };
    Jsonarch.evaluateValueCasePattern = function (entry) { return Jsonarch.profile(entry, "evaluateValueCasePattern", function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_c) {
            if (undefined !== entry.parameter) {
                return [2 /*return*/, Jsonarch.jsonStringify(entry.parameter) === Jsonarch.jsonStringify(entry.template.value)];
            }
            else {
                throw new Jsonarch.ErrorJson(entry, "Unknown Jsonarch TypeUnspecified Parameter");
            }
            return [2 /*return*/];
        });
    }); }); };
    Jsonarch.evaluateListCasePattern = function (entry) { return Jsonarch.profile(entry, "evaluateListCasePattern", function () { return __awaiter(_this, void 0, void 0, function () {
        var entryParameter;
        return __generator(this, function (_c) {
            entryParameter = entry.parameter;
            if (undefined !== entryParameter) {
                return [2 /*return*/, entry.template.list.some(function (i) { return Jsonarch.jsonStringify(entryParameter) === Jsonarch.jsonStringify(i); })];
            }
            else {
                throw new Jsonarch.ErrorJson(entry, "Unknown Jsonarch TypeUnspecified Parameter");
            }
            return [2 /*return*/];
        });
    }); }); };
    Jsonarch.evaluateTypeCasePattern = function (entry) { return Jsonarch.profile(entry, "evaluateTypeCasePattern", function () { return __awaiter(_this, void 0, void 0, function () {
        var parameterType, comppareTypeResult;
        return __generator(this, function (_c) {
            if (undefined !== entry.parameter) {
                parameterType = Jsonarch.typeOfJsonable(entry.parameter);
                comppareTypeResult = Jsonarch.compareType(entry.template.type, parameterType);
                return [2 /*return*/, Jsonarch.isBaseOrEqual(comppareTypeResult)];
            }
            else {
                throw new Jsonarch.ErrorJson(entry, "Unknown Jsonarch TypeUnspecified Parameter");
            }
            return [2 /*return*/];
        });
    }); }); };
    Jsonarch.evaluateIfCasePattern = function (entry) { return Jsonarch.profile(entry, "evaluateIfCasePattern", function () { return __awaiter(_this, void 0, void 0, function () {
        var result;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0: return [4 /*yield*/, Jsonarch.apply(__assign(__assign({}, entry), { path: Jsonarch.makeFullRefer(entry.path, "if"), template: entry.template.if }))];
                case 1:
                    result = _c.sent();
                    if ("boolean" !== typeof result) {
                        throw new Jsonarch.ErrorJson(entry, "Unmatch if result type", {
                            template: entry.template.if,
                            result: result,
                        });
                    }
                    return [2 /*return*/, result];
            }
        });
    }); }); };
    Jsonarch.evaluateIfCaseCasePattern = function (entry) { return Jsonarch.profile(entry, "evaluateIfCaseCasePattern", function () { return __awaiter(_this, void 0, void 0, function () {
        var parameter, result;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0: return [4 /*yield*/, Jsonarch.apply(__assign(__assign({}, entry), { path: Jsonarch.makeFullRefer(entry.path, "parameter"), template: entry.template.parameter }))];
                case 1:
                    parameter = _c.sent();
                    return [4 /*yield*/, Jsonarch.evaluateCasePattern(__assign(__assign({}, entry), { path: Jsonarch.makeFullRefer(entry.path, "ifCase"), template: entry.template.ifCase, parameter: parameter }))];
                case 2:
                    result = _c.sent();
                    if ("boolean" !== typeof result) {
                        throw new Jsonarch.ErrorJson(entry, "Unmatch if-case result type", {
                            template: entry.template,
                            parameter: parameter,
                            result: result,
                        });
                    }
                    return [2 /*return*/, result];
            }
        });
    }); }); };
    Jsonarch.evaluateNotCasePattern = function (entry) { return Jsonarch.profile(entry, "evaluateNotCasePattern", function () { return __awaiter(_this, void 0, void 0, function () {
        var result;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0: return [4 /*yield*/, Jsonarch.evaluateCasePattern(__assign(__assign({}, entry), { path: Jsonarch.makeFullRefer(entry.path, "not"), template: entry.template.not }))];
                case 1:
                    result = _c.sent();
                    if ("boolean" !== typeof result) {
                        throw new Jsonarch.ErrorJson(entry, "Unmatch not result type", {
                            template: entry.template.not,
                            result: result,
                        });
                    }
                    return [2 /*return*/, !result];
            }
        });
    }); }); };
    Jsonarch.evaluateOrCasePattern = function (entry) { return Jsonarch.profile(entry, "evaluateOrCasePattern", function () { return __awaiter(_this, void 0, void 0, function () {
        var basePath, _c, _d, _e, i, template, result;
        return __generator(this, function (_f) {
            switch (_f.label) {
                case 0:
                    basePath = Jsonarch.makeFullRefer(entry.path, "or");
                    _c = [];
                    for (_d in entry.template.or)
                        _c.push(_d);
                    _e = 0;
                    _f.label = 1;
                case 1:
                    if (!(_e < _c.length)) return [3 /*break*/, 4];
                    i = _c[_e];
                    template = entry.template.or[i];
                    return [4 /*yield*/, Jsonarch.evaluateCasePattern(__assign(__assign({}, entry), { path: Jsonarch.makeFullRefer(basePath, i), template: template }))];
                case 2:
                    result = _f.sent();
                    if ("boolean" !== typeof result) {
                        throw new Jsonarch.ErrorJson(entry, "Unmatch or result type", {
                            template: template,
                            result: result,
                        });
                    }
                    if (result) {
                        return [2 /*return*/, true];
                    }
                    _f.label = 3;
                case 3:
                    _e++;
                    return [3 /*break*/, 1];
                case 4: return [2 /*return*/, false];
            }
        });
    }); }); };
    Jsonarch.evaluateAndCasePattern = function (entry) { return Jsonarch.profile(entry, "evaluateAndCasePattern", function () { return __awaiter(_this, void 0, void 0, function () {
        var basePath, _c, _d, _e, i, template, result;
        return __generator(this, function (_f) {
            switch (_f.label) {
                case 0:
                    basePath = Jsonarch.makeFullRefer(entry.path, "and");
                    _c = [];
                    for (_d in entry.template.and)
                        _c.push(_d);
                    _e = 0;
                    _f.label = 1;
                case 1:
                    if (!(_e < _c.length)) return [3 /*break*/, 4];
                    i = _c[_e];
                    template = entry.template.and[i];
                    return [4 /*yield*/, Jsonarch.evaluateCasePattern(__assign(__assign({}, entry), { path: Jsonarch.makeFullRefer(basePath, i), template: template }))];
                case 2:
                    result = _f.sent();
                    if ("boolean" !== typeof result) {
                        throw new Jsonarch.ErrorJson(entry, "Unmatch and result type", {
                            template: template,
                            result: result,
                        });
                    }
                    if (!result) {
                        return [2 /*return*/, false];
                    }
                    _f.label = 3;
                case 3:
                    _e++;
                    return [3 /*break*/, 1];
                case 4: return [2 /*return*/, true];
            }
        });
    }); }); };
    Jsonarch.evaluateIfMatchCasePattern = function (isMatch, evaluateTarget) {
        return function (entry) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_c) {
            return [2 /*return*/, isMatch(entry.template) ? evaluateTarget(entry) : undefined];
        }); }); };
    };
    var casePatternEvaluatorList = [
        Jsonarch.evaluateIfMatchCasePattern(Jsonarch.isValueCasePattern, Jsonarch.evaluateValueCasePattern),
        Jsonarch.evaluateIfMatchCasePattern(Jsonarch.isListCasePattern, Jsonarch.evaluateListCasePattern),
        Jsonarch.evaluateIfMatchCasePattern(Jsonarch.isTypeCasePattern, Jsonarch.evaluateTypeCasePattern),
        Jsonarch.evaluateIfMatchCasePattern(Jsonarch.isIfCasePattern, Jsonarch.evaluateIfCasePattern),
        Jsonarch.evaluateIfMatchCasePattern(Jsonarch.isIfCaseCasePattern, Jsonarch.evaluateIfCaseCasePattern),
        Jsonarch.evaluateIfMatchCasePattern(Jsonarch.isNotCasePattern, Jsonarch.evaluateNotCasePattern),
        Jsonarch.evaluateIfMatchCasePattern(Jsonarch.isOrCasePattern, Jsonarch.evaluateOrCasePattern),
        Jsonarch.evaluateIfMatchCasePattern(Jsonarch.isAndCasePattern, Jsonarch.evaluateAndCasePattern),
    ];
    Jsonarch.evaluateCasePattern = function (entry) { return Jsonarch.profile(entry, "evaluateCasePattern", function () { return __awaiter(_this, void 0, void 0, function () {
        var _c, _d, _e, i, result;
        return __generator(this, function (_f) {
            switch (_f.label) {
                case 0:
                    _c = [];
                    for (_d in casePatternEvaluatorList)
                        _c.push(_d);
                    _e = 0;
                    _f.label = 1;
                case 1:
                    if (!(_e < _c.length)) return [3 /*break*/, 4];
                    i = _c[_e];
                    return [4 /*yield*/, casePatternEvaluatorList[i](entry)];
                case 2:
                    result = _f.sent();
                    if (undefined !== result) {
                        return [2 /*return*/, result];
                    }
                    _f.label = 3;
                case 3:
                    _e++;
                    return [3 /*break*/, 1];
                case 4: throw new Jsonarch.ErrorJson(entry, "Unknown Case Pattern", {
                    template: entry.template,
                });
            }
        });
    }); }); };
    Jsonarch.evaluateCases = function (entry) { return Jsonarch.profile(entry, "evaluateCases", function () { return __awaiter(_this, void 0, void 0, function () {
        var _c, _d, _e, i, ix, case_, path, _f;
        return __generator(this, function (_g) {
            switch (_g.label) {
                case 0:
                    _c = [];
                    for (_d in entry.template)
                        _c.push(_d);
                    _e = 0;
                    _g.label = 1;
                case 1:
                    if (!(_e < _c.length)) return [3 /*break*/, 6];
                    i = _c[_e];
                    ix = parseInt(i);
                    case_ = entry.template[ix];
                    path = Jsonarch.makeFullRefer(entry.path, ix);
                    _f = undefined === case_.case;
                    if (_f) return [3 /*break*/, 3];
                    return [4 /*yield*/, Jsonarch.evaluateCasePattern(__assign(__assign({}, entry), { path: Jsonarch.makeFullRefer(path, "case"), template: case_.case }))];
                case 2:
                    _f = (_g.sent());
                    _g.label = 3;
                case 3:
                    if (!_f) return [3 /*break*/, 5];
                    return [4 /*yield*/, Jsonarch.apply(__assign(__assign({}, entry), { path: Jsonarch.makeFullRefer(path, "return"), template: case_.return }))];
                case 4: return [2 /*return*/, _g.sent()];
                case 5:
                    _e++;
                    return [3 /*break*/, 1];
                case 6: return [2 /*return*/, undefined];
            }
        });
    }); }); };
    Jsonarch.evaluateCasesType = function (entry) { return Jsonarch.profile(entry, "evaluateCasesType", function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_c) {
        switch (_c.label) {
            case 0: return [4 /*yield*/, Promise.all(entry.template.map(function (i) { return Jsonarch.typeOfResult(entry, i.return); }))];
            case 1: return [2 /*return*/, _c.sent()];
        }
    }); }); }); };
    Jsonarch.evaluateLoop = function (entry) { return Jsonarch.profile(entry, "evaluateLoop", function () { return __awaiter(_this, void 0, void 0, function () {
        var result, index, scope, current;
        var _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    result = [];
                    index = 0;
                    _d.label = 1;
                case 1:
                    if (!true) return [3 /*break*/, 3];
                    scope = __assign(__assign({}, entry.scope), { $loop: { index: index, } });
                    return [4 /*yield*/, Jsonarch.apply(__assign(__assign({}, entry), { path: Jsonarch.makeFullRefer(entry.path, "loop"), template: entry.template.loop, scope: scope }))];
                case 2:
                    current = _d.sent();
                    if (!Jsonarch.isLoopResultData(current)) {
                        throw new Jsonarch.ErrorJson(entry, "Unknown Lopp Result", {
                            result: current,
                        });
                    }
                    if (true !== ((_c = current.continue) !== null && _c !== void 0 ? _c : true) || undefined === current.return) {
                        return [3 /*break*/, 3];
                    }
                    result.push(current.return);
                    ++index;
                    return [3 /*break*/, 1];
                case 3: return [2 /*return*/, result];
            }
        });
    }); }); };
    Jsonarch.evaluateLoopResultType = function (entry) { return Jsonarch.profile(entry, "evaluateLoopResultType", function () { return __awaiter(_this, void 0, void 0, function () {
        var loopType, result;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0: return [4 /*yield*/, Jsonarch.typeOfResult(__assign(__assign({}, entry), { path: Jsonarch.makeFullRefer(entry.path, "loop") }), entry.template.loop)];
                case 1:
                    loopType = _c.sent();
                    result = {
                        $arch: "type",
                        type: "array",
                        itemType: Jsonarch.getMemberType(loopType, "return"),
                    };
                    return [2 /*return*/, result];
            }
        });
    }); }); };
    Jsonarch.makeParameter = function (entry) { return __awaiter(_this, void 0, void 0, function () {
        var _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    if (!(undefined === entry.template.parameter)) return [3 /*break*/, 1];
                    _c = undefined;
                    return [3 /*break*/, 3];
                case 1: return [4 /*yield*/, Jsonarch.lazyableApply(__assign(__assign({}, entry), { path: Jsonarch.makeFullRefer(entry.path, "parameter"), template: entry.template.parameter }))];
                case 2:
                    _c = _d.sent();
                    _d.label = 3;
                case 3: return [2 /*return*/, _c];
            }
        });
    }); };
    Jsonarch.isCallTemplateCache = Jsonarch.isObject({ template: Jsonarch.isTemplateData, parameter: Jsonarch.isJsonable, cacheKey: Jsonarch.isString, result: Jsonarch.isJsonable, });
    Jsonarch.makeCallCacheKey = function (template, parameter) { return Jsonarch.jsonStringify({ template: template, parameter: parameter, }); };
    Jsonarch.getTemplate = function (entry, systemOrTemplate, parameter) { return __awaiter(_this, void 0, void 0, function () {
        var _this = this;
        return __generator(this, function (_c) {
            return [2 /*return*/, Jsonarch.profile(entry, "getTemplate", function () { return __awaiter(_this, void 0, void 0, function () {
                    var template, useCache, liquid, _c, _d, cacheKey, result, parameterType_1, _e, types, type;
                    var _f, _g, _h, _j;
                    return __generator(this, function (_k) {
                        switch (_k.label) {
                            case 0:
                                template = Jsonarch.turnRefer(entry, __assign(__assign({}, library_json_1.default), { this: (_f = entry.this) === null || _f === void 0 ? void 0 : _f.template }), entry.template.refer, {
                                    template: entry.path,
                                }
                                // entry.originMap
                                );
                                if (!Jsonarch.isTemplateData(template)) return [3 /*break*/, 9];
                                if (!template.type) return [3 /*break*/, 7];
                                useCache = (_h = (_g = entry.template.cache) !== null && _g !== void 0 ? _g : template.cache) !== null && _h !== void 0 ? _h : false;
                                if (!("system" === systemOrTemplate || useCache)) return [3 /*break*/, 2];
                                _d = Jsonarch.makeSolid;
                                return [4 /*yield*/, Jsonarch.resolveLazy(entry, parameter !== null && parameter !== void 0 ? parameter : null)];
                            case 1:
                                _c = _d.apply(void 0, [_k.sent()]);
                                return [3 /*break*/, 3];
                            case 2:
                                _c = parameter;
                                _k.label = 3;
                            case 3:
                                liquid = _c;
                                cacheKey = useCache ? Jsonarch.makeCallCacheKey(entry.template.refer, liquid) : undefined;
                                if (undefined !== cacheKey) {
                                    result = (_j = entry.cache.call) === null || _j === void 0 ? void 0 : _j[cacheKey];
                                    if (undefined !== result) {
                                        return [2 /*return*/, { template: template, parameter: liquid, cacheKey: cacheKey, result: result, }];
                                    }
                                }
                                if (!Jsonarch.hasLazy(liquid)) return [3 /*break*/, 5];
                                return [4 /*yield*/, Jsonarch.typeOfResult(entry, liquid)];
                            case 4:
                                _e = _k.sent();
                                return [3 /*break*/, 6];
                            case 5:
                                _e = Jsonarch.typeOfJsonable(liquid);
                                _k.label = 6;
                            case 6:
                                parameterType_1 = _e;
                                types = Array.isArray(template.type) ? template.type : [template.type];
                                type = types.find(function (t) { return Jsonarch.isBaseOrEqual(Jsonarch.compareType(t.parameter, parameterType_1)); });
                                if (type) {
                                    return [2 /*return*/, { template: template, type: type, parameter: liquid, cacheKey: cacheKey }];
                                }
                                else {
                                    throw new Jsonarch.ErrorJson(entry, "Unmatch parameter type", {
                                        refer: entry.template.refer,
                                        type: {
                                            template: template.type,
                                            parameter: parameterType_1,
                                        },
                                        parameter: parameter,
                                    });
                                }
                                return [3 /*break*/, 8];
                            case 7: throw new Jsonarch.ErrorJson(entry, "Not found type define", {
                                refer: entry.template.refer,
                            });
                            case 8: return [3 /*break*/, 10];
                            case 9: throw new Jsonarch.ErrorJson(entry, "Not found template", {
                                refer: entry.template.refer,
                            });
                            case 10: return [2 /*return*/];
                        }
                    });
                }); })];
        });
    }); };
    Jsonarch.validateReturnType = function (entry, parameterInfo, result) {
        var parameter = parameterInfo.parameter;
        var parameterType = Jsonarch.isIntermediate(parameter) ? parameter.type : Jsonarch.typeOfJsonable(parameter);
        var resultType = Jsonarch.isIntermediate(result) ? result.type : Jsonarch.typeOfJsonable(result);
        var type = parameterInfo.type;
        var compareTypeResult = Jsonarch.compareType(type.return, resultType);
        if (Jsonarch.isBaseOrEqual(compareTypeResult)) {
            return result;
        }
        else {
            throw new Jsonarch.ErrorJson(entry, "Unmatch return type", {
                refer: entry.template.refer,
                compareTypeResult: compareTypeResult,
                type: {
                    template: type,
                    parameter: parameterType,
                    result: resultType,
                },
                parameter: parameter,
            });
        }
    };
    Jsonarch.UnmatchParameterTypeDefineError = function (entry, parameter) {
        return new Jsonarch.ErrorJson(entry, "Internal Error ( Unmatch parameter type define )", {
            parameter: parameter,
        });
    };
    Jsonarch.library = {
        object: {
            typeOf: function (_entry, parameter) {
                return Jsonarch.typeOfJsonable(parameter);
            },
            equal: function (_entry, parameter) {
                if (Jsonarch.isArray(Jsonarch.isAny)(parameter) && 2 === parameter.length) {
                    return parameter[0] === parameter[1];
                }
                return undefined;
            }
        },
        array: {
            contain: function (_entry, parameter) {
                if (isTuple(Jsonarch.isArray(Jsonarch.isAny), Jsonarch.isAny)(parameter)) {
                    return parameter[0].includes(parameter[1]);
                }
                return undefined;
            }
        },
        boolean: {
            not: function (_entry, parameter) {
                if (Jsonarch.isBoolean(parameter)) {
                    return !parameter;
                }
                return undefined;
            },
            or: function (_entry, parameter) {
                if (Jsonarch.isArray(Jsonarch.isBoolean)(parameter)) {
                    return parameter.some(function (i) { return i; });
                }
                return undefined;
            },
            and: function (_entry, parameter) {
                if (Jsonarch.isArray(Jsonarch.isBoolean)(parameter)) {
                    return parameter.every(function (i) { return i; });
                }
                return undefined;
            },
            xor: function (_entry, parameter) {
                if (Jsonarch.isArray(Jsonarch.isBoolean)(parameter) && 2 === parameter.length) {
                    return parameter[0] !== parameter[1];
                }
                return undefined;
            },
        },
        number: {
            compare: function (entry, parameter) {
                if (Jsonarch.isArray(Jsonarch.isNumber)(parameter) && 2 === parameter.length) {
                    if (parameter[0] < parameter[1]) {
                        return "<";
                    }
                    if (parameter[0] === parameter[1]) {
                        return "=";
                    }
                    if (parameter[0] > parameter[1]) {
                        return ">";
                    }
                    throw new Jsonarch.ErrorJson(entry, "never", {
                        parameter: parameter,
                    });
                }
                return undefined;
            },
            sum: function (_entry, parameter) {
                if (Jsonarch.isArray(Jsonarch.isNumber)(parameter)) {
                    return parameter.reduce(function (a, b) { return a + b; }, 0);
                }
                return undefined;
            },
            remainder: function (_entry, parameter) {
                if (isTuple(Jsonarch.isNumber, Jsonarch.isNumber)(parameter)) {
                    return parameter[0] % parameter[1];
                }
                return undefined;
            }
        },
        string: {
            join: function (_entry, parameter) {
                if (Jsonarch.isArray(Jsonarch.isString)(parameter)) {
                    return parameter.join("");
                }
                else if (Jsonarch.isObject({ list: Jsonarch.isArray(Jsonarch.isString), separator: Jsonarch.isString, })(parameter)) {
                    return parameter.list.join(parameter.separator);
                }
                return undefined;
            },
        }
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
            var aHasUnmatch = aEnum.some(function (i) { return !bEnum.includes(i); });
            var bHasUnmatch = bEnum.some(function (i) { return !aEnum.includes(i); });
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
            var aHasUnmatch = aNeverEnum.some(function (i) { return !bNeverEnum.includes(i); });
            var bHasUnmatch = bNeverEnum.some(function (i) { return !aNeverEnum.includes(i); });
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
    Jsonarch.getMinValue = function (value) {
        var _c, _d, _e;
        return Jsonarch.isRangeNumberValueTypeData(value) ? value.minValue :
            Jsonarch.isEnumNumberValueTypeData(value) && 0 < ((_d = (_c = value.enum) === null || _c === void 0 ? void 0 : _c.length) !== null && _d !== void 0 ? _d : 0) ? Math.min.apply(Math, (_e = value.enum) !== null && _e !== void 0 ? _e : []) :
                undefined;
    };
    Jsonarch.getMaxValue = function (value) {
        var _c, _d, _e;
        return Jsonarch.isRangeNumberValueTypeData(value) ? value.maxValue :
            Jsonarch.isEnumNumberValueTypeData(value) && 0 < ((_d = (_c = value.enum) === null || _c === void 0 ? void 0 : _c.length) !== null && _d !== void 0 ? _d : 0) ? Math.max.apply(Math, (_e = value.enum) !== null && _e !== void 0 ? _e : []) :
                undefined;
    };
    Jsonarch.compareTypeMinValue = function (a, b) {
        var aMinValue = Jsonarch.getMinValue(a);
        var bMinValue = Jsonarch.getMinValue(b);
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
        var aMaxValue = Jsonarch.getMaxValue(a);
        var bMaxValue = Jsonarch.getMaxValue(b);
        if (aMaxValue === bMaxValue) {
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
    Jsonarch.asIntegerOnly = function (type) {
        var _c;
        if (Jsonarch.isRangeNumberValueTypeData(type)) {
            return (_c = type.integerOnly) !== null && _c !== void 0 ? _c : false;
        }
        else if (Jsonarch.isEnumNumberValueTypeData(type) && type.enum) {
            return type.enum.every(function (i) { return i === Math.floor(i); });
        }
        return false;
    };
    Jsonarch.compareTypeIntegerOnly = function (a, b) {
        var aIntegerOnly = Jsonarch.asIntegerOnly(a);
        var bIntegerOnly = Jsonarch.asIntegerOnly(b);
        if (aIntegerOnly === bIntegerOnly) {
            return "equal";
        }
        else if (aIntegerOnly) {
            return "extended";
        }
        else if (bIntegerOnly) {
            return "base";
        }
        else {
            // throw new ErrorJson({ $arch: "error", message: "Unreachable xxx", }); の方が望ましい。
            return "unmatch";
        }
    };
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
        var commonMemberList = aMemberList.filter(function (a) { return bMemberList.includes(a); });
        var aOnlyMemberList = aMemberList.filter(function (a) { return !commonMemberList.includes(a); });
        var bOnlyMemberList = bMemberList.filter(function (b) { return !commonMemberList.includes(b); });
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
        if (resultList.every(function (i) { return "equal" === i; }) && Jsonarch.isOrCompositeTypeData(b) && a.list.length === b.list.length) {
            return "equal";
        }
        if (resultList.some(function (i) { return Jsonarch.isBaseOrEqual(i); })) {
            return "base";
        }
        if (resultList.every(function (i) { return Jsonarch.isEqualOrExtented(i); })) {
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
        Jsonarch.compareTypeIntegerOnly,
    ]);
    Jsonarch.compareStringValueType = Jsonarch.compositeCompareType([
        Jsonarch.compareTypeOptional,
        Jsonarch.compareTypeEnum,
        Jsonarch.compareTypeNeverEnum,
        Jsonarch.compareTypeFormat,
        Jsonarch.compareTypeMinMaxLength,
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
        else if (Jsonarch.isAnyTypeData(a) && !Jsonarch.isAnyTypeData(b)) {
            return "base";
        }
        else if (!Jsonarch.isAnyTypeData(a) && Jsonarch.isAnyTypeData(b)) {
            return "extended";
        }
        else if (Jsonarch.isAnyTypeData(a) && Jsonarch.isAnyTypeData(b)) {
            return "equal";
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
                result.enum = aEnum.filter(function (i) { return bEnum.includes(i); });
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
                    result.neverEnum = aNeverEnum_1.concat(bNeverEnum.filter(function (i) { return !aNeverEnum_1.includes(i); }));
                }
            }
            var neverEnum_1 = result.neverEnum;
            if (undefined !== neverEnum_1) {
                if (undefined !== result.enum) {
                    result.enum = result.enum.filter(function (i) { return !neverEnum_1.includes(i); });
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
        Jsonarch.andTypeMinMaxLength,
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
    Jsonarch.turnRefer = function (entry, root, refer, sourceMap) {
        var rest = refer.map(function (i) { return i; });
        var current = root;
        while (true) {
            if (rest.length <= 0) {
                return current;
            }
            if (Jsonarch.isIntermediate(current)) {
                current = current.value;
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
                throw new Jsonarch.ErrorJson(entry, "Unmatch refer path", {
                    refer: refer,
                    sourceMap: sourceMap,
                    root: Jsonarch.toJsonable(root),
                });
            }
        }
    };
    Jsonarch.resolveRefer = function (entry) {
        return Jsonarch.turnRefer(entry, {
            template: entry.cache.template,
            type: entry.cache.type,
            value: entry.cache.value,
            scope: entry.scope,
            parameter: entry.parameter,
        }, entry.template.refer, {
            template: entry.path,
        }
        // entry.originMap
        );
    };
    Jsonarch.evaluateCall = function (entry) { return Jsonarch.profile(entry, "evaluateCall", function () { return __awaiter(_this, void 0, void 0, function () {
        var parameter, path, nextDepthEntry, target;
        var _this = this;
        var _c, _d, _e;
        return __generator(this, function (_f) {
            switch (_f.label) {
                case 0:
                    Limit.throwIfOverTheCallDepth(entry);
                    return [4 /*yield*/, Jsonarch.makeParameter(entry)];
                case 1:
                    parameter = (_c = _f.sent()) !== null && _c !== void 0 ? _c : null;
                    path = Jsonarch.resolveThisPath((_d = entry.this) === null || _d === void 0 ? void 0 : _d.path, {
                        root: entry.context.template,
                        refer: entry.template.refer,
                    });
                    nextDepthEntry = __assign(__assign({}, Limit.resetNestDepth(entry, entry.template.refer.length)), { callStack: Jsonarch.makeCallStack(entry.callStack, {
                            path: path,
                            parameter: parameter,
                            caller: entry.path,
                        }), path: path });
                    target = Jsonarch.turnRefer(entry, __assign(__assign({}, Jsonarch.library), { this: (_e = entry.this) === null || _e === void 0 ? void 0 : _e.template, template: entry.cache.template }), entry.template.refer, {
                        template: entry.path,
                    }
                    // entry.originMap
                    );
                    if (!("function" === typeof target)) return [3 /*break*/, 3];
                    return [4 /*yield*/, Jsonarch.profile(nextDepthEntry, "evaluateCall.library", function () { return __awaiter(_this, void 0, void 0, function () {
                            var parameterInfo, result;
                            var _this = this;
                            return __generator(this, function (_c) {
                                switch (_c.label) {
                                    case 0: return [4 /*yield*/, Jsonarch.getTemplate(nextDepthEntry, "system", parameter)];
                                    case 1:
                                        parameterInfo = _c.sent();
                                        if (Jsonarch.isCallTemplateCache(parameterInfo)) {
                                            return [2 /*return*/, parameterInfo.result];
                                        }
                                        return [4 /*yield*/, Jsonarch.profile(nextDepthEntry, "library.".concat(entry.template.refer.join(".")), function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_c) {
                                                switch (_c.label) {
                                                    case 0: return [4 /*yield*/, target(nextDepthEntry, parameterInfo.parameter)];
                                                    case 1: return [2 /*return*/, _c.sent()];
                                                }
                                            }); }); })];
                                    case 2:
                                        result = _c.sent();
                                        if (undefined === result) {
                                            throw Jsonarch.UnmatchParameterTypeDefineError(nextDepthEntry, parameterInfo.parameter);
                                        }
                                        Jsonarch.validateReturnType(nextDepthEntry, parameterInfo, result);
                                        if (undefined !== parameterInfo.cacheKey) {
                                            if (undefined === entry.cache.call) {
                                                entry.cache.call = {};
                                            }
                                            entry.cache.call[parameterInfo.cacheKey] = result;
                                        }
                                        return [2 /*return*/, result];
                                }
                            });
                        }); })];
                case 2: return [2 /*return*/, _f.sent()];
                case 3:
                    if (!Jsonarch.isTemplateData(target)) return [3 /*break*/, 5];
                    return [4 /*yield*/, Jsonarch.profile(nextDepthEntry, "evaluateCall.template", function () { return __awaiter(_this, void 0, void 0, function () {
                            var parameterInfo, result;
                            return __generator(this, function (_c) {
                                switch (_c.label) {
                                    case 0: return [4 /*yield*/, Jsonarch.getTemplate(nextDepthEntry, "template", parameter)];
                                    case 1:
                                        parameterInfo = _c.sent();
                                        if (Jsonarch.isCallTemplateCache(parameterInfo)) {
                                            return [2 /*return*/, parameterInfo.result];
                                        }
                                        return [4 /*yield*/, Jsonarch.evaluateTemplate(__assign(__assign({}, nextDepthEntry), { template: target, parameter: parameterInfo.parameter }))];
                                    case 2:
                                        result = _c.sent();
                                        if (undefined !== parameterInfo.cacheKey) {
                                            if (undefined === entry.cache.call) {
                                                entry.cache.call = {};
                                            }
                                            entry.cache.call[parameterInfo.cacheKey] = result;
                                        }
                                        return [2 /*return*/, result];
                                }
                            });
                        }); })];
                case 4: return [2 /*return*/, _f.sent()];
                case 5: throw new Jsonarch.ErrorJson(entry, "Unknown refer call", {
                    refer: entry.template.refer,
                });
            }
        });
    }); }); };
    Jsonarch.evaluateCallResultType = function (entry) { return Jsonarch.profile(entry, "evaluateCallResultType", function () { return __awaiter(_this, void 0, void 0, function () {
        var parameter, path, nextDepthEntry, functionTemplate, type, parameterType_2, types, compareTypeResult, match;
        var _c, _d, _e;
        return __generator(this, function (_f) {
            switch (_f.label) {
                case 0:
                    Limit.throwIfOverTheCallDepth(entry);
                    return [4 /*yield*/, Jsonarch.makeParameter(entry)];
                case 1:
                    parameter = (_c = _f.sent()) !== null && _c !== void 0 ? _c : null;
                    path = Jsonarch.resolveThisPath((_d = entry.this) === null || _d === void 0 ? void 0 : _d.path, {
                        root: entry.context.template,
                        refer: entry.template.refer,
                    });
                    nextDepthEntry = __assign(__assign({}, Limit.resetNestDepth(entry, entry.template.refer.length)), { callStack: Jsonarch.makeCallStack(entry.callStack, {
                            path: path,
                            parameter: parameter,
                            caller: entry.path,
                        }), path: path });
                    functionTemplate = Jsonarch.turnRefer(entry, __assign(__assign({}, library_json_1.default), { this: (_e = entry.this) === null || _e === void 0 ? void 0 : _e.template, template: entry.cache.template }), entry.template.refer, {
                        template: entry.path,
                    }
                    // entry.originMap
                    );
                    if (!Jsonarch.isTemplateData(functionTemplate)) return [3 /*break*/, 5];
                    type = functionTemplate.type;
                    if (!type) return [3 /*break*/, 3];
                    return [4 /*yield*/, Jsonarch.typeOfResult(nextDepthEntry, parameter)];
                case 2:
                    parameterType_2 = _f.sent();
                    types = Array.isArray(type) ? type : [type];
                    compareTypeResult = types.map(function (t) { return ({ return: t.return, compareTypeResult: Jsonarch.compareType(t.parameter, parameterType_2) }); });
                    match = compareTypeResult.find(function (r) { return Jsonarch.isBaseOrEqual(r.compareTypeResult); });
                    if (match) {
                        return [2 /*return*/, match.return];
                    }
                    else {
                        throw new Jsonarch.ErrorJson(entry, "Unmatch parameter type", {
                            refer: entry.template.refer,
                            compareTypeResult: compareTypeResult,
                            type: {
                                template: type,
                                parameter: parameterType_2,
                            },
                            parameter: parameter,
                        });
                    }
                    return [3 /*break*/, 4];
                case 3: throw new Jsonarch.ErrorJson(entry, "Not found type define", {
                    refer: entry.template.refer,
                });
                case 4: return [3 /*break*/, 6];
                case 5: throw new Jsonarch.ErrorJson(entry, "Not found template", {
                    refer: entry.template.refer,
                });
                case 6: return [2 /*return*/];
            }
        });
    }); }); };
    Jsonarch.typeOfResult = function (entry, json) { return __awaiter(_this, void 0, void 0, function () {
        var _this = this;
        return __generator(this, function (_c) {
            return [2 /*return*/, Jsonarch.profile(entry, "typeOfResult", function () { return __awaiter(_this, void 0, void 0, function () {
                    var member, keys, _c, _d, _e, i, key, _f, _g;
                    var _h;
                    return __generator(this, function (_j) {
                        switch (_j.label) {
                            case 0:
                                if (!(undefined === json)) return [3 /*break*/, 1];
                                return [2 /*return*/, { $arch: "type", type: "never", }];
                            case 1:
                                if (!(null === json)) return [3 /*break*/, 2];
                                return [2 /*return*/, { $arch: "type", type: "null", }];
                            case 2:
                                if (!("boolean" === typeof json)) return [3 /*break*/, 3];
                                return [2 /*return*/, { $arch: "type", type: "boolean", enum: [json,], }];
                            case 3:
                                if (!("number" === typeof json)) return [3 /*break*/, 4];
                                if (isNaN(json) || (!isFinite(json))) {
                                    return [2 /*return*/, { $arch: "type", type: "null", }];
                                }
                                else {
                                    return [2 /*return*/, { $arch: "type", type: "number", enum: [json,], }];
                                }
                                return [3 /*break*/, 17];
                            case 4:
                                if (!("string" === typeof json)) return [3 /*break*/, 5];
                                return [2 /*return*/, { $arch: "type", type: "string", enum: [json,], }];
                            case 5:
                                if (!Array.isArray(json)) return [3 /*break*/, 7];
                                _h = { $arch: "type", type: "tuple" };
                                return [4 /*yield*/, Promise.all(json.map(function (i) { return Jsonarch.typeOfResult(entry, i); }))];
                            case 6: return [2 /*return*/, (_h.list = _j.sent(), _h)];
                            case 7:
                                if (!("object" === typeof json)) return [3 /*break*/, 17];
                                if (!Jsonarch.isIntermediate(json)) return [3 /*break*/, 8];
                                return [2 /*return*/, json.type];
                            case 8:
                                if (!Jsonarch.isLazy(json)) return [3 /*break*/, 12];
                                if (!Jsonarch.isEvaluateEntry(Jsonarch.isJsonable)(entry)) return [3 /*break*/, 10];
                                return [4 /*yield*/, Jsonarch.evaluateLazyResultType(entry, json)];
                            case 9: return [2 /*return*/, _j.sent()];
                            case 10:
                                console.log(Jsonarch.getJsonableErrors(entry, "entry"));
                                throw new Jsonarch.ErrorJson(undefined, "never: Lazy in Loading", Jsonarch.toJsonable(entry));
                            case 11: return [3 /*break*/, 17];
                            case 12:
                                member = {};
                                keys = Jsonarch.objectKeys(json);
                                _c = [];
                                for (_d in keys)
                                    _c.push(_d);
                                _e = 0;
                                _j.label = 13;
                            case 13:
                                if (!(_e < _c.length)) return [3 /*break*/, 16];
                                i = _c[_e];
                                key = keys[i];
                                _f = member;
                                _g = key;
                                return [4 /*yield*/, Jsonarch.typeOfResult(entry, json[key])];
                            case 14:
                                _f[_g] = _j.sent();
                                _j.label = 15;
                            case 15:
                                _e++;
                                return [3 /*break*/, 13];
                            case 16: return [2 /*return*/, { $arch: "type", type: "object", member: member, }];
                            case 17: 
                            // else
                            // if ("function" === typeof json)
                            // {
                            //     return { $arch: "type", type: "function", };
                            // }
                            // else
                            // {
                            return [2 /*return*/, { $arch: "type", type: "never", }];
                        }
                    });
                }); })];
        });
    }); };
    Jsonarch.evaluateValue = function (entry) { return Jsonarch.profile(entry, "evaluateValue", function () { return __awaiter(_this, void 0, void 0, function () {
        var result;
        return __generator(this, function (_c) {
            result = Jsonarch.resolveRefer(entry);
            if (undefined === result) {
                throw new Jsonarch.ErrorJson(entry, "Unknown refer value", {
                    value: entry.template,
                });
            }
            return [2 /*return*/, result];
        });
    }); }); };
    Jsonarch.evaluateValueResultType = function (entry) { return Jsonarch.profile(entry, "evaluateValueResultType", function () { return __awaiter(_this, void 0, void 0, function () {
        var result;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    if (entry.template.type) {
                        return [2 /*return*/, entry.template.type];
                    }
                    result = Jsonarch.resolveRefer(entry);
                    if (undefined === result) {
                        throw new Jsonarch.ErrorJson(entry, "Unknown refer value", {
                            value: entry.template,
                        });
                    }
                    return [4 /*yield*/, Jsonarch.typeOfResult(entry, result)];
                case 1: return [2 /*return*/, _c.sent()];
            }
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
        Jsonarch.evaluateIfMatch(Jsonarch.isMatchData, Jsonarch.evaluateMatch),
        Jsonarch.evaluateIfMatch(Jsonarch.isLoopData, Jsonarch.evaluateLoop),
        Jsonarch.evaluateIfMatch(Jsonarch.isCallData, Jsonarch.evaluateCall),
        Jsonarch.evaluateIfMatch(Jsonarch.isValueData, Jsonarch.evaluateValue),
    ];
    Jsonarch.evaluate = function (entry) { return Jsonarch.profile(entry, "evaluate", function () { return __awaiter(_this, void 0, void 0, function () {
        var _c, _d, _e, i, result;
        return __generator(this, function (_f) {
            switch (_f.label) {
                case 0:
                    if (!Jsonarch.isIntermediate(entry.template)) return [3 /*break*/, 2];
                    return [4 /*yield*/, Jsonarch.apply(__assign(__assign({}, entry), { template: entry.template.value }))];
                case 1: return [2 /*return*/, _f.sent()];
                case 2:
                    _c = [];
                    for (_d in evaluatorList)
                        _c.push(_d);
                    _e = 0;
                    _f.label = 3;
                case 3:
                    if (!(_e < _c.length)) return [3 /*break*/, 6];
                    i = _c[_e];
                    return [4 /*yield*/, evaluatorList[i](entry)];
                case 4:
                    result = _f.sent();
                    if (undefined !== result) {
                        return [2 /*return*/, result];
                    }
                    _f.label = 5;
                case 5:
                    _e++;
                    return [3 /*break*/, 3];
                case 6: throw new Jsonarch.ErrorJson(entry, "Unknown Jsonarch Type", {
                    template: entry.template,
                });
            }
        });
    }); }); };
    Jsonarch.evaluateResultTypeIfMatch = function (isMatch, evaluateTarget) {
        return function (entry) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_c) {
            return [2 /*return*/, isMatch(entry.template) ? evaluateTarget(entry) : undefined];
        }); }); };
    };
    var evaluatorResultTypeList = [
        Jsonarch.evaluateResultTypeIfMatch(Jsonarch.isStaticData, Jsonarch.evaluateStaticResultType),
        Jsonarch.evaluateResultTypeIfMatch(Jsonarch.isIncludeStaticJsonData, Jsonarch.evaluateIncludeStaticJsonResultType),
        Jsonarch.evaluateResultTypeIfMatch(Jsonarch.isTemplateData, Jsonarch.evaluateTemplateResultType),
        Jsonarch.evaluateResultTypeIfMatch(Jsonarch.isMatchData, Jsonarch.evaluateMatchResultType),
        Jsonarch.evaluateResultTypeIfMatch(Jsonarch.isLoopData, Jsonarch.evaluateLoopResultType),
        Jsonarch.evaluateResultTypeIfMatch(Jsonarch.isCallData, Jsonarch.evaluateCallResultType),
        Jsonarch.evaluateResultTypeIfMatch(Jsonarch.isValueData, Jsonarch.evaluateValueResultType),
    ];
    Jsonarch.evaluateType = function (entry) { return Jsonarch.profile(entry, "evaluateResultType", function () { return __awaiter(_this, void 0, void 0, function () {
        var _c, _d, _e, i, result;
        return __generator(this, function (_f) {
            switch (_f.label) {
                case 0:
                    if (!Jsonarch.isIntermediate(entry.template)) return [3 /*break*/, 1];
                    return [2 /*return*/, entry.template.type];
                case 1:
                    _c = [];
                    for (_d in evaluatorResultTypeList)
                        _c.push(_d);
                    _e = 0;
                    _f.label = 2;
                case 2:
                    if (!(_e < _c.length)) return [3 /*break*/, 5];
                    i = _c[_e];
                    return [4 /*yield*/, evaluatorResultTypeList[i](entry)];
                case 3:
                    result = _f.sent();
                    if (undefined !== result) {
                        return [2 /*return*/, result];
                    }
                    _f.label = 4;
                case 4:
                    _e++;
                    return [3 /*break*/, 2];
                case 5: throw new Jsonarch.ErrorJson(entry, "Unknown Jsonarch Type", {
                    template: entry.template,
                });
            }
        });
    }); }); };
    Jsonarch.getLazyTemplate = function (entry, lazy) {
        var _c;
        return Jsonarch.turnRefer(entry, (_c = entry.cache.json) === null || _c === void 0 ? void 0 : _c[lazy.path.root.path], Jsonarch.toLeafFullRefer(lazy.path).refer);
    };
    Jsonarch.evaluateLazy = function (entry, lazy) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_c) {
        switch (_c.label) {
            case 0: return [4 /*yield*/, Jsonarch.apply(Jsonarch.restoreFromLazy(entry, lazy))];
            case 1: return [2 /*return*/, _c.sent()];
        }
    }); }); };
    Jsonarch.evaluateLazyResultType = function (entry, lazy) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_c) {
        switch (_c.label) {
            case 0: return [4 /*yield*/, Jsonarch.evaluateType(Jsonarch.restoreFromLazy(entry, lazy))];
            case 1: return [2 /*return*/, _c.sent()];
        }
    }); }); };
    var Limit;
    (function (Limit) {
        Limit.getProcessTimeout = function (entry) {
            var _c, _d, _e;
            return (_e = (_d = (_c = entry.setting.limit) === null || _c === void 0 ? void 0 : _c.processTimeout) !== null && _d !== void 0 ? _d : setting_json_1.default.limit.processTimeout) !== null && _e !== void 0 ? _e : 1000;
        };
        Limit.getMaxCallNestDepth = function (entry) {
            var _c, _d, _e;
            return (_e = (_d = (_c = entry.setting.limit) === null || _c === void 0 ? void 0 : _c.maxCallNestDepth) !== null && _d !== void 0 ? _d : setting_json_1.default.limit.maxCallNestDepth) !== null && _e !== void 0 ? _e : 16;
        };
        Limit.getMaxArrayLength = function (entry) {
            var _c, _d, _e;
            return (_e = (_d = (_c = entry.setting.limit) === null || _c === void 0 ? void 0 : _c.maxArrayLength) !== null && _d !== void 0 ? _d : setting_json_1.default.limit.maxArrayLength) !== null && _e !== void 0 ? _e : 1000;
        };
        Limit.getMaxObjectNestDepth = function (entry) {
            var _c, _d, _e;
            return (_e = (_d = (_c = entry.setting.limit) === null || _c === void 0 ? void 0 : _c.maxObjectNestDepth) !== null && _d !== void 0 ? _d : setting_json_1.default.limit.maxObjectNestDepth) !== null && _e !== void 0 ? _e : 32;
        };
        Limit.getMaxObjectMembers = function (entry) {
            var _c, _d, _e;
            return (_e = (_d = (_c = entry.setting.limit) === null || _c === void 0 ? void 0 : _c.maxObjectMembers) !== null && _d !== void 0 ? _d : setting_json_1.default.limit.maxObjectMembers) !== null && _e !== void 0 ? _e : 32;
        };
        Limit.throwIfOverTheProcessTimeout = function (entry) {
            var processTimeout = Limit.getProcessTimeout(entry);
            var now = Jsonarch.getTicks();
            var elapsed = now - entry.context.profile.startAt;
            if (processTimeout < elapsed) {
                throw new Jsonarch.ErrorJson(entry, "Process Timeout", {
                    processTimeout: processTimeout,
                    elapsed: elapsed,
                });
            }
        };
        Limit.throwIfOverTheNestDepth = function (entry) {
            var _c;
            var maxObjectNestDepth = Limit.getMaxObjectNestDepth(entry);
            var nestDepth = (_c = entry.context.nestDepth) !== null && _c !== void 0 ? _c : 0;
            if (maxObjectNestDepth < nestDepth) {
                throw new Jsonarch.ErrorJson(entry, "Too Deep Object Nest", {
                    maxObjectNestDepth: maxObjectNestDepth,
                    nestDepth: nestDepth,
                });
            }
        };
        Limit.throwIfOverTheCallDepth = function (entry) {
            var maxCallNestDepth = Limit.getMaxCallNestDepth(entry);
            var callDepth = entry.callStack.length;
            if (maxCallNestDepth < callDepth) {
                throw new Jsonarch.ErrorJson(entry, "Too Deep Call Nest", {
                    maxCallNestDepth: maxCallNestDepth,
                    callDepth: callDepth,
                });
            }
        };
        Limit.resetNestDepth = function (entry, nestDepth) {
            if (nestDepth === void 0) { nestDepth = 0; }
            return (__assign(__assign({}, entry), { context: __assign(__assign({}, entry.context), { nestDepth: nestDepth }) }));
        };
        Limit.incrementNestDepth = function (entry) { var _c; return Limit.resetNestDepth(entry, ((_c = entry.context.nestDepth) !== null && _c !== void 0 ? _c : 0) + 1); };
    })(Limit = Jsonarch.Limit || (Jsonarch.Limit = {}));
    Jsonarch.apply = function (entry, lazyable) {
        if (lazyable === void 0) { lazyable = false; }
        return Jsonarch.profile(entry, "apply", function () { return __awaiter(_this, void 0, void 0, function () {
            var template, result, result;
            var _this = this;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        Limit.throwIfOverTheProcessTimeout(entry);
                        Limit.throwIfOverTheNestDepth(entry);
                        template = entry.template;
                        if (!(null === template || "object" !== typeof template)) return [3 /*break*/, 2];
                        result = template;
                        return [4 /*yield*/, Jsonarch.makeIntermediate(entry, result, entry.path)];
                    case 1: return [2 /*return*/, _c.sent()];
                    case 2:
                        if (!Jsonarch.isEvaluateTargetEntry(entry)) return [3 /*break*/, 5];
                        return [4 /*yield*/, Jsonarch.profile(entry, "apply.evaluate", function () { return __awaiter(_this, void 0, void 0, function () {
                                var _c;
                                var _this = this;
                                return __generator(this, function (_d) {
                                    switch (_d.label) {
                                        case 0:
                                            if (!(lazyable && Jsonarch.isLazyableEvaluateTargetEntry(entry))) return [3 /*break*/, 2];
                                            return [4 /*yield*/, Jsonarch.profile(entry, "apply.makeLazy", function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_c) {
                                                    return [2 /*return*/, Jsonarch.jsonParse(Jsonarch.jsonStringify(Jsonarch.makeLazy(entry)))];
                                                }); }); })];
                                        case 1:
                                            _c = _d.sent();
                                            return [3 /*break*/, 4];
                                        case 2: 
                                        // <Jsonable><unknown>(async () => await evaluate(entry)):
                                        // await evaluate(entry):
                                        return [4 /*yield*/, Jsonarch.evaluate(entry)];
                                        case 3:
                                            // <Jsonable><unknown>(async () => await evaluate(entry)):
                                            // await evaluate(entry):
                                            _c = _d.sent();
                                            _d.label = 4;
                                        case 4: return [2 /*return*/, _c];
                                    }
                                });
                            }); })];
                    case 3:
                        result = _c.sent();
                        return [4 /*yield*/, Jsonarch.makeIntermediate(entry, result, entry.path)];
                    case 4: return [2 /*return*/, _c.sent()];
                    case 5:
                        if (!Array.isArray(template)) return [3 /*break*/, 7];
                        return [4 /*yield*/, Jsonarch.profile(entry, "apply.array", function () { return __awaiter(_this, void 0, void 0, function () {
                                var maxArrayLength, nextDepthEntry, result, _c, _d, _e, i, ix, _f, _g;
                                return __generator(this, function (_h) {
                                    switch (_h.label) {
                                        case 0:
                                            maxArrayLength = Limit.getMaxArrayLength(entry);
                                            if (maxArrayLength < template.length) {
                                                throw new Jsonarch.ErrorJson(entry, "Too Long Array Length", {
                                                    maxArrayLength: maxArrayLength,
                                                    templateLength: template.length,
                                                });
                                            }
                                            nextDepthEntry = Limit.incrementNestDepth(entry);
                                            result = [];
                                            _c = [];
                                            for (_d in template)
                                                _c.push(_d);
                                            _e = 0;
                                            _h.label = 1;
                                        case 1:
                                            if (!(_e < _c.length)) return [3 /*break*/, 4];
                                            i = _c[_e];
                                            ix = parseInt(i);
                                            _g = (_f = result).push;
                                            return [4 /*yield*/, Jsonarch.apply(__assign(__assign({}, nextDepthEntry), { path: Jsonarch.makeFullRefer(entry.path, ix), template: template[ix] }), lazyable)];
                                        case 2:
                                            _g.apply(_f, [_h.sent()]);
                                            _h.label = 3;
                                        case 3:
                                            _e++;
                                            return [3 /*break*/, 1];
                                        case 4: return [4 /*yield*/, Jsonarch.makeIntermediate(entry, result, entry.path)];
                                        case 5: return [2 /*return*/, _h.sent()];
                                    }
                                });
                            }); })];
                    case 6: return [2 /*return*/, _c.sent()];
                    case 7: return [4 /*yield*/, Jsonarch.profile(entry, "apply.object", function () { return __awaiter(_this, void 0, void 0, function () {
                            var result, maxObjectMembers, nextDepthEntry, keys, _c, _d, _e, i, key, _f, _g;
                            return __generator(this, function (_h) {
                                switch (_h.label) {
                                    case 0:
                                        result = {};
                                        maxObjectMembers = Limit.getMaxObjectMembers(entry);
                                        if (maxObjectMembers < Jsonarch.objectKeys(template).length) {
                                            throw new Jsonarch.ErrorJson(entry, "Too Many Object Members", {
                                                maxObjectMembers: maxObjectMembers,
                                                templateMembers: Jsonarch.objectKeys(template).length,
                                            });
                                        }
                                        nextDepthEntry = Limit.incrementNestDepth(entry);
                                        keys = Jsonarch.objectKeys(template);
                                        _c = [];
                                        for (_d in keys)
                                            _c.push(_d);
                                        _e = 0;
                                        _h.label = 1;
                                    case 1:
                                        if (!(_e < _c.length)) return [3 /*break*/, 4];
                                        i = _c[_e];
                                        key = keys[i];
                                        _f = result;
                                        _g = key;
                                        return [4 /*yield*/, Jsonarch.apply(__assign(__assign({}, nextDepthEntry), { path: Jsonarch.makeFullRefer(entry.path, key), template: template[key] }), lazyable)];
                                    case 2:
                                        _f[_g] = _h.sent();
                                        _h.label = 3;
                                    case 3:
                                        _e++;
                                        return [3 /*break*/, 1];
                                    case 4: return [4 /*yield*/, Jsonarch.makeIntermediate(entry, result, entry.path)];
                                    case 5: return [2 /*return*/, _h.sent()];
                                }
                            });
                        }); })];
                    case 8: return [2 /*return*/, _c.sent()];
                }
            });
        }); });
    };
    Jsonarch.lazyableApply = function (entry) { var _c, _d; return Jsonarch.apply(entry, (_d = (_c = entry.setting.process) === null || _c === void 0 ? void 0 : _c.lazyEvaluation) !== null && _d !== void 0 ? _d : true); };
    Jsonarch.applyRootOriginal = function (entry, template, parameter, cache, setting, lazy) { return Jsonarch.profile(entry, "applyRoot", function () { return __awaiter(_this, void 0, void 0, function () {
        var handler, context, callStack, path, rootEvaluateEntry, output, _c, _d, _e, _f, profile_1, result, error_2, profile_2, result;
        return __generator(this, function (_g) {
            switch (_g.label) {
                case 0:
                    handler = entry.handler;
                    context = {
                        template: entry.template,
                        paremter: entry.parameter,
                        cache: entry.cache,
                        setting: entry.setting,
                        profile: Jsonarch.makeProfile(),
                    };
                    callStack = [];
                    path = { root: entry.template, refer: [] };
                    rootEvaluateEntry = {
                        context: context,
                        template: template,
                        callStack: callStack,
                        path: path,
                        // origin,
                        parameter: parameter,
                        cache: cache,
                        setting: setting,
                        handler: handler,
                        originMap: (entry.parameter ?
                            ({
                                paremter: {
                                    root: entry.parameter,
                                    refer: "root",
                                },
                            }) :
                            undefined),
                    };
                    _g.label = 1;
                case 1:
                    _g.trys.push([1, 7, , 8]);
                    _c = Jsonarch.decode;
                    if (!("resolveLazy" === lazy)) return [3 /*break*/, 4];
                    _e = Jsonarch.resolveLazy;
                    _f = [rootEvaluateEntry];
                    return [4 /*yield*/, Jsonarch.apply(rootEvaluateEntry)];
                case 2: return [4 /*yield*/, _e.apply(void 0, _f.concat([_g.sent()]))];
                case 3:
                    _d = _g.sent();
                    return [3 /*break*/, 6];
                case 4: return [4 /*yield*/, Jsonarch.apply(rootEvaluateEntry)];
                case 5:
                    _d = _g.sent();
                    _g.label = 6;
                case 6:
                    output = _c.apply(void 0, [_d]);
                    profile_1 = Jsonarch.makeProfileReport(context.profile);
                    result = {
                        $arch: "result",
                        output: output,
                        profile: profile_1,
                        cache: cache,
                        setting: setting,
                    };
                    return [2 /*return*/, result];
                case 7:
                    error_2 = _g.sent();
                    profile_2 = Jsonarch.makeProfileReport(context.profile);
                    result = {
                        $arch: "result",
                        output: Jsonarch.parseErrorJson(error_2),
                        profile: profile_2,
                        cache: cache,
                        setting: setting,
                    };
                    return [2 /*return*/, result];
                case 8: return [2 /*return*/];
            }
        });
    }); }); };
    Jsonarch.applyRootNew = function (entry, template, parameter, cache, setting, lazy) { return Jsonarch.profile(entry, "applyRoot", function () { return __awaiter(_this, void 0, void 0, function () {
        var handler, context, callStack, path, bootEvaluateEntry, intermediateTemplate, rootEvaluateEntry, _c, output, originMap, _d, _e, _f, _g, profile_3, result, error_3, profile_4, result;
        return __generator(this, function (_h) {
            switch (_h.label) {
                case 0:
                    handler = entry.handler;
                    context = {
                        template: entry.template,
                        paremter: entry.parameter,
                        cache: entry.cache,
                        setting: entry.setting,
                        profile: Jsonarch.makeProfile(),
                    };
                    callStack = [];
                    path = { root: entry.template, refer: [] };
                    bootEvaluateEntry = {
                        context: context,
                        template: template,
                        callStack: callStack,
                        path: path,
                        // origin,
                        parameter: parameter,
                        cache: cache,
                        setting: setting,
                        handler: handler,
                        originMap: (entry.parameter ?
                            ({
                                paremter: {
                                    root: entry.parameter,
                                    refer: "root",
                                },
                            }) :
                            undefined),
                    };
                    return [4 /*yield*/, Jsonarch.makeIntermediate(bootEvaluateEntry, template, entry.template)];
                case 1:
                    intermediateTemplate = _h.sent();
                    rootEvaluateEntry = __assign(__assign({}, bootEvaluateEntry), { template: intermediateTemplate });
                    _h.label = 2;
                case 2:
                    _h.trys.push([2, 8, , 9]);
                    _d = Jsonarch.makeOutput;
                    if (!("resolveLazy" === lazy)) return [3 /*break*/, 5];
                    _f = Jsonarch.resolveLazy;
                    _g = [rootEvaluateEntry];
                    return [4 /*yield*/, Jsonarch.apply(rootEvaluateEntry)];
                case 3: return [4 /*yield*/, _f.apply(void 0, _g.concat([_h.sent()]))];
                case 4:
                    _e = _h.sent();
                    return [3 /*break*/, 7];
                case 5: return [4 /*yield*/, Jsonarch.apply(rootEvaluateEntry)];
                case 6:
                    _e = _h.sent();
                    _h.label = 7;
                case 7:
                    _c = _d.apply(void 0, [_e, entry.template]), output = _c.output, originMap = _c.originMap;
                    profile_3 = Jsonarch.makeProfileReport(context.profile);
                    result = {
                        $arch: "result",
                        output: Jsonarch.decode(output),
                        originMap: originMap,
                        profile: profile_3,
                        cache: cache,
                        setting: setting,
                    };
                    return [2 /*return*/, result];
                case 8:
                    error_3 = _h.sent();
                    profile_4 = Jsonarch.makeProfileReport(context.profile);
                    result = {
                        $arch: "result",
                        output: Jsonarch.parseErrorJson(error_3),
                        profile: profile_4,
                        cache: cache,
                        setting: setting,
                    };
                    return [2 /*return*/, result];
                case 9: return [2 /*return*/];
            }
        });
    }); }); };
    // export const applyRoot = applyRootOriginal;
    Jsonarch.applyRoot = Jsonarch.applyRootNew;
    Jsonarch.process = function (entry) { return __awaiter(_this, void 0, void 0, function () {
        var handler, emptyCache, cache, _c, settingFileContext, settingResult, _d, _e, setting, parameterResult, _f, _g, _h, parameter, template;
        var _j, _k;
        return __generator(this, function (_l) {
            switch (_l.label) {
                case 0:
                    handler = entry.handler;
                    emptyCache = { "$arch": "cache" };
                    if (!entry.cache) return [3 /*break*/, 2];
                    return [4 /*yield*/, Jsonarch.load({ context: entry, cache: emptyCache, setting: boot_setting_json_1.default, handler: handler, file: entry.cache })];
                case 1:
                    _c = _l.sent();
                    return [3 /*break*/, 3];
                case 2:
                    _c = emptyCache;
                    _l.label = 3;
                case 3:
                    cache = _c;
                    settingFileContext = (_j = entry.setting) !== null && _j !== void 0 ? _j : Jsonarch.getSystemFileContext("default-setting.json");
                    _d = Jsonarch.applyRoot;
                    _e = [{
                            handler: handler,
                            template: settingFileContext,
                            cache: entry.cache,
                            setting: Jsonarch.getSystemFileContext("boot-setting.json"),
                            profile: Jsonarch.makeProfile(),
                        }];
                    return [4 /*yield*/, Jsonarch.load({ context: entry, cache: cache, setting: boot_setting_json_1.default, handler: handler, file: settingFileContext })];
                case 4: return [4 /*yield*/, _d.apply(void 0, _e.concat([_l.sent(), null,
                        cache,
                        boot_setting_json_1.default,
                        "resolveLazy"]))];
                case 5:
                    settingResult = _l.sent();
                    if (Jsonarch.isError(settingResult.output)) {
                        return [2 /*return*/, settingResult];
                    }
                    setting = (_k = settingResult.output) !== null && _k !== void 0 ? _k : { "$arch": "setting", };
                    if (!entry.parameter) return [3 /*break*/, 8];
                    _g = Jsonarch.applyRoot;
                    _h = [{
                            handler: handler,
                            template: entry.parameter,
                            cache: entry.cache,
                            setting: settingFileContext,
                            profile: Jsonarch.makeProfile(),
                        }];
                    return [4 /*yield*/, Jsonarch.load({ context: entry, cache: cache, setting: setting, handler: handler, file: entry.parameter })];
                case 6: return [4 /*yield*/, _g.apply(void 0, _h.concat([_l.sent(), null,
                        cache,
                        setting]))];
                case 7:
                    _f = _l.sent();
                    return [3 /*break*/, 9];
                case 8:
                    _f = undefined;
                    _l.label = 9;
                case 9:
                    parameterResult = _f;
                    parameter = parameterResult === null || parameterResult === void 0 ? void 0 : parameterResult.output;
                    if (parameterResult && Jsonarch.isError(parameterResult.output)) {
                        return [2 /*return*/, parameterResult];
                    }
                    return [4 /*yield*/, Jsonarch.load({ context: entry, cache: cache, setting: setting, handler: handler, file: entry.template })];
                case 10:
                    template = _l.sent();
                    return [4 /*yield*/, Jsonarch.applyRoot(entry, template, parameter, cache, setting, "resolveLazy")];
                case 11: return [2 /*return*/, _l.sent()];
            }
        });
    }); };
    Jsonarch.encode = Jsonarch.structure(function (json, key) {
        return "$arch" === key && "string" === typeof json ? "$" + json : json;
    });
    Jsonarch.decode = Jsonarch.structure(function (json, key) {
        return "$arch" === key && "string" === typeof json && json.startsWith("$") ? json.substring(1) : json;
    });
    Jsonarch.toLineArrayOrAsIs = function (text) {
        return 0 <= text.indexOf("\n") ? text.split("\n") : text;
    };
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
            if (Jsonarch.objectValues(json).some(function (i) { return Jsonarch.isJsonableObject(i) || Array.isArray(i) || 60 < JSON.stringify(i).length; })) {
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
            if (json.some(function (i) { return Jsonarch.isJsonableObject(i) || Array.isArray(i) || 60 < JSON.stringify(i).length; })) {
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
    Jsonarch.digest = function (json, setting, nestDepth) {
        var _c, _d;
        var digestSetting = (_c = setting.outputFormat) === null || _c === void 0 ? void 0 : _c.digest;
        var minTargetSize = ((_d = digestSetting === null || digestSetting === void 0 ? void 0 : digestSetting.minTargetSize) !== null && _d !== void 0 ? _d : 0);
        var isFirstDepth = (nestDepth !== null && nestDepth !== void 0 ? nestDepth : 0) <= 0;
        if (digestSetting && (!isFirstDepth || minTargetSize <= 0 || minTargetSize < Jsonarch.jsonStringify(json).length)) {
            var nextNestDepth = (nestDepth !== null && nestDepth !== void 0 ? nestDepth : 0) + 1;
            if (Array.isArray(json)) {
                if (digestSetting.maxObjectNestDepth && digestSetting.maxObjectNestDepth < nextNestDepth) {
                    return "@digest: cliped array ( items: ".concat(json.length, " )");
                }
                else {
                    var result = [];
                    if (isFirstDepth) {
                        result.push({ $digest: true });
                    }
                    if (digestSetting.maxArrayLength && digestSetting.maxArrayLength < json.length) {
                        for (var i = 0; i < Math.ceil(digestSetting.maxArrayLength / 2); ++i) {
                            result.push(Jsonarch.digest(json[i], setting, nextNestDepth));
                        }
                        result.push("@digest: cliped items ( ".concat(json.length - digestSetting.maxArrayLength, " )"));
                        for (var i = json.length - Math.floor(digestSetting.maxArrayLength / 2); i < json.length; ++i) {
                            result.push(Jsonarch.digest(json[i], setting, nextNestDepth));
                        }
                    }
                    else {
                        for (var i in json) {
                            result.push(Jsonarch.digest(json[i], setting, nextNestDepth));
                        }
                    }
                    return result;
                }
            }
            else if (null !== json && "object" === typeof json) {
                if (digestSetting.maxObjectNestDepth && digestSetting.maxObjectNestDepth < nextNestDepth) {
                    return "@digest: cliped object ( ".concat(JSON.stringify(json).substring(0, 32), "... )");
                }
                else {
                    var result = {};
                    if (isFirstDepth) {
                        result["$digest"] = true;
                    }
                    var keys = Jsonarch.objectKeys(json);
                    if (digestSetting.maxObjectMembers && digestSetting.maxObjectMembers < keys.length) {
                        for (var i = 0; i < Math.ceil(digestSetting.maxObjectMembers / 2); ++i) {
                            var key = keys[i];
                            result[key] = Jsonarch.digest(json[key], setting, nextNestDepth);
                        }
                        result["@digest"] = "@digest: cliped members ( ".concat(keys.length - digestSetting.maxObjectMembers, " )");
                        for (var i = keys.length - Math.floor(digestSetting.maxObjectMembers / 2); i < keys.length; ++i) {
                            var key = keys[i];
                            result[key] = Jsonarch.digest(json[key], setting, nextNestDepth);
                        }
                    }
                    else {
                        for (var i in keys) {
                            var key = keys[i];
                            result[key] = Jsonarch.digest(json[key], setting, nextNestDepth);
                        }
                    }
                    return result;
                }
            }
            if ("string" === typeof json && digestSetting.maxStringLength && digestSetting.maxStringLength < json.length) {
                return "@digest: cliped string ( ".concat(JSON.stringify(json.substring(0, digestSetting.maxStringLength)), "... )");
            }
            else {
                return json;
            }
        }
        else {
            return json;
        }
    };
    Jsonarch.jsonToString = function (json, asType, setting) {
        var _c, _d, _e, _f;
        var digested = Jsonarch.digest(json, setting);
        var indent = (_d = (_c = setting.outputFormat) === null || _c === void 0 ? void 0 : _c.indent) !== null && _d !== void 0 ? _d : "smart";
        if ("output" === asType && ((_e = setting.outputFormat) === null || _e === void 0 ? void 0 : _e.text) && "string" === typeof digested) {
            return digested;
        }
        else if ("output" === asType && ((_f = setting.outputFormat) === null || _f === void 0 ? void 0 : _f.text) && Array.isArray(digested) && digested.every(function (line) { return "string" === typeof line; })) {
            return digested.join("\n");
        }
        else if ("number" === typeof indent) {
            return Jsonarch.jsonStringify(digested, undefined, indent);
        }
        else if ("tab" === indent) {
            return Jsonarch.jsonStringify(digested, undefined, "\t");
        }
        else if ("smart" === indent) {
            return Jsonarch.smartJsonStringify(digested, 4);
        }
        else {
            // "minify" === indent
            return Jsonarch.jsonStringify(digested);
        }
    };
    Jsonarch.throwIfError = function (json) {
        if (Jsonarch.isError(json)) {
            throw new Error("json:".concat(Jsonarch.jsonStringify(json)));
        }
        return json;
    };
})(Jsonarch = exports.Jsonarch || (exports.Jsonarch = {}));
//# sourceMappingURL=index.js.map