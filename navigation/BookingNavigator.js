import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BookingRatingScreen from "../screens/Booking/BookingRatingScreen";
import BookingDriverScreen from "../screens/Booking/BookingDriverScreen";
import BookingScreen from "../screens/Booking/BookingScreen";

const BookingStack = createNativeStackNavigator();

export function BookingStackScreen() {
  return (
    <BookingStack.Navigator screenOptions={{ headerShown: false }}>
      <BookingStack.Screen name="Booking" component={BookingScreen} />
      <BookingStack.Screen
        name="BookingDriver"
        component={BookingDriverScreen}
      />
      <BookingStack.Screen
        name="BookingRating"
        component={BookingRatingScreen}
      />
    </BookingStack.Navigator>
  );
}
