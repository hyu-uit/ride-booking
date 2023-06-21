import { View, Text, Dimensions, Alert } from "react-native";
import React from "react";
import {
  Button,
  HStack,
  Image,
  NativeBaseProvider,
  ScrollView,
  VStack,
} from "native-base";
import { SafeAreaView } from "react-native-safe-area-context";
import { SIZES, COLORS, FONTS } from "../../../constants/theme";
import ButtonBack from "../../../components/Global/ButtonBack/ButtonBack";
import Icon from "react-native-vector-icons/FontAwesome";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { useEffect } from "react";
import {
  deleteDoc,
  doc,
  getDoc,
  increment,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../../config/config";
import { useTranslation } from "react-i18next";
import { Platform } from "react-native";
import MapView, { Marker } from "react-native-maps";

const ActivityDetailScreen = ({ navigation, route }) => {
  const { idTrip, idRider } = route.params;
  const [tripData, setTrip] = useState([]);
  const contentHeight = Dimensions.get("window").height;
  const { t } = useTranslation();

  console.log(tripData.status);
  // const API_KEY = "AIzaSyDEokOCthVrnmMPiI_fLEZKQtV1SjFvjxQ";
  // const API_KEY = "AIzaSyA_suPUj4xs62VSz5pbRPQ1R-9Bk9Nh6dY";
  // const API_KEY = "AIzaSyAeoFwgal1syynMHwIR8zBa770UPiaFLFw";
  useEffect(() => {
    if (idRider != null && idRider != "") {
      getTripHasRider();
    } else {
      getTrip();
    }
  }, [idTrip, idRider]);
  const getTripHasRider = () => {
    let data = {};
    getDoc(doc(db, "ListTrip", idTrip)).then((tripData) => {
      console.log(
        "🚀 ~ file: ActivityDetailScreen.js:41 ~ getDoc ~ tripData.data():",
        tripData.data()
      );
      if (tripData.exists()) {
        getDoc(doc(db, "Rider", idRider)).then((docData) => {
          console.log(
            "🚀 ~ file: ActivityDetailScreen.js:45 ~ getDoc ~ docData.data():",
            docData.data()
          );
          if (docData.exists()) {
            data = {
              idCustomer: tripData.data().idCustomer,
              idTrip: tripData.id,
              pickUpLat: parseFloat(tripData.data().pickUpLat),
              pickUpLong: parseFloat(tripData.data().pickUpLong),
              destLat: parseFloat(tripData.data().destLat),
              destLong: parseFloat(tripData.data().destLong),
              date: tripData.data().date,
              portrait: docData.data().portrait,
              time: tripData.data().time,
              totalPrice: tripData.data().totalPrice,
              distance: tripData.data().distance,
              licensePlates: docData.data().licensePlates,
              transportType: docData.data().transportType,
              displayName: docData.data().displayName,
              school: docData.data().school,
              destAddress: tripData.data().destAddress,
              pickUpAddress: tripData.data().pickUpAddress,
              status: tripData.data().status,
            };

            setTrip(data);
          }
        });
      }
    });
  };
  const getTrip = () => {
    let data = {};
    const tripDocRef = doc(db, "ListTrip", idTrip);

    const unsubscribe = onSnapshot(tripDocRef, (tripData) => {
      console.log(
        "🚀 ~ file: ActivityDetailScreen.js:41 ~ onSnapshot ~ tripData.data():",
        tripData.data()
      );
      if (tripData.exists()) {
        data = {
          idCustomer: tripData.data().idCustomer,
          idRider: tripData.data().idRider,
          idTrip: tripData.id,
          pickUpLat: parseFloat(tripData.data().pickUpLat),
          pickUpLong: parseFloat(tripData.data().pickUpLong),
          destLat: parseFloat(tripData.data().destLat),
          destLong: parseFloat(tripData.data().destLong),
          date: tripData.data().date,
          time: tripData.data().time,
          totalPrice: tripData.data().totalPrice,
          distance: tripData.data().distance,
          destAddress: tripData.data().destAddress,
          pickUpAddress: tripData.data().pickUpAddress,
          status: tripData.data().status,
        };
        setTrip(data);
      }
    });
    // Clean up the snapshot listener when the component unmounts or idTrip changes
    return () => {
      unsubscribe();
    };
  };
  const onPressCancel = () => {
    if (tripData.status === "waiting") {
      Alert.alert("Are you want to cancel this trip?", "", [
        {
          text: "Cancel",
          onPress: () => {
            // props.onPressDelete(phoneNumber);
          },
        },
        {
          text: "OK",
          onPress: () => {
            deleteDoc(doc(db, "ListTrip", idTrip));
            navigation.goBack();
          },
        },
      ]);
    } else if (tripData.status === "accepted") {
      Alert.alert("Are you want to cancel this trip?", "", [
        {
          text: "Cancel",
          onPress: () => {
            // props.onPressDelete(phoneNumber);
          },
        },
        {
          text: "OK",
          onPress: () => {
            updateDoc(doc(db, "ListTrip", idTrip), {
              status: "canceled",
            });
            updateDoc(doc(db, "Customer", tripData.idCustomer), {
              cancel: increment(1),
            });
            navigation.goBack();
          },
        },
      ]);
    } else {
      Alert.alert("Are you want to cancel this trip?", "", [
        {
          text: "Cancel",
          onPress: () => {
            // props.onPressDelete(phoneNumber);
          },
        },
        {
          text: "OK",
          onPress: () => {
            navigation.navigate("Booking");
          },
        },
      ]);
    }
  };
  return (
    <VStack h={"100%"} bgColor={COLORS.background}>
      <SafeAreaView style={{ flex: 1 }}>
        <VStack
          h={Platform.OS === "ios" ? contentHeight : "100%"}
          paddingY={"20px"}
          bgColor={COLORS.background}
          paddingX={"10px"}
        >
          <HStack justifyContent={"center"} mb={"20px"}>
            <View style={{ position: "absolute", left: 0 }}>
              <ButtonBack
                onPress={() => {
                  navigation.goBack();
                }}
              ></ButtonBack>
            </View>
            <Text style={{ ...FONTS.h2, color: COLORS.white }}>
              {t("detail")}
            </Text>
          </HStack>
          <ScrollView showsVerticalScrollIndicator={false}>
            {tripData.destLat &&
            tripData.pickUpLat &&
            tripData.destLong &&
            tripData.pickUpLong ? (
              <MapView
                provider="google"
                style={{ width: "100%", height: 250, borderRadius: 20 }}
                region={{
                  latitudeDelta: 0.01,
                  longitudeDelta: 0.01,
                  latitude: tripData.pickUpLat, // get center latitude to zoom
                  longitude: tripData.pickUpLong, // get center longitude to zoom
                }}
              >
                <Marker
                  identifier="pickUp-t"
                  key={"pickUp-t"}
                  coordinate={{
                    latitude: tripData.pickUpLat,
                    longitude: tripData.pickUpLong,
                  }}
                  title={"Pick up"}
                  description={tripData ? tripData.pickUpAddress : ""}
                ></Marker>
                <Marker
                  identifier="destination-t"
                  key={"destination-t"}
                  coordinate={{
                    latitude: tripData.destLat,
                    longitude: tripData.destLong,
                  }}
                  title={"Destination"}
                  description={tripData ? tripData.destAddress : ""}
                ></Marker>
              </MapView>
            ) : (
              <MapView
                style={{
                  width: "100%",
                  height: 250,
                  borderRadius: 20,
                }}
                provider="google"
              ></MapView>
            )}

            <View
              style={{
                width: "100%",
                backgroundColor: COLORS.tertiary,
                borderRadius: 20,
                marginTop: 20,
                padding: 10,
              }}
            >
              <HStack>
                <Text style={{ ...FONTS.body5, color: COLORS.fifthary }}>
                  {t("orderID")}
                  {": "}
                </Text>
                <Text style={{ ...FONTS.body5, color: COLORS.white }}>
                  {idTrip}
                </Text>
              </HStack>

              <HStack mt={"10px"}>
                <VStack w={"90%"}>
                  <VStack>
                    <Text style={{ ...FONTS.body5, color: COLORS.fifthary }}>
                      {t("pickUp")}
                    </Text>
                    <Text style={{ ...FONTS.h5, color: COLORS.white }}>
                      {tripData.pickUpAddress}
                    </Text>
                  </VStack>
                  <VStack mt={"15px"}>
                    <Text style={{ ...FONTS.body5, color: COLORS.fifthary }}>
                      {t("des")}
                    </Text>
                    <Text
                      style={{ ...FONTS.h5, color: COLORS.white, width: "80%" }}
                    >
                      {tripData.destAddress}
                    </Text>
                  </VStack>
                </VStack>
                <VStack
                  style={{ position: "absolute", right: 0 }}
                  alignItems={"center"}
                >
                  <View
                    style={{
                      width: 35,
                      height: 35,
                      borderRadius: SIZES.radius50,
                      backgroundColor: COLORS.black,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Icon
                      name="arrow-down"
                      size={20}
                      color={COLORS.fourthary}
                    ></Icon>
                  </View>
                  <View
                    style={{
                      borderLeftWidth: 1,
                      borderLeftColor: COLORS.fourthary,
                      height: "50%",
                    }}
                  ></View>
                  <View
                    style={{
                      width: 35,
                      height: 35,
                      borderRadius: SIZES.radius50,
                      backgroundColor: COLORS.fourthary,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Ionicons name="location" size={20} color={COLORS.white} />
                  </View>
                </VStack>
              </HStack>
            </View>

            <VStack
              mt={"20px"}
              bgColor={COLORS.tertiary}
              borderRadius={20}
              padding={"10px"}
            >
              <Text style={{ ...FONTS.h5, color: COLORS.white }}>
                {t("riderInfo")}
              </Text>
              <HStack mt={"5px"}>
                <Image
                  source={{ uri: tripData.portrait }}
                  alt="Avatar"
                  style={{
                    borderRadius: SIZES.radius50,
                    width: 60,
                    height: 60,
                    backgroundColor: COLORS.white,
                  }}
                />
                <VStack ml={"12px"} justifyContent={"center"}>
                  <Text style={{ ...FONTS.h5, color: COLORS.white }}>
                    {tripData.displayName}
                  </Text>
                  <Text style={{ ...FONTS.body6, color: COLORS.fourthary }}>
                    {tripData.school}
                  </Text>
                </VStack>
              </HStack>
              <HStack mt={"12px"}>
                <VStack>
                  <Text
                    style={{
                      ...FONTS.body6,
                      fontSize: 12,
                      color: COLORS.fifthary,
                    }}
                  >
                    {t("inputLicense")}
                  </Text>
                  <Text
                    style={{
                      ...FONTS.body6,
                      fontSize: 12,
                      color: COLORS.fifthary,
                    }}
                  >
                    {t("inputType")}
                  </Text>
                </VStack>
                <VStack ml={39}>
                  <Text
                    style={{
                      ...FONTS.h6,
                      fontSize: 12,
                      color: COLORS.white,
                    }}
                  >
                    {tripData.licensePlates}
                  </Text>
                  <Text
                    style={{
                      ...FONTS.h6,
                      fontSize: 12,
                      color: COLORS.white,
                    }}
                  >
                    {tripData.transportType}
                  </Text>
                </VStack>
                <VStack position={"absolute"} right={0} bottom={0}>
                  <HStack justifyContent={"center"} alignItems={"center"}>
                    <Text
                      style={{
                        ...FONTS.h6,
                        fontSize: 12,
                        color: COLORS.white,
                        marginRight: 5,
                      }}
                    >
                      4.5
                    </Text>
                    <Ionicons name="star" size={20} color={"#E5E92D"} />
                  </HStack>
                </VStack>
              </HStack>
            </VStack>

            <VStack
              mt={"20px"}
              bgColor={COLORS.tertiary}
              borderRadius={20}
              padding={"10px"}
            >
              <Text style={{ ...FONTS.h5, color: COLORS.white }}>
                {t("price")}
              </Text>
              <HStack mt={3}>
                <VStack>
                  <HStack>
                    <Ionicons name="map" size={20} color={COLORS.white} />
                    <Text
                      style={{
                        ...FONTS.h4,
                        color: COLORS.white,
                        marginLeft: 10,
                      }}
                    >
                      {tripData.distance}
                    </Text>
                  </HStack>
                  <HStack mt={2}>
                    <Ionicons name="time" size={20} color={COLORS.white} />
                    <Text
                      style={{
                        ...FONTS.h4,
                        color: COLORS.white,
                        marginLeft: 10,
                      }}
                    >
                      5 {t("minutes")}
                    </Text>
                  </HStack>
                </VStack>

                <VStack position={"absolute"} right={0} alignItems={"flex-end"}>
                  <Text style={{ ...FONTS.h2, color: COLORS.white }}>
                    {parseInt(tripData.totalPrice).toLocaleString()}đ
                  </Text>
                  <Text
                    style={{
                      ...FONTS.h5,
                      color: COLORS.grey,
                      textDecorationLine: "line-through",
                    }}
                  >
                    {parseInt(tripData.totalPrice).toLocaleString()}đ
                  </Text>
                </VStack>
              </HStack>
            </VStack>
            <Button
              mb={20}
              mt={10}
              w={"100%"}
              borderRadius={20}
              bgColor={COLORS.primary}
              onPress={onPressCancel}
            >
              <Text style={{ ...FONTS.h2, color: COLORS.white }}>
                {tripData.status === "accepted" || tripData.status === "waiting"
                  ? t("cancel")
                  : t("reBooking")}
              </Text>
            </Button>
          </ScrollView>
        </VStack>
      </SafeAreaView>
    </VStack>
  );
};
export default ActivityDetailScreen;
