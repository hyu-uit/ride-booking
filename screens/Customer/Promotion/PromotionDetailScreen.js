import React, { useState } from "react";
import {
  Button,
  HStack,
  Image,
  NativeBaseProvider,
  ScrollView,
  VStack,
  Text,
} from "native-base";
import { SafeAreaView } from "react-native-safe-area-context";
import { SIZES, COLORS, FONTS } from "../../../constants/theme";
import Img_Promotion from "../../../assets/images/Promotion/promotion.png";
import ButtonBack from "../../../components/Global/ButtonBack/ButtonBack";
import { useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../config/config";

const PromotionDetailScreen = ({ navigation, route }) => {
  const {idPromotion}=route.params
  const[promotion, setPromotion]=useState({})
  useEffect(() => {
    getPromotion();
  }, []);
  const getPromotion = () => {
    let data = {};
    getDoc(doc(db, "Promotion", idPromotion)).then((proData) => {
      if (proData.exists()) {
            data = {
              idPromotion:proData.id,
              name:proData.data().name,
              value:proData.data().value,
              expiryDate:proData.data().expiryDate,
              description:proData.data().description
            };
            setPromotion(data);
      }
    });
  };
  return (
    <VStack h={"100%"} paddingY={"20px"} bgColor={COLORS.background}>
      <SafeAreaView>
        <VStack paddingX={"10px"} h={"100%"}>
          <ButtonBack
            onPress={() => {
              navigation.goBack();
            }}
          />
          <Image source={Img_Promotion} alt="promotion" mt={5} w={"100%"} />

          <Text style={{ ...FONTS.h4, color: COLORS.fifthary }} mt={5}>
            {promotion.name}
          </Text>
          <Text style={{ ...FONTS.body4, color: COLORS.white }} mt={1}>
            Discount {promotion.value} for a ride
          </Text>
          <Text style={{ ...FONTS.h4, color: COLORS.fifthary }} mt={5}>
            Terms and Conditions
          </Text>
          <Text style={{ ...FONTS.body4, color: COLORS.white }} mt={1}>
            {/* - This promotion is applied for ride service.{"\n"}- This promotion
            is applied in the provinces/cities where the service is provided.
            {"\n"}- This promotion is applied for the following payment methods:
            Cash, Credit Card, Debit Card, Cake, ZaloPay, ShopeePay, SmartPay,
            Viettel Money, TrueMoney, and Momo{"\n"}- Go to Promotion, click
            "Discount 10K" to apply for the promotion */}
            {promotion.description}
          </Text>

          <Button
            w={"100%"}
            borderRadius={20}
            bgColor={COLORS.primary}
            position={"absolute"}
            bottom={0}
            onPress={() => { const data = {
              idPromotion: "" + idPromotion,
            };
            navigation.navigate("Booking", data);
          }}
          >
            <Text style={{ ...FONTS.h2 }} color={COLORS.white}>
              Book now
            </Text>
          </Button>
        </VStack>
      </SafeAreaView>
    </VStack>
  );
};

export default PromotionDetailScreen;
