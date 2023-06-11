import { Button, HStack, Text, VStack, View } from "native-base";
import LoveIcon from "../assets/icons8-smiling-face-with-heart-eyes-96.png";
import SmileIcon from "../assets/icons8-slightly-smiling-face-96.png";
import DisappointedIcon from "../assets/icons8-frowning-face-96.png";
import { SIZES } from "../constants/theme";
import SelectedButton from "./Button/SelectedButton";
import SelectIconButton from "./Button/SelecteIconButton";
import { useTranslation } from "react-i18next";
import { useContext } from "react";
import { BookingContext } from "../context/BookingContext";

const RatingPopup = () => {
  const { t } = useTranslation();
  const [isGroupButtonShow, setIsGroupButtonShow] = useState(false);
  const [ratingType, setRatingType] = useState(null);
  const [serviceRatings, setServiceRatings] = useState([]);

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
            {t("how")}
          </Text>
          <Text fontSize={SIZES.h6} color={"#125CAE"}>
            {t("improve")}
          </Text>
        </VStack>
        <HStack space={4}>
          <SelectIconButton icon={LoveIcon} />
          <SelectIconButton icon={SmileIcon} />
          <SelectIconButton icon={DisappointedIcon} />
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
