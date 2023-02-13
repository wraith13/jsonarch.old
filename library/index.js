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
            var result_2;
            var _this = this;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (!Array.isArray(value)) return [3 /*break*/, 2];
                        return [4 /*yield*/, Promise.all(value.map(function (i, ix) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_c) {
                                switch (_c.label) {
                                    case 0: return [4 /*yield*/, self(i, ix)];
                                    case 1: return [2 /*return*/, _c.sent()];
                                }
                            }); }); }))];
                    case 1: return [2 /*return*/, _c.sent()];
                    case 2:
                        if (!(null !== value && "object" === typeof value)) return [3 /*break*/, 4];
                        result_2 = {};
                        return [4 /*yield*/, Promise.all(Jsonarch.objectKeys(value).map(function (key) { return __awaiter(_this, void 0, void 0, function () { var _c, _d; return __generator(this, function (_e) {
                                switch (_e.label) {
                                    case 0:
                                        _c = result_2;
                                        _d = key;
                                        return [4 /*yield*/, self(value[key], key)];
                                    case 1: return [2 /*return*/, _c[_d] = _e.sent()];
                                }
                            }); }); }))];
                    case 3:
                        _c.sent();
                        return [2 /*return*/, result_2];
                    case 4: return [4 /*yield*/, processor(value, key)];
                    case 5: return [2 /*return*/, _c.sent()];
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
                    var result_3 = {};
                    Jsonarch.objectKeys(value).forEach(function (key) { return result_3[key] = self(value[key], key); });
                    return result_3;
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
            var processed, result_4;
            var _this = this;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (!Array.isArray(value)) return [3 /*break*/, 2];
                        return [4 /*yield*/, Promise.all(value.map(function (i, ix) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_c) {
                                switch (_c.label) {
                                    case 0: return [4 /*yield*/, self(i, ix)];
                                    case 1: return [2 /*return*/, _c.sent()];
                                }
                            }); }); }))];
                    case 1: return [2 /*return*/, _c.sent()];
                    case 2:
                        if (!(null !== value && "object" === typeof value)) return [3 /*break*/, 7];
                        return [4 /*yield*/, processor(value, key)];
                    case 3:
                        processed = _c.sent();
                        if (!(undefined !== processed)) return [3 /*break*/, 4];
                        return [2 /*return*/, processed];
                    case 4:
                        result_4 = {};
                        return [4 /*yield*/, Promise.all(Jsonarch.objectKeys(value).map(function (key) { return __awaiter(_this, void 0, void 0, function () { var _c, _d; return __generator(this, function (_e) {
                                switch (_e.label) {
                                    case 0:
                                        _c = result_4;
                                        _d = key;
                                        return [4 /*yield*/, self(value[key], key)];
                                    case 1: return [2 /*return*/, _c[_d] = _e.sent()];
                                }
                            }); }); }))];
                    case 5:
                        _c.sent();
                        return [2 /*return*/, result_4];
                    case 6: return [3 /*break*/, 8];
                    case 7: return [2 /*return*/, value];
                    case 8: return [2 /*return*/];
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
    Jsonarch.jsonStringify = function (source, replacer, space) {
        return JSON.stringify(source, replacer, space);
    };
    Jsonarch.jsonParse = function (text, reviver) {
        return JSON.parse(text, reviver);
    };
    Jsonarch.isJsonableValue = function (value) {
        return null === value || ["boolean", "number", "string"].includes(typeof value);
    };
    Jsonarch.isJsonableObject = function (value) {
        return null !== value &&
            "object" === typeof value &&
            !Array.isArray(value) &&
            Jsonarch.objectValues(value).every(function (i) { return undefined === i || Jsonarch.isJsonable(i); });
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
            var result_5 = {};
            Jsonarch.objectKeys(value).forEach(function (key) {
                var v = value[key];
                if (undefined !== v) {
                    if ("shallow" === shallowOrDeep) {
                        result_5[key] = v;
                    }
                    else {
                        result_5[key] = Jsonarch.regulateJsonable(v, shallowOrDeep);
                    }
                }
            });
            return result_5;
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
                    var result_6 = {};
                    Jsonarch.objectKeys(value).forEach(function (key) {
                        if (undefined !== value[key]) {
                            result_6[key] = Jsonarch.toJsonable(value[key], maxDepth, currentDepth + 1);
                        }
                    });
                    return result_6;
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
    Jsonarch.isIntermediate = Jsonarch.isJsonarch("intermediate");
    Jsonarch.isIntermediateTargetObject = function (isMember) {
        return function (value) {
            return Jsonarch.isIntermediate(value) &&
                Jsonarch.objectKeys(isMember).every(function (key) { return isMember[key](value.value[key]); });
        };
    };
    Jsonarch.isIntermediateTargetValue = function (isType) {
        return function (value) {
            return Jsonarch.isIntermediate(value) && isType(value.value);
        };
    };
    Jsonarch.isIntermediateJsonarch = function (template) {
        return Jsonarch.isIntermediate(template) &&
            null !== template.value &&
            "object" === typeof template.value &&
            "$arch" in template.value && "string" === typeof template.value.$arch.value;
    };
    Jsonarch.getIntermediateJsonarchType = function (template) {
        return Jsonarch.isIntermediateJsonarch(template) ? template.value.$arch.value : undefined;
    };
    Jsonarch.isIntermediateJsonarchTarget = function (type) {
        return function (template) {
            return type === Jsonarch.getIntermediateJsonarchType(template);
        };
    };
    Jsonarch.makeOutput = function (intermediate, base) {
        var originMap = [];
        if (Jsonarch.isIntermediate(intermediate)) {
            originMap.push({
                origin: intermediate.origin,
                derivative: base,
            });
            // originMap[jsonStringify(base)] = intermediate.origin;
        }
        var value = Jsonarch.getValueFromIntermediateOrValue(intermediate);
        if (Array.isArray(value)) {
            var output = [];
            for (var i in value) {
                var ix = parseInt(i);
                var v = value[ix];
                var r = Jsonarch.makeOutput(v, Jsonarch.makeOrigin(base, ix));
                output.push(r.output);
                originMap.push.apply(originMap, r.originMap);
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
                    originMap.push.apply(originMap, r.originMap);
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
    Jsonarch.makeInputIntermediate = function (entry, target, origin) { return __awaiter(_this, void 0, void 0, function () {
        var value, result_7, _c, _d, _e, _f, i, ix, v, _g, _h, result_8, keys, _j, _k, _l, _m, i, key, v, _o, _p, result;
        var _q;
        return __generator(this, function (_r) {
            switch (_r.label) {
                case 0:
                    if (!Jsonarch.isIntermediate(target)) return [3 /*break*/, 1];
                    return [2 /*return*/, target];
                case 1:
                    value = void 0;
                    if (!Array.isArray(target)) return [3 /*break*/, 6];
                    result_7 = [];
                    _c = target;
                    _d = [];
                    for (_e in _c)
                        _d.push(_e);
                    _f = 0;
                    _r.label = 2;
                case 2:
                    if (!(_f < _d.length)) return [3 /*break*/, 5];
                    _e = _d[_f];
                    if (!(_e in _c)) return [3 /*break*/, 4];
                    i = _e;
                    ix = parseInt(i);
                    v = target[ix];
                    _h = (_g = result_7).push;
                    return [4 /*yield*/, Jsonarch.makeInputIntermediate(entry, v, Jsonarch.makeOrigin(origin, ix))];
                case 3:
                    _h.apply(_g, [_r.sent()]);
                    _r.label = 4;
                case 4:
                    _f++;
                    return [3 /*break*/, 2];
                case 5:
                    value = result_7;
                    return [3 /*break*/, 12];
                case 6:
                    if (!(null !== target && "object" === typeof target)) return [3 /*break*/, 11];
                    result_8 = {};
                    keys = Jsonarch.objectKeys(target);
                    _j = keys;
                    _k = [];
                    for (_l in _j)
                        _k.push(_l);
                    _m = 0;
                    _r.label = 7;
                case 7:
                    if (!(_m < _k.length)) return [3 /*break*/, 10];
                    _l = _k[_m];
                    if (!(_l in _j)) return [3 /*break*/, 9];
                    i = _l;
                    key = keys[i];
                    v = target[key];
                    _o = result_8;
                    _p = key;
                    return [4 /*yield*/, Jsonarch.makeInputIntermediate(entry, v, Jsonarch.makeOrigin(origin, key))];
                case 8:
                    _o[_p] = _r.sent();
                    _r.label = 9;
                case 9:
                    _m++;
                    return [3 /*break*/, 7];
                case 10:
                    value = result_8;
                    return [3 /*break*/, 12];
                case 11:
                    value = target;
                    _r.label = 12;
                case 12:
                    _q = {
                        $arch: "intermediate"
                    };
                    return [4 /*yield*/, Jsonarch.typeOfInput(entry, value)];
                case 13:
                    result = (_q.type = _r.sent(),
                        _q.value = value,
                        _q.origin = origin,
                        _q);
                    return [2 /*return*/, result];
            }
        });
    }); };
    Jsonarch.makeOutputIntermediate = function (entry, target, origin) { return __awaiter(_this, void 0, void 0, function () {
        var _this = this;
        return __generator(this, function (_c) {
            return [2 /*return*/, Jsonarch.profile(entry, "makeOutputIntermediate", function () { return __awaiter(_this, void 0, void 0, function () {
                    var value, result_9, _c, _d, _e, _f, i, ix, v, _g, _h, result_10, keys, _j, _k, _l, _m, i, key, v, _o, _p, result;
                    var _q;
                    return __generator(this, function (_r) {
                        switch (_r.label) {
                            case 0:
                                if (!Jsonarch.isIntermediate(target)) return [3 /*break*/, 1];
                                return [2 /*return*/, target];
                            case 1:
                                value = void 0;
                                if (!Array.isArray(target)) return [3 /*break*/, 6];
                                result_9 = [];
                                _c = target;
                                _d = [];
                                for (_e in _c)
                                    _d.push(_e);
                                _f = 0;
                                _r.label = 2;
                            case 2:
                                if (!(_f < _d.length)) return [3 /*break*/, 5];
                                _e = _d[_f];
                                if (!(_e in _c)) return [3 /*break*/, 4];
                                i = _e;
                                ix = parseInt(i);
                                v = target[ix];
                                _h = (_g = result_9).push;
                                return [4 /*yield*/, Jsonarch.makeOutputIntermediate(entry, v, Jsonarch.makeOrigin(origin, ix))];
                            case 3:
                                _h.apply(_g, [_r.sent()]);
                                _r.label = 4;
                            case 4:
                                _f++;
                                return [3 /*break*/, 2];
                            case 5:
                                value = result_9;
                                return [3 /*break*/, 12];
                            case 6:
                                if (!(null !== target && "object" === typeof target)) return [3 /*break*/, 11];
                                result_10 = {};
                                keys = Jsonarch.objectKeys(target);
                                _j = keys;
                                _k = [];
                                for (_l in _j)
                                    _k.push(_l);
                                _m = 0;
                                _r.label = 7;
                            case 7:
                                if (!(_m < _k.length)) return [3 /*break*/, 10];
                                _l = _k[_m];
                                if (!(_l in _j)) return [3 /*break*/, 9];
                                i = _l;
                                key = keys[i];
                                v = target[key];
                                _o = result_10;
                                _p = key;
                                return [4 /*yield*/, Jsonarch.makeOutputIntermediate(entry, v, Jsonarch.makeOrigin(origin, key))];
                            case 8:
                                _o[_p] = _r.sent();
                                _r.label = 9;
                            case 9:
                                _m++;
                                return [3 /*break*/, 7];
                            case 10:
                                value = result_10;
                                return [3 /*break*/, 12];
                            case 11:
                                value = target;
                                _r.label = 12;
                            case 12:
                                _q = {
                                    $arch: "intermediate"
                                };
                                return [4 /*yield*/, Jsonarch.typeOfResult(entry, target)];
                            case 13:
                                result = (_q.type = _r.sent(),
                                    _q.value = value,
                                    _q.origin = origin,
                                    _q);
                                return [2 /*return*/, result];
                        }
                    });
                }); })];
        });
    }); };
    Jsonarch.makeCallResultIntermediate = function (entry, refer, parameter, target) { return __awaiter(_this, void 0, void 0, function () {
        var _this = this;
        return __generator(this, function (_c) {
            return [2 /*return*/, Jsonarch.profile(entry, "makeCallResultIntermediate", function () { return __awaiter(_this, void 0, void 0, function () {
                    return __generator(this, function (_c) {
                        switch (_c.label) {
                            case 0:
                                if (!Jsonarch.isIntermediate(target)) return [3 /*break*/, 1];
                                return [2 /*return*/, target];
                            case 1: return [4 /*yield*/, Jsonarch.makeOutputIntermediate(entry, target, {
                                    root: entry.path.root,
                                    template: refer,
                                    parameter: parameter,
                                })];
                            case 2: return [2 /*return*/, _c.sent()];
                        }
                    });
                }); })];
        });
    }); };
    Jsonarch.makeSystemOrigin = function (systemLocation) {
        return ({
            root: Jsonarch.getSystemFileContext("jsonarch.arch.json"),
            refer: systemLocation !== null && systemLocation !== void 0 ? systemLocation : ["unknown"],
        });
    };
    Jsonarch.makeErrorIntermediate = function (entry, target) { return __awaiter(_this, void 0, void 0, function () {
        var _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    if (!Jsonarch.isEvaluateEntry(Jsonarch.isAny)(entry)) return [3 /*break*/, 2];
                    return [4 /*yield*/, Jsonarch.makeOutputIntermediate(entry, target, entry.path)];
                case 1:
                    _c = _d.sent();
                    return [3 /*break*/, 4];
                case 2: return [4 /*yield*/, Jsonarch.makeOutputIntermediate(entry, target, Jsonarch.makeSystemOrigin(Jsonarch.getReferFromSystemCallStack(Jsonarch.getContext(entry))))];
                case 3:
                    _c = _d.sent();
                    _d.label = 4;
                case 4: return [2 /*return*/, _c];
            }
        });
    }); };
    Jsonarch.getValueFromIntermediateOrValue = function (intermediateOrValue) {
        return Jsonarch.isIntermediate(intermediateOrValue) ? intermediateOrValue.value : intermediateOrValue;
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
    Jsonarch.isSystemFileType = isEnum([
        "jsonarch.arch.json",
        "boot-setting.json",
        "default-setting.json",
        "library.json"
    ]);
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
            if (Jsonarch.isSystemFileContext(context.process.template)) {
                throw new Error("makeFullPath({ templte:{ category: system }, },...)");
            }
            else if (Jsonarch.isNoneFileContext(context.process.template)) {
                throw new Error("makeFullPath({ templte:{ category: none }, },...)");
            }
            else {
                var parent_1 = context.process.template.path
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
            if (Jsonarch.isSystemFileContext(context.process.template)) {
                throw new Error("makeFullPath({ templte:{ category: system }, },...)");
            }
            else if (Jsonarch.isNoneFileContext(context.process.template)) {
                throw new Error("makeFullPath({ templte:{ category: none }, },...)");
            }
            else {
                return context.process.template.path.replace(/^(https?\:\/\/[^/]+\/).*$/, "$1") + path;
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
    Jsonarch.isProcess = Jsonarch.isObject({
        startAt: Jsonarch.isUndefinedOr(Jsonarch.isString),
        duration: Jsonarch.isUndefinedOr(Jsonarch.isNumber),
        template: Jsonarch.isFileContext,
        parameter: Jsonarch.isUndefinedOr(Jsonarch.isFileContext),
        cache: Jsonarch.isUndefinedOr(Jsonarch.isFileContext),
        setting: Jsonarch.isUndefinedOr(Jsonarch.isFileContext),
    });
    Jsonarch.isContext = Jsonarch.isObject({
        process: Jsonarch.isProcess,
        profile: Jsonarch.isProfile,
        nestDepth: Jsonarch.isUndefinedOr(Jsonarch.isNumber),
    });
    Jsonarch.getContext = function (contextOrEntry) {
        return Jsonarch.isContext(contextOrEntry) ? contextOrEntry : contextOrEntry.context;
    };
    Jsonarch.getReferFromSystemCallStack = function (context) {
        return context.profile.stack.map(function (i) { return i.scope; });
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
        return Jsonarch.isObject({ root: Jsonarch.isOriginRoot, template: Jsonarch.isRefer, parameter: Jsonarch.isIntermediate, originMap: Jsonarch.isUndefinedOr(Jsonarch.isOriginMap), })(value);
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
    Jsonarch.isOriginMapEntry = function (value) {
        return Jsonarch.isObject({ origin: isTypeOr(Jsonarch.isOrigin, Jsonarch.isOriginMap), derivative: Jsonarch.isOrigin, })(value);
    };
    Jsonarch.isOriginMap = function (value) {
        return Jsonarch.isArray(Jsonarch.isOriginMapEntry)(value);
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
            this: Jsonarch.isUndefinedOr(Jsonarch.isObject({ template: Jsonarch.isIntermediateJsonarchTarget("template"), path: Jsonarch.isFullRefer, })),
            template: isTemplateType,
            parameter: Jsonarch.isUndefinedOr(Jsonarch.isIntermediate),
            callStack: Jsonarch.isArray(Jsonarch.isCallStackEntry),
            path: Jsonarch.isFullRefer,
            scope: Jsonarch.isUndefinedOr(Jsonarch.isJsonableObject),
            cache: Jsonarch.isCache,
            setting: Jsonarch.isSetting,
            handler: Jsonarch.isHandler,
        });
    };
    Jsonarch.isLazy = Jsonarch.isJsonarch("lazy");
    Jsonarch.isIntermediateLazy = Jsonarch.isIntermediateJsonarchTarget("lazy");
    Jsonarch.makeLazy = function (entry) { return __awaiter(_this, void 0, void 0, function () {
        var _c;
        var _d;
        var _e;
        return __generator(this, function (_f) {
            switch (_f.label) {
                case 0:
                    _c = Jsonarch.regulateJsonable;
                    _d = {
                        $arch: "lazy"
                    };
                    return [4 /*yield*/, Jsonarch.evaluateResultType(entry)];
                case 1: return [2 /*return*/, _c.apply(void 0, [(_d.type = _f.sent(),
                            _d.thisPath = (_e = entry.this) === null || _e === void 0 ? void 0 : _e.path,
                            _d.parameter = entry.parameter,
                            _d.callStack = entry.callStack,
                            _d.path = entry.path,
                            _d.scope = entry.scope,
                            _d), "shallow"])];
            }
        });
    }); };
    Jsonarch.restoreThis = function (entry, lazy) { return __awaiter(_this, void 0, void 0, function () {
        var _this = this;
        return __generator(this, function (_c) {
            return [2 /*return*/, Jsonarch.profile(entry, "restoreThis", function () { return __awaiter(_this, void 0, void 0, function () {
                    var _c;
                    var _d;
                    var _e;
                    return __generator(this, function (_f) {
                        switch (_f.label) {
                            case 0:
                                if (!(undefined !== lazy.thisPath)) return [3 /*break*/, 2];
                                _d = {};
                                return [4 /*yield*/, Jsonarch.turnRefer(entry, (_e = entry.cache.json) === null || _e === void 0 ? void 0 : _e[lazy.thisPath.root.path], Jsonarch.toLeafFullRefer(lazy.thisPath).refer.filter(function (i) { return "this" !== i; }))];
                            case 1:
                                _c = (_d.template = (_f.sent()),
                                    _d.path = lazy.thisPath,
                                    _d);
                                return [3 /*break*/, 3];
                            case 2:
                                _c = undefined;
                                _f.label = 3;
                            case 3: return [2 /*return*/, (_c)];
                        }
                    });
                }); })];
        });
    }); };
    Jsonarch.restoreFromLazy = function (entry, lazy, solid) {
        if (solid === void 0) { solid = Jsonarch.makeSolid(lazy); }
        return __awaiter(_this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_c) {
                return [2 /*return*/, Jsonarch.profile(entry, "restoreFromLazy", function () { return __awaiter(_this, void 0, void 0, function () {
                        var _c;
                        var _d;
                        return __generator(this, function (_e) {
                            switch (_e.label) {
                                case 0:
                                    _c = [__assign({ context: entry.context }, solid)];
                                    _d = {};
                                    return [4 /*yield*/, Jsonarch.restoreThis(entry, solid)];
                                case 1:
                                    _d.this = _e.sent();
                                    return [4 /*yield*/, Jsonarch.getLazyTemplate(entry, solid)];
                                case 2: return [2 /*return*/, (__assign.apply(void 0, _c.concat([(_d.template = _e.sent(), _d.cache = entry.cache, _d.setting = entry.setting, _d.handler = entry.handler, _d)])))];
                            }
                        });
                    }); })];
            });
        });
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
                                                    if (!Jsonarch.isIntermediateLazy(value)) return [3 /*break*/, 3];
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
    Jsonarch.toErrorStatusFromEvaluateEntry = function (entry) {
        var _c;
        return ({
            this: (_c = entry.this) === null || _c === void 0 ? void 0 : _c.path,
            path: entry.path,
            // template: entry.template,
            parameter: entry.parameter,
            callStack: {
                template: entry.callStack,
                system: entry.context.profile.stack.map(function (i) { return ({ scope: i.scope, template: Jsonarch.jsonParse(i.template), }); }),
            },
            scope: entry.scope,
        });
    };
    var isPureDataType = function (type) {
        return ["setting", "cache",].includes(type);
    };
    Jsonarch.isEvaluateTargetEntry = function (entry) {
        var type = Jsonarch.getIntermediateJsonarchType(entry.template);
        return undefined !== type && !isPureDataType(type);
    };
    var isLazyableJsonarchType = function (type) {
        return ["call",].includes(type);
    };
    Jsonarch.isLazyableEvaluateTargetEntry = function (entry) {
        var type = Jsonarch.getIntermediateJsonarchType(entry.template);
        return undefined !== type && isLazyableJsonarchType(type);
    };
    Jsonarch.isResult = Jsonarch.isJsonarch("result");
    Jsonarch.isError = Jsonarch.isJsonarch("error");
    Jsonarch.isIntermediateError = Jsonarch.isIntermediateJsonarchTarget("error");
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
            status: undefinedable(Jsonarch.toErrorStatusFromEvaluateEntry)(Jsonarch.isEvaluateEntry(Jsonarch.isAny)(entry) ? entry : undefined),
        });
    };
    Jsonarch.ErrorJson = function (entry, message, detail) {
        return __awaiter(this, void 0, void 0, function () {
            var _c, _d, _e;
            return __generator(this, function (_f) {
                switch (_f.label) {
                    case 0:
                        _c = Error.bind;
                        _d = "json:".concat;
                        _e = Jsonarch.jsonStringify;
                        return [4 /*yield*/, Jsonarch.makeErrorIntermediate(entry, Jsonarch.makeError(entry, message, detail))];
                    case 1: return [2 /*return*/, new (_c.apply(Error, [void 0, _d.apply("json:", [_e.apply(void 0, [_f.sent()])])]))()];
                }
            });
        });
    };
    Jsonarch.parseErrorJson = function (entry, error) { return __awaiter(_this, void 0, void 0, function () {
        var result, result;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    if (!Jsonarch.isError(error)) return [3 /*break*/, 2];
                    return [4 /*yield*/, Jsonarch.makeErrorIntermediate(entry, error)];
                case 1: return [2 /*return*/, _c.sent()];
                case 2:
                    if (!Jsonarch.isIntermediateError(error)) return [3 /*break*/, 3];
                    return [2 /*return*/, error];
                case 3:
                    if (!(error instanceof Error)) return [3 /*break*/, 7];
                    if (!error.message.startsWith("json:")) return [3 /*break*/, 4];
                    return [2 /*return*/, Jsonarch.jsonParse(error.message.replace(/^json\:/, ""))];
                case 4:
                    result = {
                        $arch: "error",
                        message: "System Error",
                        detail: {
                            name: error.name,
                            message: error.message,
                            stack: undefinedable(Jsonarch.toLineArrayOrAsIs)(error.stack),
                        }
                    };
                    return [4 /*yield*/, Jsonarch.makeErrorIntermediate(entry, result)];
                case 5: return [2 /*return*/, _c.sent()];
                case 6: return [3 /*break*/, 9];
                case 7:
                    result = {
                        $arch: "error",
                        message: "Unknown Error",
                        detail: Jsonarch.toJsonable(error),
                    };
                    return [4 /*yield*/, Jsonarch.makeErrorIntermediate(entry, result)];
                case 8: return [2 /*return*/, _c.sent()];
                case 9: return [2 /*return*/];
            }
        });
    }); };
    Jsonarch.loadSystemJson = function (entry) { return Jsonarch.profile(entry, "loadSystemJson", function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    switch (entry.file.id) {
                        case "boot-setting.json":
                            return [2 /*return*/, boot_setting_json_1.default];
                        case "default-setting.json":
                            return [2 /*return*/, setting_json_1.default];
                    }
                    return [4 /*yield*/, new Jsonarch.ErrorJson(entry, "never")];
                case 1: throw _c.sent();
            }
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
        var json, result, json, result, cache, json, _c, result;
        var _d, _e;
        return __generator(this, function (_f) {
            switch (_f.label) {
                case 0:
                    if (!Jsonarch.isSystemFileLoadEntry(entry)) return [3 /*break*/, 3];
                    return [4 /*yield*/, Jsonarch.loadSystemJson(entry)];
                case 1:
                    json = _f.sent();
                    return [4 /*yield*/, Jsonarch.makeInputIntermediate(entry, json, entry.file)];
                case 2:
                    result = _f.sent();
                    return [2 /*return*/, result];
                case 3:
                    if (!Jsonarch.isNoneFileLoadEntry(entry)) return [3 /*break*/, 5];
                    json = entry.file.data;
                    return [4 /*yield*/, Jsonarch.makeInputIntermediate(entry, json, entry.file)];
                case 4:
                    result = _f.sent();
                    return [2 /*return*/, result];
                case 5:
                    if (!(Jsonarch.isNetFileLoadEntry(entry) || Jsonarch.isLocalFileLoadEntry(entry))) return [3 /*break*/, 8];
                    cache = (_e = (_d = entry.cache) === null || _d === void 0 ? void 0 : _d.json) === null || _e === void 0 ? void 0 : _e[entry.file.path];
                    if (undefined !== cache) {
                        return [2 /*return*/, cache];
                    }
                    if (!entry.cache) {
                        entry.cache = { $arch: "cache", };
                    }
                    if (!entry.cache.json) {
                        entry.cache.json = {};
                    }
                    _c = Jsonarch.jsonParse;
                    return [4 /*yield*/, Jsonarch.loadFile(entry)];
                case 6:
                    json = _c.apply(void 0, [_f.sent()]);
                    return [4 /*yield*/, Jsonarch.makeInputIntermediate(entry, json, entry.file)];
                case 7:
                    result = _f.sent();
                    entry.cache.json[entry.file.path] = result;
                    return [2 /*return*/, result];
                case 8: throw new Error("never");
            }
        });
    }); }); };
    Jsonarch.isStaticData = Jsonarch.isJsonarch("static");
    Jsonarch.isIntermediateStaticData = Jsonarch.isIntermediateJsonarchTarget("static");
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
    Jsonarch.isIntermediateIncludeStaticJsonData = Jsonarch.isIntermediateJsonarchTarget("include-static-json");
    Jsonarch.evaluateIncludeStaticJson = function (entry) { return Jsonarch.profile(entry, "evaluateIncludeStaticJson", function () { return __awaiter(_this, void 0, void 0, function () {
        var _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    _c = Jsonarch.encode;
                    return [4 /*yield*/, Jsonarch.loadFile(__assign(__assign({}, entry), { file: Jsonarch.pathToFileContext(entry, entry.template.value.path.value) }))];
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
                    return [4 /*yield*/, Jsonarch.loadFile(__assign(__assign({}, entry), { file: Jsonarch.pathToFileContext(entry, entry.template.value.path.value) }))];
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
    Jsonarch.isIntermediateTypeData = Jsonarch.isIntermediateJsonarchTarget("type");
    Jsonarch.isCallData = Jsonarch.isJsonarch("call");
    Jsonarch.isIntermediateCallData = Jsonarch.isIntermediateJsonarchTarget("call");
    Jsonarch.isValueData = Jsonarch.isJsonarch("value");
    Jsonarch.isIntermediateValueData = Jsonarch.isIntermediateJsonarchTarget("value");
    Jsonarch.typeOfJsonable = function (json) {
        if (Jsonarch.isIntermediate(json)) {
            return json.type;
        }
        else if (undefined === json) {
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
    Jsonarch.isIntermediateTemplateData = Jsonarch.isIntermediateJsonarchTarget("template");
    Jsonarch.isThrowData = Jsonarch.isJsonarch("throw");
    Jsonarch.isIntermediateThrowData = Jsonarch.isIntermediateJsonarchTarget("throw");
    Jsonarch.isMatchData = Jsonarch.isJsonarch("match");
    Jsonarch.isIntermediateMatchData = Jsonarch.isIntermediateJsonarchTarget("match");
    Jsonarch.isValueCasePattern = Jsonarch.isObject({ value: Jsonarch.isJsonable, });
    Jsonarch.isIntermediateValueCasePattern = Jsonarch.isIntermediateTargetObject({ value: Jsonarch.isIntermediate, });
    Jsonarch.isListCasePattern = Jsonarch.isObject({ list: Jsonarch.isArray(Jsonarch.isJsonable), });
    Jsonarch.isIntermediateListCasePattern = Jsonarch.isIntermediateTargetObject({ list: Jsonarch.isIntermediateTargetValue(Jsonarch.isArray(Jsonarch.isIntermediate)), });
    Jsonarch.isTypeCasePattern = Jsonarch.isObject({ type: Jsonarch.isTypeData, });
    Jsonarch.isIntermediateTypeCasePattern = Jsonarch.isIntermediateTargetObject({ type: Jsonarch.isIntermediateTypeData, });
    Jsonarch.isIfCasePattern = Jsonarch.isObject({ if: Jsonarch.isJsonable, });
    Jsonarch.isIntermediateIfCasePattern = Jsonarch.isIntermediateTargetObject({ if: Jsonarch.isIntermediate, });
    Jsonarch.isIfCaseCasePattern = function (value) { return Jsonarch.isObject({ ifCase: Jsonarch.isCasePattern, parameter: Jsonarch.isJsonable, })(value); };
    Jsonarch.isIntermediateIfCaseCasePattern = function (value) { return Jsonarch.isIntermediateTargetObject({ ifCase: Jsonarch.isIntermediateCasePattern, parameter: Jsonarch.isIntermediate, })(value); };
    Jsonarch.isNotCasePattern = function (value) { return Jsonarch.isObject({ not: Jsonarch.isCasePattern, })(value); };
    Jsonarch.isIntermediateNotCasePattern = function (value) { return Jsonarch.isIntermediateTargetObject({ not: Jsonarch.isIntermediateCasePattern, })(value); };
    Jsonarch.isOrCasePattern = function (value) { return Jsonarch.isObject({ or: Jsonarch.isArray(Jsonarch.isCasePattern), })(value); };
    Jsonarch.isIntermediateOrCasePattern = function (value) { return Jsonarch.isIntermediateTargetObject({ or: Jsonarch.isIntermediateTargetValue(Jsonarch.isArray(Jsonarch.isIntermediateCasePattern)), })(value); };
    Jsonarch.isAndCasePattern = function (value) { return Jsonarch.isObject({ and: Jsonarch.isArray(Jsonarch.isCasePattern), })(value); };
    Jsonarch.isIntermediateAndCasePattern = function (value) { return Jsonarch.isIntermediateTargetObject({ and: Jsonarch.isIntermediateTargetValue(Jsonarch.isArray(Jsonarch.isIntermediateCasePattern)), })(value); };
    Jsonarch.isCasePattern = isTypeOr(Jsonarch.isValueCasePattern, Jsonarch.isListCasePattern, Jsonarch.isTypeCasePattern, Jsonarch.isIfCasePattern, Jsonarch.isIfCaseCasePattern, Jsonarch.isNotCasePattern, Jsonarch.isOrCasePattern, Jsonarch.isAndCasePattern);
    Jsonarch.isIntermediateCasePattern = isTypeOr(Jsonarch.isIntermediateValueCasePattern, Jsonarch.isIntermediateListCasePattern, Jsonarch.isIntermediateTypeCasePattern, Jsonarch.isIntermediateIfCasePattern, Jsonarch.isIntermediateIfCaseCasePattern, Jsonarch.isIntermediateNotCasePattern, Jsonarch.isIntermediateOrCasePattern, Jsonarch.isIntermediateAndCasePattern);
    Jsonarch.isLoopData = Jsonarch.isJsonarch("loop");
    Jsonarch.isIntermediateLoopData = Jsonarch.isIntermediateJsonarchTarget("loop");
    // export const isLoopFalseResultData = isObject<LoopFalseResult>({ continue: isJustValue<false>(false), });
    // export const isLoopRegularResultData = isObject<LoopRegularResult>({ continue: isUndefinedOr(isBoolean), return: isJsonable, });
    // export const isLoopResultData = isTypeOr<LoopFalseResult, LoopRegularResult>(isLoopFalseResultData, isLoopRegularResultData);
    Jsonarch.isIntermediateLoopFalseResultData = Jsonarch.isIntermediateTargetObject({ continue: Jsonarch.isIntermediateTargetValue(Jsonarch.isJustValue(false)), });
    Jsonarch.isIntermediateLoopRegularResultData = Jsonarch.isIntermediateTargetObject({ continue: Jsonarch.isUndefinedOr(Jsonarch.isIntermediateTargetValue(Jsonarch.isBoolean)), return: Jsonarch.isIntermediate, });
    Jsonarch.isIntermediateLoopResultData = isTypeOr(Jsonarch.isIntermediateLoopFalseResultData, Jsonarch.isIntermediateLoopRegularResultData);
    // export const isChainData = isObject<Chain>({ $arch: isJustValue("chain"), list: isArray(isJsonable), });
    Jsonarch.isIntermediateChainData = Jsonarch.isIntermediateTargetObject({ $arch: Jsonarch.isIntermediateTargetValue(Jsonarch.isJustValue("chain")), list: Jsonarch.isIntermediateTargetValue(Jsonarch.isArray(Jsonarch.isIntermediate)), });
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
        var _c, _d, _e, _f, _g;
        return __generator(this, function (_h) {
            switch (_h.label) {
                case 0:
                    parameter = Jsonarch.applyDefault((_d = (_c = entry.template.value.default) === null || _c === void 0 ? void 0 : _c.value) === null || _d === void 0 ? void 0 : _d.parameter, entry.parameter, (_f = (_e = entry.template.value.override) === null || _e === void 0 ? void 0 : _e.value) === null || _f === void 0 ? void 0 : _f.parameter);
                    this_ = {
                        template: entry.template,
                        path: entry.this ?
                            Jsonarch.resolveThisPath(entry.this.path, entry.path) :
                            entry.path,
                    };
                    if (!((_g = entry.template.value.catch) === null || _g === void 0 ? void 0 : _g.value)) return [3 /*break*/, 7];
                    _h.label = 1;
                case 1:
                    _h.trys.push([1, 3, , 6]);
                    return [4 /*yield*/, Jsonarch.apply(__assign(__assign({}, entry), { this: this_, path: Jsonarch.makeFullRefer(entry.path, "return"), template: entry.template.value.return, parameter: parameter }))];
                case 2: return [2 /*return*/, _h.sent()];
                case 3:
                    error_1 = _h.sent();
                    if (!Jsonarch.isIntermediate(error_1)) return [3 /*break*/, 5];
                    return [4 /*yield*/, Jsonarch.evaluateCases(__assign(__assign({}, entry), { this: this_, path: Jsonarch.makeFullRefer(entry.path, "catch"), template: entry.template.value.catch, parameter: error_1 }))];
                case 4:
                    result = _h.sent();
                    if (undefined !== result) {
                        return [2 /*return*/, result];
                    }
                    _h.label = 5;
                case 5: throw error_1;
                case 6: return [3 /*break*/, 9];
                case 7: return [4 /*yield*/, Jsonarch.apply(__assign(__assign({}, entry), { this: this_, path: Jsonarch.makeFullRefer(entry.path, "return"), template: entry.template.value.return, parameter: parameter }))];
                case 8: return [2 /*return*/, _h.sent()];
                case 9: return [2 /*return*/];
            }
        });
    }); }); };
    Jsonarch.evaluateTemplateResultType = function (entry) { return Jsonarch.profile(entry, "evaluateTemplateResultType", function () { return __awaiter(_this, void 0, void 0, function () {
        var parameter, parameterType, type, types, i, t;
        var _c, _d, _e, _f;
        return __generator(this, function (_g) {
            switch (_g.label) {
                case 0:
                    parameter = Jsonarch.applyDefault((_d = (_c = entry.template.value.default) === null || _c === void 0 ? void 0 : _c.value) === null || _d === void 0 ? void 0 : _d.parameter, entry.parameter, (_f = (_e = entry.template.value.override) === null || _e === void 0 ? void 0 : _e.value) === null || _f === void 0 ? void 0 : _f.parameter);
                    return [4 /*yield*/, Jsonarch.typeOfResult(entry, parameter)];
                case 1:
                    parameterType = _g.sent();
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
    Jsonarch.evaluateThrow = function (entry) { return Jsonarch.profile(entry, "evaluateThrow", function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0: return [4 /*yield*/, Jsonarch.apply(__assign(__assign({}, entry), { path: Jsonarch.makeFullRefer(entry.path, "throw"), template: entry.template.value.throw }))];
                case 1: throw _c.sent();
            }
        });
    }); }); };
    Jsonarch.evaluateThrowResultType = function (entry) { return Jsonarch.profile(entry, "evaluateTemplateResultType", function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_c) {
        return [2 /*return*/, ({ $arch: "type", type: "never", })];
    }); }); }); };
    Jsonarch.evaluateMatch = function (entry) { return Jsonarch.profile(entry, "evaluateMatch", function () { return __awaiter(_this, void 0, void 0, function () {
        var parameter, _c, _d, _e, result;
        return __generator(this, function (_f) {
            switch (_f.label) {
                case 0:
                    _c = Jsonarch.applyDefault;
                    _d = [entry.template.value.default];
                    if (!(undefined !== entry.template.value.parameter)) return [3 /*break*/, 2];
                    return [4 /*yield*/, Jsonarch.apply(__assign(__assign({}, entry), { path: Jsonarch.makeFullRefer(entry.path, "parameter"), template: entry.template.value.parameter }))];
                case 1:
                    _e = _f.sent();
                    return [3 /*break*/, 3];
                case 2:
                    _e = entry.parameter;
                    _f.label = 3;
                case 3:
                    parameter = _c.apply(void 0, _d.concat([_e]));
                    return [4 /*yield*/, Jsonarch.evaluateCases(__assign(__assign({}, entry), { path: Jsonarch.makeFullRefer(entry.path, "cases"), template: entry.template.value.cases, parameter: parameter }))];
                case 4:
                    result = _f.sent();
                    if (undefined !== result) {
                        return [2 /*return*/, result];
                    }
                    return [2 /*return*/, entry.template.value.default.value.return];
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
                    _d = [entry.template.value.default];
                    if (!(undefined !== entry.template.value.parameter)) return [3 /*break*/, 2];
                    return [4 /*yield*/, Jsonarch.lazyableApply(__assign(__assign({}, entry), { path: Jsonarch.makeFullRefer(entry.path, "parameter"), template: entry.template.value.parameter }))];
                case 1:
                    _e = _h.sent();
                    return [3 /*break*/, 3];
                case 2:
                    _e = entry.parameter;
                    _h.label = 3;
                case 3:
                    parameter = _c.apply(void 0, _d.concat([_e]));
                    return [4 /*yield*/, Jsonarch.evaluateCasesType(__assign(__assign({}, entry), { path: Jsonarch.makeFullRefer(entry.path, "cases"), template: entry.template.value.cases, parameter: parameter }))];
                case 4:
                    caseTypes = _h.sent();
                    _g = {
                        $arch: "type",
                        type: "or"
                    };
                    _f = [__spreadArray([], caseTypes, true)];
                    return [4 /*yield*/, Jsonarch.typeOfResult(__assign(__assign({}, entry), { parameter: parameter }), entry.template.value.default.value.return)];
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
            switch (_c.label) {
                case 0:
                    if (!(undefined !== entry.parameter)) return [3 /*break*/, 1];
                    return [2 /*return*/, Jsonarch.jsonStringify(Jsonarch.makeSolid(entry.parameter)) === Jsonarch.jsonStringify(Jsonarch.makeSolid(entry.template).value)];
                case 1: return [4 /*yield*/, new Jsonarch.ErrorJson(entry, "Unknown Jsonarch TypeUnspecified Parameter")];
                case 2: throw _c.sent();
            }
        });
    }); }); };
    Jsonarch.evaluateListCasePattern = function (entry) { return Jsonarch.profile(entry, "evaluateListCasePattern", function () { return __awaiter(_this, void 0, void 0, function () {
        var entryParameter;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    entryParameter = entry.parameter;
                    if (!(undefined !== entryParameter)) return [3 /*break*/, 1];
                    // return entry.template.value.list.value.some(i => jsonStringify(entryParameter) === jsonStringify(i)) ;
                    return [2 /*return*/, entry.template.value.list.value.some(function (i) { return Jsonarch.jsonStringify(Jsonarch.makeSolid(entryParameter)) === Jsonarch.jsonStringify(Jsonarch.makeSolid(i)); })];
                case 1: return [4 /*yield*/, new Jsonarch.ErrorJson(entry, "Unknown Jsonarch TypeUnspecified Parameter")];
                case 2: throw _c.sent();
            }
        });
    }); }); };
    Jsonarch.evaluateTypeCasePattern = function (entry) { return Jsonarch.profile(entry, "evaluateTypeCasePattern", function () { return __awaiter(_this, void 0, void 0, function () {
        var parameterType, comppareTypeResult;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    if (!(undefined !== entry.parameter)) return [3 /*break*/, 1];
                    parameterType = Jsonarch.typeOfJsonable(entry.parameter);
                    comppareTypeResult = Jsonarch.compareType(entry.template.type, parameterType);
                    return [2 /*return*/, Jsonarch.isBaseOrEqual(comppareTypeResult)];
                case 1: return [4 /*yield*/, new Jsonarch.ErrorJson(entry, "Unknown Jsonarch TypeUnspecified Parameter")];
                case 2: throw _c.sent();
            }
        });
    }); }); };
    Jsonarch.evaluateIfCasePattern = function (entry) { return Jsonarch.profile(entry, "evaluateIfCasePattern", function () { return __awaiter(_this, void 0, void 0, function () {
        var result;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0: return [4 /*yield*/, Jsonarch.apply(__assign(__assign({}, entry), { path: Jsonarch.makeFullRefer(entry.path, "if"), template: entry.template.value.if }))];
                case 1:
                    result = _c.sent();
                    if (!("boolean" !== typeof result.value)) return [3 /*break*/, 3];
                    return [4 /*yield*/, new Jsonarch.ErrorJson(entry, "Unmatch if result type", {
                            template: entry.template.if,
                            result: result,
                        })];
                case 2: throw _c.sent();
                case 3: return [2 /*return*/, result.value];
            }
        });
    }); }); };
    Jsonarch.evaluateIfCaseCasePattern = function (entry) { return Jsonarch.profile(entry, "evaluateIfCaseCasePattern", function () { return __awaiter(_this, void 0, void 0, function () {
        var parameter, result;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0: return [4 /*yield*/, Jsonarch.apply(__assign(__assign({}, entry), { path: Jsonarch.makeFullRefer(entry.path, "parameter"), template: entry.template.value.parameter }))];
                case 1:
                    parameter = _c.sent();
                    return [4 /*yield*/, Jsonarch.evaluateCasePattern(__assign(__assign({}, entry), { path: Jsonarch.makeFullRefer(entry.path, "ifCase"), template: entry.template.value.ifCase, parameter: parameter }))];
                case 2:
                    result = _c.sent();
                    if (!("boolean" !== typeof result)) return [3 /*break*/, 4];
                    return [4 /*yield*/, new Jsonarch.ErrorJson(entry, "Unmatch if-case result type", {
                            template: entry.template,
                            parameter: parameter,
                            result: result,
                        })];
                case 3: throw _c.sent();
                case 4: return [2 /*return*/, result];
            }
        });
    }); }); };
    Jsonarch.evaluateNotCasePattern = function (entry) { return Jsonarch.profile(entry, "evaluateNotCasePattern", function () { return __awaiter(_this, void 0, void 0, function () {
        var result;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0: return [4 /*yield*/, Jsonarch.evaluateCasePattern(__assign(__assign({}, entry), { path: Jsonarch.makeFullRefer(entry.path, "not"), template: entry.template.value.not }))];
                case 1:
                    result = _c.sent();
                    if (!("boolean" !== typeof result)) return [3 /*break*/, 3];
                    return [4 /*yield*/, new Jsonarch.ErrorJson(entry, "Unmatch not result type", {
                            template: entry.template.value.not,
                            result: result,
                        })];
                case 2: throw _c.sent();
                case 3: return [2 /*return*/, !result];
            }
        });
    }); }); };
    Jsonarch.evaluateOrCasePattern = function (entry) { return Jsonarch.profile(entry, "evaluateOrCasePattern", function () { return __awaiter(_this, void 0, void 0, function () {
        var basePath, _c, _d, _e, _f, i, template, result;
        return __generator(this, function (_g) {
            switch (_g.label) {
                case 0:
                    basePath = Jsonarch.makeFullRefer(entry.path, "or");
                    _c = entry.template.value.or.value;
                    _d = [];
                    for (_e in _c)
                        _d.push(_e);
                    _f = 0;
                    _g.label = 1;
                case 1:
                    if (!(_f < _d.length)) return [3 /*break*/, 6];
                    _e = _d[_f];
                    if (!(_e in _c)) return [3 /*break*/, 5];
                    i = _e;
                    template = entry.template.value.or.value[i];
                    return [4 /*yield*/, Jsonarch.evaluateCasePattern(__assign(__assign({}, entry), { path: Jsonarch.makeFullRefer(basePath, i), template: template }))];
                case 2:
                    result = _g.sent();
                    if (!("boolean" !== typeof result)) return [3 /*break*/, 4];
                    return [4 /*yield*/, new Jsonarch.ErrorJson(entry, "Unmatch or result type", {
                            template: template,
                            result: result,
                        })];
                case 3: throw _g.sent();
                case 4:
                    if (result) {
                        return [2 /*return*/, true];
                    }
                    _g.label = 5;
                case 5:
                    _f++;
                    return [3 /*break*/, 1];
                case 6: return [2 /*return*/, false];
            }
        });
    }); }); };
    Jsonarch.evaluateAndCasePattern = function (entry) { return Jsonarch.profile(entry, "evaluateAndCasePattern", function () { return __awaiter(_this, void 0, void 0, function () {
        var basePath, _c, _d, _e, _f, i, template, result;
        return __generator(this, function (_g) {
            switch (_g.label) {
                case 0:
                    basePath = Jsonarch.makeFullRefer(entry.path, "and");
                    _c = entry.template.value.and.value;
                    _d = [];
                    for (_e in _c)
                        _d.push(_e);
                    _f = 0;
                    _g.label = 1;
                case 1:
                    if (!(_f < _d.length)) return [3 /*break*/, 6];
                    _e = _d[_f];
                    if (!(_e in _c)) return [3 /*break*/, 5];
                    i = _e;
                    template = entry.template.value.and.value[i];
                    return [4 /*yield*/, Jsonarch.evaluateCasePattern(__assign(__assign({}, entry), { path: Jsonarch.makeFullRefer(basePath, i), template: template }))];
                case 2:
                    result = _g.sent();
                    if (!("boolean" !== typeof result)) return [3 /*break*/, 4];
                    return [4 /*yield*/, new Jsonarch.ErrorJson(entry, "Unmatch and result type", {
                            template: template,
                            result: result,
                        })];
                case 3: throw _g.sent();
                case 4:
                    if (!result) {
                        return [2 /*return*/, false];
                    }
                    _g.label = 5;
                case 5:
                    _f++;
                    return [3 /*break*/, 1];
                case 6: return [2 /*return*/, true];
            }
        });
    }); }); };
    Jsonarch.evaluateIfMatchCasePattern = function (isMatch, evaluateTarget) {
        return function (entry) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_c) {
            return [2 /*return*/, isMatch(entry.template) ? evaluateTarget(entry) : undefined];
        }); }); };
    };
    var casePatternEvaluatorList = [
        Jsonarch.evaluateIfMatchCasePattern(Jsonarch.isIntermediateValueCasePattern, Jsonarch.evaluateValueCasePattern),
        Jsonarch.evaluateIfMatchCasePattern(Jsonarch.isIntermediateListCasePattern, Jsonarch.evaluateListCasePattern),
        Jsonarch.evaluateIfMatchCasePattern(Jsonarch.isIntermediateTypeCasePattern, Jsonarch.evaluateTypeCasePattern),
        Jsonarch.evaluateIfMatchCasePattern(Jsonarch.isIntermediateIfCasePattern, Jsonarch.evaluateIfCasePattern),
        Jsonarch.evaluateIfMatchCasePattern(Jsonarch.isIntermediateIfCaseCasePattern, Jsonarch.evaluateIfCaseCasePattern),
        Jsonarch.evaluateIfMatchCasePattern(Jsonarch.isIntermediateNotCasePattern, Jsonarch.evaluateNotCasePattern),
        Jsonarch.evaluateIfMatchCasePattern(Jsonarch.isIntermediateOrCasePattern, Jsonarch.evaluateOrCasePattern),
        Jsonarch.evaluateIfMatchCasePattern(Jsonarch.isIntermediateAndCasePattern, Jsonarch.evaluateAndCasePattern),
    ];
    Jsonarch.evaluateCasePattern = function (entry) { return Jsonarch.profile(entry, "evaluateCasePattern", function () { return __awaiter(_this, void 0, void 0, function () {
        var _c, _d, _e, _f, i, result;
        return __generator(this, function (_g) {
            switch (_g.label) {
                case 0:
                    _c = casePatternEvaluatorList;
                    _d = [];
                    for (_e in _c)
                        _d.push(_e);
                    _f = 0;
                    _g.label = 1;
                case 1:
                    if (!(_f < _d.length)) return [3 /*break*/, 4];
                    _e = _d[_f];
                    if (!(_e in _c)) return [3 /*break*/, 3];
                    i = _e;
                    return [4 /*yield*/, casePatternEvaluatorList[i](entry)];
                case 2:
                    result = _g.sent();
                    if (undefined !== result) {
                        return [2 /*return*/, result];
                    }
                    _g.label = 3;
                case 3:
                    _f++;
                    return [3 /*break*/, 1];
                case 4: return [4 /*yield*/, new Jsonarch.ErrorJson(entry, "Unknown Case Pattern", {
                        template: entry.template,
                    })];
                case 5: throw _g.sent();
            }
        });
    }); }); };
    Jsonarch.evaluateCases = function (entry) { return Jsonarch.profile(entry, "evaluateCases", function () { return __awaiter(_this, void 0, void 0, function () {
        var _c, _d, _e, _f, i, ix, case_, path, _g;
        return __generator(this, function (_h) {
            switch (_h.label) {
                case 0:
                    _c = entry.template.value;
                    _d = [];
                    for (_e in _c)
                        _d.push(_e);
                    _f = 0;
                    _h.label = 1;
                case 1:
                    if (!(_f < _d.length)) return [3 /*break*/, 6];
                    _e = _d[_f];
                    if (!(_e in _c)) return [3 /*break*/, 5];
                    i = _e;
                    ix = parseInt(i);
                    case_ = entry.template.value[ix];
                    path = Jsonarch.makeFullRefer(entry.path, ix);
                    _g = undefined === case_.value.case;
                    if (_g) return [3 /*break*/, 3];
                    return [4 /*yield*/, Jsonarch.evaluateCasePattern(__assign(__assign({}, entry), { path: Jsonarch.makeFullRefer(path, "case"), template: case_.value.case }))];
                case 2:
                    _g = (_h.sent());
                    _h.label = 3;
                case 3:
                    if (!_g) return [3 /*break*/, 5];
                    return [4 /*yield*/, Jsonarch.apply(__assign(__assign({}, entry), { path: Jsonarch.makeFullRefer(path, "return"), template: case_.value.return }))];
                case 4: return [2 /*return*/, _h.sent()];
                case 5:
                    _f++;
                    return [3 /*break*/, 1];
                case 6: return [2 /*return*/, undefined];
            }
        });
    }); }); };
    Jsonarch.evaluateCasesType = function (entry) { return Jsonarch.profile(entry, "evaluateCasesType", function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_c) {
        switch (_c.label) {
            case 0: return [4 /*yield*/, Promise.all(entry.template.value.map(function (i) { return Jsonarch.typeOfResult(entry, i.return); }))];
            case 1: return [2 /*return*/, _c.sent()];
        }
    }); }); }); };
    Jsonarch.evaluateLoop = function (entry) { return Jsonarch.profile(entry, "evaluateLoop", function () { return __awaiter(_this, void 0, void 0, function () {
        var result, index, scope, path, current;
        var _c, _d;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    result = [];
                    index = 0;
                    _e.label = 1;
                case 1:
                    if (!true) return [3 /*break*/, 5];
                    scope = __assign(__assign({}, entry.scope), { $loop: { index: index, } });
                    path = Jsonarch.makeFullRefer(entry.path, "loop");
                    return [4 /*yield*/, Jsonarch.apply(__assign(__assign({}, Limit.incrementNestDepth(entry)), { callStack: Jsonarch.makeCallStack(entry.callStack, {
                                path: path,
                                parameter: scope,
                                caller: entry.path,
                            }), path: path, template: entry.template.value.loop, scope: scope }))];
                case 2:
                    current = _e.sent();
                    if (!!Jsonarch.isIntermediateLoopResultData(current)) return [3 /*break*/, 4];
                    return [4 /*yield*/, new Jsonarch.ErrorJson(entry, "Unknown Lopp Result", {
                            result: current,
                        })];
                case 3: throw _e.sent();
                case 4:
                    if (true !== ((_d = (_c = current.value.continue) === null || _c === void 0 ? void 0 : _c.value) !== null && _d !== void 0 ? _d : true) || undefined === current.value.return.value) {
                        return [3 /*break*/, 5];
                    }
                    result.push(current.value.return);
                    ++index;
                    return [3 /*break*/, 1];
                case 5: return [2 /*return*/, result];
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
    Jsonarch.evaluateChain = function (entry) { return Jsonarch.profile(entry, "evaluateChain", function () { return __awaiter(_this, void 0, void 0, function () {
        var current, basePath, list, _c, _d, _e, _f, i, path;
        return __generator(this, function (_g) {
            switch (_g.label) {
                case 0:
                    current = entry.parameter;
                    basePath = Jsonarch.makeFullRefer(entry.path, "list");
                    list = entry.template.value.list.value;
                    _c = list;
                    _d = [];
                    for (_e in _c)
                        _d.push(_e);
                    _f = 0;
                    _g.label = 1;
                case 1:
                    if (!(_f < _d.length)) return [3 /*break*/, 4];
                    _e = _d[_f];
                    if (!(_e in _c)) return [3 /*break*/, 3];
                    i = _e;
                    path = Jsonarch.makeFullRefer(basePath, i);
                    return [4 /*yield*/, Jsonarch.apply(__assign(__assign({}, Limit.incrementNestDepth(entry)), { callStack: Jsonarch.makeCallStack(entry.callStack, {
                                path: path,
                                parameter: current,
                                caller: entry.path,
                            }), path: path, template: list[i], parameter: current }))];
                case 2:
                    current = _g.sent();
                    _g.label = 3;
                case 3:
                    _f++;
                    return [3 /*break*/, 1];
                case 4: return [2 /*return*/, current];
            }
        });
    }); }); };
    Jsonarch.evaluateChainResultType = function (entry) { return Jsonarch.profile(entry, "evaluateChainResultType", function () { return __awaiter(_this, void 0, void 0, function () {
        var list;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    list = entry.template.value.list.value;
                    if (list.some(function (_) { return true; })) {
                        return [2 /*return*/, Jsonarch.typeOfResult(entry, list[list.length - 1])];
                    }
                    return [4 /*yield*/, new Jsonarch.ErrorJson(entry, "NYI")];
                case 1: throw _c.sent(); // このケースでも本来は正常に稼働しないといけないが、パラメーター対応が済まない対応できない。
            }
        });
    }); }); };
    Jsonarch.makeParameter = function (entry) { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    if (!(undefined !== entry.template.value.parameter)) return [3 /*break*/, 2];
                    return [4 /*yield*/, Jsonarch.lazyableApply(__assign(__assign({}, entry), { path: Jsonarch.makeFullRefer(entry.path, "parameter"), template: entry.template.value.parameter }))];
                case 1: return [2 /*return*/, _c.sent()];
                case 2:
                    if (!(undefined !== entry.parameter)) return [3 /*break*/, 4];
                    return [4 /*yield*/, Jsonarch.lazyableApply(__assign(__assign({}, entry), { path: Jsonarch.makeFullRefer(entry.path, "parameter"), template: entry.parameter }))];
                case 3: return [2 /*return*/, _c.sent()];
                case 4: return [2 /*return*/, undefined];
            }
        });
    }); };
    Jsonarch.isCallTemplateCache = Jsonarch.isObject({ template: Jsonarch.isIntermediateTemplateData, parameter: Jsonarch.isIntermediate, cacheKey: Jsonarch.isString, result: Jsonarch.isIntermediate, });
    Jsonarch.makeCallCacheKey = function (template, parameter) { return Jsonarch.jsonStringify({ template: template, parameter: parameter, }); };
    Jsonarch.makeSureIntermediateLibrarygJson = function (entry) { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    if (!!Jsonarch.intermediateLibrarygJson) return [3 /*break*/, 2];
                    return [4 /*yield*/, Jsonarch.makeInputIntermediate(entry, library_json_1.default, Jsonarch.getSystemFileContext("library.json"))];
                case 1:
                    Jsonarch.intermediateLibrarygJson = _c.sent();
                    _c.label = 2;
                case 2: return [2 /*return*/, Jsonarch.intermediateLibrarygJson];
            }
        });
    }); };
    Jsonarch.getTemplate = function (entry, systemOrTemplate, parameter) { return __awaiter(_this, void 0, void 0, function () {
        var _this = this;
        return __generator(this, function (_c) {
            return [2 /*return*/, Jsonarch.profile(entry, "getTemplate", function () { return __awaiter(_this, void 0, void 0, function () {
                    var refer, template, useCache, liquid, _c, cacheKey, result, parameterType_1, _d, types0, types, type, _e, _f;
                    var _g, _h;
                    var _j, _k, _l, _m, _o, _p;
                    return __generator(this, function (_q) {
                        switch (_q.label) {
                            case 0:
                                refer = Jsonarch.makeSolid(entry.template.value.refer);
                                return [4 /*yield*/, Jsonarch.makeSureIntermediateLibrarygJson(entry)];
                            case 1:
                                _q.sent();
                                return [4 /*yield*/, Jsonarch.turnRefer(entry, __assign(__assign({}, Jsonarch.intermediateLibrarygJson), { value: __assign(__assign({}, Jsonarch.intermediateLibrarygJson.value), { this: (_j = entry.this) === null || _j === void 0 ? void 0 : _j.template }) }), refer)];
                            case 2:
                                template = _q.sent();
                                if (!Jsonarch.isIntermediateTemplateData(template)) return [3 /*break*/, 16];
                                if (!template.value.type) return [3 /*break*/, 13];
                                useCache = (_o = (_l = (_k = entry.template.value.cache) === null || _k === void 0 ? void 0 : _k.value) !== null && _l !== void 0 ? _l : (_m = template.value.cache) === null || _m === void 0 ? void 0 : _m.value) !== null && _o !== void 0 ? _o : false;
                                if (!("system" === systemOrTemplate || useCache)) return [3 /*break*/, 4];
                                return [4 /*yield*/, Jsonarch.resolveLazy(entry, parameter !== null && parameter !== void 0 ? parameter : null)];
                            case 3:
                                _c = _q.sent();
                                return [3 /*break*/, 5];
                            case 4:
                                _c = parameter;
                                _q.label = 5;
                            case 5:
                                liquid = _c;
                                cacheKey = useCache ? Jsonarch.makeCallCacheKey(refer, liquid) : undefined;
                                if (undefined !== cacheKey) {
                                    result = (_p = entry.cache.call) === null || _p === void 0 ? void 0 : _p[cacheKey];
                                    if (undefined !== result) {
                                        return [2 /*return*/, { template: template, parameter: liquid, cacheKey: cacheKey, result: result, }];
                                    }
                                }
                                if (!Jsonarch.hasLazy(liquid)) return [3 /*break*/, 7];
                                return [4 /*yield*/, Jsonarch.typeOfResult(entry, liquid)];
                            case 6:
                                _d = _q.sent();
                                return [3 /*break*/, 8];
                            case 7:
                                _d = Jsonarch.typeOfJsonable(liquid);
                                _q.label = 8;
                            case 8:
                                parameterType_1 = _d;
                                types0 = Jsonarch.makeSolid(template.value.type);
                                types = undefined === types0 ? [] : Array.isArray(types0) ? types0 : [types0];
                                type = types.find(function (t) { return Jsonarch.isBaseOrEqual(Jsonarch.compareType(t.parameter, parameterType_1)); });
                                if (!type) return [3 /*break*/, 9];
                                return [2 /*return*/, { template: template, type: type, parameter: liquid, cacheKey: cacheKey }];
                            case 9:
                                _e = Jsonarch.ErrorJson.bind;
                                _f = [void 0, entry, "Unmatch parameter type"];
                                _g = {
                                    refer: refer
                                };
                                _h = {
                                    template: Jsonarch.makeSolid(template.value.type),
                                    hasLazy: Jsonarch.hasLazy(liquid)
                                };
                                return [4 /*yield*/, Jsonarch.resolveLazy(entry, parameter !== null && parameter !== void 0 ? parameter : null)];
                            case 10: return [4 /*yield*/, new (_e.apply(Jsonarch.ErrorJson, _f.concat([(_g.debug = (_h.resolveLazy = _q.sent(),
                                        _h.liquid = liquid,
                                        _h.parameter = parameter,
                                        _h),
                                        _g.type = {
                                            template: template.value.type,
                                            parameter: parameterType_1,
                                        },
                                        _g.parameter = parameter,
                                        _g)])))()];
                            case 11: throw _q.sent();
                            case 12: return [3 /*break*/, 15];
                            case 13: return [4 /*yield*/, new Jsonarch.ErrorJson(entry, "Not found type define", {
                                    refer: refer,
                                })];
                            case 14: throw _q.sent();
                            case 15: return [3 /*break*/, 18];
                            case 16: return [4 /*yield*/, new Jsonarch.ErrorJson(entry, "Not found template", {
                                    refer: refer,
                                })];
                            case 17: throw _q.sent();
                            case 18: return [2 /*return*/];
                        }
                    });
                }); })];
        });
    }); };
    Jsonarch.validateReturnType = function (entry, parameterInfo, result) { return __awaiter(_this, void 0, void 0, function () {
        var parameter, parameterType, resultType, type, compareTypeResult;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    parameter = parameterInfo.parameter;
                    parameterType = Jsonarch.isIntermediate(parameter) ? parameter.type : Jsonarch.typeOfJsonable(parameter);
                    resultType = Jsonarch.isIntermediate(result) ? result.type : Jsonarch.typeOfJsonable(result);
                    type = parameterInfo.type;
                    compareTypeResult = Jsonarch.compareType(type.return, resultType);
                    if (!Jsonarch.isBaseOrEqual(compareTypeResult)) return [3 /*break*/, 1];
                    return [2 /*return*/, result];
                case 1: return [4 /*yield*/, new Jsonarch.ErrorJson(entry, "Unmatch return type", {
                        refer: entry.template.refer,
                        compareTypeResult: compareTypeResult,
                        type: {
                            template: type,
                            parameter: parameterType,
                            result: resultType,
                        },
                        parameter: parameter,
                    })];
                case 2: throw _c.sent();
            }
        });
    }); };
    Jsonarch.UnmatchParameterTypeDefineError = function (entry, refer, parameter) { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0: return [4 /*yield*/, new Jsonarch.ErrorJson(entry, "Internal Error ( Unmatch parameter type define )", {
                        refer: refer,
                        parameter: parameter,
                    })];
                case 1: return [2 /*return*/, _c.sent()];
            }
        });
    }); };
    Jsonarch.library = {
        object: {
            typeOf: function (_entry, parameter) {
                return Jsonarch.typeOfJsonable(undefinedable(Jsonarch.makeSolid)(parameter));
            },
            equal: function (_entry, parameter) {
                var solid = undefinedable(Jsonarch.makeSolid)(parameter);
                if (Jsonarch.isArray(Jsonarch.isAny)(solid) && 2 === solid.length) {
                    return solid[0] === solid[1];
                }
                return undefined;
            }
        },
        array: {
            contain: function (_entry, parameter) {
                var solid = undefinedable(Jsonarch.makeSolid)(parameter);
                if (isTuple(Jsonarch.isArray(Jsonarch.isAny), Jsonarch.isAny)(solid)) {
                    return solid[0].includes(solid[1]);
                }
                return undefined;
            }
        },
        boolean: {
            not: function (_entry, parameter) {
                var solid = undefinedable(Jsonarch.makeSolid)(parameter);
                if (Jsonarch.isBoolean(solid)) {
                    return !solid;
                }
                return undefined;
            },
            or: function (_entry, parameter) {
                var solid = undefinedable(Jsonarch.makeSolid)(parameter);
                if (Jsonarch.isArray(Jsonarch.isBoolean)(solid)) {
                    return solid.some(function (i) { return i; });
                }
                return undefined;
            },
            and: function (_entry, parameter) {
                var solid = undefinedable(Jsonarch.makeSolid)(parameter);
                if (Jsonarch.isArray(Jsonarch.isBoolean)(solid)) {
                    return solid.every(function (i) { return i; });
                }
                return undefined;
            },
            xor: function (_entry, parameter) {
                var solid = undefinedable(Jsonarch.makeSolid)(parameter);
                if (Jsonarch.isArray(Jsonarch.isBoolean)(solid) && 2 === solid.length) {
                    return solid[0] !== solid[1];
                }
                return undefined;
            },
        },
        number: {
            compare: function (entry, parameter) { return __awaiter(_this, void 0, void 0, function () {
                var solid;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            solid = undefinedable(Jsonarch.makeSolid)(parameter);
                            if (!(Jsonarch.isArray(Jsonarch.isNumber)(solid) && 2 === solid.length)) return [3 /*break*/, 2];
                            if (solid[0] < solid[1]) {
                                return [2 /*return*/, "<"];
                            }
                            if (solid[0] === solid[1]) {
                                return [2 /*return*/, "="];
                            }
                            if (solid[0] > solid[1]) {
                                return [2 /*return*/, ">"];
                            }
                            return [4 /*yield*/, new Jsonarch.ErrorJson(entry, "never", {
                                    parameter: parameter,
                                })];
                        case 1: throw _c.sent();
                        case 2: return [2 /*return*/, undefined];
                    }
                });
            }); },
            sum: function (_entry, parameter) {
                var solid = undefinedable(Jsonarch.makeSolid)(parameter);
                if (Jsonarch.isArray(Jsonarch.isNumber)(solid)) {
                    return solid.reduce(function (a, b) { return a + b; }, 0);
                }
                return undefined;
            },
            remainder: function (_entry, parameter) {
                var solid = undefinedable(Jsonarch.makeSolid)(parameter);
                if (isTuple(Jsonarch.isNumber, Jsonarch.isNumber)(solid)) {
                    return solid[0] % solid[1];
                }
                return undefined;
            }
        },
        string: {
            join: function (_entry, parameter) {
                var solid = undefinedable(Jsonarch.makeSolid)(parameter);
                if (Jsonarch.isArray(Jsonarch.isString)(solid)) {
                    return solid.join("");
                }
                else if (Jsonarch.isObject({ list: Jsonarch.isArray(Jsonarch.isString), separator: Jsonarch.isString, })(solid)) {
                    return solid.list.join(solid.separator);
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
            // throw await new ErrorJson({ $arch: "error", message: "Unreachable xxx", }); の方が望ましい。
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
    Jsonarch.turnRefer = function (entry, root, refer) { return __awaiter(_this, void 0, void 0, function () {
        var rest, current, key;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    rest = refer.map(function (i) { return i; });
                    current = root;
                    _c.label = 1;
                case 1:
                    if (!true) return [3 /*break*/, 6];
                    if (rest.length <= 0) {
                        return [2 /*return*/, current];
                    }
                    if (Jsonarch.isIntermediate(current)) {
                        current = current.value;
                    }
                    if (undefined === current || null === current || "object" !== typeof current) {
                        return [2 /*return*/, undefined];
                    }
                    key = rest.shift();
                    if (!("number" === typeof key && Array.isArray(current))) return [3 /*break*/, 2];
                    current = current[key];
                    return [3 /*break*/, 5];
                case 2:
                    if (!("string" === typeof key && !Array.isArray(current) && key in current)) return [3 /*break*/, 3];
                    current = current[key];
                    return [3 /*break*/, 5];
                case 3: return [4 /*yield*/, new Jsonarch.ErrorJson(entry, "Unmatch refer path", {
                        refer: refer,
                        root: Jsonarch.toJsonable(root),
                    })];
                case 4: throw _c.sent();
                case 5: return [3 /*break*/, 1];
                case 6: return [2 /*return*/];
            }
        });
    }); };
    Jsonarch.resolveValueRefer = function (entry) { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0: return [4 /*yield*/, Jsonarch.turnRefer(entry, {
                        template: entry.cache.template,
                        type: entry.cache.type,
                        value: entry.cache.value,
                        scope: entry.scope,
                        parameter: entry.parameter,
                    }, Jsonarch.makeSolid(entry.template.value.refer))];
                case 1: return [2 /*return*/, _c.sent()];
            }
        });
    }); };
    Jsonarch.evaluateCall = function (entry) { return Jsonarch.profile(entry, "evaluateCall", function () { return __awaiter(_this, void 0, void 0, function () {
        var parameter, refer, path, nextDepthEntry, target;
        var _this = this;
        var _c, _d;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0: return [4 /*yield*/, Limit.throwIfOverTheCallDepth(entry)];
                case 1:
                    _e.sent();
                    return [4 /*yield*/, Jsonarch.makeParameter(entry)];
                case 2:
                    parameter = _e.sent();
                    refer = Jsonarch.makeSolid(entry.template.value.refer);
                    path = Jsonarch.resolveThisPath((_c = entry.this) === null || _c === void 0 ? void 0 : _c.path, {
                        root: entry.context.process.template,
                        refer: refer,
                    });
                    nextDepthEntry = __assign(__assign({}, Limit.resetNestDepth(entry, entry.template.value.refer.value.length)), { callStack: Jsonarch.makeCallStack(entry.callStack, {
                            path: path,
                            parameter: parameter,
                            caller: entry.path,
                        }), path: path });
                    return [4 /*yield*/, Jsonarch.turnRefer(entry, __assign(__assign({}, Jsonarch.library), { this: (_d = entry.this) === null || _d === void 0 ? void 0 : _d.template, template: entry.cache.template }), refer
                        // entry.originMap
                        )];
                case 3:
                    target = _e.sent();
                    if (!("function" === typeof target)) return [3 /*break*/, 5];
                    return [4 /*yield*/, Jsonarch.profile(nextDepthEntry, "evaluateCall.library", function () { return __awaiter(_this, void 0, void 0, function () {
                            var parameterInfo, result;
                            var _this = this;
                            return __generator(this, function (_c) {
                                switch (_c.label) {
                                    case 0: return [4 /*yield*/, Jsonarch.getTemplate(nextDepthEntry, "system", parameter)];
                                    case 1:
                                        parameterInfo = _c.sent();
                                        if (!Jsonarch.isCallTemplateCache(parameterInfo)) return [3 /*break*/, 3];
                                        return [4 /*yield*/, Jsonarch.makeCallResultIntermediate(nextDepthEntry, refer, parameterInfo.parameter, parameterInfo.result)];
                                    case 2: return [2 /*return*/, _c.sent()];
                                    case 3: return [4 /*yield*/, Jsonarch.profile(nextDepthEntry, "library.".concat(entry.template.value.refer.value.map(function (i) { return i.value; }).join(".")), function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_c) {
                                            switch (_c.label) {
                                                case 0: return [4 /*yield*/, target(nextDepthEntry, parameterInfo.parameter)];
                                                case 1: return [2 /*return*/, _c.sent()];
                                            }
                                        }); }); })];
                                    case 4:
                                        result = _c.sent();
                                        if (!(undefined === result)) return [3 /*break*/, 6];
                                        return [4 /*yield*/, Jsonarch.UnmatchParameterTypeDefineError(nextDepthEntry, refer, parameterInfo.parameter)];
                                    case 5: throw _c.sent();
                                    case 6: return [4 /*yield*/, Jsonarch.validateReturnType(nextDepthEntry, parameterInfo, result)];
                                    case 7:
                                        _c.sent();
                                        if (undefined !== parameterInfo.cacheKey) {
                                            if (undefined === entry.cache.call) {
                                                entry.cache.call = {};
                                            }
                                            entry.cache.call[parameterInfo.cacheKey] = result;
                                        }
                                        return [4 /*yield*/, Jsonarch.makeCallResultIntermediate(nextDepthEntry, refer, parameterInfo.parameter, result)];
                                    case 8: return [2 /*return*/, _c.sent()];
                                }
                            });
                        }); })];
                case 4: return [2 /*return*/, _e.sent()];
                case 5:
                    if (!Jsonarch.isIntermediateTemplateData(target)) return [3 /*break*/, 7];
                    return [4 /*yield*/, Jsonarch.profile(nextDepthEntry, "evaluateCall.template", function () { return __awaiter(_this, void 0, void 0, function () {
                            var parameterInfo, result;
                            return __generator(this, function (_c) {
                                switch (_c.label) {
                                    case 0: return [4 /*yield*/, Jsonarch.getTemplate(nextDepthEntry, "template", parameter)];
                                    case 1:
                                        parameterInfo = _c.sent();
                                        if (!Jsonarch.isCallTemplateCache(parameterInfo)) return [3 /*break*/, 3];
                                        return [4 /*yield*/, Jsonarch.makeCallResultIntermediate(nextDepthEntry, refer, parameterInfo.parameter, parameterInfo.result)];
                                    case 2: return [2 /*return*/, _c.sent()];
                                    case 3: return [4 /*yield*/, Jsonarch.evaluateTemplate(__assign(__assign({}, nextDepthEntry), { template: target, parameter: parameterInfo.parameter }))];
                                    case 4:
                                        result = _c.sent();
                                        if (undefined !== parameterInfo.cacheKey) {
                                            if (undefined === entry.cache.call) {
                                                entry.cache.call = {};
                                            }
                                            entry.cache.call[parameterInfo.cacheKey] = result;
                                        }
                                        return [4 /*yield*/, Jsonarch.makeCallResultIntermediate(nextDepthEntry, refer, parameterInfo.parameter, result)];
                                    case 5: return [2 /*return*/, _c.sent()];
                                }
                            });
                        }); })];
                case 6: return [2 /*return*/, _e.sent()];
                case 7: return [4 /*yield*/, new Jsonarch.ErrorJson(entry, "Unknown refer call", {
                        path: path,
                        refer: refer,
                        target: Jsonarch.toJsonable(target),
                    })];
                case 8: throw _e.sent();
            }
        });
    }); }); };
    Jsonarch.evaluateCallResultType = function (entry) { return Jsonarch.profile(entry, "evaluateCallResultType", function () { return __awaiter(_this, void 0, void 0, function () {
        var parameter, path, nextDepthEntry, refer, functionTemplate, type, parameterType_2, types, compareTypeResult, match;
        var _c, _d, _e;
        return __generator(this, function (_f) {
            switch (_f.label) {
                case 0: return [4 /*yield*/, Limit.throwIfOverTheCallDepth(entry)];
                case 1:
                    _f.sent();
                    return [4 /*yield*/, Jsonarch.makeParameter(entry)];
                case 2:
                    parameter = (_c = _f.sent()) !== null && _c !== void 0 ? _c : null;
                    path = Jsonarch.resolveThisPath((_d = entry.this) === null || _d === void 0 ? void 0 : _d.path, {
                        root: entry.context.process.template,
                        refer: Jsonarch.makeSolid(entry.template.value.refer),
                    });
                    nextDepthEntry = __assign(__assign({}, Limit.resetNestDepth(entry, entry.template.value.refer.value.length)), { callStack: Jsonarch.makeCallStack(entry.callStack, {
                            path: path,
                            parameter: parameter,
                            caller: entry.path,
                        }), path: path });
                    refer = Jsonarch.makeSolid(entry.template.value.refer);
                    return [4 /*yield*/, Jsonarch.makeSureIntermediateLibrarygJson(entry)];
                case 3:
                    _f.sent();
                    return [4 /*yield*/, Jsonarch.turnRefer(entry, __assign(__assign({}, Jsonarch.intermediateLibrarygJson), { value: __assign(__assign({}, Jsonarch.intermediateLibrarygJson.value), { this: (_e = entry.this) === null || _e === void 0 ? void 0 : _e.template, template: entry.cache.template }) }), refer)];
                case 4:
                    functionTemplate = _f.sent();
                    if (!Jsonarch.isIntermediateTemplateData(functionTemplate)) return [3 /*break*/, 12];
                    type = undefinedable(Jsonarch.makeSolid)(functionTemplate.value.type);
                    if (!type) return [3 /*break*/, 9];
                    return [4 /*yield*/, Jsonarch.typeOfResult(nextDepthEntry, parameter)];
                case 5:
                    parameterType_2 = _f.sent();
                    types = Array.isArray(type) ? type : [type];
                    compareTypeResult = types.map(function (t) { return ({ return: t.return, compareTypeResult: Jsonarch.compareType(t.parameter, parameterType_2) }); });
                    match = compareTypeResult.find(function (r) { return Jsonarch.isBaseOrEqual(r.compareTypeResult); });
                    if (!match) return [3 /*break*/, 6];
                    return [2 /*return*/, match.return];
                case 6: return [4 /*yield*/, new Jsonarch.ErrorJson(entry, "Unmatch parameter type", {
                        refer: refer,
                        compareTypeResult: compareTypeResult,
                        type: {
                            template: type,
                            parameter: parameterType_2,
                        },
                        parameter: parameter,
                    })];
                case 7: throw _f.sent();
                case 8: return [3 /*break*/, 11];
                case 9: return [4 /*yield*/, new Jsonarch.ErrorJson(entry, "Not found type define", {
                        refer: refer,
                    })];
                case 10: throw _f.sent();
                case 11: return [3 /*break*/, 14];
                case 12: return [4 /*yield*/, new Jsonarch.ErrorJson(entry, "Not found template", {
                        refer: refer,
                        template: Jsonarch.toJsonable(functionTemplate),
                    })];
                case 13: throw _f.sent();
                case 14: return [2 /*return*/];
            }
        });
    }); }); };
    Jsonarch.typeOfInput = function (entry, json) { return __awaiter(_this, void 0, void 0, function () {
        var _this = this;
        return __generator(this, function (_c) {
            return [2 /*return*/, Jsonarch.profile(entry, "typeOfInput", function () { return __awaiter(_this, void 0, void 0, function () {
                    var member, keys, _c, _d, _e, _f, i, key, _g, _h;
                    var _j;
                    return __generator(this, function (_k) {
                        switch (_k.label) {
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
                                return [3 /*break*/, 15];
                            case 4:
                                if (!("string" === typeof json)) return [3 /*break*/, 5];
                                return [2 /*return*/, { $arch: "type", type: "string", enum: [json,], }];
                            case 5:
                                if (!Array.isArray(json)) return [3 /*break*/, 7];
                                _j = { $arch: "type", type: "tuple" };
                                return [4 /*yield*/, Promise.all(json.map(function (i) { return Jsonarch.typeOfInput(entry, i); }))];
                            case 6: return [2 /*return*/, (_j.list = _k.sent(), _j)];
                            case 7:
                                if (!("object" === typeof json)) return [3 /*break*/, 15];
                                if (!Jsonarch.isIntermediate(json)) return [3 /*break*/, 8];
                                return [2 /*return*/, json.type];
                            case 8:
                                if (!Jsonarch.isLazy(json)) return [3 /*break*/, 10];
                                console.log(Jsonarch.getJsonableErrors(entry, "entry"));
                                return [4 /*yield*/, new Jsonarch.ErrorJson(entry, "never: Lazy in Loading", Jsonarch.toJsonable(entry))];
                            case 9: throw _k.sent();
                            case 10:
                                member = {};
                                keys = Jsonarch.objectKeys(json);
                                _c = keys;
                                _d = [];
                                for (_e in _c)
                                    _d.push(_e);
                                _f = 0;
                                _k.label = 11;
                            case 11:
                                if (!(_f < _d.length)) return [3 /*break*/, 14];
                                _e = _d[_f];
                                if (!(_e in _c)) return [3 /*break*/, 13];
                                i = _e;
                                key = keys[i];
                                _g = member;
                                _h = key;
                                return [4 /*yield*/, Jsonarch.typeOfInput(entry, json[key])];
                            case 12:
                                _g[_h] = _k.sent();
                                _k.label = 13;
                            case 13:
                                _f++;
                                return [3 /*break*/, 11];
                            case 14: return [2 /*return*/, { $arch: "type", type: "object", member: member, }];
                            case 15: 
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
    Jsonarch.typeOfResult = function (entry, json) { return __awaiter(_this, void 0, void 0, function () {
        var _this = this;
        return __generator(this, function (_c) {
            return [2 /*return*/, Jsonarch.profile(entry, "typeOfResult", function () { return __awaiter(_this, void 0, void 0, function () {
                    var member, keys, _c, _d, _e, _f, i, key, _g, _h;
                    var _j;
                    return __generator(this, function (_k) {
                        switch (_k.label) {
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
                                return [3 /*break*/, 14];
                            case 4:
                                if (!("string" === typeof json)) return [3 /*break*/, 5];
                                return [2 /*return*/, { $arch: "type", type: "string", enum: [json,], }];
                            case 5:
                                if (!Array.isArray(json)) return [3 /*break*/, 7];
                                _j = { $arch: "type", type: "tuple" };
                                return [4 /*yield*/, Promise.all(json.map(function (i) { return Jsonarch.typeOfResult(entry, i); }))];
                            case 6: return [2 /*return*/, (_j.list = _k.sent(), _j)];
                            case 7:
                                if (!("object" === typeof json)) return [3 /*break*/, 14];
                                if (!Jsonarch.isIntermediate(json)) return [3 /*break*/, 8];
                                return [2 /*return*/, json.type];
                            case 8:
                                if (!Jsonarch.isLazy(json)) return [3 /*break*/, 9];
                                // if (isEvaluateEntry(isAny)(entry))
                                // {
                                //     return await evaluateLazyResultType(entry, json);
                                // }
                                // else
                                // {
                                //     console.log(getJsonableErrors(entry, "entry"));
                                //     throw await new ErrorJson(undefined, "never: Lazy in Loading", toJsonable(entry));
                                // }
                                return [2 /*return*/, json.type];
                            case 9:
                                member = {};
                                keys = Jsonarch.objectKeys(json);
                                _c = keys;
                                _d = [];
                                for (_e in _c)
                                    _d.push(_e);
                                _f = 0;
                                _k.label = 10;
                            case 10:
                                if (!(_f < _d.length)) return [3 /*break*/, 13];
                                _e = _d[_f];
                                if (!(_e in _c)) return [3 /*break*/, 12];
                                i = _e;
                                key = keys[i];
                                _g = member;
                                _h = key;
                                return [4 /*yield*/, Jsonarch.typeOfResult(entry, json[key])];
                            case 11:
                                _g[_h] = _k.sent();
                                _k.label = 12;
                            case 12:
                                _f++;
                                return [3 /*break*/, 10];
                            case 13: return [2 /*return*/, { $arch: "type", type: "object", member: member, }];
                            case 14: 
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
            switch (_c.label) {
                case 0: return [4 /*yield*/, Jsonarch.resolveValueRefer(entry)];
                case 1:
                    result = _c.sent();
                    if (!(undefined === result)) return [3 /*break*/, 3];
                    return [4 /*yield*/, new Jsonarch.ErrorJson(entry, "Unknown refer value", {
                            value: entry.template,
                        })];
                case 2: throw _c.sent();
                case 3: return [2 /*return*/, result];
            }
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
                    return [4 /*yield*/, Jsonarch.resolveValueRefer(entry)];
                case 1:
                    result = _c.sent();
                    if (!(undefined === result)) return [3 /*break*/, 3];
                    return [4 /*yield*/, new Jsonarch.ErrorJson(entry, "Unknown refer value", {
                            value: entry.template,
                        })];
                case 2: throw _c.sent();
                case 3: return [4 /*yield*/, Jsonarch.typeOfResult(entry, result)];
                case 4: return [2 /*return*/, _c.sent()];
            }
        });
    }); }); };
    Jsonarch.evaluateIfMatch = function (isMatch, evaluateTarget) {
        return function (entry) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_c) {
            return [2 /*return*/, isMatch(entry.template) ? evaluateTarget(entry) : undefined];
        }); }); };
    };
    var evaluatorList = [
        Jsonarch.evaluateIfMatch(Jsonarch.isIntermediateStaticData, Jsonarch.evaluateStatic),
        Jsonarch.evaluateIfMatch(Jsonarch.isIntermediateIncludeStaticJsonData, Jsonarch.evaluateIncludeStaticJson),
        Jsonarch.evaluateIfMatch(Jsonarch.isIntermediateTemplateData, Jsonarch.evaluateTemplate),
        Jsonarch.evaluateIfMatch(Jsonarch.isIntermediateThrowData, Jsonarch.evaluateThrow),
        Jsonarch.evaluateIfMatch(Jsonarch.isIntermediateMatchData, Jsonarch.evaluateMatch),
        Jsonarch.evaluateIfMatch(Jsonarch.isIntermediateLoopData, Jsonarch.evaluateLoop),
        Jsonarch.evaluateIfMatch(Jsonarch.isIntermediateChainData, Jsonarch.evaluateChain),
        Jsonarch.evaluateIfMatch(Jsonarch.isIntermediateCallData, Jsonarch.evaluateCall),
        Jsonarch.evaluateIfMatch(Jsonarch.isIntermediateValueData, Jsonarch.evaluateValue),
    ];
    Jsonarch.evaluate = function (entry) { return Jsonarch.profile(entry, "evaluate", function () { return __awaiter(_this, void 0, void 0, function () {
        var _c, _d, _e, _f, i, result;
        return __generator(this, function (_g) {
            switch (_g.label) {
                case 0:
                    _c = evaluatorList;
                    _d = [];
                    for (_e in _c)
                        _d.push(_e);
                    _f = 0;
                    _g.label = 1;
                case 1:
                    if (!(_f < _d.length)) return [3 /*break*/, 4];
                    _e = _d[_f];
                    if (!(_e in _c)) return [3 /*break*/, 3];
                    i = _e;
                    return [4 /*yield*/, evaluatorList[i](entry)];
                case 2:
                    result = _g.sent();
                    if (undefined !== result) {
                        return [2 /*return*/, result];
                    }
                    _g.label = 3;
                case 3:
                    _f++;
                    return [3 /*break*/, 1];
                case 4: return [4 /*yield*/, new Jsonarch.ErrorJson(entry, "Unknown Jsonarch Type", {
                        template: entry.template,
                    })];
                case 5: throw _g.sent();
            }
        });
    }); }); };
    Jsonarch.evaluateResultTypeIfMatch = function (isMatch, evaluateTarget) {
        return function (entry) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_c) {
            return [2 /*return*/, isMatch(entry.template) ? evaluateTarget(entry) : undefined];
        }); }); };
    };
    var evaluatorResultTypeList = [
        Jsonarch.evaluateResultTypeIfMatch(Jsonarch.isIntermediateStaticData, Jsonarch.evaluateStaticResultType),
        Jsonarch.evaluateResultTypeIfMatch(Jsonarch.isIntermediateIncludeStaticJsonData, Jsonarch.evaluateIncludeStaticJsonResultType),
        Jsonarch.evaluateResultTypeIfMatch(Jsonarch.isIntermediateTemplateData, Jsonarch.evaluateTemplateResultType),
        Jsonarch.evaluateResultTypeIfMatch(Jsonarch.isIntermediateMatchData, Jsonarch.evaluateMatchResultType),
        Jsonarch.evaluateResultTypeIfMatch(Jsonarch.isIntermediateLoopData, Jsonarch.evaluateLoopResultType),
        Jsonarch.evaluateResultTypeIfMatch(Jsonarch.isIntermediateChainData, Jsonarch.evaluateChainResultType),
        Jsonarch.evaluateResultTypeIfMatch(Jsonarch.isIntermediateCallData, Jsonarch.evaluateCallResultType),
        Jsonarch.evaluateResultTypeIfMatch(Jsonarch.isIntermediateValueData, Jsonarch.evaluateValueResultType),
    ];
    Jsonarch.evaluateResultType = function (entry) { return Jsonarch.profile(entry, "evaluateResultType", function () { return __awaiter(_this, void 0, void 0, function () {
        var _c, _d, _e, _f, i, result;
        return __generator(this, function (_g) {
            switch (_g.label) {
                case 0:
                    _c = evaluatorResultTypeList;
                    _d = [];
                    for (_e in _c)
                        _d.push(_e);
                    _f = 0;
                    _g.label = 1;
                case 1:
                    if (!(_f < _d.length)) return [3 /*break*/, 4];
                    _e = _d[_f];
                    if (!(_e in _c)) return [3 /*break*/, 3];
                    i = _e;
                    return [4 /*yield*/, evaluatorResultTypeList[i](entry)];
                case 2:
                    result = _g.sent();
                    if (undefined !== result) {
                        return [2 /*return*/, result];
                    }
                    _g.label = 3;
                case 3:
                    _f++;
                    return [3 /*break*/, 1];
                case 4: return [4 /*yield*/, new Jsonarch.ErrorJson(entry, "Unknown Jsonarch Type", {
                        template: entry.template,
                    })];
                case 5: throw _g.sent();
            }
        });
    }); }); };
    Jsonarch.getLazyTemplate = function (entry, lazy) { return __awaiter(_this, void 0, void 0, function () {
        var _this = this;
        return __generator(this, function (_c) {
            return [2 /*return*/, Jsonarch.profile(entry, "getLazyTemplate", function () { return __awaiter(_this, void 0, void 0, function () {
                    var _c, _d;
                    var _e;
                    return __generator(this, function (_f) {
                        switch (_f.label) {
                            case 0:
                                _c = Jsonarch.makeInputIntermediate;
                                _d = [entry];
                                return [4 /*yield*/, Jsonarch.turnRefer(entry, (_e = entry.cache.json) === null || _e === void 0 ? void 0 : _e[lazy.path.root.path], Jsonarch.toLeafFullRefer(lazy.path).refer)];
                            case 1: return [4 /*yield*/, _c.apply(void 0, _d.concat([_f.sent(),
                                    lazy.path.root]))];
                            case 2: return [2 /*return*/, _f.sent()];
                        }
                    });
                }); })];
        });
    }); };
    Jsonarch.evaluateLazy = function (entry, lazy) { return __awaiter(_this, void 0, void 0, function () { var _c; return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                _c = Jsonarch.apply;
                return [4 /*yield*/, Jsonarch.restoreFromLazy(entry, lazy)];
            case 1: return [4 /*yield*/, _c.apply(void 0, [_d.sent()])];
            case 2: return [2 /*return*/, _d.sent()];
        }
    }); }); };
    Jsonarch.evaluateLazyResultType = function (entry, lazy) { return __awaiter(_this, void 0, void 0, function () { var _c; return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                _c = Jsonarch.evaluateResultType;
                return [4 /*yield*/, Jsonarch.restoreFromLazy(entry, lazy)];
            case 1: return [4 /*yield*/, _c.apply(void 0, [_d.sent()])];
            case 2: return [2 /*return*/, _d.sent()];
        }
    }); }); };
    var Limit;
    (function (Limit) {
        var _this = this;
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
        Limit.throwIfOverTheProcessTimeout = function (entry) { return __awaiter(_this, void 0, void 0, function () {
            var processTimeout, now, elapsed;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        processTimeout = Limit.getProcessTimeout(entry);
                        now = Jsonarch.getTicks();
                        elapsed = now - entry.context.profile.startAt;
                        if (!(processTimeout < elapsed)) return [3 /*break*/, 2];
                        return [4 /*yield*/, new Jsonarch.ErrorJson(entry, "Process Timeout", {
                                processTimeout: processTimeout,
                                elapsed: elapsed,
                            })];
                    case 1: throw _c.sent();
                    case 2: return [2 /*return*/];
                }
            });
        }); };
        Limit.throwIfOverTheNestDepth = function (entry) { return __awaiter(_this, void 0, void 0, function () {
            var maxObjectNestDepth, nestDepth;
            var _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        maxObjectNestDepth = Limit.getMaxObjectNestDepth(entry);
                        nestDepth = (_c = entry.context.nestDepth) !== null && _c !== void 0 ? _c : 0;
                        if (!(maxObjectNestDepth < nestDepth)) return [3 /*break*/, 2];
                        return [4 /*yield*/, new Jsonarch.ErrorJson(entry, "Too Deep Object Nest", {
                                maxObjectNestDepth: maxObjectNestDepth,
                                nestDepth: nestDepth,
                            })];
                    case 1: throw _d.sent();
                    case 2: return [2 /*return*/];
                }
            });
        }); };
        Limit.throwIfOverTheCallDepth = function (entry) { return __awaiter(_this, void 0, void 0, function () {
            var maxCallNestDepth, callDepth;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        maxCallNestDepth = Limit.getMaxCallNestDepth(entry);
                        callDepth = entry.callStack.length;
                        if (!(maxCallNestDepth < callDepth)) return [3 /*break*/, 2];
                        return [4 /*yield*/, new Jsonarch.ErrorJson(entry, "Too Deep Call Nest", {
                                maxCallNestDepth: maxCallNestDepth,
                                callDepth: callDepth,
                            })];
                    case 1: throw _c.sent();
                    case 2: return [2 /*return*/];
                }
            });
        }); };
        Limit.resetNestDepth = function (entry, nestDepth) {
            if (nestDepth === void 0) { nestDepth = 0; }
            return (__assign(__assign({}, entry), { context: __assign(__assign({}, entry.context), { nestDepth: nestDepth }) }));
        };
        Limit.incrementNestDepth = function (entry) { var _c; return Limit.resetNestDepth(entry, ((_c = entry.context.nestDepth) !== null && _c !== void 0 ? _c : 0) + 1); };
    })(Limit = Jsonarch.Limit || (Jsonarch.Limit = {}));
    Jsonarch.apply = function (entry, lazyable) {
        if (lazyable === void 0) { lazyable = false; }
        return Jsonarch.profile(entry, "apply", function () { return __awaiter(_this, void 0, void 0, function () {
            var template, value, result, result;
            var _this = this;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, Limit.throwIfOverTheProcessTimeout(entry)];
                    case 1:
                        _c.sent();
                        return [4 /*yield*/, Limit.throwIfOverTheNestDepth(entry)];
                    case 2:
                        _c.sent();
                        template = entry.template;
                        value = template.value;
                        if (!(null === value || "object" !== typeof value)) return [3 /*break*/, 6];
                        if (!Jsonarch.isIntermediate(value)) return [3 /*break*/, 3];
                        return [2 /*return*/, template];
                    case 3:
                        result = template;
                        return [4 /*yield*/, Jsonarch.makeOutputIntermediate(entry, result, entry.path)];
                    case 4: return [2 /*return*/, _c.sent()];
                    case 5: return [3 /*break*/, 13];
                    case 6:
                        if (!Jsonarch.isEvaluateTargetEntry(entry)) return [3 /*break*/, 9];
                        return [4 /*yield*/, Jsonarch.profile(entry, "apply.evaluate", function () { return __awaiter(_this, void 0, void 0, function () {
                                var _c;
                                var _this = this;
                                return __generator(this, function (_d) {
                                    switch (_d.label) {
                                        case 0:
                                            if (!(lazyable && Jsonarch.isLazyableEvaluateTargetEntry(entry))) return [3 /*break*/, 2];
                                            return [4 /*yield*/, Jsonarch.profile(entry, "apply.makeLazy", function () { return __awaiter(_this, void 0, void 0, function () { var _c, _d; return __generator(this, function (_e) {
                                                    switch (_e.label) {
                                                        case 0:
                                                            _c = Jsonarch.jsonParse;
                                                            _d = Jsonarch.jsonStringify;
                                                            return [4 /*yield*/, Jsonarch.makeLazy(entry)];
                                                        case 1: return [2 /*return*/, _c.apply(void 0, [_d.apply(void 0, [_e.sent()])])];
                                                    }
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
                    case 7:
                        result = _c.sent();
                        return [4 /*yield*/, Jsonarch.makeOutputIntermediate(entry, result, entry.path)];
                    case 8: return [2 /*return*/, _c.sent()];
                    case 9:
                        if (!Array.isArray(value)) return [3 /*break*/, 11];
                        return [4 /*yield*/, Jsonarch.profile(entry, "apply.array", function () { return __awaiter(_this, void 0, void 0, function () {
                                var maxArrayLength, nextDepthEntry, result, _c, _d, _e, _f, i, ix, _g, _h;
                                return __generator(this, function (_j) {
                                    switch (_j.label) {
                                        case 0:
                                            maxArrayLength = Limit.getMaxArrayLength(entry);
                                            if (!(maxArrayLength < value.length)) return [3 /*break*/, 2];
                                            return [4 /*yield*/, new Jsonarch.ErrorJson(entry, "Too Long Array Length", {
                                                    maxArrayLength: maxArrayLength,
                                                    templateLength: value.length,
                                                })];
                                        case 1: throw _j.sent();
                                        case 2:
                                            nextDepthEntry = Limit.incrementNestDepth(entry);
                                            result = [];
                                            _c = value;
                                            _d = [];
                                            for (_e in _c)
                                                _d.push(_e);
                                            _f = 0;
                                            _j.label = 3;
                                        case 3:
                                            if (!(_f < _d.length)) return [3 /*break*/, 6];
                                            _e = _d[_f];
                                            if (!(_e in _c)) return [3 /*break*/, 5];
                                            i = _e;
                                            ix = parseInt(i);
                                            _h = (_g = result).push;
                                            return [4 /*yield*/, Jsonarch.apply(__assign(__assign({}, nextDepthEntry), { path: Jsonarch.makeFullRefer(entry.path, ix), template: value[ix] }), lazyable)];
                                        case 4:
                                            _h.apply(_g, [_j.sent()]);
                                            _j.label = 5;
                                        case 5:
                                            _f++;
                                            return [3 /*break*/, 3];
                                        case 6: return [4 /*yield*/, Jsonarch.makeOutputIntermediate(entry, result, entry.path)];
                                        case 7: return [2 /*return*/, _j.sent()];
                                    }
                                });
                            }); })];
                    case 10: return [2 /*return*/, _c.sent()];
                    case 11: return [4 /*yield*/, Jsonarch.profile(entry, "apply.object", function () { return __awaiter(_this, void 0, void 0, function () {
                            var result, maxObjectMembers, nextDepthEntry, keys, _c, _d, _e, _f, i, key, _g, _h;
                            return __generator(this, function (_j) {
                                switch (_j.label) {
                                    case 0:
                                        result = {};
                                        maxObjectMembers = Limit.getMaxObjectMembers(entry);
                                        if (!(maxObjectMembers < Jsonarch.objectKeys(value).length)) return [3 /*break*/, 2];
                                        return [4 /*yield*/, new Jsonarch.ErrorJson(entry, "Too Many Object Members", {
                                                maxObjectMembers: maxObjectMembers,
                                                templateMembers: Jsonarch.objectKeys(value).length,
                                            })];
                                    case 1: throw _j.sent();
                                    case 2:
                                        nextDepthEntry = Limit.incrementNestDepth(entry);
                                        keys = Jsonarch.objectKeys(value);
                                        _c = keys;
                                        _d = [];
                                        for (_e in _c)
                                            _d.push(_e);
                                        _f = 0;
                                        _j.label = 3;
                                    case 3:
                                        if (!(_f < _d.length)) return [3 /*break*/, 6];
                                        _e = _d[_f];
                                        if (!(_e in _c)) return [3 /*break*/, 5];
                                        i = _e;
                                        key = keys[i];
                                        _g = result;
                                        _h = key;
                                        return [4 /*yield*/, Jsonarch.apply(__assign(__assign({}, nextDepthEntry), { path: Jsonarch.makeFullRefer(entry.path, key), template: value[key] }), lazyable)];
                                    case 4:
                                        _g[_h] = _j.sent();
                                        _j.label = 5;
                                    case 5:
                                        _f++;
                                        return [3 /*break*/, 3];
                                    case 6: return [4 /*yield*/, Jsonarch.makeOutputIntermediate(entry, result, entry.path)];
                                    case 7: return [2 /*return*/, _j.sent()];
                                }
                            });
                        }); })];
                    case 12: return [2 /*return*/, _c.sent()];
                    case 13: return [2 /*return*/];
                }
            });
        }); });
    };
    Jsonarch.lazyableApply = function (entry) { var _c, _d; return Jsonarch.apply(entry, (_d = (_c = entry.setting.process) === null || _c === void 0 ? void 0 : _c.lazyEvaluation) !== null && _d !== void 0 ? _d : true); };
    Jsonarch.applyRoot = function (entry, template, parameter, cache, setting, lazy) { return Jsonarch.profile(entry, "applyRoot", function () { return __awaiter(_this, void 0, void 0, function () {
        var handler, process, profile, context, callStack, path, rootEvaluateEntry, intermediateResult, _c, _d, _e, result, error_2, intermediateResult, result;
        return __generator(this, function (_f) {
            switch (_f.label) {
                case 0:
                    handler = entry.handler;
                    process = Jsonarch.regulateJsonable(entry.process, "deep");
                    profile = Jsonarch.makeProfile();
                    context = {
                        process: process,
                        profile: profile,
                    };
                    callStack = [];
                    path = { root: process.template, refer: [] };
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
                    };
                    _f.label = 1;
                case 1:
                    _f.trys.push([1, 7, , 9]);
                    if (!("resolveLazy" === lazy)) return [3 /*break*/, 4];
                    _d = Jsonarch.resolveLazy;
                    _e = [rootEvaluateEntry];
                    return [4 /*yield*/, Jsonarch.apply(rootEvaluateEntry)];
                case 2: return [4 /*yield*/, _d.apply(void 0, _e.concat([_f.sent()]))];
                case 3:
                    _c = _f.sent();
                    return [3 /*break*/, 6];
                case 4: return [4 /*yield*/, Jsonarch.apply(rootEvaluateEntry)];
                case 5:
                    _c = _f.sent();
                    _f.label = 6;
                case 6:
                    intermediateResult = _c;
                    result = {
                        process: process,
                        intermediateResult: intermediateResult,
                        profile: profile,
                        cache: cache,
                        setting: setting,
                    };
                    return [2 /*return*/, result];
                case 7:
                    error_2 = _f.sent();
                    return [4 /*yield*/, Jsonarch.parseErrorJson(entry, error_2)];
                case 8:
                    intermediateResult = _f.sent();
                    result = {
                        process: process,
                        intermediateResult: intermediateResult,
                        profile: profile,
                        cache: cache,
                        setting: setting,
                    };
                    return [2 /*return*/, result];
                case 9: return [2 /*return*/];
            }
        });
    }); }); };
    Jsonarch.applyRootResultToProcessResult = function (root) {
        var profile = Jsonarch.makeProfileReport(root.profile);
        var _c = Jsonarch.makeOutput(root.intermediateResult, root.process.template), output = _c.output, originMap = _c.originMap;
        var result = {
            $arch: "result",
            process: root.process,
            output: Jsonarch.decode(output),
            originMap: originMap,
            profile: profile,
            cache: root.cache,
            setting: root.setting,
        };
        return result;
    };
    Jsonarch.process = function (entry) { return __awaiter(_this, void 0, void 0, function () {
        var startAt, startAtTicks, handler, process, emptyCache, cache, _c, _d, settingFileContext, settingResult, _e, _f, setting, parameterResult, _g, _h, _j, parameter, template, result, _k;
        var _l, _m, _o;
        return __generator(this, function (_p) {
            switch (_p.label) {
                case 0:
                    startAt = new Date();
                    startAtTicks = Jsonarch.getTicks();
                    handler = entry.handler;
                    process = entry.process;
                    emptyCache = { "$arch": "cache" };
                    if (!process.cache) return [3 /*break*/, 2];
                    _d = Jsonarch.makeSolid;
                    return [4 /*yield*/, Jsonarch.load({ context: entry, cache: emptyCache, setting: boot_setting_json_1.default, handler: handler, file: process.cache })];
                case 1:
                    _c = _d.apply(void 0, [_p.sent()]);
                    return [3 /*break*/, 3];
                case 2:
                    _c = emptyCache;
                    _p.label = 3;
                case 3:
                    cache = _c;
                    settingFileContext = (_l = process.setting) !== null && _l !== void 0 ? _l : Jsonarch.getSystemFileContext("default-setting.json");
                    _e = Jsonarch.applyRoot;
                    _f = [{
                            handler: handler,
                            process: {
                                template: settingFileContext,
                                cache: process.cache,
                                setting: Jsonarch.getSystemFileContext("boot-setting.json"),
                            },
                            profile: Jsonarch.makeProfile(),
                        }];
                    return [4 /*yield*/, Jsonarch.load({ context: entry, cache: cache, setting: boot_setting_json_1.default, handler: handler, file: settingFileContext })];
                case 4: return [4 /*yield*/, _e.apply(void 0, _f.concat([_p.sent(), undefined,
                        cache,
                        boot_setting_json_1.default,
                        "resolveLazy"]))];
                case 5:
                    settingResult = _p.sent();
                    if (Jsonarch.isError(settingResult.intermediateResult)) {
                        return [2 /*return*/, Jsonarch.applyRootResultToProcessResult(settingResult)];
                    }
                    setting = (_m = settingResult.output) !== null && _m !== void 0 ? _m : { "$arch": "setting", };
                    if (!process.parameter) return [3 /*break*/, 8];
                    _h = Jsonarch.applyRoot;
                    _j = [{
                            process: {
                                template: process.parameter,
                                cache: process.cache,
                                setting: settingFileContext,
                            },
                            profile: Jsonarch.makeProfile(),
                            handler: handler,
                        }];
                    return [4 /*yield*/, Jsonarch.load({ context: entry, cache: cache, setting: setting, handler: handler, file: process.parameter })];
                case 6: return [4 /*yield*/, _h.apply(void 0, _j.concat([_p.sent(), undefined,
                        cache,
                        setting]))];
                case 7:
                    _g = _p.sent();
                    return [3 /*break*/, 9];
                case 8:
                    _g = undefined;
                    _p.label = 9;
                case 9:
                    parameterResult = _g;
                    parameter = parameterResult === null || parameterResult === void 0 ? void 0 : parameterResult.intermediateResult;
                    if (parameterResult && Jsonarch.isError(parameterResult.intermediateResult)) {
                        return [2 /*return*/, Jsonarch.applyRootResultToProcessResult(parameterResult)];
                    }
                    return [4 /*yield*/, Jsonarch.load({ context: entry, cache: cache, setting: setting, handler: handler, file: process.template })];
                case 10:
                    template = _p.sent();
                    _k = Jsonarch.applyRootResultToProcessResult;
                    return [4 /*yield*/, Jsonarch.applyRoot(entry, template, parameter, cache, setting, "resolveLazy")];
                case 11:
                    result = _k.apply(void 0, [_p.sent()]);
                    if (undefined === result.process.startAt) {
                        //  将来的に UI ができた際は toLocaleString() の値ではなく、 getTime() の値を格納するように変更
                        result.process.startAt = startAt.toLocaleString((_o = result.setting.locale) === null || _o === void 0 ? void 0 : _o.language);
                    }
                    result.process.duration = Jsonarch.getTicks() - startAtTicks;
                    return [2 /*return*/, result];
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