import {
  Alert,
  Button,
  HStack,
  Input,
  NativeBaseProvider,
  ScrollView,
  Select,
  Text,
  VStack,
} from "native-base";
import { Keyboard, TouchableWithoutFeedback } from "react-native";
import React, { useState } from "react";
import ButtonBack from "../../components/Global/ButtonBack/ButtonBack";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS, FONTS } from "../../constants";
import { db } from "../../config/config";
import {doc,setDoc} from "firebase/firestore"

const SignUpScreen = ({ navigation }) => {
  const [school, setSchool] = useState("");
  const [name, setName] = useState("");
  const [id, setID] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");

  const signUp = ()=>{
      setDoc(doc(db, "Customer", phoneNumber),{
        displayName:name,
        email:email,
        school:school,
        studentID:id
      });    
      navigation.navigate("UploadID"); 
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
          <VStack paddingBottom={2}>
            <ButtonBack></ButtonBack>
            <Text style={{ ...FONTS.h2 }} mt={10} color={COLORS.white}>
              Create Account
            </Text>

            <ScrollView>
              <Select
                w={"100%"}
                h={"77px"}
                borderRadius={20}
                borderColor={COLORS.secondary}
                mt={5}
                placeholder="Choose role"
                style={{ ...FONTS.body3 }}
                color={COLORS.white}
                onValueChange={(itemValue) => setSchool(itemValue)}
                selectedValue={school}
                _selectedItem={{
                  bg: COLORS.fifthary,
                }}
              >
                <Select.Item label="Customer" value="Customer" />
                <Select.Item label="Rider" value="Rider" />
              </Select>
              <Input
                w={"100%"}
                h={"77px"}
                borderRadius={20}
                borderColor={COLORS.secondary}
                mt={5}
                placeholder="Full name"
                style={{ ...FONTS.body3 }}
                color={COLORS.white}
              />
              <Input
                w={"100%"}
                h={"77px"}
                borderRadius={20}
                borderColor={COLORS.secondary}
                mt={5}
                placeholder="Student ID"
                style={{ ...FONTS.body3 }}
                color={COLORS.white}
              />
              <Select
                w={"100%"}
                h={"77px"}
                borderRadius={20}
                borderColor={COLORS.secondary}
                mt={5}
                placeholder="Choose school"
                style={{ ...FONTS.body3 }}
                color={COLORS.white}
                onValueChange={(itemValue) => setSchool(itemValue)}
                selectedValue={school}
                _selectedItem={{
                  bg: COLORS.fifthary,
                }}
              >
                <Select.Item
                  label="University of Information Technology"
                  value="UIT"
                />
                <Select.Item
                  label="University of Social Sciences and Humanities"
                  value="USSH"
                />
                <Select.Item label="University of Science" value="US" />
                <Select.Item label="University of Technology" value="UT" />
                <Select.Item
                  label="University of Economics and Law"
                  value="UEL"
                />
                <Select.Item label="International University" value="IU" />
              </Select>
              <Input
                w={"100%"}
                h={"77px"}
                borderRadius={20}
                borderColor={COLORS.secondary}
                mt={5}
                placeholder="Phone number"
                style={{ ...FONTS.body3 }}
                color={COLORS.white}
                keyboardType="numeric"
              />
              <Input
                w={"100%"}
                h={"77px"}
                borderRadius={20}
                borderColor={COLORS.secondary}
                mt={5}
                placeholder="Email address"
                style={{ ...FONTS.body3 }}
                color={COLORS.white}
              />
              <VStack w={"100%"} mt={3}>
                <HStack justifyContent={"center"} mb={5}>
                  <Text color={COLORS.white} style={{ ...FONTS.body3 }}>
                    You have already an account?{" "}
                  </Text>
                  <Text
                    onPress={() => {
                      navigation.navigate("SignIn");
                    }}
                    color={COLORS.white}
                    style={{ ...FONTS.body3, fontWeight: "bold" }}
                  >
                    Sign in
                  </Text>
                </HStack>
                <Button
                  w={"100%"}
                  borderRadius={20}
                  bgColor={COLORS.primary}
                  onPress={() => {
                    navigation.navigate("UploadID");
                  }}
                >
                  <Text style={{ ...FONTS.h2 }} color={COLORS.white}>
                    Continue
                  </Text>
                </Button>
              </VStack>
            </ScrollView>
          </VStack>
        </SafeAreaView>
      </VStack>
    </TouchableWithoutFeedback>
  );
};

export default SignUpScreen;
