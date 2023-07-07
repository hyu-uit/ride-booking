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
import { doc, getDoc, updateDoc } from "@firebase/firestore";
import { db, storage } from "../../../config/config";
import { getFromAsyncStorage, removeValue } from "../../../helper/asyncStorage";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useTranslation } from "react-i18next";

const CustomerProfile = ({ navigation, route }) => {
  const [profileImg, setProfileImg] = useState(null);
  const [phone, setPhone] = useState("");
  const { t } = useTranslation();

  const [users, setUsers] = useState({});
  useEffect(() => {
    fetchDataAndPhoneNumber();
  }, [navigation]);
  const fetchDataAndPhoneNumber = async () => {
    try {
      let phoneNumberValue = await getFromAsyncStorage("phoneNumber");
      setPhone(phoneNumberValue);

      if (phoneNumberValue) {
        getUsers(phoneNumberValue);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const getUsers = async (phoneNumber) => {
    try {
      let users = {};
      const docData = await getDoc(doc(db, "Customer", phoneNumber));
      users = {
        school: docData.data().school,
        displayName: docData.data().displayName,
        email: docData.data().email,
        studentID: docData.data().studentID,
        portrait: docData.data().portrait,
        birthday: docData.data().birthday,
      };
      setUsers(users);
    } catch (error) {
      console.error(error);
    }
  };
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [3, 4],
      quality: 1,
    });

    if (!result.canceled) {
      setProfileImg(result.assets[0].uri);
      uploadImage(result.assets[0].uri);
    }
  };

  const uploadImage = async (imageUri) => {
    // convert image into blob image
    const blobImage = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function () {
        reject(TypeError("Network request failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", imageUri, true);
      xhr.send(null);
    });

    // type of file
    const metadata = {
      contentType: "image/jpeg",
    };

    const name = phone + "face";
    const storageRef = ref(storage, name);

    const uploadTask = uploadBytesResumable(storageRef, blobImage, metadata);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        console.log("Uploading");
      },
      (error) => {
        console.log(error);
      },
      () => {
        getDownloadURL(storageRef)
          .then((url) => {
            updateDoc(doc(db, "Customer", phone), {
              portrait: url,
            });
          })
          .catch((error) => {
            console.log(error);
          });
      }
    );
  };

  return (
    <VStack h={"100%"} bgColor={COLORS.background}>
      <SafeAreaView>
        <VStack paddingX={"10px"}>
          <HStack justifyContent={"center"}>
            <View style={{ position: "absolute", left: 0 }}></View>
            <Text style={{ ...FONTS.h2, color: COLORS.white }}>
              {t("profile")}
            </Text>
          </HStack>

          <ScrollView showsVerticalScrollIndicator={false}>
            <VStack mt={5} alignItems={"center"}>
              <HStack w={"118px"}>
                <Avatar
                  source={
                    !profileImg ? { uri: users.portrait } : { uri: profileImg }
                  }
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
                {t("fullName")}
              </Text>
              <Text style={{ ...FONTS.h3, color: COLORS.white }} mt={2}>
                {users.displayName}
              </Text>
              <Text style={{ ...FONTS.h4, color: COLORS.fifthary }} mt={10}>
                {t("birthday")}
              </Text>
              <Text style={{ ...FONTS.h3, color: COLORS.white }} mt={2}>
                {users.birthday}
              </Text>
              <Text style={{ ...FONTS.h4, color: COLORS.fifthary }} mt={10}>
                {t("id")}
              </Text>
              <Text style={{ ...FONTS.h3, color: COLORS.white }} mt={2}>
                {users.studentID}
              </Text>
              <Text style={{ ...FONTS.h4, color: COLORS.fifthary }} mt={10}>
                {t("school")}
              </Text>
              <Text style={{ ...FONTS.h3, color: COLORS.white }} mt={2}>
                {users.school}
              </Text>
              <Text style={{ ...FONTS.h4, color: COLORS.fifthary }} mt={10}>
                {t("phone")}
              </Text>
              <Text style={{ ...FONTS.h3, color: COLORS.white }} mt={2}>
                {phone}
              </Text>
              <Text style={{ ...FONTS.h4, color: COLORS.fifthary }} mt={10}>
                {t("address")}
              </Text>
              <Text style={{ ...FONTS.h3, color: COLORS.white }} mt={2}>
                {users.email}
              </Text>
            </VStack>

            <Button
              w={"100%"}
              paddingBottom={2}
              mb={10}
              mt={20}
              borderRadius={20}
              bgColor={COLORS.primary}
              onPress={() => {
                removeValue("phoneNumber");
                removeValue("role");
                navigation.navigate("AuthenticationStack", {
                  screen: "Login",
                });
              }}
            >
              <Text style={{ ...FONTS.h2 }} color={COLORS.white}>
                {t("logout")}
              </Text>
            </Button>
          </ScrollView>
        </VStack>
      </SafeAreaView>
    </VStack>
  );
};

export default CustomerProfile;
