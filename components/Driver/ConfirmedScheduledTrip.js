import React, { useState } from "react";
import { Center, Flex, HStack, Image, Text, VStack, View } from "native-base";
import { TouchableOpacity, StyleSheet } from "react-native";
import { COLORS, FONTS } from "../../constants/theme";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../config/config";
import { useTranslation } from "react-i18next";

function ConfirmedScheduledTrip(props) {
  let {
    idCustomer,
    idTrip,
    pickUpLat,
    pickUpLong,
    destLat,
    destLong,
    date,
    time,
    datePickUp,
    timePickUp,
    status,
    totalPrice,
    distance,
  } = props.trip;
  const [name, setName] = useState("");
  const { navigation } = props;
  const { onPress } = props;

  if (idTrip !== undefined) {
    getDoc(doc(db, "ListTrip", idTrip)).then((tripData) => {
      if (tripData.exists()) {
        getDoc(doc(db, "Customer", tripData.data().idCustomer)).then(
          (docData) => {
            if (docData.exists()) {
              setName(docData.data().displayName);
            }
          }
        );
      }
    });
  }
  const onClickCancel = () => {
    updateDoc(doc(db, "ListTrip", idTrip), {
      status: "waiting",
    });
  };

  const { t } = useTranslation();

  return (
    <View
      h={140}
      w={"100%"}
      mb={5}
      style={{
        backgroundColor: COLORS.tertiary,
        justifyContent: "center",
        padding: 20,
        borderRadius: 20,
      }}
    >
      <TouchableOpacity onPress={onPress}>
        <VStack space={1} style={{ marginVertical: 10 }}>
          <HStack alignItems={"center"}>
            <HStack flex={1}>
              <Text
                color={COLORS.white}
                style={{
                  ...FONTS.h4,
                  fontWeight: "bold",
                }}
              >
                {name}
              </Text>
            </HStack>
            <View>
              <Text
                color={COLORS.white}
                style={{
                  ...FONTS.h3,
                  alignItems: "flex-end",
                }}
              >
                {totalPrice}
              </Text>
            </View>
          </HStack>
          <HStack space={10}>
            <VStack>
              <Text style={styles.titleText}>{t("pickUp")}</Text>
              <Text style={styles.detailText}>KTX Khu B</Text>
            </VStack>
            <VStack>
              <Text style={styles.titleText}>{t("des")}</Text>
              <Text style={styles.detailText}>UIT</Text>
            </VStack>
          </HStack>
          <HStack>
            <VStack>
              <Text style={styles.titleText}>{t("time")}</Text>
              <Text style={styles.detailText}>
                {timePickUp}, {datePickUp}
              </Text>
            </VStack>
            <Flex
              flex={1}
              style={{ justifyContent: "flex-end", alignItems: "flex-end" }}
            >
              <HStack>
                <View
                  style={{
                    alignContent: "center",
                  }}
                >
                  <TouchableOpacity
                    onPress={onClickCancel}
                    style={{
                      borderColor: COLORS.red,
                      height: 30,
                      width: 90,
                      marginRight: 10,
                      borderWidth: 1,
                      borderRadius: 10,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Text bold color={COLORS.red} styles={{ ...FONTS.h5 }}>
                      {t("cancel")}
                    </Text>
                  </TouchableOpacity>
                </View>
              </HStack>
            </Flex>
          </HStack>
        </VStack>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  titleText: {
    color: COLORS.grey,
    ...FONTS.body6,
  },
  detailText: {
    color: COLORS.white,
    ...FONTS.body6,
    fontWeight: "bold",
  },
});
export default ConfirmedScheduledTrip;
