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
  Icon,
} from "native-base";
import { COLORS, FONTS, SIZES } from "../../constants/theme";
import { SafeAreaView } from "react-native-safe-area-context";
import { TabView, TabBar, SceneMap } from "react-native-tab-view";
import HistoryCard from "../../components/HistoryCard";
import StudentOfficeCard from "../../components/StudentOffice/StudentOfficeCard";
import { Ionicons } from "@expo/vector-icons";

const StudentOfficeScreen = ({ navigation }) => {
  const [service, setService] = useState(0);

  return (
    <VStack h={"100%"} bgColor={COLORS.background}>
      <SafeAreaView>
        <VStack h={"100%"} mt={"17px"} paddingX={"10px"}>
          <HStack paddingX={5}>
            <Image
              source={require("../../assets/images/logoUIT.png")}
              alt="logo"
              w={10}
              h={10}
              resizeMode="contain"
            />
            <VStack ml={5}>
              <Text style={{ ...FONTS.body6, color: COLORS.lightGrey }}>
                UIT
              </Text>
              <Text style={{ ...FONTS.h6, color: COLORS.white }}>
                University of Information Technology
              </Text>
            </VStack>
          </HStack>
          <Input
            mb={5}
            borderRadius={10}
            h={"50px"}
            placeholder="Enter your destination"
            width="100%"
            variant={"filled"}
            bgColor={COLORS.tertiary}
            borderWidth={0}
            fontSize={SIZES.body3}
            color={COLORS.white}
            marginTop={8}
            InputLeftElement={
              <Icon
                ml="2"
                size="4"
                color={COLORS.white}
                as={<Ionicons name="ios-search" />}
              />
            }
          />
          <ScrollView>
            <StudentOfficeCard
              onPress={() => {
                navigation.navigate("StudentOfficeDetail");
              }}
            />
            <StudentOfficeCard />
            <StudentOfficeCard />
            <StudentOfficeCard />
            <StudentOfficeCard />
          </ScrollView>
        </VStack>
      </SafeAreaView>
    </VStack>
  );
};

export default StudentOfficeScreen;
