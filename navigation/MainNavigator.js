import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import { COLORS } from "../constants";
import { Ionicons } from "@expo/vector-icons";
import { HomeStackScreen } from "./HomeNavigator";
import { ActivityStackScreen } from "./ActivityNavigator";
import { PromotionStackScreen } from "./PromotionNavigator";
import CustomerProfile from "../screens/Customer/Profile/CustomerProfile";

const MainTab = createBottomTabNavigator();

const MainNavigator = () => {
  const operator = Platform.OS === "ios" ? 90 : 60;
  return (
    <MainTab.Navigator
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: COLORS.fifthary,
        tabBarInactiveTintColor: COLORS.lightGrey,
        tabBarStyle: { backgroundColor: COLORS.tertiary, height: operator },
        headerShown: false,
        tabBarShowLabel: false,
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === "HomeStack") {
            iconName = "home";
          } else if (route.name === "ActivityStack") {
            iconName = "list";
          } else if (route.name === "PromotionStack") {
            iconName = "megaphone";
          } else if (route.name === "Profile") {
            iconName = "person";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <MainTab.Screen name="HomeStack" component={HomeStackScreen} />
      <MainTab.Screen name="ActivityStack" component={ActivityStackScreen} />
      <MainTab.Screen name="PromotionStack" component={PromotionStackScreen} />
      <MainTab.Screen name="Profile" component={CustomerProfile} />
    </MainTab.Navigator>
  );
};

export default MainNavigator;
