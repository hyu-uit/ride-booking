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
import { convertToTime, convertToDate } from "../../helper/moment";
import HistoryPickUpCard from "../../components/Driver/HistoryPickUpCard";

const RiderSchedule = ({ navigation }) => {
  const [service, setService] = useState(0);
  const [waitingTrips, setWaitingTrips] = useState({});
  const [confirmedTrips, setConfirmedTrips] = useState({});
  const [finishedTrips, setFinishedTrips] = useState({});
  const [phoneNumber, setPhoneNumber] = useState([]);
  const [currentTime, setCurrentTime] = useState(convertToTime(Date.now()));
  const [date, setCurrentDate] = useState(convertToDate(Date.now()));

  useEffect(() => {
    fetchDataAndPhoneNumber();
    // console.log("AAA"+currentTime)
  }, [phoneNumber, navigation, currentTime, date]);

  const fetchDataAndPhoneNumber = async () => {
    try {
      const phoneNumberValue = await getFromAsyncStorage("phoneNumber");
      setPhoneNumber(phoneNumberValue);

      if (phoneNumberValue) {
        getWaitingTrips();
        getConfirmedTrips();
        getFinishedTrips();
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
    const [hoursCur, minutesCur] = currentTime.split(":");
    const totalMinutesCur =
      parseInt(hoursCur, 10) * 60 + parseInt(minutesCur, 10);

    const unsubscribeTrip = onSnapshot(waitingTripsQuery, (querySnapshot) => {
      const updatedTrips = [];
      querySnapshot.forEach((doc) => {
        const [hoursDB, minutesDB] = doc.data().timePickUp.split(":");
        const totalMinutesDB =
          parseInt(hoursDB, 10) * 60 + parseInt(minutesDB, 10);

        const totalMin = totalMinutesDB - totalMinutesCur;
        if (moment(doc.data().datePickUp, "D/M/YYYY") > currentDate) {
          const trip = {
            idTrip: doc.id,
            ...doc.data(),
          };
          updatedTrips.push(trip);
        } else if (doc.data().datePickUp === date) {
          if (parseInt(totalMin) >= 60) {
            const trip = {
              idTrip: doc.id,
              ...doc.data(),
            };
            updatedTrips.push(trip);
          }
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
      where("status", "==", "accepted"),
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

  const getFinishedTrips = () => {
    const finishedTripsQuery = query(
      collection(db, "ListTrip"),
      where("idRider", "==", phoneNumber),
      where("status", "==", "done"),
      where("isScheduled", "==", "true")
    );

    const unsubscribeTrip = onSnapshot(finishedTripsQuery, (querySnapshot) => {
      const updatedTrips = [];
      querySnapshot.forEach((doc) => {
        const trip = {
          idTrip: doc.id,
          ...doc.data(),
        };
        updatedTrips.push(trip);
      });
      setFinishedTrips(updatedTrips);
    });

    return () => {
      unsubscribeTrip();
    };
  };
  const FirstRoute = () => (
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
  );

  const SecondRoute = () => (
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
  );

  const ThirdRoute = () => (
    <FlatList
      padding={"10px"}
      mt={2}
      horizontal={false}
      data={finishedTrips}
      keyExtractor={(item) => item.idTrip}
      renderItem={({ item }) => (
        <HistoryPickUpCard
          trip={item}
          key={item.idTrip}
          onPress={() => {
            const data = {
              idTrip: "" + item.idTrip,
              isRead: true,
            };
            navigation.navigate("TripDetail", data);
          }}
        ></HistoryPickUpCard>
      )}
    ></FlatList>
  );

  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
    third: ThirdRoute,
  });

  const { t } = useTranslation();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "first", title: t("available") },
    { key: "second", title: t("confirm") },
    { key: "third", title: t("finished") },
  ]);

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
