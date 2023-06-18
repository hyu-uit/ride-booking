import React, { useRef } from "react";
import styled from "styled-components";
import { COLORS, SIZES } from "../../constants/theme";
import { Button, Center, HStack, Image, Text, VStack, View } from "native-base";
import { SafeAreaView } from "react-native-safe-area-context";
import MapView, { Marker, Polyline } from "react-native-maps";
import { Keyboard, TouchableWithoutFeedback } from "react-native";
import LocationCardWithChange from "../../components/LocationCard/LocationCardWithChange";
import SelectedButton from "../../components/Button/SelectedButton";
import LocationCardTime from "../../components/LocationCard/LocationCard.Time";
import LocationCardCost from "../../components/LocationCard/LocationCard.Cost";
import LocationCardNote from "../../components/LocationCard/LocationCard.Note";
import LocationCardPayment from "../../components/LocationCard/LocationCard.Payment";
import LocationCardFinder from "../../components/LocationCard/LocationCard.Finder";
import ConfirmModal from "../../components/Modal/ConfirmModal";
import ButtonBack from "../../components/Global/ButtonBack/ButtonBack";
import FlagIcon from "../../assets/icons/icons8-flag-filled-48.png";
import { addDoc, collection } from "@firebase/firestore";
import { db } from "../../config/config";
import {
  centerMapToCoordinates,
  fetchCurrentUserLocation,
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
import { AutocompleteDropdownContextProvider } from "react-native-autocomplete-dropdown";
import { ceilingKilometer, ceilingMinute } from "../../helper/converter";
import { useTranslation } from "react-i18next";
import { Dimensions } from "react-native";

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

  useEffect(() => {
    fetchCurrentUserLocation()
      .then(({ latitude, longitude }) => {
        console.log(
          "🚀 ~ file: BookingScreen.js:60 ~ .then ~ latitude, longitude:",
          latitude,
          longitude
        );

        dispatch({
          type: SET_INITIAL_LOCATION,
          payload: { latitude, longitude },
        });

        getSingleAddressFromCoordinate(latitude, longitude)
          .then((value) => {
            console.log(
              "🚀 ~ file: BookingScreen.js:68 ~ .then ~ value.formatted:",
              value.formatted
            );
            dispatch({
              type: SET_PICK_UP_LOCATION,
              payload: {
                name: "Your location",
                address: value.formatted,
                latitude,
                longitude,
              },
            });
            setMarkerPosition({
              name: "Your location",
              address: value.formatted,
              latitude,
              longitude,
            });
          })
          .catch((err) => {
            console.log("🚀 ~ file: BookingScreen.js:88 ~ .then ~ err:", err);
          });
      })
      .catch((err) => {
        console.log("🚀 ~ file: BookingScreen.js:90 ~ useEffect ~ err:", err);
      });
  }, []);

  useEffect(() => {
    // in map step 2 zoom to the pick up or destination according to the input
    if (booking.step === 2) {
      if (focusInput === PICK_UP_INPUT)
        dispatch({
          type: SET_INITIAL_LOCATION,
          payload: {
            latitude: booking.pickUpLocation.latitude,
            longitude: booking.pickUpLocation.longitude,
            latitudeDelta: 0.01, //zoom
            longitudeDelta: 0.01, //zoom
          },
        });
      else
        dispatch({
          type: SET_INITIAL_LOCATION,
          payload: {
            latitude: booking.destinationLocation.latitude,
            longitude: booking.destinationLocation.longitude,
            latitudeDelta: 0.01, //zoom
            longitudeDelta: 0.01, //zoom
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

  const chooseFromMapHandler = () => {
    setStep(2);
  };

  const hanldeConfirmFromMap = () => {
    if (focusInput === DESTINATION_INPUT) {
      //pick up is already set from useEffect on first render or base on default address of user
      if (checkLocationIsSet(markerPosition)) {
        setDestinationInput(
          markerPosition.address ? markerPosition.address : markerPosition.name
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

            if (mapRef.current) {
              centerMapToCoordinates(
                mapRef,
                booking.pickUpLocation,
                markerPosition
              );
            }

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
            console.log("🚀 ~ file: BookingScreen.js:192 ~ .then ~ distance:", {
              distance: ceilingKilometer(distance),
              time: ceilingMinute(time),
              price: calculatePrice(Math.ceil(distance / 1000)),
            });

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
        markerPosition.address ? markerPosition.address : markerPosition.name
      );
      dispatch({
        type: SET_PICK_UP_LOCATION,
        payload: { ...markerPosition },
      });
      setFocusInput(DESTINATION_INPUT);
    }
    setStep(1);
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

  const handleStep5Submit = () => {
    // Do any necessary form validation or error checking here
    setStep(6);
  };
  const createOrder = async () => {
    const currentDate = new Date();
    const currentDay = currentDate.getDate();
    const currentMonth = currentDate.getMonth() + 1;
    const currentYear = currentDate.getFullYear();
    const currentHour = currentDate.getHours();
    const currentMinute = currentDate.getMinutes();

    addDoc(collection(db, "ListTrip"), {
      idCustomer: "0393751403",
      pickUpLat: "",
      pickUpLong: "",
      destLat: "",
      destLong: "",
      //nếu mà ngày đón không phải hôm nay thì isScheduled = true
      isScheduled: "false",
      datePickUp: "" + currentDay + "/" + currentMonth + "/" + currentYear,
      timePickUp: "" + currentHour + ":" + currentMinute,
      date: "" + currentDay + "/" + currentMonth + "/" + currentYear,
      time: "" + currentHour + ":" + currentMinute,
      distance: "4km",
      totalPrice: "55000",
      status: "waiting",
    });
    //upload image to firebase storage
  };
  const handleStep6Submit = (note) => {
    console.log(
      "🚀 ~ file: BookingScreen.js:267 ~ handleStep6Submit ~ note:",
      note
    );
    dispatch({ type: SET_BOOKING_DETAILS, payload: { note } });
    // Do any necessary form validation or error checking here
    //createOrder();

    setStep(7);
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
                <HStack space={2} marginTop={2} marginLeft={3} marginRight={3}>
                  <SelectedButton text={"Home"} />
                  <SelectedButton text={"School"} />
                  <SelectedButton text={"Hotel"} />
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
                onPress={hanldeConfirmFromMap}
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
              style={{ height: "45%", borderRadius: 10 }}
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
            />
          </>
        );
      case 4:
        return (
          <>
            <MapView
              ref={mapRef}
              style={{ height: "45%", borderRadius: 10 }}
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
              style={{ height: "45%", borderRadius: 10 }}
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
              style={{ height: "45%", borderRadius: 10 }}
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
            <LocationCardNote
              onClickContinue={handleStep6Submit}
              onPressBack={handleBackStep}
            />
          </>
        );

      case 7:
        return (
          <>
            <MapView
              ref={mapRef}
              style={{ height: "45%", borderRadius: 10 }}
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
              onPressCancel={() => navigation.navigate("BookingDriver")}
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
      {renderStepContent()}
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
    if (step === 1) return navigation.navigate("Home");
    setStep((prev) => prev - 1);
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
