import React, { useReducer, useState } from "react";
import styled from "styled-components";
import { FONTS, COLORS, SIZES } from "../constants/theme";
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
import LineImg from "../assets/Line4.png";
import LocationIcon from "../assets/icons/icons8-location-48.png";
import ArrowDownIcon from "../assets/icons/icons8-down-arrow-48.png";
import { Keyboard, TouchableWithoutFeedback } from "react-native";

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
      return { ...state, step: state.step - 1 };
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

  const handleCancel = () => {
    // Do any necessary form validation or error checking here
    dispatch({ type: "SET_SHOW_MODAL_CANCEL", payload: true });
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
            <LocationCardFinder onPressCancel={handleCancel} />
          </>
        );

      default:
        return null;
    }
  };
  //const [date, setDate] = useState(new Date(Date.now()));

  return (
    <BookingContainer bgColor={COLORS.background}>
      {state.step === 1 || state.step === 2 ? (
        <ButtonBack onPress={handleBackStep} />
      ) : null}
      {renderStepContent()}
      {/* <Modal
        isOpen={state.isModalCancelShow}
        onClose={() =>
          dispatch({ type: "SET_SHOW_MODAL_CANCEL", payload: false })
        }
      >
        <Modal.Content bgColor={COLORS.tertiary} w={"90%"}>
          <Modal.Header bgColor={COLORS.tertiary}>
            <Text fontSize={SIZES.h3} textAlign={"center"} color={"white"} bold>
              Cancel booking
            </Text>
          </Modal.Header>
          <Modal.Body>
            <Text fontSize={SIZES.body3} textAlign={"center"} color={"white"}>
              Are you sure that you want to cancel this booking?
            </Text>
          </Modal.Body>
          <Modal.Footer
            bgColor={COLORS.tertiary}
            justifyContent={"space-around"}
          >
            <Button
              bgColor={COLORS.fourthary}
              onPress={() => {
                dispatch({ type: "SET_SHOW_MODAL_CANCEL", payload: false });
              }}
              w={100}
              borderRadius={20}
            >
              <Text fontSize={SIZES.body3} textAlign={"center"} color={"white"}>
                Yes
              </Text>
            </Button>
            <Button
              bgColor={COLORS.lightGrey}
              onPress={() => {
                dispatch({ type: "SET_SHOW_MODAL_CANCEL", payload: false });
              }}
              w={100}
              borderRadius={20}
            >
              <Text fontSize={SIZES.body3} textAlign={"center"} color={"black"}>
                No
              </Text>
            </Button>
          </Modal.Footer>
        </Modal.Content>
      </Modal> */}
      <Modal
        isOpen={state.isModalCancelShow}
        onClose={() =>
          dispatch({ type: "SET_SHOW_MODAL_CANCEL", payload: false })
        }
      >
        <Modal.Content bgColor={COLORS.tertiary} w={"90%"}>
          <Modal.Header bgColor={COLORS.tertiary}>
            <Text fontSize={SIZES.h3} textAlign={"center"} color={"white"} bold>
              Information
            </Text>
          </Modal.Header>
          <Modal.Body>
            <VStack>
              <Text
                fontSize={SIZES.h4}
                textAlign={"center"}
                color={"white"}
                bold
              >
                Nguyen Tri Duck
              </Text>
              <Text
                fontSize={SIZES.h4}
                textAlign={"center"}
                color={"white"}
                bold
              >
                0123456789
              </Text>
              <HStack w={"100%"}>
                <VStack space={2}>
                  <VStack space={1}>
                    <Text bold fontSize={SIZES.h6} color={"#8CC3FF"}>
                      Pick-up
                    </Text>
                    <Text bold fontSize={SIZES.h6} color={"white"}>
                      Long An
                    </Text>
                  </VStack>
                  <Divider />
                  <VStack space={1}>
                    <Text bold fontSize={SIZES.h6} color={"#8CC3FF"}>
                      Destination
                    </Text>
                    <Text bold fontSize={SIZES.h6} color={"white"}>
                      University of Information Technology
                    </Text>
                  </VStack>
                </VStack>
                <Center marginLeft={"auto"}>
                  <Center
                    borderRadius={50}
                    width={"25px"}
                    height={"25px"}
                    bgColor={"black"}
                    marginBottom={2}
                  >
                    <Image
                      width={"20px"}
                      height={"20px"}
                      source={ArrowDownIcon}
                      alt=""
                    />
                  </Center>
                  <Image source={LineImg} alt="" marginBottom={2} />
                  <Image
                    width={"20px"}
                    height={"20px"}
                    source={LocationIcon}
                    alt=""
                  />
                </Center>
              </HStack>
            </VStack>
          </Modal.Body>
        </Modal.Content>
      </Modal>
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
