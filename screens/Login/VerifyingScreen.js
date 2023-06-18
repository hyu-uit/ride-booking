import {
  Button,
  HStack,
  Input,
  NativeBaseProvider,
  Text,
  VStack,
  View,
} from "native-base";
import React, { useEffect, useRef, useState } from "react";
import ButtonBack from "../../components/Global/ButtonBack/ButtonBack";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS, FONTS } from "../../constants";
import { TouchableWithoutFeedback } from "react-native";
import { Keyboard } from "react-native";
import { AsyncStorage } from "react-native";
import { getFromAsyncStorage } from "../../helper/asyncStorage";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { getToken } from "firebase/app-check";
import { signInWithPhoneNumber } from "@firebase/auth";
import { useTranslation } from "react-i18next";

const VerifyingScreen = ({ navigation }) => {
  const firstInput = useRef();
  const secondInput = useRef();
  const thirdInput = useRef();
  const fourthInput = useRef();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [role, setRole] = useState("");

  const { t } = useTranslation();

  useEffect(() => {
    getFromAsyncStorage("phoneNumber")
      .then((value) => setPhoneNumber(value))
      .catch((err) => console.log(err));

    getFromAsyncStorage("role")
      .then((value) => setRole(value))
      .catch((err) => console.log(err));
  }, []);

  // navigation.navigate("StudentOfficeNavigator", {
  //   screen: "StudentOffice",
  // });
  const signInOption = () => {
    role === "Customer"
      ? navigation.navigate("MainNavigator", {
          screen: "HomeStack",
          params: {
            screen: "Home",
            data: {
              phoneNumber: "" + phoneNumber,
              role: "" + role,
            },
          },
        })
      : navigation.navigate("MainRiderNavigator", {
          screen: "HomeRider",
          params: {
            data: {
              phoneNumber: "" + phoneNumber,
              role: "" + role,
            },
          },
        });
  };
  const [otp, setOtp] = useState({ 1: "", 2: "", 3: "", 4: "" });
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      <VStack
        paddingX={"10px"}
        bgColor={COLORS.background}
        w={"100%"}
        h={"100%"}
      >
        <SafeAreaView style={{ width: "100%", height: "100%" }}>
          <ButtonBack
            onPress={() => {
              navigation.goBack();
            }}
          ></ButtonBack>
          <View style={{ alignItems: "center" }}>
            <Text style={{ ...FONTS.h2 }} color={COLORS.white}>
              {t("verification")}
            </Text>
            <VStack mt={10}>
              <Text
                style={{ ...FONTS.body3 }}
                color={COLORS.white}
                textAlign={"center"}
              >
                {t("codeSentTo")}
              </Text>
              <Text
                style={{ ...FONTS.body3 }}
                color={COLORS.white}
                textAlign={"center"}
              >
                {" (+84) "}
                {phoneNumber}
              </Text>
            </VStack>
            <HStack mt={10}>
              <Input
                w={"60px"}
                h={"60px"}
                bgColor={COLORS.primary}
                justifyContent={"center"}
                alignItems={"center"}
                color={COLORS.white}
                style={{ ...FONTS.h2 }}
                maxLength={1}
                textAlign={"center"}
                keyboardType="numeric"
                ref={firstInput}
                onChangeText={(text) => {
                  setOtp({ ...otp, 1: text });
                  text && secondInput.current.focus();
                }}
              />
              <Input
                w={"60px"}
                h={"60px"}
                bgColor={COLORS.primary}
                justifyContent={"center"}
                alignItems={"center"}
                color={COLORS.white}
                style={{ ...FONTS.h2 }}
                maxLength={1}
                textAlign={"center"}
                ml={5}
                keyboardType="numeric"
                ref={secondInput}
                onChangeText={(text) => {
                  setOtp({ ...otp, 2: text });
                  text
                    ? thirdInput.current.focus()
                    : firstInput.current.focus();
                }}
              />
              <Input
                w={"60px"}
                h={"60px"}
                bgColor={COLORS.primary}
                justifyContent={"center"}
                alignItems={"center"}
                color={COLORS.white}
                style={{ ...FONTS.h2 }}
                maxLength={1}
                textAlign={"center"}
                ml={5}
                keyboardType="numeric"
                ref={thirdInput}
                onChangeText={(text) => {
                  setOtp({ ...otp, 3: text });
                  text
                    ? fourthInput.current.focus()
                    : secondInput.current.focus();
                }}
              />
              <Input
                w={"60px"}
                h={"60px"}
                bgColor={COLORS.primary}
                justifyContent={"center"}
                alignItems={"center"}
                color={COLORS.white}
                style={{ ...FONTS.h2 }}
                maxLength={1}
                textAlign={"center"}
                ml={5}
                keyboardType="numeric"
                ref={fourthInput}
                onChangeText={(text) => {
                  setOtp({ ...otp, 4: text });
                  !text && thirdInput.current.focus();
                }}
              />
            </HStack>
            <Button
              w={"100%"}
              borderRadius={20}
              bgColor={COLORS.primary}
              mt={50}
              onPress={signInOption}
            >
              <Text style={{ ...FONTS.h2 }} color={COLORS.white}>
                {t("again")}
              </Text>
            </Button>
          </View>
        </SafeAreaView>
      </VStack>
    </TouchableWithoutFeedback>
  );
};

export default VerifyingScreen;
