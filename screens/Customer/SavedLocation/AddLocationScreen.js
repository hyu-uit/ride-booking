import React, { useEffect, useState } from "react";
import { Button, HStack, Text, VStack, View } from "native-base";
import { COLORS, FONTS } from "../../../constants/theme";
import { SafeAreaView } from "react-native-safe-area-context";
import ButtonBack from "../../../components/Global/ButtonBack/ButtonBack";
import { Keyboard, Platform, TouchableWithoutFeedback } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { AutocompleteDropdown } from "react-native-autocomplete-dropdown";
import {
  getAutoCompleteResults,
  getSingleAddressFromCoordinate,
} from "../../../api/locationAPI";
import { fetchCurrentUserLocation } from "../../../helper/location";
import { getFromAsyncStorage } from "../../../helper/asyncStorage";
import { useTranslation } from "react-i18next";

const AddLocationScreen = ({ navigation }) => {
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(false);
  const [markerPosition, setMarkerPosition] = useState({
    name: null,
    address: "",
    latitude: 10.8700089,
    longitude: 106.8030541,
  });

  const { t } = useTranslation();

  const [suggestionsList, setSuggestionsList] = useState([]);
  // save result to find long lat on click select item auto complete
  const [originalResult, setOriginalResult] = useState([]);

  useEffect(() => {
    fetchCurrentUserLocation()
      .then(({ latitude, longitude }) => {
        console.log(
          "🚀 ~ file: AddLocationScreen.js:30 ~ .then ~ latitude, longitude:",
          latitude,
          longitude
        );

        getSingleAddressFromCoordinate(latitude, longitude)
          .then((value) => {
            console.log(
              "🚀 ~ file: AddLocationScreen.js:34 ~ .then ~ value:",
              value
            );

            setMarkerPosition({
              name: "Your location",
              address: value.formatted,
              latitude,
              longitude,
            });
          })
          .catch((err) => {
            console.log(
              "🚀 ~ file: AddLocationScreen.js:44 ~ .then ~ err:",
              err
            );
          });
      })
      .catch((err) => {
        console.log(
          "🚀 ~ file: AddLocationScreen.js:48 ~ useEffect ~ err:",
          err
        );
      });
  }, []);

  useEffect(() => {
    const searchTimeout = setTimeout(() => {
      // empty input will lead to error
      if (searchText.length > 1) {
        setLoading(true);
        getAutoCompleteResults(searchText)
          .then((results) => {
            setOriginalResult(results);
            setSuggestionsList(
              results.map((result) => ({
                id: result.place_id,
                title: result.formatted,
              }))
            );
          })
          .catch((err) => {
            console.log(
              "🚀 ~ file: AddLocationScreen.js:80 ~ searchTimeout ~ err:",
              err
            );
            return;
          })
          .finally(() => setLoading(false));
      }
    }, 500);
    return () => {
      clearTimeout(searchTimeout);
    };
  }, [searchText]);

  const handleMarkerDragEnd = (e) => {
    const { latitude, longitude } = e.nativeEvent.coordinate;
    getSingleAddressFromCoordinate(latitude, longitude)
      .then((value) => {
        setMarkerPosition({
          latitude,
          longitude,
          name: value.name ? value.name : value.formatted,
          address: value.formatted,
        });
      })
      .catch((err) => {
        console.log(
          "🚀 ~ file: BookingScreen.js:240 ~ handleMarkerDragEnd ~ err:",
          err
        );
        return;
      });
  };

  return (
    <VStack h={"100%"} paddingY={"20px"} bgColor={COLORS.background}>
      <SafeAreaView>
        <TouchableWithoutFeedback
          onPress={() => {
            Keyboard.dismiss();
          }}
        >
          <VStack paddingX={"10px"} h={"100%"}>
            <HStack mb={"20px"} alignItems={"center"}>
              <View style={{ left: 0 }}>
                <ButtonBack
                  onPress={() => {
                    navigation.goBack();
                  }}
                ></ButtonBack>
              </View>
              <Text style={{ ...FONTS.h2, color: COLORS.white }} ml={4}>
                Add location
              </Text>
            </HStack>

            <AutocompleteDropdown
              direction={Platform.select({ ios: "down" })}
              dataSet={suggestionsList}
              onSelectItem={(item) => {
                console.log(
                  "🚀 ~ file: AddLocationScreen.js:124 ~ AddLocationScreen ~ item:",
                  item
                );
                originalResult.map((result) => {
                  if (result.place_id == item.id) {
                    setMarkerPosition({
                      address: result.formatted,
                      name: result.name,
                      latitude: result.lat,
                      longitude: result.lon,
                    });
                  }
                });
              }}
              textInputProps={{
                value: searchText,
                placeholder: "Search",
                style: {
                  color: "white",
                  paddingLeft: 0,
                  ...FONTS.body3,
                },
                onChangeText: (text) => setSearchText(text),
              }}
              loading={loading}
              inputContainerStyle={{
                backgroundColor: "transparent",
                borderRadius: 25,
                marginLeft: 0,
                borderWidth: 1,
                borderColor: COLORS.fourthary,
                paddingHorizontal: 10,
              }}
              suggestionsListContainerStyle={{
                display: "flex",
                backgroundColor: COLORS.tertiary,
                paddingHorizontal: 5,
                borderColor: "white",
                borderWidth: 1,
                borderTopWidth: 0,
                borderTopLeftRadius: 0,
                borderTopRightRadius: 0,
                marginTop: 0,
                color: "white",
              }}
              renderItem={(item, text) => {
                return (
                  <Text
                    color={"white"}
                    style={{ ...FONTS.body3, marginVertical: 5 }}
                  >
                    {item ? item.title : null}
                  </Text>
                );
              }}
              inputHeight={50}
            />

            <VStack>
              <MapView
                style={{ height: "100%", borderRadius: 10, marginTop: 10 }}
                provider="google"
                region={{
                  longitude: markerPosition.longitude,
                  latitude: markerPosition.latitude,
                  latitudeDelta: 0.01,
                  longitudeDelta: 0.01,
                }}
              >
                <Marker
                  key={"your-location"}
                  coordinate={markerPosition}
                  title={
                    markerPosition.name ? markerPosition.name : "Your location"
                  }
                  description={
                    markerPosition.address ? markerPosition.address : null
                  }
                  draggable={true}
                  onPress={(e) => e.stopPropagation()}
                  onDragEnd={handleMarkerDragEnd}
                  isPreselected={true}
                />
              </MapView>
              <HStack
                position={"absolute"}
                bottom={"1/5"}
                w={"100%"}
                justifyContent={"center"}
              >
                <Button
                  w={"90%"}
                  borderRadius={20}
                  bgColor={COLORS.primary}
                  onPress={() => {
                    console.log(
                      "🚀 ~ file: AddLocationScreen.js:24 ~ AddLocationScreen ~ markerPosition:",
                      markerPosition
                    );
                    navigation.navigate("ConfirmLocation", {
                      ...markerPosition,
                    });
                  }}
                >
                  <Text style={{ ...FONTS.h2 }} color={COLORS.white}>
                    {t("continue")}
                  </Text>
                </Button>
              </HStack>
            </VStack>
          </VStack>
        </TouchableWithoutFeedback>
      </SafeAreaView>
    </VStack>
  );
};

export default AddLocationScreen;
