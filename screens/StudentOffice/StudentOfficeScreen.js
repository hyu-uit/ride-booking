import React, { useState } from "react";
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
  Icon,
  FlatList,
} from "native-base";
import { COLORS, FONTS, SIZES } from "../../constants/theme";
import { SafeAreaView } from "react-native-safe-area-context";
import { TabView, TabBar, SceneMap } from "react-native-tab-view";
import HistoryCard from "../../components/HistoryCard";
import StudentOfficeCard from "../../components/StudentOffice/StudentOfficeCard";
import { Ionicons } from "@expo/vector-icons";
import {
  query,
  collection,
  getDocs,
  where,
  getDoc,
  doc,
} from "firebase/firestore";
import { db } from "../../config/config";
import { useEffect } from "react";
import { getFromAsyncStorage } from "../../helper/asyncStorage";

const StudentOfficeScreen = ({ navigation }) => {
  const [service, setService] = useState(0);
  const [users, setUsers] = useState([]);

  const [phoneNumber, setPhoneNumber] = useState(null);
  const [uniName, setUniName] = useState(null);
  const [acronym, setAcronym] = useState(null);
  const [logo, setLogo] = useState(null);

  useEffect(() => {
    getUsers();
    // getFromAsyncStorage("phoneNumber")
    //   .then((value) => setPhoneNumber(value))
    //   .catch((err) => console.log(err));
    // fetchData();
    // fetchData();
    // getFromAsyncStorage("phoneNumber")
    //   .then((value) => setPhoneNumber(value))
    //   .catch((err) => console.log(err));

    fetchData();
  }, [navigation]);

  const fetchData = async () => {
    try {
      const phoneNumber = await getFromAsyncStorage("phoneNumber"); // Wait for getFromAsyncStorage to complete
      setPhoneNumber(phoneNumber);

      const docData = await getDoc(doc(db, "StudentOffice", phoneNumber)); // Wait for getDoc to complete
      if (docData.exists()) {
        setUniName(docData.data().name);
        setAcronym(docData.data().acronym);
        setLogo(docData.data().logo);
      } else {
        Alert.alert("Wrong phone number!");
        console.log("no such data");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // const fetchData = () => {
  //   getDoc(doc(db, "StudentOffice", phoneNumber))
  //     .then((docData) => {
  //       setUniName(docData.data().name);
  //       setAcronym(docData.data().acronym);
  //       setLogo(docData.data().logo);
  //     })
  //     .catch((error) => {});
  // };

  const getUsers = () => {
    let users = [];
    getDocs(
      query(collection(db, "Customer"), where("status", "==", "pending"))
    ).then((docSnap) => {
      docSnap.forEach((doc) => {
        users.push({
          role: "Customer",
          phoneNumber: doc.id,
          school: doc.data().school,
          displayName: doc.data().displayName,
          email: doc.data().email,
          studentID: doc.data().studentID,
          portrait: doc.data().portrait,
          cardFront: doc.data().cardFront,
          cardBack: doc.data().cardBack,
        });
      });
    });
    getDocs(
      query(collection(db, "Rider"), where("status", "==", "pending"))
    ).then((docSnap) => {
      docSnap.forEach((doc) => {
        users.push({
          role: "Rider",
          phoneNumber: doc.id,
          school: doc.data().school,
          displayName: doc.data().displayName,
          email: doc.data().email,
          studentID: doc.data().studentID,
          portrait: doc.data().portrait,
          cardFront: doc.data().cardFront,
          cardBack: doc.data().cardBack,
        });
      });
      setUsers(users);
    });
  };
  return (
    <VStack h={"100%"} bgColor={COLORS.background} getUsers>
      <SafeAreaView>
        <VStack h={"100%"} mt={"17px"} paddingX={"10px"}>
          <HStack paddingX={5}>
            <Image
              source={{ uri: logo }}
              alt="logo"
              w={10}
              h={10}
              resizeMode="contain"
            />
            <VStack ml={5}>
              <Text style={{ ...FONTS.body6, color: COLORS.lightGrey }}>
                {acronym}
              </Text>
              <Text style={{ ...FONTS.h6, color: COLORS.white }}>
                {uniName}
              </Text>
            </VStack>
          </HStack>
          <Input
            mb={5}
            borderRadius={10}
            h={"50px"}
            placeholder="Search"
            width="100%"
            variant={"filled"}
            bgColor={COLORS.tertiary}
            borderWidth={0}
            fontSize={SIZES.body3}
            color={COLORS.white}
            marginTop={8}
            InputLeftElement={
              <Icon
                ml="2"
                size="4"
                color={COLORS.white}
                as={<Ionicons name="ios-search" />}
              />
            }
          />
          <ScrollView>
            <FlatList
              data={users}
              keyExtractor={(item) => item.name}
              renderItem={({ item }) => (
                <StudentOfficeCard
                  onPress={() => {
                    // AsyncStorage.setItem('phoneNumber',item.phoneNumber),
                    // AsyncStorage.setItem('role',item.role),

                    const data = {
                      phoneNumber: "" + item.phoneNumber,
                      role: "" + item.role,
                    };
                    navigation.navigate("StudentOfficeDetail", data);
                  }}
                  user={item}
                  key={item.name}
                ></StudentOfficeCard>
              )}
            ></FlatList>
          </ScrollView>
        </VStack>
      </SafeAreaView>
    </VStack>
  );
};

export default StudentOfficeScreen;
