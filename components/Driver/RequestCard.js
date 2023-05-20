import React from "react";
import { Center, Flex, HStack, Image, Text, VStack, View } from "native-base";
import { TouchableOpacity, StyleSheet } from "react-native";
import { COLORS, FONTS } from "../../constants/theme";

const RequestCard = ({ onClickAccept, onClickReject }) => {
  return (
    <View
      h={140}
      w={"100%"}
      mb={5}
      style={{
        backgroundColor: COLORS.tertiary,
        justifyContent: "center",
        padding: 20,
        borderRadius: 20,
      }}
    >
      <VStack space={1} style={{ marginVertical: 10 }}>
        <HStack alignItems={"center"}>
          <HStack flex={1}>
            <Text
              color={COLORS.white}
              style={{
                ...FONTS.h4,
                fontWeight: "bold",
              }}
            >
              Phuong Uyen
            </Text>
            <Text
              color={COLORS.lightGrey}
              style={{
                ...FONTS.body6,
                marginLeft: 5,
              }}
            >
              #ID00001
            </Text>
          </HStack>
          <View>
            <Text
              color={COLORS.white}
              style={{
                ...FONTS.h3,
                alignItems: "flex-end",
              }}
            >
              20,000đ
            </Text>
          </View>
        </HStack>
        <HStack space={10}>
          <VStack>
            <Text style={styles.titleText}>Pick-up</Text>
            <Text style={styles.detailText}>KTX Khu B</Text>
          </VStack>
          <VStack>
            <Text style={styles.titleText}>Destination</Text>
            <Text style={styles.detailText}>UIT</Text>
          </VStack>
        </HStack>
        <HStack>
          <VStack>
            <Text style={styles.titleText}>Time</Text>
            <Text style={styles.detailText}>14:20, 07/04/2023</Text>
          </VStack>
          <Flex
            flex={1}
            style={{ justifyContent: "flex-end", alignItems: "flex-end" }}
          >
            <HStack>
              <View
                style={{
                  alignContent: "center",
                }}
              >
                <TouchableOpacity
                  onPress={() => {
                    onClickReject;
                  }}
                  style={{
                    borderColor: COLORS.red,
                    height: 30,
                    width: 90,
                    marginRight: 10,
                    borderWidth: 1,
                    borderRadius: 10,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text bold color={COLORS.red} styles={{ ...FONTS.h5 }}>
                    Reject
                  </Text>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  alignItems: "flex-end",
                  justifyContent: "center",
                }}
              >
                <TouchableOpacity
                  onPress={() => {
                    onClickAccept;
                  }}
                  style={{
                    borderColor: COLORS.primary,
                    backgroundColor: COLORS.primary,
                    height: 30,
                    width: 90,
                    borderWidth: 1,
                    borderRadius: 10,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text bold color={COLORS.white} styles={{ ...FONTS.h5 }}>
                    Accept
                  </Text>
                </TouchableOpacity>
              </View>
            </HStack>
          </Flex>
        </HStack>
      </VStack>
    </View>
  );
};
const styles = StyleSheet.create({
  titleText: {
    color: COLORS.grey,
    ...FONTS.body6,
  },
  detailText: {
    color: COLORS.white,
    ...FONTS.body6,
    fontWeight: "bold",
  },
});
export default RequestCard;
