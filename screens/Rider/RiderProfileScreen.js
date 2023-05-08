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
    <View
      style={{
        backgroundColor: COLORS.background,
        height: "100%",
        paddingVertical: 60,
        paddingHorizontal: 20,
      }}
    >
      <VStack space={3} style={{ alignItems: "center" }}>
        <View alignItems={"center"}>
          <Text
            style={{ color: COLORS.white, ...FONTS.h3, fontWeight: "bold" }}
          >
            Profile
          </Text>
          <View
            style={{
              backgroundColor: COLORS.fourthary,
              width: 68,
              height: 5,
              marginTop: 10,
            }}
          ></View>
        </View>
        <Avatar
          source={avatarIcon}
          style={{ height: 118, width: 118, marginTop: 15 }}
        ></Avatar>
        <Text style={{ ...FONTS.h1, color: COLORS.white }}>Phuong Uyen</Text>
      </VStack>
      <VStack marginTop={5} space={8}>
        <View>
          <Text style={{ color: COLORS.grey, ...FONTS.body3 }}>
            Vehicle information
          </Text>
          <View
            justifyContent={"center"}
            paddingHorizontal={24}
            style={styles.label}
          >
            <Text style={{ color: COLORS.grey, ...FONTS.body3 }}>
              Ride Brand
            </Text>
            <Text style={{ color: COLORS.lightWhite, ...FONTS.body2 }}>
              59X3-12345
            </Text>
          </View>
        </View>
        <View>
          <Text style={{ color: COLORS.grey, ...FONTS.body3 }}>
            Phone number
          </Text>
          <View
            justifyContent={"center"}
            paddingHorizontal={24}
            style={styles.label}
          >
            <Text style={{ color: COLORS.lightWhite, ...FONTS.body2 }}>
              0393123456
            </Text>
          </View>
        </View>
        <Button
          w={"100%"}
          mt={20}
          borderRadius={20}
          bgColor={COLORS.primary}
          onPress={() => {
            navigation.navigate("AuthenticationStack", {
              screen: "Login",
            });
          }}
        >
          <Text style={{ ...FONTS.h2 }} color={COLORS.white}>
            Log Out
          </Text>
        </Button>
      </VStack>
    </View>
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
