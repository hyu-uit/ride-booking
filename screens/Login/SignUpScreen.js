import {
  Button,
  HStack,
  Input,
  NativeBaseProvider,
  ScrollView,
  Select,
  Text,
  VStack,
  View,
} from "native-base";
import {
  Keyboard,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import React, { useState } from "react";
import ButtonBack from "../../components/Global/ButtonBack/ButtonBack";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS, FONTS } from "../../constants";
import { db } from "../../config/config";
import {
  doc,
  setDoc,
  addDoc,
  getDoc,
  getDocs,
  query,
  collection,
  documentId,
} from "firebase/firestore";
import { Alert } from "react-native";
import { LogBox } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import moment from "moment";
import { saveToAsyncStorage } from "../../helper/asyncStorage";
import { useTranslation } from "react-i18next";

LogBox.ignoreAllLogs(); //Ignore all log notifications

const SignUpScreen = ({ navigation }) => {
  const [school, setSchool] = useState("");
  const [name, setName] = useState("");
  const [id, setID] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [licensePlates, setLicensePlates] = useState("");
  const [transportType, setTransportType] = useState("");

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [finalDate, setFinalDate] = useState(null);
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const { t } = useTranslation();

  const handleDateChange = (_event, date) => {
    const now = new Date();
    const birthday = new Date(date);
    if (birthday.getTime() > now.getTime()) {
      Alert.alert(t("alertBirthday"), "", [
        {
          text: "OK",
        },
      ]);
    } else {
      setShowDatePicker(false);
      setSelectedDate(date);
      Platform.OS === "ios"
        ? setShowDatePicker(true)
        : setShowDatePicker(false);
      setFinalDate(moment(selectedDate).format("DD-MM-YYYY"));
    }
  };

  const signUp = () => {
    if (
      (role == "" || name == "" || id == "",
      school == "",
      phoneNumber == "",
      email == "" || finalDate === null)
    ) {
      Alert.alert(t("alertInfo"), "", [
        {
          text: "OK",
        },
      ]);
    } else if (phoneNumber.length !== 10) {
      Alert.alert(t("alertInvalid"), t("alertReEnter"), [
        {
          text: "OK",
        },
      ]);
    } else if (!emailRegex.test(email)) {
      Alert.alert(t("alertEmail"), "", [
        {
          text: "OK",
        },
      ]);
    } else {
      let count = 0;
      let rejected = false;
      getDocs(collection(db, role)).then((docSnap) => {
        docSnap.forEach((doc) => {
          if (doc.id == phoneNumber) count++;
          if (doc.data().status === "rejected" && doc.id === phoneNumber)
            rejected = true;
          console.log(doc.id);
        });
        if (count == 0 || rejected === true) {
          // setDoc(doc(db, role, phoneNumber), {
          //   displayName: name,
          //   email: email,
          //   school: school,
          //   studentID: id,
          //   status: "pending",
          // });
          saveToAsyncStorage("phoneNumber", phoneNumber);
          saveToAsyncStorage("role", role);
          saveToAsyncStorage("displayName", name);
          saveToAsyncStorage("school", school);
          saveToAsyncStorage("studentID", id);
          saveToAsyncStorage("email", email);
          saveToAsyncStorage("licensePlates", licensePlates);
          saveToAsyncStorage("transportType", transportType);
          saveToAsyncStorage("dob", finalDate);
          navigation.navigate("UploadID");
        } else {
          Alert.alert(t("alertExisted"), t("alertReEnter"), [
            {
              text: "OK",
            },
          ]);
        }
      });
    }
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <VStack
          paddingX={"10px"}
          bgColor={COLORS.background}
          w={"100%"}
          h={"100%"}
        >
          <SafeAreaView style={{ width: "100%", height: "100%" }}>
            <VStack paddingBottom={2}>
              <ButtonBack
                onPress={() => {
                  navigation.goBack();
                }}
              ></ButtonBack>
              <Text style={{ ...FONTS.h2 }} mt={2} mb={2} color={COLORS.white}>
                {t("create")}
              </Text>
              <ScrollView showsVerticalScrollIndicator={false} mb={20}>
                <Select
                  w={"100%"}
                  h={"77px"}
                  borderRadius={20}
                  borderColor={COLORS.secondary}
                  mt={5}
                  placeholder={t("inputRole")}
                  style={{ ...FONTS.body3 }}
                  color={COLORS.white}
                  onValueChange={(itemValue) => setRole(itemValue)}
                  selectedValue={role}
                  _selectedItem={{
                    bg: COLORS.fifthary,
                  }}
                >
                  <Select.Item label={t("customer")} value="Customer" />
                  <Select.Item label={t("rider")} value="Rider" />
                </Select>
                {role === "Rider" ? (
                  <>
                    <Input
                      w={"100%"}
                      h={"77px"}
                      borderRadius={20}
                      borderColor={COLORS.secondary}
                      mt={5}
                      placeholder={t("inputType")}
                      onChangeText={(value) => {
                        setTransportType(value);
                      }}
                      style={{ ...FONTS.body3 }}
                      color={COLORS.white}
                    />
                    <Input
                      w={"100%"}
                      h={"77px"}
                      borderRadius={20}
                      borderColor={COLORS.secondary}
                      mt={5}
                      placeholder={t("inputLicense")}
                      onChangeText={(value) => {
                        setLicensePlates(value);
                      }}
                      style={{ ...FONTS.body3 }}
                      color={COLORS.white}
                    />
                  </>
                ) : (
                  <></>
                )}
                <Input
                  w={"100%"}
                  h={"77px"}
                  borderRadius={20}
                  borderColor={COLORS.secondary}
                  mt={5}
                  placeholder={t("inputName")}
                  onChangeText={(name) => {
                    setName(name);
                  }}
                  style={{ ...FONTS.body3 }}
                  color={COLORS.white}
                />
                <View
                  w={"100%"}
                  h={"77px"}
                  borderRadius={20}
                  borderColor={COLORS.secondary}
                  borderWidth={1}
                  paddingLeft={4}
                  mt={5}
                  justifyContent={"center"}
                >
                  <HStack w={"100%"}>
                    {/* <Text style={{ ...FONTS.body3, color: COLORS.white }}>
                      30/05/2023
                    </Text> */}
                    {Platform.OS === "android" ? (
                      <>
                        <Text style={{ ...FONTS.body3, color: COLORS.white }}>
                          {moment(selectedDate).format("DD-MM-YYYY")}
                        </Text>
                      </>
                    ) : (
                      <>
                        {finalDate === null && showDatePicker === false ? (
                          <>
                            <Text
                              style={{ ...FONTS.body3, color: COLORS.grey }}
                            >
                              {t("inputBirthday")}
                            </Text>
                          </>
                        ) : (
                          <></>
                        )}
                      </>
                    )}
                    <Ionicons
                      onPress={() => {
                        setShowDatePicker(true);
                      }}
                      size={20}
                      name="calendar"
                      style={{
                        position: "absolute",
                        right: 20,
                        color: COLORS.white,
                      }}
                    />
                    {showDatePicker && (
                      <DateTimePicker
                        value={selectedDate}
                        mode="date"
                        // onChange={handleDateChange}
                        onChange={handleDateChange}
                      />
                    )}
                  </HStack>
                </View>
                <Input
                  w={"100%"}
                  h={"77px"}
                  borderRadius={20}
                  borderColor={COLORS.secondary}
                  mt={5}
                  placeholder={t("inputId")}
                  onChangeText={(id) => {
                    setID(id);
                  }}
                  style={{ ...FONTS.body3 }}
                  color={COLORS.white}
                />
                <Select
                  w={"100%"}
                  h={"77px"}
                  borderRadius={20}
                  borderColor={COLORS.secondary}
                  mt={5}
                  placeholder={t("inputSchool")}
                  style={{ ...FONTS.body3 }}
                  color={COLORS.white}
                  onValueChange={(itemValue) => setSchool(itemValue)}
                  selectedValue={school}
                  _selectedItem={{
                    bg: COLORS.fifthary,
                  }}
                >
                  <Select.Item label={t("UIT")} value="UIT" />
                  <Select.Item label={t("USSH")} value="USSH" />
                  <Select.Item label={t("US")} value="US" />
                  <Select.Item label={t("UT")} value="UT" />
                  <Select.Item label={t("UEL")} value="UEL" />
                  <Select.Item label={t("IU")} value="IU" />
                </Select>
                <Input
                  w={"100%"}
                  h={"77px"}
                  borderRadius={20}
                  borderColor={COLORS.secondary}
                  mt={5}
                  placeholder={t("inputPhone")}
                  onChangeText={(phoneNumber) => {
                    setPhoneNumber(phoneNumber);
                  }}
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
                  placeholder={t("inputEmail")}
                  onChangeText={(email) => {
                    setEmail(email);
                  }}
                  style={{ ...FONTS.body3 }}
                  color={COLORS.white}
                />
                <VStack w={"100%"} mt={3}>
                  <HStack justifyContent={"center"} mb={5}>
                    <Text color={COLORS.white} style={{ ...FONTS.body3 }}>
                      {t("already")}{" "}
                    </Text>
                    <Text
                      onPress={() => {
                        navigation.navigate("SignIn");
                      }}
                      color={COLORS.primary}
                      style={{ ...FONTS.body3, fontWeight: "bold" }}
                    >
                      {t("signin")}
                    </Text>
                  </HStack>
                  <Button
                    w={"100%"}
                    borderRadius={20}
                    bgColor={COLORS.primary}
                    onPress={signUp}
                  >
                    <Text style={{ ...FONTS.h2 }} color={COLORS.white}>
                      {t("continue")}
                    </Text>
                  </Button>
                </VStack>
              </ScrollView>
            </VStack>
          </SafeAreaView>
        </VStack>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

export default SignUpScreen;
