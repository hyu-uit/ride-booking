import { createNativeStackNavigator } from "@react-navigation/native-stack";
import PromotionDetailScreen from "../screens/Customer/Promotion/PromotionDetailScreen";
import PromotionScreen from "../screens/Customer/Promotion/PromotionScreen";

const PromotionStack = createNativeStackNavigator();

export function PromotionStackScreen() {
  return (
    <PromotionStack.Navigator screenOptions={{ headerShown: false }}>
      <PromotionStack.Screen name="Promotion" component={PromotionScreen} />
      <PromotionStack.Screen
        name="PromotionDetail"
        component={PromotionDetailScreen}
      />
    </PromotionStack.Navigator>
  );
}
