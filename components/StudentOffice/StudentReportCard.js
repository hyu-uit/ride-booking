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
import React, { useEffect, useState } from "react";
import DefaultAvt from "../../assets/image6.png";
import { COLORS, SIZES, FONTS } from "../../constants/theme";
import { Alert, TouchableOpacity } from "react-native";
import DisappointedIcon from "../../assets/icons8-frowning-face-96.png";
import {
  doc,
  updateDoc,
  query,
  collection,
  getDocs,
  where,
  onSnapshot,
} from "@firebase/firestore";
import { db } from "../../config/config";
import { useTranslation } from "react-i18next";
import { getFromAsyncStorage } from "../../helper/asyncStorage";

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
  const [doneTripCount, setDoneTripCount] = useState(0);
  const [cancelTripCount, setCancelTripCount] = useState(0);
  const [ratingList, setRatingList] = useState("");
  const { t } = useTranslation();
  useEffect(() => {
    console.log(status);
    const doneUnsubscribe = onSnapshot(
      query(
        collection(db, "ListTrip"),
        where(
          role === "Customer" ? "idCustomer" : "idRider",
          "==",
          phoneNumber
        ),
        where("status", "in", ["done", "canceled"])
      ),
      (snapshot) => {
        let doneCount = 0;
        let cancelCount = 0;
        snapshot.forEach((doc) => {
          const sta = doc.data().status;
          if (sta === "done") {
            doneCount++;
          } else if (sta === "canceled") {
            cancelCount++;
          }
        });
        setCancelTripCount(cancelCount);
        const totalCount = doneCount + cancelCount;
        setDoneTripCount(totalCount);
      }
    );
    const ratingUnsubscribe = onSnapshot(
      query(
        collection(db, "RatingList"),
        where("idRider", "==", phoneNumber),
        where("ratingType", "==", "Bad")
      ),
      (snapshot) => {
        let badCount = 0;
        snapshot.forEach((doc) => {
          badCount++;
        });
        setRatingList(badCount);
      }
    );
    return () => {
      doneUnsubscribe();
      ratingUnsubscribe();
    };
  }, [phoneNumber, role]);
  const lockAccount = () => {
    Alert.alert(t("sureLock"), "", [
      {
        text: "Cancel",
        onPress: () => {},
      },
      {
        text: "OK",
        onPress: () => {
          updateDoc(doc(db, role, phoneNumber), {
            status: "locked",
          });
        },
      },
    ]);
  };
  const unlockAccount = () => {
    Alert.alert(t("sureUnLock"), "", [
      {
        text: "Cancel",
        onPress: () => {},
      },
      {
        text: "OK",
        onPress: () => {
          updateDoc(doc(db, role, phoneNumber), {
            status: "active",
          });
        },
      },
    ]);
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
                  {t("trip")}
                </Text>
                <Text bold fontSize={10} color={"white"}>
                  {doneTripCount}
                </Text>
              </VStack>
              <VStack alignItems={"center"}>
                <Text bold fontSize={10} color={"#808080"}>
                  {t("canceled")}
                </Text>
                <Text bold fontSize={10} color={"white"}>
                  {cancelTripCount}
                </Text>
              </VStack>
              {role === "Rider" ? (
                <>
                  <VStack alignItems={"center"}>
                    <Image source={DisappointedIcon} size={22} alt="disIcon" />
                    <Text bold fontSize={10} color={"white"}>
                      {ratingList}
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
