import {
  Button,
  HStack,
  Image,
  NativeBaseProvider,
  ScrollView,
  Text,
  VStack,
  View,
} from "native-base";
import React, { useState } from "react";
import ButtonBack from "../../components/Global/ButtonBack/ButtonBack";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS, FONTS, SIZES } from "../../constants";
import Icon from "react-native-vector-icons/FontAwesome";
import {
  Keyboard,
  TouchableWithoutFeedback,
  LayoutAnimation,
  PixelRatio,
  Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useEffect } from "react";
import { AsyncStorage } from "react-native";
import { db, storage } from "../../config/config";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { doc, updateDoc } from "firebase/firestore";
import {
  getFromAsyncStorage,
  saveToAsyncStorage,
} from "../../helper/asyncStorage";
import { useTranslation } from "react-i18next";
const UploadID = ({ navigation }) => {
  const { t } = useTranslation();
  // const [phoneNumber, setPhoneNumber] = useState("");
  // const [role, setRole] = useState("");
  // const [email, setEmail] = useState("");
  // const [id, setStudentID] = useState("");
  // const [school, setSchool] = useState("");
  // const [name, setDisplayName] = useState("");
  // const [licensePlates, setLicensePlates] = useState("");
  // const [transportType, setTransportType] = useState("");

  // useEffect(() => {
  //   getFromAsyncStorage("phoneNumber").then((result) => {
  //     setPhoneNumber(result);
  //   });
  //   getFromAsyncStorage("role").then((result) => {
  //     setRole(result);
  //   });
  //   getFromAsyncStorage("email").then((result) => {
  //     setEmail(result);
  //   });
  //   getFromAsyncStorage("studentID").then((result) => {
  //     setStudentID(result);
  //   });
  //   getFromAsyncStorage("school").then((result) => {
  //     setSchool(result);
  //   });
  //   getFromAsyncStorage("displayName").then((result) => {
  //     setDisplayName(result);
  //   });
  //   getFromAsyncStorage("transportType").then((result) => {
  //     setTransportType(result);
  //   });
  //   getFromAsyncStorage("licensePlates").then((result) => {
  //     setLicensePlates(result);
  //   });
  // }, []);

  const [width, setWidth] = useState(
    PixelRatio.roundToNearestPixel(SIZES.width - 20)
  );
  const [height, setHeight] = useState(0);
  const [imageFront, setImageFront] = useState(null);
  const [imageBack, setImageBack] = useState(null);

  //upload image to firebase storage
  const uploadImage = async () => {
    if (imageFront === null || imageBack === null) {
      Alert.alert(t("uploadID"), "", [
        {
          text: "OK",
        },
      ]);
    } else {
      saveToAsyncStorage("cardFront", imageFront);
      saveToAsyncStorage("cardBack", imageBack);
      navigation.navigate("UploadFace");
    }
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImageFront(result.assets[0].uri);
    }
    //console.log(result.assets[0].uri);
  };

  const pickImageBack = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImageBack(result.assets[0].uri);
    }
  };

  const handleLayout = (event) => {
    const { width } = event.nativeEvent.layout;
    const newHeight = width * (2 / 3);
    LayoutAnimation.easeInEaseOut();
    setWidth(width);
    setHeight(newHeight);
  };
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      <VStack
        paddingX={"10px"}
        bgColor={COLORS.background}
        w={"100%"}
        h={"100%"}
        onLayout={handleLayout}
      >
        <SafeAreaView style={{ width: "100%", height: "100%" }}>
          <ScrollView>
            <ButtonBack
              onPress={() => {
                navigation.goBack();
              }}
            ></ButtonBack>
            <Button
              mt={50}
              w={"100%"}
              h={height}
              borderColor={COLORS.fifthary}
              borderWidth={2}
              backgroundColor={"transparent"}
              borderStyle={"dashed"}
              onPress={() => {
                pickImage();
              }}
            >
              {imageFront !== null ? (
                <>
                  <Image
                    source={{ uri: imageFront }}
                    w={width}
                    h={"100%"}
                    alt="ID front"
                    // resizeMode="cover"
                    bg={COLORS.white}
                  ></Image>
                </>
              ) : (
                <>
                  <VStack justifyContent={"center"} alignItems={"center"}>
                    <Icon name="upload" size={50} color={COLORS.white} />
                    <Text style={{ ...FONTS.h4 }} color={COLORS.white} mt={5}>
                      {t("uploadIDFront")}
                    </Text>
                  </VStack>
                </>
              )}
            </Button>
            <Button
              mt={50}
              w={"100%"}
              h={height}
              borderColor={COLORS.fifthary}
              borderWidth={2}
              backgroundColor={"transparent"}
              borderStyle={"dashed"}
              onPress={() => {
                pickImageBack();
              }}
            >
              {imageBack !== null ? (
                <>
                  <Image
                    source={{ uri: imageBack }}
                    w={width}
                    h={"100%"}
                    alt="ID front"
                    // resizeMode="cover"
                    bg={COLORS.white}
                  ></Image>
                </>
              ) : (
                <>
                  <VStack justifyContent={"center"} alignItems={"center"}>
                    <Icon name="upload" size={50} color={COLORS.white} />
                    <Text style={{ ...FONTS.h4 }} color={COLORS.white} mt={5}>
                      {t("uploadIDBack")}
                    </Text>
                  </VStack>
                </>
              )}
            </Button>
            <Button
              w={"100%"}
              borderRadius={20}
              bgColor={COLORS.primary}
              onPress={uploadImage}
              mt={10}
            >
              <Text style={{ ...FONTS.h2 }} color={COLORS.white}>
                {t("continue")}
              </Text>
            </Button>
          </ScrollView>
        </SafeAreaView>
      </VStack>
    </TouchableWithoutFeedback>
  );
};

export default UploadID;
