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
import { getRoutingFromCoordinates } from "../../api/locationAPI";
import { removeValue } from "../../helper/asyncStorage";

function ReceivedTripCard(props) {
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
    destAddress,
    pickUpAddress,
  } = props.trip;

  const [name, setName] = useState("");
  const [stt, setState] = useState(0);
  const { navigation, isRead, setRoute } = props;

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

  const completeTrip = () => {
    navigation.replace("MainRiderNavigator", {
      screen: "HomeRider",
    });
  };

  const setStatusCancel = () => {
    removeValue("riderTripId");
    updateDoc(doc(db, "ListTrip", idTrip), {
      status: "canceled",
      isRiderCancel: true,
    });
    console.log(idRider);
    updateDoc(doc(db, "Rider", idRider), {
      cancel: increment(1),
    });
    completeTrip();
  };

  const setStatusComplete = () => {
    removeValue("riderTripId");
    updateDoc(doc(db, "ListTrip", idTrip), {
      status: "done",
    });
    completeTrip();
  };

  const setStatusStart = () => {
    updateDoc(doc(db, "ListTrip", idTrip), {
      status: "on the way",
    });
  };

  const getButtonTextDone = () => {
    if (stt === 0) {
      return "Start";
    } else if (stt === 1) {
      return "Done";
    } else {
      console.log(stt);

      setStatusComplete();
      completeTrip();
    }
  };

  const onClickStart = () => {
    if (stt === 0) {
      console.log(stt);

      getRoutingFromCoordinates(
        { latitude: pickUpLat, longitude: pickUpLong },
        { latitude: destLat, longitude: destLong }
      )
        .then((routing) => {
          const { coordinates: coordinatesRouting } = routing.geometry;
          setRoute(
            coordinatesRouting[0].map(([longitude, latitude]) => ({
              latitude,
              longitude,
            }))
          );
        })
        .catch((err) =>
          console.log(
            "🚀 ~ file: ReceivedTripCard.js:119 ~ onClickStart ~ err:",
            err
          )
        );

      setStatusStart();
      setState(1);
    } else if (stt === 1) {
      setState(2);
      console.log(stt);
    }
  };

  return (
    <View
      bgColor={COLORS.fourthary}
      w={"100%"}
      h={isRead ? 260 : 363}
      borderTopRadius={20}
      shadow={3}
      position={"absolute"}
      bottom={0}
      left={0}
      right={0}
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
          <Text style={styles.detailTextNotBold}> - You’re </Text>
          <Text style={styles.detailText}>{time}mins</Text>
          <Text style={styles.detailTextNotBold}> away</Text>
        </HStack>
      </VStack>
      <View
        bgColor={COLORS.tertiary}
        w={"100%"}
        h={isRead ? 200 : 300}
        borderTopRadius={20}
        position={"absolute"}
        bottom={0}
      >
        <VStack marginTop={4} padding={2}>
          <HStack alignItems={"center"} w={"100%"} paddingLeft={4}>
            <VStack space={5}>
              <HStack alignItems={"center"}>
                <Ionicons
                  name={"location-outline"}
                  size={20}
                  color={COLORS.white}
                />
                <Text style={styles.titleText} w={"90%"} ml={2}>
                  {pickUpAddress}
                </Text>
              </HStack>
              <HStack alignItems={"center"}>
                <Ionicons name={"pin-outline"} size={20} color={COLORS.white} />
                <Text style={styles.titleText} w={"90%"} ml={2}>
                  {destAddress}
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
            {!isRead && (
              <TouchableOpacity
                onPress={setStatusCancel}
                style={{
                  borderColor: COLORS.red,
                  height: 59,
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
                  Cancel
                </Text>
              </TouchableOpacity>
            )}
            {!isRead && (
              <TouchableOpacity
                onPress={onClickStart}
                style={{
                  borderColor: COLORS.primary,
                  backgroundColor: COLORS.primary,
                  height: 59,
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
                  {getButtonTextDone()}
                </Text>
              </TouchableOpacity>
            )}
          </HStack>
        </VStack>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  titleText: {
    color: COLORS.white,
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
export default ReceivedTripCard;
