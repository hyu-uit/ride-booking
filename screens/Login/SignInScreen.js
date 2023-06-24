  import {
    Button,
    HStack,
    Input,
    NativeBaseProvider,
    ScrollView,
    Text,
    VStack,
  } from "native-base";
  import React, { useEffect, useState } from "react";
  import ButtonBack from "../../components/Global/ButtonBack/ButtonBack";
  import { SafeAreaView } from "react-native-safe-area-context";
  import { COLORS, FONTS } from "../../constants";
  import { Alert, TouchableWithoutFeedback } from "react-native";
  import { Keyboard } from "react-native";
  import { doc, getDoc } from "firebase/firestore";
  import { db } from "../../config/config";
  import { saveToAsyncStorage } from "../../helper/asyncStorage";
  import { useTranslation } from "react-i18next";


  const SignInScreen = ({ navigation }) => {
    const [role, setRole] = useState(0);
    const { t } = useTranslation();

    const [phoneNumber, setPhoneNumber] = useState("");
    const [displayOTPInput, setDisplayOTPInput] = useState(false);
    const [code, setCode] = useState("");
    const [confirmation, setConfirmation] = useState("");
    const [password, setPassword] = useState("");
    const countryCode = "+84";
    // const [hashedPassword , setHashPassword] = useState("");
    // const requestOTP = async ()=>{
    //   setDisplayOTPInput(true);

    //   const confirmation = await firebase.auth().signInWithPhoneNumber(countryCode+phoneNumber);
    //   setConfirmation(confirmation);
    // }
    // const checkPhoneNumber = ()=>{
    //   setDoc(doc(db, "Customer", "0972987357"),{

    //   })
    // }
  

    const isPhoneNumberNull = () => {};

    const checkPhoneNumber = () => {
      if (phoneNumber.length !== 10) {
        Alert.alert(t("alertInvalid"), t("alertReEnter"), [
          {
            text: "OK",
          },
        ]);
      } else {
        let getRole = "";
        {
          role != 2
            ? role != 1
              ? (getRole = "Customer")
              : (getRole = "Rider")
            : (getRole = "StudentOffice");
        }

        if (getRole === "StudentOffice") {
          getDoc(doc(db, getRole, phoneNumber))
            .then((docData) => {
              if (docData.exists()) {
                if(docData.data().password===password){
                  saveToAsyncStorage("phoneNumber", phoneNumber);
                  saveToAsyncStorage("role", getRole);
                  navigation.navigate("StudentOfficeNavigator", {
                    screen: "StudentOffice",
                  });
                }else if(password===""){
                  Alert.alert("Please enter your password");
                }
                else{
                  Alert.alert("Wrong password");
                }
                // bcrypt.genSalt(10,(err,salt)=>{
                //   bcrypt.hash(password, salt, (err, hash)=>{
                //     if (err) {
                //       console.error('Error hashing password:', err);
                //     } else {
                //       setHashPassword(hash)
                //       if(hashedPassword==docData.data().password){
                //         saveToAsyncStorage("phoneNumber", phoneNumber);
                //         saveToAsyncStorage("role", getRole);
                //         navigation.navigate("StudentOfficeNavigator", {
                //           screen: "StudentOffice",
                //         });
                //       }else{
                //         console.log("wrong password")
                //       }
                //       // Save the hash to the database or use it as needed
                //     }
                //   })
                // })
                // AsyncStorage.setItem("phoneNumber", phoneNumber);
                // AsyncStorage.setItem("role", getRole);
                
              } else {
                Alert.alert("Wrong phone number!");
                console.log("no such data");
              }
            })
            .catch((error) => {});
        } else {
          getDoc(doc(db, getRole, phoneNumber))
            .then((docData) => {
              if (!docData.exists()) {
                Alert.alert(t("alertNotExist"));
              }

              if (docData.exists() && docData.data().status === "active") {
                // AsyncStorage.setItem("phoneNumber", phoneNumber);
                // AsyncStorage.setItem("role", getRole);
                saveToAsyncStorage("phoneNumber", phoneNumber);
                saveToAsyncStorage("role", getRole);
                navigation.navigate("Verify");
              } else if (
                docData.exists() &&
                (docData.data().status === "pending" ||
                  docData.data().status === "rejected")
              ) {
                navigation.navigate("Pending");
                saveToAsyncStorage("phoneNumber", phoneNumber);
                saveToAsyncStorage("role", getRole);
              } else if (docData.data().status === "locked") {
                Alert.alert(t("alertLocked"), t("contactOffice"));
              } else {
                Alert.alert(t("alertExisted"));
              }
            })
            .catch((error) => {});
        }
      }
    };

    const onHandleLogin = () => {
      if (role == 1) {
        navigation.navigate("MainRiderNavigator", {
          screen: "HomeRider",
        });
      }
    };

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
            <Text style={{ ...FONTS.h2 }} mt={10} color={COLORS.white}>
              {t("letSignIn")}
            </Text>
            <HStack mt={7} w={"100%"}>
              <ScrollView horizontal>
                <Button
                  full
                  variant={"outline"}
                  // w={"27%"}
                  borderRadius={10}
                  bgColor={role === 0 ? COLORS.fourthary : "transparent"}
                  borderColor={COLORS.fifthary}
                  onPress={() => {
                    setRole(0);
                  }}
                >
                  <Text color={COLORS.white} style={{ ...FONTS.h5 }}>
                    {t("customer")}
                  </Text>
                </Button>
                <Button
                  variant={"outline"}
                  // w={"18%"}
                  full
                  borderRadius={10}
                  borderColor={COLORS.fifthary}
                  bgColor={role === 1 ? COLORS.fourthary : "transparent"}
                  onPress={() => {
                    setRole(1);
                    // navigation.navigate("MainRiderNavigator", {
                    //   screen: "HomeRider",
                    // });
                  }}
                  ml={4}
                >
                  <Text color={COLORS.white} style={{ ...FONTS.h5 }}>
                    {t("rider")}
                  </Text>
                </Button>
                <Button
                  variant={"outline"}
                  // w={"40%"}
                  full
                  borderRadius={10}
                  borderColor={COLORS.fifthary}
                  bgColor={role === 2 ? COLORS.fourthary : "transparent"}
                  onPress={() => {
                    setRole(2);
                    // navigation.navigate("StudentOfficeNavigator", {
                    //   screen: "StudentOffice",
                    // });
                  }}
                  ml={4}
                >
                  <Text color={COLORS.white} style={{ ...FONTS.h5 }}>
                    {t("office")}
                  </Text>
                </Button>
              </ScrollView>
            </HStack>
            <Input
              w={"100%"}
              h={"77px"}
              borderRadius={20}
              borderColor={COLORS.secondary}
              mt={10}
              placeholder={t("enterPhone")}
              style={{ ...FONTS.body3 }}
              color={COLORS.white}
              keyboardType="numeric"
              onChangeText={(text) => setPhoneNumber(text)}
            />
            {role===2&&(
            <Input
              w={"100%"}
              h={"77px"}
              borderRadius={20}
              borderColor={COLORS.secondary}
              mt={5}
              placeholder={t("enterPasswordOffice")}
              style={{ ...FONTS.body3 }}
              color={COLORS.white}
              onChangeText={(text) => setPassword(text)}
              secureTextEntry={true} 
            />
            )}
            <VStack position={"absolute"} bottom={10} w={"100%"}>
              <HStack justifyContent={"center"} mb={5}>
                <Text color={COLORS.white} style={{ ...FONTS.body3 }}>
                  {t("dontHaveAccount")}{" "}
                </Text>
                <Text
                  onPress={() => {
                    navigation.navigate("SignUp");
                  }}
                  color={COLORS.primary}
                  style={{ ...FONTS.body3, fontWeight: "bold" }}
                >
                  {t("register")}
                </Text>
              </HStack>
              <Button
                w={"100%"}
                borderRadius={20}
                bgColor={COLORS.primary}
                onPress={
                  // ()=>{navigation.navigate("Verify", {code: code});}
                  //requestOTP
                  //onHandleLogin
                  //checkPhoneNumber
                  checkPhoneNumber
                }
              >
                <Text style={{ ...FONTS.h2 }} color={COLORS.white}>
                  {t("continue")}
                </Text>
              </Button>
            </VStack>
          </SafeAreaView>
        </VStack>
      </TouchableWithoutFeedback>
    );
  };

  export default SignInScreen;
