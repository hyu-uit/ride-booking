import {
  Avatar,
  HStack,
  Text,
  Button,
  VStack,
  View,
  Image,
  Flex,
} from "native-base";
import React, { useState } from "react";
import DefaultAvt from "../../assets/image6.png";
import { COLORS, SIZES } from "../../constants/theme";
import { TouchableOpacity } from "react-native";
import {
  collection,
  doc,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../config/config";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

function StudentListCard(props, navigation) {
  let {
    role,
    phoneNumber,
    school,
    displayName,
    email,
    studentID,
    portrait,
    birthday,
  } = props.list;
  const { onPress } = props;
  const [tripCount, setTripCount] = useState("");
  const { t } = useTranslation();
  const [doneTripCount, setDoneTripCount] = useState(0);

  useEffect(() => {
    const unsubscribe = onSnapshot(
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
        let cancelCount = 0;
        snapshot.forEach((doc) => {
          doneCount++;
        });
        setDoneTripCount(doneCount);
      }
    );
    const totalUnsubscribe = onSnapshot(
      doc(db, role, phoneNumber),
      (snapshot) => {
        const docData = snapshot.data();
        setTripCount(doneTripCount + docData.cancel);
      }
    );
    return () => {
      unsubscribe();
      totalUnsubscribe();
    };
  }, [phoneNumber, role, doneTripCount]);
  //const [status, setStatus] = useState(0);
  return (
    <View
      bgColor={"#101744"}
      w={"100%"}
      h={130}
      borderRadius={20}
      shadow={3}
      marginBottom={5}
    >
      <TouchableOpacity onPress={onPress}>
        <HStack w={"full"}>
          <Avatar source={{ uri: portrait }} margin={"10px 0 0 10px"} />
          <VStack margin={"10px 0 0 10px"}>
            <Text bold fontSize={SIZES.h4} color={"white"}>
              {displayName}
            </Text>
            <Text fontSize={SIZES.font} color={"#808080"}>
              {studentID}
            </Text>
          </VStack>
        </HStack>
        <HStack space={10} marginLeft={"10px"} marginBottom={"10px"}>
          <VStack>
            <Text bold fontSize={10} color={"#808080"}>
              {t("birthday")}
            </Text>
            <Text bold fontSize={10} color={"white"}>
              {birthday}
            </Text>
          </VStack>
          <VStack>
            <Text bold fontSize={10} color={"#808080"}>
              {t("trip")}
            </Text>
            <Text bold fontSize={10} color={"white"}>
              {!tripCount ? 0 : tripCount}
            </Text>
          </VStack>

          {/* <Image source={CarImg} alt="car" marginLeft={"auto"} /> */}
        </HStack>
      </TouchableOpacity>
    </View>
  );
}

export default StudentListCard;
