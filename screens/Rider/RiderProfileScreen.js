import React from "react";
import {
  Center,
  FlatList,
  Flex,
  VStack,
  HStack,
  Image,
  ScrollView,
  Text,
  View,
  SafeAreaView,
  Button,
  Avatar,
} from "native-base";
import { TouchableOpacity, StyleSheet, ScrollViewBase } from "react-native";
import { COLORS, FONTS } from "../../constants/theme";
import avatarIcon from "../../assets/avatar.png";

const RiderProfileScreen = ({ navigation }) => {
  return (
    <VStack
      style={{
        backgroundColor: COLORS.background,
        height: "100%",
        paddingHorizontal: 10,
      }}
    >
      <View alignItems={"center"}>
        <Text style={{ color: COLORS.white, ...FONTS.h3, fontWeight: "bold" }}>
          Profile
        </Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <VStack alignItems={"center"}>
          <Avatar
            source={avatarIcon}
            style={{ height: 118, width: 118, marginTop: 15 }}
          ></Avatar>
          <Text style={{ ...FONTS.h1, color: COLORS.white }} mt={2}>
            Phuong Uyen
          </Text>
        </VStack>
        <VStack marginTop={5} space={8}>
          <VStack>
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
          </VStack>
          <Button
            w={"100%"}
            mt={5}
            borderRadius={20}
            bgColor={COLORS.primary}
            onPress={() => {
              navigation.navigate("AuthenticationStack", {
                screen: "SignIn",
              });
            }}
          >
            <Text style={{ ...FONTS.h2 }} color={COLORS.white}>
              Log Out
            </Text>
          </Button>
        </VStack>
      </ScrollView>
    </VStack>
  );
};
const styles = StyleSheet.create({
  label: {
    borderRadius: 20,
    backgroundColor: COLORS.tertiary,
    borderColor: COLORS.fourthary,
    borderWidth: 2,
    height: 88,
    shadowOpacity: 0.25,
  },
});
export default RiderProfileScreen;
