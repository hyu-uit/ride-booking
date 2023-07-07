import React from "react";
import { useReducer } from "react";
import RatingPopup from "../../components/RatingPopup";
import styled from "styled-components";
import { SafeAreaView } from "react-native-safe-area-context";
import MapView from "react-native-maps";
import { useTranslation } from "react-i18next";
import { VStack } from "native-base";
import { COLORS } from "../../constants";
import { BookingContext } from "../../context/BookingContext";
import { useContext } from "react";
import { Marker } from "react-native-svg";

const BookingRatingScreen = ({ navigation, route }) => {
  const { t } = useTranslation();
  const { booking } = useContext(BookingContext);
  const { idRider } = route.params;

  console.log(idRider);
  return (
    <VStack h={"100%"} w={"100%"} bgColor={COLORS.background}>
      <BookingContainer>
        <MapView
          style={{ height: "50%", borderRadius: 10 }}
          provider="google"
          region={booking.region}
        >
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
        <RatingPopup idRider={idRider} navigation={navigation} />
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

export default BookingRatingScreen;
