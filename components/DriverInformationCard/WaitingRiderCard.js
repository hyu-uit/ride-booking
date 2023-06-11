import React, { useContext } from "react";
import {
  HStack,
  Image,
  Text,
  VStack,
  View,
  Divider,
  Center,
  Avatar,
} from "native-base";
import { TouchableOpacity } from "react-native";
import { SIZES, COLORS, FONTS } from "../../constants/theme";
import ClockIcon from "../../assets/clock-icon.png";
import MapIcon from "../../assets/map_marker_96px.png";
import barCodeIcon from "../../assets/barcode.png";
import avatarIcon from "../../assets/avatar.png";
import callIcon from "../../assets/call-icon.png";
import { useTranslation } from "react-i18next";
import {
  BookingContext,
  calculateFinalPrice,
} from "../../context/BookingContext";

const WaitingRiderCard = ({ onPressInfo, onPressCancel }) => {
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
      paddingLeft={26}
      paddingRight={26}
    >
      <VStack space={5}>
        <HStack style={{ marginTop: 24, alignItems: "center" }}>
          <Text
            style={{
              color: COLORS.white,
              ...FONTS.h3,
              ...FONTS.h3,
              fontWeight: "bold",
              flex: 1,
            }}
          >
            {t("onTheWay")}
          </Text>
          <TouchableOpacity onPress={onPressInfo}>
            <Image
              source={barCodeIcon}
              alt="barcode"
              style={{
                width: 34,
                height: 34,
                resizeMode: "contain",
              }}
            ></Image>
          </TouchableOpacity>
        </HStack>
        <HStack space={1}>
          <Center
            style={{
              width: 45,
              height: 45,
              borderRadius: 45 / 2,
              backgroundColor: COLORS.primary,
              justifyContent: "center",
              alignItems: "center",
              resizeMode: "contain",
            }}
          >
            <Image
              alt="avatar"
              source={avatarIcon}
              style={{
                width: 45,
                height: 45,
                borderRadius: 45 / 2,
                backgroundColor: COLORS.primary,
                justifyContent: "center",
                alignItems: "center",
                resizeMode: "contain",
              }}
            />
          </Center>
          <VStack
            style={{
              marginLeft: 12,
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                color: COLORS.white,
                ...FONTS.h5,
                ...FONTS.h5,
                fontWeight: "bold",
                flex: 1,
              }}
            >
              SnowFlower
            </Text>
            <Text
              style={{
                color: COLORS.fourthary,
                ...FONTS.body6,
                ...FONTS.body6,
                fontWeight: "bold",
                flex: 1,
              }}
            >
              University of Information Technology
            </Text>
          </VStack>
        </HStack>
      </VStack>
      <HStack marginTop={3}>
        <VStack space={8}>
          <HStack space={8}>
            <VStack space={1}>
              <Text
                style={{
                  color: COLORS.grey,
                  ...FONTS.body6,
                  ...FONTS.body6,
                }}
              >
                {t("inputLicense")}
              </Text>
              <Text
                style={{
                  color: COLORS.grey,
                  ...FONTS.body6,
                  ...FONTS.body6,
                }}
              >
                {t("inputType")}
              </Text>
            </VStack>
            <VStack space={1}>
              <Text
                style={{
                  color: COLORS.fourthary,
                  ...FONTS.body6,
                  ...FONTS.body6,
                  fontWeight: "bold",
                }}
              >
                59X3 - 91176
              </Text>
              <Text
                style={{
                  color: COLORS.fourthary,
                  ...FONTS.body6,
                  ...FONTS.body6,
                  fontWeight: "bold",
                }}
              >
                SH Mode
              </Text>
            </VStack>
          </HStack>
        </VStack>
      </HStack>
      <Divider
        bgColor={COLORS.fourthary}
        style={{ height: 2, marginVertical: 20 }}
      ></Divider>
      <HStack>
        <VStack space={4}>
          <HStack space={3}>
            <Image
              source={MapIcon}
              alt="map icon"
              style={{
                width: 25,
                height: 25,
              }}
            ></Image>
            <Text
              style={{
                color: COLORS.white,
                ...FONTS.h4,
                ...FONTS.h4,
                fontWeight: "bold",
              }}
            >
              {booking.bookingDetails.distance}km
            </Text>
          </HStack>
          <HStack space={3}>
            <Image
              alt="clock icon"
              source={ClockIcon}
              style={{
                width: 25,
                height: 25,
              }}
            ></Image>
            <Text
              style={{
                color: COLORS.white,
                ...FONTS.h4,
                ...FONTS.h4,
                fontWeight: "bold",
              }}
            >
              {booking.bookingDetails.time} {t("minutes")}
            </Text>
          </HStack>
        </VStack>
        <VStack
          style={{
            alignItems: "flex-end",
            flex: 1,
            justifyContent: "center",
          }}
        >
          <Text fontSize={SIZES.h2} color={"white"} bold>
            {calculateFinalPrice(
              booking.bookingDetails.price,
              booking.bookingDetails.promotion
            )}
            đ
          </Text>
          {booking.bookingDetails.promotion > 0 ? (
            <Text
              fontSize={SIZES.h5}
              color={"#808080"}
              strikeThrough
              textAlign={"right"}
            >
              {booking.bookingDetails.price}đ
            </Text>
          ) : null}
        </VStack>
      </HStack>
      <HStack
        style={{
          marginBottom: 10,
          marginTop: 20,
        }}
      >
        <TouchableOpacity
          style={{
            height: 59,
            width: 59,
            borderRadius: 20,
            backgroundColor: COLORS.tertiary,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image
            alt="call icon"
            source={callIcon}
            style={{
              width: 25,
              height: 25,
            }}
          ></Image>
        </TouchableOpacity>
        <HStack
          style={{
            flex: 1,
            justifyContent: "flex-end",
            alignItems: "flex-end",
          }}
        >
          <TouchableOpacity
            onPress={onPressCancel}
            style={{
              height: 59,
              width: 267,
              borderRadius: 20,
              backgroundColor: "rgba(25, 74, 249, 0.3)",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                color: COLORS.white,
                ...FONTS.h2,
                ...FONTS.h2,
                paddingTop: 5,
                fontWeight: "bold",
              }}
            >
              {t("cancel")}
            </Text>
          </TouchableOpacity>
        </HStack>
      </HStack>
    </View>
  );
};

export default WaitingRiderCard;
