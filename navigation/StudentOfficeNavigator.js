import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ActivityDetailScreen from "../screens/Customer/Activity/ActivityDetailScreen";
import StudentOfficeScreen from "../screens/StudentOffice/StudentOfficeScreen";
import StudentOfficeDetailScreen from "../screens/StudentOffice/StudentOfficeDetailScreen";

const StudentOfficeStack = createNativeStackNavigator();

export function StudentOfficeStackScreen() {
  return (
    <StudentOfficeStack.Navigator screenOptions={{ headerShown: false }}>
      <StudentOfficeStack.Screen
        name="StudentOffice"
        component={StudentOfficeScreen}
      />
      <StudentOfficeStack.Screen
        name="StudentOfficeDetail"
        component={StudentOfficeDetailScreen}
      />
    </StudentOfficeStack.Navigator>
  );
}
