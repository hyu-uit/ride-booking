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
  Switch,
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
import { collection, getDocs, query, where } from "@firebase/firestore";
import { db } from "../../../config/config";
import { when } from "q";

const RiderHomeScreen = ({ navigation, route }) => {
  const [service, setService] = useState(0);
  const [status, setStatus] = useState(0);
  // const { data } = route.params;
  // const { phoneNumber, role } = data;

  // useEffect(() => {
  //   console.log(phoneNumber)
  // }, []);
  const [waitingTrips, setWaitingTrips] = useState([]);
  const [finishedTrips, setFinishedTrips] = useState([]);
  const [canceledTrips, setCanceledTrips] = useState([]);

  useEffect(() => {
    getWaitingTrips();
    getFinishedTrips();
    getCanceledTrips();
  }, [navigation]);

  const getWaitingTrips = () => {
    let waitingTrips = [];
    getDocs(
      query(collection(db, "ListTrip"), where("status", "==", "waiting"))
    ).then((docSnap) => {
      docSnap.forEach((doc) => {
        waitingTrips.push({
          idCustomer: doc.data().idCustomer,
          idTrip: doc.id,
          pickUpLat: doc.data().pickUpLat,
          pickUpLong: doc.data().pickUpLong,
          destLat: doc.data().destLat,
          destLong: doc.data().destLong,
          date: doc.data().date,
          time: doc.data().time,
          totalPrice: doc.data().totalPrice,
          distance: doc.data().distance,
        });
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
      data={finishedTrips}
      keyExtractor={(item) => item.idTrip}
      renderItem={({ item }) => (
        <HistoryPickUpCard trip={item} key={item.idTrip}></HistoryPickUpCard>
      )}
    ></FlatList>
  );

  const ThirdRoute = () => (
    <FlatList
      data={canceledTrips}
      keyExtractor={(item) => item.idTrip}
      renderItem={({ item }) => (
        <HistoryPickUpCard trip={item} key={item.idTrip}></HistoryPickUpCard>
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
                  <Switch defaultIsChecked></Switch>
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
