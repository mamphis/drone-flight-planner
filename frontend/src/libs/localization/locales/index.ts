import { en } from './en';

export type LanguageValues = { [key: string]: string | LanguageValues };
export type LanguageDefinition = { lang: string, values: LanguageValues, default: boolean };

export default [
    { values: en, lang: 'en', default: true },
] as LanguageDefinition[];