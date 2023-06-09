import {
  Avatar,
  Button,
  HStack,
  Image,
  NativeBaseProvider,
  ScrollView,
  Text,
  VStack,
  View,
} from "native-base";
import React, { useState } from "react";
import ButtonBack from "../../components/Global/ButtonBack/ButtonBack";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS, FONTS, SIZES } from "../../constants";
import { useEffect } from "react";
import { getFromAsyncStorage } from "../../helper/asyncStorage";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../config/config";
import { useTranslation } from "react-i18next";

const StudentOfficeProfileScreen = ({ navigation }) => {
  const [phoneNumber, setPhoneNumber] = useState(null);
  const [uniName, setUniName] = useState(null);
  const [address, setAddress] = useState(null);
  const [logo, setLogo] = useState(null);
  const { t } = useTranslation();

  useEffect(() => {
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

          {/* <ScrollView showsVerticalScrollIndicator={false}> */}
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
          </VStack>

          <Button
            w={"100%"}
            mt={20}
            borderRadius={20}
            bgColor={COLORS.primary}
            onPress={() => {
              navigation.navigate("AuthenticationStack", {
                screen: "Login",
              });
            }}
          >
            <Text style={{ ...FONTS.h2 }} color={COLORS.white}>
              {t("logout")}
            </Text>
          </Button>
          {/* </ScrollView> */}
        </VStack>
      </SafeAreaView>
    </VStack>
  );
};

export default StudentOfficeProfileScreen;
