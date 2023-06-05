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
import { collection, doc, getDocs, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../../config/config";
import { useEffect } from "react";

function StudentListCard(props, navigation) {
  let { role, phoneNumber, school, displayName, email, studentID, portrait,birthday } =
    props.list;
  const { onPress } = props;
  const [tripCount, setTripCount] = useState("");

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(
        collection(db, "ListTrip"),
        where(role === "Customer" ? "idCustomer" : "idRider", "==", phoneNumber),
        where("status", "in", ["done", "canceled"])
      ),
      (snapshot) => {
        let doneCount = 0;
        let cancelCount = 0;
        snapshot.forEach((doc) => {
          const status = doc.data().status;
          if (status === "done") {
            doneCount++;
          } else if (status === "canceled") {
            cancelCount++;
          }
        });

        const totalCount = doneCount + cancelCount;
        setTripCount(totalCount);
      }
    );

    return () => {
      unsubscribe();
    };
  }, [phoneNumber, role]);
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
              Birthday
            </Text>
            <Text bold fontSize={10} color={"white"}>
              {birthday}
            </Text>
          </VStack>
          <VStack>
            <Text bold fontSize={10} color={"#808080"}>
              Trip
            </Text>
            <Text bold fontSize={10} color={"white"}>
              {tripCount}
            </Text>
          </VStack>

          {/* <Image source={CarImg} alt="car" marginLeft={"auto"} /> */}
        </HStack>
      </TouchableOpacity>
    </View>
  );
}

export default StudentListCard;
