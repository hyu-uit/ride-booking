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
import { Alert, TouchableOpacity } from "react-native";
import DisappointedIcon from "../../assets/icons8-frowning-face-96.png";
import { doc, updateDoc } from "@firebase/firestore";
import { db } from "../../config/config";

function StudentReportCard(props) {
  let {
    role,
    phoneNumber,
    school,
    displayName,
    email,
    studentID,
    portrait,
    status,
  } = props.listUser;
  const { onPress } = props;

  const [locked, setLocked] = useState();

  const lockAccount = () => {
    updateDoc(doc(db, role, phoneNumber), {
      status: "locked",
    });
  };
  const unlockAccount = () => {
    updateDoc(doc(db, role, phoneNumber), {
      status: "active",
    });
  };

  return (
    <View
      bgColor={"#101744"}
      w={"100%"}
      h={130}
      borderRadius={20}
      shadow={3}
      marginBottom={5}
    >
      <TouchableOpacity onPress={onPress}>
        <HStack>
          <VStack>
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
            <HStack
              space={10}
              marginLeft={"10px"}
              marginBottom={"10px"}
              w={"100%"}
            >
              <VStack alignItems={"center"}>
                <Text bold fontSize={10} color={"#808080"}>
                  Trip
                </Text>
                <Text bold fontSize={10} color={"white"}>
                  20
                </Text>
              </VStack>
              <VStack alignItems={"center"}>
                <Text bold fontSize={10} color={"#808080"}>
                  Cancel
                </Text>
                <Text bold fontSize={10} color={"white"}>
                  20
                </Text>
              </VStack>
              {role === "Rider" ? (
                <>
                  <VStack alignItems={"center"}>
                    <Image source={DisappointedIcon} size={22} alt="disIcon" />
                    <Text bold fontSize={10} color={"white"}>
                      20
                    </Text>
                  </VStack>
                </>
              ) : (
                <></>
              )}

              {/* <Image source={CarImg} alt="car" marginLeft={"auto"} /> */}
            </HStack>
          </VStack>
          <VStack alignItems={"flex-end"} flex>
            {/* {locked === 0 ? (
              <>
                <Button
                  w={"70%"}
                  variant={"solid"}
                  borderRadius={20}
                  borderColor={COLORS.red}
                  onPress={lockAccount}
                  mt={10}
                >
                  <Text style={{ ...FONTS.h6 }} color={COLORS.red}>
                    Lock account
                  </Text>
                </Button>
              </>
            ) : (
              <>
                <Button
                  w={"70%"}
                  variant={"solid"}
                  borderRadius={20}
                  style={{ backgroundColor: COLORS.primary }}
                  mr={2}
                  borderColor={COLORS.primary}
                  onPress={lockAccount}
                  mt={10}
                >
                  <Text style={{ ...FONTS.h6 }} color={COLORS.white}>
                    Unlock
                  </Text>
                </Button>
              </>
            )} */}
            {status !== "locked" ? (
              <>
                <Button
                  w={"70%"}
                  variant={"solid"}
                  borderRadius={20}
                  style={{ backgroundColor: COLORS.red }}
                  mr={2}
                  borderColor={COLORS.primary}
                  onPress={lockAccount}
                  mt={10}
                >
                  <Text style={{ ...FONTS.h6 }} color={COLORS.white}>
                    Lock
                  </Text>
                </Button>
              </>
            ) : (
              <>
                <Button
                  w={"70%"}
                  variant={"solid"}
                  borderRadius={20}
                  style={{ backgroundColor: COLORS.primary }}
                  mr={2}
                  borderColor={COLORS.primary}
                  onPress={unlockAccount}
                  mt={10}
                >
                  <Text style={{ ...FONTS.h6 }} color={COLORS.white}>
                    Unlock
                  </Text>
                </Button>
              </>
            )}
          </VStack>
        </HStack>
      </TouchableOpacity>
    </View>
  );
}

export default StudentReportCard;
