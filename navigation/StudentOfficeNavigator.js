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

const StudentOfficeStack = createNativeStackNavigator();

const MainTab = createBottomTabNavigator();

export function StudentOfficeStackScreen() {
  return (
    <MainTab.Navigator
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: COLORS.fifthary,
        tabBarInactiveTintColor: COLORS.lightGrey,
        tabBarStyle: { backgroundColor: COLORS.tertiary, height: 90 },
        headerShown: false,
        tabBarShowLabel: false,
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === "StudentOfficeStack") {
            iconName = "home";
          } else if (route.name === "StudentListStack") {
            iconName = "list";
          } else if (route.name === "Report") {
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
      />
      <MainTab.Screen
        name="StudentListStack"
        component={StudentListStackScreen}
      />
      <MainTab.Screen name="Report" component={StudentReportScreen} />
      <MainTab.Screen name="Profile" component={StudentOfficeProfileScreen} />
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
