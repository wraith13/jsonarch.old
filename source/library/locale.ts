import * as System from "./system";
import languageEn from "./language/en.json";
import languageJa from "./language/ja.json";
export const master =
{
    en: languageEn,
    ja: languageJa,
};
export type LocaleKeyType =
    keyof typeof languageEn &
    keyof typeof languageJa;
export type LocaleType = keyof typeof master;
export const locales = Object.keys(master) as LocaleType[];
export const getSystemLocale = () => System.getLocale() as LocaleType;
export const getShortLocale = (locale: string) => locale.replace(/-.*$/, "");
export const getMatchLocaleKey = (locale: string) =>
{
    const index = locales.indexOf(locale as LocaleType);
    if (0 < index)
    {
        return locales[index];
    }
    const shortIndex = locales.indexOf(getShortLocale(locale) as LocaleType);
    if (0 < shortIndex)
    {
        return locales[shortIndex];
    }
    return locales[0];
};
let masterKey: LocaleType = getMatchLocaleKey(getSystemLocale());
export const getLocaleName = (locale: LocaleType) => master[locale].$name;
export const setLocale = (locale: LocaleType | null) =>
{
    const key = locale ?? getSystemLocale();
    if (0 <= locales.indexOf(key))
    {
        masterKey = key;
    }
};
export const getPrimary = (key : LocaleKeyType) => master[masterKey][key];
export const getSecondary = (key : LocaleKeyType) => master[locales.filter(locale => masterKey !== locale)[0]][key];
export const string = (key : string) : string => getPrimary(key as LocaleKeyType) || key;
export const map = (key : LocaleKeyType) : string => string(key);
export const parallel = (key : LocaleKeyType) : string => `${getPrimary(key)} / ${getSecondary(key)}`;

