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
import { TabView, TabBar, SceneMap } from "react-native-tab-view";
import HistoryCard from "../../components/HistoryCard";
import StudentOfficeCard from "../../components/StudentOffice/StudentOfficeCard";

const StudentOfficeScreen = ({ navigation }) => {
  const [service, setService] = useState(0);

  const FirstRoute = () => (
    <ScrollView>
      <VStack
        mt={"17px"}
        paddingX={"10px"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <StudentOfficeCard navigation={navigation} />
        <StudentOfficeCard />
        <StudentOfficeCard />
        <StudentOfficeCard />
        <StudentOfficeCard />
        <StudentOfficeCard />
        <StudentOfficeCard />
      </VStack>
    </ScrollView>
  );

  const SecondRoute = () => (
    <ScrollView>
      <VStack mt={"17px"} justifyContent={"center"} alignItems={"center"}>
        <HistoryCard />
        <HistoryCard />
      </VStack>
    </ScrollView>
  );

  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
  });

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "first", title: "Waiting" },
    { key: "second", title: "Confirmed" },
  ]);

  return (
    <VStack h={"100%"} bgColor={COLORS.background}>
      <SafeAreaView>
        <VStack h={"100%"} mt={"17px"}>
          <Text
            alignSelf={"center"}
            style={{ ...FONTS.h4, color: COLORS.white }}
            mb={7}
          >
            University of Information Technology
          </Text>
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

export default StudentOfficeScreen;
