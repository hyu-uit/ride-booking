import { Button, FlatList, Input, Modal, Text, Wrap } from "native-base";
import React from "react";
import { COLORS, SIZES, FONTS } from "../../constants/theme";
import { TouchableOpacity } from "react-native";
import { useState } from "react";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../config/config";
import { useTranslation } from "react-i18next";
import BookingPromotionCard from "../BookingPromotion/BookingPromotionCard";
import { useEffect } from "react";
import moment from "moment";

const PromotionModal = ({ props, isShow, onClose, onPress, navigation }) => {
  const { t } = useTranslation();
  const [promotionList, setPromotionList] = useState({});

  useEffect(() => {
    // fetchDataAndPhoneNumber()
    getPromotionList();
    console.log(promotionList);
  }, []);

  const getPromotionList = () => {
    let promotionList = [];
    getDocs(collection(db, "Promotion"))
      //where(Date("expiryDate"), ">=", moment().format('DD-MM-YYYY')))
      .then((docSnap) => {
        docSnap.forEach((doc) => {
          if (doc.data().expiryDate >= moment().format("DD-MM-YYYY")) {
            promotionList.push({
              idPromotion: doc.id,
              name: doc.data().name,
              value: doc.data().value,
              expiryDate: doc.data().expiryDate,
              description: doc.data().desciption,
            });
          }
        });
        setPromotionList(promotionList);
        console.log(promotionList);
      });
  };

  return (
    <Modal
      isOpen={isShow}
      onClose={onClose}
      _backdrop={false}
      maxHeight={"90%"}
    >
      <Modal.Content bgColor={COLORS.tertiary} w={"90%"}>
        <Modal.Header
          bgColor={COLORS.tertiary}
          style={{ borderBottomWidth: 0 }}
        >
          <Text fontSize={SIZES.h3} textAlign={"center"} color={"white"} bold>
            {t("choosePromo")}
          </Text>
          <Text
            fontSize={SIZES.body5}
            textAlign={"center"}
            color={COLORS.grey}
            bold
          >
            {t("choosePromoContent")}
          </Text>
        </Modal.Header>
        <Modal.Body>
          <FlatList
            w={"100%"}
            horizontal={false}
            data={promotionList}
            keyExtractor={(item) => item.idPromotion}
            renderItem={({ item }) => (
              <BookingPromotionCard
                data={item}
                onPress={() => onPress(item)}
                promotion={item}
                key={item.idTrip}
              ></BookingPromotionCard>
            )}
          ></FlatList>
        </Modal.Body>
      </Modal.Content>
    </Modal>
  );
};

export default PromotionModal;
