import { View, Text } from "react-native";
import React from "react";
import {
  Button,
  HStack,
  Image,
  NativeBaseProvider,
  ScrollView,
  VStack,
} from "native-base";
import { SafeAreaView } from "react-native-safe-area-context";
import { SIZES, COLORS, FONTS } from "../../../constants/theme";
import ButtonBack from "../../../components/Global/ButtonBack/ButtonBack";
import MapView from "react-native-maps";
import Icon from "react-native-vector-icons/FontAwesome";
import { Ionicons } from "@expo/vector-icons";

const ActivityDetailScreen = () => {
  return (
    <NativeBaseProvider>
      <VStack
        h={"100%"}
        paddingY={"20px"}
        bgColor={COLORS.background}
        paddingX={"10px"}
      >
        <SafeAreaView>
          <VStack>
            <HStack justifyContent={"center"} mb={"20px"}>
              <View style={{ position: "absolute", left: 0 }}>
                <ButtonBack></ButtonBack>
              </View>
              <Text style={{ ...FONTS.h2, color: COLORS.white }}>Detail</Text>
            </HStack>
            <ScrollView h={"100%"} showsVerticalScrollIndicator={false}>
              <MapView
                provider="google"
                style={{ width: "100%", height: 200, borderRadius: 20 }}
              ></MapView>

              <View
                style={{
                  width: "100%",
                  height: 173,
                  backgroundColor: COLORS.tertiary,
                  borderRadius: 20,
                  marginTop: 20,
                  padding: 10,
                }}
              >
                <HStack>
                  <Text style={{ ...FONTS.h5, color: COLORS.fifthary }}>
                    ID:{" "}
                  </Text>
                  <Text style={{ ...FONTS.h5, color: COLORS.white }}>
                    91176
                  </Text>
                </HStack>

                <HStack mt={"10px"}>
                  <VStack>
                    <VStack>
                      <Text style={{ ...FONTS.body5, color: COLORS.fifthary }}>
                        Pick up
                      </Text>
                      <Text style={{ ...FONTS.h5, color: COLORS.white }}>
                        University of Information Technology
                      </Text>
                    </VStack>
                    <VStack mt={"15px"}>
                      <Text style={{ ...FONTS.body5, color: COLORS.fifthary }}>
                        Drop off
                      </Text>
                      <Text style={{ ...FONTS.h5, color: COLORS.white }}>
                        University of Economic and Law
                      </Text>
                    </VStack>
                  </VStack>
                  <VStack
                    style={{ position: "absolute", right: 0 }}
                    alignItems={"center"}
                  >
                    <View
                      style={{
                        width: 35,
                        height: 35,
                        borderRadius: "50%",
                        backgroundColor: COLORS.black,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Icon
                        name="arrow-down"
                        size={20}
                        color={COLORS.fourthary}
                      ></Icon>
                    </View>
                    <View
                      style={{
                        borderLeftWidth: 1,
                        borderLeftColor: COLORS.fourthary,
                        height: "60%",
                      }}
                    ></View>
                    <View
                      style={{
                        width: 35,
                        height: 35,
                        borderRadius: "50%",
                        backgroundColor: COLORS.fourthary,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Ionicons
                        name="location"
                        size={20}
                        color={COLORS.white}
                      />
                    </View>
                  </VStack>
                </HStack>
              </View>

              <VStack
                mt={"20px"}
                h={"157px"}
                bgColor={COLORS.tertiary}
                borderRadius={20}
                padding={"10px"}
              >
                <Text style={{ ...FONTS.h5, color: COLORS.white }}>
                  Rider information
                </Text>
                <HStack mt={"5px"}>
                  <Image
                    source={require("../../../assets/images/Activity/ic_bike_white.png")}
                    alt="Avatar"
                    style={{
                      borderRadius: "50%",
                      width: 60,
                      height: 60,
                      backgroundColor: COLORS.white,
                    }}
                  />
                  <VStack ml={"12px"} justifyContent={"center"}>
                    <Text style={{ ...FONTS.h5, color: COLORS.white }}>
                      SnowFlower
                    </Text>
                    <Text style={{ ...FONTS.body6, color: COLORS.fourthary }}>
                      University of Information Technology
                    </Text>
                  </VStack>
                </HStack>
                <HStack mt={"12px"}>
                  <VStack>
                    <Text
                      style={{
                        ...FONTS.body6,
                        fontSize: "12px",
                        color: COLORS.fifthary,
                      }}
                    >
                      Bike number
                    </Text>
                    <Text
                      style={{
                        ...FONTS.body6,
                        fontSize: "12px",
                        color: COLORS.fifthary,
                      }}
                    >
                      Bike type
                    </Text>
                  </VStack>
                  <VStack ml={39}>
                    <Text
                      style={{
                        ...FONTS.h6,
                        fontSize: "12px",
                        color: COLORS.white,
                      }}
                    >
                      59X3-91176
                    </Text>
                    <Text
                      style={{
                        ...FONTS.h6,
                        fontSize: "12px",
                        color: COLORS.white,
                      }}
                    >
                      59X3-91176
                    </Text>
                  </VStack>
                  <VStack position={"absolute"} right={0} bottom={0}>
                    <HStack justifyContent={"center"} alignItems={"center"}>
                      <Text
                        style={{
                          ...FONTS.h6,
                          fontSize: "12px",
                          color: COLORS.white,
                          marginRight: 5,
                        }}
                      >
                        4.5
                      </Text>
                      <Ionicons name="star" size={20} color={"#E5E92D"} />
                    </HStack>
                  </VStack>
                </HStack>
              </VStack>

              <VStack
                mt={"20px"}
                h={"120px"}
                bgColor={COLORS.tertiary}
                borderRadius={20}
                padding={"10px"}
              >
                <Text style={{ ...FONTS.h5, color: COLORS.white }}>Price</Text>
                <HStack mt={3}>
                  <VStack>
                    <HStack>
                      <Ionicons name="map" size={20} color={COLORS.white} />
                      <Text
                        style={{
                          ...FONTS.h4,
                          color: COLORS.white,
                          marginLeft: 10,
                        }}
                      >
                        2km
                      </Text>
                    </HStack>
                    <HStack mt={2}>
                      <Ionicons name="time" size={20} color={COLORS.white} />
                      <Text
                        style={{
                          ...FONTS.h4,
                          color: COLORS.white,
                          marginLeft: 10,
                        }}
                      >
                        5 minutes
                      </Text>
                    </HStack>
                  </VStack>

                  <VStack
                    position={"absolute"}
                    right={0}
                    alignItems={"flex-end"}
                  >
                    <Text style={{ ...FONTS.h2, color: COLORS.white }}>
                      20,000đ
                    </Text>
                    <Text
                      style={{
                        ...FONTS.h5,
                        color: COLORS.grey,
                        textDecorationLine: "line-through",
                      }}
                    >
                      30,000đ
                    </Text>
                  </VStack>
                </HStack>
              </VStack>
              <Button
                mb={20}
                mt={10}
                w={"100%"}
                h={"76px"}
                borderRadius={20}
                bgColor={COLORS.primary}
                onPress={() => {}}
              >
                <Text style={{ ...FONTS.h2, color: COLORS.white }}>
                  Book again
                </Text>
              </Button>
            </ScrollView>
          </VStack>
        </SafeAreaView>
      </VStack>
    </NativeBaseProvider>
  );
};

export default ActivityDetailScreen;
