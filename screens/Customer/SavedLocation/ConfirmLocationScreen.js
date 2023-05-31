import React from "react";
import { Button, HStack, Image, Input, Text, VStack, View } from "native-base";
import { COLORS, FONTS } from "../../../constants/theme";
import { SafeAreaView } from "react-native-safe-area-context";
import ButtonBack from "../../../components/Global/ButtonBack/ButtonBack";
import { Keyboard } from "react-native";
import { TouchableWithoutFeedback } from "react-native";

const ConfirmLocationScreen = ({ navigation }) => {
  return (
    <VStack h={"100%"} paddingY={"20px"} bgColor={COLORS.background}>
      <SafeAreaView>
        <TouchableWithoutFeedback
          onPress={() => {
            Keyboard.dismiss();
          }}
        >
          <VStack paddingX={"10px"} h={"100%"}>
            <HStack mb={"20px"} alignItems={"center"} justifyContent={"center"}>
              <View style={{ position: "absolute", left: 0 }}>
                <ButtonBack
                  onPress={() => {
                    navigation.goBack();
                  }}
                ></ButtonBack>
              </View>
              <Text style={{ ...FONTS.h2, color: COLORS.white }} ml={4}>
                Confirm location
              </Text>
            </HStack>
            <Input
              w={"100%"}
              h={"50px"}
              borderRadius={20}
              borderColor={COLORS.secondary}
              mt={2}
              mb={3}
              placeholder="Enter your location's name"
              style={{ ...FONTS.body3 }}
              color={COLORS.white}
            />

            <Text style={{ ...FONTS.h4, color: COLORS.fifthary }} mt={5}>
              Address
            </Text>
            <Text style={{ ...FONTS.body4, color: COLORS.white }} mt={1}>
              Công viên Bàu Cát, 14 Đồng Đen, Phường 14, Tân Bình, Hồ Chí Minh
            </Text>
            <Button
              position={"absolute"}
              bottom={0}
              w={"100%"}
              borderRadius={20}
              bgColor={COLORS.primary}
              onPress={() => {
                navigation.goBack();
              }}
            >
              <Text style={{ ...FONTS.h2, color: COLORS.white }}>Confirm</Text>
            </Button>
          </VStack>
        </TouchableWithoutFeedback>
      </SafeAreaView>
    </VStack>
  );
};

export default ConfirmLocationScreen;
