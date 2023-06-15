import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// Import language resources
import en from "./translations/en.json";
import vi from "./translations/vi.json";

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    vi: { translation: vi },
  },
  fallbackLng: "en", // Default language fallback
  debug: true, // Set to true for development
  interpolation: {
    escapeValue: false, // React already escapes by default
  },
});

export default i18n;
