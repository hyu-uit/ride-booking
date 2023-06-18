import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import { COLORS } from "../constants";
import { Ionicons } from "@expo/vector-icons";
import { HomeStackScreen } from "./HomeNavigator";
import { ActivityStackScreen } from "./ActivityNavigator";
import { PromotionStackScreen } from "./PromotionNavigator";
import CustomerProfile from "../screens/Customer/Profile/CustomerProfile";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import { useTranslation } from "react-i18next";

const MainTab = createBottomTabNavigator();

const MainNavigator = ({ navigation }) => {
  const operator = Platform.OS === "ios" ? 90 : 60;
  const { t } = useTranslation();
  return (
    <MainTab.Navigator
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: COLORS.fifthary,
        tabBarInactiveTintColor: COLORS.grey,
        tabBarStyle: { backgroundColor: COLORS.tertiary, height: operator },
        headerShown: false,
        tabBarShowLabel: true,
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
      <MainTab.Screen
        name="HomeStack"
        component={HomeStackScreen}
        options={({ route }) => ({
          tabBarStyle: {
            display: getTabBarVisibility(route),
            backgroundColor: COLORS.tertiary,
            height: operator,
          },
          tabBarLabel: t("home"),
        })}
      />
      <MainTab.Screen
        name="ActivityStack"
        component={ActivityStackScreen}
        options={({ route }) => ({
          tabBarStyle: {
            display: getTabbarActivity(route),
            backgroundColor: COLORS.tertiary,
            height: operator,
          },
          tabBarLabel: t("activity"),
        })}
      />
      <MainTab.Screen
        name="PromotionStack"
        component={PromotionStackScreen}
        options={({ route }) => ({
          tabBarStyle: {
            display: getTabbarPromotion(route),
            backgroundColor: COLORS.tertiary,
            height: operator,
          },
          tabBarLabel: t("promotion"),
        })}
      />
      <MainTab.Screen
        name="Profile"
        component={CustomerProfile}
        options={{ tabBarLabel: t("profile") }}
      />
    </MainTab.Navigator>
  );
};

const getTabBarVisibility = (route) => {
  // console.log(route);
  const routeName = getFocusedRouteNameFromRoute(route) ?? "Feed";
  // console.log(routeName);
  if (
    routeName === "Menu" ||
    routeName === "Scheduled" ||
    routeName === "Payment" ||
    routeName === "SavedLocation" ||
    routeName === "AddLocation" ||
    routeName === "ConfirmLocation" ||
    routeName === "Booking" ||
    routeName === "BookingDriver" ||
    routeName === "BookingRating" ||
    routeName === "ActivityDetail"
  ) {
    return "none";
  }
  return "flex";
};

const getTabbarActivity = (route) => {
  const routeName = getFocusedRouteNameFromRoute(route) ?? "Feed";
  if (routeName === "ActivityDetail") {
    return "none";
  }
  return "flex";
};
const getTabbarPromotion = (route) => {
  // console.log(route);
  const routeName = getFocusedRouteNameFromRoute(route) ?? "Feed";
  // console.log(routeName);
  if (routeName === "PromotionDetail" || routeName === "Booking") {
    return "none";
  }
  return "flex";
  // return "none";
  // console.log(routeName);
};

export default MainNavigator;
