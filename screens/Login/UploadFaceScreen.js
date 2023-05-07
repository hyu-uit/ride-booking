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

const UploadFaceScreen = ({ navigation }) => {
  const [width, setWidth] = useState(
    PixelRatio.roundToNearestPixel(SIZES.width - 20)
  );
  const [height, setHeight] = useState(0);

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
      alert("Permission to access camera is required!");
      return;
    }
    let result = await ImagePicker.launchCameraAsync();
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const onPopup = () => {
    Alert.alert(
      "Select a picture",
      "Would you like to select a picture from the library or take a new one?",
      [
        {
          text: "Select from library",
          onPress: pickImage,
        },
        {
          text: "Take a picture",
          onPress: openCamera,
        },
        {
          text: "Cancel",
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
                    Upload your Portrait
                  </Text>
                </VStack>
              </>
            )}
          </Button>
          <Button w={"100%"} borderRadius={20} bgColor={COLORS.primary} mt={10}>
            <Text style={{ ...FONTS.h2 }} color={COLORS.white}>
              Continue
            </Text>
          </Button>
        </SafeAreaView>
      </VStack>
    </TouchableWithoutFeedback>
  );
};

export default UploadFaceScreen;
