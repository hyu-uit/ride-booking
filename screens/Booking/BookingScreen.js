import React, { useReducer, usebooking } from "react";
import styled from "styled-components";
import { COLORS, SIZES } from "../../constants/theme";
import { Button, Center, HStack, Image, Text, VStack, View } from "native-base";
import { SafeAreaView } from "react-native-safe-area-context";
import MapView, { Callout, MapCallout, Marker } from "react-native-maps";
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
import { addDoc, collection, doc, setDoc } from "@firebase/firestore";
import { db } from "../../config/config";
import { fetchCurrentUserLocation } from "../../helper/location";
import { getFromAsyncStorage } from "../../helper/asyncStorage";
import { UniversityMarks } from "../../constants/location";
import Icon from "../../assets/icons/arrowRight.png";
import { getSingleAddressFromCoordinate } from "../../api/locationAPI";
import {
  BACK_STEP,
  BookingContext,
  SET_DESTINATION_LOCATION,
  SET_INITIAL_LOCATION,
  SET_PICK_UP_LOCATION,
  SET_SHOW_MODAL_CANCEL,
  SET_STEP,
} from "../../context/BookingContext";
import { useContext } from "react";
import { useState } from "react";
import { useEffect } from "react";

export const PICK_UP_INPUT = "PICK_UP_INPUT";
export const DESTINATION_INPUT = "DESTINATION_INPUT";

export default function BookingScreen({ navigation }) {
  const { booking, dispatch } = useContext(BookingContext);
  const [focusInput, setFocusInput] = useState(DESTINATION_INPUT);
  // sometimes name is unavailable in respond body so using address instead
  const [markerPosition, setMarkerPosition] = useState({
    name: null,
    address: "",
    latitude: 0,
    longitude: 0,
  });
  const [step, setStep] = useState(1);
  const [pickUpInput, setPickUpInput] = useState("Your location");
  const [destinationInput, setDestinationInput] = useState("");

  useEffect(() => {
    fetchCurrentUserLocation()
      .then(({ latitude, longitude }) => {
        dispatch({
          type: SET_INITIAL_LOCATION,
          payload: { latitude, longitude },
        });

        getSingleAddressFromCoordinate(latitude, longitude)
          .then((value) => {
            console.log(value.formatted);
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
          .catch((err) =>
            console.log("set address on first render fail" + err)
          );
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    if (booking.step > 2)
      dispatch({
        type: SET_INITIAL_LOCATION,
        payload: {
          latitude: booking.pickUpLocation.latitude,
          longitude: booking.pickUpLocation.longitude,
          latitudeDelta: 0.01, //zoom
          longitudeDelta: 0.01, //zoom
        },
      });
  }, [booking.step]);

  const chooseFromMapHandler = () => {
    setStep(2);
  };

  const hanldeConfirmFromMap = () => {
    // console.log("pick up" + JSON.stringify(booking.pickUpLocation));
    // console.log("destination" + JSON.stringify(booking.destinationLocation));

    if (focusInput === DESTINATION_INPUT) {
      //pick up is already set from useEffect on first render
      if (checkLocationIsSet(markerPosition)) {
        setDestinationInput(
          markerPosition.address ? markerPosition.address : markerPosition.name
        );
        console.log(markerPosition);
        dispatch({
          type: SET_DESTINATION_LOCATION,
          payload: { ...markerPosition },
        });
        return setStep(3);
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

  const handleStep3Submit = () => {
    // Do any necessary form validation or error checking here
    setStep(4);
  };

  const handleStep4Submit = () => {
    // Do any necessary form validation or error checking here
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
  const handleStep6Submit = () => {
    // Do any necessary form validation or error checking here
    createOrder();
    dispatch({ type: SET_STEP, payload: 7 });
  };

  const handleCloseModal = () => {
    // Do any necessary form validation or error checking here
    dispatch({ type: SET_SHOW_MODAL_CANCEL, payload: false });
  };

  const handleMarkerDragEnd = (e) => {
    const { latitude, longitude } = e.nativeEvent.coordinate;
    getSingleAddressFromCoordinate(latitude, longitude)
      .then((value) => {
        console.log(value.formatted);
        console.log(value.name);
        setMarkerPosition({
          latitude,
          longitude,
          name: value.name ? value.name : value.formatted,
          address: value.formatted,
        });
      })
      .catch((err) => console.log(err));
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
                />
                <HStack space={2} marginTop={3} marginLeft={3} marginRight={3}>
                  <Image
                    width={"25px"}
                    height={"25px"}
                    source={FlagIcon}
                    alt="flag-icon"
                  />
                  <Text bold fontSize={SIZES.h5} color={"white"}>
                    Saved location
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
              style={{ flex: 1, borderRadius: 10, marginTop: 10 }}
              provider="google"
              initialRegion={booking.region}
            >
              {/* {UniversityMarks.map((uni) => (
                <Marker
                  onPress={(event) =>
                    setMarkerPosition({
                      name: uni.name,
                      latitude: uni.coordinate.latitude,
                      longitude: uni.coordinate.longitude,
                    })
                  }
                  key={uni.name}
                  coordinate={uni.coordinate}
                  title={uni.name}
                />
              ))} */}
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
              style={{ flex: 1, borderRadius: 10, marginTop: 10 }}
              provider="google"
              initialRegion={booking.region}
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
            <LocationCardCost
              onClickContinue={handleStep4Submit}
              onPressBack={handleBackStep}
            />
          </>
        );
      case 5:
        return (
          <>
            <LocationCardNote
              onClickContinue={handleStep5Submit}
              onPressBack={handleBackStep}
            />
          </>
        );
      case 6:
        return (
          <>
            <LocationCardPayment
              onClickContinue={handleStep6Submit}
              onPressBack={handleBackStep}
            />
          </>
        );
      case 7:
        return (
          <>
            <LocationCardFinder
              onPressCancel={() => navigation.navigate("BookingDriver")}
            />
          </>
        );

      default:
        return null;
    }
  };

  return (
    <BookingContainer bgColor={COLORS.background}>
      {booking.step === 1 || booking.step === 2 ? (
        <View paddingX={"10px"}>
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
    setStep((prev) => prev - 1);
  }
}

function checkLocationIsSet({ latitude, longitude }) {
  return latitude && longitude && latitude !== 0 && longitude !== 0;
}

const BookingContainer = styled(SafeAreaView)`
  width: 100%;
  height: 100%;
  background-color: ${(props) => props.bgColor};
  display: flex;
  padding: 0;
  flex-direction: column;
`;
