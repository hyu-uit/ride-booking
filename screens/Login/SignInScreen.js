import {
  Button,
  HStack,
  Input,
  NativeBaseProvider,
  Text,
  VStack,
} from "native-base";
import React, { useState } from "react";
import ButtonBack from "../../components/Global/ButtonBack/ButtonBack";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS, FONTS } from "../../constants";
import { Alert, TouchableWithoutFeedback } from "react-native";
import { Keyboard } from "react-native";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../config/config";

const SignInScreen = ({ navigation }) => {
  const [role, setRole] = useState(0);

  const [phoneNumber, setPhoneNumber] = useState("");
  const [displayOTPInput, setDisplayOTPInput]=useState(false);
  const [code, setCode]=useState('');
  const [confirmation, setConfirmation]=useState('');

  const countryCode='+84';

  // const requestOTP = async ()=>{
  //   setDisplayOTPInput(true);
    
  //   const confirmation = await firebase.auth().signInWithPhoneNumber(countryCode+phoneNumber);
  //   setConfirmation(confirmation);
  // }
  // const checkPhoneNumber = ()=>{
  //   setDoc(doc(db, "Customer", "0972987357"),{
      
  //   })
  // }
  const checkPhoneNumber = ()=>{
    getDoc(doc(db,"Customer",phoneNumber))
      .then(docData=>{ 
        if(docData.exists()){
          navigation.navigate("Verify")
        }else{
          Alert.alert("Phone number has not been registered!")
          console.log("no such data");
        }
      }).catch((error)=>{
      })
}
  const onHandleLogin=()=>{
    if(role==1){
      navigation.navigate("MainRiderNavigator", {
        screen: "HomeRider",
      });
    }
  }

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
          <ButtonBack></ButtonBack>
          <Text style={{ ...FONTS.h2 }} mt={10} color={COLORS.white}>
            Let's sign you in
          </Text>
          <Text style={{ ...FONTS.bopdy3 }} mt={60} color={COLORS.white}>
            Please choose your role
          </Text>
          <HStack mt={7} w={"100%"}>
            <Button
              variant={"outline"}
              w={"27%"}
              h={"40px"}
              borderRadius={10}
              bgColor={role === 0 ? COLORS.fourthary : "transparent"}
              borderColor={COLORS.fifthary}
              onPress={() => {
                setRole(0);
              }}
            >
              <Text color={COLORS.white} style={{ ...FONTS.h5 }}>
                Customer
              </Text>
            </Button>
            <Button
              variant={"outline"}
              w={"18%"}
              h={"40px"}
              borderRadius={10}
              borderColor={COLORS.fifthary}
              bgColor={role === 1 ? COLORS.fourthary : "transparent"}
              onPress={() => {
                setRole(1);
              }}
              ml={4}
            >
              <Text color={COLORS.white} style={{ ...FONTS.h5 }}>
                Rider
              </Text>
            </Button>
            <Button
              variant={"outline"}
              w={"40%"}
              h={"40px"}
              borderRadius={10}
              borderColor={COLORS.fifthary}
              bgColor={role === 2 ? COLORS.fourthary : "transparent"}
              onPress={() => {
                setRole(2);
                navigation.navigate("StudentOfficeNavigator", {
                  screen: "StudentOffice",
                });
              }}
              ml={4}
            >
              <Text color={COLORS.white} style={{ ...FONTS.h5 }}>
                Office of Student
              </Text>
            </Button>
          </HStack>

          <Input
            w={"100%"}
            h={"77px"}
            borderRadius={20}
            borderColor={COLORS.secondary}
            mt={10}
            placeholder="Enter your phone number"
            style={{ ...FONTS.body3 }}
            color={COLORS.white}
            keyboardType="numeric"
            onChangeText={(text) => setPhoneNumber(text)}
          />

          <VStack position={"absolute"} bottom={10} w={"100%"}>
            <HStack justifyContent={"center"} mb={5}>
              <Text color={COLORS.white} style={{ ...FONTS.body3 }}>
                You don't have account?{" "}
              </Text>
              <Text
                onPress={() => {
                  navigation.navigate("SignUp");
                }}
                color={COLORS.white}
                style={{ ...FONTS.body3, fontWeight: "bold" }}
              >
                Register
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
                Continue
              </Text>
            </Button>
          </VStack>
        </SafeAreaView>
      </VStack>
    </TouchableWithoutFeedback>
  );
};

export default SignInScreen;
