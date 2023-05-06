import React from "react";
import {
  HStack,
  Image,
  Text,
  VStack,
  View,
  Divider,
  Center,
  Flex
} from "native-base";
import { TouchableOpacity } from "react-native";
import { SIZES, COLORS, FONTS } from "../constants/theme";
import FinishedTripCard from "../components/DriverInformationCard/FinishedTripCard";

const SavedLocationScreen = ({ onClickCancel }) => {
  return (
    <FinishedTripCard></FinishedTripCard>
  );
};

export default SavedLocationScreen; 