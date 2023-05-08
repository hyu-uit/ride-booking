import {
  Button,
  HStack,
  Input,
  NativeBaseProvider,
  Text,
  VStack,
  View,
  Image,
  Avatar,
  Switch,
  ScrollView,
} from "native-base";
import DefaultAvt from "../../../assets/image6.png";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS, FONTS, SIZES } from "../../../constants/theme";
import QRImage from "../../../assets/images/Rider/qrImg.png";
import { TabView, TabBar, SceneMap } from "react-native-tab-view";
import HistoryCard from "../../../components/HistoryCard";
import * as ImagePicker from "expo-image-picker";

const RiderHomeScreen = () => {
  const [service, setService] = useState(0);

  const openCamera = async () => {
    let permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    if (permissionResult.granted === false) {
      alert("Permission to access camera is required!");
      return;
    }
    let result = await ImagePicker.launchCameraAsync();
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const FirstRoute = () => (
    <ScrollView showsVerticalScrollIndicator={false}>
      <VStack mt={"17px"} justifyContent={"center"} alignItems={"center"}>
        <HistoryCard />
        <HistoryCard />
        <HistoryCard />
        <HistoryCard />
      </VStack>
    </ScrollView>
  );

  const SecondRoute = () => (
    <ScrollView showsVerticalScrollIndicator={false}>
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
    { key: "first", title: "Available" },
    { key: "second", title: "Finished" },
    { key: "third", title: "Canceled" },
  ]);

  return (
    <NativeBaseProvider>
      <VStack h={"100%"} paddingTop={"20px"} bgColor={COLORS.background}>
        <SafeAreaView>
          <VStack h={"100%"}>
            <VStack paddingX={"10px"}>
              <HStack w={"100%"} mb={10}>
                <Avatar source={DefaultAvt} alt="ava" />
                <VStack justifyContent={"center"} ml={3}>
                  <Text fontSize={10} color={COLORS.grey}>
                    Welcome back
                  </Text>
                  <Text fontSize={SIZES.h4} color={COLORS.white} bold>
                    Huỳnh Thế Vĩ
                  </Text>
                </VStack>
                <HStack position={"absolute"} right={0} alignItems={"center"}>
                  <Button
                    variant={"unstyled"}
                    onPress={() => {
                      openCamera();
                    }}
                  >
                    <Image
                      source={QRImage}
                      alt="qr"
                      h={"30px"}
                      w={"30px"}
                    ></Image>
                  </Button>
                  <Switch defaultIsChecked></Switch>
                </HStack>
              </HStack>
            </VStack>
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
    </NativeBaseProvider>
  );
};

export default RiderHomeScreen;
