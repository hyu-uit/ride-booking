import {
  Button,
  HStack,
  Image,
  Input,
  NativeBaseProvider,
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
} from "react-native";
import * as ImagePicker from "expo-image-picker";

const UploadID = ({ navigation }) => {
  const [width, setWidth] = useState(
    PixelRatio.roundToNearestPixel(SIZES.width - 20)
  );
  const [height, setHeight] = useState(0);
  const [imageFront, setImageFront] = useState(null);
  const [imageBack, setImageBack] = useState(null);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [3, 4],
      quality: 1,
    });

    if (!result.canceled) {
      setImageFront(result.assets[0].uri);
    }
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
    <NativeBaseProvider>
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
                      Upload your Student card (front)
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
                      Upload your Student card (backl)
                    </Text>
                  </VStack>
                </>
              )}
            </Button>
            <Button
              w={"100%"}
              borderRadius={20}
              bgColor={COLORS.primary}
              onPress={() => {
                navigation.navigate("UploadFace");
              }}
              mt={10}
            >
              <Text style={{ ...FONTS.h2 }} color={COLORS.white}>
                Continue
              </Text>
            </Button>
          </SafeAreaView>
        </VStack>
      </TouchableWithoutFeedback>
    </NativeBaseProvider>
  );
};

export default UploadID;
