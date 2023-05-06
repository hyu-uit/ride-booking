import React from "react";
import {
  Image,
  Text,
  View,
} from "native-base";
import { TouchableOpacity } from "react-native";
import { SIZES, COLORS, FONTS } from "../constants/theme";
import pricePromotionIcon from '../assets/price-promotion.png'
import arrowWhite from '../assets/arrow-white.png'
import PromotionCard from "../components/PromotionCard";
import SavedLocationCard from "../components/SavedLocationCard";

const SavedLocationScreen = ({ onClickDetail }) => {
  return (
    <SavedLocationCard></SavedLocationCard>
  );
};
export default SavedLocationScreen; 