import React, { useReducer, useState } from "react";
import styled from "styled-components";
import { FONTS, COLORS, SIZES } from "../../constants/theme";
import {
  Button,
  Center,
  HStack,
  Image,
  Text,
  VStack,
  Modal,
  Flex,
  Divider,
} from "native-base";
import { SafeAreaView } from "react-native-safe-area-context";
import MapView from "react-native-maps";
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

const initialState = {
  step: 1,
  location: "",
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

  const handleClickCancel = () => {
    // Do any necessary form validation or error checking here
    dispatch({ type: "SET_SHOW_MODAL_CANCEL", payload: true });
  };

  const handleCloseModal = () => {
    // Do any necessary form validation or error checking here
    dispatch({ type: "SET_SHOW_MODAL_CANCEL", payload: false });
  };

  const handleBackStep = () => {
    dispatch({ type: "BACK_STEP" });
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
                    onTouchEnd={(value) =>
                      dispatch({ type: "SET_STEP", payload: 2 })
                    }
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
              style={{ flex: 1, borderRadius: 10, marginTop: 10 }}
              provider="google"
            ></MapView>
            <LocationCardCost
              onClickContinue={handleStep4Submit}
              onPressBack={handleBackStep}
            />
          </>
        );
      case 5:
        return (
          <>
            <MapView
              style={{ flex: 1, borderRadius: 10, marginTop: 10 }}
              provider="google"
            ></MapView>
            <LocationCardNote
              onClickContinue={handleStep5Submit}
              onPressBack={handleBackStep}
            />
          </>
        );
      case 6:
        return (
          <>
            <MapView
              style={{ flex: 1, borderRadius: 10, marginTop: 10 }}
              provider="google"
            ></MapView>
            <LocationCardPayment
              onClickContinue={handleStep6Submit}
              onPressBack={handleBackStep}
            />
          </>
        );
      case 7:
        return (
          <>
            <MapView
              style={{ flex: 1, borderRadius: 10, marginTop: 10 }}
              provider="google"
            ></MapView>
            <LocationCardFinder onPressCancel={handleClickCancel} />
          </>
        );

      default:
        return null;
    }
  };

  return (
    <BookingContainer bgColor={COLORS.background}>
      {state.step === 1 || state.step === 2 ? (
        <ButtonBack onPress={handleBackStep} />
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
