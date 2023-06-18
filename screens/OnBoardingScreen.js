import React from "react";
import {
  Button,
  Center,
  FlatList,
  Flex,
  HStack,
  Image,
  ScrollView,
  Select,
  Text,
  VStack,
  View,
} from "native-base";
import { TouchableOpacity, StyleSheet, ScrollViewBase } from "react-native";
import { COLORS, FONTS } from "../constants/theme";
import arrow from "../assets/images/OnBoarding/arrow.png";
import arrowNext from "../assets/images/OnBoarding/arrowNext.png";

import { Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import VietnamFlag from "../assets/images/Login/vietnamFlag.png";
import UKFlag from "../assets/images/Login/ukFlag.png";
import { useState } from "react";
import i18next from "i18next";
import { saveToAsyncStorage } from "../helper/asyncStorage";

const { width, height } = Dimensions.get("window");

const slides = [
  {
    id: "1",
    image: require("../assets/images/OnBoarding/image-1.png"),
    title: "",
    subtitle: "",
  },
  {
    id: "2",
    image: require("../assets/images/OnBoarding/image-2.png"),
    // title: "VNU - HCM\nSTUDENTS",
    title: "",
    // subtitle:
    //   "This app is used for Student of VNU-HCM only\nThey can be a rider to share their bike\nor earn some more money",
    subtitle: "",
  },
  {
    id: "3",
    image: require("../assets/images/OnBoarding/image-3.png"),
    title: "",
    subtitle: "",
  },
];

const Slide = ({ item }) => {
  return (
    <VStack
      style={{
        alignItems: "center",
      }}
    >
      <Image
        alt="image"
        source={item.image}
        style={{
          resizeMode: "contain",
          height: item.id === "1" ? "90%" : "65%",
          width,
          marginBottom: 10,
        }}
      ></Image>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.subtitle}>{item.subtitle}</Text>
    </VStack>
  );
};
const OnBoardingScreen = ({ navigation }) => {
  const { t } = useTranslation();
  const [language, setLanguage] = useState(i18next.language);
  const [imgUri, setImgUri] = useState(null);
  useEffect(() => {
    slides[1].title = t("VNU");
    slides[1].subtitle = t("VNUContent");
    slides[2].title = t("Safety");
    slides[2].subtitle = t("SafetyContent");
    if (language === "vi") {
      setImgUri(
        "https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Flag_of_Vietnam.svg/2000px-Flag_of_Vietnam.svg.png"
      );
    } else {
      setImgUri(
        "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Flag_of_the_United_Kingdom_%281-2%29.svg/1200px-Flag_of_the_United_Kingdom_%281-2%29.svg.png"
      );
    }
  });
  const [currentSlideIndex, setCurrentSlideIndex] = React.useState(0);
  const ref = React.useRef();
  const updateCurrentSlideIndex = (e) => {
    const contentOffsetX = e.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(contentOffsetX / width);
    setCurrentSlideIndex(currentIndex);
  };

  const goToNextSlide = () => {
    const nextSlideIndex = currentSlideIndex + 1;
    if (nextSlideIndex != slides.length) {
      const offset = nextSlideIndex * width;
      ref?.current.scrollToOffset({ offset });
      setCurrentSlideIndex(currentSlideIndex + 1);
    }
  };
  const goToPreviousSlide = () => {
    const nextSlideIndex = currentSlideIndex - 1;
    if (nextSlideIndex != slides.length) {
      const offset = nextSlideIndex * width;
      ref?.current.scrollToOffset({ offset });
      setCurrentSlideIndex(currentSlideIndex - 1);
    }
  };
  const Footer = () => {
    return (
      <View
        style={{
          justifyContent: "space-between",
          alignItems: "center",
          paddingHorizontal: 20,
        }}
      >
        <View style={{ marginBottom: 30 }}>
          {currentSlideIndex == slides.length - 1 ? (
            <View style={{ flexDirection: "row", justifyContent: "center" }}>
              <TouchableOpacity
                onPress={goToPreviousSlide}
                style={styles.buttonArrow}
              >
                {/* <Image alt="arrow" source={arrow}></Image> */}
                <Ionicons
                  name={"arrow-back-outline"}
                  size={30}
                  color={COLORS.white}
                />
              </TouchableOpacity>
              <View width={5}></View>
              <TouchableOpacity
                onPress={() => {
                  saveToAsyncStorage("isFirstTime", "false");
                  navigation.navigate("AuthenticationStack", {
                    screen: "Login",
                  });
                }}
                style={styles.buttonGetStarted}
              >
                <Text
                  style={{
                    ...FONTS.h3,
                    fontWeight: "bold",
                    color: COLORS.white,
                  }}
                >
                  {t("getStarted")}
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View></View>
          )}
          {currentSlideIndex != 0 && currentSlideIndex != slides.length - 1 ? (
            <View style={{ flexDirection: "row", justifyContent: "center" }}>
              <TouchableOpacity
                onPress={goToPreviousSlide}
                style={styles.buttonArrow}
              >
                {/* <Image alt="arrow" source={arrow}></Image> */}
                <Ionicons
                  name={"arrow-back-outline"}
                  size={30}
                  color={COLORS.white}
                />
              </TouchableOpacity>
              <View width={5}></View>
              <TouchableOpacity
                onPress={goToNextSlide}
                style={styles.buttonArrow}
              >
                {/* <Image alt="arrow" source={arrowNext}></Image> */}
                <Ionicons
                  name={"arrow-forward-outline"}
                  size={30}
                  color={COLORS.white}
                />
              </TouchableOpacity>
            </View>
          ) : (
            <View />
          )}
          {currentSlideIndex == 0 ? (
            <View style={{ flexDirection: "row", justifyContent: "center" }}>
              <TouchableOpacity
                onPress={goToNextSlide}
                style={styles.buttonArrow}
              >
                <Ionicons
                  name={"arrow-forward-outline"}
                  size={30}
                  color={COLORS.white}
                />
                {/* <Image alt="arrow" source={arrowNext}></Image> */}
              </TouchableOpacity>
            </View>
          ) : (
            <View />
          )}
        </View>
      </View>
    );
  };
  return (
    <SafeAreaView
      style={{
        backgroundColor: COLORS.background,
        flex: 1,
      }}
    >
      <HStack justifyContent={"flex-end"} alignItems={"center"}>
        <Image
          source={{
            uri: imgUri,
          }}
          alt="hi"
          w={8}
          h={5}
        />
        <Select
          alignSelf={"flex-end"}
          w={"150px"}
          h={"50px"}
          borderColor={"transparent"}
          style={{ ...FONTS.body3 }}
          color={COLORS.white}
          onValueChange={(itemValue) => {
            setLanguage(itemValue);
            i18next.changeLanguage(itemValue);
          }}
          selectedValue={language}
          _selectedItem={{
            bg: COLORS.fifthary,
          }}
        >
          <Select.Item label={t("en")} value="en" />
          <Select.Item label={t("vi")} value="vi" />
        </Select>
      </HStack>
      {/* <ScrollView pagingEnabled> */}
      <FlatList
        height={height}
        ref={ref}
        onMomentumScrollEnd={updateCurrentSlideIndex}
        pagingEnabled
        data={slides}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => <Slide item={item}></Slide>}
      ></FlatList>
      {/* </ScrollView> */}
      <Footer></Footer>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  title: {
    color: COLORS.white,
    ...FONTS.h1,
    // marginTop: -100,
    fontWeight: "bold",
    textAlign: "center",
  },
  subtitle: {
    color: COLORS.grey,
    ...FONTS.body4,
    // marginTop: 20,
    // marginBottom: 40,
    fontWeight: "bold",
    textAlign: "center",
  },
  buttonArrow: {
    height: 59,
    width: 59,
    borderRadius: 59 / 2,
    backgroundColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonGetStarted: {
    height: 59,
    width: 158,
    borderRadius: 20,
    backgroundColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
  },
});
export default OnBoardingScreen;
