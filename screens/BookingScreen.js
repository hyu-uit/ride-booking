import React from "react";
import styled from "styled-components";
import { FONTS, COLORS } from "../constants/theme";
import { Flex } from "native-base";
import RatingPopup from "../components/RatingPopup";

export default function BookingScreen({ navigation }) {
  return (
    <Flex flex={1}>
      <RatingPopup />
    </Flex>
  );
}

const HomeContainer = styled.SafeAreaView``;

const Title = styled.Text`
  color: ${(props) => COLORS.default};
  font-weight: ${(props) => FONTS.large};
`;
