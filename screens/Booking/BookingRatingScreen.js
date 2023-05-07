import React from "react";
import { useReducer } from "react";
import RatingPopup from "../../components/RatingPopup";
import styled from "styled-components";
import { SafeAreaView } from "react-native-safe-area-context";
import MapView from "react-native-maps";

const NotYetRated = {
  isGroupButtonShow: false,
  buttonText: "Skip",
};

const IsRating = {
  isGroupButtonShow: true,
  buttonText: "Send",
};
const Rated = {
  isGroupButtonShow: false,
  buttonText: "Go back",
};

const initialState = {
  step: 1,
};

const SET_STEP_ACTION = "SET_STEP";
// const SET_IS_GROUP_BUTTON_SHOW_ACTION = "SET_IS_GROUP_BUTTON_SHOW";
// const SET_BUTTON_TEXT_ACTION = "SET_BUTTON_TEXT";
// const SET_ON_PRESS_BUTTON = "SET_ON_PRESS_BUTTON";

const stateReducer = (state, action) => {
  switch (action.type) {
    case SET_STEP_ACTION:
      return { ...state, step: action.payload };
    // case SET_IS_GROUP_BUTTON_SHOW_ACTION:
    //   return { ...state, isGroupButtonShow: action.payload };
    // case SET_BUTTON_TEXT_ACTION:
    //   return { ...state, buttonText: action.payload };
    // case SET_ON_PRESS_BUTTON:
    //   return { ...state, onPressButton: action.payload };
    default:
      throw new Error();
  }
};

const BookingRatingScreen = () => {
  const [state, dispatch] = useReducer(stateReducer, initialState);

  const handleStep1Button = () => {
    // Do any necessary form validation or error checking here
    dispatch({ type: "SET_STEP", payload: 2 });
  };
  const handleStep2Button = () => {
    // Do any necessary form validation or error checking here
    dispatch({ type: "SET_STEP", payload: 3 });
  };
  const handleStep3Button = () => {
    // Do any necessary form validation or error checking here
    dispatch({ type: "SET_STEP", payload: 1 });
  };

  const renderStepContent = () => {
    switch (state.step) {
      case 1:
        return (
          <>
            <MapView style={{ flex: 1 }} provider="google"></MapView>
            <RatingPopup
              onPress={handleStep1Button}
              buttonText={NotYetRated.buttonText}
              isGroupButtonShow={NotYetRated.isGroupButtonShow}
            />
          </>
        );
      case 2:
        return (
          <>
            <MapView style={{ flex: 1 }} provider="google"></MapView>
            <RatingPopup
              onPress={handleStep2Button}
              buttonText={IsRating.buttonText}
              isGroupButtonShow={IsRating.isGroupButtonShow}
            />
          </>
        );
      case 3:
        return (
          <>
            <MapView style={{ flex: 1 }} provider="google"></MapView>
            <RatingPopup
              onPress={handleStep3Button}
              buttonText={Rated.buttonText}
              isGroupButtonShow={Rated.isGroupButtonShow}
            />
          </>
        );

      default:
        return null;
    }
  };

  return <BookingContainer>{renderStepContent()}</BookingContainer>;
};

const BookingContainer = styled(SafeAreaView)`
  width: 100%;
  height: 100%;
  background-color: ${(props) => props.bgColor};
  display: flex;
  padding: 0;
  flex-direction: column;
`;

export default BookingRatingScreen;
