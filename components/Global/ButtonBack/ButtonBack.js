import React from "react";
import styled from "styled-components";
import { COLORS } from "../../../constants";
import { FontAwesome5 } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";

export default function ButtonBack({ onPress }) {
  return (
    <Container onPress={onPress}>
      <FontAwesome5 name="angle-left" size={24} color={COLORS.primary} />
    </Container>
  );
}

const Container = styled(TouchableOpacity)`
  width: 42px;
  height: 42px;
  background-color: transparent;
  border: solid ${(props) => COLORS.grey};
  border-radius: 10px;
  justify-content: center;
  align-items: center;
`;
