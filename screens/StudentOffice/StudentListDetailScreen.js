import React, { useState, useEffect } from "react";
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
} from "native-base";
import { COLORS, FONTS, SIZES } from "../../constants/theme";
import { SafeAreaView } from "react-native-safe-area-context";
import ButtonBack from "../../components/Global/ButtonBack/ButtonBack";
import { Alert, Dimensions, PixelRatio, Platform } from "react-native";
import LoveIcon from "../../assets/icons8-smiling-face-with-heart-eyes-96.png";
import SmileIcon from "../../assets/icons8-slightly-smiling-face-96.png";
import DisappointedIcon from "../../assets/icons8-frowning-face-96.png";
import SelectedButton from "../../components/Button/SelectedButton";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  onSnapshot,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../../config/config";
import { useTranslation } from "react-i18next";
const StudentListDetailScreen = ({ route, navigation }) => {
  const [school, setSchool] = useState("");
  const [portrait, setPortrait] = useState(null);
  const [cardBack, setCardBack] = useState(null);
  const [cardFront, setCardFront] = useState(null);
  const [studentID, setStudentID] = useState("");
  const [email, setEmail] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [status, setStatus] = useState("");
  const [birthday, setBirthday] = useState("");
  const [doneTripCount, setDoneTripCount] = useState(0);
  const [cancelTripCount, setCancelTripCount] = useState(0);
  const [ratingList, setRatingList] = useState({});
  const [totalTripCount, setTotalTripCount] = useState(0);

  const { phoneNumber, role } = route.params;
  const contentHeight = Dimensions.get("window").height;
  const { t } = useTranslation();
  useEffect(() => {
    getUserByPhoneNumber();

    const doneUnsubscribe = onSnapshot(
      query(
        collection(db, "ListTrip"),
        where(
          role === "Customer" ? "idCustomer" : "idRider",
          "==",
          phoneNumber
        ),
        where("status", "==", "done")
      ),
      (snapshot) => {
        let doneCount = 0;
        snapshot.forEach((doc) => {
          doneCount++;
        });
        console.log(doneCount);
        setDoneTripCount(doneCount);
      }
    );

    const ratingUnsubscribe = onSnapshot(
      doc(db, role, phoneNumber),
      (snapshot) => {
        const docData = snapshot.data();
        const rating = {
          goodCount: docData.good,
          normalCount: docData.normal,
          badCount: docData.bad,
        };
        setCancelTripCount(docData.cancel);
        setTotalTripCount(doneTripCount + docData.cancel);
        setRatingList(rating);
      }
    );
    return () => {
      doneUnsubscribe();
      ratingUnsubscribe();
    };
  }, [phoneNumber, role, doneTripCount]);

  const getUserByPhoneNumber = () => {
    // setRole("Customer")
    // setPhoneNumber("0393751403")
    //getDoc(doc(db,"Customer" , "0393751403"))
    getDoc(doc(db, role, phoneNumber)).then((docSnap) => {
      if (docSnap.exists()) {
        //setRole(role)
        setCardBack(docSnap.data().cardBack);
        setCardFront(docSnap.data().cardFront);
        setDisplayName(docSnap.data().displayName);
        setEmail(docSnap.data().email);
        setBirthday(docSnap.data().birthday);
        //setPhoneNumber(docSnap.id)
        setSchool(docSnap.data().school);
        setPortrait(docSnap.data().portrait);
        setStudentID(docSnap.data().studentID);
        setStatus(docSnap.data().status);
      } else {
        console.log("No such data");
      }
    });
  };

  const width = 224;
  const height = width * 1.5;

  const IDWidth = PixelRatio.roundToNearestPixel(SIZES.width - 20);
  const IDHeight = IDWidth * (2 / 3);
  const lockAccount = () => {
    Alert.alert(t("sureLock"), "", [
      {
        text: "Cancel",
        onPress: () => {},
      },
      {
        text: "OK",
        onPress: () => {
          updateDoc(doc(db, role, phoneNumber), {
            status: "locked",
          });
          navigation.goBack();
        },
      },
    ]);
  };
  const unlockAccount = () => {
    Alert.alert(t("sureUnLock"), "", [
      {
        text: "Cancel",
        onPress: () => {},
      },
      {
        text: "OK",
        onPress: () => {
          updateDoc(doc(db, role, phoneNumber), {
            status: "active",
          });
          navigation.goBack();
        },
      },
    ]);
  };
  return (
    <VStack
      h={Platform.OS === "ios" ? contentHeight : "100%"}
      bgColor={COLORS.background}
    >
      <SafeAreaView>
        <VStack h={"100%"} mt={"17px"} paddingX={"10px"}>
          <HStack mb={2} alignItems={"center"} justifyContent={"center"}>
            <View style={{ position: "absolute", left: 0 }}>
              <ButtonBack
                onPress={() => {
                  navigation.goBack();
                }}
              ></ButtonBack>
            </View>
            <Text style={{ ...FONTS.h2, color: COLORS.white }} ml={4}>
              {t("studentInfo")}
            </Text>
          </HStack>

          <ScrollView showsVerticalScrollIndicator={false}>
            <VStack mt={8} pb={10}>
              <Text style={{ ...FONTS.h4, color: COLORS.fifthary }}>
                {t("portrait")}
              </Text>

              <View
                mt={4}
                borderRadius={10}
                w={width + "px"}
                h={height + "px"}
                bgColor={COLORS.fifthary}
                alignSelf={"center"}
              >
                <Image
                  w={width + "px"}
                  h={height + "px"}
                  alt="portrait"
                  source={{ uri: portrait }}
                ></Image>
              </View>

              <Text style={{ ...FONTS.h4, color: COLORS.fifthary }} mt={10}>
                {t("role")}
              </Text>
              <Text style={{ ...FONTS.h3, color: COLORS.white }} mt={2}>
                {role}
              </Text>
              <Text style={{ ...FONTS.h4, color: COLORS.fifthary }} mt={10}>
                {t("fullName")}
              </Text>
              <Text style={{ ...FONTS.h3, color: COLORS.white }} mt={2}>
                {displayName}
              </Text>
              <Text style={{ ...FONTS.h4, color: COLORS.fifthary }} mt={10}>
                {t("birthday")}
              </Text>
              <Text style={{ ...FONTS.h3, color: COLORS.white }} mt={2}>
                {birthday}
              </Text>
              <Text style={{ ...FONTS.h4, color: COLORS.fifthary }} mt={10}>
                {t("id")}
              </Text>
              <Text style={{ ...FONTS.h3, color: COLORS.white }} mt={2}>
                {studentID}
              </Text>
              <Text style={{ ...FONTS.h4, color: COLORS.fifthary }} mt={10}>
                {t("school")}
              </Text>
              <Text style={{ ...FONTS.h3, color: COLORS.white }} mt={2}>
                {school}
              </Text>
              <Text style={{ ...FONTS.h4, color: COLORS.fifthary }} mt={10}>
                {t("phone")}
              </Text>
              <Text style={{ ...FONTS.h3, color: COLORS.white }} mt={2}>
                {phoneNumber}
              </Text>
              <Text style={{ ...FONTS.h4, color: COLORS.fifthary }} mt={10}>
                {t("email")}
              </Text>
              <Text style={{ ...FONTS.h3, color: COLORS.white }} mt={2}>
                {email}
              </Text>

              <View
                h={IDHeight + "px"}
                w={IDWidth + "px"}
                bgColor={COLORS.fifthary}
                borderRadius={10}
                mt={10}
              >
                <Image
                  h={IDHeight + "px"}
                  w={IDWidth + "px"}
                  alt="cardFront"
                  source={{ uri: cardFront }}
                ></Image>
              </View>
              <View
                h={IDHeight + "px"}
                w={IDWidth + "px"}
                bgColor={COLORS.fifthary}
                borderRadius={10}
                mt={10}
              >
                <Image
                  h={IDHeight + "px"}
                  w={IDWidth + "px"}
                  alt="cardBack"
                  source={{ uri: cardBack }}
                ></Image>
              </View>

              <Text style={{ ...FONTS.h4, color: COLORS.fifthary }} mt={10}>
                {t("trip")}
              </Text>
              <Text style={{ ...FONTS.h3, color: COLORS.white }} mt={2}>
                {!totalTripCount ? 0 : totalTripCount}
              </Text>
              <Text style={{ ...FONTS.h4, color: COLORS.fifthary }} mt={10}>
                {t("canceled")}
              </Text>
              <Text style={{ ...FONTS.h3, color: COLORS.red }} mt={2}>
                {!cancelTripCount ? 0 : cancelTripCount}
              </Text>

              {role === "Rider" ? (
                <>
                  <Text style={{ ...FONTS.h4, color: COLORS.fifthary }} mt={10}>
                    {t("rating")}
                  </Text>
                  <HStack mt={2} justifyContent={"space-between"}>
                    <VStack justifyContent={"center"} alignItems={"center"}>
                      <Image size={70} source={LoveIcon} alt="Love" />
                      <Text style={{ ...FONTS.h3, color: COLORS.white }} mt={2}>
                        {ratingList.goodCount}
                      </Text>
                    </VStack>
                    <VStack justifyContent={"center"} alignItems={"center"}>
                      <Image size={70} source={SmileIcon} alt="Smile" />
                      <Text style={{ ...FONTS.h3, color: COLORS.white }} mt={2}>
                        {ratingList.normalCount}
                      </Text>
                    </VStack>
                    <VStack justifyContent={"center"} alignItems={"center"}>
                      <Image size={70} source={DisappointedIcon} alt="Dissa" />
                      <Text style={{ ...FONTS.h3, color: COLORS.white }} mt={2}>
                        {ratingList.badCount}
                      </Text>
                    </VStack>
                  </HStack>
                </>
              ) : (
                <></>
              )}

              {status !== "locked" ? (
                <>
                  <Button
                    w={"100%"}
                    variant={"solid"}
                    borderRadius={20}
                    style={{ backgroundColor: COLORS.red }}
                    borderColor={COLORS.red}
                    onPress={lockAccount}
                    mt={10}
                    mb={4}
                  >
                    <Text style={{ ...FONTS.h2 }} color={COLORS.white}>
                      Lock account
                    </Text>
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    w={"100%"}
                    variant={"solid"}
                    borderRadius={20}
                    style={{ backgroundColor: COLORS.primary }}
                    borderColor={COLORS.primary}
                    onPress={unlockAccount}
                    mt={10}
                    mb={4}
                  >
                    <Text style={{ ...FONTS.h2 }} color={COLORS.white}>
                      {t("unlock")}
                    </Text>
                  </Button>
                </>
              )}
            </VStack>
          </ScrollView>
        </VStack>
      </SafeAreaView>
    </VStack>
  );
};

export default StudentListDetailScreen;
