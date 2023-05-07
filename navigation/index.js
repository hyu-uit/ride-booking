import { NavigationContainer } from "@react-navigation/native";
import { NativeBaseProvider } from "native-base";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../constants";
import { HomeStackScreen } from "./HomeNavigator";
import { ActivityStackScreen } from "./ActivityNavigator";
import CustomerProfile from "../screens/Customer/Profile/CustomerProfile";
import { Platform } from "react-native";
import { PromotionStackScreen } from "./PromotionNavigator";

const Tab = createBottomTabNavigator();

export default function Navigation() {
  const operator = Platform.OS === "ios" ? 90 : 60;
  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarActiveTintColor: COLORS.fifthary,
            tabBarInactiveTintColor: COLORS.lightGrey,
            tabBarStyle: { backgroundColor: COLORS.tertiary, height: operator },
            headerShown: false,
            tabBarShowLabel: false,
            tabBarIcon: ({ color, size }) => {
              let iconName;

              if (route.name === "Home") {
                iconName = "home";
              } else if (route.name === "Activity") {
                iconName = "list";
              } else if (route.name === "Promotion") {
                iconName = "megaphone";
              } else if (route.name === "Profile") {
                iconName = "person";
              }

              return <Ionicons name={iconName} size={size} color={color} />;
            },
          })}
        >
          <Tab.Screen name="Home" component={HomeStackScreen} />
          <Tab.Screen name="Activity" component={ActivityStackScreen} />
          <Tab.Screen name="Promotion" component={PromotionStackScreen} />
          <Tab.Screen name="Profile" component={CustomerProfile} />
        </Tab.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}
