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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Jsonarch = void 0;
var setting_json_1 = __importDefault(require("./setting.json"));
var en_json_1 = __importDefault(require("./language/en.json"));
var ja_json_1 = __importDefault(require("./language/ja.json"));
var Jsonarch;
(function (Jsonarch) {
    var _this = this;
    var isConsoleMode = typeof window === 'undefined';
    var fs = isConsoleMode ? require("fs") : undefined;
    var Locale;
    (function (Locale) {
        Locale.master = {
            en: en_json_1.default,
            ja: ja_json_1.default,
        };
        Locale.locales = Object.keys(Locale.master);
        Locale.getSystemLocale = function () { return isConsoleMode ?
            Intl.DateTimeFormat().resolvedOptions().locale :
            navigator.language; };
        var masterKey = 0 <= Locale.locales.indexOf(Locale.getSystemLocale()) ?
            Locale.getSystemLocale() :
            Locale.locales[0];
        Locale.getLocaleName = function (locale) { return Locale.master[locale].$name; };
        Locale.setLocale = function (locale) {
            var key = locale !== null && locale !== void 0 ? locale : Locale.getSystemLocale();
            if (0 <= Locale.locales.indexOf(key)) {
                masterKey = key;
            }
        };
        Locale.getPrimary = function (key) { return Locale.master[masterKey][key]; };
        Locale.getSecondary = function (key) { return Locale.master[Locale.locales.filter(function (locale) { return masterKey !== locale; })[0]][key]; };
        Locale.string = function (key) { return Locale.getPrimary(key) || key; };
        Locale.map = function (key) { return Locale.string(key); };
        Locale.parallel = function (key) { return "".concat(Locale.getPrimary(key), " / ").concat(Locale.getSecondary(key)); };
    })(Locale = Jsonarch.Locale || (Jsonarch.Locale = {}));
    Jsonarch.templateSchema = "https://raw.githubusercontent.com/wraith13/jsonarch/master/json-schema/template-json-schema.json#";
    Jsonarch.settingSchema = "https://raw.githubusercontent.com/wraith13/jsonarch/master/json-schema/setting-json-schema.json#";
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
    Jsonarch.makeFullPath = function (contextOrEntry, path) {
        var context = Jsonarch.getContext(contextOrEntry);
        if (/^\.\.?\//.test(path)) {
            if (Jsonarch.isNoneFileContext(context.template)) {
                throw new Error("makeFullPath({ templte:{ category: none }, },...)");
            }
            else {
                var parent_1 = context.template.path
                    .replace(/#.*/, "")
                    .replace(/\/[^/]*$/, "");
                var current = path.replace(/^\.\//, "");
                while (/^\.\.\//.test(current)) {
                    parent_1 = parent_1.replace(/\/[^/]*$/, "");
                    current = current.replace(/^\.\.\//, "");
                }
                return "".concat(parent_1, "/").concat(current);
            }
        }
        else if (!isConsoleMode && /^\//.test(path)) {
            if (Jsonarch.isNoneFileContext(context.template)) {
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
    Jsonarch.pathToFileContext = function (contextOrEntry, path) {
        return (!isConsoleMode) || /^https?\:\/\//.test(path) ?
            { category: "net", path: Jsonarch.makeFullPath(contextOrEntry, path), } :
            { category: "local", path: Jsonarch.makeFullPath(contextOrEntry, path) };
    };
    Jsonarch.commandLineArgumentToFileContext = function (argument) {
        return /^\{.*\}&/.test(argument) ? { category: "none", data: Jsonarch.jsonParse(argument), } :
            /^https?\:\/\//.test(argument) ? { category: "net", path: argument, } :
                { category: "local", path: argument };
    };
    Jsonarch.getContext = function (contextOrEntry) {
        return "context" in contextOrEntry ? contextOrEntry.context : contextOrEntry;
    };
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
            return error.message;
        }
    };
    Jsonarch.loadNetFile = function (entry) { return Jsonarch.profile(entry, "loadNetFile", function () { return new Promise(function (resolve, reject) {
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
    }); }); };
    Jsonarch.loadLocalFile = function (entry) { return Jsonarch.profile(entry, "loadLocalFile", function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            if (fs) {
                return [2 /*return*/, fs.readFileSync(entry.file.path, { encoding: "utf-8" })];
            }
            else {
                throw new Error("Not support to load local file on web.");
            }
            return [2 /*return*/];
        });
    }); }); };
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
        var cache, result;
        var _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    if (!Jsonarch.isNoneFileLoadEntry(entry)) return [3 /*break*/, 1];
                    return [2 /*return*/, entry.file.data];
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
    }); }); };
    Jsonarch.isStaticData = Jsonarch.isJsonarch("static");
    Jsonarch.evaluateStatic = function (entry) { return Jsonarch.profile(entry, "evaluateStatic", function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
        return [2 /*return*/, Jsonarch.isStaticData(entry.template) ? entry.template.return : undefined];
    }); }); }); };
    Jsonarch.isIncludeStaticJsonData = Jsonarch.isJsonarch("include-static-json");
    Jsonarch.evaluateIncludeStaticJson = function (entry) { return Jsonarch.profile(entry, "evaluateIncludeStaticJson", function () { return __awaiter(_this, void 0, void 0, function () {
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    if (!Jsonarch.isIncludeStaticJsonData(entry.template)) return [3 /*break*/, 2];
                    return [4 /*yield*/, Jsonarch.loadFile(__assign(__assign({}, entry), { file: Jsonarch.pathToFileContext(entry, entry.template.path) }))];
                case 1:
                    _a = _b.sent();
                    return [3 /*break*/, 3];
                case 2:
                    _a = undefined;
                    _b.label = 3;
                case 3: return [2 /*return*/, _a];
            }
        });
    }); }); };
    Jsonarch.evaluate = function (entry) { return Jsonarch.profile(entry, "evaluate", function () { return __awaiter(_this, void 0, void 0, function () {
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
    Jsonarch.applyRoot = function (entry, template, parameter, setting) { return Jsonarch.profile(entry, "applyRoot", function () { return __awaiter(_this, void 0, void 0, function () {
        var handler, context, rootEvaluateEntry, output, cache, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    handler = entry.handler;
                    context = {
                        template: entry.template,
                        paremter: entry.parameter,
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
                case 1:
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
    }); }); };
    Jsonarch.process = function (entry) { return __awaiter(_this, void 0, void 0, function () {
        var handler, settingResult, _a, _b, setting, parameterResult, _c, _d, _e, parameter, template;
        var _f, _g;
        return __generator(this, function (_h) {
            switch (_h.label) {
                case 0:
                    handler = entry.handler;
                    _a = Jsonarch.applyRoot;
                    _b = [{
                            handler: handler,
                            template: entry.setting,
                            setting: { category: "none", data: setting_json_1.default, }
                        }];
                    return [4 /*yield*/, Jsonarch.load({ context: entry, setting: setting_json_1.default, handler: handler, file: entry.setting })];
                case 1: return [4 /*yield*/, _a.apply(void 0, _b.concat([_h.sent(), null,
                        setting_json_1.default]))];
                case 2:
                    settingResult = _h.sent();
                    setting = (_f = settingResult === null || settingResult === void 0 ? void 0 : settingResult.output) !== null && _f !== void 0 ? _f : { "$arch": "setting", };
                    if (!entry.parameter) return [3 /*break*/, 5];
                    _d = Jsonarch.applyRoot;
                    _e = [{
                            handler: handler,
                            template: entry.parameter,
                            setting: entry.setting,
                        }];
                    return [4 /*yield*/, Jsonarch.load({ context: entry, setting: setting, handler: handler, file: entry.parameter })];
                case 3: return [4 /*yield*/, _d.apply(void 0, _e.concat([_h.sent(), null,
                        setting]))];
                case 4:
                    _c = _h.sent();
                    return [3 /*break*/, 6];
                case 5:
                    _c = undefined;
                    _h.label = 6;
                case 6:
                    parameterResult = _c;
                    parameter = (_g = parameterResult === null || parameterResult === void 0 ? void 0 : parameterResult.output) !== null && _g !== void 0 ? _g : null;
                    return [4 /*yield*/, Jsonarch.load({ context: entry, setting: setting, handler: handler, file: entry.template })];
                case 7:
                    template = _h.sent();
                    return [2 /*return*/, Jsonarch.applyRoot(entry, template, parameter, setting)];
            }
        });
    }); };
    Jsonarch.jsonToString = function (json, setting) {
        if ("number" === typeof setting.indent) {
            return Jsonarch.jsonStringify(json, undefined, setting.indent);
        }
        else if ("tab" === setting.indent) {
            return Jsonarch.jsonStringify(json, undefined, "\t");
        }
        else {
            // "minify" === setting.indent
            return Jsonarch.jsonStringify(json);
        }
    };
})(Jsonarch = exports.Jsonarch || (exports.Jsonarch = {}));
//# sourceMappingURL=index.js.map