import styled from "styled-components";
import { FONTS, COLORS, SIZES } from "../constants";
import {
  Avatar,
  Button,
  Center,
  FlatList,
  HStack,
  Icon,
  Image,
  Input,
  ScrollView,
  Text,
  VStack,
} from "native-base";
import DefaultAvt from "../assets/image6.png";
import { SafeAreaView } from "react-native-safe-area-context";
import MenuIcon from "../assets/icons/icons8-menu-48.png";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import SelectedButton from "../components/Button/SelectedButton";
import HistoryCard from "../components/HistoryCard";
import BikeImg from "../assets/images/motorcycle_1.png";
import DeliveryImg from "../assets/images/delivery_1.png";
import { TouchableWithoutFeedback } from "react-native";
import { Keyboard } from "react-native";
import LottieView from "lottie-react-native";
import { useEffect } from "react";
import { getFromAsyncStorage } from "../helper/asyncStorage";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../config/config";

export default function Home({ navigation, route }) {
  const [phone, setPhone] = useState("");
  const [historyTrips, setHistoryTrips] = useState([]);

  useEffect(() => {
    getFromAsyncStorage("phoneNumber")
      .then((value) => setPhone(value))
      .catch((err) => console.log(err));
    getHistoryTrips();
  }, [navigation]);
  //const {phoneNumber, role} = route.params;
  const getHistoryTrips = () => {
    let historyTrips = [];
    getDocs(
      query(collection(db, "ListTrip"), where("status", "==", "done"))
    ).then((docSnap) => {
      docSnap.forEach((doc) => {
        historyTrips.push({
          idCustomer: doc.data().idCustomer,
          idTrip: doc.id,
          pickUpLat: doc.data().pickUpLat,
          pickUpLong: doc.data().pickUpLong,
          destLat: doc.data().destLat,
          destLong: doc.data().destLong,
          date: doc.data().date,
          time: doc.data().time,
          datePickUp: doc.data().datePickUp,
          timePickUp: doc.data().timePickUp,
          totalPrice: doc.data().totalPrice,
          distance: doc.data().distance,
        });
      });
      setHistoryTrips(historyTrips);
    });
  };
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      <HomeContainer>
        <HStack w={"full"} alignContent={"center"}>
          <Avatar source={DefaultAvt} margin={"10px 0 0 10px"} />
          <VStack margin={"10px 0 0 10px"}>
            <Text fontSize={10} color={COLORS.grey}>
              Welcome back
            </Text>
            <Text fontSize={SIZES.h4} color={COLORS.white} bold>
              Nguyen Tri Duc
            </Text>
          </VStack>
          <MenuButton
            onPress={() => {
              navigation.navigate("Menu");
            }}
          >
            <Center h={"100%"}>
              <Image w={"25px"} h={"25px"} source={MenuIcon} alt="menu icon" />
            </Center>
          </MenuButton>
        </HStack>
        <HStack>
          <ScrollView showsVerticalScrollIndicator={false}>
            <HStack
              w={"100%"}
              borderRadius={10}
              bgColor={COLORS.tertiary}
              borderWidth={0}
              h={"50px"}
              mb={10}
              mt={8}
              alignItems={"center"}
              onTouchEnd={() => {
                navigation.navigate("Booking");
              }}
            >
              <Icon
                ml="2"
                size="4"
                color={COLORS.white}
                as={<Ionicons name="ios-search" />}
              />
              <Text
                style={{ ...FONTS.body3, color: COLORS.grey, marginLeft: 10 }}
              >
                Enter your destination
              </Text>
            </HStack>
            {/* <HStack
              marginTop={5}
              marginBottom={5}
              space={3}
              alignSelf={"flex-start"}
            >
              <SelectedButton text={"Home"} />
              <SelectedButton text={"School"} />
              <SelectedButton text={"Hotel"} />
            </HStack> */}
            <HStack w={"100%"} justifyContent={"space-evenly"} marginBottom={5}>
              <TouchableOpacity
                onPress={() => {
                  const data = { phoneNumber: "0393751403" };
                  navigation.navigate("Booking", data);
                }}
              >
                <VStack
                  borderColor={"white"}
                  borderWidth={1}
                  borderRadius={SIZES.radius10}
                >
                  <Center
                    w={"150px"}
                    h={"120px"}
                    bgColor={COLORS.fourthary}
                    borderTopRadius={SIZES.radius10}
                  >
                    <Image source={BikeImg} alt="bike" />
                  </Center>
                  <Center h={50}>
                    <Text fontSize={SIZES.h4} bold color={"white"}>
                      BIKE
                    </Text>
                  </Center>
                </VStack>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("Booking");
                }}
              >
                <VStack
                  borderColor={"white"}
                  borderWidth={1}
                  borderRadius={SIZES.radius10}
                >
                  <Center
                    w={"150px"}
                    h={"120px"}
                    bgColor={COLORS.white}
                    borderTopRadius={SIZES.radius10}
                  >
                    <Image source={DeliveryImg} alt="delivery" />
                  </Center>
                  <Center h={50}>
                    <Text fontSize={SIZES.h4} bold color={"white"}>
                      DELIVERY
                    </Text>
                  </Center>
                </VStack>
              </TouchableOpacity>
            </HStack>
            <Text
              fontSize={SIZES.h4}
              bold
              color={"white"}
              alignSelf={"flex-start"}
              marginBottom={3}
            >
              Last booking
            </Text>
            <VStack w={"100%"}>
              {/* <HistoryCard
                onPress={() => {
                  navigation.navigate("ActivityDetail");
                }}
              /> */}
              <FlatList
                padding={"10px"}
                mt={2}
                horizontal={false}
                data={historyTrips}
                keyExtractor={(item) => item.idTrip}
                renderItem={({ item }) => (
                  <HistoryCard
                    onPress={() => {
                      const data = {
                        idTrip: "" + item.idTrip,
                      };
                      navigation.navigate("ActivityDetail", data);
                    }}
                    trip={item}
                    key={item.idTrip}
                  ></HistoryCard>
                )}
              ></FlatList>
            </VStack>
          </ScrollView>
        </HStack>
      </HomeContainer>
    </TouchableWithoutFeedback>
  );
}

const MenuButton = styled(TouchableOpacity)`
  width: 45px;
  height: 45px;
  border-radius: 30px;
  border-color: ${(props) => COLORS.tertiary};
  border-width: 2px;
  margin-left: auto;
  align-self: center;
`;

const HomeContainer = styled(SafeAreaView)`
  flex: 1;
  background-color: ${(props) => COLORS.background};
  padding: 0px 10px 0 10px;
  align-items: center;
  /* overflow: scroll; */
`;
