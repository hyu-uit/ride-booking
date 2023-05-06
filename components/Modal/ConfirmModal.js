import { Button, Modal, Text } from "native-base";
import React from "react";
import { COLORS, SIZES } from "../../constants";

const ConfirmModal = ({ isShow, onClose, title, content, onPressOK }) => {
  return (
    <Modal isOpen={isShow} onClose={onClose}>
      <Modal.Content bgColor={COLORS.tertiary} w={"90%"}>
        <Modal.Header bgColor={COLORS.tertiary}>
          <Text fontSize={SIZES.h3} textAlign={"center"} color={"white"} bold>
            {title}
          </Text>
        </Modal.Header>
        <Modal.Body>
          <Text fontSize={SIZES.body3} textAlign={"center"} color={"white"}>
            {content}
          </Text>
        </Modal.Body>
        <Modal.Footer bgColor={COLORS.tertiary} justifyContent={"space-around"}>
          <Button
            bgColor={COLORS.fourthary}
            onPress={onPressOK}
            w={100}
            borderRadius={20}
          >
            <Text fontSize={SIZES.body3} textAlign={"center"} color={"white"}>
              Yes
            </Text>
          </Button>
          <Button
            bgColor={COLORS.lightGrey}
            onPress={onClose}
            w={100}
            borderRadius={20}
          >
            <Text fontSize={SIZES.body3} textAlign={"center"} color={"black"}>
              No
            </Text>
          </Button>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
};

export default ConfirmModal;
