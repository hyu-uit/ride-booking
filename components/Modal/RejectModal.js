import { Button, Input, Modal, Text } from "native-base";
import React from "react";
import { COLORS, SIZES, FONTS } from "../../constants/theme";

const RejectModal = ({ isShow, onClose, title, content, onPressOK }) => {
  return (
    <Modal isOpen={isShow} onClose={onClose} _backdrop={false}>
      <Modal.Content bgColor={COLORS.tertiary} w={"90%"}>
        <Modal.Header bgColor={COLORS.tertiary}>
          <Text fontSize={SIZES.h3} textAlign={"center"} color={"white"} bold>
            Reject Request
          </Text>
        </Modal.Header>
        <Modal.Body>
          <Input
            maxWidth={"100%"}
            multiline={true}
            numberOfLines={10}
            h={"165px"}
            borderRadius={20}
            borderColor={COLORS.secondary}
            mt={5}
            placeholder="Phone number"
            style={{ ...FONTS.body4 }}
            color={COLORS.white}
            textAlignVertical="top"
            textAlign="left"
          />
        </Modal.Body>
        <Modal.Footer
          bgColor={COLORS.tertiary}
          justifyContent={"space-around"}
          borderTopColor={"transparent"}
        >
          <Button
            bgColor={COLORS.fourthary}
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
