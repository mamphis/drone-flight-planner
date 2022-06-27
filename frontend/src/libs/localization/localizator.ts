import languages, { LanguageDefinition, LanguageValues } from './locales';

export type Translator = (key: string, ...args: string[]) => string;

export const translate = (key: string, ...args: any[]) => {
    const parts = key.split('.');

    const getTranslation = (language: LanguageDefinition) => {
        const values = language.values;
        const translation = parts.reduce((dict: LanguageValues | string | undefined, keyPart) => {
            if (dict && typeof (dict) === 'object' && dict[keyPart]) {
                return dict[keyPart];
            }
        }, values);

        return translation;
    }

    // Get the first language that has a translation
    const languageIdentifier = navigator.languages.find(lang => languages.find(language => language.lang === lang));

    // If no language was found, use the default language
    const translation = (() => {
        const language = languages.find(l => languageIdentifier ? l.lang === languageIdentifier : l.default);
        if (!language) return;

        const translation = getTranslation(language);
        if (typeof (translation) === 'string') {
            return translation;
        } else if (typeof (translation) === 'object') {
            if (translation._) {
                return translation._.toString();
            }
        }

        if (!language.default) {
            const defaultTranslation = getTranslation(languages.find(l => l.default)!);

            if (typeof (defaultTranslation) === 'string') {
                return defaultTranslation;
            } else if (typeof (translation) === 'object') {
                if (translation._) {
                    return translation._.toString();
                }
            }
        }
    })();

    return translation ? translation.replace(/\{(\d+)\}/g, (_, index) => args[index]?.toString() ?? '') : key;
}