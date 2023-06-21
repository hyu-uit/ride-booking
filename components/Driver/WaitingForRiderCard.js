import React from "react";
import {
  Center,
  Divider,
  Flex,
  HStack,
  Image,
  Text,
  VStack,
  View,
} from "native-base";
import { TouchableOpacity, StyleSheet } from "react-native";
import { COLORS, FONTS } from "../../constants/theme";
import locationLineIcon from "../../assets/location-line.png";
import { useState } from "react";
import { useEffect } from "react";
import { doc, getDoc, increment, updateDoc } from "firebase/firestore";
import { db } from "../../config/config";
import { Ionicons } from "@expo/vector-icons";

function WaitingForRiderCard(props) {
  //const {trip} = props
  let {
    idCustomer,
    idRider,
    idTrip,
    pickUpLat,
    pickUpLong,
    destLat,
    destLong,
    date,
    time,
    est,
    status,
    pickUpAddress,
    destAddress,
    totalPrice,
    distance,
  } = props.trip;

  const [name, setName] = useState("");
  const [state, setState] = useState(0);
  const { navigation, phoneNumber } = props;
  // const [modalVisible, setModalVisible] = useState(false);
  const { setIsModalVisible, setIsRiderReceived } = props;

  // useEffect(() => {
  //   if (!isModalVisible) {
  //     setModalVisible(false); // Đóng modal
  //   }

  // }, [isModalVisible]);
  if (idTrip !== undefined) {
    getDoc(doc(db, "ListTrip", idTrip)).then((tripData) => {
      if (tripData.exists()) {
        getDoc(doc(db, "Customer", tripData.data().idCustomer)).then(
          (docData) => {
            if (docData.exists()) {
              setName(docData.data().displayName);
            }
          }
        );
      }
    });
  }

  const setStatusAccept = () => {
    updateDoc(doc(db, "ListTrip", idTrip), {
      status: "accepted",
      idRider: phoneNumber,
    });
    const data = { idTrip: "" + idTrip, state: 1 };
    navigation.navigate("TripDetail", data);
    setIsRiderReceived(true)
  };

  const setStatusReject = () => {
    setIsModalVisible(false);
  };

  return (
    <View
      bgColor={COLORS.fourthary}
      w={"100%"}
      h={333}
      borderRadius={20}
      shadow={3}
    >
      <VStack paddingLeft={26} paddingRight={26}>
        <HStack marginTop={4} alignItems={"center"}>
          <HStack flex={1}>
            <Text
              color={COLORS.white}
              style={{
                ...FONTS.h4,
                fontWeight: "bold",
              }}
            >
              {name}
            </Text>
          </HStack>
          <View>
            <Text
              color={COLORS.white}
              style={{
                ...FONTS.h3,
                alignItems: "flex-end",
              }}
            >
              {parseInt(totalPrice).toLocaleString()}đ
            </Text>
          </View>
        </HStack>
        <Text
          color={COLORS.lightGrey}
          style={{
            ...FONTS.body6,
          }}
        >
          {idTrip}
        </Text>
        <HStack>
          <Text style={styles.detailText}>{distance}</Text>
          <Text style={styles.detailText}> - {est}</Text>
          <Text style={styles.detailTextNotBold}> minute(s)</Text>
        </HStack>
      </VStack>
      <View
        bgColor={COLORS.tertiary}
        w={"100%"}
        borderRadius={20}
        position={"absolute"}
        bottom={0}
      >
        <VStack marginTop={4} padding={2}>
          <HStack alignItems={"center"} w={"100%"}>
            <VStack space={5}>
              <HStack alignItems={"center"} w={"100%"}>
                <Ionicons
                  name={"location-outline"}
                  size={20}
                  color={COLORS.white}
                />
                <Text
                  style={styles.titleText}
                  w={"90%"}
                  bgColor={COLORS.red}
                  ml={3}
                >
                  {pickUpAddress}
                </Text>
              </HStack>
              <HStack alignItems={"center"}>
                <Ionicons name={"pin-outline"} size={20} color={COLORS.white} />
                <Text style={styles.titleText} w={"90%"} ml={3}>
                  Destination - {destAddress}
                </Text>
              </HStack>
            </VStack>
          </HStack>
          <HStack
            style={{
              marginHorizontal: 26,
              marginVertical: 15,
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <TouchableOpacity
              onPress={setStatusReject}
              style={{
                borderColor: COLORS.red,
                height: 50,
                // maxWidth: "50%",
                width: "45%",
                borderWidth: 1,
                borderRadius: 20,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                bold
                color={COLORS.red}
                fontSize={20}
                styles={{ ...FONTS.h3 }}
              >
                Reject
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={setStatusAccept}
              style={{
                borderColor: COLORS.primary,
                backgroundColor: COLORS.primary,
                height: 50,
                width: "45%",
                borderWidth: 1,
                borderRadius: 20,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                bold
                color={COLORS.white}
                fontSize={20}
                styles={{ ...FONTS.h3 }}
              >
                Accept
              </Text>
            </TouchableOpacity>
          </HStack>
        </VStack>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  titleText: {
    color: COLORS.grey,
    ...FONTS.body6,
  },
  detailText: {
    color: COLORS.white,
    ...FONTS.body6,
    fontWeight: "bold",
  },
  detailTextNotBold: {
    color: COLORS.white,
    ...FONTS.body6,
  },
});
export default WaitingForRiderCard;
