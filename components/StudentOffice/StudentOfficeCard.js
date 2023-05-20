import React, { useState, useEffect } from "react";
import {
  Button,
  HStack,
  Image,
  Input,
  ScrollView,
  Spacer,
  Text,
  VStack,
  View,
  Avatar,
  Wrap,
} from "native-base";
import DefaultAvt from "../../assets/image6.png";
import { COLORS, FONTS, SIZES } from "../../constants/theme";
import { deleteDoc, updateDoc, doc } from "@firebase/firestore";
import { db } from "../../config/config";

function StudentOfficeCard (props, navigation) {
   let {
    role,
    phoneNumber, 
    school,
    displayName, 
    email, 
    studentID,   
    portrait,
    cardFront,
    cardBack
  }=props.user
  const {onPress} = props
  const acceptAccount = ()=>{
    updateDoc(doc(db,role,phoneNumber),{
      status:"active"
    });
  } 
  const rejectAccount = ()=>{
    deleteDoc(doc(db,role,phoneNumber));
  }
  return (
    <VStack
      w={"100%"}
      bgColor={COLORS.tertiary}
      pb={3}
      borderRadius={"20px"}
      h={"130px"}
      mb={5}
      
     onTouchEnd={onPress}
    >
      <HStack>
        <VStack w={"75%"}>
          <HStack padding={3}>
            <Avatar source={{uri:portrait}}></Avatar>
            <VStack ml={4}>
              <Text style={{ ...FONTS.h4, color: COLORS.white }}>
               {displayName}
              </Text>
              <Text style={{ ...FONTS.body5, color: COLORS.fifthary }}>
               {studentID}
              </Text>
            </VStack>
          </HStack>
          <HStack
            paddingLeft={2}
            paddingRight={3}
            justifyContent={"space-between"}
          >
            <VStack w={"35%"} alignItems={"center"} justifyContent={"center"}>
              <Text style={{ ...FONTS.body5, color: COLORS.grey }}>
                Birthday
              </Text>
              <Text style={{ ...FONTS.h6, color: COLORS.white }}>
                23/03/2002
              </Text>
            </VStack>
            <VStack w={"20%"} alignItems={"center"} justifyContent={"center"}>
              <Text style={{ ...FONTS.body5, color: COLORS.grey }}>School</Text>
              <Text style={{ ...FONTS.h6, color: COLORS.white }}>{school}</Text>
            </VStack>
            <VStack w={"25%"} alignItems={"center"} justifyContent={"center"}>
              <Text style={{ ...FONTS.body5, color: COLORS.grey }}>Role</Text>
              <Text style={{ ...FONTS.h6, color: COLORS.white }}>{role}</Text>
            </VStack>
          </HStack>
        </VStack>
        <VStack w={"25%"} justifyContent={"flex-end"} alignItems={"center"}>
          <Button
            variant={"outline"}
            borderColor={COLORS.red}
            width={"90%"}
            h={"35%"}
            justifyContent={"center"}
            alignItems={"center"}
            borderRadius={"10px"}
            onPress={rejectAccount}
          >
            <Text style={{ ...FONTS.h5, color: COLORS.red }}>Reject</Text>
          </Button>
          <Button
            width={"90%"}
            borderRadius={"10px"}
            h={"35%"}
            justifyContent={"center"}
            alignItems={"center"}
            mt={1}
            bgColor={COLORS.primary}
            onPress={acceptAccount}
          >
            <Text style={{ ...FONTS.h5, color: COLORS.white }}>Accept</Text>
          </Button>
        </VStack>
      </HStack>
    </VStack>
  );
};

export default StudentOfficeCard;
