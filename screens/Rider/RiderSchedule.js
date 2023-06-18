import React from "react";
import {
  Button,
  FlatList,
  HStack,
  Image,
  Input,
  ScrollView,
  Spacer,
  Text,
  VStack,
  View,
} from "native-base";
import { COLORS, FONTS, SIZES } from "../../constants/theme";
import { SafeAreaView } from "react-native-safe-area-context";
import ButtonBack from "../../components/Global/ButtonBack/ButtonBack";
import { useState } from "react";
import { TabView, TabBar, SceneMap } from "react-native-tab-view";
import IC_Bike_White from "../../assets/images/Activity/ic_bike_white.png";
import IC_Bike_Blue from "../../assets/images/Activity/ic_bike_blue.png";
import HistoryCard from "../../components/HistoryCard";
import DriverBookingCard from "../../components/Driver/DriverBookingCard";
import RequestCard from "../../components/Driver/RequestCard";
import moment from "moment";
import { useEffect } from "react";
import {
  collection,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../config/config";
import ConfirmedScheduledTrip from "../../components/Driver/ConfirmedScheduledTrip";
import { getFromAsyncStorage } from "../../helper/asyncStorage";
import { useTranslation } from "react-i18next";

const RiderSchedule = ({ navigation }) => {
  const [service, setService] = useState(0);
  const [waitingTrips, setWaitingTrips] = useState({});
  const [confirmedTrips, setConfirmedTrips] = useState({});
  const [phoneNumber, setPhoneNumber] = useState([]);

  useEffect(() => {
    fetchDataAndPhoneNumber();
  }, [phoneNumber, navigation]);

  const fetchDataAndPhoneNumber = async () => {
    try {
      const phoneNumberValue = await getFromAsyncStorage("phoneNumber");
      setPhoneNumber(phoneNumberValue);

      if (phoneNumberValue) {
        getWaitingTrips();
        getConfirmedTrips();
      }
    } catch (err) {
      console.log(err);
    }
  };
  // console.log(currentDate)

  const getWaitingTrips = () => {
    const currentDate = new Date();
    const waitingTripsQuery = query(
      collection(db, "ListTrip"),
      where("status", "==", "waiting"),
      where("isScheduled", "==", "true")
    );

    const unsubscribeTrip = onSnapshot(waitingTripsQuery, (querySnapshot) => {
      const updatedTrips = [];
      querySnapshot.forEach((doc) => {
        if (moment(doc.data().datePickUp, "D/M/YYYY") > currentDate) {
          const trip = {
            idTrip: doc.id,
            ...doc.data(),
          };
          updatedTrips.push(trip);
        }
      });

      setWaitingTrips(updatedTrips);
    });

    return () => {
      unsubscribeTrip();
    };
  };

  const getConfirmedTrips = () => {
    const waitingTripsQuery = query(
      collection(db, "ListTrip"),
      where("idRider", "==", phoneNumber),
      where("status", "==", "confirmed"),
      where("isScheduled", "==", "true")
    );

    const unsubscribeTrip = onSnapshot(waitingTripsQuery, (querySnapshot) => {
      const updatedTrips = [];
      querySnapshot.forEach((doc) => {
        const trip = {
          idTrip: doc.id,
          ...doc.data(),
        };
        updatedTrips.push(trip);
      });
      setConfirmedTrips(updatedTrips);
    });

    return () => {
      unsubscribeTrip();
    };
  };
  const FirstRoute = () => (
    <ScrollView>
      <FlatList
        padding={"10px"}
        mt={2}
        horizontal={false}
        data={waitingTrips}
        keyExtractor={(item) => item.idTrip}
        renderItem={({ item }) => (
          <RequestCard
            onPress={() => {
              const data = {
                idTrip: "" + item.idTrip,
              };
              navigation.navigate("TripDetail", data);
            }}
            trip={item}
            key={item.idTrip}
          ></RequestCard>
        )}
      ></FlatList>
    </ScrollView>
  );

  const SecondRoute = () => (
    <ScrollView>
      <FlatList
        padding={"10px"}
        mt={2}
        horizontal={false}
        data={confirmedTrips}
        keyExtractor={(item) => item.idTrip}
        renderItem={({ item }) => (
          <ConfirmedScheduledTrip
            onPress={() => {
              const data = {
                idTrip: "" + item.idTrip,
                idRider: phoneNumber,
                state: 0,
              };
              navigation.navigate("TripDetail", data);
            }}
            trip={item}
            key={item.idTrip}
          ></ConfirmedScheduledTrip>
        )}
      ></FlatList>
    </ScrollView>
  );

  const ThirdRoute = () => (
    <ScrollView>
      <VStack mt={"17px"} justifyContent={"center"} alignItems={"center"}>
        <HistoryCard />
      </VStack>
    </ScrollView>
  );

  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
  });

  const { t } = useTranslation();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "first", title: t("available") },
    { key: "second", title: t("confirm") },
  ]);
  const [bikeUri, setBikeUri] = useState(
    "https://res.cloudinary.com/dtutrxnyl/image/upload/v1686364990/bikeWhite_vqyjm3.png"
  );
  const [deliveryUri, setDeliveryUri] = useState(
    "https://res.cloudinary.com/dtutrxnyl/image/upload/v1686364992/deliveryBlue_ztlpxb.png"
  );

  return (
    <VStack h={"100%"} paddingY={"20px"} bgColor={COLORS.background}>
      <SafeAreaView>
        <HStack
          marginX={"10px"}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <View style={{ position: "absolute", left: 0 }}></View>
        </HStack>
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
  );
};

export default RiderSchedule;
