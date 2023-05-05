import {
  Button,
  Center,
  Divider,
  HStack,
  Image,
  Text,
  TextArea,
  VStack,
  View,
} from "native-base";
import React from "react";
import BackIcon from "../../assets/back_icon.png";
import VisaIcon from "../../assets/visa_96px.png";
import MomoIcon from "../../assets/momo_icon.png";
import { SIZES } from "../../constants/theme";

const LocationCardPayment = ({ onClickContinue, onPressBack }) => {
  return (
    <View
      bgColor={"#0B0F2F"}
      w={"100%"}
      h={450}
      borderTopRadius={20}
      shadow={3}
      position={"absolute"}
      bottom={0}
      padding={"30px 25px 0 25px"}
    >
      <VStack space={3}>
        <Text fontSize={SIZES.h3} bold color={"white"}>
          Payment
        </Text>
        <VStack space={2}>
          <HStack
            w={"100%"}
            h={"60px"}
            bgColor={"#101744"}
            borderRadius={"10px"}
            alignItems={"center"}
          >
            <Center w={"50px"} h={"50px"}>
              <Image w={"35px"} h={"35px"} source={VisaIcon} alt="" />
            </Center>
            <Text bold fontSize={SIZES.h3} color={"white"} alignSelf={"center"}>
              Cash
            </Text>
          </HStack>
          <HStack
            w={"100%"}
            h={"60px"}
            bgColor={"#101744"}
            borderRadius={"10px"}
            alignItems={"center"}
          >
            <Center w={"50px"} h={"50px"} space={0}>
              <Image source={MomoIcon} alt="" />
            </Center>
            <Text bold fontSize={SIZES.h3} color={"white"}>
              Momo
            </Text>
          </HStack>
        </VStack>
        <Divider />
        <Text fontSize={SIZES.h3} bold color={"white"}>
          Promotion
        </Text>
        <Center
          borderWidth={1}
          borderRadius={20}
          borderColor={"white"}
          borderStyle={"dashed"}
          bgColor={"#101744"}
          h={"65px"}
        >
          <Text color={"white"}>Add promotion code</Text>
        </Center>
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

export default LocationCardPayment;
