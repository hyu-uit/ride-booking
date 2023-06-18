import React, { useEffect, useState } from "react";
import { HStack, Image, Text, VStack, View } from "native-base";
import { TouchableOpacity, StyleSheet } from "react-native";
import { COLORS, FONTS } from "../../constants/theme";
import locationLineIcon from "../../assets/location-line-full.png";
import { doc, getDoc } from "@firebase/firestore";
import { db } from "../../config/config";
import { useTranslation } from "react-i18next";

function HistoryPickUpCard(props, navigation) {
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
  const { onPress } = props;
  const { t } = useTranslation();
  useEffect(() => {
    getNameCustomer();
  }, []);
  const getNameCustomer = () => {
    getDoc(doc(db, "Customer", idCustomer)).then((docData) => {
      if (docData.exists()) {
        setName(docData.data().displayName);
      }
    });
  };
  return (
    <View
      bgColor={COLORS.tertiary}
      w={"100%"}
      h={230}
      borderRadius={20}
      shadow={3}
      mb={5}
    >
      <TouchableOpacity onPress={onPress}>
        <VStack space={1} paddingRight={26}>
          <Text
            mt={2}
            mb={2}
            paddingLeft={26}
            style={{ color: COLORS.lightGrey, ...FONTS.body6 }}
          >
            {idTrip}
          </Text>
          <HStack paddingLeft={26} space={12} f alignItems={"center"}>
            <Text
              color={COLORS.white}
              style={{
                ...FONTS.h4,
                fontWeight: "bold",
              }}
            >
              {name}
            </Text>
            <Text
              color={COLORS.white}
              style={{
                ...FONTS.h3,
                marginLeft: 5,
              }}
            >
              {totalPrice}
            </Text>
          </HStack>
          {/* <Text paddingLeft={26} style={styles.detailText}>
            {datePickUp}, {timePickUp}
          </Text> */}
          <VStack marginTop={2} paddingRight={26}>
            <HStack alignItems={"center"}>
              <Image alt="location line" source={locationLineIcon}></Image>
              <VStack space={5} style={{ marginRight: 30 }}>
                <VStack>
                  <Text style={styles.detailText}>KTX Khu B</Text>
                  <Text numberOfLines={1} style={styles.titleText}>
                    KTX Khu B ĐHQG, Đông Hòa, Dĩ An, Bình Dương
                  </Text>
                </VStack>
                <VStack>
                  <Text style={styles.detailText}>UIT</Text>
                  <Text numberOfLines={1} style={styles.titleText}>
                    Trường Đại học Công nghệ Thông tin - ĐHQG TPHCN...
                  </Text>
                </VStack>
              </VStack>
            </HStack>
          </VStack>
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
export default HistoryPickUpCard;
