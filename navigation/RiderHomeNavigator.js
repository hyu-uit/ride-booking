import { createNativeStackNavigator } from "@react-navigation/native-stack";
import RiderHomeScreen from "../screens/Rider/Home/RiderHomeScreen";
import TripDetailScreen from "../screens/Rider/Trip/TripDetailScreen";

const RiderHomeStack = createNativeStackNavigator();

export function RiderHomeStackScreen() {
  return (
    <RiderHomeStack.Navigator screenOptions={{ headerShown: false }}>
      <RiderHomeStack.Screen name="RiderHome" component={RiderHomeScreen} />
      <RiderHomeStack.Screen name="TripDetail" component={TripDetailScreen} />
 </RiderHomeStack.Navigator>
  );
}
