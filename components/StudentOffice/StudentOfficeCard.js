import React from "react";
import {
  Button,
  HStack,
  Image,
  Input,
  ScrollView,
  Spacer,
  Text,
  VStack,
  View,
  Avatar,
} from "native-base";
import DefaultAvt from "../../assets/image6.png";
import { COLORS, FONTS, SIZES } from "../../constants/theme";

const StudentOfficeCard = () => {
  return (
    <VStack
      w={"100%"}
      bgColor={COLORS.tertiary}
      pb={3}
      borderRadius={"20px"}
      h={"130px"}
      mb={5}
    >
      <HStack>
        <VStack w={"75%"}>
          <HStack padding={3}>
            <Avatar source={DefaultAvt} alt="ava"></Avatar>
            <VStack ml={4}>
              <Text style={{ ...FONTS.h4, color: COLORS.white }}>
                Huỳnh Thế Vĩ
              </Text>
              <Text style={{ ...FONTS.body5, color: COLORS.fifthary }}>
                20520000
              </Text>
            </VStack>
          </HStack>
          <HStack
            paddingLeft={2}
            paddingRight={3}
            justifyContent={"space-between"}
          >
            <VStack w={"35%"} alignItems={"center"} justifyContent={"center"}>
              <Text style={{ ...FONTS.body5, color: COLORS.grey }}>
                Birthday
              </Text>
              <Text style={{ ...FONTS.h6, color: COLORS.white }}>
                23/03/2002
              </Text>
            </VStack>
            <VStack w={"20%"} alignItems={"center"} justifyContent={"center"}>
              <Text style={{ ...FONTS.body5, color: COLORS.grey }}>School</Text>
              <Text style={{ ...FONTS.h6, color: COLORS.white }}>UIT</Text>
            </VStack>
            <VStack w={"20%"} alignItems={"center"} justifyContent={"center"}>
              <Text style={{ ...FONTS.body5, color: COLORS.grey }}>Role</Text>
              <Text style={{ ...FONTS.h6, color: COLORS.white }}>Driver</Text>
            </VStack>
          </HStack>
        </VStack>
        <VStack w={"25%"} justifyContent={"flex-end"} alignItems={"center"}>
          <Button
            variant={"outline"}
            borderColor={COLORS.red}
            width={"90%"}
            h={"35%"}
            justifyContent={"center"}
            alignItems={"center"}
            borderRadius={"10px"}
          >
            <Text style={{ ...FONTS.h5, color: COLORS.red }}>Reject</Text>
          </Button>
          <Button
            width={"90%"}
            borderRadius={"10px"}
            h={"35%"}
            justifyContent={"center"}
            alignItems={"center"}
            mt={1}
            bgColor={COLORS.primary}
          >
            <Text style={{ ...FONTS.h5, color: COLORS.white }}>Accept</Text>
          </Button>
        </VStack>
      </HStack>
    </VStack>
  );
};

export default StudentOfficeCard;
