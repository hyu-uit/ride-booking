import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ActivityScreen from "../screens/Customer/Activity/ActivityScreen";
import ActivityDetailScreen from "../screens/Customer/Activity/ActivityDetailScreen";

const ActivityStack = createNativeStackNavigator();

export function ActivityStackScreen() {
  return (
    <ActivityStack.Navigator screenOptions={{ headerShown: false }}>
      <ActivityStack.Screen name="Activity" component={ActivityScreen} />
      <ActivityStack.Screen
        name="ActivityDetail"
        component={ActivityDetailScreen}
      />
    </ActivityStack.Navigator>
  );
}
