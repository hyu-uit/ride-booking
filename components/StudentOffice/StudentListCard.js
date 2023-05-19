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

function StudentListCard(props, navigation) {
  let { role, phoneNumber, school, displayName, email, studentID, portrait } =
    props.list;
  const { onPress } = props;
  //const [status, setStatus] = useState(0);
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
        <Avatar source={{ uri: portrait }} margin={"10px 0 0 10px"} />
        <VStack margin={"10px 0 0 10px"}>
          <Text bold fontSize={SIZES.h4} color={"white"}>
            {displayName}
          </Text>
          <Text fontSize={SIZES.font} color={"#808080"}>
            {studentID}
          </Text>
        </VStack>
      </HStack>
      <HStack space={10} marginLeft={"10px"} marginBottom={"10px"}>
        <VStack>
          <Text bold fontSize={10} color={"#808080"}>
            Birthday
          </Text>
          <Text bold fontSize={10} color={"white"}>
            23/03/2002
          </Text>
        </VStack>
        <VStack>
          <Text bold fontSize={10} color={"#808080"}>
            Trip
          </Text>
          <Text bold fontSize={10} color={"white"}>
            20
          </Text>
        </VStack>

        {/* <Image source={CarImg} alt="car" marginLeft={"auto"} /> */}
      </HStack>
    </View>
  );
}

export default StudentListCard;
