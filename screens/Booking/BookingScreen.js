import React, { useRef } from "react";
import styled from "styled-components";
import { COLORS, FONTS, SIZES } from "../../constants/theme";
import {
  Button,
  Center,
  FlatList,
  HStack,
  Image,
  Skeleton,
  Spinner,
  Text,
  VStack,
  View,
} from "native-base";
import { SafeAreaView } from "react-native-safe-area-context";
import MapView, { Marker, Polyline } from "react-native-maps";
import { Alert, Keyboard, TouchableWithoutFeedback } from "react-native";
import LocationCardWithChange from "../../components/LocationCard/LocationCardWithChange";
import SelectedButton from "../../components/Button/SelectedButton";
import LocationCardTime from "../../components/LocationCard/LocationCard.Time";
import LocationCardCost from "../../components/LocationCard/LocationCard.Cost";
import LocationCardPayment from "../../components/LocationCard/LocationCard.Payment";
import LocationCardFinder from "../../components/LocationCard/LocationCard.Finder";
import ConfirmModal from "../../components/Modal/ConfirmModal";
import ButtonBack from "../../components/Global/ButtonBack/ButtonBack";
import FlagIcon from "../../assets/icons/icons8-flag-filled-48.png";
import {
  addDoc,
  getDocs,
  collection,
  query,
  deleteDoc,
  doc,
  where,
  onSnapshot,
} from "@firebase/firestore";
import { db } from "../../config/config";
import {
  checkUserLocationEnable,
  fetchCurrentUserLocation,
  getLocation,
} from "../../helper/location";
import {
  getRoutingFromCoordinates,
  getSingleAddressFromCoordinate,
} from "../../api/locationAPI";
import {
  BookingContext,
  SET_BOOKING_DETAILS,
  SET_DESTINATION_LOCATION,
  SET_INITIAL_LOCATION,
  SET_PICK_UP_LOCATION,
  SET_ROUTING,
  SET_SHOW_MODAL_CANCEL,
} from "../../context/BookingContext";
import { useContext } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { ceilingKilometer, ceilingMinute } from "../../helper/converter";
import { useTranslation } from "react-i18next";
import { Dimensions } from "react-native";
import { getFromAsyncStorage } from "../../helper/asyncStorage";
import { Ionicons } from "@expo/vector-icons";
import { convertToDate, convertToTime } from "../../helper/moment";
import { VietQR } from "vietqr";

const vietQR = new VietQR({
  clientID: "de8a0804-a76d-41e5-8ad6-31503ce7d5f4",
  apiKey: "17c29f09-4ea2-4417-b9c2-7f020d35de42",
});

export const PICK_UP_INPUT = "PICK_UP_INPUT";
export const DESTINATION_INPUT = "DESTINATION_INPUT";
const contentHeight = Dimensions.get("window").height;

