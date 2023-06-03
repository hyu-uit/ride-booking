import React, { useReducer, useState } from "react";
import styled from "styled-components";
import { COLORS, SIZES } from "../../constants/theme";
import { Button, Center, HStack, Image, Text, VStack, View } from "native-base";
import { SafeAreaView } from "react-native-safe-area-context";
import MapView, { Marker } from "react-native-maps";
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
import Geocoder from "react-native-geocoding";
import { UniversityMarks } from "../../constants/location";
import Icon from "../../assets/icons/arrowRight.png";
import { getAddressFromCoordinate } from "../../api/locationAPI";

const initialState = {
  step: 1,
  region: {
    latitude: 0, // Initial latitude
    longitude: 0, // Initial longitude
    latitudeDelta: 0.005, //zoom
    longitudeDelta: 0.005, //zoom
  },
  pickUpLocation: {
    latitude: 0, // Initial latitude
    longitude: 0, // Initial longitude
  }, // Initial user location
  destinationLocation: {
    latitude: 0, // Initial latitude
    longitude: 0, // Initial longitude
  }, // Initial user location
  bookingDetails: "",
  price: "",
  note: "",
  paymentMethod: "",
  isModalCancelShow: false,
};

const stateReducer = (state, action) => {
  switch (action.type) {
    case "SET_STEP":
      return { ...state, step: action.payload };
    case "BACK_STEP":
      if (state.step > 1) return { ...state, step: state.step - 1 };
      return { ...state, step: state.step };
    case "SET_SHOW_MODAL_CANCEL":
      return { ...state, isModalCancelShow: action.payload };
    case "SET_BOOKING_DETAILS":
      return { ...state, bookingDetails: action.payload };
    case "SET_PRICE":
      return { ...state, price: action.payload };
    case "SET_NOTE":
      return { ...state, note: action.payload };
    case "SET_PAYMENT_METHOD":
      return { ...state, paymentMethod: action.payload };
    case "SET_DESTINATION_LOCATION":
      return {
        ...state,
        destinationLocation: {
          latitude: action.payload.latitude,
          longitude: action.payload.longitude,
        },
      };
    case "SET_PICK_UP_LOCATION":
      return {
        ...state,
        pickUpLocation: {
          latitude: action.payload.latitude,
          longitude: action.payload.longitude,
        },
      };
    case "SET_INITIAL_LOCATION":
      return {
        ...state,
        region: {
          ...state.region,
          latitude: action.payload.latitude,
          longitude: action.payload.longitude,
        },
      };
    default:
      throw new Error();
  }
};

export default function BookingScreen({ navigation }) {
  const [state, dispatch] = useReducer(stateReducer, initialState);
  const [markerPosition, setMarkerPosition] = useState({
    latitude: 0,
    longitude: 0,
  });

  const chooseFromMapHandler = () => {
    // Geocoder.from(41.89, 12.49).then((json) => {
    //   console.log(json);
    //   var addressComponent = json.results[0].address_components[0];
    //   console.log(addressComponent);
    // });
    //   .catch((error) => console.warn(error));
    fetchCurrentUserLocation()
      .then(({ latitude, longitude }) => {
        console.log(latitude + " " + longitude);
        dispatch({
          type: "SET_INITIAL_LOCATION",
          payload: { latitude, longitude },
        });
        dispatch({
          type: "SET_PICK_UP_LOCATION",
          payload: { latitude, longitude },
        });
        setMarkerPosition({ latitude, longitude });
        dispatch({ type: "SET_STEP", payload: 2 });
      })
      .catch((err) => console.log(err));
  };

  const handleStep3Submit = () => {
    // Do any necessary form validation or error checking here
    dispatch({ type: "SET_STEP", payload: 4 });
  };

  const handleStep4Submit = () => {
    // Do any necessary form validation or error checking here
    dispatch({ type: "SET_STEP", payload: 5 });
  };

  const handleStep5Submit = () => {
    // Do any necessary form validation or error checking here
    dispatch({ type: "SET_STEP", payload: 6 });
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
    dispatch({ type: "SET_STEP", payload: 7 });
  };

  const handleCloseModal = () => {
    // Do any necessary form validation or error checking here
    dispatch({ type: "SET_SHOW_MODAL_CANCEL", payload: false });
  };

  const handleBackStep = () => {
    dispatch({ type: "BACK_STEP" });
  };

  const handleMarkerDrag = (e) => {
    const { latitude, longitude } = e.nativeEvent.coordinate;
    setMarkerPosition({ latitude, longitude });
  };

  const renderStepContent = () => {
    switch (state.step) {
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
                <LocationCardWithChange />
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
                      Choose from map
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
            <LocationCardWithChange />
            <MapView
              style={{ flex: 1, borderRadius: 10, marginTop: 10 }}
              provider="google"
              initialRegion={state.region}
              onPress={(e) =>
                getAddressFromCoordinate(
                  e.nativeEvent.coordinate.latitude,
                  e.nativeEvent.coordinate.longitude
                )
              }
            >
              {UniversityMarks.map((uni) => (
                <Marker
                  onPress={(event) => console.log(uni)}
                  key={uni.title}
                  coordinate={uni.coordinate}
                  title={uni.title}
                />
              ))}
              <Marker
                key={"your-location"}
                coordinate={markerPosition}
                title="Your location"
                draggable={true}
                onPress={(e) => e.stopPropagation()}
                onDragEnd={handleMarkerDrag}
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
                onTouchEnd={(value) =>
                  dispatch({ type: "SET_STEP", payload: 3 })
                }
              >
                <Text fontSize={SIZES.h5} bold color={"white"}>
                  Confirm
                </Text>
              </Button>
            </Center>
          </>
        );
      case 3:
        return (
          <>
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
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      <BookingContainer bgColor={COLORS.background}>
        {state.step === 1 || state.step === 2 ? (
          <View paddingX={"10px"}>
            <ButtonBack onPress={handleBackStep} />
          </View>
        ) : null}
        {renderStepContent()}
        <ConfirmModal
          isShow={state.isModalCancelShow}
          title={"Cancel booking"}
          content={"Are you sure that you want to cancel this booking?"}
          onClose={handleCloseModal}
          onPressOK={handleCloseModal}
        />
      </BookingContainer>
    </TouchableWithoutFeedback>
  );
}

const BookingContainer = styled(SafeAreaView)`
  width: 100%;
  height: 100%;
  background-color: ${(props) => props.bgColor};
  display: flex;
  padding: 0;
  flex-direction: column;
`;
