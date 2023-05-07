import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/Login/LoginScreen";
import SignInScreen from "../screens/Login/SignInScreen";
import SignUpScreen from "../screens/Login/SignUpScreen";
import VerifyingScreen from "../screens/Login/VerifyingScreen";
import UploadIDScreen from "../screens/Login/UploadIDScreen";
import UploadFaceScreen from "../screens/Login/UploadFaceScreen";
import ActivityScreen from "../screens/Customer/Activity/ActivityScreen";
import ActivityDetailScreen from "../screens/Customer/Activity/ActivityDetailScreen";
import BookingScreen from "../screens/BookingScreen";
import SavedLocationScreen from "../screens/SavedLocationScreen"
import OnBoardingScreen from "../screens/OnBoardingScreen"

import { NativeBaseProvider } from "native-base";
import RiderProfileScreen from "../screens/Rider/RiderProfileScreen";
import IncomeScreen from "../screens/Rider/IncomeScreen";

const Stack = createNativeStackNavigator();

export default function Navigation() {
  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <Stack.Navigator>
        {/* <Stack.Screen
          name="OnBoarding"
          component={OnBoardingScreen}
          options={{ headerShown: false }}
        />
          <Stack.Screen
            name="LoginHome"
            component={LoginScreen}
            options={{ headerShown: false }}
          /> */}
          {/* <Stack.Screen
            name="SignIn"
            component={SignInScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="SignUp"
            component={SignUpScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Verify"
            component={VerifyingScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="UploadID"
            component={UploadIDScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="UploadFace"
            component={UploadFaceScreen}
            options={{ headerShown: false }}
          /> */}
          {/* <Stack.Screen
            name="Activity"
            component={ActivityScreen}
            options={{ headerShown: false }}
          /> */}
          {/* <Stack.Screen
            name="Activity Detail"
            component={ActivityDetailScreen}
            options={{ headerShown: false }}
          /> */}
          {/* <Stack.Screen
            name="Booking"
            component={BookingScreen}
            options={{ headerShown: false }}
          /> */}
          {/* <Stack.Screen
            name="SavedLocation"
            component={SavedLocationScreen}
            options={{ headerShown: false }}
          /> */}
       {/* <Stack.Screen
            name="ProfileRider"
            component={RiderProfileScreen}
            options={{ headerShown: false }}
          />
        </Stack.Navigator> */}
        <Stack.Screen
            name="Income"
            component={IncomeScreen}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}
