import React, { useState } from "react";
import {
  Button,
  HStack,
  Image,
  Input,
  ScrollView,
  Spacer,
  Text,
  VStack,
  View,
} from "native-base";
import { COLORS, FONTS, SIZES } from "../../constants/theme";
import { SafeAreaView } from "react-native-safe-area-context";
import ButtonBack from "../../components/Global/ButtonBack/ButtonBack";
import { PixelRatio } from "react-native";
import LoveIcon from "../../assets/icons8-smiling-face-with-heart-eyes-96.png";
import SmileIcon from "../../assets/icons8-slightly-smiling-face-96.png";
import DisappointedIcon from "../../assets/icons8-frowning-face-96.png";
import SelectedButton from "../../components/Button/SelectedButton";

const StudentListDetailScreen = () => {
  const width = 224;
  const height = width * 1.5;

  const IDWidth = PixelRatio.roundToNearestPixel(SIZES.width - 20);
  const IDHeight = IDWidth * (2 / 3);

  return (
    <VStack h={"100%"} bgColor={COLORS.background}>
      <SafeAreaView>
        <VStack h={"100%"} mt={"17px"} paddingX={"10px"}>
          <HStack mb={2} alignItems={"center"} justifyContent={"center"}>
            <View style={{ position: "absolute", left: 0 }}>
              <ButtonBack></ButtonBack>
            </View>
            <Text style={{ ...FONTS.h2, color: COLORS.white }} ml={4}>
              Student Information
            </Text>
          </HStack>

          <ScrollView showsVerticalScrollIndicator={false}>
            <VStack mt={8} pb={10}>
              <Text style={{ ...FONTS.h4, color: COLORS.fifthary }}>
                Portrait picture
              </Text>

              <View
                mt={4}
                borderRadius={10}
                w={width + "px"}
                h={height + "px"}
                bgColor={COLORS.fifthary}
                alignSelf={"center"}
              ></View>

              <Text style={{ ...FONTS.h4, color: COLORS.fifthary }} mt={10}>
                Role
              </Text>
              <Text style={{ ...FONTS.h3, color: COLORS.white }} mt={2}>
                Driver
              </Text>
              <Text style={{ ...FONTS.h4, color: COLORS.fifthary }} mt={10}>
                Full name
              </Text>
              <Text style={{ ...FONTS.h3, color: COLORS.white }} mt={2}>
                Huỳnh Thế Vĩ
              </Text>
              <Text style={{ ...FONTS.h4, color: COLORS.fifthary }} mt={10}>
                Birthday
              </Text>
              <Text style={{ ...FONTS.h3, color: COLORS.white }} mt={2}>
                23/03/2002
              </Text>
              <Text style={{ ...FONTS.h4, color: COLORS.fifthary }} mt={10}>
                Student ID
              </Text>
              <Text style={{ ...FONTS.h3, color: COLORS.white }} mt={2}>
                20520000
              </Text>
              <Text style={{ ...FONTS.h4, color: COLORS.fifthary }} mt={10}>
                School
              </Text>
              <Text style={{ ...FONTS.h3, color: COLORS.white }} mt={2}>
                University of Information Technology
              </Text>
              <Text style={{ ...FONTS.h4, color: COLORS.fifthary }} mt={10}>
                Phone number
              </Text>
              <Text style={{ ...FONTS.h3, color: COLORS.white }} mt={2}>
                0848867000
              </Text>
              <Text style={{ ...FONTS.h4, color: COLORS.fifthary }} mt={10}>
                Email Address
              </Text>
              <Text style={{ ...FONTS.h3, color: COLORS.white }} mt={2}>
                20520000@gm.uit.edu.vn
              </Text>

              <View
                h={IDHeight + "px"}
                w={IDWidth + "px"}
                bgColor={COLORS.fifthary}
                borderRadius={10}
                mt={10}
              ></View>
              <View
                h={IDHeight + "px"}
                w={IDWidth + "px"}
                bgColor={COLORS.fifthary}
                borderRadius={10}
                mt={10}
              ></View>

              <Text style={{ ...FONTS.h4, color: COLORS.fifthary }} mt={10}>
                Trip
              </Text>
              <Text style={{ ...FONTS.h3, color: COLORS.white }} mt={2}>
                20
              </Text>
              <Text style={{ ...FONTS.h4, color: COLORS.fifthary }} mt={10}>
                Rating
              </Text>
              <HStack mt={2} justifyContent={"space-between"}>
                <VStack justifyContent={"center"} alignItems={"center"}>
                  <Image size={70} source={LoveIcon} alt="Love" />
                  <Text style={{ ...FONTS.h3, color: COLORS.white }} mt={2}>
                    20
                  </Text>
                </VStack>
                <VStack justifyContent={"center"} alignItems={"center"}>
                  <Image size={70} source={SmileIcon} alt="Smile" />
                  <Text style={{ ...FONTS.h3, color: COLORS.white }} mt={2}>
                    20
                  </Text>
                </VStack>
                <VStack justifyContent={"center"} alignItems={"center"}>
                  <Image size={70} source={DisappointedIcon} alt="Dissa" />
                  <Text style={{ ...FONTS.h3, color: COLORS.white }} mt={2}>
                    20
                  </Text>
                </VStack>
              </HStack>

              <HStack justifyContent={"space-between"} space={2}>
                <SelectedButton
                  text={"Friendly (5)"}
                  isSelected={false}
                ></SelectedButton>
                <SelectedButton
                  text={"Friendly (5)"}
                  isSelected={false}
                ></SelectedButton>
                <SelectedButton
                  text={"Friendly (5)"}
                  isSelected={false}
                ></SelectedButton>
              </HStack>

              <Button
                w={"100%"}
                variant={"outline"}
                borderRadius={20}
                borderColor={COLORS.red}
                onPress={() => {}}
                mt={10}
              >
                <Text style={{ ...FONTS.h2 }} color={COLORS.red}>
                  Lock account
                </Text>
              </Button>
            </VStack>
          </ScrollView>
        </VStack>
      </SafeAreaView>
    </VStack>
  );
};

export default StudentListDetailScreen;
