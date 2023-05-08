import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NativeBaseProvider } from "native-base";
import { Platform } from "react-native";
import { AuthenticationStackScreen } from "./AuthenticationNavigator";
import MainNavigator from "./MainNavigator";
import OnBoardingScreen from "../screens/OnBoardingScreen";

const Stack = createNativeStackNavigator();

export default function Navigation() {
  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="OnBoarding" component={OnBoardingScreen} />
          <Stack.Screen
            name="AuthenticationStack"
            component={AuthenticationStackScreen}
          />
          <Stack.Screen name="MainNavigator" component={MainNavigator} />
        </Stack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}
