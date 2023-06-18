import { createNativeStackNavigator } from "@react-navigation/native-stack";
import StudentOfficeScreen from "../screens/StudentOffice/StudentOfficeScreen";
import StudentOfficeDetailScreen from "../screens/StudentOffice/StudentOfficeDetailScreen";
import StudentOfficeListScreen from "../screens/StudentOffice/StudentOfficeListScreen";
import StudentListDetailScreen from "../screens/StudentOffice/StudentListDetailScreen";

const StudentListStack = createNativeStackNavigator();

export function StudentListStackScreen() {
  return (
    <StudentListStack.Navigator screenOptions={{ headerShown: false }}>
      <StudentListStack.Screen
        name="StudentList"
        component={StudentOfficeListScreen}
      />
      <StudentListStack.Screen
        name="StudentListDetail"
        component={StudentListDetailScreen}
      />
    </StudentListStack.Navigator>
  );
}
