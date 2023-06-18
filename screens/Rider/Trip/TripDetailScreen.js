import { VStack, View } from "native-base";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS, FONTS, SIZES } from "../../../constants/theme";
import ButtonBack from "../../../components/Global/ButtonBack/ButtonBack";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../config/config";
import { Dimensions, Platform } from "react-native";
import ReceivedTripCard from "../../../components/Driver/ReceivedTripCard";

const TripDetailScreen = ({ navigation, route }) => {
  const contentHeight = Dimensions.get("window").height;
  const { idTrip, state, isRead } = route.params;
  const [tripData, setTrip] = useState({});

  useEffect(() => {
    getTrip();
    const disableSwipeBack = () => {
      navigation.setOptions({
        gestureEnabled: false,
      });
    };
    disableSwipeBack();
    return () => {
      navigation.setOptions({
        gestureEnabled: true,
      });
    };
  }, [navigation]);
  const getTrip = () => {
    let data = {};
    getDoc(doc(db, "ListTrip", idTrip)).then((doc) => {
      if (doc.exists()) {
        data = {
          idCustomer: doc.data().idCustomer,
          idRider: doc.data().idRider,
          idTrip: doc.id,
          pickUpLat: doc.data().pickUpLat,
          pickUpLong: doc.data().pickUpLong,
          destLat: doc.data().destLat,
          destLong: doc.data().destLong,
          date: doc.data().date,
          time: doc.data().time,
          totalPrice: doc.data().totalPrice,
          distance: doc.data().distance,
          status: doc.data().status,
        };
      }
      setTrip(data);
    });
  };
  console.log(state);
  return (
    <VStack
      h={Platform.OS === "ios" ? contentHeight : "100%"}
      bgColor={COLORS.background}
    >
      <SafeAreaView>
        <View
          style={{
            position: "absolute",
            top: 50,
            left: 2,
            zIndex: 1,
            display: state === 1 ? "none" : "flex",
          }}
        >
          <ButtonBack
            onPress={() => {
              navigation.goBack();
            }}
          />
        </View>
        {/* <MapView
          provider="google"
          style={{
            width: "100%",
            height: "100%",
            borderRadius: 20,
          }}
        >
          <Marker
            coordinate={{ latitude: 9.90761, longitude: 105.31181 }}
          ></Marker>
        </MapView>
        <ReceivedTripCard
          trip={tripData}
          isRead={isRead}
          navigation={navigation}
        ></ReceivedTripCard>
        {/* <HStack justifyContent={"center"} mb={"20px"}>
          <View style={{ position: "absolute", left: 0 }}>
            <ButtonBack></ButtonBack>
          </View>
          <Text style={{ ...FONTS.h2, color: COLORS.white }}>Detail</Text>
        </HStack>
        <ScrollView h={"100%"} showsVerticalScrollIndicator={false}>
          <MapView
            provider="google"
            style={{ width: "100%", height: 200, borderRadius: 20 }}
          >
            <Marker
              coordinate={{ latitude: 9.90761, longitude: 105.31181 }}
            ></Marker>
          </MapView>

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
              <Text style={{ ...FONTS.h5, color: COLORS.fifthary }}>
                Time:{" "}
              </Text>
              <Text style={{ ...FONTS.h5, color: COLORS.white }}>
                09:00, 08/05/2023
              </Text>
            </HStack>

            <HStack mt={"10px"}>
              <VStack>
                <VStack>
                  <Text style={{ ...FONTS.body5, color: COLORS.fifthary }}>
                    Pick up
                  </Text>
                  <Text style={{ ...FONTS.h5, color: COLORS.white }}>
                    University of Information Technology
                  </Text>
                </VStack>
                <VStack mt={"15px"}>
                  <Text style={{ ...FONTS.body5, color: COLORS.fifthary }}>
                    Drop off
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
            <Text style={{ ...FONTS.h5, color: COLORS.white }} mb={2}>
              Customer information
            </Text>
            <HStack mt={"5px"}>
              <Avatar
                source={DefaultAvt}
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
                  Huỳnh Thế Vĩ
                </Text>
                <Text style={{ ...FONTS.body6, color: COLORS.fourthary }}>
                  20520000
                </Text>
                <Text style={{ ...FONTS.body6, color: COLORS.fourthary }}>
                  University of Information Technology
                </Text>
              </VStack>
            </HStack>
          </VStack>

          <VStack
            mt={"20px"}
            bgColor={COLORS.tertiary}
            borderRadius={20}
            padding={"10px"}
          >
            <Text style={{ ...FONTS.h5, color: COLORS.white }}>Price</Text>
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
                    2km
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
                    5 minutes
                  </Text>
                </HStack>
              </VStack>

              <VStack position={"absolute"} right={0} alignItems={"flex-end"}>
                <Text style={{ ...FONTS.h2, color: COLORS.white }}>
                  20,000đ
                </Text>
                <Text
                  style={{
                    ...FONTS.h5,
                    color: COLORS.grey,
                    textDecorationLine: "line-through",
                  }}
                >
                  30,000đ
                </Text>
              </VStack>
            </HStack>
          </VStack>
          <Button
            mt={10}
            w={"100%"}
            borderRadius={20}
            bgColor={COLORS.primary}
            onPress={() => {}}
          >
            <Text style={{ ...FONTS.h2, color: COLORS.white }}>Accept</Text>
          </Button>
        </ScrollView> */}
      </SafeAreaView>
    </VStack>
  );
};

export default TripDetailScreen;
