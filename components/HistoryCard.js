import {
  Avatar,
  HStack,
  Text,
  Button,
  VStack,
  View,
  Image,
  Flex,
} from "native-base";
import React from "react";
import DefaultAvt from "../assets/image6.png";
import CarImg from "../assets/image8.png";
import { COLORS, FONTS, SIZES } from "../constants/theme";

const HistoryCard = () => {
  return (
    <View
      bgColor={"#101744"}
      w={"95%"}
      borderRadius={20}
      shadow={3}
      marginBottom={5}
    >
      <HStack w={"full"}>
        <Avatar source={DefaultAvt} margin={"10px 0 0 10px"} />
        <VStack margin={"10px 0 0 10px"}>
          <Text bold fontSize={SIZES.h4} color={"white"}>
            62K4-1646
          </Text>
          <Text fontSize={SIZES.font} color={"#808080"}>
            Nguyen Tri Duc
          </Text>
        </VStack>
        <Button
          marginLeft={"auto"}
          height={45}
          borderBottomLeftRadius={20}
          borderTopRightRadius={20}
          backgroundColor={COLORS.white}
          color={COLORS.primary}
        >
          <Text style={{ ...FONTS.body5 }} color={COLORS.primary}>
            Book again
          </Text>
        </Button>
      </HStack>
      <HStack space={6} marginLeft={"10px"} marginBottom={"10px"}>
        <VStack>
          <Text bold fontSize={10} color={"#808080"}>
            Pick-up
          </Text>
          <Text bold fontSize={10} color={"white"}>
            Long An
          </Text>
        </VStack>
        <VStack>
          <Text bold fontSize={10} color={"#808080"}>
            Destination
          </Text>
          <Text bold fontSize={10} color={"white"}>
            UIT
          </Text>
        </VStack>
        <VStack>
          <Text bold fontSize={10} color={"#808080"}>
            Time
          </Text>
          <Text bold fontSize={10} color={"white"}>
            14:20, 07/03/2023
          </Text>
        </VStack>
      </HStack>
    </View>
  );
};

export default HistoryCard;
