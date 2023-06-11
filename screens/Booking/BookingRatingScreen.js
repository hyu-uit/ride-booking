import React from "react";
import { useReducer } from "react";
import RatingPopup from "../../components/RatingPopup";
import styled from "styled-components";
import { SafeAreaView } from "react-native-safe-area-context";
import MapView from "react-native-maps";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import { VStack } from "native-base";
import { COLORS } from "../../constants";

const NotYetRated = {
  isGroupButtonShow: false,
  buttonText: "",
};

const IsRating = {
  isGroupButtonShow: true,
  buttonText: "",
};
const Rated = {
  isGroupButtonShow: false,
  buttonText: "",
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
  useEffect(() => {
    NotYetRated.buttonText = t("skip");
    IsRating.buttonText = t("send");
    Rated.buttonText = t("back");
  });
  const { t } = useTranslation();
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
  return (
    <VStack h={"100%"} w={"100%"} bgColor={COLORS.background}>
      <BookingContainer>{renderStepContent()}</BookingContainer>
    </VStack>
  );
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
