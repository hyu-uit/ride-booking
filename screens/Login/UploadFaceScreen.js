import {
  Button,
  HStack,
  Input,
  NativeBaseProvider,
  Text,
  VStack,
  View,
  Image,
} from "native-base";
import React, { useEffect, useState } from "react";
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
import { Camera } from "expo-camera";
import { launchCamera } from "react-native-image-picker";
import { AsyncStorage } from "react-native";
import { db, storage } from "../../config/config";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { doc, updateDoc, setDoc } from "firebase/firestore";
import { async } from "q";
import { getFromAsyncStorage } from "../../helper/asyncStorage";
import { useTranslation } from "react-i18next";

const UploadFaceScreen = ({ navigation }) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [id, setStudentID] = useState("");
  const [school, setSchool] = useState("");
  const [name, setDisplayName] = useState("");
  const [imageFront, setImageFront] = useState("");
  const [imageBack, setImageBack] = useState("");
  const [licensePlates, setLicensePlates] = useState("");
  const [transportType, setTransportType] = useState("");
  const [finalDate, setFinalDate] = useState("null");
  const { t } = useTranslation();

  useEffect(() => {
    getFromAsyncStorage("phoneNumber").then((result) => {
      setPhoneNumber(result);
    });
    getFromAsyncStorage("role").then((result) => {
      setRole(result);
    });
    getFromAsyncStorage("email").then((result) => {
      setEmail(result);
    });
    getFromAsyncStorage("studentID").then((result) => {
      setStudentID(result);
    });
    getFromAsyncStorage("school").then((result) => {
      setSchool(result);
    });
    getFromAsyncStorage("displayName").then((result) => {
      setDisplayName(result);
    });
    getFromAsyncStorage("cardFront").then((result) => {
      setImageFront(result);
    });
    getFromAsyncStorage("cardBack").then((result) => {
      setImageBack(result);
    });
    getFromAsyncStorage("dob").then((result) => {
      setFinalDate(result);
    });
    getFromAsyncStorage("licensePlates").then((result) => {
      setLicensePlates(result);
    });
    getFromAsyncStorage("transportType").then((result) => {
      setTransportType(result);
    });
  }, []);
  const [width, setWidth] = useState(
    PixelRatio.roundToNearestPixel(SIZES.width - 20)
  );
  const [height, setHeight] = useState(0);

  const createAccount = async () => {
    //load account to dtb
    if (image === null) {
      Alert.alert(t("alertUploadPortrait"), "", [
        {
          text: "OK",
        },
      ]);
    } else {
      setDoc(doc(db, role, phoneNumber), {
        displayName: name,
        email: email,
        school: school,
        birthday: finalDate,
        studentID: id,
        status: "pending",
        licensePlates: licensePlates,
        transportType: transportType,
        open: false,
      });
      //upload image to firebase storage
      uploadImage();
      navigation.navigate("AuthenticationStack", {
        screen: "Login",
      });
    }
  };

  const uploadImage = async () => {
    //convert image into blob image
    const blobImage = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function () {
        reject(TypeError("Network request failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", image, true);
      xhr.send(null);
    });

    const uploadFront = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function () {
        reject(TypeError("Network request failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", imageFront, true);
      xhr.send(null);
    });

    const uploadBack = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function () {
        reject(TypeError("Network request failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", imageBack, true);
      xhr.send(null);
    });

    //type of file
    const metadata = {
      contentType: "image/jpeg",
    };

    let name = phoneNumber + "face";
    let frontName = phoneNumber + "front";
    let backName = phoneNumber + "back";

    const storageRef = ref(storage, name);
    const storageRef1 = ref(storage, frontName);
    const storageRef2 = ref(storage, backName);

    uploadBytesResumable(storageRef, blobImage, metadata).then((snapshot) => {
      //console.log("Upload success!");
      getDownloadURL(storageRef).then((url) => {
        updateDoc(doc(db, role, phoneNumber), {
          portrait: url,
        });
      });
    });

    uploadBytesResumable(storageRef1, uploadFront, metadata).then(
      (snapshot) => {
        //console.log("Upload success!");
        getDownloadURL(storageRef1).then((url) => {
          updateDoc(doc(db, role, phoneNumber), {
            cardFront: url,
          });
        });
      }
    );

    uploadBytesResumable(storageRef2, uploadBack, metadata).then((snapshot) => {
      //console.log("Upload success!");
      getDownloadURL(storageRef2).then((url) => {
        updateDoc(doc(db, role, phoneNumber), {
          cardBack: url,
        });
      });
    });
  };

  const handleLayout = (event) => {
    const { width } = event.nativeEvent.layout;
    const newHeight = width * 1.5;
    LayoutAnimation.easeInEaseOut();
    setWidth(width);
    setHeight(newHeight);
  };

  const [image, setImage] = useState(null);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const openCamera = async () => {
    let permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    if (permissionResult.granted === false) {
      alert(t("camera"));
      return;
    }
    let result = await ImagePicker.launchCameraAsync();
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const onPopup = () => {
    Alert.alert(
      t("selectPic"),
      t("takePic"),
      [
        {
          text: t("select"),
          onPress: pickImage,
        },
        {
          text: t("take"),
          onPress: openCamera,
        },
        {
          text: t("cancel"),
          style: "cancel",
        },
      ],
      { cancelable: false }
    );
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
          <ButtonBack></ButtonBack>
          <Button
            mt={5}
            w={"100%"}
            h={height}
            borderColor={COLORS.fifthary}
            borderWidth={2}
            backgroundColor={"transparent"}
            borderStyle={"dashed"}
            onPress={onPopup}
          >
            {image !== null ? (
              <>
                <Image
                  source={{ uri: image }}
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
                    {t("uploadPortrait")}
                  </Text>
                </VStack>
              </>
            )}
          </Button>
          <Button
            w={"100%"}
            borderRadius={20}
            bgColor={COLORS.primary}
            mt={10}
            onPress={createAccount}
          >
            <Text style={{ ...FONTS.h2 }} color={COLORS.white}>
              {t("continue")}
            </Text>
          </Button>
        </SafeAreaView>
      </VStack>
    </TouchableWithoutFeedback>
  );
};

export default UploadFaceScreen;
