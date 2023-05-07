import React from "react";
import {
  HStack,
  Image,
  Text,
  View,
} from "native-base";
import { TouchableOpacity } from "react-native";
import { COLORS, FONTS } from "../constants/theme";
import arrowBack from '../assets/back_icon.png'
import SavedLocationCard from "../components/SavedLocationCard";
import plusIcon from '../assets/plus-fifth-color.png'

const SavedLocationScreen = ({ onClickCard, onClickAdd }) => {
  return (
    <View style={{
      flex: 1, backgroundColor: COLORS.background, flexDirection: 'column'
    }}>
      <View style={{
        flexDirection: 'row',
        marginTop: 55,
        marginHorizontal: 10,
      }}>
        <TouchableOpacity style={{ height: 42, width: 42 }} onPress={() => { }}>
          <View style={{
            borderRadius: 10,
            borderColor: COLORS.fifthary,
            borderWidth: 1,
            justifyContent: 'center',
            alignItems: 'center',
            flex: 1
          }}>
            <Image alt="arrow back" source={arrowBack} style={{
              width: 9,
              height: 18,
            }}>
            </Image>
          </View>
        </TouchableOpacity>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} >
          <Text style={{
            color: COLORS.white,
            ...FONTS.h3,
            fontWeight: 'bold'
          }}>Saved Loaction</Text>
        </View>
      </View>
      <View style={{
        marginTop: 38,
        padding: 10,
        marginHorizontal: 10,
        backgroundColor: COLORS.tertiary,
        borderRadius: 20
      }}>
        <TouchableOpacity>
          <SavedLocationCard onPress={() => onClickCard}></SavedLocationCard>
        </TouchableOpacity>
        <TouchableOpacity>
          <SavedLocationCard onPress={() => onClickCard}></SavedLocationCard>
        </TouchableOpacity>
        <TouchableOpacity>
          <SavedLocationCard onPress={() => onClickCard}></SavedLocationCard>
        </TouchableOpacity>
        <HStack space={8} paddingLeft={6} paddingTop={3} paddingBottom={3}>
          <TouchableOpacity onPress={() => onClickAdd}>
            <Image alt="plus icon" source={plusIcon}></Image>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => onClickAdd}>
            <Text color={COLORS.fifthary} bold style={{ ...FONTS.h4 }}>Add location</Text>
          </TouchableOpacity>
        </HStack>
      </View>
    </View>
  );
};
export default SavedLocationScreen; 