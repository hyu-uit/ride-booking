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

function PopUpRequestCard(props) {
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
    status,
    totalPrice,
    distance,
  } = props.trip;

  const [name, setName] = useState("");
  const [state, setState] = useState(0);
  const { navigation, phoneNumber } = props;
  const [isModalVisible, setModalVisible] = useState(false);
  const { randomTrips, setNewCurrentTrips } = props;

  useEffect(() => {
    if (!isModalVisible) {
      setModalVisible(false); // Đóng modal
    }
  }, [isModalVisible,]);
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
    const data = { idTrip: "" +idTrip, };
    navigation.navigate("TripDetail", data);
  };
  
  const setStatusReject = () => {
    // if (rejectedCount >= maxRejectCount) {
    //   setModalVisible(false); // Tắt modal và popup
    //   return;
    // }
    setModalVisible(false); // Đóng modal

    // Random một document mới
    const randomIndex = Math.floor(Math.random() * randomTrips.length);
    const randomTrip = randomTrips[randomIndex];
    
    // Cập nhật document mới vào state hoặc thực hiện xử lý khác
    setNewCurrentTrips([randomTrip]);
  };
  
  return (
    <View
      bgColor={COLORS.fourthary}
      w={"100%"}
      h={303}
      borderTopRadius={20}
      shadow={3}
      position={"absolute"}
      bottom={0}
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
              {totalPrice}
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
          <Text style={styles.detailTextNotBold}> - You’re </Text>
          <Text style={styles.detailText}>0h 15m</Text>
          <Text style={styles.detailTextNotBold}> away</Text>
        </HStack>
      </VStack>
      <View
        bgColor={COLORS.tertiary}
        w={"100%"}
        h={210}
        borderTopRadius={20}
        position={"absolute"}
        bottom={0}
      >
        <VStack marginTop={4}>
          <HStack alignItems={"center"}>
            <Image alt="location line" source={locationLineIcon}></Image>
            <VStack space={5}>
              <VStack>
                <Text style={styles.detailText}>KTX Khu B</Text>
                <Text style={styles.titleText}>
                  Pickup - KTX Khu B ĐHQG, Đông Hòa, Dĩ An, Bình Dương
                </Text>
              </VStack>
              <VStack>
                <Text style={styles.detailText}>UIT</Text>
                <Text style={styles.titleText}>
                  Destination - Trường Đại học Công nghệ Thông tin - ĐHQG TP..
                </Text>
              </VStack>
            </VStack>
          </HStack>
          <HStack
            style={{
              marginHorizontal: 26,
              marginVertical: 15,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <TouchableOpacity
              onPress={setStatusReject}
              style={{
                borderColor: COLORS.red,
                height: 59,
                width: 155,
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
            <View
              style={{
                flex: 1,
                justifyContent: "flex-end",
                alignItems: "flex-end",
              }}
            >
              <TouchableOpacity
                onPress={setStatusAccept}
                style={{
                  borderColor: COLORS.primary,
                  backgroundColor: COLORS.primary,
                  height: 59,
                  width: 155,
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
            </View>
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
export default PopUpRequestCard;
