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

const BookingRatingScreen = ({ navigation }) => {
  const { t } = useTranslation();
  const [step, setStep] = useState(1);

  return (
    <VStack h={"100%"} w={"100%"} bgColor={COLORS.background}>
      <BookingContainer>
        <RatingPopup />
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
