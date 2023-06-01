import React, { useState } from "react";
import {
  Button,
  HStack,
  Image,
  Input,
  ScrollView,
  Spacer,
  Text,
  VStack,
  View,
  Icon,
} from "native-base";
import { COLORS, FONTS, SIZES } from "../../constants/theme";
import { SafeAreaView } from "react-native-safe-area-context";

const PendingScreen = ({ navigation }) => {
  return (
    <VStack h={"100%"} bgColor={COLORS.background}>
      <SafeAreaView>
        <VStack h={"100%"} mt={"17px"} paddingX={"10px"} alignItems={"center"}>
          <Image
            h={"40%"}
            resizeMode="contain"
            alt="pending"
            source={require("../../assets/images/StudentOffice/pending.png")}
          />
          <Text style={{ ...FONTS.h1, color: COLORS.white }} mt={10}>
            PENDING
          </Text>
          <Text
            style={{
              ...FONTS.body4,
              color: COLORS.grey,
            }}
            textAlign={"center"}
            mt={5}
          >
            Your account is being approved by Student Office{"\n"}Please wait
            until receiving a notification by SMS
          </Text>
          <Button
            w={"100%"}
            borderRadius={20}
            bgColor={COLORS.primary}
            mt={50}
            onPress={() =>
              navigation.navigate("AuthenticationStack", {
                screen: "SignIn",
              })
            }
          >
            <Text style={{ ...FONTS.h2 }} color={COLORS.white}>
              Go back
            </Text>
          </Button>
        </VStack>
      </SafeAreaView>
    </VStack>
  );
};

export default PendingScreen;
