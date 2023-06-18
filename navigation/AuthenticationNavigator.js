import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/Login/LoginScreen";
import SignInScreen from "../screens/Login/SignInScreen";
import SignUpScreen from "../screens/Login/SignUpScreen";
import UploadFaceScreen from "../screens/Login/UploadFaceScreen";
import UploadID from "../screens/Login/UploadIDScreen";
import VerifyingScreen from "../screens/Login/VerifyingScreen";
import PendingScreen from "../screens/Login/PendingScreen";

const AuthenticationStack = createNativeStackNavigator();

export function AuthenticationStackScreen() {
  return (
    <AuthenticationStack.Navigator screenOptions={{ headerShown: false }}>
      <AuthenticationStack.Screen name="Login" component={LoginScreen} />
      <AuthenticationStack.Screen name="SignIn" component={SignInScreen} />
      <AuthenticationStack.Screen name="SignUp" component={SignUpScreen} />
      <AuthenticationStack.Screen
        name="UploadFace"
        component={UploadFaceScreen}
      />
      <AuthenticationStack.Screen name="UploadID" component={UploadID} />
      <AuthenticationStack.Screen name="Verify" component={VerifyingScreen} />
      <AuthenticationStack.Screen name="Pending" component={PendingScreen} />
    </AuthenticationStack.Navigator>
  );
}
