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
import { collection, doc, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../../config/config";
import { getFromAsyncStorage } from "../../helper/asyncStorage";
import { useTranslation } from "react-i18next";

const IncomeScreen = () => {
  const [service, setService] = useState(0);
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [text, setText] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [value, setValue] = useState(0);
  const [selectedTime, setSelectedTime] = useState("day");

  const handleTimeChange = (index) => {
    switch (index) {
      case 0:
        setSelectedTime("day");
        break;
      case 1:
        setSelectedTime("week");
        break;
      case 2:
        setSelectedTime("month");
        break;
      default:
        setSelectedTime("day");
    }
  };
  useEffect(() => {
    let tempDate = new Date(date);
    let fDate =
      tempDate.getDate() +
      "/" +
      (tempDate.getMonth() + 1) +
      "/" +
      tempDate.getFullYear();
    setText(fDate);
    fetchDataAndPhoneNumber();
  }, [phoneNumber, text, selectedTime]);

  const fetchDataAndPhoneNumber = async () => {
    try {
      const phoneNumberValue = await getFromAsyncStorage("phoneNumber");
      setPhoneNumber(phoneNumberValue);
      if (phoneNumberValue) {
        if (selectedTime === "day") {
          getIncomeDay();
        } else if (selectedTime === "month") {
          getIncomeMonth();
        } else getIncomeWeek();
      }
    } catch (err) {
      console.log(err);
    }
  };
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
  const getIncomeDay = () => {
    const queryIncome = query(
      collection(db, "ListTrip"),
      where("idRider", "==", phoneNumber),
      where("status", "==", "done"),
      where("datePickUp", "==", text)
    );
    const unsubscribeIncome = onSnapshot(queryIncome, (querySnapshot) => {
      let totalTemp = 0;
      querySnapshot.forEach((doc) => {
        totalTemp += parseInt(doc.data().totalPrice);
      });

      setValue(totalTemp);
    });

    return () => {
      unsubscribeIncome();
    };
  };
  const getIncomeMonth = () => {
    const dateString = text;
    const dateParts = dateString.split("/");
    const month = parseInt(dateParts[1]);

    const queryIncome = query(
      collection(db, "ListTrip"),
      where("idRider", "==", phoneNumber),
      where("status", "==", "done")
    );

    const unsubscribeIncome = onSnapshot(queryIncome, (querySnapshot) => {
      let totalTemp = 0;
      querySnapshot.forEach((doc) => {
        const docDateParts = doc.data().datePickUp.split("/");
        const docMonth = parseInt(docDateParts[1]);
        if (docMonth === month) {
          totalTemp += parseInt(doc.data().totalPrice);
          console.log(totalTemp);
        }
        setValue(totalTemp);
      });
    });

    return () => {
      unsubscribeIncome();
    };
  };

  const getIncomeWeek = () => {
    const dateString = text;
    const dateParts = dateString.split("/");
    const day = parseInt(dateParts[0]);
    const month = parseInt(dateParts[1]) - 1; // tháng được đánh số từ 0 đến 11, nên cần -1
    const year = parseInt(dateParts[2]);

    const targetDate = new Date(year, month, day);
    const startOfWeek = new Date(targetDate);
    startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());
    startOfWeek.setHours(0, 0, 0, 0);

    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);

    const queryIncome = query(
      collection(db, "ListTrip"),
      where("idRider", "==", phoneNumber),
      where("status", "==", "done")
    );

    const unsubscribeIncome = onSnapshot(queryIncome, (querySnapshot) => {
      let totalTemp = 0;
      querySnapshot.forEach((doc) => {
        const dateStringDoc = doc.data().datePickUp;
        const datePartsDoc = dateStringDoc.split("/");
        const dayDoc = parseInt(datePartsDoc[0]);
        const monthDoc = parseInt(datePartsDoc[1]) - 1; // tháng được đánh số từ 0 đến 11, nên cần -1
        const yearDoc = parseInt(datePartsDoc[2]);

        const targetDateDoc = new Date(yearDoc, monthDoc, dayDoc);
        const startOfWeekDoc = new Date(targetDateDoc);
        startOfWeekDoc.setDate(
          startOfWeekDoc.getDate() - startOfWeekDoc.getDay()
        );
        startOfWeekDoc.setHours(0, 0, 0, 0);

        const endOfWeekDoc = new Date(startOfWeekDoc);
        endOfWeekDoc.setDate(startOfWeekDoc.getDate() + 6);

        if (
          startOfWeek.toString() == startOfWeekDoc.toString() &&
          endOfWeek.toString() == endOfWeekDoc.toString()
        ) {
          totalTemp += parseInt(doc.data().totalPrice);
        }
      });

      setValue(totalTemp);
    });

    return () => {
      unsubscribeIncome();
    };
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
        <Text color={COLORS.fifthary}>{t("selectDay")}</Text>
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
          {t("yourIncome")}
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
          {parseInt(value).toLocaleString()}đ
        </Text>
      </VStack>
    );
  };

  const [index, setIndex] = React.useState(0);
  const { t } = useTranslation();
  const [routes] = React.useState([
    { key: "first", title: t("day") },
    { key: "second", title: t("week") },
    { key: "third", title: t("month") },
  ]);

  return (
    <NativeBaseProvider>
      <VStack h={"100%"} paddingBottom={"20px"} bgColor={COLORS.background}>
        <SafeAreaView>
          <VStack h={"100%"}>
            <View alignItems={"center"}></View>
            <TabView
              navigationState={{ index, routes }}
              renderScene={renderScene}
              onIndexChange={(index) => {
                setIndex(index);
                handleTimeChange(index);
              }}
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
