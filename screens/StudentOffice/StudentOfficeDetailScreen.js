import React, { useState, useEffect } from "react";
import {
  Avatar,
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
import { PixelRatio } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import RejectModal from "../../components/Modal/RejectModal";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../config/config";
import { Alert } from "react-native";

const StudentOfficeDetailScreen = ({ navigation, route }) => {
  // const [phoneNumber, setPhoneNumber] = useState("");
  // const [role, setRole] = useState("");
  const [school, setSchool] = useState("");
  const [portrait, setPortrait] = useState("");
  const [cardBack, setCardBack] = useState("");
  const [cardFront, setCardFront] = useState("");
  const [studentID, setStudentID] = useState("");
  const [email, setEmail] = useState("");
  const [displayName, setDisplayName] = useState("");

  const { phoneNumber, role } = route.params;
  useEffect(() => {
    getUserByPhoneNumber();
  }, []);

  const getUserByPhoneNumber = () => {
    // setRole("Customer")
    // setPhoneNumber("0393751403")
    //getDoc(doc(db,"Customer" , "0393751403"))
    let imgUrl = "";
    getDoc(doc(db, role, phoneNumber)).then((docSnap) => {
      if (docSnap.exists()) {
        //setRole(role)
        setCardBack(docSnap.data().cardBack);
        setCardFront(docSnap.data().cardFront);
        setDisplayName(docSnap.data().displayName);
        setEmail(docSnap.data().email);
        //setPhoneNumber(docSnap.id)
        imgUrl = docSnap.data().portrait;
        setSchool(docSnap.data().school);
        setStudentID(docSnap.data().studentID);
        //console.log(docSnap.data().portrait)
        imgUrl = docSnap.data().portrait;
        console.log(cardFront);
        console.log(cardBack);
      } else {
        console.log("No such data");
      }
      setPortrait(imgUrl);
    });
    console.log(imgUrl);
  };
  const width = 224;
  const height = width * 1.5;

  const IDWidth = PixelRatio.roundToNearestPixel(SIZES.width - 20);
  const IDHeight = IDWidth * (2 / 3);

  const acceptRequest = () => {
    updateDoc(doc(db, role, phoneNumber), {
      status: "active",
    });
    navigation.navigate("StudentOffice");
  };

  const rejectRequest = () => {
    deleteDoc(doc(db, role, phoneNumber));
    navigation.navigate("StudentOffice");
  };
  return (
    <VStack h={"100%"} bgColor={COLORS.background}>
      <SafeAreaView>
        <VStack h={"100%"} mt={"17px"} paddingX={"10px"}>
          <HStack mb={2} alignItems={"center"} justifyContent={"center"}>
            <View style={{ position: "absolute", left: 0 }}>
              <ButtonBack></ButtonBack>
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
                justifyContent={"center"}
              >
                <Image
                  w={width + "px"}
                  h={height + "px"}
                  alt="portrait"
                  source={{
                    uri: "https://firebasestorage.googleapis.com/v0/b/ride-booking-8d9af.appspot.com/o/0848867679face?alt=media&token=d3af0a62-3a38-4bf2-9345-a4e61c4d656f",
                  }}
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
                23/03/2002
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
                  source={{
                    uri: "https://firebasestorage.googleapis.com/v0/b/ride-booking-8d9af.appspot.com/o/0848867679front?alt=media&token=ee7995d9-a538-44a1-b98a-ff8d7f674a59",
                  }}
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
                  source={{
                    uri: "https://firebasestorage.googleapis.com/v0/b/ride-booking-8d9af.appspot.com/o/0848867679back?alt=media&token=2ef403f8-ec7a-4296-83bf-5f381514d7af",
                  }}
                ></Image>
              </View>

              <HStack justifyContent={"space-between"}>
                <Button
                  w={"48%"}
                  borderRadius={20}
                  bgColor={COLORS.primary}
                  onPress={acceptRequest}
                  mt={10}
                >
                  <Text style={{ ...FONTS.h2 }} color={COLORS.white}>
                    Accept
                  </Text>
                </Button>
                <Button
                  w={"48%"}
                  variant={"outline"}
                  borderRadius={20}
                  borderColor={COLORS.red}
                  onPress={rejectRequest}
                  mt={10}
                >
                  <Text style={{ ...FONTS.h2 }} color={COLORS.red}>
                    Reject
                  </Text>
                </Button>
              </HStack>
            </VStack>
          </ScrollView>
        </VStack>
      </SafeAreaView>
    </VStack>
  );
};

export default StudentOfficeDetailScreen;
