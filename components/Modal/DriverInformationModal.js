import {
  Center,
  Divider,
  HStack,
  Image,
  Modal,
  Text,
  VStack,
} from "native-base";
import React, { useContext, useEffect, useState } from "react";
import { COLORS, SIZES } from "../../constants";
import LineImg from "../../assets/Line4.png";
import LocationIcon from "../../assets/icons/icons8-location-48.png";
import ArrowDownIcon from "../../assets/icons/icons8-down-arrow-48.png";
import QRCode from "react-native-qrcode-svg";
import { BookingContext } from "../../context/BookingContext";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../config/config";

const DriverInformationModal = ({ isShow, onClose }) => {
  const { booking } = useContext(BookingContext);
  const [ phoneRider, setPhoneRider] = useState("");
  const [ nameRider, setNameRider] = useState("");
  useEffect(() => {
    getRider();
  }, [booking.bookingDetails.idTrip, phoneRider, nameRider]);
  const getRider = () => {
    getDoc(doc(db, "ListTrip", booking.bookingDetails.idTrip)).then((docData) => {
      if (docData.exists()) {
        setPhoneRider(docData.data().idRider);
        getDoc(doc(db,"Rider",phoneRider)).then((doc)=>{
          if(doc.exists()){
            setNameRider(doc.data().displayName);
          }
        })
      }
    });
  };
  console.log(booking.bookingDetails.idTrip)
  return (
    <Modal
      isOpen={isShow}
      onClose={onClose}
      closeOnOverlayClick={true}
      backdropVisible={true}
    >
      <Modal.Content bgColor={COLORS.tertiary} w={"90%"}>
        <Modal.Header bgColor={COLORS.tertiary}>
          <Text fontSize={SIZES.h3} textAlign={"center"} color={"white"} bold>
            Information
          </Text>
        </Modal.Header>
        <Modal.Body>
          <VStack space={1}>
            <Text fontSize={SIZES.h4} textAlign={"center"} color={"white"} bold>
             {nameRider}
            </Text>
            <Text fontSize={SIZES.h4} textAlign={"center"} color={"white"} bold>
              {phoneRider}
            </Text>
            <HStack w={"100%"}>
              <VStack space={2}>
                <VStack space={1}>
                  <Text bold fontSize={SIZES.h6} color={"#8CC3FF"} >
                    Pick-up
                  </Text>
                  <Text bold fontSize={SIZES.h6} color={"white"}>
                    {booking.pickUpLocation.address}
                  </Text>
                </VStack>
                <Divider />
                <VStack space={1}>
                  <Text bold fontSize={SIZES.h6} color={"#8CC3FF"}>
                    Destination
                  </Text>
                  <Text bold fontSize={SIZES.h6} color={"white"}>
                  {booking.destinationLocation.address}
                  </Text>
                </VStack>
              </VStack>
              <Center marginLeft={"auto"}>
                <Center
                  borderRadius={50}
                  width={"25px"}
                  height={"25px"}
                  bgColor={"black"}
                  marginBottom={2}
                >
                  <Image
                    width={"20px"}
                    height={"20px"}
                    source={ArrowDownIcon}
                    alt=""
                  />
                </Center>
                <Image source={LineImg} alt="" marginBottom={2} />
                <Image
                  width={"20px"}
                  height={"20px"}
                  source={LocationIcon}
                  alt=""
                />
              </Center>
            </HStack>
            <Center w={"100%"} marginTop={5}>
              <QRCode value="hehehehehe" size={200} />
            </Center>
          </VStack>
        </Modal.Body>
      </Modal.Content>
    </Modal>
  );
};

export default DriverInformationModal;
