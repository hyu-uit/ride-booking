import React from "react";
import {
  Button,
  HStack,
  Image,
  Input,
  Spacer,
  Text,
  VStack,
  View,
} from "native-base";
import { COLORS, FONTS } from "../../../constants/theme";
import { SafeAreaView } from "react-native-safe-area-context";
import ButtonBack from "../../../components/Global/ButtonBack/ButtonBack";
import PaymentMethodCard from "../../../components/PaymentMethodCard/PaymentMethodCard";
import LogoZalo from "../../../assets/images/Logos/zalo.png";
import LogoCake from "../../../assets/images/Logos/cake.png";
import LogoMomo from "../../../assets/images/Logos/momo.png";
import LogoPaypal from "../../../assets/images/Logos/paypal.png";
import LogoShopeePay from "../../../assets/images/Logos/shopeepay.png";
import LogoSmartPay from "../../../assets/images/Logos/smartpay.png";
import LogoViettel from "../../../assets/images/Logos/viettel.png";
import LogoVisa from "../../../assets/images/Logos/visa.png";

const PaymentScreen = ({ navigation }) => {
  return (
    <VStack h={"100%"} paddingY={"20px"} bgColor={COLORS.background}>
      <SafeAreaView>
        <VStack paddingX={"10px"}>
          <ButtonBack
            onPress={() => {
              navigation.goBack();
            }}
          ></ButtonBack>
          <HStack mt={10}></HStack>
          <PaymentMethodCard logo={LogoZalo} name={"Zalo"} />
          <PaymentMethodCard logo={LogoMomo} name={"Momo"} />
          <Text style={{ ...FONTS.h4, color: COLORS.white }}>
            Add new payment methods
          </Text>

          <VStack mt={5}>
            <HStack justifyContent={"center"} space={7} mb={5}>
              <HStack
                w={"45%"}
                h={"54px"}
                borderRadius={"10px"}
                borderColor={COLORS.tertiary}
                borderWidth={1.5}
                justifyContent={"center"}
                alignItems={"center"}
              >
                <Image source={LogoViettel} alt="Viettel"></Image>
                <Text style={{ ...FONTS.body4, color: COLORS.grey }}>
                  Viettel Money
                </Text>
              </HStack>
              <HStack
                w={"45%"}
                h={"54px"}
                borderRadius={"10px"}
                borderColor={COLORS.tertiary}
                borderWidth={1.5}
                justifyContent={"center"}
                alignItems={"center"}
              >
                <Image source={LogoCake} alt="Cake"></Image>
                <Text style={{ ...FONTS.body4, color: COLORS.grey }}>
                  Cake by VP
                </Text>
              </HStack>
            </HStack>
            <HStack justifyContent={"center"} space={7} mb={5}>
              <HStack
                w={"45%"}
                h={"54px"}
                borderRadius={"10px"}
                borderColor={COLORS.tertiary}
                borderWidth={1.5}
                justifyContent={"center"}
                alignItems={"center"}
              >
                <Image source={LogoVisa} alt="Visa"></Image>
                <Text style={{ ...FONTS.body4, color: COLORS.grey }}>
                  Visa Card
                </Text>
              </HStack>
              <HStack
                w={"45%"}
                h={"54px"}
                borderRadius={"10px"}
                borderColor={COLORS.tertiary}
                borderWidth={1.5}
                justifyContent={"center"}
                alignItems={"center"}
              >
                <Image source={LogoSmartPay} alt="SmartPay"></Image>
                <Text style={{ ...FONTS.body4, color: COLORS.grey }}>
                  SmartPay
                </Text>
              </HStack>
            </HStack>
            <HStack justifyContent={"center"} space={7} mb={5}>
              <HStack
                w={"45%"}
                h={"54px"}
                borderRadius={"10px"}
                borderColor={COLORS.tertiary}
                borderWidth={1.5}
                justifyContent={"center"}
                alignItems={"center"}
              >
                <Image source={LogoShopeePay} alt="Shopee"></Image>
                <Text style={{ ...FONTS.body4, color: COLORS.grey }}>
                  ShopeePay
                </Text>
              </HStack>
              <HStack
                w={"45%"}
                h={"54px"}
                borderRadius={"10px"}
                borderColor={COLORS.tertiary}
                borderWidth={1.5}
                justifyContent={"center"}
                alignItems={"center"}
              >
                <Image source={LogoPaypal} alt="Paypal"></Image>
                <Text style={{ ...FONTS.body4, color: COLORS.grey }}>
                  Paypal
                </Text>
              </HStack>
            </HStack>
          </VStack>
        </VStack>
      </SafeAreaView>
    </VStack>
  );
};

export default PaymentScreen;
