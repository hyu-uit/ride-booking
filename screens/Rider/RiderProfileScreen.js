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
  Icon,
  Select,
} from "native-base";
import { SafeAreaView } from "react-native-safe-area-context";
import { SIZES, COLORS, FONTS } from "../../constants/theme";
import ButtonBack from "../../components/Global/ButtonBack/ButtonBack";
import DefaultAvt from "../../assets/image6.png";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { AsyncStorage } from "react-native";
import { doc, getDoc, updateDoc } from "@firebase/firestore";
import { db, storage } from "../../config/config";
import { getFromAsyncStorage, removeValue } from "../../helper/asyncStorage";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useTranslation } from "react-i18next";
import i18next from "i18next";

// const RiderProfileScreen = ({ navigation }) => {
//   return (
//     <VStack
//       style={{
//         backgroundColor: COLORS.background,
//         height: "100%",
//         paddingHorizontal: 10,
//       }}
//     >
//       <SafeAreaView>
//       <HStack justifyContent={"center"}>
//             <View style={{ position: "absolute", left: 0 }}></View>
//             <Text style={{ ...FONTS.h2, color: COLORS.white }}>Profile</Text>
//           </HStack>
//         <ScrollView showsVerticalScrollIndicator={false}>
//           <VStack alignItems={"center"}>
//             <Avatar
//               source={avatarIcon}
//               style={{ height: 118, width: 118, marginTop: 15 }}
//             ></Avatar>
//             <Text style={{ ...FONTS.h1, color: COLORS.white }} mt={2}>
//               Phuong Uyen
//             </Text>
//           </VStack>
//           <VStack marginTop={5} space={8}>
//             <VStack>
//               <Text style={{ ...FONTS.h4, color: COLORS.fifthary }} mt={10}>
//                 Birthday
//               </Text>
//               <Text style={{ ...FONTS.h3, color: COLORS.white }} mt={2}>
//                 23/03/2002
//               </Text>
//               <Text style={{ ...FONTS.h4, color: COLORS.fifthary }} mt={10}>
//                 Student ID
//               </Text>
//               <Text style={{ ...FONTS.h3, color: COLORS.white }} mt={2}>
//                 20520000
//               </Text>
//               <Text style={{ ...FONTS.h4, color: COLORS.fifthary }} mt={10}>
//                 School
//               </Text>
//               <Text style={{ ...FONTS.h3, color: COLORS.white }} mt={2}>
//                 University of Information Technology
//               </Text>
//               <Text style={{ ...FONTS.h4, color: COLORS.fifthary }} mt={10}>
//                 Phone number
//               </Text>
//               <Text style={{ ...FONTS.h3, color: COLORS.white }} mt={2}>
//                 0848867000
//               </Text>
//               <Text style={{ ...FONTS.h4, color: COLORS.fifthary }} mt={10}>
//                 Email Address
//               </Text>
//               <Text style={{ ...FONTS.h3, color: COLORS.white }} mt={2}>
//                 20520000@gm.uit.edu.vn
//               </Text>
//             </VStack>
//             <Button
//               w={"100%"}
//               mt={20}
//               borderRadius={20}
//               bgColor={COLORS.primary}
//               onPress={() => {
//                 navigation.navigate("AuthenticationStack", {
//                   screen: "Login",
//                 });
//               }}
//             >
//               <Text style={{ ...FONTS.h2 }} color={COLORS.white}>
//                 Log Out
//               </Text>
//             </Button>
//           </VStack>
//         </ScrollView>
//       </SafeAreaView>
//     </VStack>
//   );
// };
const RiderProfileScreen = ({ navigation, route }) => {
  const { t } = useTranslation();
  const [profileImg, setProfileImg] = useState(null);
  const [phone, setPhone] = useState("");
  const [language, setLanguage] = useState(i18next.language);
  const [imgUri, setImgUri] = useState(null);

  const [users, setUsers] = useState({});
  useEffect(() => {
    fetchDataAndPhoneNumber();
    if (language === "vi") {
      setImgUri(
        "https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Flag_of_Vietnam.svg/2000px-Flag_of_Vietnam.svg.png"
      );
    } else {
      setImgUri(
        "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Flag_of_the_United_Kingdom_%281-2%29.svg/1200px-Flag_of_the_United_Kingdom_%281-2%29.svg.png"
      );
    }
  }, []);
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
      const docData = await getDoc(doc(db, "Rider", phoneNumber));
      users = {
        school: docData.data().school,
        displayName: docData.data().displayName,
        email: docData.data().email,
        studentID: docData.data().studentID,
        portrait: docData.data().portrait,
        birthday: docData.data().birthday,
        transportType: docData.data().transportType,
        licensePlates: docData.data().licensePlates,
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
            updateDoc(doc(db, "Rider", phone), {
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
    <VStack h={"100%"} paddingTop={"20px"} bgColor={COLORS.background}>
      <SafeAreaView>
        <VStack paddingX={"10px"} h={"100%"}>
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
                {t("inputType")}
              </Text>
              <Text style={{ ...FONTS.h3, color: COLORS.white }} mt={2}>
                {users.transportType}
              </Text>
              <Text style={{ ...FONTS.h4, color: COLORS.fifthary }} mt={10}>
                {t("inputLicense")}
              </Text>
              <Text style={{ ...FONTS.h3, color: COLORS.white }} mt={2}>
                {users.licensePlates}
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
                {t("email")}
              </Text>
              <Text style={{ ...FONTS.h3, color: COLORS.white }} mt={2}>
                {users.email}
              </Text>
              <Text style={{ ...FONTS.h4, color: COLORS.fifthary }} mt={10}>
                {t("language")}
              </Text>
              <HStack alignItems={"center"} mt={2}>
                <Image
                  source={{
                    uri: imgUri,
                  }}
                  alt="hi"
                  w={8}
                  h={5}
                />
                <Select
                  alignSelf={"flex-end"}
                  w={"150px"}
                  h={"50px"}
                  borderColor={"transparent"}
                  style={{ ...FONTS.body3 }}
                  color={COLORS.white}
                  onValueChange={(itemValue) => {
                    setLanguage(itemValue);
                    i18next.changeLanguage(itemValue);
                  }}
                  selectedValue={language}
                  _selectedItem={{
                    bg: COLORS.fifthary,
                  }}
                >
                  <Select.Item label={t("en")} value="en" />
                  <Select.Item label={t("vi")} value="vi" />
                </Select>
              </HStack>
            </VStack>

            <Button
              mb={5}
              w={"100%"}
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
export default RiderProfileScreen;
