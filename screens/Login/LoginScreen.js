import React, { useEffect, useState, useRef } from "react";
import {
  Button,
  HStack,
  Image,
  NativeBaseProvider,
  Text,
  VStack,
  View,
} from "native-base";
import { SIZES, COLORS, FONTS } from "../../constants/theme";
import BlueBg from "../../assets/images/Login/blueBg.png";
import { SafeAreaView } from "react-native-safe-area-context";
import LottieView from "lottie-react-native";
import {
  AsyncStorage,
  BackHandler,
  Platform,
  ToastAndroid,
  TouchableOpacity,
} from "react-native";
import {
  getFromAsyncStorage,
  saveToAsyncStorage,
} from "../../helper/asyncStorage";
import { IS_FIRST_USE } from "../../constants/asyncStorageKey";
import { useFocusEffect } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import i18n from "../../i18n";
import PromotionModal from "../../components/Modal/PromotionModal";

const LoginScreen = ({ navigation }) => {
  const animation = useRef(null);
  const [phoneNumber, setPhoneNumber] = useState(null);
  const [role, setRole] = useState(null);
  let backButtonPressedOnce = false;
  const { t } = useTranslation();
  useEffect(() => {
    // You can control the ref programmatically, rather than using autoPlay
    // animation.current?.play();

    saveToAsyncStorage(IS_FIRST_USE, false);

    // AsyncStorage.getItem("phoneNumber").then((result) => {
    //   setPhoneNumber(result);
    // });
    // AsyncStorage.getItem("role").then((result) => {
    //   setRole(result);
    // });
    // const backAction = () => {
    //   if (backButtonPressedOnce) {
    //     BackHandler.exitApp();
    //   } else {
    //     backButtonPressedOnce = true;
    //     ToastAndroid.show("Press back again to exit", ToastAndroid.SHORT);
    //     setTimeout(() => {
    //       backButtonPressedOnce = false;
    //     }, 2000); // Reset the variable after 2 seconds
    //   }
    //   return true;
    // };

    // const backHandler = BackHandler.addEventListener(
    //   "hardwareBackPress",
    //   backAction
    // );

    // return () => backHandler.remove();

    const checkLoginStatus = async () => {
      try {
        // Check if the login credentials exist in AsyncStorage
        // getFromAsyncStorage("phoneNumber").then((result) => {
        //   setPhoneNumber(result);
        //   // console.log(result);
        // });
        // getFromAsyncStorage("role").then((result) => {
        //   setRole(result);
        //   // console.log(result);
        // });
        const phoneNumberValue = await getFromAsyncStorage("phoneNumber");
        const roleValue = await getFromAsyncStorage("role");

        // If the credentials exist, perform an automatic login
        if (phoneNumberValue !== null && roleValue === "StudentOffice") {
          navigation.navigate("StudentOfficeNavigator", {
            screen: "StudentOffice",
          });
        } else if (phoneNumberValue !== null && roleValue === "Rider") {
          navigation.navigate("MainRiderNavigator", {
            screen: "HomeRider",
          });
        } else if ((phoneNumberValue !== null) & (roleValue === "Customer")) {
          navigation.navigate("MainNavigator", {
            screen: "HomeStack",
          });
        }
      } catch (error) {
        console.log("Login check error:", error);
      }
    };

    checkLoginStatus();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        if (backButtonPressedOnce) {
          BackHandler.exitApp();
        } else {
          backButtonPressedOnce = true;
          ToastAndroid.show("Press back again to exit", ToastAndroid.SHORT);
          setTimeout(() => {
            backButtonPressedOnce = false;
          }, 2000); // Reset the variable after 2 seconds
        }
        return true;
      };

      BackHandler.addEventListener("hardwareBackPress", onBackPress);

      return () =>
        BackHandler.removeEventListener("hardwareBackPress", onBackPress);
    }, [])
  );

  return (
    <VStack bgColor={COLORS.background}>
      <VStack w={"100%"} h={"40%"} position={"relative"}>
        <Image
          source={BlueBg}
          alt="car"
          marginLeft={"auto"}
          h={"90%"}
          w={"100%"}
          resizeMode="stretch"
        />
        {/* <Image
          source={{
            uri: "https://media0.giphy.com/media/LpW8NlEe3KBlXoLpXd/200w.gif?cid=82a1493bggk55oaxg5n7tj7vzivnedconsdknmcte4021e1b&rid=200w.gif&ct=s",
          }}
          alt="car"
          marginLeft={"auto"}
          h={"70%"}
          w={"80%"}
          resizeMode="stretch"
          position={"absolute"}
          top={100}
          left={-30}
        /> */}
        <LottieView
          autoPlay
          ref={animation}
          style={{
            position: "absolute",
            left: -20,
            bottom: 0,
            width: 300,
            height: 300,
            backgroundColor: "transparent",
          }}
          // Find more Lottie files at https://lottiefiles.com/featured
          source={require("../../assets/lottie/riding_bear.json")}
        />
      </VStack>
      <VStack w={"100%"} h={"60%"} paddingX={"10px"}>
        <Text bold fontSize={60} color={COLORS.white} lineHeight={70}>
          {t("getRide")}
        </Text>
        <Text color={COLORS.fifthary} style={{ ...FONTS.body3 }} mt={10}>
          {t("login")}
        </Text>
        <HStack
          w={"100%"}
          bgColor={COLORS.tertiary}
          h={"77px"}
          position={"absolute"}
          bottom={Platform.OS === "ios" ? 20 : 5}
          borderRadius={20}
          alignSelf={"center"}
        >
          {/* <Button
            w={"50%"}
            borderRadius={20}
            bgColor={COLORS.primary}
            onPress={() => {
              navigation.navigate("SignUp");
            }}
          >
            <Text style={{ ...FONTS.h2 }} color={COLORS.white}>
              Register
            </Text>
          </Button> */}
          <TouchableOpacity
            w={"50%"}
            style={{
              borderRadius: 20,
              backgroundColor: COLORS.primary,
              alignContent: "center",
              justifyContent: "center",
              width: "50%",
            }}
            onPress={() => {
              navigation.navigate("SignUp");
            }}
          >
            <Text
              style={{ ...FONTS.h2, textAlign: "center" }}
              color={COLORS.white}
            >
              {t("register")}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            w={"50%"}
            style={{
              borderRadius: 20,
              backgroundColor: "transparent",
              alignContent: "center",
              justifyContent: "center",
              width: "50%",
            }}
            onPress={() => {
              navigation.navigate("SignIn");
            }}
          >
            <Text
              style={{ ...FONTS.h2, textAlign: "center" }}
              color={COLORS.white}
            >
              {t("signin")}
            </Text>
          </TouchableOpacity>
        </HStack>
      </VStack>
    </VStack>
  );
};

export default LoginScreen;
