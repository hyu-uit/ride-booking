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
import { Alert, PixelRatio } from "react-native";
import LoveIcon from "../../assets/icons8-smiling-face-with-heart-eyes-96.png";
import SmileIcon from "../../assets/icons8-slightly-smiling-face-96.png";
import DisappointedIcon from "../../assets/icons8-frowning-face-96.png";
import SelectedButton from "../../components/Button/SelectedButton";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../config/config";
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
  const { phoneNumber, role } = route.params;
  const contentHeight = Dimensions.get("window").height;
  useEffect(() => {
    getUserByPhoneNumber();
  }, []);

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
    Alert.alert("Are you sure you want to lock this account?", "", [
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
    Alert.alert("Are you sure you want to unlock this account?", "", [
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
    <VStack h={contentHeight} bgColor={COLORS.background}>
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
              Student Information
            </Text>
          </HStack>

          <ScrollView showsVerticalScrollIndicator={false}>
            <VStack mt={8} pb={10}>
              <Text style={{ ...FONTS.h4, color: COLORS.fifthary }}>
                Portrait picture
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
                Role
              </Text>
              <Text style={{ ...FONTS.h3, color: COLORS.white }} mt={2}>
                {role}
              </Text>
              <Text style={{ ...FONTS.h4, color: COLORS.fifthary }} mt={10}>
                Full name
              </Text>
              <Text style={{ ...FONTS.h3, color: COLORS.white }} mt={2}>
                {displayName}
              </Text>
              <Text style={{ ...FONTS.h4, color: COLORS.fifthary }} mt={10}>
                Birthday
              </Text>
              <Text style={{ ...FONTS.h3, color: COLORS.white }} mt={2}>
                {birthday}
              </Text>
              <Text style={{ ...FONTS.h4, color: COLORS.fifthary }} mt={10}>
                Student ID
              </Text>
              <Text style={{ ...FONTS.h3, color: COLORS.white }} mt={2}>
                {studentID}
              </Text>
              <Text style={{ ...FONTS.h4, color: COLORS.fifthary }} mt={10}>
                School
              </Text>
              <Text style={{ ...FONTS.h3, color: COLORS.white }} mt={2}>
                {school}
              </Text>
              <Text style={{ ...FONTS.h4, color: COLORS.fifthary }} mt={10}>
                Phone number
              </Text>
              <Text style={{ ...FONTS.h3, color: COLORS.white }} mt={2}>
                {phoneNumber}
              </Text>
              <Text style={{ ...FONTS.h4, color: COLORS.fifthary }} mt={10}>
                Email Address
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
                Trip
              </Text>
              <Text style={{ ...FONTS.h3, color: COLORS.white }} mt={2}>
                20
              </Text>
              <Text style={{ ...FONTS.h4, color: COLORS.fifthary }} mt={10}>
                Cancel
              </Text>
              <Text style={{ ...FONTS.h3, color: COLORS.red }} mt={2}>
                20
              </Text>

              {role === "Rider" ? (
                <>
                  <Text style={{ ...FONTS.h4, color: COLORS.fifthary }} mt={10}>
                    Rating
                  </Text>
                  <HStack mt={2} justifyContent={"space-between"}>
                    <VStack justifyContent={"center"} alignItems={"center"}>
                      <Image size={70} source={LoveIcon} alt="Love" />
                      <Text style={{ ...FONTS.h3, color: COLORS.white }} mt={2}>
                        20
                      </Text>
                    </VStack>
                    <VStack justifyContent={"center"} alignItems={"center"}>
                      <Image size={70} source={SmileIcon} alt="Smile" />
                      <Text style={{ ...FONTS.h3, color: COLORS.white }} mt={2}>
                        20
                      </Text>
                    </VStack>
                    <VStack justifyContent={"center"} alignItems={"center"}>
                      <Image size={70} source={DisappointedIcon} alt="Dissa" />
                      <Text style={{ ...FONTS.h3, color: COLORS.white }} mt={2}>
                        20
                      </Text>
                    </VStack>
                  </HStack>

                  <HStack justifyContent={"space-between"} space={2}>
                    <SelectedButton
                      text={"Friendly (5)"}
                      isSelected={false}
                    ></SelectedButton>
                    <SelectedButton
                      text={"Friendly (5)"}
                      isSelected={false}
                    ></SelectedButton>
                    <SelectedButton
                      text={"Friendly (5)"}
                      isSelected={false}
                    ></SelectedButton>
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
                  >
                    <Text style={{ ...FONTS.h2 }} color={COLORS.white}>
                      Unlock account
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
