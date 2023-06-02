import { Button, FlatList, Input, Modal, Text, Wrap } from "native-base";
import React from "react";
import { COLORS, SIZES, FONTS } from "../../constants/theme";
import { TouchableOpacity } from "react-native";
import { useState } from "react";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { db } from "../../config/config";

const RejectModal = ({
  isShow,
  onClose,
  title,
  content,
  // onPressOK,
  phoneNumber,
  role,
  navigation,
}) => {
  const pressedColor = COLORS.fifthary;
  const normalColor = COLORS.primary;

  const [name, setName] = useState(false);
  const [birthday, setBirthday] = useState(false);
  const [id, setId] = useState(false);
  const [cardFront, setCardFront] = useState(false);
  const [cardBack, setCardBack] = useState(false);
  const [portrait, setPortrait] = useState(false);
  const [moreInfo, setMoreInfo] = useState(null);

  const onPressOK = () => {
    addDoc(collection(db, "Reject"), {
      phoneNumber: phoneNumber,
      role: role,
      name: name,
      birthday: birthday,
      studentID: id,
      cardFront: cardFront,
      cardBack: cardBack,
      portrait: portrait,
      moreInfo: moreInfo,
    });
    updateDoc(doc(db, role, phoneNumber), {
      status: "rejected",
    });
    navigation.goBack();
  };

  return (
    <Modal isOpen={isShow} onClose={onClose} _backdrop={false}>
      <Modal.Content bgColor={COLORS.tertiary} w={"90%"}>
        <Modal.Header
          bgColor={COLORS.tertiary}
          style={{ borderBottomWidth: 0 }}
        >
          <Text fontSize={SIZES.h3} textAlign={"center"} color={"white"} bold>
            Reject Request
          </Text>
          <Text
            fontSize={SIZES.body5}
            textAlign={"center"}
            color={COLORS.grey}
            bold
          >
            Please choose reasons about this account?
          </Text>
        </Modal.Header>
        <Modal.Body>
          <Wrap
            flexDirection={"row"}
            flexWrap={"wrap"}
            justifyContent={"center"}
            space={4}
          >
            <Button
              alignSelf={"flex-start"}
              backgroundColor={name ? pressedColor : normalColor}
              onPress={() => {
                setName(!name);
              }}
            >
              Full name
            </Button>
            <Button
              alignSelf={"flex-start"}
              backgroundColor={birthday ? pressedColor : normalColor}
              onPress={() => {
                setBirthday(!birthday);
              }}
            >
              Birthday
            </Button>
            <Button
              alignSelf={"flex-start"}
              backgroundColor={id ? pressedColor : normalColor}
              onPress={() => {
                setId(!id);
              }}
            >
              Student ID Number
            </Button>
            <Button
              alignSelf={"flex-start"}
              backgroundColor={cardFront ? pressedColor : normalColor}
              onPress={() => {
                setCardFront(!cardFront);
              }}
            >
              ID card (front)
            </Button>
            <Button
              alignSelf={"flex-start"}
              backgroundColor={cardBack ? pressedColor : normalColor}
              onPress={() => {
                setCardBack(!cardBack);
              }}
            >
              ID card (back)
            </Button>
            <Button
              alignSelf={"flex-start"}
              backgroundColor={portrait ? pressedColor : normalColor}
              onPress={() => {
                setPortrait(!portrait);
              }}
            >
              Portrait picture
            </Button>
          </Wrap>
          <Input
            maxWidth={"100%"}
            multiline={true}
            numberOfLines={10}
            h={"165px"}
            borderRadius={20}
            borderColor={COLORS.secondary}
            mt={5}
            placeholder="More information"
            style={{ ...FONTS.body4 }}
            color={COLORS.white}
            textAlignVertical="top"
            textAlign="left"
            onChangeText={(value) => {
              setMoreInfo(value);
            }}
          />
        </Modal.Body>
        <Modal.Footer
          bgColor={COLORS.tertiary}
          justifyContent={"space-around"}
          borderTopColor={"transparent"}
        >
          <Button
            bgColor={COLORS.primary}
            onPress={onPressOK}
            w={100}
            borderRadius={20}
          >
            <Text fontSize={SIZES.body3} textAlign={"center"} color={"white"}>
              OK
            </Text>
          </Button>
          <Button
            bgColor={COLORS.lightGrey}
            onPress={onClose}
            w={100}
            borderRadius={20}
          >
            <Text fontSize={SIZES.body3} textAlign={"center"} color={"black"}>
              Cancel
            </Text>
          </Button>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
};

export default RejectModal;
