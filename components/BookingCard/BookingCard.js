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
import { COLORS, SIZES } from "../../constants/theme";
import { TouchableOpacity } from "react-native";

const BookingCard = ({ onPress }) => {
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
      <HStack w={"full"}>
        <Avatar source={DefaultAvt} margin={"10px 0 0 10px"} />
        {status === 1 ? (
          <>
            <VStack margin={"10px 0 0 10px"}>
              <Text bold fontSize={SIZES.h4} color={"white"}>
                62K4-1646
              </Text>
              <Text fontSize={SIZES.font} color={"#808080"}>
                Nguyen Tri Duc
              </Text>
            </VStack>
          </>
        ) : (
          <>
            <VStack margin={"10px 0 0 10px"}>
              <Text bold fontSize={SIZES.h4} color={"white"}>
                Waiting for rider
              </Text>
            </VStack>
          </>
        )}
      </HStack>
      <HStack space={6} marginLeft={"10px"} marginBottom={"10px"}>
        <VStack>
          <Text bold fontSize={10} color={"#808080"}>
            Pick-up
          </Text>
          <Text bold fontSize={10} color={"white"}>
            Long An
          </Text>
        </VStack>
        <VStack>
          <Text bold fontSize={10} color={"#808080"}>
            Destination
          </Text>
          <Text bold fontSize={10} color={"white"}>
            DH CNTT
          </Text>
        </VStack>

        {/* <Image source={CarImg} alt="car" marginLeft={"auto"} /> */}
      </HStack>
    </View>
  );
};

export default BookingCard;
