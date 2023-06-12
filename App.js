import { NativeBaseProvider } from "native-base";
import Navigation from "./navigation";
import * as Font from "expo-font";
import { AppProvider } from "./context/AppContext";
import { useTranslation, initReactI18next } from "react-i18next";
import i18n from "i18next";
import { ExpoLocalization } from "expo-localization";
import en from "./translations/en.json";
import vi from "./translations/vi.json";
import { AutocompleteDropdownContextProvider } from "react-native-autocomplete-dropdown";

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    vi: { translation: vi },
  },
  fallbackLng: "vi", // Default language fallback
  debug: false, // Set to true for development
  interpolation: {
    escapeValue: false, // React already escapes by default
  }, // Default language if translation is missing
});

async function loadFonts() {
  await Font.loadAsync({
    "MerriweatherSans-Bold": require("./assets/fonts/MerriweatherSans-Bold.ttf"),
    "MerriweatherSans-BoldItalic": require("./assets/fonts/MerriweatherSans-BoldItalic.ttf"),
    "MerriweatherSans-ExtraBold": require("./assets/fonts/MerriweatherSans-ExtraBold.ttf"),
    "MerriweatherSans-ExtraBoldItalic": require("./assets/fonts/MerriweatherSans-ExtraBoldItalic.ttf"),
    "MerriweatherSans-Italic": require("./assets/fonts/MerriweatherSans-Italic.ttf"),
    "MerriweatherSans-Light": require("./assets/fonts/MerriweatherSans-Light.ttf"),
    "MerriweatherSans-LightItalic": require("./assets/fonts/MerriweatherSans-LightItalic.ttf"),
    "MerriweatherSans-Medium": require("./assets/fonts/MerriweatherSans-Medium.ttf"),
    "MerriweatherSans-MediumItalic": require("./assets/fonts/MerriweatherSans-MediumItalic.ttf"),
    "MerriweatherSans-Regular": require("./assets/fonts/MerriweatherSans-Regular.ttf"),
    "MerriweatherSans-SemiBold": require("./assets/fonts/MerriweatherSans-SemiBold.ttf"),
    "MerriweatherSans-SemiBoldItalic": require("./assets/fonts/MerriweatherSans-SemiBoldItalic.ttf"),
  });
}
export default function App() {
  loadFonts().then(() => {});

  return (
    <AppProvider>
      <NativeBaseProvider>
        <AutocompleteDropdownContextProvider>
          <Navigation></Navigation>
        </AutocompleteDropdownContextProvider>
      </NativeBaseProvider>
    </AppProvider>
  );
}
