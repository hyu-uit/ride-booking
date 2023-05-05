import {
  Box,
  Button,
  Center,
  Divider,
  HStack,
  Image,
  Text,
  VStack,
  View,
} from "native-base";
import React from "react";
import LineImg from "../../assets/Line4.png";
import LocationIcon from "../../assets/icons/icons8-location-48.png";
import ArrowDownIcon from "../../assets/icons/icons8-down-arrow-48.png";
import ClockIcon from "../../assets/clock_96px.png";
import MapIcon from "../../assets/map_marker_96px.png";
import BackIcon from "../../assets/back_icon.png";
import { COLORS, SIZES } from "../../constants/theme";

const LocationCardCost = ({ onClickContinue, onPressBack }) => {
  return (
    <View
      bgColor={COLORS.background}
      w={"100%"}
      h={370}
      borderTopRadius={20}
      shadow={3}
      position={"absolute"}
      bottom={0}
      padding={"30px 25px 0 25px"}
    >
      <VStack space={4}>
        <HStack w={"100%"}>
          <VStack space={2}>
            <VStack space={1}>
              <Text bold fontSize={SIZES.h6} color={"#8CC3FF"}>
                Pick-up
              </Text>
              <Text bold fontSize={SIZES.h6} color={"white"}>
                Long An
              </Text>
            </VStack>
            <Divider />
            <VStack space={1}>
              <Text bold fontSize={SIZES.h6} color={"#8CC3FF"}>
                Destination
              </Text>
              <Text bold fontSize={SIZES.h6} color={"white"}>
                University of Information Technology
              </Text>
            </VStack>
          </VStack>
          <Center marginLeft={"auto"}>
            <Center
              borderRadius={50}
              width={"25px"}
              height={"25px"}
              bgColor={"black"}
              marginBottom={2}
            >
              <Image
                width={"20px"}
                height={"20px"}
                source={ArrowDownIcon}
                alt=""
              />
            </Center>
            <Image source={LineImg} alt="" marginBottom={2} />
            <Image
              width={"20px"}
              height={"20px"}
              source={LocationIcon}
              alt=""
            />
          </Center>
        </HStack>
        <Divider bgColor={"#125CAE"} />
        <HStack space={2}>
          <VStack space={3}>
            <HStack space={3}>
              <Image
                w={"25px"}
                h={"25px"}
                source={MapIcon}
                alt=""
                alignSelf={"center"}
              />
              <Text fontSize={SIZES.h4} color={"white"} bold>
                2km
              </Text>
            </HStack>
            <HStack space={3}>
              <Image
                w={"25px"}
                h={"25px"}
                source={ClockIcon}
                alt=""
                alignSelf={"center"}
              />
              <Text fontSize={SIZES.h4} color={"white"} bold>
                5mins
              </Text>
            </HStack>
          </VStack>
          <VStack marginLeft={"auto"}>
            <Text fontSize={SIZES.h2} color={"white"} bold>
              20,000đ
            </Text>
            <Text
              fontSize={SIZES.h5}
              color={"#808080"}
              strikeThrough
              textAlign={"right"}
            >
              20,000đ
            </Text>
          </VStack>
        </HStack>
        <HStack>
          <Button
            variant={"outline"}
            borderRadius={"20px"}
            borderWidth={"2px"}
            w={"75px"}
            h={"75px"}
            onPress={onPressBack}
          >
            <Image source={BackIcon} alt="" />
          </Button>
          <Button
            bgColor={"#3D5AF8"}
            w={"200px"}
            marginLeft={"auto"}
            borderRadius={"20px"}
            onTouchEnd={onClickContinue}
          >
            <Text color={"white"} bold fontSize={SIZES.small}>
              Continue
            </Text>
          </Button>
        </HStack>
      </VStack>
    </View>
  );
};

export default LocationCardCost;
