import React from "react";
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
import { COLORS, FONTS, SIZES } from "../../../constants/theme";
import { SafeAreaView } from "react-native-safe-area-context";
import ButtonBack from "../../../components/Global/ButtonBack/ButtonBack";
import { useState } from "react";
import { TabView, TabBar, SceneMap } from "react-native-tab-view";
import IC_Bike_White from "../../../assets/images/Activity/ic_bike_white.png";
import IC_Bike_Blue from "../../../assets/images/Activity/ic_bike_blue.png";
import HistoryCard from "../../../components/HistoryCard";

const ScheduledScreen = ({ navigation }) => {
  const [service, setService] = useState(0);

  const FirstRoute = () => (
    <ScrollView>
      <VStack mt={"17px"} justifyContent={"center"} alignItems={"center"}>
        <HistoryCard />
        <HistoryCard />
        <HistoryCard />
        <HistoryCard />
        <HistoryCard />
        <HistoryCard />
        <HistoryCard />
        <HistoryCard />
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

  const ThirdRoute = () => (
    <ScrollView>
      <VStack mt={"17px"} justifyContent={"center"} alignItems={"center"}>
        <HistoryCard />
      </VStack>
    </ScrollView>
  );

  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
    third: ThirdRoute,
  });

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "first", title: "Booking" },
    { key: "second", title: "Booked" },
    { key: "third", title: "Canceled" },
  ]);

  return (
    <VStack h={"100%"} paddingY={"20px"} bgColor={COLORS.background}>
      <SafeAreaView>
        <HStack
          mb={10}
          marginX={"10px"}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <View style={{ position: "absolute", left: 0 }}>
            <ButtonBack
              onPress={() => {
                navigation.goBack();
              }}
            ></ButtonBack>
          </View>
          <Text style={{ ...FONTS.h2, color: COLORS.white }} ml={4}>
            Scheduled
          </Text>
        </HStack>
        <HStack justifyContent={"center"} space={"10px"}>
          <Button
            w={"45%"}
            h={"70px"}
            borderRadius={20}
            bgColor={service === 0 ? COLORS.primary : COLORS.tertiary}
            onPress={() => {
              setService(0);
            }}
          >
            {/* <Image
                  src={require("../../../assets/images/Activity/ic_bike.png`")}
                /> */}
            <HStack justifyContent={"center"} alignItems={"center"}>
              {service === 0 ? (
                <>
                  <Image
                    source={IC_Bike_White}
                    alt="Icon bike"
                    // Other props here
                  />
                </>
              ) : (
                <>
                  <Image
                    source={IC_Bike_Blue}
                    alt="Icon bike"
                    // Other props here
                  />
                </>
              )}

              <Text
                style={{
                  ...FONTS.h2,
                  color: service === 0 ? COLORS.white : COLORS.fourthary,
                }}
              >
                Bike
              </Text>
            </HStack>
          </Button>
          <Button
            w={"45%"}
            h={"70px"}
            borderRadius={20}
            bgColor={service === 1 ? COLORS.primary : COLORS.tertiary}
            onPress={() => {
              setService(1);
            }}
          >
            {/* <Image
                  src={require("../../../assets/images/Activity/ic_bike.png`")}
                /> */}
            <HStack justifyContent={"center"} alignItems={"center"}>
              {service === 1 ? (
                <>
                  <Image
                    source={require("../../../assets/images/Activity/ic_send_white.png")}
                    alt="Icon send"
                    // Other props here
                  />
                </>
              ) : (
                <>
                  <Image
                    source={require("../../../assets/images/Activity/ic_send_blue.png")}
                    alt="Icon send"
                    // Other props here
                  />
                </>
              )}
              <Text
                style={{
                  ...FONTS.h2,
                  color: service === 1 ? COLORS.white : COLORS.fourthary,
                }}
              >
                Send
              </Text>
            </HStack>
          </Button>
        </HStack>

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

export default ScheduledScreen;
