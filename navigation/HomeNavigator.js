import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ActivityDetailScreen from "../screens/Customer/Activity/ActivityDetailScreen";
import Home from "../screens/Home";

const HomeStack = createNativeStackNavigator();

export function HomeStackScreen() {
  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false }}>
      <HomeStack.Screen name="Home" component={Home} />
      <HomeStack.Screen
        name="ActivityDetail"
        component={ActivityDetailScreen}
      />
    </HomeStack.Navigator>
  );
}
