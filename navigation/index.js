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
import { NativeBaseProvider } from "native-base";
import SavedLocationScreen from "../screens/SavedLocationScreen";
import Home from "../screens/Home";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { BookingStackScreen } from "./BookingNavigator";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../constants";

const Tab = createBottomTabNavigator();

export default function Navigation() {
  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarActiveTintColor: COLORS.fifthary,
            tabBarInactiveTintColor: COLORS.lightGrey,
            tabBarStyle: { backgroundColor: COLORS.tertiary, height: 60 },
            headerShown: false,
            tabBarShowLabel: false,
            tabBarIcon: ({ color, size }) => {
              let iconName;

              if (route.name === "Home") {
                iconName = "home";
              } else if (route.name === "Booking") {
                iconName = "car";
              } else if (route.name === "Promotion") {
                iconName = "megaphone";
              } else if (route.name === "Profile") {
                iconName = "person";
              }

              return <Ionicons name={iconName} size={size} color={color} />;
            },
          })}
        >
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
          /> */}
          {/* <Stack.Screen
            name="Activity Detail"
            component={ActivityDetailScreen}
            options={{ headerShown: false }}
          /> */}
          {/* <Stack.Screen
            name="SavedLocation"
            component={SavedLocationScreen}
            options={{ headerShown: false }}
          /> */}
          <Tab.Screen name="Home" component={Home} />
          <Tab.Screen name="Booking" component={BookingStackScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}
