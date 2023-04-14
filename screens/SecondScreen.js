import {
  View,
  Text,
  SafeAreaView,
  Platform,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import styled from "styled-components";
import { SIZES, FONTS, COLORS } from "../constants/theme";
import { AntDesign } from "@expo/vector-icons";

export default function SecondScreen() {
  const [brand, setBrand] = useState(0);
  return (
    <HomeContainer>
      <Container>
        <HeaderContainer>
          <HeaderTitle>
            <Text>Choose</Text> a Car
          </HeaderTitle>
          <AntDesign name="search1" size={24} color="grey" />
        </HeaderContainer>
        <BrandContainer>
          <BrandTitle>Brands</BrandTitle>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
          >
            <BrandItem active={brand === 0 ? "active" : ""}>
              <BrandContent>All</BrandContent>
            </BrandItem>
            <BrandItem active={"active"}>
              <BrandContent>All</BrandContent>
            </BrandItem>
            <BrandItem>
              <BrandContent>All</BrandContent>
            </BrandItem>
            <BrandItem>
              <BrandContent>All</BrandContent>
            </BrandItem>
            <BrandItem>
              <BrandContent>All</BrandContent>
            </BrandItem>
            <BrandItem>
              <BrandContent>All</BrandContent>
            </BrandItem>
            <BrandItem>
              <BrandContent>All</BrandContent>
            </BrandItem>
            <BrandItem>
              <BrandContent>All</BrandContent>
            </BrandItem>
          </ScrollView>
        </BrandContainer>
      </Container>
    </HomeContainer>
  );
}

const HomeContainer = styled.SafeAreaView`
  flex: 1;
  background-color: ${(props) => COLORS.background};
  padding-top: ${(props) => (Platform.OS === "android" ? "35px" : 0)};
`;
const Container = styled.View`
  flex: 1;
  padding-left: ${(props) => SIZES.padding};
  padding-right: ${(props) => SIZES.padding};
`;
const HeaderContainer = styled.View`
  flex-direction: row;
  height: 10%;
  justify-content: space-between;
  align-items: center;
`;

const HeaderTitle = styled.Text`
  font-size: 28px;
  color: black;
  width: 70%;
`;

const BrandContainer = styled.View`
  height: 20%;
`;

const BrandTitle = styled.Text`
  font-size: 18px;
  color: black;
  margin-bottom: 20px;
`;

const BrandItem = styled.TouchableOpacity`
  width: 70px;
  aspect-ratio: 1;
  /* background-color: grey; */
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  margin-right: 10px;
  background: ${(props) => (props.active ? "gray" : "black")};
`;

const BrandContent = styled.Text`
  font-size: 16px;
  color: black;
`;
