import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import esCommon from "../locales/es/common.json";
import enCommon from "../locales/en/common.json";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    // Idiomas
    fallbackLng: "es",
    supportedLngs: ["es", "en"],

    // Namespaces (podés sumar más luego)
    ns: ["common"],
    defaultNS: "common",

    // Recursos (bundled en build)
    resources: {
      es: { common: esCommon },
      en: { common: enCommon }
    },

    // Detectar y persistir idioma
    detection: {
      order: ["localStorage", "navigator"],
      caches: ["localStorage"],
      lookupLocalStorage: "lng"
    },

    interpolation: {
      escapeValue: false // React ya escapa
    },

    // Si preferís NO usar Suspense, dejalo en false
    react: {
      useSuspense: false
    }
  });

export default i18n;
