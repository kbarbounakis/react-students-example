import configuration from "../config/app.json";

export class ConfigurationService {
    constructor() {
        this.settings = configuration.settings;
    }

    get currentLanguage() {
        const value = localStorage.getItem("currentLang");
        return value || this.settings.i18n.defaultLocale;
    }

    set currentLanguage(lang) {
        const locale = this.settings.i18n.locales.find((locale) => locale === lang);
        if (locale == null) {
            throw new Error('The given locale is unavailable');
        }
        localStorage.setItem("currentLang", locale);
    }

}