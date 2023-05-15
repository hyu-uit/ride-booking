import {
  Avatar,
  HStack,
  Text,
  Button,
  VStack,
  View,
  Image,
  Flex,
} from "native-base";
import React, { useState } from "react";
import DefaultAvt from "../../assets/image6.png";
import { COLORS, SIZES, FONTS } from "../../constants/theme";
import { TouchableOpacity } from "react-native";
import DisappointedIcon from "../../assets/icons8-frowning-face-96.png";

const StudentReportCard = ({ onPress, type }) => {
  const [status, setStatus] = useState(0);
  return (
    <View
      bgColor={"#101744"}
      w={"100%"}
      h={130}
      borderRadius={20}
      shadow={3}
      marginBottom={5}
      onTouchEnd={onPress}
    >
      <HStack>
        <VStack>
          <HStack w={"full"}>
            <Avatar source={DefaultAvt} margin={"10px 0 0 10px"} />
            <VStack margin={"10px 0 0 10px"}>
              <Text bold fontSize={SIZES.h4} color={"white"}>
                Huỳnh Thế Vĩ
              </Text>
              <Text fontSize={SIZES.font} color={"#808080"}>
                20520587
              </Text>
            </VStack>
          </HStack>
          <HStack
            space={10}
            marginLeft={"10px"}
            marginBottom={"10px"}
            w={"100%"}
          >
            <VStack>
              <Text bold fontSize={10} color={"#808080"}>
                Birthday
              </Text>
              <Text bold fontSize={10} color={"white"}>
                23/03/2002
              </Text>
            </VStack>
            <VStack alignItems={"center"}>
              <Text bold fontSize={10} color={"#808080"}>
                Trip
              </Text>
              <Text bold fontSize={10} color={"white"}>
                20
              </Text>
            </VStack>
            <VStack alignItems={"center"}>
              <Image source={DisappointedIcon} size={22} alt="disIcon" />
              <Text bold fontSize={10} color={"white"}>
                20
              </Text>
            </VStack>

            {/* <Image source={CarImg} alt="car" marginLeft={"auto"} /> */}
          </HStack>
        </VStack>
        <VStack alignItems={"flex-end"} flex>
          <Button
            w={"70%"}
            variant={"outline"}
            borderRadius={20}
            borderColor={COLORS.red}
            onPress={() => {}}
            mt={10}
          >
            <Text style={{ ...FONTS.h6 }} color={COLORS.red}>
              Lock account
            </Text>
          </Button>
        </VStack>
      </HStack>
    </View>
  );
};

export default StudentReportCard;
