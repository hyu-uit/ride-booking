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
} from "native-base";
import { SafeAreaView } from "react-native-safe-area-context";
import { SIZES, COLORS, FONTS } from "../../../constants/theme";
import ButtonBack from "../../../components/Global/ButtonBack/ButtonBack";
import Icon from "react-native-vector-icons/FontAwesome";
import { Ionicons } from "@expo/vector-icons";

const MenuScreen = ({ navigation }) => {
  return (
    <VStack h={"100%"} paddingY={"20px"} bgColor={COLORS.background}>
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
              <HStack>
                <Icon name="language" size={20} color={COLORS.fifthary} />
                <Text style={{ ...FONTS.h3, color: COLORS.white }} ml={5}>
                  Language
                </Text>
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
