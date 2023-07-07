import styled from "styled-components";
import { FONTS, COLORS, SIZES } from "../constants";
import {
  Avatar,
  Button,
  Center,
  FlatList,
  HStack,
  Icon,
  Image,
  Input,
  ScrollView,
  Text,
  VStack,
  View,
} from "native-base";
import DefaultAvt from "../assets/image6.png";
import { SafeAreaView } from "react-native-safe-area-context";
import MenuIcon from "../assets/icons/icons8-menu-48.png";
import {
  TouchableOpacity,
  BackHandler,
  ToastAndroid,
  Platform,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import SelectedButton from "../components/Button/SelectedButton";
import HistoryCard from "../components/HistoryCard";
import BikeImg from "../assets/images/motorcycle_1.png";
import DeliveryImg from "../assets/images/delivery_1.png";
import { TouchableWithoutFeedback } from "react-native";
import { Keyboard } from "react-native";
import LottieView from "lottie-react-native";
import { useContext, useEffect } from "react";
import { getFromAsyncStorage } from "../helper/asyncStorage";
import React, { useState } from "react";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { db } from "../config/config";
import { useFocusEffect } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import {
  BookingContext,
  SET_BOOKING_DETAILS,
  SET_PICK_UP_LOCATION,
  bookingDefaultValue,
} from "../context/BookingContext";
import { getLocation } from "../helper/location";
import VNUHCM from "../assets/images/banner.png";
import { useRef } from "react";

export default function Home({ navigation, route }) {
  const { dispatch } = useContext(BookingContext);
  const [phone, setPhone] = useState("");
  const [historyTrips, setHistoryTrips] = useState([]);
  const [name, SetName] = useState(null);
  const [avt, SetAvatar] = useState(null);
  const { t } = useTranslation();
  const [bikeUri, setBikeUri] = useState(
    "https://res.cloudinary.com/dtutrxnyl/image/upload/v1686364990/bikeWhite_vqyjm3.png"
  );
  const [deliveryUri, setDeliveryUri] = useState(
    "https://res.cloudinary.com/dtutrxnyl/image/upload/v1686364992/deliveryBlue_ztlpxb.png"
  );

  let backButtonPressedOnce = false;

  const { height } = Dimensions.get("window");
  const bottomBarHeight = Platform.OS === "ios" ? 90 : 60;
  const adjustedHeight = height - bottomBarHeight;

  const animation = useRef(null);

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        if (backButtonPressedOnce) {
          BackHandler.exitApp();
        } else {
          backButtonPressedOnce = true;
          ToastAndroid.show("Press back again to exit", ToastAndroid.SHORT);
          setTimeout(() => {
            backButtonPressedOnce = false;
          }, 2000); // Reset the variable after 2 seconds
        }
        return true;
      };

      BackHandler.addEventListener("hardwareBackPress", onBackPress);

      return () =>
        BackHandler.removeEventListener("hardwareBackPress", onBackPress);
    }, [])
  );

  useEffect(() => {
    fetchDataAndPhoneNumber();
    getLocation().then(({ latitude, longitude }) => {
      dispatch({
        type: SET_PICK_UP_LOCATION,
        payload: {
          name: "Your location",
          latitude,
          longitude,
        },
      });
    });
    dispatch({ type: SET_BOOKING_DETAILS, payload: bookingDefaultValue });
  }, [phone]);

  const fetchDataAndPhoneNumber = async () => {
    try {
      const phoneNumberValue = await getFromAsyncStorage("phoneNumber");
      setPhone(phoneNumberValue);

      if (phoneNumberValue) {
        fetchData(phoneNumberValue);
        getHistoryTrips(phoneNumberValue);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const fetchData = async (phoneNumber) => {
    try {
      const unsubscribe = onSnapshot(
        doc(db, "Customer", phoneNumber),
        (docSnapshot) => {
          const docData = docSnapshot.data();
          SetName(docData.displayName);
          SetAvatar(docData.portrait);
        }
      );
      return () => {
        unsubscribe();
      };
    } catch (error) {
      console.error(error);
    }
  };
  //const {phoneNumber, role} = route.params;
  const getHistoryTrips = () => {
    const querySnapshot = query(
      collection(db, "ListTrip"),
      where("status", "==", "done"),
      where("isScheduled", "==", "false"),
      where("idCustomer", "==", phone)
    );
    const unsubscribe = onSnapshot(querySnapshot, (snapshot) => {
      let historyTrips = [];
      snapshot.forEach((doc) => {
        historyTrips.push({
          idCustomer: doc.data().idCustomer,
          idTrip: doc.id,
          pickUpLat: doc.data().pickUpLat,
          pickUpLong: doc.data().pickUpLong,
          destLat: doc.data().destLat,
          destLong: doc.data().destLong,
          date: doc.data().date,
          time: doc.data().time,
          datePickUp: doc.data().datePickUp,
          timePickUp: doc.data().timePickUp,
          pickUpAddress: doc.data().pickUpAddress,
          destAddress: doc.data().destAddress,
          totalPrice: doc.data().totalPrice,
          distance: doc.data().distance,
          idRider: doc.data().idRider,
        });
      });
      setHistoryTrips(historyTrips);
    });
    return () => {
      unsubscribe();
    };
  };
  console.log(historyTrips);

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      <HomeContainer>
        <HStack w={"full"} alignContent={"center"}>
          <Avatar source={{ uri: avt }} margin={"10px 0 0 10px"} />
          <VStack margin={"10px 0 0 10px"}>
            <Text fontSize={10} color={COLORS.grey}>
              {t("welcome")}
            </Text>
            <Text fontSize={SIZES.h4} color={COLORS.white} bold>
              {name}
            </Text>
          </VStack>
          <MenuButton
            onPress={() => {
              navigation.navigate("Menu");
            }}
          >
            <Center h={"100%"}>
              <Image w={"25px"} h={"25px"} source={MenuIcon} alt="menu icon" />
            </Center>
          </MenuButton>
        </HStack>
        <HStack>
          <ScrollView
            nestedScrollEnabled={false}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ minHeight: adjustedHeight }}
          >
            <HStack
              w={"100%"}
              borderRadius={10}
              bgColor={COLORS.tertiary}
              borderWidth={0}
              h={"50px"}
              mb={3}
              mt={8}
              alignItems={"center"}
              onTouchEnd={() => {
                navigation.navigate("Booking");
              }}
            >
              <Icon
                ml="2"
                size="4"
                color={COLORS.white}
                as={<Ionicons name="ios-search" />}
              />
              <Text
                style={{ ...FONTS.body3, color: COLORS.grey, marginLeft: 10 }}
              >
                {t("enterDes")}
              </Text>
            </HStack>
            <Image
              bgColor={COLORS.red}
              source={VNUHCM}
              h={120}
              w={"100%"}
              alt="vnuhcm"
              resizeMode="cover"
              borderRadius={10}
              mb={2}
            ></Image>
            {/* <HStack
              marginTop={5}
              marginBottom={5}
              space={3}
              alignSelf={"flex-start"}
            >
              <SelectedButton text={"Home"} />
              <SelectedButton text={"School"} />
              <SelectedButton text={"Hotel"} />
            </HStack> */}
            <HStack
              w={"100%"}
              justifyContent={"space-between"}
              marginBottom={5}
            >
              <TouchableOpacity
                style={{
                  width: "30%",
                  aspectRatio: 1,
                  backgroundColor: COLORS.white,
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 22,
                }}
                onPress={() => {
                  navigation.navigate("Booking");
                }}
              >
                <VStack
                  w={"100%"}
                  h={"100%"}
                  alignItems={"center"}
                  justifyContent={"center"}
                >
                  <Ionicons
                    name="location"
                    size={40}
                    color={COLORS.red}
                  ></Ionicons>
                  <Text mt={1} style={{ ...FONTS.h3 }}>
                    New Trip
                  </Text>
                </VStack>
              </TouchableOpacity>
              <View w={"65%"} bgColor={"#f7c846"} style={{ borderRadius: 22 }}>
                <VStack>
                  <Text
                    style={{
                      ...FONTS.h3,
                      marginTop: 15,
                      marginLeft: 10,
                      color: COLORS.black,
                    }}
                  >
                    Safety
                  </Text>
                  <Text
                    style={{
                      ...FONTS.body6,
                      fontSize: 10,
                      marginTop: 3,
                      marginLeft: 10,
                      color: COLORS.grey,
                    }}
                  >
                    VNU's Censored riders
                  </Text>
                </VStack>
                <LottieView
                  autoPlay
                  ref={animation}
                  style={{
                    position: "absolute",
                    right: 0,
                    bottom: 0,
                    aspectRatio: 1,
                    height: "100%",
                    backgroundColor: "transparent",
                  }}
                  // Find more Lottie files at https://lottiefiles.com/featured
                  source={require("../assets/lottie/riding_bear.json")}
                />
              </View>
              {/* <TouchableOpacity
                onPress={() => {
                  const data = { phoneNumber: "0393751403" };
                  navigation.navigate("Booking", data);
                }}
                style={{ width: "100%" }}
              >
                <VStack
                  borderColor={"white"}
                  borderWidth={1}
                  borderRadius={SIZES.radius10}
                  w={"100%"}
                >
                  <Center
                    w={"100%"}
                    h={"120px"}
                    bgColor={COLORS.fourthary}
                    borderTopRadius={SIZES.radius10}
                  >
                    <HStack
                      h={"100%"}
                      w={"100%"}
                      justifyContent={"center"}
                      alignItems={"center"}
                    >
                      <Image
                        source={{ uri: bikeUri }}
                        style={{ aspectRatio: 1 }}
                        h={"80%"}
                        resizeMode="contain"
                        alt="bike"
                      />
                      <Text style={{ ...FONTS.h1, color: COLORS.white }}>
                        LET'S GO
                      </Text>
                    </HStack>
                  </Center>
                  <Center h={50}>
                    <Text fontSize={SIZES.h4} bold color={"white"}>
                      UniGo: Your Reliable Ride Companion!
                    </Text>
                  </Center>
                </VStack>
              </TouchableOpacity> */}
              {/* <TouchableOpacity
                onPress={() => {
                  navigation.navigate("Booking");
                }}
              >
                <VStack
                  borderColor={"white"}
                  borderWidth={1}
                  borderRadius={SIZES.radius10}
                >
                  <Center
                    w={"150px"}
                    h={"120px"}
                    bgColor={COLORS.white}
                    borderTopRadius={SIZES.radius10}
                  >
                    <Image
                      source={{ uri: deliveryUri }}
                      w={"100%"}
                      h={"100%"}
                      resizeMode="contain"
                      alt="delivery"
                    />
                  </Center>
                  <Center h={50}>
                    <Text fontSize={SIZES.h4} bold color={"white"}>
                      SEND
                    </Text>
                  </Center>
                </VStack>
              </TouchableOpacity> */}
            </HStack>
            <Text
              fontSize={SIZES.h4}
              bold
              color={"white"}
              alignSelf={"flex-start"}
              marginBottom={3}
            >
              {t("lastBooking")}
            </Text>
            <VStack w={"100%"}>
              {/* <HistoryCard
                onPress={() => {
                  navigation.navigate("ActivityDetail");
                }}
              /> */}
              <FlatList
                // padding={"10px"}
                mt={2}
                // mb={10}
                horizontal={false}
                data={historyTrips}
                keyExtractor={(item) => item.idTrip}
                renderItem={({ item }) => (
                  <HistoryCard
                    onPress={() => {
                      const data = {
                        idTrip: "" + item.idTrip,
                        idRider: "" + item.idRider,
                      };
                      navigation.navigate("ActivityDetail", data);
                    }}
                    trip={item}
                    key={item.idTrip}
                  ></HistoryCard>
                )}
              ></FlatList>
            </VStack>
          </ScrollView>
        </HStack>
      </HomeContainer>
    </TouchableWithoutFeedback>
  );
}

const MenuButton = styled(TouchableOpacity)`
  width: 45px;
  height: 45px;
  border-radius: 30px;
  border-color: ${(props) => COLORS.tertiary};
  border-width: 2px;
  margin-left: auto;
  align-self: center;
`;

const HomeContainer = styled(SafeAreaView)`
  flex: 1;
  background-color: ${(props) => COLORS.background};
  padding: 0px 10px 0 10px;
  align-items: center;
  /* overflow: scroll; */
`;
