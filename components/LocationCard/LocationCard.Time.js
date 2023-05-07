import {
  Box,
  Button,
  Center,
  Divider,
  HStack,
  Image,
  Text,
  VStack,
  View,
} from "native-base";
import React from "react";
import LineImg from "../../assets/Line4.png";
import LocationIcon from "../../assets/icons/icons8-location-48.png";
import ArrowDownIcon from "../../assets/icons/icons8-down-arrow-48.png";
import ClockIcon from "../../assets/clock_96px.png";
import BackIcon from "../../assets/back_icon.png";
import { COLORS, SIZES } from "../../constants/theme";
import { useState } from "react";
import { TouchableOpacity } from "react-native";
import {
  convertToDate,
  convertToFullDateTime,
  convertToTime,
} from "../../helper/moment";
import DateTimePicker from "@react-native-community/datetimepicker";

const LocationCardTime = ({ onClickContinue, onPressBack }) => {
  const [isNowSelected, setIsNowSelected] = useState(true);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(new Date());
  const [finalDate, setFinalDate] = useState(null);

  const handleDateChange = (_event, date) => {
    setShowDatePicker(false);
    setSelectedDate(date);
    setShowTimePicker(true);
  };

  const handleTimeChange = (_event, date) => {
    setShowTimePicker(false);
    setSelectedTime(date);

    const formattedDate = convertToDate(selectedDate);
    const formattedTime = convertToTime(date);
    const finalDateTime = `${formattedTime} ${formattedDate}`;

    setFinalDate(finalDateTime);
  };

  return (
    <View
      bgColor={"#0B0F2F"}
      w={"100%"}
      h={330}
      borderTopRadius={20}
      shadow={3}
      position={"absolute"}
      bottom={0}
      padding={"30px 25px 0 25px"}
    >
      <VStack space={4}>
        <HStack w={"100%"}>
          <VStack space={2}>
            <VStack space={1}>
              <Text bold fontSize={SIZES.h6} color={"#8CC3FF"}>
                Pick-up
              </Text>
              <Text bold fontSize={SIZES.h6} color={"white"}>
                Long An
              </Text>
            </VStack>
            <Divider />
            <VStack space={1}>
              <Text bold fontSize={SIZES.h6} color={"#8CC3FF"}>
                Destination
              </Text>
              <Text bold fontSize={SIZES.h6} color={"white"}>
                University of Information Technology
              </Text>
            </VStack>
          </VStack>
          <Center marginLeft={"auto"}>
            <Center
              borderRadius={50}
              width={"25px"}
              height={"25px"}
              bgColor={"black"}
              marginBottom={2}
            >
              <Image
                width={"20px"}
                height={"20px"}
                source={ArrowDownIcon}
                alt=""
              />
            </Center>
            <Image source={LineImg} alt="" marginBottom={2} />
            <Image
              width={"20px"}
              height={"20px"}
              source={LocationIcon}
              alt=""
            />
          </Center>
        </HStack>
        <Divider bgColor={"#125CAE"} />
        <HStack space={2} justifyContent={"center"} alignItems={"center"}>
          <Box
            w={"10px"}
            h={"10px"}
            bgColor={"#125CAE"}
            borderRadius={50}
            alignSelf={"center"}
          ></Box>
          <Text fontSize={SIZES.h6} color={"white"}>
            Schedule Time
          </Text>

          <Button
            bgColor={isNowSelected ? COLORS.fourthary : COLORS.tertiary}
            borderRadius={50}
            marginLeft={"auto"}
            onPress={() => setIsNowSelected(true)}
          >
            <Text fontSize={SIZES.base} color={"white"}>
              Now
            </Text>
          </Button>
          <TouchableOpacity
            onPress={() => {
              setShowDatePicker(true);
              setIsNowSelected(false);
            }}
          >
            <HStack
              h={"35px"}
              bgColor={isNowSelected ? COLORS.tertiary : COLORS.fourthary}
              color={"#125CAE"}
              borderRadius={50}
              alignContent={"center"}
              padding={1}
              space={1}
            >
              <Image
                w={"20px"}
                h={"20px"}
                source={ClockIcon}
                alignSelf={"center"}
                alt=""
              />
              <Text fontSize={SIZES.base} color={"white"} alignSelf={"center"}>
                {isNowSelected && finalDate ? null : finalDate}
              </Text>
            </HStack>
          </TouchableOpacity>
        </HStack>
        <HStack>
          <Button
            variant={"outline"}
            borderRadius={"20px"}
            borderWidth={"2px"}
            w={"75px"}
            h={"75px"}
            onPress={onPressBack}
          >
            <Image source={BackIcon} alt="" />
          </Button>
          <Button
            bgColor={"#3D5AF8"}
            w={"200px"}
            marginLeft={"auto"}
            borderRadius={"20px"}
            onTouchEnd={onClickContinue}
          >
            <Text color={"white"} bold fontSize={SIZES.small}>
              Continue
            </Text>
          </Button>
        </HStack>
      </VStack>
      {showDatePicker && (
        <DateTimePicker
          value={selectedDate}
          mode="date"
          is24Hour={true}
          onChange={handleDateChange}
        />
      )}

      {showTimePicker && (
        <DateTimePicker
          value={selectedTime}
          mode="time"
          is24Hour={true}
          onChange={handleTimeChange}
        />
      )}
    </View>
  );
};

export default LocationCardTime;
