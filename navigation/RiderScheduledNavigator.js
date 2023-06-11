import { createNativeStackNavigator } from "@react-navigation/native-stack";
import RiderSchedule from "../screens/Rider/RiderSchedule";
import TripDetailScreen from "../screens/Rider/Trip/TripDetailScreen";

const RiderScheduledStack = createNativeStackNavigator();

export function RiderScheduledStackScreen() {
  return (
    <RiderScheduledStack.Navigator screenOptions={{ headerShown: false }}>
      <RiderScheduledStack.Screen
        name="RiderScheduled"
        component={RiderSchedule}
      />
      <RiderScheduledStack.Screen
        name="TripDetail"
        component={TripDetailScreen}
      />
    </RiderScheduledStack.Navigator>
  );
}
