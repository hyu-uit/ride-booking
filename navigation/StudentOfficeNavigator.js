import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ActivityDetailScreen from "../screens/Customer/Activity/ActivityDetailScreen";
import StudentOfficeScreen from "../screens/StudentOffice/StudentOfficeScreen";
import StudentOfficeDetailScreen from "../screens/StudentOffice/StudentOfficeDetailScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { COLORS, FONTS } from "../constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { StudentOfficeHomeStackScreen } from "./StudentOfficeHomeNavigator";
import StudentOfficeListScreen from "../screens/StudentOffice/StudentOfficeListScreen";
import { StudentListStackScreen } from "./StudentOfficeListNavigator";
import StudentReportScreen from "../screens/StudentOffice/StudentReportScreen";
import StudentOfficeProfileScreen from "../screens/StudentOffice/StudentOfficeProfileScreen";
import { StudentReportStackScreen } from "./StudentOfficeReportNavigator";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import { useTranslation } from "react-i18next";

const StudentOfficeStack = createNativeStackNavigator();

const MainTab = createBottomTabNavigator();

export function StudentOfficeStackScreen() {
  const operator = Platform.OS === "ios" ? 90 : 60;
  const { t } = useTranslation();
  return (
    <MainTab.Navigator
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: COLORS.fifthary,
        tabBarInactiveTintColor: COLORS.grey,
        tabBarStyle: { backgroundColor: COLORS.tertiary, height: 90 },
        headerShown: false,
        tabBarShowLabel: true,
        height: operator,
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === "StudentOfficeStack") {
            iconName = "home";
          } else if (route.name === "StudentListStack") {
            iconName = "list";
          } else if (route.name === "StudentReportStack") {
            iconName = "shield";
          } else if (route.name === "Profile") {
            iconName = "person";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <MainTab.Screen
        name="StudentOfficeStack"
        component={StudentOfficeHomeStackScreen}
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
      <MainTab.Screen
        name="StudentListStack"
        component={StudentListStackScreen}
        // options={{ tabBarLabel: "Students" }}
        options={({ route }) => ({
          tabBarStyle: {
            display: getTabBarStudent(route),
            backgroundColor: COLORS.tertiary,
            height: operator,
          },
          tabBarLabel: t("students"),
        })}
      />
      <MainTab.Screen
        name="StudentReportStack"
        component={StudentReportStackScreen}
        // options={{ tabBarLabel: "Restriction" }}
        options={({ route }) => ({
          tabBarStyle: {
            display: getTabBarReport(route),
            backgroundColor: COLORS.tertiary,
            height: operator,
          },
          tabBarLabel: t("restriction"),
        })}
      />
      <MainTab.Screen
        name="Profile"
        component={StudentOfficeProfileScreen}
        options={{ tabBarLabel: t("profile") }}
      />
    </MainTab.Navigator>

    // <StudentOfficeStack.Navigator screenOptions={{ headerShown: false }}>
    //   <StudentOfficeStack.Screen
    //     name="StudentOffice"
    //     component={StudentOfficeScreen}
    //   />
    //   <StudentOfficeStack.Screen
    //     name="StudentOfficeDetail"
    //     component={StudentOfficeDetailScreen}
    //   />
    // </StudentOfficeStack.Navigator>
  );
}

const getTabBarVisibility = (route) => {
  // console.log(route);
  const routeName = getFocusedRouteNameFromRoute(route) ?? "Feed";
  // console.log(routeName);
  if (routeName === "StudentOfficeDetail") {
    return "none";
  }
  return "flex";
};

const getTabBarStudent = (route) => {
  // console.log(route);
  const routeName = getFocusedRouteNameFromRoute(route) ?? "Feed";
  // console.log(routeName);
  if (routeName === "StudentListDetail") {
    return "none";
  }
  return "flex";
};

const getTabBarReport = (route) => {
  // console.log(route);
  const routeName = getFocusedRouteNameFromRoute(route) ?? "Feed";
  // console.log(routeName);
  if (routeName === "StudentReportDetail") {
    return "none";
  }
  return "flex";
};
