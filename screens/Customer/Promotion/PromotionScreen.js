import { View, Text } from "react-native";
import React, { useState } from "react";
import {
  Button,
  HStack,
  Image,
  NativeBaseProvider,
  ScrollView,
  VStack,
} from "native-base";
import { SafeAreaView } from "react-native-safe-area-context";
import { SIZES, COLORS, FONTS } from "../../../constants/theme";
import IC_Bike_White from "../../../assets/images/Activity/ic_bike_white.png";
import IC_Bike_Blue from "../../../assets/images/Activity/ic_bike_blue.png";
import PromotionCard from "../../../components/PromotionCard";

const PromotionScreen = ({ navigation }) => {
  const [service, setService] = useState(0);
  return (
    <VStack h={"100%"} paddingY={"20px"} bgColor={COLORS.background}>
      <SafeAreaView>
        <HStack justifyContent={"center"} space={"10px"}>
          <Button
            w={"45%"}
            h={"70px"}
            borderRadius={20}
            bgColor={service === 0 ? COLORS.primary : COLORS.tertiary}
            onPress={() => {
              setService(0);
            }}
          >
            {/* <Image
                src={require("../../../assets/images/Activity/ic_bike.png`")}
              /> */}
            <HStack justifyContent={"center"} alignItems={"center"}>
              {service === 0 ? (
                <>
                  <Image
                    source={IC_Bike_White}
                    alt="Icon bike"
                    // Other props here
                  />
                </>
              ) : (
                <>
                  <Image
                    source={IC_Bike_Blue}
                    alt="Icon bike"
                    // Other props here
                  />
                </>
              )}

              <Text
                style={{
                  ...FONTS.h2,
                  color: service === 0 ? COLORS.white : COLORS.fourthary,
                }}
              >
                Bike
              </Text>
            </HStack>
          </Button>
          <Button
            w={"45%"}
            h={"70px"}
            borderRadius={20}
            bgColor={service === 1 ? COLORS.primary : COLORS.tertiary}
            onPress={() => {
              setService(1);
            }}
          >
            {/* <Image
                src={require("../../../assets/images/Activity/ic_bike.png`")}
              /> */}
            <HStack justifyContent={"center"} alignItems={"center"}>
              {service === 1 ? (
                <>
                  <Image
                    source={require("../../../assets/images/Activity/ic_send_white.png")}
                    alt="Icon send"
                    // Other props here
                  />
                </>
              ) : (
                <>
                  <Image
                    source={require("../../../assets/images/Activity/ic_send_blue.png")}
                    alt="Icon send"
                    // Other props here
                  />
                </>
              )}
              <Text
                style={{
                  ...FONTS.h2,
                  color: service === 1 ? COLORS.white : COLORS.fourthary,
                }}
              >
                Send
              </Text>
            </HStack>
          </Button>
        </HStack>
        <ScrollView mt={10} h={"100%"}>
          <VStack>
            <PromotionCard
              navigate={() => {
                navigation.navigate("PromotionDetail");
              }}
            />
            <PromotionCard
              navigate={() => {
                navigation.navigate("PromotionDetail");
              }}
            />
            <PromotionCard
              navigate={() => {
                navigation.navigate("PromotionDetail");
              }}
            />
            <PromotionCard
              navigate={() => {
                navigation.navigate("PromotionDetail");
              }}
            />
            <PromotionCard
              navigate={() => {
                navigation.navigate("PromotionDetail");
              }}
            />
            <PromotionCard
              navigate={() => {
                navigation.navigate("PromotionDetail");
              }}
            />
          </VStack>
        </ScrollView>
      </SafeAreaView>
    </VStack>
  );
};

export default PromotionScreen;
