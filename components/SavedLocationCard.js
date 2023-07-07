import React, { useEffect } from "react";
import {
  Divider,
  Image,
  Text,
  Box,
  HStack,
  View,
  Center,
  Flex,
} from "native-base";
import { TouchableOpacity } from "react-native";
import { SIZES, COLORS, FONTS } from "../constants/theme";
import deleteIcon from "../assets/delete-icon.png";
import homeIcon from "../assets/home-icon.png";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../config/config";
import { Alert } from "react-native";

const SavedLocationCard = ({ location, key }) => {
  const DeleteLocation = () => {
    // console.log(location.id);
    // const Ref = collection(db, "SavedLocation");
    Alert.alert("Are you want to delete this location?", "", [
      {
        text: "Cancel",
        onPress: () => {
          // props.onPressDelete(phoneNumber);
        },
      },
      {
        text: "OK",
        onPress: () => {
          deleteDoc(doc(db, "SavedLocation", location.id));
          // props.onPressDelete(phoneNumber);
        },
      },
    ]);
  };

  return (
    <View
      mb={5}
      style={{
        backgroundColor: COLORS.tertiary,
        justifyContent: "center",
      }}
    >
      <HStack style={{ marginHorizontal: 10 }}>
        <Center
          style={{
            width: 52,
            height: 52,
            borderRadius: 52 / 2,
            backgroundColor: COLORS.fourthary,
            justifyContent: "center",
          }}
        >
          <Image
            alt="home icon"
            source={homeIcon}
            style={{
              width: 29,
              height: 27,
            }}
          ></Image>
        </Center>
        <View
          style={{
            flexDirection: "row",
            marginLeft: 15,
            flexWrap: "wrap",
            flexShrink: 2,
          }}
        >
          <Text
            style={{
              color: COLORS.white,
              ...FONTS.h5,
              fontWeight: "bold",
            }}
          >
            {location.name}
          </Text>
          <Text
            style={{
              color: COLORS.white,
              ...FONTS.body6,
            }}
          >
            {location.address}
          </Text>
          <Divider bgColor={"#192157"} style={{ marginTop: 14 }}></Divider>
        </View>
        <View
          style={{
            justifyContent: "center",
            alignContent: "center",
            alignItems: "center",
            marginLeft: 20,
          }}
        >
          <TouchableOpacity onPress={DeleteLocation}>
            <Image
              source={deleteIcon}
              style={{
                width: 18,
                height: 16,
              }}
            ></Image>
          </TouchableOpacity>
        </View>
      </HStack>
    </View>
  );
};
export default SavedLocationCard;
