import React, { useEffect, useState } from "react";
import { Button, HStack, Image, Input, Text, VStack, View } from "native-base";
import { COLORS, FONTS } from "../../../constants/theme";
import { SafeAreaView } from "react-native-safe-area-context";
import ButtonBack from "../../../components/Global/ButtonBack/ButtonBack";
import { Alert, Keyboard } from "react-native";
import { TouchableWithoutFeedback } from "react-native";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../../../config/config";
import { getFromAsyncStorage } from "../../../helper/asyncStorage";

const ConfirmLocationScreen = ({ navigation, route }) => {
  const [phoneNumber, setPhoneNumber] = useState();
  const [name, setName] = useState();
  const [locations, setLocations] = useState([{}]);
  useEffect(() => {
    const phoneNumberValue = getFromAsyncStorage("phoneNumber").then(
      (value) => {
        setPhoneNumber(value);
        getDocs(
          query(
            collection(db, "SavedLocation"),
            where("phoneNumber", "==", value)
          )
        ).then((docSnap) => {
          docSnap.forEach((doc) => {
            setLocations((prevArray) => [
              ...prevArray,
              { name: doc.data().name },
            ]);
          });
        });
      }
    );
  }, []);

  const ConfirmLocation = () => {
    console.log();
    // setDoc(doc(db, "SavedLocation", phoneNumber), {
    //   phoneNumber: phoneNumber,
    //   name: name,
    //   address: route.params.address,
    //   latitude: route.params.latitude,
    //   longtitude: route.params.longtitude,
    // });
    // navigation.navigate("Menu");
    // updateDoc(doc(db, "SavedLocation",), {
    //   phoneNumber: phoneNumber,
    // });
    // addDoc(doc(db, "SavedLocation"), {
    //   address: route.params.address,
    // });
    if (name) {
      if (locations.some((obj) => obj.name === name)) {
        Alert.alert("This name existed", "", [
          {
            text: "OK",
            onPress: () => {
              // props.onPressDelete(phoneNumber);
            },
          },
        ]);
      } else {
        const collectionRef = collection(db, "SavedLocation");
        addDoc(collectionRef, {
          address: route.params.address,
          name: name,
          phoneNumber: phoneNumber,
          lat: "" + route.params.latitude,
          long: "" + route.params.longitude,
        });
        navigation.goBack();
        navigation.goBack();
      }
    } else {
      Alert.alert("Please enter name to save", "", [
        {
          text: "OK",
          onPress: () => {
            // props.onPressDelete(phoneNumber);
          },
        },
      ]);
    }
  };

  return (
    <VStack h={"100%"} paddingY={"20px"} bgColor={COLORS.background}>
      <SafeAreaView>
        <TouchableWithoutFeedback
          onPress={() => {
            Keyboard.dismiss();
          }}
        >
          <VStack paddingX={"10px"} h={"100%"}>
            <HStack mb={"20px"} alignItems={"center"} justifyContent={"center"}>
              <View style={{ position: "absolute", left: 0 }}>
                <ButtonBack
                  onPress={() => {
                    navigation.goBack();
                  }}
                ></ButtonBack>
              </View>
              <Text style={{ ...FONTS.h2, color: COLORS.white }} ml={4}>
                Confirm location
              </Text>
            </HStack>
            <Input
              w={"100%"}
              h={"50px"}
              borderRadius={20}
              borderColor={COLORS.secondary}
              mt={2}
              mb={3}
              placeholder="Enter your location's name"
              style={{ ...FONTS.body3 }}
              color={COLORS.white}
              value={name}
              onChangeText={(value) => {
                setName(value);
              }}
            />

            <Text style={{ ...FONTS.h4, color: COLORS.fifthary }} mt={5}>
              Address
            </Text>
            <Text style={{ ...FONTS.body4, color: COLORS.white }} mt={1}>
              {route.params.address}
            </Text>
            <HStack
              position={"absolute"}
              bottom={0}
              w={"100%"}
              justifyContent={"center"}
            >
              <Button
                w={"90%"}
                borderRadius={20}
                bgColor={COLORS.primary}
                onPress={ConfirmLocation}
              >
                <Text style={{ ...FONTS.h2, color: COLORS.white }}>
                  Confirm
                </Text>
              </Button>
            </HStack>
          </VStack>
        </TouchableWithoutFeedback>
      </SafeAreaView>
    </VStack>
  );
};

export default ConfirmLocationScreen;
