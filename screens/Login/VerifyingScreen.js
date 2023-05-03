import {
  Button,
  HStack,
  Input,
  NativeBaseProvider,
  Text,
  VStack,
  View,
} from "native-base";
import React from "react";
import ButtonBack from "../../components/Global/ButtonBack/ButtonBack";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS, FONTS } from "../../constants";
import { TouchableWithoutFeedback } from "react-native";
import { Keyboard } from "react-native";

const VerifyingScreen = ({ navigation }) => {
  return (
    <NativeBaseProvider>
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
        }}
      >
        <VStack
          paddingX={"10px"}
          bgColor={COLORS.background}
          w={"100%"}
          h={"100%"}
        >
          <SafeAreaView style={{ width: "100%", height: "100%" }}>
            <ButtonBack></ButtonBack>
            <View style={{ alignItems: "center" }}>
              <Text style={{ ...FONTS.h2 }} color={COLORS.white}>
                Verification
              </Text>
              <HStack mt={10}>
                <Text style={{ ...FONTS.body3 }} color={COLORS.white}>
                  Code sent to{" (+84) "}
                </Text>
                <Text style={{ ...FONTS.body3 }} color={COLORS.white}>
                  0848867679
                </Text>
              </HStack>
              <HStack mt={10}>
                <Input
                  w={"60px"}
                  h={"60px"}
                  bgColor={COLORS.primary}
                  justifyContent={"center"}
                  alignItems={"center"}
                  color={COLORS.white}
                  style={{ ...FONTS.h2 }}
                  maxLength={1}
                  textAlign={"center"}
                  keyboardType="numeric"
                />
                <Input
                  w={"60px"}
                  h={"60px"}
                  bgColor={COLORS.primary}
                  justifyContent={"center"}
                  alignItems={"center"}
                  color={COLORS.white}
                  style={{ ...FONTS.h2 }}
                  maxLength={1}
                  textAlign={"center"}
                  ml={5}
                  keyboardType="numeric"
                />
                <Input
                  w={"60px"}
                  h={"60px"}
                  bgColor={COLORS.primary}
                  justifyContent={"center"}
                  alignItems={"center"}
                  color={COLORS.white}
                  style={{ ...FONTS.h2 }}
                  maxLength={1}
                  textAlign={"center"}
                  ml={5}
                  keyboardType="numeric"
                />
                <Input
                  w={"60px"}
                  h={"60px"}
                  bgColor={COLORS.primary}
                  justifyContent={"center"}
                  alignItems={"center"}
                  color={COLORS.white}
                  style={{ ...FONTS.h2 }}
                  maxLength={1}
                  textAlign={"center"}
                  ml={5}
                  keyboardType="numeric"
                />
              </HStack>
              <Button
                w={"100%"}
                h={"77px"}
                borderRadius={20}
                bgColor={COLORS.primary}
                onPress={() => {}}
                mt={50}
              >
                <Text style={{ ...FONTS.h2 }} color={COLORS.white}>
                  Request again
                </Text>
              </Button>
            </View>
          </SafeAreaView>
        </VStack>
      </TouchableWithoutFeedback>
    </NativeBaseProvider>
  );
};

export default VerifyingScreen;
