import React from "react";
import { Image, Text, View } from "native-base";
import { TouchableOpacity } from "react-native";
import { SIZES, COLORS, FONTS } from "../constants/theme";
import pricePromotionIcon from "../assets/price-promotion.png";
import arrowWhite from "../assets/arrow-white.png";

const PromotionCard = ({ navigate }) => {
  return (
    <View
      style={{
        marginBottom: 10,
        backgroundColor: COLORS.tertiary,
        marginHorizontal: 10,
        flexDirection: "row",
      }}
    >
      <View style={{ width: 14 }}>
        <View
          style={{
            width: 28,
            height: 28,
            borderRadius: 28 / 2,
            backgroundColor: COLORS.background,
            marginLeft: -14,
            marginTop: 62,
          }}
        ></View>
      </View>
      <View style={{ backgroundColor: "white", flex: 1 }}>
        <View
          style={{
            height: 116,
            backgroundColor: COLORS.tertiary,
          }}
        >
          <View
            style={{
              height: 72,
              flex: 9,
            }}
          >
            <Text
              style={{
                color: COLORS.white,
                ...FONTS.h2,
                fontWeight: "bold",
                marginLeft: 13,
                marginTop: 18,
              }}
            >
              Discount 10K
            </Text>
            <Text
              style={{
                color: COLORS.fourthary,
                fontSize: 10,
                fontWeight: "bold",
                textAlign: "right",
                marginRight: 10,
                marginBottom: 5,
                marginTop: 6,
              }}
            >
              02/04/2023
            </Text>
            <View
              style={{
                height: 1,
                borderStyle: "dashed",
                borderColor: COLORS.background,
                borderWidth: 1,
              }}
            ></View>
          </View>
          <View
            style={{
              flex: 5,
              flexDirection: "row",
            }}
          >
            <View
              style={{
                flex: 2,
                alignItems: "center",
                marginLeft: 13,
                flexDirection: "row",
              }}
            >
              <Image
                alt="price icon"
                source={pricePromotionIcon}
                style={{
                  width: 16,
                  height: 16,
                }}
              ></Image>
              <Text
                style={{
                  color: COLORS.fifthary,
                  ...FONTS.h5,
                  marginLeft: 10,
                }}
              >
                10.000đ
              </Text>
            </View>
            <View
              style={{
                flex: 1,
                alignItems: "flex-end",
                justifyContent: "center",
              }}
            >
              <TouchableOpacity
                onPress={navigate}
                style={{
                  marginTop: 6,
                  borderColor: COLORS.fourthary,
                  height: 24,
                  width: 73,
                  marginRight: 10,
                  borderWidth: 1,
                  borderRadius: 10,
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  alignContent: "center",
                }}
              >
                <Text
                  style={{
                    color: COLORS.white,
                    fontSize: 10,
                    fontWeight: "bold",
                    marginLeft: 7,
                  }}
                >
                  Detail
                </Text>
                <Image
                  alt="arrow white"
                  source={arrowWhite}
                  style={{
                    height: 13,
                    width: 13,
                    marginLeft: 5,
                    resizeMode: "contain",
                  }}
                ></Image>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default PromotionCard;
