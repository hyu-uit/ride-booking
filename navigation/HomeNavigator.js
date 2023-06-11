import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ActivityDetailScreen from "../screens/Customer/Activity/ActivityDetailScreen";
import Home from "../screens/Home";
import MenuScreen from "../screens/Customer/Menu/MenuScreen";
import ScheduledScreen from "../screens/Customer/Scheduled/ScheduledScreen";
import PaymentScreen from "../screens/Customer/Payment/PaymentScreen";
import SavedLocationScreen from "../screens/Customer/SavedLocation/SavedLocationScreen";
import AddLocationScreen from "../screens/Customer/SavedLocation/AddLocationScreen";
import ConfirmLocationScreen from "../screens/Customer/SavedLocation/ConfirmLocationScreen";
import BookingScreen from "../screens/Booking/BookingScreen";
import BookingDriverScreen from "../screens/Booking/BookingDriverScreen";
import BookingRatingScreen from "../screens/Booking/BookingRatingScreen";
import { BookingProvider } from "../context/BookingContext";

const HomeStack = createNativeStackNavigator();

export function HomeStackScreen() {
  return (
    <BookingProvider>
      <HomeStack.Navigator screenOptions={{ headerShown: false }}>
        <HomeStack.Screen name="Home" component={Home} />
        <HomeStack.Screen
          name="ActivityDetail"
          component={ActivityDetailScreen}
        />
        <HomeStack.Screen name="Menu" component={MenuScreen} />
        <HomeStack.Screen name="Scheduled" component={ScheduledScreen} />
        <HomeStack.Screen name="Payment" component={PaymentScreen} />
        <HomeStack.Screen
          name="SavedLocation"
          component={SavedLocationScreen}
        />
        <HomeStack.Screen name="AddLocation" component={AddLocationScreen} />
        <HomeStack.Screen
          name="ConfirmLocation"
          component={ConfirmLocationScreen}
        />

        <HomeStack.Screen name="Booking" component={BookingScreen} />
        <HomeStack.Screen
          name="BookingDriver"
          component={BookingDriverScreen}
        />
        <HomeStack.Screen
          name="BookingRating"
          component={BookingRatingScreen}
        />
      </HomeStack.Navigator>
    </BookingProvider>
  );
}
