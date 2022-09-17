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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.parallel = exports.map = exports.string = exports.getSecondary = exports.getPrimary = exports.setLocale = exports.getLocaleName = exports.getMatchLocaleKey = exports.getShortLocale = exports.getSystemLocale = exports.locales = exports.master = void 0;
var System = __importStar(require("./system"));
var en_json_1 = __importDefault(require("./language/en.json"));
var ja_json_1 = __importDefault(require("./language/ja.json"));
exports.master = {
    en: en_json_1.default,
    ja: ja_json_1.default,
};
exports.locales = Object.keys(exports.master);
var getSystemLocale = function () { return System.getLocale(); };
exports.getSystemLocale = getSystemLocale;
var getShortLocale = function (locale) { return locale.replace(/-.*$/, ""); };
exports.getShortLocale = getShortLocale;
var getMatchLocaleKey = function (locale) {
    var index = exports.locales.indexOf(locale);
    if (0 < index) {
        return exports.locales[index];
    }
    var shortIndex = exports.locales.indexOf((0, exports.getShortLocale)(locale));
    if (0 < shortIndex) {
        return exports.locales[shortIndex];
    }
    return exports.locales[0];
};
exports.getMatchLocaleKey = getMatchLocaleKey;
var masterKey = (0, exports.getMatchLocaleKey)((0, exports.getSystemLocale)());
var getLocaleName = function (locale) { return exports.master[locale].$name; };
exports.getLocaleName = getLocaleName;
var setLocale = function (locale) {
    var key = locale !== null && locale !== void 0 ? locale : (0, exports.getSystemLocale)();
    if (0 <= exports.locales.indexOf(key)) {
        masterKey = key;
    }
};
exports.setLocale = setLocale;
var getPrimary = function (key) { return exports.master[masterKey][key]; };
exports.getPrimary = getPrimary;
var getSecondary = function (key) { return exports.master[exports.locales.filter(function (locale) { return masterKey !== locale; })[0]][key]; };
exports.getSecondary = getSecondary;
var string = function (key) { return (0, exports.getPrimary)(key) || key; };
exports.string = string;
var map = function (key) { return (0, exports.string)(key); };
exports.map = map;
var parallel = function (key) { return "".concat((0, exports.getPrimary)(key), " / ").concat((0, exports.getSecondary)(key)); };
exports.parallel = parallel;
//# sourceMappingURL=locale.js.map