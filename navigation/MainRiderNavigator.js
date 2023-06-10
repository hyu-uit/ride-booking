import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import { COLORS } from "../constants";
import { Ionicons } from "@expo/vector-icons";
import RiderProfileScreen from "../screens/Rider/RiderProfileScreen";
import IncomeScreen from "../screens/Rider/IncomeScreen";
import RiderScheduleScreen from "../screens/Rider/RiderSchedule";
import { RiderHomeStackScreen } from "./RiderHomeNavigator";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import { RiderScheduledStackScreen } from "./RiderScheduledNavigator";
import { useTranslation } from "react-i18next";

const MainRiderTab = createBottomTabNavigator();

const MainRiderNavigator = ({ navigation }) => {
  const operator = Platform.OS === "ios" ? 90 : 60;
  const { t } = useTranslation();
  return (
    <MainRiderTab.Navigator
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: COLORS.fifthary,
        tabBarInactiveTintColor: COLORS.grey,
        tabBarStyle: { backgroundColor: COLORS.tertiary, height: operator },
        headerShown: false,
        tabBarShowLabel: true,
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === "RiderHomeStack") {
            iconName = "home";
          } else if (route.name === "RiderScheduled") {
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
      <MainRiderTab.Screen
        name="RiderHomeStack"
        component={RiderHomeStackScreen}
        // options={{ tabBarLabel: "Home" }}
        options={({ route }) => ({
          tabBarStyle: {
            display: getTabBarVisibility(route),
            backgroundColor: COLORS.tertiary,
            height: operator,
          },
          tabBarLabel: t("home"),
        })}
      />
      <MainRiderTab.Screen
        name="RiderScheduled"
        component={RiderScheduledStackScreen}
        // options={{ tabBarLabel: "Scheduled" }}
        options={({ route }) => ({
          tabBarStyle: {
            display: getTabBarScheduled(route),
            backgroundColor: COLORS.tertiary,
            height: operator,
          },
          tabBarLabel: t("scheduled"),
        })}
      />
      <MainRiderTab.Screen
        name="Income"
        component={IncomeScreen}
        options={{ tabBarLabel: t("income") }}
      />
      <MainRiderTab.Screen
        name="RiderProfile"
        component={RiderProfileScreen}
        options={{ tabBarLabel: t("profile") }}
      />
    </MainRiderTab.Navigator>
  );
};

const getTabBarVisibility = (route) => {
  // console.log(route);
  const routeName = getFocusedRouteNameFromRoute(route) ?? "Feed";
  // console.log(routeName);
  if (routeName === "TripDetail") {
    return "none";
  }
  return "flex";
};
const getTabBarScheduled = (route) => {
  // console.log(route);
  const routeName = getFocusedRouteNameFromRoute(route) ?? "Feed";
  // console.log(routeName);
  if (routeName === "TripDetail") {
    return "none";
  }
  return "flex";
};

export default MainRiderNavigator;
