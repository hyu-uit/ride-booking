import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import styled from "styled-components";
import { FONTS, COLORS, SIZES } from "../../../constants";
import { FontAwesome5 } from "@expo/vector-icons";

export default function ButtonBack({ navigation }) {
  return (
    <Container>
      <FontAwesome5 name="angle-left" size={24} color={COLORS.primary} />
    </Container>
  );
}

const Container = styled.TouchableOpacity`
  width: 42px;
  height: 42px;
  background-color: transparent;
  border: solid ${(props) => COLORS.grey};
  border-radius: 10px;
  justify-content: center;
  align-items: center;
`;
