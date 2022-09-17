import languageEn from "./language/en.json";
import languageJa from "./language/ja.json";
export declare const master: {
    en: {
        $name: string;
    };
    ja: {
        $name: string;
    };
};
export declare type LocaleKeyType = keyof typeof languageEn & keyof typeof languageJa;
export declare type LocaleType = keyof typeof master;
export declare const locales: ("en" | "ja")[];
export declare const getSystemLocale: () => "en" | "ja";
export declare const getShortLocale: (locale: string) => string;
export declare const getMatchLocaleKey: (locale: string) => "en" | "ja";
export declare const getLocaleName: (locale: LocaleType) => string;
export declare const setLocale: (locale: LocaleType | null) => void;
export declare const getPrimary: (key: LocaleKeyType) => string;
export declare const getSecondary: (key: LocaleKeyType) => string;
export declare const string: (key: string) => string;
export declare const map: (key: LocaleKeyType) => string;
export declare const parallel: (key: LocaleKeyType) => string;
