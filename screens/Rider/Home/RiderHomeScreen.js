import {
  Button,
  HStack,
  Input,
  NativeBaseProvider,
  Text,
  VStack,
  View,
  Image,
  Avatar,
  ScrollView,
  Icon,
  FlatList,
} from "native-base";
import DefaultAvt from "../../../assets/image6.png";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS, FONTS, SIZES } from "../../../constants/theme";
import QRImage from "../../../assets/images/Rider/qrImg.png";
import { TabView, TabBar, SceneMap } from "react-native-tab-view";
import HistoryCard from "../../../components/HistoryCard";
import * as ImagePicker from "expo-image-picker";
import HistoryPickUpCard from "../../../components/Driver/HistoryPickUpCard";
import { Ionicons } from "@expo/vector-icons";
import {
  collection,
  getDocs,
  query,
  where,
  updateDoc,
  doc,
  getDoc,
} from "@firebase/firestore";
import { db } from "../../../config/config";
import moment from "moment/moment";
import {
  getFromAsyncStorage,
  saveToAsyncStorage,
} from "../../../helper/asyncStorage";
import { BackHandler, Switch, ToastAndroid } from "react-native";
import { useFocusEffect } from "@react-navigation/native";

const RiderHomeScreen = ({ navigation, route }) => {
  const [service, setService] = useState(0);
  const [status, setStatus] = useState(0);
  // const { data } = route.params;
  // const { phoneNumber, role } = data;

  // useEffect(() => {
  //   console.log(phoneNumber)
  // }, []);
  const [open, setOpen] = useState();
  const [waitingTrips, setWaitingTrips] = useState([]);
  const [finishedTrips, setFinishedTrips] = useState([]);
  const [canceledTrips, setCanceledTrips] = useState([]);
  const [phoneNumber, setPhoneNumber] = useState([]);
  const currentDate = moment().format("DD/M/YYYY");

  let backButtonPressedOnce = false;

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
  }, [navigation]);

  const fetchDataAndPhoneNumber = async () => {
    try {
      const phoneNumberValue = await getFromAsyncStorage("phoneNumber");
      setPhoneNumber(phoneNumberValue);

      if (phoneNumberValue) {
        fetchData(phoneNumberValue);
        await getWaitingTrips();
        await getFinishedTrips();
        await getCanceledTrips();
      }
    } catch (err) {
      console.log(err);
    }
  };

  const fetchData = async (phoneNumber) => {
    try {
      const docData = await getDoc(doc(db, "Rider", phoneNumber));
      setOpen(docData.data().open);
    } catch (error) {
      console.error(error);
    }
  };

  // useEffect(() => {
  //   getWaitingTrips();
  //   getFinishedTrips();
  //   getCanceledTrips();
  //   getFromAsyncStorage("phoneNumber").then((result) => {
  //     setPhoneNumber(result);
  //   });
  // }, [navigation]);

  const handleSwitchChange = () => {
    console.log(open);
    setOpen((pre) => !pre);
    console.log(open);
    updateDoc(doc(db, "Rider", phoneNumber), {
      open: !open,
    });
  };

  const getWaitingTrips = () => {
    let waitingTrips = [];
    getDocs(
      query(
        collection(db, "ListTrip"),
        where("isScheduled", "==", "false"),
        where("date", "==", currentDate)
      )
    ).then((docSnap) => {
      docSnap.forEach((doc) => {
        if (doc.data().status == "waiting") {
          waitingTrips.push({
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
            totalPrice: doc.data().totalPrice,
            distance: doc.data().distance,
          });
        }
      });
      setWaitingTrips(waitingTrips);
    });
  };

  const getFinishedTrips = () => {
    let finishedTrips = [];
    getDocs(
      query(collection(db, "ListTrip"), where("status", "==", "done"))
    ).then((docSnap) => {
      docSnap.forEach((doc) => {
        finishedTrips.push({
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
          totalPrice: doc.data().totalPrice,
          distance: doc.data().distance,
        });
      });
      setFinishedTrips(finishedTrips);
    });
  };

  const getCanceledTrips = () => {
    let canceledTrips = [];
    getDocs(
      query(collection(db, "ListTrip"), where("status", "==", "canceled"))
    ).then((docSnap) => {
      docSnap.forEach((doc) => {
        canceledTrips.push({
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
          totalPrice: doc.data().totalPrice,
          distance: doc.data().distance,
        });
      });
      setCanceledTrips(canceledTrips);
    });
  };

  const openCamera = async () => {
    let permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    if (permissionResult.granted === false) {
      alert("Permission to access camera is required!");
      return;
    }
    let result = await ImagePicker.launchCameraAsync();
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const FirstRoute = () => (
    <FlatList
      padding={"10px"}
      mt={2}
      horizontal={false}
      data={waitingTrips}
      keyExtractor={(item) => item.idTrip}
      renderItem={({ item }) => (
        <HistoryPickUpCard
          onPress={() => {
            const data = {
              idTrip: "" + item.idTrip,
            };
            navigation.navigate("TripDetail", data);
          }}
          trip={item}
          key={item.idTrip}
        ></HistoryPickUpCard>
      )}
    ></FlatList>
  );

  const SecondRoute = () => (
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
            };
            navigation.navigate("TripDetail", data);
          }}
        ></HistoryPickUpCard>
      )}
    ></FlatList>
  );

  const ThirdRoute = () => (
    <FlatList
      padding={"10px"}
      mt={2}
      horizontal={false}
      data={canceledTrips}
      keyExtractor={(item) => item.idTrip}
      renderItem={({ item }) => (
        <HistoryPickUpCard
          trip={item}
          key={item.idTrip}
          onPress={() => {
            const data = {
              idTrip: "" + item.idTrip,
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

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "first", title: "Available" },
    { key: "second", title: "Finished" },
    { key: "third", title: "Canceled" },
  ]);

  return (
    <NativeBaseProvider>
      <VStack h={"100%"} paddingTop={"20px"} bgColor={COLORS.background}>
        <SafeAreaView>
          <VStack h={"100%"}>
            <VStack paddingX={"10px"}>
              <HStack w={"100%"} mb={10}>
                <Avatar source={DefaultAvt} alt="ava" />
                <VStack justifyContent={"center"} ml={3}>
                  <Text fontSize={10} color={COLORS.grey}>
                    Welcome back
                  </Text>
                  <Text fontSize={SIZES.h4} color={COLORS.white} bold>
                    Huỳnh Thế Vĩ
                  </Text>
                </VStack>
                <HStack position={"absolute"} right={0} alignItems={"center"}>
                  <Button
                    variant={"unstyled"}
                    onPress={() => {
                      openCamera();
                    }}
                  >
                    <Image
                      source={QRImage}
                      alt="qr"
                      h={"30px"}
                      w={"30px"}
                    ></Image>
                  </Button>
                  <Switch
                    thumbColor={open ? COLORS.fifthary : COLORS.grey}
                    value={open}
                    onValueChange={handleSwitchChange}
                    trackColor={{ true: COLORS.fourthary }}
                  ></Switch>
                </HStack>
              </HStack>

              {status === 0 ? (
                <></>
              ) : (
                <>
                  <VStack
                    bgColor={COLORS.fourthary}
                    borderRadius={10}
                    padding={3}
                  >
                    <HStack w={"100%"}>
                      <Avatar source={DefaultAvt} alt="ava" />
                      <Text
                        fontSize={SIZES.h4}
                        color={COLORS.fifthary}
                        ml={2}
                        bold
                        position={"absolute"}
                        right={0}
                      >
                        On going
                      </Text>
                      <VStack ml={2}>
                        <HStack>
                          <Text fontSize={SIZES.h4} color={COLORS.white} bold>
                            Huỳnh Thế Vĩ
                          </Text>
                        </HStack>
                        <Text fontSize={10} color={COLORS.grey}>
                          University of Information Technology
                        </Text>
                      </VStack>
                    </HStack>
                    <HStack mt={2}>
                      <Ionicons
                        name={"location"}
                        size={20}
                        color={COLORS.white}
                      />
                      <Text fontSize={SIZES.h5} color={COLORS.white} bold>
                        University of Information Technology
                      </Text>
                    </HStack>
                  </VStack>
                </>
              )}
            </VStack>
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

export default RiderHomeScreen;
