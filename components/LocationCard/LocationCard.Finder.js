import {
  Box,
  Button,
  Center,
  Divider,
  HStack,
  Image,
  Spinner,
  Text,
  VStack,
  View,
} from "native-base";
import React from "react";
import LineImg from "../../assets/Line4.png";
import LocationIcon from "../../assets/icons/icons8-location-48.png";
import ArrowDownIcon from "../../assets/icons/icons8-down-arrow-48.png";
import { SIZES } from "../../constants/theme";

const LocationCardFinder = ({ onPressCancel }) => {
  return (
    <View
      bgColor={"#0B0F2F"}
      w={"100%"}
      h={410}
      borderTopRadius={20}
      shadow={3}
      position={"absolute"}
      bottom={0}
      padding={"30px 25px 0 25px"}
    >
      <VStack space={3}>
        <Text fontSize={SIZES.h3} bold color={"white"}>
          Finding your driver
        </Text>
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
        <Text fontSize={SIZES.h3} bold color={"white"}>
          Driver detail
        </Text>
        <Center h={"40px"}>
          <HStack space={2}>
            <Spinner size="lg" />
            <Text fontSize={SIZES.h4} bold color={"white"}>
              Finding your driver...
            </Text>
          </HStack>
        </Center>
        <HStack>
          <Button
            bgColor={"#3D5AF8"}
            w={"100%"}
            borderRadius={"20px"}
            onTouchEnd={onPressCancel}
          >
            <Text color={"white"} bold fontSize={SIZES.small}>
              Cancel
            </Text>
          </Button>
        </HStack>
      </VStack>
    </View>
  );
};

export default LocationCardFinder;
