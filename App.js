import { NativeBaseProvider } from "native-base";
import Navigation from "./navigation";
import * as Font from "expo-font";
import { AppProvider } from "./context/AppContext";
import Geocoder from "react-native-geocoding";

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
  loadFonts().then(() => {
    Geocoder.init("AIzaSyCdVOmKHCAC6pBedDk_XGL975A5xJFkuTw", {
      language: "vi",
    });
    return (
      <AppProvider>
        <Navigation></Navigation>
      </AppProvider>
    );
  });
}
