import { View, Text } from "react-native";
import React, { useState } from "react";
import {
  Button,
  FlatList,
  HStack,
  Image,
  NativeBaseProvider,
  ScrollView,
  VStack,
} from "native-base";
import { SafeAreaView } from "react-native-safe-area-context";
import { SIZES, COLORS, FONTS } from "../../../constants/theme";
import IC_Bike_White from "../../../assets/images/Activity/ic_bike_white.png";
import IC_Bike_Blue from "../../../assets/images/Activity/ic_bike_blue.png";
import PromotionCard from "../../../components/PromotionCard";
import { getFromAsyncStorage } from "../../../helper/asyncStorage";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../../config/config";
import { useEffect } from "react";
import moment from "moment";
import { useTranslation } from "react-i18next";

const PromotionScreen = ({ navigation }) => {
  const [service, setService] = useState(0);
  const [phoneNumber, setPhone] = useState(null);
  const [promotionList, setPromotionList] = useState({});

  useEffect(() => {
    // fetchDataAndPhoneNumber()
    getPromotionList();
  }, [navigation]);

  // const fetchDataAndPhoneNumber = async () => {
  //   try {
  //     const phoneNumberValue = await getFromAsyncStorage("phoneNumber");
  //     setPhone(phoneNumberValue);

  //     if (phoneNumberValue) {
  //       getPromotionList(phoneNumberValue);
  //     }
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  const getPromotionList = () => {
    let promotionList = [];
    getDocs(collection(db, "Promotion"))
      //where(Date("expiryDate"), ">=", moment().format('DD-MM-YYYY')))
      .then((docSnap) => {
        console.log(moment().format("DD-MM-YYYY"));
        docSnap.forEach((doc) => {
          if (doc.data().expiryDate >= moment().format("DD-MM-YYYY")) {
            promotionList.push({
              idPromotion: doc.id,
              name: doc.data().name,
              value: doc.data().value,
              expiryDate: doc.data().expiryDate,
              description: doc.data().desciption,
            });
          }
        });
        setPromotionList(promotionList);
      });
  };

  return (
    <VStack h={"100%"} paddingBottom={"20px"} bgColor={COLORS.background}>
      <SafeAreaView>
        {/* <PromotionCard
              navigate={() => {
                navigation.navigate("PromotionDetail");
              }} */}
        <FlatList
          padding={"10px"}
          horizontal={false}
          data={promotionList}
          keyExtractor={(item) => item.idPromotion}
          renderItem={({ item }) => (
            <PromotionCard
              onPress={() => {
                const data = {
                  idPromotion: "" + item.idPromotion,
                };
                navigation.navigate("PromotionDetail", data);
              }}
              promotion={item}
              key={item.idTrip}
            ></PromotionCard>
          )}
        ></FlatList>
      </SafeAreaView>
    </VStack>
  );
};

export default PromotionScreen;
