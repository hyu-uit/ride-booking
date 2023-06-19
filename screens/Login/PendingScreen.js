import React, { useState } from "react";
import {
  Button,
  HStack,
  Image,
  Input,
  ScrollView,
  Spacer,
  Text,
  VStack,
  View,
  Icon,
  Wrap,
} from "native-base";
import { COLORS, FONTS, SIZES } from "../../constants/theme";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect } from "react";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../config/config";
import { getFromAsyncStorage, removeValue } from "../../helper/asyncStorage";
import { useTranslation } from "react-i18next";

const PendingScreen = ({ navigation }) => {
  const { t } = useTranslation();
  useEffect(() => {
    fetchDataAndPhoneNumber();
  }, [navigation]);

  const fetchDataAndPhoneNumber = async () => {
    try {
      const phoneNumberValue = await getFromAsyncStorage("phoneNumber");
      setPhoneNumber(phoneNumberValue);
      const roleValue = await getFromAsyncStorage("role");
      setRole(roleValue);

      if (phoneNumberValue) {
        fetchData(phoneNumberValue, roleValue);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const fetchData = async (phoneNumber, role) => {
    try {
      getDoc(doc(db, role, phoneNumber)).then((docData) => {
        if (docData.data().status === "rejected") {
          getDocs(
            collection(db, "Reject")
            // where("phoneNumber", "==", phoneNumber)
          ).then((docSnap) => {
            docSnap.forEach((doc) => {
              if (
                doc.data().phoneNumber === phoneNumber &&
                doc.data().role === role
              ) {
                setName(doc.data().name);
                setBirthday(doc.data().birthday);
                setCardBack(doc.data().cardBack);
                setCardFront(doc.data().cardFront);
                setPortrait(doc.data().portrait);
                setMoreInfo(doc.data().moreInfo);
                setId(doc.data().studentID);
                setReject(true);
              }
            });
          });
        }
      });
    } catch (error) {
      console.error(error);
    }
  };

  const [reject, setReject] = useState(false);

  const [name, setName] = useState(false);
  const [birthday, setBirthday] = useState(false);
  const [id, setId] = useState(false);
  const [cardFront, setCardFront] = useState(false);
  const [cardBack, setCardBack] = useState(false);
  const [portrait, setPortrait] = useState(false);
  const [moreInfo, setMoreInfo] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [role, setRole] = useState("");

  return (
    <VStack h={"100%"} bgColor={COLORS.background}>
      <SafeAreaView>
        <VStack
          h={"100%"}
          mt={"17px"}
          paddingX={"10px"}
          alignItems={"center"}
          overflow={"scroll"}
        >
          {/* <ScrollView h={"100%"}> */}
          <Image
            h={"40%"}
            resizeMode="contain"
            alt="pending"
            source={require("../../assets/images/StudentOffice/pending.png")}
          />
          <Text
            style={{ ...FONTS.h1, color: COLORS.white }}
            mt={10}
            alignSelf={"center"}
          >
            {t("pending")}
          </Text>

          {reject ? (
            <>
              <Text
                style={{
                  ...FONTS.body4,
                  color: COLORS.grey,
                }}
                textAlign={"center"}
                mt={5}
              >
                {t("pendingReject")}
              </Text>

              <Wrap
                mt={5}
                flexDirection={"row"}
                flexWrap={"wrap"}
                justifyContent={"center"}
              >
                {name ? (
                  <>
                    <Text
                      padding={1}
                      mt={1}
                      mr={2}
                      alignSelf={"flex-start"}
                      style={{
                        ...FONTS.h5,
                        color: COLORS.white,
                        backgroundColor: COLORS.red,
                      }}
                    >
                      {t("fullName")}
                    </Text>
                  </>
                ) : (
                  <></>
                )}
                {birthday ? (
                  <>
                    <Text
                      padding={1}
                      mt={1}
                      mr={2}
                      alignSelf={"flex-start"}
                      style={{
                        ...FONTS.h5,
                        color: COLORS.white,
                        backgroundColor: COLORS.red,
                      }}
                    >
                      {t("birthday")}
                    </Text>
                  </>
                ) : (
                  <></>
                )}
                {id ? (
                  <>
                    <Text
                      padding={1}
                      mt={1}
                      mr={2}
                      alignSelf={"flex-start"}
                      style={{
                        ...FONTS.h5,
                        color: COLORS.white,
                        backgroundColor: COLORS.red,
                      }}
                    >
                      {t("id")}
                    </Text>
                  </>
                ) : (
                  <></>
                )}
                {cardFront ? (
                  <>
                    <Text
                      padding={1}
                      mt={1}
                      mr={2}
                      alignSelf={"flex-start"}
                      style={{
                        ...FONTS.h5,
                        color: COLORS.white,
                        backgroundColor: COLORS.red,
                      }}
                    >
                      {t("cardFront")}
                    </Text>
                  </>
                ) : (
                  <></>
                )}
                {cardBack ? (
                  <>
                    <Text
                      padding={1}
                      mt={1}
                      mr={2}
                      alignSelf={"flex-start"}
                      style={{
                        ...FONTS.h5,
                        color: COLORS.white,
                        backgroundColor: COLORS.red,
                      }}
                    >
                      {t("cardBack")}
                    </Text>
                  </>
                ) : (
                  <></>
                )}
                {portrait ? (
                  <>
                    <Text
                      padding={1}
                      mt={1}
                      mr={2}
                      alignSelf={"flex-start"}
                      style={{
                        ...FONTS.h5,
                        color: COLORS.white,
                        backgroundColor: COLORS.red,
                      }}
                    >
                      {t("portrait")}
                    </Text>
                  </>
                ) : (
                  <></>
                )}
              </Wrap>
              {moreInfo ? (
                <>
                  <View
                    w={"100%"}
                    bgColor={COLORS.tertiary}
                    borderRadius={20}
                    mt={5}
                    padding={5}
                  >
                    <Text style={{ ...FONTS.h4, color: COLORS.grey }}>
                      {t("moreInfo")}
                    </Text>
                    <Text
                      padding={1}
                      mt={1}
                      mr={2}
                      alignSelf={"flex-start"}
                      style={{
                        ...FONTS.body5,
                        color: COLORS.white,
                      }}
                    >
                      {moreInfo}
                    </Text>
                  </View>
                </>
              ) : (
                <></>
              )}
            </>
          ) : (
            <>
              <Text
                style={{
                  ...FONTS.body4,
                  color: COLORS.grey,
                }}
                textAlign={"center"}
                mt={5}
              >
                {t("pendingContent")}
              </Text>
            </>
          )}
          <Button
            w={"100%"}
            borderRadius={20}
            bgColor={COLORS.primary}
            mt={50}
            onPress={() => {
              removeValue("phoneNumber");
              removeValue("role");

              navigation.navigate("AuthenticationStack", {
                screen: "SignIn",
              });
            }}
          >
            <Text style={{ ...FONTS.h2 }} color={COLORS.white}>
              {t("back")}
            </Text>
          </Button>
          {/* </ScrollView> */}
        </VStack>
      </SafeAreaView>
    </VStack>
  );
};

export default PendingScreen;
