import {
  Box,
  Button,
  Center,
  Divider,
  HStack,
  Image,
  Spinner,
  Text,
  VStack,
  View,
} from "native-base";
import React, { useContext } from "react";
import LineImg from "../../assets/Line4.png";
import LocationIcon from "../../assets/icons/icons8-location-48.png";
import ArrowDownIcon from "../../assets/icons/icons8-down-arrow-48.png";
import { SIZES } from "../../constants/theme";
import { useTranslation } from "react-i18next";
import { isNullOrEmpty } from "../../helper/helper";
import { BookingContext } from "../../context/BookingContext";
import { collection, deleteDoc, doc, onSnapshot, query, where } from "firebase/firestore";
import { useState } from "react";
import { useEffect } from "react";
import { db } from "../../config/config";
import { Alert } from "react-native";

const LocationCardFinder = ({ onPressCancel, phoneNumber, navigation }) => {
  const { t } = useTranslation();
  const { booking } = useContext(BookingContext);
  const [tripDetail, setTripDetail] = useState([]);
  const [timer, setTimer] = useState(null);
  const [isScheduled, setIsScheduled] = useState(null);

  console.log(isScheduled)
  useEffect(() => {
    // Start the timer when the component mounts
    const timerId = setTimeout(() => {
      if (isScheduled  === "false"&& (tripDetail!=[])) {
      Alert.alert(
        "Riders seem busy now",
        "Please try again.",
        [
          {
            text: "OK",
            onPress: () => {
              deleteDoc(doc(db, "ListTrip", booking.bookingDetails.idTrip));
              navigation.navigate("Home");
            },
          },
        ],
        { cancelable: false }
      );
      }
    }, 60000); // 3 minutes
    // Clear the timer when the component unmounts
    return () => {
      clearTimeout(timerId);
    };
  }, [isScheduled]);

  useEffect(() => {
    // Clear the timer if updatedTrip.length > 0
    if (tripDetail.length > 0) {
      clearTimeout(timer);
    }
  }, [tripDetail]);

  useEffect(() => {
    
    // to ensure that when user switch from choose date to now that now still get current date
    console.log("finder use effectcall: ", booking.bookingDetails.idTrip);
    if (
      booking.bookingDetails.idTrip != null ||
      booking.bookingDetails.idTrip != ""
    ) {
      onRiderFound();
    }
  }, [phoneNumber, navigation, booking.bookingDetails.idTrip]);

  const onRiderFound = () => {
    // const findRiderQuery = query(
    //   collection(db, "ListTrip"),
    //   // where("isScheduled", "==", "false"),
    //   where("status", "==", "accepted"),
    //   where("idCustomer", "==", phoneNumber)
    // );
    const unsubscribeTrip = onSnapshot(
      doc(db, "ListTrip", booking.bookingDetails.idTrip),
      (querySnapshot) => {
        const updatedTrip = [];
        
        const docData = querySnapshot.data();
        if(docData ){
          setIsScheduled(docData.isScheduled)
          if(docData.status=="accepted"){
            const trip = {
              idTrip: booking.bookingDetails.idTrip,
              ...docData,
            };
            updatedTrip.push(trip);
            setTripDetail(updatedTrip);
            console.log(updatedTrip[0].idTrip)
            if (updatedTrip.length > 0) {
              const data = {
                idRider: updatedTrip[0].idRider,
                idTrip: updatedTrip[0].idTrip,
              };
              navigation.navigate("BookingDriver", data);
            }
          }
        }
      },
      (error)=>{
        console.log("Error fetching trip data:", error);
      }
    );
    return () => {
      unsubscribeTrip();
    };
  };
  return (
    <View
      bgColor={"#0B0F2F"}
      w={"100%"}
      borderTopRadius={20}
      shadow={3}
      position={"absolute"}
      bottom={0}
      padding={"30px 25px 0 25px"}
    >
      <VStack space={3}>
        <Text fontSize={SIZES.h3} bold color={"white"}>
          {t("findingRider")}
        </Text>
        <HStack w={"100%"}>
          <VStack space={2} width={"90%"}>
            <VStack space={1}>
              <Text bold fontSize={SIZES.h6} color={"#8CC3FF"}>
                {t("pickUp")}
              </Text>
              <Text bold fontSize={SIZES.h6} color={"white"}>
                {isNullOrEmpty(booking.pickUpLocation.address)
                  ? booking.pickUpLocation.address
                  : booking.pickUpLocation.name}
              </Text>
            </VStack>
            <Divider />
            <VStack space={1}>
              <Text bold fontSize={SIZES.h6} color={"#8CC3FF"}>
                {t("des")}
              </Text>
              <Text bold fontSize={SIZES.h6} color={"white"}>
                {isNullOrEmpty(booking.destinationLocation.address)
                  ? booking.destinationLocation.address
                  : booking.destinationLocation.name}
              </Text>
            </VStack>
          </VStack>
          <Center marginLeft={"auto"}>
            <Center
              borderRadius={50}
              width={"25px"}
              height={"25px"}
              bgColor={"black"}
              marginBottom={2}
            >
              <Image
                width={"20px"}
                height={"20px"}
                source={ArrowDownIcon}
                alt=""
              />
            </Center>
            <Image source={LineImg} alt="" marginBottom={2} />
            <Image
              width={"20px"}
              height={"20px"}
              source={LocationIcon}
              alt=""
            />
          </Center>
        </HStack>
        <Divider bgColor={"#125CAE"} />
        <Text fontSize={SIZES.h3} bold color={"white"}>
          {t("detail")}
        </Text>
        <Center h={"40px"}>
          <HStack space={2}>
            <Spinner size="lg" />
            <Text fontSize={SIZES.h4} bold color={"white"}>
              {t("findingRider")}
            </Text>
          </HStack>
        </Center>
        <HStack>
          <Button
            bgColor={"#3D5AF8"}
            w={"100%"}
            borderRadius={"20px"}
            onTouchEnd={onPressCancel}
          >
            <Text color={"white"} bold fontSize={SIZES.small}>
              {t("cancel")}
            </Text>
          </Button>
        </HStack>
      </VStack>
    </View>
  );
};

export default LocationCardFinder;
