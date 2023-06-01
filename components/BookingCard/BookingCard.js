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

function BookingCard (props){
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
    idRider,
    totalPrice,
    distance
  } = props.trip

 const [name, setName] = useState("")
 const [licensePlates, setLicensePlates] = useState("")
 const [avt, setAvatar] = useState(null)

  const {onPress, sta}=props
  useEffect(() => {
    getNameRider();
    setState(sta);
  }, []);
  const getNameRider=()=>{
    getDoc(doc(db,"Rider",idRider)).then(docData=>{
      if(docData.exists()){
        setName(docData.data().displayName)
        setLicensePlates(docData.data().licensePlates)
        setAvatar(docData.data().portrait)
      }
    })
  }

  const [state, setState] = useState(0);
  return (
    <View
      bgColor={"#101744"}
      w={"100%"}
      h={130}
      borderRadius={20}
      shadow={3}
      marginBottom={5}
      onTouchEnd={onPress}
    >
      <HStack w={"full"}>
        <Avatar source={{uri:avt}} margin={"10px 0 0 10px"} />
        {state === 1 ? (
          <>
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
            <VStack margin={"10px 0 0 10px"}>
              <Text bold fontSize={SIZES.h4} color={"white"}>
                Waiting for rider
              </Text>
            </VStack>
          </>
        )}
      </HStack>
      <HStack space={6} marginLeft={"10px"} marginBottom={"10px"}>
        <VStack>
          <Text bold fontSize={10} color={"#808080"}>
            Pick-up
          </Text>
          <Text bold fontSize={10} color={"white"}>
            Long An
          </Text>
        </VStack>
        <VStack>
          <Text bold fontSize={10} color={"#808080"}>
            Destination
          </Text>
          <Text bold fontSize={10} color={"white"}>
            DH CNTT
          </Text>
        </VStack>

        {/* <Image source={CarImg} alt="car" marginLeft={"auto"} /> */}
      </HStack>
    </View>
  );
};

export default BookingCard;
