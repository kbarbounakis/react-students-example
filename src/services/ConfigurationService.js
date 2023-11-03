import configuration from "../config/app.json";

export class ConfigurationService {
  constructor() {
    this.settings = configuration.settings;
    // replace callback (for codesanbox)
    const origin = new URL(window.location.href).origin;
    this.settings.auth.oauth2.callbackURL = new URL(
      "/auth/callback",
      origin,
    ).toString();
    // replace logout (for codesanbox)
    const logoutURL = new URL(this.settings.auth.logoutURL);
    logoutURL.searchParams.set("continue", origin);
    this.settings.auth.logoutURL = logoutURL.toString();
    console.log(this.settings);
  }

  get currentLanguage() {
    const value = localStorage.getItem("currentLang");
    return value || this.settings.i18n.defaultLocale;
  }

  set currentLanguage(lang) {
    const locale = this.settings.i18n.locales.find((locale) => locale === lang);
    if (locale == null) {
      throw new Error("The given locale is unavailable");
    }
    localStorage.setItem("currentLang", locale);
  }
}
