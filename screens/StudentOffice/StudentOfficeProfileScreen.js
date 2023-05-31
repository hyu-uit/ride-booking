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

const StudentOfficeProfileScreen = ({ navigation }) => {
  const [phoneNumber, setPhoneNumber] = useState(null);

  useEffect(() => {
    getFromAsyncStorage("phoneNumber")
      .then((value) => setPhoneNumber(value))
      .catch((err) => console.log(err));
    fetchData();
  });

  const fetchData = () => {
    getDoc(doc(db, "StudentOffice", phoneNumber))
      .then((docData) => {
        setUniName(docData.data().name);
        setAcronym(docData.data().acronym);
        setLogo(docData.data().logo);
      })
      .catch((error) => {});
  };

  return (
    <VStack h={"100%"} paddingTop={"20px"} bgColor={COLORS.background}>
      <SafeAreaView>
        <VStack paddingX={"10px"} h={"100%"}>
          <HStack justifyContent={"center"}>
            <View style={{ position: "absolute", left: 0 }}></View>
            <Text style={{ ...FONTS.h2, color: COLORS.white }}>Profile</Text>
          </HStack>

          <ScrollView showsVerticalScrollIndicator={false}>
            <VStack mt={5} alignItems={"center"}>
              <HStack w={"118px"}>
                <Image
                  src="https://cdn.haitrieu.com/wp-content/uploads/2021/10/Logo-DH-Cong-Nghe-Thong-Tin-UIT.png"
                  h={"118px"}
                  w={"118px"}
                  resizeMode="center"
                ></Image>
              </HStack>
            </VStack>

            <VStack>
              <Text style={{ ...FONTS.h4, color: COLORS.fifthary }} mt={10}>
                Name
              </Text>
              <Text style={{ ...FONTS.h4, color: COLORS.white }} mt={2}>
                University of Information Technology
              </Text>
              <Text style={{ ...FONTS.h4, color: COLORS.fifthary }} mt={10}>
                Address
              </Text>
              <Text style={{ ...FONTS.h4, color: COLORS.white }} mt={2}>
                01 Hàn Thuyên, Khu phố 6, Linh Trung, Thủ Đức, Sài Gòn
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
                Log out
              </Text>
            </Button>
          </ScrollView>
        </VStack>
      </SafeAreaView>
    </VStack>
  );
};

export default StudentOfficeProfileScreen;
