import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import { COLORS } from "../constants";
import { Ionicons } from "@expo/vector-icons";
import { HomeStackScreen } from "./HomeNavigator";
import { ActivityStackScreen } from "./ActivityNavigator";
import { PromotionStackScreen } from "./PromotionNavigator";
import CustomerProfile from "../screens/Customer/Profile/CustomerProfile";
import RiderHomeScreen from "../screens/Rider/Home/RiderHomeScreen";
import RiderProfileScreen from "../screens/Rider/RiderProfileScreen";
import IncomeScreen from "../screens/Rider/IncomeScreen";
import ScheduledScreen from "../screens/Customer/Scheduled/ScheduledScreen";

const MainRiderTab = createBottomTabNavigator();

const MainRiderNavigator = ({ navigation }) => {
  const operator = Platform.OS === "ios" ? 90 : 60;
  return (
    <MainRiderTab.Navigator
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: COLORS.fifthary,
        tabBarInactiveTintColor: COLORS.lightGrey,
        tabBarStyle: { backgroundColor: COLORS.tertiary, height: operator },
        headerShown: false,
        tabBarShowLabel: false,
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === "HomeRider") {
            iconName = "home";
          } else if (route.name === "Scheduled") {
            iconName = "list";
          } else if (route.name === "Income") {
            iconName = "card-outline";
          } else if (route.name === "RiderProfile") {
            iconName = "person";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <MainRiderTab.Screen name="HomeRider" component={RiderHomeScreen} />
      <MainRiderTab.Screen name="Scheduled" component={ScheduledScreen} />
      <MainRiderTab.Screen name="Income" component={IncomeScreen} />
      <MainRiderTab.Screen name="RiderProfile" component={RiderProfileScreen} />
    </MainRiderTab.Navigator>
  );
};

export default MainRiderNavigator;
