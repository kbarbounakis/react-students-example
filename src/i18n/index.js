import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "./en.json";
import el from "./el.json";
i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources: {
      en,
      el,
    },
    lng: "el",
    fallbackLng: "en",
    debug: true,
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
