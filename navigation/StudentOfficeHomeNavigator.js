import { createNativeStackNavigator } from "@react-navigation/native-stack";
import StudentOfficeScreen from "../screens/StudentOffice/StudentOfficeScreen";
import StudentOfficeDetailScreen from "../screens/StudentOffice/StudentOfficeDetailScreen";

const StudentOfficeHomeStack = createNativeStackNavigator();

export function StudentOfficeHomeStackScreen() {
  return (
    <StudentOfficeHomeStack.Navigator screenOptions={{ headerShown: false }}>
      <StudentOfficeHomeStack.Screen
        name="StudentOffice"
        component={StudentOfficeScreen}
      />
      <StudentOfficeHomeStack.Screen
        name="StudentOfficeDetail"
        component={StudentOfficeDetailScreen}
      />
    </StudentOfficeHomeStack.Navigator>
  );
}
