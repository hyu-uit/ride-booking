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
import {
  collection,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
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
  }, [phoneNumber]);

  const fetchDataAndPhoneNumber = async () => {
    try {
      const phoneNumberValue = await getFromAsyncStorage("phoneNumber");
      setPhone(phoneNumberValue);

      if (phoneNumberValue) {
        getWaitingTrips(phoneNumberValue);
        getConfirmedTrips(phoneNumberValue);
        getCanceledTrips(phoneNumberValue);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getWaitingTrips = (phoneNumberValue) => {
    console.log(phoneNumber);
    const waitingTripsQuery = query(
      collection(db, "ListTrip"),
      where("isScheduled", "==", "false"),
      where("idCustomer", "==", phoneNumberValue)
    );

    const unsubscribeTrip = onSnapshot(waitingTripsQuery, (querySnapshot) => {
      const updatedTrips = [];
      querySnapshot.forEach((doc) => {
        if (doc.data().status == "waiting" || doc.data().status == "accepted") {
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

  const getConfirmedTrips = (phoneNumberValue) => {
    const confirmTripQuery = query(
      collection(db, "ListTrip"),
      where("isScheduled", "==", "false"),
      where("status", "==", "done"),
      where("idCustomer", "==", phoneNumberValue)
    );

    const unsubscribeTrip = onSnapshot(confirmTripQuery, (querySnapshot) => {
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
  const getCanceledTrips = (phoneNumberValue) => {
    const cancelQuery = query(
      collection(db, "ListTrip"),
      where("isScheduled", "==", "false"),
      where("status", "==", "canceled"),
      where("idCustomer", "==", phoneNumberValue)
    );

    const unsubscribeTrip = onSnapshot(cancelQuery, (querySnapshot) => {
      const updatedTrips = [];
      querySnapshot.forEach((doc) => {
        const trip = {
          idTrip: doc.id,
          ...doc.data(),
        };
        updatedTrips.push(trip);
      });
      setCanceledTrips(updatedTrips);
    });

    return () => {
      unsubscribeTrip();
    };
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
        renderItem={({ item }) => {
          let sta = item.idRider ? 1 : 0;
          console.log(sta);
          return (
            <BookingCard
              onPress={() => {
                const data = {
                  idTrip: "" + item.idTrip,
                  idRider: "" + item.idRider,
                };
                navigation.navigate("ActivityDetail", data);
              }}
              sta={sta}
              trip={item}
              key={item.idTrip}
            ></BookingCard>
          );
        }}
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
                idRider: "" + item.idRider,
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
                idRider: "" + item.idRider,
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
      <VStack h={"100%"} bgColor={COLORS.background}>
        <SafeAreaView>
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
