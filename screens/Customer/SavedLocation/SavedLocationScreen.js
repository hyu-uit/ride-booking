import React, { useEffect, useState } from "react";
import { Button, FlatList, HStack, Image, Text, View } from "native-base";
import { TouchableOpacity } from "react-native";
import { COLORS, FONTS } from "../../../constants/theme";
import arrowBack from "../../../assets/back_icon.png";
import SavedLocationCard from "../../../components/SavedLocationCard";
import plusIcon from "../../../assets/plus-fifth-color.png";
import ButtonBack from "../../../components/Global/ButtonBack/ButtonBack";
import { getFromAsyncStorage } from "../../../helper/asyncStorage";
import { db } from "../../../config/config";
import {
  QuerySnapshot,
  collection,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";

const SavedLocationScreen = ({ navigation }) => {
  const [locations, setLocations] = useState([]);
  const [phoneNumber, setPhoneNumber] = useState("");

  useEffect(() => {
    fetchDataAndPhoneNumber();
  }, []);

  const fetchDataAndPhoneNumber = async () => {
    try {
      const phoneNumberValue = await getFromAsyncStorage("phoneNumber");
      setPhoneNumber(phoneNumberValue);

      if (phoneNumberValue) {
        fetchData(phoneNumberValue);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const fetchData = (phoneNumberValue) => {
    let temp = [];

    const CollectionRef = collection(db, "SavedLocation");
    const Query = query(
      CollectionRef,
      where("phoneNumber", "==", phoneNumberValue)
    );
    const unsubscribeSavedLocation = onSnapshot(Query, (QuerySnapshot) => {
      const locationsTemp = [];
      QuerySnapshot.forEach((doc) => {
        const locat = {
          address: doc.data().address,
          name: doc.data().name,
          lat: doc.data().lat,
          long: doc.data().long,
          id: doc.id,
        };
        locationsTemp.push(locat);
      });
      setLocations(locationsTemp);
    });
    return () => {
      unsubscribeSavedLocation();
    };
  };

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
        {/* <TouchableOpacity>
          <SavedLocationCard onPress={() => onClickCard}></SavedLocationCard>
        </TouchableOpacity>
         */}
        <FlatList
          w={"100%"}
          horizontal={false}
          data={locations}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <SavedLocationCard
              location={item}
              key={item.id}
            ></SavedLocationCard>
          )}
        ></FlatList>
        <HStack
          onTouchEnd={() => navigation.navigate("AddLocation")}
          space={8}
          paddingLeft={6}
          paddingTop={3}
          paddingBottom={3}
        >
          <TouchableOpacity onPress={() => {}}>
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