export default function BookingScreen({ navigation }) {
  const { booking, dispatch, calculatePrice } = useContext(BookingContext);
  const [focusInput, setFocusInput] = useState(DESTINATION_INPUT);
  const mapRef = useRef(null);
  // sometimes name is unavailable in respond body so using address instead
  const [markerPosition, setMarkerPosition] = useState({
    name: null,
    address: "",
    latitude: 10.8700089,
    longitude: 106.8030541,
  });
  const [step, setStep] = useState(1);
  const [pickUpInput, setPickUpInput] = useState("Your location");
  const [destinationInput, setDestinationInput] = useState("");
  const [routing, setRouting] = useState([]);
  const [locations, setLocations] = useState([]);
  const [selectedDate, setSelectedDate] = useState(convertToDate(Date.now()));
  const [selectedTime, setSelectedTime] = useState(convertToTime(Date.now()));
  const [phoneNumber, setPhoneNumber] = useState([]);
  const [idTrip, setIDTrip] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalRequestLocation, setIsModalRequestLocation] = useState(false);
  const [qrUrl, setQrUrl] = useState(null);

  useEffect(() => {
    // vietQR
    //   .getBanks()
    //   .then((banks) => {
    //     console.log(banks);
    //   })
    //   .catch((err) => {});

    vietQR
      .genQRCodeBase64({
        bank: "970436",
        accountName: "HUYNH THE VI",
        accountNumber: "0091000682102",
        amount: "10000",
        memo: "Ride booking",
        template: "compact",
      })
      .then((data) => {
        console.log(data.data.data.qrDataURL);
        setQrUrl(data.data.data.qrDataURL);
      })
      .catch((err) => {});
  });

  useEffect(() => {
    setIsLoading(true);
    checkUserLocationEnable()
      .then((isEnabled) => {
        if (isEnabled) {
          setCurrentUserLocation().then(({ longitude, latitude }) =>
            setMarkerPosition({
              name: "Your location",
              latitude,
              longitude,
            })
          );
          setMarkerPosition({
            name: "Your location",
            latitude,
            longitude,
          });
        } else setIsModalRequestLocation((prev) => !prev);
      })
      .finally(() => setIsLoading(false));
    // to get current location every user choose ok on modal request location
  }, []);

  useEffect(() => {
    fetchDataAndPhoneNumber();
  });

  const fetchDataAndPhoneNumber = async () => {
    try {
      const phoneNumberValue = await getFromAsyncStorage("phoneNumber");
      setPhoneNumber(phoneNumberValue);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const CollectionRef = collection(db, "SavedLocation");
    const Query = query(CollectionRef, where("phoneNumber", "==", phoneNumber));
    const unsubscribeSavedLocation = onSnapshot(Query, (QuerySnapshot) => {
      const locationsTemp = [];
      QuerySnapshot.forEach((doc) => {
        locationsTemp.push(doc.data());
      });
      setLocations(locationsTemp);
    });
    return () => {
      unsubscribeSavedLocation();
    };
  }, [phoneNumber]);

  useEffect(() => {
    // reload value when in first screen
    if (step === 1)
      dispatch({
        type: SET_BOOKING_DETAILS,
        payload: {
          paymentMethod: "",
          promotion: 0,
          ratingType: "",
          date: "",
          promotionName: "",
        },
      });
    // in map step 2 zoom to the pick up or destination according to the input
    if (step === 2) {
      if (focusInput === PICK_UP_INPUT)
        dispatch({
          type: SET_INITIAL_LOCATION,
          payload: {
            latitude: booking.pickUpLocation.latitude,
            longitude: booking.pickUpLocation.longitude,
          },
        });
      else
        dispatch({
          type: SET_INITIAL_LOCATION,
          payload: {
            latitude: booking.destinationLocation.latitude,
            longitude: booking.destinationLocation.longitude,
          },
        });
    }
  }, [step]);

  useEffect(() => {
    // set marker according to which input is focus.
    if (focusInput === PICK_UP_INPUT) {
      checkLocationIsSet(booking.pickUpLocation) &&
        setMarkerPosition(booking.pickUpLocation);
    }
    if (focusInput === DESTINATION_INPUT) {
      checkLocationIsSet(booking.destinationLocation) &&
        setMarkerPosition(booking.destinationLocation);
    }
  }, [focusInput]);

  const onCancel = () => {
    Alert.alert("Are you want to cancel this trip?", "", [
      {
        text: "Cancel",
        onPress: () => {
          // props.onPressDelete(phoneNumber);
        },
      },
      {
        text: "OK",
        onPress: () => {
          const q = query(
            collection(db, "ListTrip"),
            where("idCustomer", "==", phoneNumber),
            where("status", "==", "waiting"),
            where("isScheduled", "==", "false")
          );
          const unsubscribe = onSnapshot(q, (querySnapshot) => {
            if (!querySnapshot.empty) {
              const tripId = querySnapshot.docs[0].id;
              setIDTrip(tripId);
            }
          });
          if (idTrip != "") {
            deleteDoc(doc(db, "ListTrip", booking.bookingDetails.idTrip));
            navigation.navigate("Home");
          }
          return () => unsubscribe();
        },
      },
    ]);
  };

  const chooseFromMapHandler = () => {
    //setCurrentUserLocation();
    setStep(2);
  };

  const handleConfirmFromMap = () => {
    if (focusInput === DESTINATION_INPUT)
      if (
        markerPosition.latitude === booking.pickUpLocation.latitude &&
        markerPosition.longitude === booking.pickUpLocation.longitude
      ) {
        Alert.alert("Please choose destination location", "", [
          {
            text: "OK",
            onPress: () => {},
          },
        ]);
        return;
      }
    checkUserLocationEnable().then((isEnabled) => {
      if (isEnabled) {
        if (focusInput === DESTINATION_INPUT) {
          //pick up is already set from useEffect on first render or base on default address of user
          if (checkLocationIsSet(markerPosition)) {
            setDestinationInput(
              markerPosition.address
                ? markerPosition.address
                : markerPosition.name
            );
            dispatch({
              type: SET_DESTINATION_LOCATION,
              payload: { ...markerPosition },
            });
            console.log(
              "🚀 ~ file: BookingScreen.js:170 ~ hanldeConfirmFromMap ~ booking.pickUpLocation:",
              booking.pickUpLocation
            );
            console.log(
              "🚀 ~ file: BookingScreen.js:174 ~ hanldeConfirmFromMap ~ markerPosition:",
              markerPosition
            );

            getRoutingFromCoordinates(booking.pickUpLocation, markerPosition)
              .then((routing) => {
                const { coordinates: coordinatesRouting } = routing.geometry;
                const coordinatesRoutingFormatted = coordinatesRouting[0].map(
                  ([longitude, latitude]) => ({
                    latitude,
                    longitude,
                  })
                );
                const { distance, time } = routing.properties;
                console.log(
                  "🚀 ~ file: BookingScreen.js:183 ~ .then ~ distance, time:",
                  distance,
                  time
                );

                dispatch({
                  type: SET_INITIAL_LOCATION,
                  payload: {
                    latitude: booking.pickUpLocation.latitude,
                    longitude: booking.pickUpLocation.longitude,
                  },
                });

                // save routing to use in BookingDriver, BookingRating
                dispatch({
                  type: SET_ROUTING,
                  payload: coordinatesRoutingFormatted,
                });

                dispatch({
                  type: SET_BOOKING_DETAILS,
                  payload: {
                    distance: ceilingKilometer(distance), // 1201m -> 1.3km
                    time: ceilingMinute(time),
                    price: calculatePrice(Math.ceil(distance / 1000)), // convert m to km then ceiling, 1201 -> 2km
                  },
                });
                console.log(
                  "🚀 ~ file: BookingScreen.js:192 ~ .then ~ distance:",
                  {
                    distance: ceilingKilometer(distance),
                    time: ceilingMinute(time),
                    price: calculatePrice(Math.ceil(distance / 1000)),
                  }
                );

                setRouting(coordinatesRoutingFormatted);
                setStep(3);
              })
              .catch((err) =>
                console.log(
                  "🚀 ~ file: BookingScreen.js:156 ~ useEffect ~ err:",
                  err
                )
              );
            return;
          }
        }
        if (focusInput === PICK_UP_INPUT) {
          setPickUpInput(
            markerPosition.address
              ? markerPosition.address
              : markerPosition.name
          );
          dispatch({
            type: SET_PICK_UP_LOCATION,
            payload: { ...markerPosition },
          });
          setFocusInput(DESTINATION_INPUT);
        }
        setStep(1);
      } else setIsModalRequestLocation(true);
    });
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleTimeChange = (time) => {
    setSelectedTime(time);
  };
  const handleStep3Submit = (date) => {
    console.log(
      "🚀 ~ file: BookingScreen.js:240 ~ handleStep3Submit ~ date:",
      date
    );
    // Do any necessary form validation or error checking here
    dispatch({ type: SET_BOOKING_DETAILS, payload: { date } });
    setStep(4);
  };

  const handleStep4Submit = (paymentMethod) => {
    console.log(
      "🚀 ~ file: BookingScreen.js:252 ~ handleStep4Submit ~ paymentMethod:",
      paymentMethod
    );
    // Do any necessary form validation or error checking here
    dispatch({
      type: SET_BOOKING_DETAILS,
      payload: { paymentMethod: paymentMethod },
    });
    setStep(5);
  };

  const createOrder = () => {
    const currentDate = convertToDate(Date.now());
    const currentTime = convertToTime(Date.now());
    let scheduled = "false";
    if (currentDate != selectedDate) {
      scheduled = "true";
    }

    let price = booking.bookingDetails.price - booking.bookingDetails.promotion;
    if (price <= 0) price = 0;
    return addDoc(collection(db, "ListTrip"), {
      idCustomer: phoneNumber,
      idRider: "",
      pickUpLat: booking.pickUpLocation.latitude,
      pickUpLong: booking.pickUpLocation.longitude,
      destLat: booking.destinationLocation.latitude,
      destLong: booking.destinationLocation.longitude,
      destAddress: booking.destinationLocation.address,
      pickUpAddress: booking.pickUpLocation.address,
      //nếu mà ngày đón không phải hôm nay thì isScheduled = true
      isScheduled: scheduled,
      est: booking.bookingDetails.time,
      datePickUp: selectedDate,
      timePickUp: selectedTime,
      date: currentDate,
      time: currentTime,
      distance: booking.bookingDetails.distance + "km",
      totalPrice: price,
      discount: booking.bookingDetails.promotion,
      status: "waiting",
      idRiderCancel: "",
    });
  };
  const handleStep5Submit = () => {
    // Do any necessary form validation or error checking here
    if (booking.bookingDetails.isScheduled === false) {
      createOrder().then((docRef) => {
        console.log(
          "🚀 ~ file: BookingScreen.js:388 ~ createOrder ~ docRef:",
          docRef
        );
        dispatch({ type: SET_BOOKING_DETAILS, payload: { idTrip: docRef.id } });
        setStep(6);
      });
    } else {
      createOrder().then((docRef) => {
        console.log(
          "🚀 ~ file: BookingScreen.js:388 ~ createOrder ~ docRef:",
          docRef
        );
        dispatch({ type: SET_BOOKING_DETAILS, payload: { idTrip: docRef.id } });
      });
      Alert.alert("Successfully booked", "", [
        {
          text: "OK",
          onPress: () => {
            navigation.replace("Home");
            // props.onPressDelete(phoneNumber);
          },
        },
      ]);
    }
    // setIDTrip(id)
  };

  const handleCloseModal = () => {
    // Do any necessary form validation or error checking here
    dispatch({ type: SET_SHOW_MODAL_CANCEL, payload: false });
  };

  const handleMarkerDragEnd = (e) => {
    const { latitude, longitude } = e.nativeEvent.coordinate;
    getSingleAddressFromCoordinate(latitude, longitude)
      .then((value) => {
        setMarkerPosition({
          latitude,
          longitude,
          name: value.name ? value.name : value.formatted,
          address: value.formatted,
        });
      })
      .catch((err) => {
        console.log(
          "🚀 ~ file: BookingScreen.js:240 ~ handleMarkerDragEnd ~ err:",
          err
        );
        return;
      });
  };

  const renderItem = ({ item, index }) => {
    function onPress() {
      const { phoneNumber, ...resCoords } = item;
      if (focusInput === PICK_UP_INPUT) {
        setPickUpInput(item.add);
        dispatch({
          type: SET_PICK_UP_LOCATION,
          payload: {
            name: item.name,
            address: item.address,
            latitude: parseFloat(item.lat),
            longitude: parseFloat(item.long),
          },
        });
      } else {
        setDestinationInput(item.address);
        dispatch({
          type: SET_DESTINATION_LOCATION,
          payload: {
            name: item.name,
            address: item.address,
            latitude: parseFloat(item.lat),
            longitude: parseFloat(item.long),
          },
        });
      }

      dispatch({
        type: SET_INITIAL_LOCATION,
        payload: {
          latitude: parseFloat(item.lat),
          longitude: parseFloat(item.long),
        },
      });

      setMarkerPosition({
        address: item.address,
        latitude: parseFloat(item.lat),
        longitude: parseFloat(item.long),
        name: item.name,
      });
      setStep(2);
    }

    if (index === locations.length - 1) {
      // Last item in the list
      return (
        <HStack>
          <SelectedButton location={item} onPress={onPress} />
          <Button
            style={{ backgroundColor: COLORS.primary }}
            onPress={() => {
              navigation.navigate("AddLocation");
            }}
          >
            <HStack justifyContent={"center"} alignItems={"center"}>
              <Ionicons
                name="add-circle-outline"
                size={20}
                color={COLORS.white}
                style={{ marginRight: 10 }}
              />
              <Text bold style={{ ...FONTS.h5, color: COLORS.white }}>
                Add
              </Text>
            </HStack>
          </Button>
        </HStack>
      );
    }

    // Regular items in the list
    return <SelectedButton location={item} onPress={onPress} />;
  };

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <>
            <TouchableWithoutFeedback
              onPress={() => {
                Keyboard.dismiss();
              }}
              style={{ display: "flex" }}
            >
              <VStack flex={1}>
                {/* <Image
                  source={{ uri: qrUrl }}
                  alt="qr"
                  height={100}
                  w={100}
                  bgColor={COLORS.red}
                ></Image> */}
                <LocationCardWithChange
                  setFocusInput={setFocusInput}
                  setPickUpInput={setPickUpInput}
                  setDestinationInput={setDestinationInput}
                  pickUpInput={pickUpInput}
                  desInput={destinationInput}
                  setStep={setStep}
                  setMarker={setMarkerPosition}
                />
                <HStack space={2} marginTop={3} marginLeft={3} marginRight={3}>
                  <Image
                    width={"25px"}
                    height={"25px"}
                    source={FlagIcon}
                    alt="flag-icon"
                  />
                  <Text bold fontSize={SIZES.h5} color={"white"}>
                    {t("savedLocations")}
                  </Text>
                </HStack>
                <HStack mx={"10px"} mt={2} alignItems={"center"}>
                  <FlatList
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    data={locations}
                    keyExtractor={(item) => item.name}
                    renderItem={renderItem}
                  ></FlatList>
                </HStack>
                <Center w={"100%"} marginTop={"auto"} marginBottom={3}>
                  <Button
                    w={"90%"}
                    borderRadius={10}
                    bgColor={COLORS.primary}
                    onTouchEnd={chooseFromMapHandler}
                    mb={5}
                  >
                    <Text fontSize={SIZES.h5} bold color={"white"}>
                      {focusInput === PICK_UP_INPUT
                        ? "Choose pick up from map "
                        : "Choose destination from map "}
                    </Text>
                  </Button>
                </Center>
              </VStack>
            </TouchableWithoutFeedback>
          </>
        );
      case 2:
        return (
          <>
            <MapView
              ref={mapRef}
              style={{ flex: 1, borderRadius: 10, marginTop: 10 }}
              provider="google"
              region={booking.region}
            >
              <Marker
                key={"your-location"}
                coordinate={markerPosition}
                title={
                  markerPosition.name ? markerPosition.name : "Your location"
                }
                description={
                  markerPosition.address ? markerPosition.address : null
                }
                draggable={true}
                onPress={(e) => e.stopPropagation()}
                onDragEnd={handleMarkerDragEnd}
                isPreselected={true}
              />
            </MapView>
            <Center
              w={"100%"}
              marginTop={"auto"}
              position={"absolute"}
              bottom={10}
            >
              <Button
                w={"90%"}
                borderRadius={10}
                bgColor={COLORS.primary}
                onPress={handleConfirmFromMap}
                mb={8}
              >
                <Text fontSize={SIZES.h5} bold color={"white"}>
                  {focusInput === PICK_UP_INPUT
                    ? "Confirm pick up"
                    : "Confirm destination"}
                </Text>
              </Button>
            </Center>
          </>
        );
      case 3:
        return (
          <>
            <MapView
              ref={mapRef}
              style={{ height: "50%", borderRadius: 10 }}
              provider="google"
              region={booking.region}
            >
              <Marker
                identifier="pickUp"
                key={"pickUp"}
                coordinate={booking.pickUpLocation}
                title={"Pick up"}
                description={
                  booking.pickUpLocation.address
                    ? booking.pickUpLocation.address
                    : null
                }
              ></Marker>
              <Marker
                identifier="pickUp"
                key={"destination"}
                coordinate={booking.destinationLocation}
                title={"Destination"}
                description={
                  booking.destinationLocation.address
                    ? booking.destinationLocation.address
                    : null
                }
              />
              {routing ? (
                <Polyline
                  coordinates={routing}
                  strokeWidth={5}
                  strokeColor="blue"
                />
              ) : null}
            </MapView>
            <LocationCardTime
              onClickContinue={handleStep3Submit}
              onPressBack={handleBackStep}
              selectedDate={selectedDate}
              // setSelectedDate={setSelectedDate}
              selectedTime={selectedTime}
              // setSelectedTime={setSelectedTime}
              onDateChange={handleDateChange}
              onTimeChange={handleTimeChange}
            />
          </>
        );
      case 4:
        return (
          <>
            <MapView
              ref={mapRef}
              style={{ height: "50%", borderRadius: 10 }}
              provider="google"
              region={booking.region}
            >
              <Marker
                key={"pickUp"}
                coordinate={booking.pickUpLocation}
                title={"Pick up"}
                description={
                  booking.pickUpLocation.address
                    ? booking.pickUpLocation.address
                    : null
                }
              ></Marker>
              <Marker
                key={"destination"}
                coordinate={booking.destinationLocation}
                title={"Destination"}
                description={
                  booking.destinationLocation.address
                    ? booking.destinationLocation.address
                    : null
                }
              />
              {routing ? (
                <Polyline
                  coordinates={routing}
                  strokeWidth={5}
                  strokeColor="blue"
                />
              ) : null}
            </MapView>
            <LocationCardPayment
              onClickContinue={handleStep4Submit}
              onPressBack={handleBackStep}
            />
          </>
        );
      case 5:
        return (
          <>
            <MapView
              ref={mapRef}
              style={{ height: "50%", borderRadius: 10 }}
              provider="google"
              region={booking.region}
            >
              <Marker
                key={"pickUp"}
                coordinate={booking.pickUpLocation}
                title={"Pick up"}
                description={
                  booking.pickUpLocation.address
                    ? booking.pickUpLocation.address
                    : null
                }
              ></Marker>
              <Marker
                key={"destination"}
                coordinate={booking.destinationLocation}
                title={"Destination"}
                description={
                  booking.destinationLocation.address
                    ? booking.destinationLocation.address
                    : null
                }
              />
              {routing ? (
                <Polyline
                  coordinates={routing}
                  strokeWidth={5}
                  strokeColor="blue"
                />
              ) : null}
            </MapView>
            <LocationCardCost
              onClickContinue={handleStep5Submit}
              onPressBack={handleBackStep}
            />
          </>
        );
      case 6:
        return (
          <>
            <MapView
              ref={mapRef}
              style={{ height: "50%", borderRadius: 10 }}
              provider="google"
              region={booking.region}
            >
              <Marker
                key={"pickUp"}
                coordinate={booking.pickUpLocation}
                title={"Pick up"}
                description={
                  booking.pickUpLocation.address
                    ? booking.pickUpLocation.address
                    : null
                }
              ></Marker>
              <Marker
                key={"destination"}
                coordinate={booking.destinationLocation}
                title={"Destination"}
                description={
                  booking.destinationLocation.address
                    ? booking.destinationLocation.address
                    : null
                }
              />
              {routing ? (
                <Polyline
                  coordinates={routing}
                  strokeWidth={5}
                  strokeColor="blue"
                />
              ) : null}
            </MapView>
            <LocationCardFinder
              phoneNumber={phoneNumber}
              navigation={navigation}
              onPressCancel={onCancel}
            />
          </>
        );

      default:
        return null;
    }
  };

  const { t } = useTranslation();

  return (
    <BookingContainer bgColor={COLORS.background}>
      {step === 1 ? (
        <View paddingX={"10px"}>
          <ButtonBack onPress={handleBackStep} />
        </View>
      ) : null}
      {step === 2 ? (
        <View paddingX={"10px"} position={"absolute"} top={"8%"} zIndex={2}>
          <ButtonBack onPress={handleBackStep} />
        </View>
      ) : null}
      {isLoading ? (
        <VStack w="100%" h={"100%"} borderWidth="1" space={8} rounded="md">
          <Skeleton h="40" rounded="md" />
          <Skeleton.Text px="4" />
          <Skeleton
            position={"absolute"}
            bottom={10}
            px="4"
            my="4"
            rounded="md"
            startColor="primary.100"
          />
          <Spinner
            position={"absolute"}
            top={"1/2"}
            left={"1/2"}
            color="emerald.500"
            size={"lg"}
          />
        </VStack>
      ) : (
        renderStepContent()
      )}
      {/* modal request location */}
      <ConfirmModal
        isShow={isModalRequestLocation}
        title={"Enable location"}
        content={"Please enable location to use this feature."}
        onClose={() => navigation.navigate("Home")}
        onPressOK={() => {
          setIsModalRequestLocation((prev) => !prev);
        }}
      />
      <ConfirmModal
        isShow={booking.isModalCancelShow}
        title={"Cancel booking"}
        content={"Are you sure that you want to cancel this booking?"}
        onClose={handleCloseModal}
        onPressOK={handleCloseModal}
      />
    </BookingContainer>
  );

  function handleBackStep() {
    console.log("back step");
    if (step === 1) return navigation.navigate("Home");
    setStep((prev) => prev - 1);
  }

  function setCurrentUserLocation() {
    return getLocation()
      .then(({ latitude, longitude }) => {
        dispatch({
          type: SET_INITIAL_LOCATION,
          payload: { latitude, longitude },
        });

        getSingleAddressFromCoordinate(latitude, longitude)
          .then((value) => {
            dispatch({
              type: SET_PICK_UP_LOCATION,
              payload: {
                name: "Your location",
                address: value.formatted,
                latitude,
                longitude,
              },
            });
          })
          .catch((err) => {
            console.log("🚀 ~ file: BookingScreen.js:88 ~ .then ~ err:", err);
          });
        return { latitude, longitude };
      })
      .catch((err) => {
        console.log("🚀 ~ file: BookingScreen.js:90 ~ useEffect ~ err:", err);
      });
  }
}

function checkLocationIsSet({ latitude, longitude }) {
  return latitude && longitude && latitude !== 0 && longitude !== 0;
}

const BookingContainer = styled(SafeAreaView)`
  width: 100%;
  height: ${Platform.OS === "ios" ? contentHeight : "100%"};
  background-color: ${(props) => props.bgColor};
  display: flex;
  padding: 0;
  flex-direction: column;
`;
