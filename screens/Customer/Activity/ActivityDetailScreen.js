import { View, Text, Dimensions } from "react-native";
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
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../config/config";
import { useTranslation } from "react-i18next";
import { Platform } from "react-native";

const ActivityDetailScreen = ({ navigation, route }) => {
  const { idTrip } = route.params;
  const [tripData, setTrip] = useState([]);
  const contentHeight = Dimensions.get("window").height;
  const { t } = useTranslation();

  // const API_KEY = "AIzaSyDEokOCthVrnmMPiI_fLEZKQtV1SjFvjxQ";
  // const API_KEY = "AIzaSyA_suPUj4xs62VSz5pbRPQ1R-9Bk9Nh6dY";
  // const API_KEY = "AIzaSyAeoFwgal1syynMHwIR8zBa770UPiaFLFw";

  useEffect(() => {
    getTrip();
  }, []);
  const getTrip = () => {
    let data = {};
    getDoc(doc(db, "ListTrip", idTrip)).then((tripData) => {
      if (tripData.exists()) {
        getDoc(doc(db, "Rider", tripData.data().idRider)).then((docData) => {
          if (docData.exists()) {
            data = {
              idCustomer: tripData.data().idCustomer,
              idTrip: tripData.id,
              pickUpLat: tripData.data().pickUpLat,
              pickUpLong: tripData.data().pickUpLong,
              destLat: tripData.data().destLat,
              destLong: tripData.data().destLong,
              date: tripData.data().date,
              portrait: docData.data().portrait,
              time: tripData.data().time,
              totalPrice: tripData.data().totalPrice,
              distance: tripData.data().distance,
              licensePlates: docData.data().licensePlates,
              transportType: docData.data().transportType,
              displayName: docData.data().displayName,
              school: docData.data().school,
            };
            setTrip(data);
          }
        });
      }
    });
  };

  return (
    <NativeBaseProvider>
      <VStack
        h={Platform.OS === "ios" ? contentHeight : "100%"}
        paddingY={"20px"}
        bgColor={COLORS.background}
        paddingX={"10px"}
      >
        <SafeAreaView>
          <VStack>
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
            <ScrollView h={"100%"} showsVerticalScrollIndicator={false}>
              {/* <MapView
                provider="google"
                style={{ width: "100%", height: 200, borderRadius: 20 }}
              >
                <Marker
                  coordinate={{ latitude: 9.90761, longitude: 105.31181 }}
                ></Marker>
                {/* <MapViewDirections
                  origin={{ latitude: 9.90761, longitude: 105.31181 }}
                  destination={{ latitude: 10.77653, longitude: 106.700981 }}
                  apikey={API_KEY}
                />
              </MapView> */}

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
                  <VStack>
                    <VStack>
                      <Text style={{ ...FONTS.body5, color: COLORS.fifthary }}>
                        {t("pickUp")}
                      </Text>
                      <Text style={{ ...FONTS.h5, color: COLORS.white }}>
                        University of Information Technology
                      </Text>
                    </VStack>
                    <VStack mt={"15px"}>
                      <Text style={{ ...FONTS.body5, color: COLORS.fifthary }}>
                        {t("des")}
                      </Text>
                      <Text style={{ ...FONTS.h5, color: COLORS.white }}>
                        University of Economic and Law
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
                      <Ionicons
                        name="location"
                        size={20}
                        color={COLORS.white}
                      />
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

                  <VStack
                    position={"absolute"}
                    right={0}
                    alignItems={"flex-end"}
                  >
                    <Text style={{ ...FONTS.h2, color: COLORS.white }}>
                      {tripData.totalPrice}
                    </Text>
                    <Text
                      style={{
                        ...FONTS.h5,
                        color: COLORS.grey,
                        textDecorationLine: "line-through",
                      }}
                    >
                      {tripData.totalPrice}
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
                onPress={() => {}}
              >
                <Text style={{ ...FONTS.h2, color: COLORS.white }}>
                  {t("reBooking")}
                </Text>
              </Button>
            </ScrollView>
          </VStack>
        </SafeAreaView>
      </VStack>
    </NativeBaseProvider>
  );
};

export default ActivityDetailScreen;
