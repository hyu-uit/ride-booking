import React, { useState } from "react";
import {
  Button,
  HStack,
  Image,
  NativeBaseProvider,
  ScrollView,
  VStack,
  Text,
  View,
  Divider,
  Switch,
  Select,
} from "native-base";
import { SafeAreaView } from "react-native-safe-area-context";
import { SIZES, COLORS, FONTS } from "../../../constants/theme";
import ButtonBack from "../../../components/Global/ButtonBack/ButtonBack";
import Icon from "react-native-vector-icons/FontAwesome";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useEffect } from "react";
import { Dimensions } from "react-native";
import { useTranslation } from "react-i18next";
import i18next from "i18next";

const MenuScreen = ({ navigation }) => {
  const contentHeight = Dimensions.get("window").height;
  const { t } = useTranslation();
  const [language, setLanguage] = useState(i18next.language);
  const [imgUri, setImgUri] = useState(null);

  useEffect(() => {
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

  return (
    <VStack h={contentHeight} paddingY={"20px"} bgColor={COLORS.background}>
      <SafeAreaView>
        <VStack paddingX={"10px"} h={"100%"}>
          <HStack justifyContent={"center"} mb={"20px"}>
            <View style={{ position: "absolute", left: 0 }}>
              <ButtonBack
                onPress={() => {
                  navigation.goBack();
                }}
              ></ButtonBack>
            </View>
            <Text style={{ ...FONTS.h2, color: COLORS.white }}>Menu</Text>
          </HStack>
          <VStack paddingX={"10px"} mt={10}>
            <Button
              bgColor={"transparent"}
              w={"100%"}
              justifyContent={"flex-start"}
              onPress={() => {
                navigation.navigate("Scheduled");
              }}
            >
              <HStack>
                <Icon name="calendar" size={20} color={COLORS.fifthary} />
                <Text style={{ ...FONTS.h3, color: COLORS.white }} ml={5}>
                  Schedule
                </Text>
              </HStack>
            </Button>
            <Divider mt={3} bg={COLORS.tertiary} />
            <Button
              bgColor={"transparent"}
              w={"100%"}
              justifyContent={"flex-start"}
              onPress={() => {
                navigation.navigate("Payment");
              }}
            >
              <HStack>
                <Icon name="credit-card" size={20} color={COLORS.fifthary} />
                <Text style={{ ...FONTS.h3, color: COLORS.white }} ml={5}>
                  Payment methods
                </Text>
              </HStack>
            </Button>
            <Divider mt={3} bg={COLORS.tertiary} />
            <Button
              bgColor={"transparent"}
              w={"100%"}
              justifyContent={"flex-start"}
              onPress={() => {
                navigation.navigate("SavedLocation");
              }}
            >
              <HStack>
                <Ionicons name="location" size={20} color={COLORS.fifthary} />
                <Text style={{ ...FONTS.h3, color: COLORS.white }} ml={5}>
                  Address
                </Text>
              </HStack>
            </Button>
            <Divider mt={3} bg={COLORS.tertiary} />
            <Button
              bgColor={"transparent"}
              w={"100%"}
              justifyContent={"flex-start"}
            >
              <HStack alignItems={"center"}>
                <Icon name="language" size={20} color={COLORS.fifthary} />
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
            </Button>
          </VStack>
          <HStack
            mt={10}
            alignItems={"center"}
            w={"100%"}
            justifyContent={"center"}
          >
            <Text style={{ ...FONTS.h5, color: COLORS.white }} mr={5}>
              Light
            </Text>
            <Switch
              alignSelf={"center"}
              onTrackColor={COLORS.fourthary}
              defaultIsChecked
            />
            <Text style={{ ...FONTS.h5, color: COLORS.fifthary }} ml={5}>
              Dark
            </Text>
          </HStack>
        </VStack>
      </SafeAreaView>
    </VStack>
  );
};

export default MenuScreen;
