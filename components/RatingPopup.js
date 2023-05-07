import { Button, HStack, Text, VStack, View } from "native-base";
import LoveIcon from "../assets/icons8-smiling-face-with-heart-eyes-96.png";
import SmileIcon from "../assets/icons8-slightly-smiling-face-96.png";
import DisappointedIcon from "../assets/icons8-frowning-face-96.png";
import { SIZES } from "../constants/theme";
import SelectedButton from "./Button/SelectedButton";
import SelecteIconButton from "./Button/SelecteIconButton";

const RatingPopup = ({ buttonText, isGroupButtonShow, onPress }) => {
  return (
    <View
      bgColor={"#0B0F2F"}
      w={"100%"}
      h={"auto"}
      borderTopRadius={20}
      shadow={3}
      position={"absolute"}
      bottom={0}
      padding={"30px 25px 0 25px"}
    >
      <VStack h={"100%"} space={4}>
        <VStack alignItems={"center"}>
          <Text fontSize={SIZES.h3} color={"white"} bold>
            How was your ride?
          </Text>
          <Text fontSize={SIZES.h6} color={"#125CAE"}>
            Your rating helps us improve
          </Text>
        </VStack>
        <HStack space={4}>
          <SelecteIconButton icon={LoveIcon} />
          <SelecteIconButton icon={SmileIcon} />
          <SelecteIconButton icon={DisappointedIcon} />
        </HStack>
        {isGroupButtonShow ? (
          <HStack space={4} flexWrap={"wrap"}>
            <SelectedButton
              text={"Good service"}
              isSelected={false}
            ></SelectedButton>
            <SelectedButton
              text={"Well prepared"}
              isSelected={false}
            ></SelectedButton>
            <SelectedButton
              text={"Punctuality"}
              isSelected={false}
            ></SelectedButton>
            <SelectedButton
              text={"Helpful driver"}
              isSelected={false}
            ></SelectedButton>
            <SelectedButton
              text={"Friendly driver"}
              isSelected={false}
            ></SelectedButton>
          </HStack>
        ) : null}
        <Button
          marginTop={"auto"}
          bgColor={"#194AF94D"}
          width={"100%"}
          borderRadius={SIZES.radius}
          onPress={onPress}
        >
          <Text bold fontSize={SIZES.h2} color={"white"}>
            {buttonText}
          </Text>
        </Button>
      </VStack>
    </View>
  );
};

export default RatingPopup;
