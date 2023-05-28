import React, { useEffect, useState } from "react";
import {
  Button,
  HStack,
  Image,
  NativeBaseProvider,
  ScrollView,
  VStack,
  Text,
  View,
  Divider,
  Switch,
  Avatar,
} from "native-base";
import { SafeAreaView } from "react-native-safe-area-context";
import { SIZES, COLORS, FONTS } from "../../../constants/theme";
import ButtonBack from "../../../components/Global/ButtonBack/ButtonBack";
import DefaultAvt from "../../../assets/image6.png";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { AsyncStorage } from "react-native";
import { doc, getDoc } from "@firebase/firestore";
import { db } from "../../../config/config";

const CustomerProfile = ({ navigation, route}) => {
  const [profileImg, setProfileImg] = useState(null);

  const [users, setUsers] = useState([]);
  //const { phoneNumber, role } = route.params;

  // useEffect(() => {
 
  //   getUsers();
  // }, []);

  // const getUsers = () => {
    
  //   let users = [];
  //   getDoc(doc(db, "Customer", phoneNumber)).then((docSnap) => {
  //     docSnap.forEach((doc) => {
  //       users.push({
  //         school: doc.data().school,
  //         displayName: doc.data().displayName,
  //         email: doc.data().email,
  //         studentID: doc.data().studentID,
  //         portrait: doc.data().portrait,
  //       });
  //     });
  //   });
  // };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [3, 4],
      quality: 1,
    });

    if (!result.canceled) {
      setProfileImg(result.assets[0].uri);
    }
    console.log(result.assets[0].uri);
  };

  return (
    <VStack h={"100%"} paddingTop={"20px"} bgColor={COLORS.background}>
      <SafeAreaView>
        <VStack paddingX={"10px"} h={"100%"}>
          <HStack justifyContent={"center"}>
            <View style={{ position: "absolute", left: 0 }}></View>
            <Text style={{ ...FONTS.h2, color: COLORS.white }}>Profile</Text>
          </HStack>

          <ScrollView showsVerticalScrollIndicator={false}>
            <VStack mt={5} alignItems={"center"}>
              <HStack w={"118px"}>
                <Avatar
                  source={!profileImg ? DefaultAvt : { uri: profileImg }}
                  h={"118px"}
                  w={"118px"}
                />
                <Button
                  bgColor={"transparent"}
                  style={{ position: "absolute", bottom: -10, right: -15 }}
                  onPress={pickImage}
                >
                  <Ionicons name="pencil" size={20} color={COLORS.white} />
                </Button>
              </HStack>
            </VStack>

            <VStack>
              <Text style={{ ...FONTS.h4, color: COLORS.fifthary }} mt={10}>
                Full name
              </Text>
              <Text style={{ ...FONTS.h3, color: COLORS.white }} mt={2}>
                Huỳnh Thế Vĩ
              </Text>
              <Text style={{ ...FONTS.h4, color: COLORS.fifthary }} mt={10}>
                Birthday
              </Text>
              <Text style={{ ...FONTS.h3, color: COLORS.white }} mt={2}>
                23/03/2002
              </Text>
              <Text style={{ ...FONTS.h4, color: COLORS.fifthary }} mt={10}>
                Student ID
              </Text>
              <Text style={{ ...FONTS.h3, color: COLORS.white }} mt={2}>
                20520000
              </Text>
              <Text style={{ ...FONTS.h4, color: COLORS.fifthary }} mt={10}>
                School
              </Text>
              <Text style={{ ...FONTS.h3, color: COLORS.white }} mt={2}>
                University of Information Technology
              </Text>
              <Text style={{ ...FONTS.h4, color: COLORS.fifthary }} mt={10}>
                Phone number
              </Text>
              <Text style={{ ...FONTS.h3, color: COLORS.white }} mt={2}>
                0848867000
              </Text>
              <Text style={{ ...FONTS.h4, color: COLORS.fifthary }} mt={10}>
                Email Address
              </Text>
              <Text style={{ ...FONTS.h3, color: COLORS.white }} mt={2}>
                20520000@gm.uit.edu.vn
              </Text>
            </VStack>

            <Button
              w={"100%"}
              mt={20}
              borderRadius={20}
              bgColor={COLORS.primary}
              onPress={() => {
                navigation.navigate("AuthenticationStack", {
                  screen: "Login",
                });
              }}
            >
              <Text style={{ ...FONTS.h2 }} color={COLORS.white}>
                Log out
              </Text>
            </Button>
          </ScrollView>
        </VStack>
      </SafeAreaView>
    </VStack>
  );
};

export default CustomerProfile;
