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
import { getFromAsyncStorage } from "../../helper/asyncStorage";

const PendingScreen = ({ navigation }) => {
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
        <VStack h={"100%"} mt={"17px"} paddingX={"10px"} alignItems={"center"}>
          <ScrollView>
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
              PENDING
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
                  Your account has been rejected{"\n"}please check reasons below
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
                        Full name
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
                        Birthday
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
                        Student ID Number
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
                        Student ID Card (front)
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
                        Student ID Card (back)
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
                        Portrait picture
                      </Text>
                    </>
                  ) : (
                    <></>
                  )}
                </Wrap>
                {moreInfo ? (
                  <>
                    <View
                      bgColor={COLORS.tertiary}
                      borderRadius={20}
                      mt={5}
                      padding={5}
                    >
                      <Text style={{ ...FONTS.h4, color: COLORS.grey }}>
                        More information:
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
                  Your account is being approved by Student Office{"\n"}Please
                  wait until receiving a notification by SMS
                </Text>
              </>
            )}
            <Button
              w={"100%"}
              borderRadius={20}
              bgColor={COLORS.primary}
              mt={50}
              onPress={() =>
                navigation.navigate("AuthenticationStack", {
                  screen: "SignIn",
                })
              }
            >
              <Text style={{ ...FONTS.h2 }} color={COLORS.white}>
                Go back
              </Text>
            </Button>
          </ScrollView>
        </VStack>
      </SafeAreaView>
    </VStack>
  );
};

export default PendingScreen;
