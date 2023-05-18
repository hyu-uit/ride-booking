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
import ButtonBack from "../../components/Global/ButtonBack/ButtonBack";
import { PixelRatio } from "react-native";
import RejectModal from "../../components/Modal/RejectModal";
import { TabView, TabBar, SceneMap } from "react-native-tab-view";
import BookingCard from "../../components/BookingCard/BookingCard";
import { Ionicons } from "@expo/vector-icons";
import StudentListCard from "../../components/StudentOffice/StudentListCard";

const StudentOfficeListScreen = ({ navigation }) => {
  const FirstRoute = () => (
    <VStack paddingX={"10px"}>
      <Input
        mb={5}
        borderRadius={10}
        h={"50px"}
        placeholder="Search by Student ID"
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
        <VStack mt={"17px"} justifyContent={"center"} alignItems={"center"}>
          <StudentListCard
            onPress={() => {
              navigation.navigate("StudentListDetail");
            }}
          />
          <StudentListCard />
          <StudentListCard />
          <StudentListCard />
        </VStack>
      </ScrollView>
    </VStack>
  );

  const SecondRoute = () => (
    <VStack paddingX={"10px"}>
      <Input
        mb={5}
        borderRadius={10}
        h={"50px"}
        placeholder="Search by Student ID"
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
        <VStack mt={"17px"} justifyContent={"center"} alignItems={"center"}>
          <StudentListCard />
          <StudentListCard />
        </VStack>
      </ScrollView>
    </VStack>
  );

  const ThirdRoute = () => (
    <VStack paddingX={"10px"}>
      <Input
        mb={5}
        borderRadius={10}
        h={"50px"}
        placeholder="Search by Student ID"
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
        <VStack mt={"17px"} justifyContent={"center"} alignItems={"center"}>
          <StudentListCard />
          <StudentListCard />
        </VStack>
      </ScrollView>
    </VStack>
  );

  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
    third: ThirdRoute,
  });

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "first", title: "Customer" },
    { key: "second", title: "Rider" },
    { key: "third", title: "Locked" },
  ]);

  return (
    <VStack h={"100%"} bgColor={COLORS.background}>
      <SafeAreaView>
        <VStack h={"100%"} mt={"17px"}>
          <TabView
            navigationState={{ index, routes }}
            renderScene={renderScene}
            onIndexChange={setIndex}
            initialLayout={{ width: SIZES.width }}
            renderTabBar={(props) => (
              <TabBar
                {...props}
                style={{ backgroundColor: COLORS.tertiary }}
                inactiveColor={COLORS.fourthary}
                indicatorStyle={{ backgroundColor: COLORS.fourthary }}
                labelStyle={{ ...FONTS.h5 }}
              />
            )}
          />
        </VStack>
      </SafeAreaView>
    </VStack>
  );
};

export default StudentOfficeListScreen;
