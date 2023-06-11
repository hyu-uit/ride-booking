import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NativeBaseProvider } from "native-base";
import { AuthenticationStackScreen } from "./AuthenticationNavigator";
import MainNavigator from "./MainNavigator";
import OnBoardingScreen from "../screens/OnBoardingScreen";
import MainRiderNavigator from "./MainRiderNavigator";
import { StudentOfficeStackScreen } from "./StudentOfficeNavigator";
import { useEffect, useState } from "react";
import { getFromAsyncStorage } from "../helper/asyncStorage";
import { IS_FIRST_USE } from "../constants/asyncStorageKey";

const Stack = createNativeStackNavigator();

export default function Navigation() {
  const [isFirstUse, setIsFirstUse] = useState(true);
  useEffect(() => {
    getFromAsyncStorage(IS_FIRST_USE).then((value) => {
      console.log(
        "🚀 ~ file: index.js:19 ~ getFromAsyncStorage ~ value:",
        value
      );
      if (value) setIsFirstUse(value);
    });
  }, []);
  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {/* {isFirstUse ? (
            <Stack.Screen name="OnBoarding" component={OnBoardingScreen} />
          ) : null}
          <Stack.Screen
            name="AuthenticationStack"
            component={AuthenticationStackScreen}
          /> */}
          <Stack.Screen name="MainNavigator" component={MainNavigator} />
          <Stack.Screen
            name="MainRiderNavigator"
            component={MainRiderNavigator}
            options={{ gestureEnabled: false }}
          />
          <Stack.Screen
            name="StudentOfficeNavigator"
            component={StudentOfficeStackScreen}
            options={{ gestureEnabled: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}
