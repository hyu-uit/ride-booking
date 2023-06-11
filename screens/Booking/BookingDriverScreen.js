import React, { useContext, useState } from "react";
import MapView, { Marker, Polyline } from "react-native-maps";
import styled from "styled-components";
import { SafeAreaView } from "react-native-safe-area-context";
import WaitingRiderCard from "../../components/DriverInformationCard/WaitingRiderCard";
import OnTheWayCard from "../../components/DriverInformationCard/OnTheWayCard";
import FinishedTripCard from "../../components/DriverInformationCard/FinishedTripCard";
import ConfirmModal from "../../components/Modal/ConfirmModal";
import DriverInformationModal from "../../components/Modal/DriverInformationModal";
import { VStack } from "native-base";
import { COLORS } from "../../constants";
import { BookingContext } from "../../context/BookingContext";

const BookingDriverScreen = ({ navigation }) => {
  const [step, setStep] = useState(1);
  const [isModalCancelShow, setIsModalCancelShow] = useState(false);
  const [isModalInfoShow, setIsModalInfoShow] = useState(false);
  const { booking } = useContext(BookingContext);

  const handleStep1Button = () => {
    // Do any necessary form validation or error checking here
    setStep(2);
  };
  const handleStep2Button = () => {
    // Do any necessary form validation or error checking here
    setStep(3);
  };

  const handleShowModalCancel = () => {
    setIsModalCancelShow((prev) => !prev);
  };

  const handleShowModalInfo = () => {
    setIsModalInfoShow((prev) => !prev);
  };

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <>
            <MapView
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
              {booking.routing ? (
                <Polyline
                  coordinates={booking.routing}
                  strokeWidth={5}
                  strokeColor="blue"
                />
              ) : null}
            </MapView>
            <OnTheWayCard
              onPressCancel={handleStep2Button}
              onPressInfo={handleShowModalInfo}
            />
          </>
        );
      case 2:
        return (
          <>
            <MapView
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
              {booking.routing ? (
                <Polyline
                  coordinates={booking.routing}
                  strokeWidth={5}
                  strokeColor="blue"
                />
              ) : null}
            </MapView>
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
    <VStack h={"100%"} w={"100%"} bgColor={COLORS.background}>
      <BookingContainer>
        {renderStepContent()}
        <ConfirmModal
          isShow={isModalCancelShow}
          title={"Cancel booking"}
          content={"Are you sure that you want to cancel this booking?"}
          onClose={handleShowModalCancel}
          onPressOK={handleShowModalCancel}
        />
        <DriverInformationModal
          isShow={isModalInfoShow}
          onClose={handleShowModalInfo}
        />
      </BookingContainer>
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

export default BookingDriverScreen;
