import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import pt from "./locales/default.pt.json";
import en from "./locales/default.en.json";

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    interpolation: {
      escapeValue: false, // not needed for react!!
    },

    // debug: true,

    resources: {
      pt: {
        common: pt["pt-BR"],
      },
      en: {
        common: en.en,
      },
    },

    lng: "pt", // if you're using a language detector, do not define the lng option
    fallbackLng: "en",

    ns: ["common"],

    defaultNS: "common",

    react: {
      wait: false,
      bindI18n: "languageChanged loaded",
      bindStore: "added removed",
      nsMode: "default",
    },
  });

export default i18n;
