import React, { useEffect } from "react";
import { Button, HStack, Image, Text, VStack, View } from "native-base";
import { TouchableOpacity } from "react-native";
import { SIZES, COLORS, FONTS } from "../../constants/theme";
import pricePromotionIcon from "../../assets/price-promotion.png";
import arrowWhite from "../../assets/arrow-white.png";
import { useTranslation } from "react-i18next";
import { Ionicons } from "@expo/vector-icons";

function BookingPromotionCard({ onPress, data }) {
  const { t } = useTranslation();
  return (
    <TouchableOpacity onPress={onPress} style={{ marginBottom: 10 }}>
      <VStack h={20} bgColor={COLORS.fourthary}>
        <VStack h={"50%"} pl={5} justifyContent={"center"}>
          <Text style={{ ...FONTS.body3, color: COLORS.white }}>
            {data.name}
          </Text>
        </VStack>
        <HStack w={"100%"} alignItems={"center"}>
          <View
            w={"100%"}
            borderBottomColor={COLORS.fifthary}
            borderBottomWidth={1}
            borderBottomStyle={"dashed"}
          ></View>
          <View
            w={"10%"}
            style={{ aspectRatio: 1 }}
            bgColor={COLORS.tertiary}
            borderRadius={100}
            position={"absolute"}
            left={-20}
          ></View>
        </HStack>
        <HStack
          h={"49%"}
          alignItems={"center"}
          paddingLeft={5}
          justifyContent={"space-between"}
          paddingRight={2}
        >
          <HStack>
            <Ionicons
              name="cash-outline"
              size={20}
              color={COLORS.tertiary}
            ></Ionicons>
            <Text style={{ ...FONTS.h4, color: COLORS.tertiary }} ml={2}>
              {Number(data.value).toLocaleString()}đ
            </Text>
          </HStack>
        </HStack>
      </VStack>
    </TouchableOpacity>
  );
}

export default BookingPromotionCard;
