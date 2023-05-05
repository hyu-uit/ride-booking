import {
  Button,
  HStack,
  Image,
  Text,
  TextArea,
  VStack,
  View,
} from "native-base";
import React from "react";
import BackIcon from "../../assets/back_icon.png";
import { SIZES } from "../../constants/theme";

const LocationCardNote = ({ onClickContinue, onPressBack }) => {
  return (
    <View
      bgColor={"#0B0F2F"}
      w={"100%"}
      h={400}
      borderTopRadius={20}
      shadow={3}
      position={"absolute"}
      bottom={0}
      padding={"30px 25px 0 25px"}
    >
      <VStack space={4}>
        <Text fontSize={SIZES.h3} bold color={"white"}>
          Note
        </Text>
        <TextArea
          placeholder="Notes for driver"
          w={"100%"}
          h={"60%"}
          borderWidth={0}
          bgColor={"#101744"}
          color={"white"}
        />
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

export default LocationCardNote;
