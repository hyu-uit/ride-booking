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
import SavedLocationScreen from "../screens/Customer/SavedLocation/SavedLocationScreen";
import { Menu, NativeBaseProvider } from "native-base";
import PromotionScreen from "../screens/Customer/Promotion/PromotionScreen";
import AddLocationScreen from "../screens/Customer/SavedLocation/AddLocationScreen";
import ConfirmLocationScreen from "../screens/Customer/SavedLocation/ConfirmLocationScreen";
import PaymentScreen from "../screens/Customer/Payment/PaymentScreen";
import ScheduledScreen from "../screens/Customer/Scheduled/ScheduledScreen";
import StudentOfficeScreen from "../screens/StudentOffice/StudentOfficeScreen";
import StudentOfficeDetailScreen from "../screens/StudentOffice/StudentOfficeDetailScreen";
import RiderHomeScreen from "../screens/Rider/Home/RiderHomeScreen";
import TripDetailScreen from "../screens/Rider/Trip/TripDetailScreen";

const Stack = createNativeStackNavigator();

export default function Navigation() {
  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <Stack.Navigator>
          {/* <Stack.Screen
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
          />
          <Stack.Screen
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
            name="Promotion"
            component={PromotionScreen}
            options={{ headerShown: false }}
          /> */}
          {/* <Stack.Screen
            name="PromotionDetail"
            component={PromotionDetailScreen}
            options={{ headerShown: false }}
          /> */}
          {/* <Stack.Screen
            name="Menu"
            component={Menu}
            options={{ headerShown: false }}
          /> */}
          {/* <Stack.Screen
            name="AddLocation"
            component={AddLocationScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ConfirmLocation"
            component={ConfirmLocationScreen}
            options={{ headerShown: false }}
          /> */}
          {/* <Stack.Screen
            name="Payment"
            component={PaymentScreen}
            options={{ headerShown: false }}
          /> */}
          {/* <Stack.Screen
            name="Scheduled"
            component={ScheduledScreen}
            options={{ headerShown: false }}
          /> */}
          {/* <Stack.Screen
            name="StudentOffice"
            component={StudentOfficeScreen}
            options={{ headerShown: false }}
          /> */}
          {/* <Stack.Screen
            name="StudentOfficeDetail"
            component={StudentOfficeDetailScreen}
            options={{ headerShown: false }}
          /> */}
          <Stack.Screen
            name="RiderHome"
            component={RiderHomeScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="TripDetail"
            component={TripDetailScreen}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}
