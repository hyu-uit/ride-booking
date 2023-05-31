import React from "react";
import { HStack, Image, Text, View } from "native-base";
import { TouchableOpacity } from "react-native";
import { COLORS, FONTS } from "../../../constants/theme";
import arrowBack from "../../../assets/back_icon.png";
import SavedLocationCard from "../../../components/SavedLocationCard";
import plusIcon from "../../../assets/plus-fifth-color.png";
import ButtonBack from "../../../components/Global/ButtonBack/ButtonBack";

const SavedLocationScreen = ({ onClickCard, onClickAdd, navigation }) => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.background,
        flexDirection: "column",
        paddingHorizontal: 10,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          marginTop: 55,
          marginHorizontal: 10,
        }}
      >
        <ButtonBack
          onPress={() => {
            navigation.goBack();
          }}
        />
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text
            style={{
              color: COLORS.white,
              ...FONTS.h3,
              fontWeight: "bold",
            }}
          >
            Saved Loaction
          </Text>
        </View>
      </View>
      <View
        style={{
          marginTop: 38,
          padding: 10,
          marginHorizontal: 10,
          backgroundColor: COLORS.tertiary,
          borderRadius: 20,
        }}
      >
        <TouchableOpacity>
          <SavedLocationCard onPress={() => onClickCard}></SavedLocationCard>
        </TouchableOpacity>
        <TouchableOpacity>
          <SavedLocationCard onPress={() => onClickCard}></SavedLocationCard>
        </TouchableOpacity>
        <TouchableOpacity>
          <SavedLocationCard onPress={() => onClickCard}></SavedLocationCard>
        </TouchableOpacity>
        <HStack
          onTouchEnd={() => navigation.navigate("AddLocation")}
          space={8}
          paddingLeft={6}
          paddingTop={3}
          paddingBottom={3}
        >
          <TouchableOpacity onPress={() => onClickAdd}>
            <Image alt="plus icon" source={plusIcon}></Image>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text color={COLORS.fifthary} bold style={{ ...FONTS.h4 }}>
              Add location
            </Text>
          </TouchableOpacity>
        </HStack>
      </View>
    </View>
  );
};
export default SavedLocationScreen;
