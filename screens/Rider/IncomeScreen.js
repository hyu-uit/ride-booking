import {
  NativeBaseProvider,
  Text,
  VStack,
  View,
  ScrollView,
  Stack,
  Image,
  HStack,
} from "native-base";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS, FONTS, SIZES } from "../../constants/theme";
import { TabView, TabBar, SceneMap } from "react-native-tab-view";
import calendarIcon from "../../assets/calendar.png";
import { TouchableOpacity } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Ionicons } from "@expo/vector-icons";

const IncomeScreen = () => {
  const [service, setService] = useState(0);
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [text, setText] = useState("08/05/2023");

  const onChange = (event, seletedDate) => {
    const currentDate = seletedDate || date;
    setShow(Platform.OS == "ios");
    setDate(currentDate);

    let tempDate = new Date(currentDate);
    let fDate =
      tempDate.getDate() +
      "/" +
      (tempDate.getMonth() + 1) +
      "/" +
      tempDate.getFullYear();
    setText(fDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };
  const FirstRoute = () => (
    <ScrollView>
      <VStack
        padding={"20px"}
        mt={"17px"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <PickDate></PickDate>
        <TotalIncome></TotalIncome>
      </VStack>
    </ScrollView>
  );

  const SecondRoute = () => (
    <ScrollView>
      <VStack
        padding={"20px"}
        mt={"17px"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <PickDate></PickDate>
        <TotalIncome></TotalIncome>
      </VStack>
    </ScrollView>
  );

  const ThirdRoute = () => (
    <ScrollView>
      <VStack
        padding={"20px"}
        mt={"17px"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <PickDate></PickDate>
        <TotalIncome></TotalIncome>
      </VStack>
    </ScrollView>
  );

  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
    third: ThirdRoute,
  });
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    console.warn("A date has been picked: ", date);
    hideDatePicker();
  };
  const PickDate = () => {
    return (
      <HStack
        space={3}
        style={{
          backgroundColor: "rgba(18,92,174,0.3)",
          height: 45,
          width: "100%",
          borderRadius: 10,
          alignItems: "center",
          flex: 1,
          paddingHorizontal: 20,
        }}
      >
        <Text color={COLORS.fifthary}>Select date</Text>
        {/* <Text color={COLORS.white} flex={1}>
          {text}
        </Text> */}
        <TouchableOpacity
          onPress={() => showMode("date")}
          justifyContent={"flex-end"}
        >
          <Ionicons name={"calendar"} size={20} color={COLORS.fifthary} />
        </TouchableOpacity>
        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode={mode}
            is24Hour={true}
            display="default"
            onChange={onChange}
          ></DateTimePicker>
        )}
      </HStack>
    );
  };
  const TotalIncome = () => {
    return (
      <VStack
        space={30}
        mt={8}
        style={{
          backgroundColor: "rgba(18,92,174,0.3)",
          height: 384,
          width: "100%",
          borderRadius: 10,
          alignItems: "center",
          justifyContent: "center",
          flex: 1,
        }}
      >
        <Text flex={1} mt={5} color={COLORS.white} style={{ ...FONTS.body3 }}>
          Your total income is
        </Text>
        <Text
          flex={1}
          color={COLORS.white}
          style={{
            fontSize: 48,
            padding: 30,
            fontWeight: "bold",
            justifyContent: "center",
          }}
        >
          78,000đ
        </Text>
      </VStack>
    );
  };

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "first", title: "DAY" },
    { key: "second", title: "WEEK" },
    { key: "third", title: "MONTH" },
  ]);

  return (
    <NativeBaseProvider>
      <VStack h={"100%"} paddingBottom={"20px"} bgColor={COLORS.background}>
        <SafeAreaView>
          <VStack h={"100%"}>
            <View alignItems={"center"}>
              <Text
                style={{ color: COLORS.white, ...FONTS.h2, fontWeight: "bold" }}
                mb={10}
              >
                Income
              </Text>
            </View>
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

export default IncomeScreen;
