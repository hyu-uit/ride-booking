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
import { COLORS, FONTS, SIZES } from "../../../constants/theme";
import { SafeAreaView } from "react-native-safe-area-context";
import ButtonBack from "../../../components/Global/ButtonBack/ButtonBack";
import { useState } from "react";
import { TabView, TabBar, SceneMap } from "react-native-tab-view";
import IC_Bike_White from "../../../assets/images/Activity/ic_bike_white.png";
import IC_Bike_Blue from "../../../assets/images/Activity/ic_bike_blue.png";
import HistoryCard from "../../../components/HistoryCard";
import { useEffect } from "react";
import { getFromAsyncStorage } from "../../../helper/asyncStorage";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../../config/config";
import BookingCard from "../../../components/BookingCard/BookingCard";

const ScheduledScreen = ({ navigation }) => {
  const [service, setService] = useState(0);
  const [phoneNumber, setPhone] = useState(null);
  const [waitingTrips, setWaitingTrips] = useState({});
  const [confirmedTrips, setConfirmedTrips] = useState({});
  const [canceledTrips, setCanceledTrips] = useState({});
  useEffect(() => {
    fetchDataAndPhoneNumber();
  }, [navigation, phoneNumber]);

  const fetchDataAndPhoneNumber = async () => {
    try {
      const phoneNumberValue = await getFromAsyncStorage("phoneNumber");
      setPhone(phoneNumberValue);
      if (phoneNumberValue) {
        getWaitingTrips();
        getConfirmedTrips();
        getCanceledTrips();
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getWaitingTrips = () => {
    console.log(phoneNumber);
    const waitingTripsQuery = query(
      collection(db, "ListTrip"),
      where("isScheduled", "==", "true"),
      where("idCustomer", "==", phoneNumber)
    );

    const unsubscribeTrip = onSnapshot(waitingTripsQuery, (querySnapshot) => {
      const updatedTrips = [];
      querySnapshot.forEach((doc) => {
        if (
          doc.data().status == "waiting" ||
          doc.data().status == "accepted" ||
          doc.data().status === "on the way"
        ) {
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
    const confirmTripQuery = query(
      collection(db, "ListTrip"),
      where("isScheduled", "==", "true"),
      where("status", "==", "done"),
      where("idCustomer", "==", phoneNumber)
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
  const getCanceledTrips = () => {
    const cancelQuery = query(
      collection(db, "ListTrip"),
      where("isScheduled", "==", "true"),
      where("status", "==", "canceled"),
      where("idCustomer", "==", phoneNumber)
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
    <ScrollView>
      <FlatList
        padding={"10px"}
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
    </ScrollView>
  );

  const ThirdRoute = () => (
    <ScrollView>
      <FlatList
        padding={"10px"}
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
    </ScrollView>
  );

  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
    third: ThirdRoute,
  });

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "first", title: "Booking" },
    { key: "second", title: "Booked" },
    { key: "third", title: "Canceled" },
  ]);

  return (
    <VStack h={"100%"} paddingY={"20px"} bgColor={COLORS.background}>
      <SafeAreaView>
        <HStack
          mb={5}
          marginX={"10px"}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <View style={{ position: "absolute", left: 0 }}>
            <ButtonBack
              onPress={() => {
                navigation.goBack();
              }}
            ></ButtonBack>
          </View>
          <Text style={{ ...FONTS.h2, color: COLORS.white }} ml={4}>
            Scheduled
          </Text>
        </HStack>

        <VStack h={"100%"}>
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

export default ScheduledScreen;
