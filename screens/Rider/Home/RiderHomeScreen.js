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
  Modal,
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
  onSnapshot,
} from "@firebase/firestore";
import { db } from "../../../config/config";
import moment from "moment/moment";
import {
  getFromAsyncStorage,
  saveToAsyncStorage,
} from "../../../helper/asyncStorage";
import { BackHandler, Switch, ToastAndroid } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import PopUpRequestCard from "../../../components/Driver/PopUpRequestCard";
import MapView, { Marker } from "react-native-maps";
import { Dimensions } from "react-native";
import WaitingForRiderCard from "../../../components/Driver/WaitingForRiderCard";
import { useTranslation } from "react-i18next";
import { isNullOrEmpty } from "../../../helper/helper";
import { calculateMapDelta } from "../../../helper/location";
import TripDetailScreen from "../Trip/TripDetailScreen";

const RiderHomeScreen = ({ navigation, route }) => {
  const [service, setService] = useState(0);
  const [status, setStatus] = useState(0);
  const [open, setOpen] = useState("");
  const [newCurrentTrips, setNewCurrentTrips] = useState([]);
  const [waitingTrips, setWaitingTrips] = useState([]);
  const [finishedTrips, setFinishedTrips] = useState([]);
  const [canceledTrips, setCanceledTrips] = useState([]);
  const [name, setName] = useState("");
  const [avt, setAvatar] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState([]);
  const currentDate = moment().format("D/M/YYYY");
  const { t } = useTranslation();
  const [isModalVisible, setModalVisible] = useState(false);
  const [isReady, setReady] = useState(true);
  const [randomTrips, setRandomTrips] = useState([]);
  const [isCount, setCount] = useState(false);
  const [modalVisible, setIsModalVisible] = useState(false);
  const [selectedTrip, setSelectedTrip] = useState([]);
  const [isRiderReceived, setIsRiderReceived] = useState(false);

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
  }, [phoneNumber, open, navigation]);

  const fetchDataAndPhoneNumber = async () => {
    try {
      const phoneNumberValue = await getFromAsyncStorage("phoneNumber");
      setPhoneNumber(phoneNumberValue);

      if (phoneNumberValue) {
        fetchData(phoneNumberValue);
        fetchNewCurrentTrips();
        getWaitingTrips();
        getFinishedTrips();
        getCanceledTrips();
      }
    } catch (err) {
      console.log(err);
    }
  };

  const fetchData = async (phoneNumber) => {
    try {
      const unsubscribe = onSnapshot(
        doc(db, "Rider", phoneNumber),
        (docSnapshot) => {
          const docData = docSnapshot.data();
          setOpen(docData.open);
          setName(docData.displayName);
          setAvatar(docData.portrait);
        }
      );
      return () => {
        unsubscribe();
      };
    } catch (error) {
      console.error(error);
    }
  };

  const handleSwitchChange = () => {
    console.log(open);
    setOpen((pre) => !pre);
    console.log(open);
    updateDoc(doc(db, "Rider", phoneNumber), {
      open: !open,
    });
  };

  useEffect(() => {
    getFromAsyncStorage("riderTripId").then((value) => {
      if (value && status === "accepted") {
        navigation.navigate("TripDetail", {
          idTrip: "" + value,
          isRead: false,
        });
      }
    });
  });

  // const fetchNewCurrentTrips = () => {
  //   const waitingTripsQuery = query(
  //     collection(db, "ListTrip"),
  //     where("status", "==", "waiting"),
  //     where("isScheduled", "==", "false"),
  //   );

  //   const unsubscribeTrip = onSnapshot(waitingTripsQuery, (querySnapshot) => {
  //     const updatedTrips = [];
  //     querySnapshot.forEach((doc) => {
  //       const trip = {
  //         idTrip: doc.id,
  //         ...doc.data(),
  //       };
  //       updatedTrips.push(trip);
  //     });

  //     // Random một index trong danh sách trips
  //     const randomIndex = Math.floor(Math.random() * updatedTrips.length);
  //     const randomTrip = updatedTrips[randomIndex];

  //     // Lưu trữ danh sách các trips đã được random
  //     setRandomTrips(updatedTrips);

  //     // Cập nhật document random vào state newCurrentTrips
  //     setNewCurrentTrips([randomTrip]);

  //     if (updatedTrips.length === 0) {
  //       setModalVisible(false);
  //     } else {
  //       setModalVisible(true);
  //     }
  //   });

  //   return () => {
  //     unsubscribeTrip();
  //   };
  // };

  const fetchNewCurrentTrips = () => {
    if (isCount === true && isRiderReceived === false) {
      if (open === true) {
        const waitingTripsQuery = query(
          collection(db, "ListTrip"),
          where("status", "==", "waiting"),
          where("isScheduled", "==", "false"),
          where("idRider", "==", "")
        );

        let previousTrip = null; // Biến để lưu trữ document trước đó

        const unsubscribeTrip = onSnapshot(
          waitingTripsQuery,
          (querySnapshot) => {
            const updatedTrips = [];
            querySnapshot.forEach((doc) => {
              const trip = {
                idTrip: doc.id,
                ...doc.data(),
              };
              updatedTrips.push(trip);
            });

            if (updatedTrips.length === 0) {
              setModalVisible(false);
              return;
            }

            let randomTrip = null;
            do {
              const randomIndex = Math.floor(
                Math.random() * updatedTrips.length
              );
              randomTrip = updatedTrips[randomIndex];
            } while (randomTrip === previousTrip);

            previousTrip = randomTrip;
            setRandomTrips(updatedTrips);
            setNewCurrentTrips([
              {
                ...randomTrip,
                pickUpLat: parseFloat(randomTrip.pickUpLat),
                pickUpLong: parseFloat(randomTrip.pickUpLong),
                destLat: parseFloat(randomTrip.destLat),
                destLong: parseFloat(randomTrip.destLong),
              },
            ]);
            console.log(
              "🚀 ~ file: RiderHomeScreen.js:226 ~ fetchNewCurrentTrips ~ [randomTrip]:",
              [randomTrip]
            );
            setModalVisible(true);
          }
        );

        const timeout = setTimeout(() => {
          unsubscribeTrip(); // Hủy đăng ký lắng nghe
          fetchNewCurrentTrips(); // Gọi lại hàm sau khoảng thời gian xác định
        }, 60000); // 1 phút = 60.000 milliseconds

        return () => {
          clearTimeout(timeout); // Xóa bỏ timeout nếu component bị unmount
          unsubscribeTrip(); // Hủy đăng ký lắng nghe
        };
      } else {
        setModalVisible(false);
      }
    } else {
      if (open === true) {
        const waitingTripsQuery = query(
          collection(db, "ListTrip"),
          where("status", "==", "waiting"),
          where("isScheduled", "==", "false"),
          where("idRider", "==", "")
        );

        let previousTrip = null; // Biến để lưu trữ document trước đó

        const unsubscribeTrip = onSnapshot(
          waitingTripsQuery,
          (querySnapshot) => {
            const updatedTrips = [];
            querySnapshot.forEach((doc) => {
              const trip = {
                idTrip: doc.id,
                ...doc.data(),
              };
              updatedTrips.push(trip);
            });

            if (updatedTrips.length === 0) {
              setModalVisible(false);
              return;
            }

            let randomTrip = null;
            do {
              // Random một index từ 0 đến độ dài danh sách updatedTrips
              const randomIndex = Math.floor(
                Math.random() * updatedTrips.length
              );

              // Lấy document ngẫu nhiên từ danh sách updatedTrips
              randomTrip = updatedTrips[randomIndex];
            } while (randomTrip === previousTrip); // Kiểm tra nếu document trùng với document trước đó

            previousTrip = randomTrip; // Lưu trữ document hiện tại để kiểm tra ở lần kế tiếp
            // Lưu trữ danh sách các trips đã được random
            setRandomTrips(updatedTrips);
            setNewCurrentTrips([
              {
                ...randomTrip,
                pickUpLat: parseFloat(randomTrip.pickUpLat),
                pickUpLong: parseFloat(randomTrip.pickUpLong),
                destLat: parseFloat(randomTrip.destLat),
                destLong: parseFloat(randomTrip.destLong),
              },
            ]);
            console.log(
              "🚀 ~ file: RiderHomeScreen.js:288 ~ fetchNewCurrentTrips ~ [randomTrip]:",
              [randomTrip]
            );
            setModalVisible(true);
          }
        );

        return () => {
          unsubscribeTrip();
        };
      } else setModalVisible(false);
    }
  };

  const getWaitingTrips = () => {
    if (open) {
      const waitingTripsQuery = query(
        collection(db, "ListTrip"),
        where("isScheduled", "==", "false"),
        where("status", "==", "waiting"),
        where("idRider", "==", "")
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
        setWaitingTrips(updatedTrips);
      });

      return () => {
        unsubscribeTrip();
      };
    } else {
      setWaitingTrips([]);
    }
  };

  const getFinishedTrips = () => {
    const finishedTripsQuery = query(
      collection(db, "ListTrip"),
      where("idRider", "==", phoneNumber),
      where("status", "==", "done"),
      where("isScheduled", "==", "false")
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

  const getCanceledTrips = () => {
    const canceledTripsQuery = query(
      collection(db, "ListTrip"),
      where("idRider", "==", phoneNumber),
      where("status", "==", "canceled"),
      where("isScheduled", "==", "false")
    );
    const unsubscribeTrip = onSnapshot(canceledTripsQuery, (querySnapshot) => {
      const updatedTrips = [];
      querySnapshot.forEach((doc) => {
        const trip = {
          key: doc.id,
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
            setSelectedTrip({
              ...item,
              pickUpLat: parseFloat(item.pickUpLat),
              pickUpLong: parseFloat(item.pickUpLong),
              destLat: parseFloat(item.destLat),
              destLong: parseFloat(item.destLong),
            });
            setIsModalVisible(true);
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
              isRead: true,
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

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "first", title: t("available") },
    { key: "second", title: t("finished") },
    { key: "third", title: t("canceled") },
  ]);
  const handleStatusReject = () => {
    setCount(true);
    setModalVisible(false); // Đóng modal

    // Random một document mới
    const randomIndex = Math.floor(Math.random() * randomTrips.length);
    const randomTrip = randomTrips[randomIndex];

    // Cập nhật document mới vào state hoặc thực hiện xử lý khác
    setNewCurrentTrips([randomTrip]);
  };
  return (
    <NativeBaseProvider>
      <VStack paddingTop={"20px"} bgColor={COLORS.background}>
        <SafeAreaView>
          <VStack h={"100%"}>
            {isModalVisible &&
              newCurrentTrips.length > 0 &&
              isReady &&
              open && (
                <Modal
                  alignSelf={"center"}
                  w={"90%"}
                  isOpen={isModalVisible}
                  size="lg"
                  overlayVisible={true}
                  backdropPressBehavior="none"
                >
                  <View borderTopRadius={"20px"} w={"100%"} h={"20%"}>
                    <MapView
                      style={{
                        width: "100%",
                        height: "130%",
                        borderRadius: 20,
                      }}
                      provider="google"
                      region={{
                        ...calculateMapDelta(
                          {
                            latitude: newCurrentTrips[0].destLat,
                            longitude: newCurrentTrips[0].destLong,
                          },
                          {
                            latitude: newCurrentTrips[0].pickUpLat,
                            longitude: newCurrentTrips[0].pickUpLong,
                          },
                          60
                        ),
                        latitude: newCurrentTrips[0]
                          ? (newCurrentTrips[0].destLat +
                              newCurrentTrips[0].pickUpLat) /
                            2
                          : 0, // get center latitude to zoom
                        longitude: newCurrentTrips[0]
                          ? (newCurrentTrips[0].destLong +
                              newCurrentTrips[0].pickUpLong) /
                            2
                          : 0, // get center longitude to zoom
                      }}
                    >
                      <Marker
                        identifier="pickUp"
                        key={"pickUp"}
                        coordinate={{
                          latitude: newCurrentTrips[0]
                            ? newCurrentTrips[0].pickUpLat
                            : 0,
                          longitude: newCurrentTrips[0]
                            ? newCurrentTrips[0].pickUpLong
                            : 0,
                        }}
                        title={"Pick up"}
                        description={
                          newCurrentTrips[0]
                            ? newCurrentTrips[0].pickUpAddress
                            : ""
                        }
                      />
                      <Marker
                        identifier="destination"
                        key={"destination"}
                        coordinate={{
                          latitude: newCurrentTrips[0]
                            ? newCurrentTrips[0].destLat
                            : 0,
                          longitude: newCurrentTrips[0]
                            ? newCurrentTrips[0].destLong
                            : 0,
                        }}
                        title={"Destination"}
                        description={
                          newCurrentTrips[0]
                            ? newCurrentTrips[0].destAddress
                            : 0
                        }
                      />
                    </MapView>
                  </View>
                  <PopUpRequestCard
                    trip={newCurrentTrips[0]}
                    setIsRiderReceived={setIsRiderReceived}
                    randomTrips={randomTrips} // Truyền giá trị randomTrips vào
                    setNewCurrentTrips={setNewCurrentTrips} // Truyền hàm setNewCurrentTrips để cập nhật state
                    navigation={navigation}
                    handleStatusReject={handleStatusReject}
                    count={isCount}
                    // setCount={setCount}
                    phoneNumber={phoneNumber}
                  ></PopUpRequestCard>
                </Modal>
              )}
            {modalVisible && (
              <Modal
                alignSelf={"center"}
                w={"90%"}
                isOpen={modalVisible}
                size="lg"
                overlayVisible={true}
                backdropPressBehavior="none"
              >
                <View borderTopRadius={"20px"} w={"100%"} h={"20%"}>
                  <MapView
                    style={{
                      width: "100%",
                      height: "130%",
                      borderRadius: 20,
                    }}
                    provider="google"
                    region={{
                      ...calculateMapDelta(
                        {
                          latitude: selectedTrip.destLat,
                          longitude: selectedTrip.destLong,
                        },
                        {
                          latitude: selectedTrip.pickUpLat,
                          longitude: selectedTrip.pickUpLong,
                        },
                        60
                      ),
                      latitude: selectedTrip
                        ? (selectedTrip.destLat + selectedTrip.pickUpLat) / 2
                        : 0, // get center latitude to zoom
                      longitude: selectedTrip
                        ? (selectedTrip.destLong + selectedTrip.pickUpLong) / 2
                        : 0, // get center longitude to zoom
                    }}
                  >
                    <Marker
                      identifier="pickUp"
                      key={"pickUp"}
                      coordinate={{
                        latitude: selectedTrip ? selectedTrip.pickUpLat : 0,
                        longitude: selectedTrip ? selectedTrip.pickUpLong : 0,
                      }}
                      title={"Pick up"}
                      description={
                        selectedTrip ? selectedTrip.pickUpAddress : ""
                      }
                    />
                    <Marker
                      identifier="destination"
                      key={"destination"}
                      coordinate={{
                        latitude: selectedTrip ? selectedTrip.destLat : 0,
                        longitude: selectedTrip ? selectedTrip.destLong : 0,
                      }}
                      title={"Destination"}
                      description={selectedTrip ? selectedTrip.destAddress : 0}
                    />
                  </MapView>
                </View>
                <WaitingForRiderCard
                  trip={selectedTrip}
                  setIsRiderReceived={setIsRiderReceived}
                  navigation={navigation}
                  setIsModalVisible={setIsModalVisible}
                  phoneNumber={phoneNumber}
                ></WaitingForRiderCard>
              </Modal>
            )}
            <VStack paddingX={"10px"}>
              <HStack w={"100%"} mb={10}>
                <Avatar source={{ uri: avt }} alt="ava" />
                <VStack justifyContent={"center"} ml={3}>
                  <Text fontSize={10} color={COLORS.grey}>
                    Welcome back
                  </Text>
                  <Text fontSize={SIZES.h4} color={COLORS.white} bold>
                    {name}
                  </Text>
                </VStack>
                <HStack position={"absolute"} right={0} alignItems={"center"}>
                  <Button variant={"unstyled"} onPress={() => openCamera()}>
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

function checkValueIsSet(value) {
  return value ? value : 0; // 0 is default value for long lat
}

export default RiderHomeScreen;
