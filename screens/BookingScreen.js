import React, { useReducer, useState } from "react";
import styled from "styled-components";
import { FONTS, COLORS, SIZES } from "../constants/theme";
import { Button, Center, HStack, Image, Text, View } from "native-base";
import { SafeAreaView } from "react-native-safe-area-context";
import FlagIcon from "../assets/icons/icons8-flag-filled-48.png";
import ButtonBack from "../components/Global/ButtonBack/ButtonBack";
import LocationCardWithChange from "../components/LocationCard/LocationCardWithChange";
import MapView from "react-native-maps";
import SelectedButton from "../components/Button/SelectedButton";
import LocationCardTime from "../components/LocationCard/LocationCard.Time";
import LocationCardPayment from "../components/LocationCard/LocationCard.Payment";
import LocationCardCost from "../components/LocationCard/LocationCard.Cost";
import LocationCardNote from "../components/LocationCard/LocationCard.Note";
import LocationCardFinder from "../components/LocationCard/LocationCard.Finder";
import DateTimePicker from "@react-native-community/datetimepicker";
import { convertToFullDateTime } from "../helper/moment";

const initialState = {
  step: 1,
  location: "",
  bookingDetails: "",
  price: "",
  note: "",
  paymentMethod: "",
};

const stateReducer = (state, action) => {
  switch (action.type) {
    case "SET_STEP":
      return { ...state, step: action.payload };
    case "SET_LOCATION":
      return { ...state, location: action.payload };
    case "SET_BOOKING_DETAILS":
      return { ...state, bookingDetails: action.payload };
    case "SET_PRICE":
      return { ...state, price: action.payload };
    case "SET_NOTE":
      return { ...state, note: action.payload };
    case "SET_PAYMENT_METHOD":
      return { ...state, paymentMethod: action.payload };
    default:
      throw new Error();
  }
};

export default function BookingScreen({ navigation }) {
  const [state, dispatch] = useReducer(stateReducer, initialState);

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

  const handleStep6Submit = () => {
    // Do any necessary form validation or error checking here
    dispatch({ type: "SET_STEP", payload: 7 });
  };

  const handleStep7Submit = () => {
    // Do any necessary form validation or error checking here
    dispatch({ type: "SET_STEP", payload: 1 });
  };

  const renderStepContent = () => {
    switch (state.step) {
      case 1:
        return (
          <>
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
                onTouchEnd={(value) =>
                  dispatch({ type: "SET_STEP", payload: 2 })
                }
              >
                <Text fontSize={SIZES.h5} bold color={"white"}>
                  Choose from map
                </Text>
              </Button>
            </Center>
          </>
        );
      case 2:
        return (
          <>
            <LocationCardWithChange />
            <MapView
              style={{ flex: 1, borderRadius: 10, marginTop: 10 }}
              provider="google"
            ></MapView>
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
            <MapView
              style={{ flex: 1, borderRadius: 10, marginTop: 10 }}
              provider="google"
            ></MapView>
            <LocationCardTime onClickContinue={handleStep3Submit} />
          </>
        );
      case 4:
        return (
          <>
            <MapView
              style={{ flex: 1, borderRadius: 10, marginTop: 10 }}
              provider="google"
            ></MapView>
            <LocationCardCost onClickContinue={handleStep4Submit} />
          </>
        );
      case 5:
        return (
          <>
            <MapView
              style={{ flex: 1, borderRadius: 10, marginTop: 10 }}
              provider="google"
            ></MapView>
            <LocationCardNote onClickContinue={handleStep5Submit} />
          </>
        );
      case 6:
        return (
          <>
            <MapView
              style={{ flex: 1, borderRadius: 10, marginTop: 10 }}
              provider="google"
            ></MapView>
            <LocationCardPayment onClickContinue={handleStep6Submit} />
          </>
        );
      case 7:
        return (
          <>
            <MapView
              style={{ flex: 1, borderRadius: 10, marginTop: 10 }}
              provider="google"
            ></MapView>
            <LocationCardFinder onClickContinue={handleStep7Submit} />
          </>
        );

      default:
        return null;
    }
  };
  //const [date, setDate] = useState(new Date(Date.now()));

  return (
    <BookingContainer bgColor={COLORS.background}>
      {state.step === 1 || state.step === 2 ? <ButtonBack /> : null}
      {renderStepContent()}
    </BookingContainer>
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
