import React from "react";
import { Button, HStack, Image, Input, Text, VStack, View } from "native-base";
import { COLORS, FONTS } from "../../../constants/theme";
import { SafeAreaView } from "react-native-safe-area-context";
import ButtonBack from "../../../components/Global/ButtonBack/ButtonBack";
import MapView, { Marker } from "react-native-maps";
import { Keyboard, TouchableWithoutFeedback } from "react-native";

const AddLocationScreen = ({ navigation }) => {
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
              {/* <Button
                bgColor={"transparent"}
                style={{
                  position: "absolute",
                  right: 0,
                }}
              >
                <Text
                  style={{
                    ...FONTS.body3,
                    color: COLORS.fourthary,
                  }}
                  ml={4}
                >
                  Choose on map
                </Text>
              </Button> */}
            </HStack>

            <Input
              w={"100%"}
              h={"50px"}
              borderRadius={20}
              borderColor={COLORS.secondary}
              mb={3}
              placeholder="Search location"
              style={{ ...FONTS.body3 }}
              color={COLORS.white}
            />

            <VStack>
              <MapView
                provider="google"
                style={{ width: "100%", height: "100%", borderRadius: 20 }}
              >
                <Marker
                  coordinate={{ latitude: 9.90761, longitude: 105.31181 }}
                ></Marker>
              </MapView>
              <Button
                w={"100%"}
                position={"absolute"}
                bottom={120}
                borderRadius={20}
                bgColor={COLORS.primary}
                onPress={() => {
                  navigation.navigate("ConfirmLocation");
                }}
              >
                <Text style={{ ...FONTS.h2 }} color={COLORS.white}>
                  Continue
                </Text>
              </Button>
            </VStack>
          </VStack>
        </TouchableWithoutFeedback>
      </SafeAreaView>
    </VStack>
  );
};

export default AddLocationScreen;
