import React from "react";
import {
  Image,
  Text,
  View,
} from "native-base";
import { TouchableOpacity } from "react-native";
import { SIZES, COLORS, FONTS } from "../constants/theme";
import PromotionCard from "../components/PromotionCard"
import HistoryPickUpCard from "../components/Driver/HistoryPickUpCard";
import HistoryCancelCard from "../components/Driver/HistoryCancelCard";

const SavedLocationScreen = ({ onClickDetail }) => {
  return (
    <HistoryCancelCard></HistoryCancelCard>
  );
};
export default SavedLocationScreen; 