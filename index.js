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
var Jsonarch;
(function (Jsonarch) {
    var _this = this;
    var isConsoleMode = typeof window !== 'undefined';
    var fs = isConsoleMode ? require("fs") : undefined;
    Jsonarch.schema = "https://raw.githubusercontent.com/wraith13/jsonarch/master/json-schema.json#";
    Jsonarch.jsonStringify = function (source, replacer, space) { return JSON.stringify(source, replacer, space); };
    Jsonarch.jsonParse = function (text, reviver) { return JSON.parse(text, reviver); };
    Jsonarch.objectKeys = function (target) { return Object.keys(target); };
    Jsonarch.isJsonarchBase = function (template) {
        return null !== template &&
            "object" === typeof template &&
            "$arch" in template &&
            "string" === typeof template.$arch;
    };
    Jsonarch.isNoneFileContext = function (file) { return "none" === file.category; };
    Jsonarch.isNetFileContext = function (file) { return "net" === file.category; };
    Jsonarch.isLocalFileContext = function (file) { return "local" === file.category; };
    Jsonarch.isNoneFileLoadEntry = function (entry) { return Jsonarch.isNoneFileContext(entry.file); };
    Jsonarch.isNetFileLoadEntry = function (entry) { return Jsonarch.isNetFileContext(entry.file); };
    Jsonarch.isLocalFileLoadEntry = function (entry) { return Jsonarch.isNetFileContext(entry.file); };
    Jsonarch.isEvaluateTargetEntry = function (entry) {
        return Jsonarch.isJsonarchBase(entry.template);
    };
    Jsonarch.isJsonarch = function (type) {
        return (function (template) {
            return Jsonarch.isJsonarchBase(template) && type === template.$arch;
        });
    };
    Jsonarch.loadNetFile = function (entry) { return new Promise(function (resolve, reject) {
        var request = new XMLHttpRequest();
        request.open('GET', entry.file.path, true);
        request.onreadystatechange = function () {
            if (4 === request.readyState) {
                if (200 <= request.status && request.status < 300) {
                    resolve(request.responseText);
                }
                else {
                    reject();
                }
            }
        };
        request.send(null);
    }); };
    Jsonarch.loadLocalFile = function (entry) { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            if (fs) {
                return [2 /*return*/, fs.readFileSync(entry.file.path, { encoding: "utf-8" })];
            }
            else {
                throw new Error("Not support to load local file on web.");
            }
            return [2 /*return*/];
        });
    }); };
    Jsonarch.loadFile = function (entry) { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!entry.handler.load) return [3 /*break*/, 2];
                    return [4 /*yield*/, entry.handler.load(entry)];
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
    }); };
    Jsonarch.load = function (entry) { return __awaiter(_this, void 0, void 0, function () {
        var cache, result;
        var _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    if (!Jsonarch.isNoneFileLoadEntry(entry)) return [3 /*break*/, 1];
                    return [2 /*return*/, Jsonarch.jsonParse(entry.file.data)];
                case 1:
                    if (!(Jsonarch.isNetFileLoadEntry(entry) || Jsonarch.isLocalFileLoadEntry(entry))) return [3 /*break*/, 3];
                    cache = (_b = (_a = entry.setting.cache) === null || _a === void 0 ? void 0 : _a.json) === null || _b === void 0 ? void 0 : _b[entry.file.path];
                    if (undefined !== cache) {
                        return [2 /*return*/, cache];
                    }
                    return [4 /*yield*/, Jsonarch.loadFile(entry)];
                case 2:
                    result = _c.sent();
                    if (!entry.setting.cache) {
                        entry.setting.cache = { $arch: "cache", };
                    }
                    if (!entry.setting.cache.json) {
                        entry.setting.cache.json = {};
                    }
                    entry.setting.cache.json[entry.file.path] = result;
                    return [2 /*return*/, result];
                case 3: throw new Error("never");
            }
        });
    }); };
    Jsonarch.isStaticData = Jsonarch.isJsonarch("static");
    Jsonarch.evaluateStatic = function (entry) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
        return [2 /*return*/, Jsonarch.isStaticData(entry.template) ? entry.template.return : undefined];
    }); }); };
    Jsonarch.isIncludeStaticJsonData = Jsonarch.isJsonarch("include-static-json");
    Jsonarch.evaluateIncludeStaticJson = function (entry) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
        return [2 /*return*/, Jsonarch.isIncludeStaticJsonData(entry.template) ? entry.template.path : undefined];
    }); }); };
    Jsonarch.evaluate = function (entry) { return __awaiter(_this, void 0, void 0, function () {
        var evaluatorList, _a, _b, _i, i, result;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    evaluatorList = [
                        Jsonarch.evaluateStatic,
                        Jsonarch.evaluateIncludeStaticJson,
                    ];
                    _a = [];
                    for (_b in evaluatorList)
                        _a.push(_b);
                    _i = 0;
                    _c.label = 1;
                case 1:
                    if (!(_i < _a.length)) return [3 /*break*/, 4];
                    i = _a[_i];
                    return [4 /*yield*/, evaluatorList[i](entry)];
                case 2:
                    result = _c.sent();
                    if (undefined !== result) {
                        return [2 /*return*/, result];
                    }
                    _c.label = 3;
                case 3:
                    _i++;
                    return [3 /*break*/, 1];
                case 4: return [2 /*return*/, entry.template];
            }
        });
    }); };
    Jsonarch.apply = function (entry) { return __awaiter(_this, void 0, void 0, function () {
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
    }); };
    Jsonarch.compile = function (entry) { return __awaiter(_this, void 0, void 0, function () {
        var handler, setting, template, parameter, context, rootEvaluateEntry, output, cache, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    handler = entry.handler;
                    return [4 /*yield*/, Jsonarch.load({ setting: { "$arch": "setting", }, handler: entry.handler, file: entry.setting })];
                case 1:
                    setting = (_a.sent());
                    return [4 /*yield*/, Jsonarch.load({ setting: setting, handler: handler, file: entry.setting })];
                case 2:
                    template = _a.sent();
                    return [4 /*yield*/, Jsonarch.load({ setting: setting, handler: handler, file: entry.setting })];
                case 3:
                    parameter = _a.sent();
                    context = {
                        template: entry.template,
                        paremter: entry.paremter,
                        setting: entry.setting,
                    };
                    rootEvaluateEntry = {
                        context: context,
                        template: template,
                        parameter: parameter,
                        setting: setting,
                        handler: handler,
                    };
                    return [4 /*yield*/, Jsonarch.apply(rootEvaluateEntry)];
                case 4:
                    output = _a.sent();
                    cache = rootEvaluateEntry.setting.cache;
                    result = {
                        $arch: "result",
                        output: output,
                        cache: cache,
                    };
                    return [2 /*return*/, result];
            }
        });
    }); };
})(Jsonarch || (Jsonarch = {}));
//# sourceMappingURL=index.js.map