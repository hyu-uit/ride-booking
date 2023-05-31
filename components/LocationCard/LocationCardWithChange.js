import {
  Center,
  Divider,
  Flex,
  HStack,
  Image,
  Input,
  Text,
  VStack,
  View,
} from "native-base";
import { COLORS, SIZES } from "../../constants";
import ArrowDownIcon from "../../assets/icons/icons8-down-arrow-48.png";
import LocationIcon from "../../assets/icons/icons8-location-48.png";
import ChangeIcon from "../../assets/icons/icons8-change-48.png";
import { useRef } from "react";
import { useEffect } from "react";

const LocationCardWithChange = () => {
  // const inputRef = useRef(null);

  // useEffect(() => {
  //   inputRef.current.focus();
  // }, []);
  return (
    <Flex marginTop={3} marginLeft={3} marginRight={3}>
      <HStack
        w={"100%"}
        h={160}
        bgColor={COLORS.tertiary}
        borderColor={COLORS.fourthary}
        borderRadius={10}
        borderWidth={1}
        padding={4}
      >
        <VStack space={2} flex={5}>
          <VStack>
            <Text bold fontSize={SIZES.h6} color={"#8CC3FF"}>
              Pick-up
            </Text>
            <Input
              // ref={inputRef}
              variant="unstyled"
              placeholder="Enter your location"
              bold
              fontSize={SIZES.h6}
              color={"white"}
              padding={1}
            />
          </VStack>
          <Divider />
          <VStack>
            <Text bold fontSize={SIZES.h6} color={"#8CC3FF"}>
              Drop off
            </Text>
            <Input
              variant="unstyled"
              placeholder="Enter destination"
              bold
              fontSize={SIZES.h6}
              color={"white"}
              padding={1}
            />
          </VStack>
        </VStack>
        <Center marginLeft={"auto"} flex={1}>
          <Divider
            bgColor={COLORS.fourthary}
            height={10}
            thickness={2}
            orientation="vertical"
          />
          <Center
            borderRadius={50}
            width={"25px"}
            height={"25px"}
            bgColor={COLORS.fourthary}
            marginBottom={2}
            marginTop={2}
          >
            <Image width={"20px"} height={"20px"} source={ChangeIcon} alt="" />
          </Center>
          <Divider
            bgColor={COLORS.fourthary}
            height={10}
            thickness={2}
            orientation="vertical"
          />
        </Center>
        <Center marginLeft={"auto"} flex={1}>
          <Center
            borderRadius={50}
            width={"25px"}
            height={"25px"}
            bgColor={"black"}
          >
            <Image
              width={"20px"}
              height={"20px"}
              source={ArrowDownIcon}
              alt=""
            />
          </Center>
          <View
            borderColor={COLORS.fourthary}
            minHeight={20}
            style={{
              borderWidth: 1,
              borderStyle: "dashed",
            }}
          />
          <Center
            borderRadius={50}
            width={"25px"}
            height={"25px"}
            bgColor={COLORS.fourthary}
          >
            <Image
              width={"20px"}
              height={"20px"}
              source={LocationIcon}
              alt=""
            />
          </Center>
        </Center>
      </HStack>
    </Flex>
  );
};

export default LocationCardWithChange;
