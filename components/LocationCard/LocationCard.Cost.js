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
import LineImg from "../../assets/Line4.png";
import LocationIcon from "../../assets/icons/icons8-location-48.png";
import ArrowDownIcon from "../../assets/icons/icons8-down-arrow-48.png";
import ClockIcon from "../../assets/clock_96px.png";
import MapIcon from "../../assets/map_marker_96px.png";
import BackIcon from "../../assets/back_icon.png";
import { COLORS, SIZES } from "../../constants/theme";
import { useTranslation } from "react-i18next";
import {
  BookingContext,
  calculateFinalPrice,
} from "../../context/BookingContext";
import { useContext } from "react";
import { isNullOrEmpty } from "../../helper/helper";

const LocationCardCost = ({ onClickContinue, onPressBack }) => {
  const { t } = useTranslation();
  const { booking } = useContext(BookingContext);

  return (
    <View
      bgColor={COLORS.background}
      w={"100%"}
      borderTopRadius={20}
      shadow={3}
      position={"absolute"}
      bottom={0}
      padding={"30px 25px 0 25px"}
    >
      <VStack space={4}>
        <HStack w={"100%"}>
          <VStack space={2} width={"90%"}>
            <VStack space={1}>
              <Text bold fontSize={SIZES.h6} color={"#8CC3FF"}>
                {t("pickUp")}
              </Text>
              <Text bold fontSize={SIZES.h6} color={"white"}>
                {isNullOrEmpty(booking.pickUpLocation.address)
                  ? booking.pickUpLocation.address
                  : booking.pickUpLocation.name}
              </Text>
            </VStack>
            <Divider />
            <VStack space={1}>
              <Text bold fontSize={SIZES.h6} color={"#8CC3FF"}>
                {t("des")}
              </Text>
              <Text bold fontSize={SIZES.h6} color={"white"}>
                {isNullOrEmpty(booking.destinationLocation.address)
                  ? booking.destinationLocation.address
                  : booking.destinationLocation.name}
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
                {booking.bookingDetails.distance}km
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
                {booking.bookingDetails.time} {t("minutes")}
              </Text>
            </HStack>
          </VStack>
          <VStack marginLeft={"auto"}>
            <Text fontSize={SIZES.h2} color={"white"} bold>
              {parseInt(
                calculateFinalPrice(
                  booking.bookingDetails.price,
                  booking.bookingDetails.promotion
                )
              ).toLocaleString()}
              đ
            </Text>
            {booking.bookingDetails.promotion > 0 ? (
              <Text
                fontSize={SIZES.h5}
                color={"#808080"}
                strikeThrough
                textAlign={"right"}
              >
                {parseInt(booking.bookingDetails.price).toLocaleString()}đ
              </Text>
            ) : null}
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
              {t("continue")}
            </Text>
          </Button>
        </HStack>
      </VStack>
    </View>
  );
};

export default LocationCardCost;
