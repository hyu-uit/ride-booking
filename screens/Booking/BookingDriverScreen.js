import React from "react";
import { useReducer } from "react";
import RatingPopup from "../../components/RatingPopup";
import styled from "styled-components";
import { SafeAreaView } from "react-native-safe-area-context";
import MapView from "react-native-maps";
import WaitingRiderCard from "../../components/DriverInformationCard/WaitingRiderCard";
import OnTheWayCard from "../../components/DriverInformationCard/OnTheWayCard";
import FinishedTripCard from "../../components/DriverInformationCard/FinishedTripCard";
import ConfirmModal from "../../components/Modal/ConfirmModal";
import DriverInformationModal from "../../components/Modal/DriverInformationModal";

const initialState = {
  step: 1,
  isModalCancelShow: false,
  isModalInfoShow: false,
};

const SET_STEP_ACTION = "SET_STEP";
const SET_SHOW_MODAL_CANCEL = "SET_SHOW_MODAL_CANCEL";
const SET_SHOW_MODAL_INFO = "SET_SHOW_MODAL_INFO";

const stateReducer = (state, action) => {
  switch (action.type) {
    case SET_STEP_ACTION:
      return { ...state, step: action.payload };
    case SET_SHOW_MODAL_CANCEL:
      return { ...state, isModalCancelShow: !state.isModalCancelShow };
    case SET_SHOW_MODAL_INFO:
      return { ...state, isModalInfoShow: !state.isModalInfoShow };
    default:
      throw new Error();
  }
};

const BookingDriverScreen = ({ navigation }) => {
  const [state, dispatch] = useReducer(stateReducer, initialState);

  const handleStep1Button = () => {
    // Do any necessary form validation or error checking here
    dispatch({ type: SET_STEP_ACTION, payload: 2 });
  };
  const handleStep2Button = () => {
    // Do any necessary form validation or error checking here
    dispatch({ type: SET_STEP_ACTION, payload: 3 });
  };

  const handleShowModalCancel = () => {
    dispatch({ type: SET_SHOW_MODAL_CANCEL });
  };

  const handleShowModalInfo = () => {
    dispatch({ type: SET_SHOW_MODAL_INFO });
  };

  const renderStepContent = () => {
    switch (state.step) {
      case 1:
        return (
          <>
            <MapView style={{ flex: 1 }} provider="google"></MapView>
            <WaitingRiderCard
              onPressCancel={handleStep1Button}
              onPressInfo={handleShowModalInfo}
            />
          </>
        );
      case 2:
        return (
          <>
            <MapView style={{ flex: 1 }} provider="google"></MapView>
            <OnTheWayCard
              onPressCancel={handleStep2Button}
              onPressInfo={handleShowModalInfo}
            />
          </>
        );
      case 3:
        return (
          <>
            <MapView style={{ flex: 1 }} provider="google"></MapView>
            <FinishedTripCard
              onClickRate={() => navigation.navigate("BookingRating")}
              onPressInfo={handleShowModalInfo}
            />
          </>
        );

      default:
        return null;
    }
  };

  return (
    <BookingContainer>
      {renderStepContent()}
      <ConfirmModal
        isShow={state.isModalCancelShow}
        title={"Cancel booking"}
        content={"Are you sure that you want to cancel this booking?"}
        onClose={handleShowModalCancel}
        onPressOK={handleShowModalCancel}
      />
      <DriverInformationModal
        isShow={state.isModalInfoShow}
        onClose={handleShowModalInfo}
      />
    </BookingContainer>
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

export default BookingDriverScreen;
