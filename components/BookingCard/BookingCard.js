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
import React, { useEffect, useState } from "react";
import DefaultAvt from "../../assets/image6.png";
import { COLORS, SIZES } from "../../constants/theme";
import { TouchableOpacity } from "react-native";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../config/config";
import { useTranslation } from "react-i18next";

function BookingCard(props) {
  let {
    idCustomer,
    idTrip,
    pickUpLat,
    pickUpLong,
    destLat,
    destLong,
    date,
    time,
    datePickUp,
    timePickUp,
    status,
    pickUpAddress,
    destAddress,
    idRider,
    totalPrice,
    distance,
  } = props.trip;

  const [name, setName] = useState("");
  const [licensePlates, setLicensePlates] = useState("");
  const [avt, setAvatar] = useState(null);
  const { t } = useTranslation();

  const { onPress, sta } = props;
  useEffect(() => {
    if(idRider!=null&&idRider!=""){
      getNameRider();
    }
    console.log(idRider)
    setState(sta);
  }, [idRider]);
  const getNameRider = () => {
    getDoc(doc(db, "Rider", idRider)).then((docData) => {
      if (docData.exists()) {
        setName(docData.data().displayName);
        setLicensePlates(docData.data().licensePlates);
        setAvatar(docData.data().portrait);
      }
    });
  };

  const [state, setState] = useState(0);
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
          {state === 1 ? (
            <>
            <Avatar source={{ uri: avt }} margin={"10px 0 0 10px"} />
              <VStack margin={"10px 0 0 10px"}>
                <Text bold fontSize={SIZES.h4} color={"white"}>
                  {licensePlates}
                </Text>
                <Text fontSize={SIZES.font} color={"#808080"}>
                  {name}
                </Text>
              </VStack>
            </>
          ) : (
            <>
           <Avatar source={{ }} margin={"10px 0 0 10px"} />
              <VStack margin={"10px 0 0 10px"}>
                <Text bold fontSize={SIZES.h4} color={"white"}>
                  {t("waiting")}
                </Text>
              </VStack>
            </>
          )}
        </HStack>
        <HStack space={6} marginLeft={"10px"} marginBottom={"10px"}>
          <VStack>
            <Text bold fontSize={10} color={"#808080"}>
              {t("pickUp")}
            </Text>
            <Text bold fontSize={10} color={"white"}>
            { pickUpAddress.length > 10 ? pickUpAddress.substring(0, 10) + "..." : pickUpAddress}
            </Text>
          </VStack>
          <VStack>
            <Text bold fontSize={10} color={"#808080"}>
              {t("des")}
            </Text>
            <Text bold fontSize={10} color={"white"}>
            { destAddress.length > 10 ? destAddress.substring(0, 10) + "..." : destAddress}
            </Text>
          </VStack>

          {/* <Image source={CarImg} alt="car" marginLeft={"auto"} /> */}
        </HStack>
      </TouchableOpacity>
    </View>
  );
}

export default BookingCard;
