import React from "react";
import { Button, HStack, Image, Input, Text, VStack, View } from "native-base";
import { COLORS, FONTS } from "../../constants/theme";

const PaymentMethodCard = (props) => {
  return (
    <VStack
      width={"100%"}
      h={"72px"}
      borderRadius={10}
      bgColor={COLORS.tertiary}
      justifyContent={"center"}
      paddingX={"11px"}
      mb={5}
    >
      <HStack w={"100%"} alignItems={"center"}>
        <Image source={props.logo} alt={"zalo"}></Image>
        <Text style={{ ...FONTS.h4, color: COLORS.white }} ml={"19px"}>
          {props.name}
        </Text>
      </HStack>
    </VStack>
  );
};

export default PaymentMethodCard;
