import { Button, HStack, Text, VStack, View } from "native-base";
import LoveIcon from "../assets/icons8-smiling-face-with-heart-eyes-96.png";
import SmileIcon from "../assets/icons8-slightly-smiling-face-96.png";
import DisappointedIcon from "../assets/icons8-frowning-face-96.png";
import { SIZES } from "../constants/theme";
import SelectIconButton from "./Button/SelecteIconButton";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { doc, increment, updateDoc } from "firebase/firestore";
import { db } from "../config/config";

const RatingPopup = ({ navigation, idRider }) => {
  const { t } = useTranslation();
  const [selectedButton, setSelectedButton] = useState(null);

  const handleCompleteBooking = () => {
    // handle complete booking logic here
    // use directly in line 13 to get rating type
    updateRating();
    navigation.navigate("Home");
  };
  const updateRating = () => {
    if (selectedButton == "love") {
      updateDoc(doc(db, "Rider", idRider), {
        good: increment(1),
      });
    } else if (selectedButton == "smile") {
      updateDoc(doc(db, "Rider", idRider), {
        normal: increment(1),
      });
    } else {
      updateDoc(doc(db, "Rider", idRider), {
        bad: increment(1),
      });
    }
  };
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
        <HStack space={4} justifyContent={"space-between"}>
          <SelectIconButton
            icon={LoveIcon}
            selected={selectedButton === "love"}
            onPress={() => setSelectedButton("love")}
          />
          <SelectIconButton
            icon={SmileIcon}
            selected={selectedButton === "smile"}
            onPress={() => setSelectedButton("smile")}
          />
          <SelectIconButton
            icon={DisappointedIcon}
            selected={selectedButton === "disappointed"}
            onPress={() => setSelectedButton("disappointed")}
          />
        </HStack>
        <Button
          marginTop={"auto"}
          bgColor={"#194AF94D"}
          width={"100%"}
          borderRadius={SIZES.radius}
          onPress={handleCompleteBooking}
        >
          <Text bold fontSize={SIZES.h2} color={"white"}>
            {selectedButton ? "Send" : "Skip"}
          </Text>
        </Button>
      </VStack>
    </View>
  );
};

export default RatingPopup;
