import { View, Text } from "react-native";
import React, { useEffect } from "react";
import {
  Button,
  FlatList,
  HStack,
  Image,
  NativeBaseProvider,
  ScrollView,
  VStack,
} from "native-base";
import { SafeAreaView } from "react-native-safe-area-context";
import { SIZES, COLORS, FONTS } from "../../../constants/theme";
import { TabView, TabBar, SceneMap } from "react-native-tab-view";
import { useState } from "react";
import { useCallback } from "react";
import IC_Bike_White from "../../../assets/images/Activity/ic_bike_white.png";
import IC_Bike_Blue from "../../../assets/images/Activity/ic_bike_blue.png";
import HistoryCard from "../../../components/HistoryCard";
import BookingCard from "../../../components/BookingCard/BookingCard";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../../config/config";
import { getFromAsyncStorage } from "../../../helper/asyncStorage";
import { useTranslation } from "react-i18next";

const ActivityScreen = ({ navigation }) => {
  const { t } = useTranslation();

  const [service, setService] = useState(0);
  const [waitingTrips, setWaitingTrips] = useState({});
  const [confirmedTrips, setConfirmedTrips] = useState({});
  const [canceledTrips, setCanceledTrips] = useState({});
  const [phoneNumber, setPhone] = useState(null);
  const [bikeUri, setBikeUri] = useState(
    "https://res.cloudinary.com/dtutrxnyl/image/upload/v1686364990/bikeWhite_vqyjm3.png"
  );
  const [deliveryUri, setDeliveryUri] = useState(
    "https://res.cloudinary.com/dtutrxnyl/image/upload/v1686364992/deliveryBlue_ztlpxb.png"
  );

  useEffect(() => {
    fetchDataAndPhoneNumber();
  }, []);

  const fetchDataAndPhoneNumber = async () => {
    try {
      const phoneNumberValue = await getFromAsyncStorage("phoneNumber");
      setPhone(phoneNumberValue);
      console.log(phoneNumberValue);

      if (phoneNumberValue) {
        getWaitingTrips(phoneNumberValue);
        getConfirmedTrips(phoneNumberValue);
        getCanceledTrips(phoneNumberValue);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const getWaitingTrips = async (phoneNumber) => {
    let waitingTrips = [];
    getDocs(
      query(collection(db, "ListTrip"), where("isScheduled", "==", "false"))
    ).then((docSnap) => {
      docSnap.forEach((doc) => {
        if (
          doc.data().status == "waiting" &&
          doc.data().idCustomer == phoneNumber
        ) {
          waitingTrips.push({
            idCustomer: doc.data().idCustomer,
            idTrip: doc.id,
            idRider: doc.data().idRider,
            pickUpLat: doc.data().pickUpLat,
            pickUpLong: doc.data().pickUpLong,
            destLat: doc.data().destLat,
            destLong: doc.data().destLong,
            date: doc.data().date,
            time: doc.data().time,
            datePickUp: doc.data().datePickUp,
            timePickUp: doc.data().timePickUp,
            totalPrice: doc.data().totalPrice,
            distance: doc.data().distance,
          });
        }
      });
      setWaitingTrips(waitingTrips);
    });
  };

  const getConfirmedTrips = async (phoneNumber) => {
    let confirmedTrips = [];
    getDocs(
      query(collection(db, "ListTrip"), where("isScheduled", "==", "false"))
    ).then((docSnap) => {
      docSnap.forEach((doc) => {
        if (
          doc.data().status == "done" &&
          doc.data().idCustomer == phoneNumber
        ) {
          confirmedTrips.push({
            idCustomer: doc.data().idCustomer,
            idTrip: doc.id,
            idRider: doc.data().idRider,
            pickUpLat: doc.data().pickUpLat,
            pickUpLong: doc.data().pickUpLong,
            destLat: doc.data().destLat,
            destLong: doc.data().destLong,
            date: doc.data().date,
            time: doc.data().time,
            datePickUp: doc.data().datePickUp,
            timePickUp: doc.data().timePickUp,
            totalPrice: doc.data().totalPrice,
            distance: doc.data().distance,
          });
        }
      });
      setConfirmedTrips(confirmedTrips);
    });
  };
  const getCanceledTrips = async (phoneNumber) => {
    let canceledTrips = [];
    getDocs(
      query(collection(db, "ListTrip"), where("isScheduled", "==", "true"))
    ).then((docSnap) => {
      docSnap.forEach((doc) => {
        if (
          doc.data().status == "canceled" &&
          doc.data().idCustomer == phoneNumber
        ) {
          canceledTrips.push({
            idCustomer: doc.data().idCustomer,
            idTrip: doc.id,
            idRider: doc.data().idRider,
            pickUpLat: doc.data().pickUpLat,
            pickUpLong: doc.data().pickUpLong,
            destLat: doc.data().destLat,
            destLong: doc.data().destLong,
            date: doc.data().date,
            time: doc.data().time,
            datePickUp: doc.data().datePickUp,
            timePickUp: doc.data().timePickUp,
            totalPrice: doc.data().totalPrice,
            distance: doc.data().distance,
          });
        }
      });
      setCanceledTrips(canceledTrips);
    });
  };

  const FirstRoute = () => (
    <VStack paddingX={"10px"}>
      {/* <BookingCard onPress={() => navigation.navigate("ActivityDetail")} /> */}
      <FlatList
        w={"100%"}
        mt={2}
        horizontal={false}
        data={waitingTrips}
        keyExtractor={(item) => item.idTrip}
        renderItem={({ item }) => (
          <BookingCard
            onPress={() => {
              const data = {
                idTrip: "" + item.idTrip,
              };
              navigation.navigate("ActivityDetail", data);
            }}
            trip={item}
            key={item.idTrip}
          ></BookingCard>
        )}
      ></FlatList>
    </VStack>
  );

  const SecondRoute = () => (
    <VStack paddingX={"10px"}>
      {/* <BookingCard sta={1} />
        <BookingCard sta={1} /> */}
      <FlatList
        w={"100%"}
        mt={2}
        horizontal={false}
        data={confirmedTrips}
        keyExtractor={(item) => item.idTrip}
        renderItem={({ item }) => (
          <BookingCard
            sta={1}
            onPress={() => {
              const data = {
                idTrip: "" + item.idTrip,
              };
              navigation.navigate("ActivityDetail", data);
            }}
            trip={item}
            key={item.idTrip}
          ></BookingCard>
        )}
      ></FlatList>
    </VStack>
  );

  const ThirdRoute = () => (
    <VStack paddingX={"10px"}>
      <FlatList
        w={"100%"}
        mt={2}
        horizontal={false}
        data={canceledTrips}
        keyExtractor={(item) => item.idTrip}
        renderItem={({ item }) => (
          <BookingCard
            sta={1}
            onPress={() => {
              const data = {
                idTrip: "" + item.idTrip,
              };
              navigation.navigate("ActivityDetail", data);
            }}
            trip={item}
            key={item.idTrip}
          ></BookingCard>
        )}
      ></FlatList>
    </VStack>
  );

  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
    third: ThirdRoute,
  });

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "first", title: t("booking") },
    { key: "second", title: t("booked") },
    { key: "third", title: t("canceled") },
  ]);

  return (
    <NativeBaseProvider>
      <VStack h={"100%"} paddingY={"20px"} bgColor={COLORS.background}>
        <SafeAreaView>
          <HStack justifyContent={"center"} space={"10px"}>
            <Button
              w={"45%"}
              h={"70px"}
              borderRadius={20}
              bgColor={service === 0 ? COLORS.primary : COLORS.tertiary}
              onPress={() => {
                setService(0);
                setBikeUri(
                  "https://res.cloudinary.com/dtutrxnyl/image/upload/v1686364990/bikeWhite_vqyjm3.png"
                );
                setDeliveryUri(
                  "https://res.cloudinary.com/dtutrxnyl/image/upload/v1686364992/deliveryBlue_ztlpxb.png"
                );
              }}
            >
              {/* <Image
                src={require("../../../assets/images/Activity/ic_bike.png`")}
              /> */}
              <HStack justifyContent={"center"} alignItems={"center"}>
                <Image
                  source={{ uri: bikeUri }}
                  w={"50%"}
                  h={"120%"}
                  resizeMode="contain"
                  alt="Icon bike"
                  // Other props here
                />
                {/* {service === 0 ? (
                  <>
                    <Image
                      source={IC_Bike_White}
                      alt="Icon bike"
                      // Other props here
                    />
                  </>
                ) : (
                  <>
                    <Image
                      source={IC_Bike_Blue}
                      alt="Icon bike"
                      // Other props here
                    />
                  </>
                )} */}

                <Text
                  style={{
                    ...FONTS.h2,
                    color: service === 0 ? COLORS.white : COLORS.fourthary,
                  }}
                >
                  Bike
                </Text>
              </HStack>
            </Button>
            <Button
              w={"45%"}
              h={"70px"}
              borderRadius={20}
              bgColor={service === 1 ? COLORS.primary : COLORS.tertiary}
              onPress={() => {
                setService(1);
                setBikeUri(
                  "https://res.cloudinary.com/dtutrxnyl/image/upload/v1686364990/bikeBlue_sqih2p.png"
                );
                setDeliveryUri(
                  "https://res.cloudinary.com/dtutrxnyl/image/upload/v1686364990/deliveryWhite_flxx91.png"
                );
              }}
            >
              {/* <Image
                src={require("../../../assets/images/Activity/ic_bike.png`")}
              /> */}
              <HStack justifyContent={"center"} alignItems={"center"}>
                {/* {service === 1 ? (
                  <>
                    <Image
                      source={require("../../../assets/images/Activity/ic_send_white.png")}
                      alt="Icon send"
                      // Other props here
                    />
                  </>
                ) : (
                  <>
                    <Image
                      source={require("../../../assets/images/Activity/ic_send_blue.png")}
                      alt="Icon send"
                      // Other props here
                    />
                  </>
                )} */}
                <Image
                  source={{ uri: deliveryUri }}
                  w={"50%"}
                  h={"150%"}
                  resizeMode="contain"
                  alt="Icon bike"
                  // Other props here
                />
                <Text
                  style={{
                    ...FONTS.h2,
                    color: service === 1 ? COLORS.white : COLORS.fourthary,
                  }}
                >
                  Send
                </Text>
              </HStack>
            </Button>
          </HStack>

          <VStack h={"100%"} mt={"17px"}>
            <TabView
              navigationState={{ index, routes }}
              renderScene={renderScene}
              onIndexChange={setIndex}
              initialLayout={{ width: SIZES.width }}
              renderTabBar={(props) => (
                <TabBar
                  {...props}
                  style={{ backgroundColor: COLORS.tertiary }}
                  inactiveColor={COLORS.fourthary}
                  indicatorStyle={{ backgroundColor: COLORS.fourthary }}
                  labelStyle={{ ...FONTS.h5 }}
                />
              )}
            />
          </VStack>
        </SafeAreaView>
      </VStack>
    </NativeBaseProvider>
  );
};

export default ActivityScreen;
