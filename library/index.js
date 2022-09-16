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
var boot_setting_json_1 = __importDefault(require("./boot.setting.json"));
var setting_json_1 = __importDefault(require("./setting.json"));
var en_json_1 = __importDefault(require("./language/en.json"));
var ja_json_1 = __importDefault(require("./language/ja.json"));
var Jsonarch;
(function (Jsonarch) {
    var _this = this;
    Jsonarch.packageJson = require("../package.json");
    Jsonarch.name = Jsonarch.packageJson.name;
    Jsonarch.version = Jsonarch.packageJson.version;
    var isConsoleMode = typeof window === 'undefined';
    var fs = isConsoleMode ? require("fs") : undefined;
    var https = isConsoleMode ? require("https") : undefined;
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
        Locale.getShortLocale = function (locale) { return locale.replace(/-.*$/, ""); };
        Locale.getMatchLocaleKey = function (locale) {
            var index = Locale.locales.indexOf(locale);
            if (0 < index) {
                return Locale.locales[index];
            }
            var shortIndex = Locale.locales.indexOf(Locale.getShortLocale(locale));
            if (0 < shortIndex) {
                return Locale.locales[shortIndex];
            }
            return Locale.locales[0];
        };
        var masterKey = Locale.getMatchLocaleKey(Locale.getSystemLocale());
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
                var current = path.replace(/^\.\//, "");
                while (/^\.\.\//.test(current)) {
                    parent_1 = parent_1.replace(/\/[^/]*$/, "");
                    current = current.replace(/^\.\.\//, "");
                }
                return "".concat(parent_1, "/").concat(current);
            }
        }
        else if (!isConsoleMode && /^\//.test(path)) {
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
    Jsonarch.jsonToFileContext = function (data) {
        return ({ category: "none", data: data, });
    };
    Jsonarch.pathToFileContext = function (contextOrEntry, path) {
        return (!isConsoleMode) || /^https?\:\/\//.test(path) ?
            { category: "net", path: Jsonarch.makeFullPath(contextOrEntry, path), } :
            { category: "local", path: Jsonarch.makeFullPath(contextOrEntry, path) };
    };
    Jsonarch.commandLineArgumentToFileContext = function (argument) {
        return /^system\:/.test(argument) ? { category: "system", id: argument.replace(/^system\:/, ""), } :
            /^\{.*\}&/.test(argument) ? { category: "none", data: Jsonarch.jsonParse(argument), } :
                /^https?\:\/\//.test(argument) ? { category: "net", path: argument, } :
                    { category: "local", path: argument };
    };
    Jsonarch.getContext = function (contextOrEntry) {
        return "context" in contextOrEntry ? contextOrEntry.context : contextOrEntry;
    };
    Jsonarch.isSystemFileLoadEntry = function (entry) { return Jsonarch.isSystemFileContext(entry.file); };
    Jsonarch.isNoneFileLoadEntry = function (entry) { return Jsonarch.isNoneFileContext(entry.file); };
    Jsonarch.isNetFileLoadEntry = function (entry) { return Jsonarch.isNetFileContext(entry.file); };
    Jsonarch.isLocalFileLoadEntry = function (entry) { return Jsonarch.isLocalFileContext(entry.file); };
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
    Jsonarch.loadNetFile = function (entry) { return Jsonarch.profile(entry, "loadNetFile", function () { return new Promise(function (resolve, reject) {
        if (isConsoleMode) {
            https.get(entry.file.path, function (response) {
                //console.log('statusCode:', response.statusCode);
                //console.log('headers:', response.headers);
                if (200 <= response.statusCode && response.statusCode < 300) {
                    var buffer_1 = "";
                    response.on("data", function (chunk) { return buffer_1 += chunk; });
                    response.on("end", function () { return resolve(buffer_1); });
                }
                else {
                    reject();
                }
            })
                .on("error", function () { return reject(); });
        }
        else {
            var request_1 = new XMLHttpRequest();
            request_1.open('GET', entry.file.path, true);
            request_1.onreadystatechange = function () {
                if (4 === request_1.readyState) {
                    if (200 <= request_1.status && request_1.status < 300) {
                        resolve(request_1.responseText);
                    }
                    else {
                        reject();
                    }
                }
            };
            request_1.send(null);
        }
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
    Jsonarch.applyRoot = function (entry, template, parameter, cache, setting) { return Jsonarch.profile(entry, "applyRoot", function () { return __awaiter(_this, void 0, void 0, function () {
        var handler, context, rootEvaluateEntry, output, result;
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
                    return [4 /*yield*/, Jsonarch.apply(rootEvaluateEntry)];
                case 1:
                    output = _a.sent();
                    result = {
                        $arch: "result",
                        output: output,
                        cache: cache,
                        setting: setting,
                    };
                    return [2 /*return*/, result];
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
    Jsonarch.jsonToString = function (json, asType, setting) {
        if ("output" === asType && setting.textOutput && "string" === typeof json) {
            return json;
        }
        else if ("number" === typeof setting.indent) {
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