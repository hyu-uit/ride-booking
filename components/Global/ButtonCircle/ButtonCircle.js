import { View, TouchableOpacity } from "react-native";
import React from "react";
import styled from "styled-components";
import { FONTS, COLORS, icons } from "../../../constants";
import { AntDesign } from "@expo/vector-icons";

export default function CircleButton(props) {
  return (
    <Container>
      <AntDesign name={props.icon} size={24} style={{ color: COLORS.white }} />
    </Container>
  );
}

const Container = styled.TouchableOpacity`
  width: 59;
  aspect-ratio: 1;
  background-color: ${(props) => COLORS.primary};
  border-radius: 100;
  justify-content: center;
  align-items: center;
`;
