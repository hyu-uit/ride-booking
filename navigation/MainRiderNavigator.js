import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import { COLORS } from "../constants";
import { Ionicons } from "@expo/vector-icons";
import RiderProfileScreen from "../screens/Rider/RiderProfileScreen";
import IncomeScreen from "../screens/Rider/IncomeScreen";
import RiderScheduleScreen from "../screens/Rider/RiderSchedule";
import { RiderHomeStackScreen } from "./RiderHomeNavigator";

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
      />
      <MainRiderTab.Screen
        name="RiderScheduled"
        component={RiderScheduleScreen}
      />
      <MainRiderTab.Screen name="Income" component={IncomeScreen} />
      <MainRiderTab.Screen name="RiderProfile" component={RiderProfileScreen} />
    </MainRiderTab.Navigator>
  );
};

export default MainRiderNavigator;
