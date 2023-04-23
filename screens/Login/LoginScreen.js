import React from "react";
import {
  Button,
  HStack,
  Image,
  NativeBaseProvider,
  Text,
  VStack,
  View,
} from "native-base";
import { SIZES, COLORS, FONTS } from "../../constants/theme";
import BlueBg from "../../assets/images/Login/blueBg.png";
import { SafeAreaView } from "react-native-safe-area-context";

const LoginScreen = ({ navigation }) => {
  return (
    <NativeBaseProvider>
      <VStack paddingX={"10px"} bgColor={COLORS.background}>
        <VStack w={"100%"} h={"40%"}>
          <Image
            source={BlueBg}
            alt="car"
            marginLeft={"auto"}
            h={"90%"}
            resizeMode="stretch"
          />
          <Image
            source={{
              uri: "https://media0.giphy.com/media/LpW8NlEe3KBlXoLpXd/200w.gif?cid=82a1493bggk55oaxg5n7tj7vzivnedconsdknmcte4021e1b&rid=200w.gif&ct=s",
            }}
            alt="car"
            marginLeft={"auto"}
            h={"70%"}
            w={"80%"}
            resizeMode="stretch"
            position={"absolute"}
            top={100}
            left={-30}
          />
        </VStack>
        <VStack w={"100%"} h={"60%"}>
          <Text bold fontSize={60} color={COLORS.white} lineHeight={70}>
            Get Your {"\n"}Drive
          </Text>
          <Text color={COLORS.fifthary} style={{ ...FONTS.body3 }} mt={10}>
            Say goodbye to the hassle of finding reliable transportation as a
            student - our app makes booking a ride simple, efficient, and
            affordable
          </Text>
          <HStack
            w={"100%"}
            bgColor={COLORS.tertiary}
            h={"77px"}
            position={"absolute"}
            bottom={20}
            borderRadius={20}
          >
            <Button
              w={"50%"}
              borderRadius={20}
              bgColor={COLORS.primary}
              onPress={() => {
                navigation.navigate("SignUp");
              }}
            >
              <Text style={{ ...FONTS.h2 }} color={COLORS.white}>
                Register
              </Text>
            </Button>
            <Button
              w={"50%"}
              borderRadius={20}
              bgColor={"transparent"}
              onPress={() => {
                navigation.navigate("SignIn");
              }}
            >
              <Text style={{ ...FONTS.h2 }} color={COLORS.white}>
                Sign in
              </Text>
            </Button>
          </HStack>
        </VStack>
      </VStack>
    </NativeBaseProvider>
  );
};

export default LoginScreen;
