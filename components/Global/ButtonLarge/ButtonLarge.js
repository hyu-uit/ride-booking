import React from "react";
import styled from "styled-components";
import { FONTS, COLORS, SIZES } from "../../../constants";

export default function ButtonLarge(props) {
  return (
    <Container>
      <Content>{props.content}</Content>
    </Container>
  );
}

const Container = styled.TouchableOpacity`
  height: 76px;
  width: 100%;
  background-color: ${(props) => COLORS.primary};
  border-radius: ${(props) => SIZES.radius};
  justify-content: center;
  align-items: center;
`;

const Content = styled.Text`
  ${(props) => FONTS.h2}
  color: ${(props) => COLORS.white};
`;
