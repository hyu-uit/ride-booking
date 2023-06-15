import {
  Avatar,
  Button,
  HStack,
  Image,
  NativeBaseProvider,
  ScrollView,
  Select,
  Text,
  VStack,
  View,
} from "native-base";
import React, { useState } from "react";
import ButtonBack from "../../components/Global/ButtonBack/ButtonBack";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS, FONTS, SIZES } from "../../constants";
import { useEffect } from "react";
import { getFromAsyncStorage, removeValue } from "../../helper/asyncStorage";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../config/config";
import { useTranslation } from "react-i18next";
import i18next from "i18next";

const StudentOfficeProfileScreen = ({ navigation }) => {
  const [phoneNumber, setPhoneNumber] = useState(null);
  const [uniName, setUniName] = useState(null);
  const [address, setAddress] = useState(null);
  const [logo, setLogo] = useState(null);
  const { t } = useTranslation();
  const [language, setLanguage] = useState(i18next.language);
  const [imgUri, setImgUri] = useState(null);

  useEffect(() => {
    if (language === "vi") {
      setImgUri(
        "https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Flag_of_Vietnam.svg/2000px-Flag_of_Vietnam.svg.png"
      );
    } else {
      setImgUri(
        "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Flag_of_the_United_Kingdom_%281-2%29.svg/1200px-Flag_of_the_United_Kingdom_%281-2%29.svg.png"
      );
    }
    fetchDataAndPhoneNumber();
  });
  const fetchDataAndPhoneNumber = async () => {
    try {
      const phoneNumberValue = await getFromAsyncStorage("phoneNumber");
      setPhoneNumber(phoneNumberValue);

      if (phoneNumberValue) {
        fetchData(phoneNumberValue);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const fetchData = async (phoneNumber) => {
    try {
      const docData = await getDoc(doc(db, "StudentOffice", phoneNumber));
      setUniName(docData.data().name);
      setLogo(docData.data().logo);
      setAddress(docData.data().address);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <VStack h={"100%"} paddingTop={"20px"} bgColor={COLORS.background}>
      <SafeAreaView>
        <VStack paddingX={"10px"} h={"100%"}>
          <HStack justifyContent={"center"}>
            <View style={{ position: "absolute", left: 0 }}></View>
            <Text style={{ ...FONTS.h2, color: COLORS.white }}>
              {t("profile")}
            </Text>
          </HStack>

          <ScrollView showsVerticalScrollIndicator={false}>
            <VStack mt={5} alignItems={"center"}>
              <HStack w={"118px"}>
                <Image
                  source={{ uri: logo }}
                  h={"118px"}
                  w={"118px"}
                  resizeMode="contain"
                ></Image>
              </HStack>
            </VStack>

            <VStack>
              <Text style={{ ...FONTS.h4, color: COLORS.fifthary }} mt={10}>
                {t("name")}
              </Text>
              <Text style={{ ...FONTS.h4, color: COLORS.white }} mt={2}>
                {uniName}
              </Text>
              <Text style={{ ...FONTS.h4, color: COLORS.fifthary }} mt={10}>
                {t("address")}
              </Text>
              <Text style={{ ...FONTS.h4, color: COLORS.white }} mt={2}>
                {address}
              </Text>
              <Text style={{ ...FONTS.h4, color: COLORS.fifthary }} mt={10}>
                {t("language")}
              </Text>
              <HStack alignItems={"center"} mt={2}>
                <Image
                  source={{
                    uri: imgUri,
                  }}
                  alt="hi"
                  w={8}
                  h={5}
                />
                <Select
                  alignSelf={"flex-end"}
                  w={"150px"}
                  h={"50px"}
                  borderColor={"transparent"}
                  style={{ ...FONTS.body3 }}
                  color={COLORS.white}
                  onValueChange={(itemValue) => {
                    setLanguage(itemValue);
                    i18next.changeLanguage(itemValue);
                  }}
                  selectedValue={language}
                  _selectedItem={{
                    bg: COLORS.fifthary,
                  }}
                >
                  <Select.Item label={t("en")} value="en" />
                  <Select.Item label={t("vi")} value="vi" />
                </Select>
              </HStack>
            </VStack>

            <Button
              w={"100%"}
              mt={20}
              borderRadius={20}
              bgColor={COLORS.primary}
              onPress={() => {
                removeValue("phoneNumber");
                removeValue("role");
                navigation.navigate("AuthenticationStack", {
                  screen: "Login",
                });
              }}
            >
              <Text style={{ ...FONTS.h2 }} color={COLORS.white}>
                {t("logout")}
              </Text>
            </Button>
          </ScrollView>
        </VStack>
      </SafeAreaView>
    </VStack>
  );
};

export default StudentOfficeProfileScreen;
