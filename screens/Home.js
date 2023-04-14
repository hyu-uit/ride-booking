import { View, Text, SafeAreaView, TouchableOpacity } from "react-native";
import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { FONTS, COLORS, SIZES, icons } from "../constants";
import ButtonLarge from "../components/Global/ButtonLarge/ButtonLarge";
import ButtonBack from "../components/Global/ButtonBack/ButtonBack";
import { useFonts } from "expo-font";
import ButtonCircle from "../components/Global/ButtonCircle/ButtonCircle";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import * as Location from "expo-location";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import MapViewDirections from "react-native-maps-directions";
import { FontAwesome } from "@expo/vector-icons";

// import MapboxGL from "@rnmapbox/maps";

// MapboxGL.setAccessToken(
//   "pk.eyJ1IjoiZHVjbmd1eWVudHJpIiwiYSI6ImNsZjNjaW9uczByMnIzcms3M2lhbzFjMzAifQ.io0Fje8EpyiyHXRr5xLBbg"
// );

// MapboxGL.setAccessToken(
//   "pk.eyJ1IjoiZHVjbmd1eWVudHJpIiwiYSI6ImNsZjNjaW9uczByMnIzcms3M2lhbzFjMzAifQ.io0Fje8EpyiyHXRr5xLBbg"
// );

export default function Home({ navigation }) {
  const _map = useRef(1);
  const API_KEY = "AIzaSyCdVOmKHCAC6pBedDk_XGL975A5xJFkuTw";
  const origin = { latitude: 37.3318456, longitude: -122.0296002 };
  const destination = { latitude: 37.771707, longitude: -122.4053769 };
  return (
    <HomeContainer>
      <HomeScreen>
        {/* <Mapbox.MapView styled={{ flex: 1 }} /> */}
        {/* <MapboxGL.MapView /> */}
        <MapView style={{ flex: 1 }} provider="google">
          <Marker
            coordinate={{ latitude: 9.90761, longitude: 105.31181 }}
          ></Marker>
          <Marker
            title="Kiến Tường"
            coordinate={{ latitude: 10.77746, longitude: 105.93401 }}
          ></Marker>
          <Marker
            title="Cần Thơ"
            coordinate={{ latitude: 10.045162, longitude: 105.746857 }}
          ></Marker>
          {/* <MapViewDirections
            origin={{ latitude: 9.90761, longitude: 105.31181 }}
            destination={{ latitude: 10.77653, longitude: 106.700981 }}
            apikey={API_KEY}
          /> */}
        </MapView>
      </HomeScreen>
    </HomeContainer>
  );
}

const HomeContainer = styled.SafeAreaView`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => COLORS.background};
`;

const HomeScreen = styled.View`
  width: 100%;
  height: 100%;
  padding-top: 30px;
  /* justify-content: center; */
  /* align-items: center; */
  padding-left: ${(props) => SIZES.padding};
  padding-right: ${(props) => SIZES.padding};
  margin-bottom: 50px;
`;

const Bottom = styled.View`
  width: 100%;
  height: 10%;
  align-items: center;
  justify-content: center;
  flex: 1;
  position: absolute;
  bottom: 0;
  margin-left: ${(props) => SIZES.padding};
`;
