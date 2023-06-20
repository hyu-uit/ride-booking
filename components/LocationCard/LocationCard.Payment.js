import {
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
import BackIcon from "../../assets/back_icon.png";
import VisaIcon from "../../assets/visa_96px.png";
import MomoIcon from "../../assets/momo_icon.png";
import { COLORS, SIZES } from "../../constants/theme";
import { useTranslation } from "react-i18next";
import PromotionModal from "../Modal/PromotionModal";
import { useState } from "react";
import { TouchableOpacity } from "react-native";
import { useContext } from "react";
import {
  BookingContext,
  SET_BOOKING_DETAILS,
} from "../../context/BookingContext";
import { isNullOrEmpty } from "../../helper/helper";

const CASH = "CASH";
const MOMO = "MOMO";

const LocationCardPayment = ({ onClickContinue, onPressBack }) => {
  const { t } = useTranslation();
  const [modal, setModal] = useState(false);
  const { booking, dispatch } = useContext(BookingContext);
  const [paymentMethod, setPaymentMethod] = useState(CASH);

  const handleOnPressPromotion = (promotion) => {
    console.log(
      "🚀 ~ file: LocationCard.Payment.js:26 ~ handleOnPressPromotion ~ promotion:",
      promotion
    );
    dispatch({
      type: SET_BOOKING_DETAILS,
      payload: { promotionName: promotion.name, promotion: promotion.value },
    });
    setModal((prev) => !prev);
  };
  return (
    <View
      bgColor={"#0B0F2F"}
      w={"100%"}
      borderTopRadius={20}
      shadow={3}
      position={"absolute"}
      bottom={0}
      padding={"30px 25px 0 25px"}
    >
      <VStack space={3}>
        <Text fontSize={SIZES.h3} bold color={"white"}>
          {t("payment")}
        </Text>
        <VStack space={2}>
          <TouchableOpacity onPress={() => setPaymentMethod(CASH)}>
            <HStack
              w={"100%"}
              h={"60px"}
              bgColor={
                paymentMethod === CASH ? COLORS.fourthary : COLORS.tertiary
              }
              borderRadius={"10px"}
              alignItems={"center"}
            >
              <Center w={"50px"} h={"50px"}>
                <Image w={"35px"} h={"35px"} source={VisaIcon} alt="" />
              </Center>
              <Text
                bold
                fontSize={SIZES.h3}
                color={"white"}
                alignSelf={"center"}
              >
                {t("cash")}
              </Text>
            </HStack>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setPaymentMethod(MOMO)}>
            <HStack
              w={"100%"}
              h={"60px"}
              bgColor={
                paymentMethod === MOMO ? COLORS.fourthary : COLORS.tertiary
              }
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
          </TouchableOpacity>
        </VStack>
        <Divider />
        <Text fontSize={SIZES.h3} bold color={"white"}>
          {t("promotion")}
        </Text>
        <TouchableOpacity onPress={() => setModal((prev) => !prev)}>
          <Center
            borderWidth={1}
            borderRadius={20}
            borderColor={"white"}
            borderStyle={"dashed"}
            bgColor={"#101744"}
            h={"65px"}
          >
            <Text color={"white"}>
              {booking.bookingDetails.promotionName === ""
                ? t("addPromo")
                : booking.bookingDetails.promotionName}
            </Text>
          </Center>
        </TouchableOpacity>
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
            onTouchEnd={() => onClickContinue(paymentMethod)}
          >
            <Text color={"white"} bold fontSize={SIZES.small}>
              {t("continue")}
            </Text>
          </Button>
        </HStack>
      </VStack>
      <PromotionModal
        isShow={modal}
        onClose={() => setModal((prev) => !prev)}
        onPress={handleOnPressPromotion}
      />
    </View>
  );
};

export default LocationCardPayment;
