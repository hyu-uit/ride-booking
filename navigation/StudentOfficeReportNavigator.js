import { createNativeStackNavigator } from "@react-navigation/native-stack";
import StudentListDetailScreen from "../screens/StudentOffice/StudentListDetailScreen";
import StudentReportScreen from "../screens/StudentOffice/StudentReportScreen";

const StudentReportStack = createNativeStackNavigator();

export function StudentReportStackScreen() {
  return (
    <StudentReportStack.Navigator screenOptions={{ headerShown: false }}>
      <StudentReportStack.Screen
        name="StudentReport"
        component={StudentReportScreen}
      />
      <StudentReportStack.Screen
        name="StudentReportDetail"
        component={StudentListDetailScreen}
      />
    </StudentReportStack.Navigator>
  );
}
