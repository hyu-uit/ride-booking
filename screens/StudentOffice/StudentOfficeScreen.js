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
  onSnapshot,
} from "firebase/firestore";
import { db } from "../../config/config";
import { useEffect } from "react";
import {
  getFromAsyncStorage,
  saveToAsyncStorage,
} from "../../helper/asyncStorage";
import { useFocusEffect } from "@react-navigation/native";
import { BackHandler, ToastAndroid } from "react-native";
import { useTranslation } from "react-i18next";

const StudentOfficeScreen = ({ navigation }) => {
  const [service, setService] = useState(0);
  const [users, setUsers] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [phoneNumber, setPhoneNumber] = useState(null);
  const [uniName, setUniName] = useState(null);
  const [acronym, setAcronym] = useState(null);
  const [logo, setLogo] = useState(null);
  const { t } = useTranslation();

  let backButtonPressedOnce = false;

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        if (backButtonPressedOnce) {
          BackHandler.exitApp();
        } else {
          backButtonPressedOnce = true;
          ToastAndroid.show(t("pressBack"), ToastAndroid.SHORT);
          setTimeout(() => {
            backButtonPressedOnce = false;
          }, 2000); // Reset the variable after 2 seconds
        }
        return true;
      };

      BackHandler.addEventListener("hardwareBackPress", onBackPress);

      return () =>
        BackHandler.removeEventListener("hardwareBackPress", onBackPress);
    }, [])
  );

  useEffect(() => {
    fetchDataAndPhoneNumber();
  }, []);

  const fetchDataAndPhoneNumber = async () => {
    try {
      const phoneNumberValue = await getFromAsyncStorage("phoneNumber");
      setPhoneNumber(phoneNumberValue);

      if (phoneNumberValue) {
        fetchData(phoneNumberValue);
        // subscribeToUserChanges();
      }
    } catch (err) {
      console.log(err);
    }
  };

  const fetchData = async (phoneNumber) => {
    try {
      const docData = await getDoc(doc(db, "StudentOffice", phoneNumber));
      setUniName(docData.data().name);
      setAcronym(docData.data().acronym);
      setLogo(docData.data().logo);
      subscribeToUserChanges(docData.data().acronym);
      saveToAsyncStorage("acronym", docData.data().acronym);
    } catch (error) {
      console.error(error);
    }
  };
  // const handleDeleteStudent = (item) => {
  //   // Xóa mục khỏi danh sách sinh viên
  //   const updatedList = users.filter((user) => {user.phoneNumber !== item
  //   });
  //   setUsers(updatedList);
  // };
  const subscribeToUserChanges = (ac) => {
    const customerCollectionRef = collection(db, "Customer");
    const riderCollectionRef = collection(db, "Rider");

    const customerQuery = query(
      customerCollectionRef,
      where("status", "==", "pending"),
      where("school", "==", ac)
    );
    const riderQuery = query(
      riderCollectionRef,
      where("status", "==", "pending"),
      where("school", "==", ac)
    );

    const unsubscribeCustomer = onSnapshot(customerQuery, (querySnapshot) => {
      const updatedUsers = [];

      querySnapshot.forEach((doc) => {
        const user = {
          role: "Customer",
          phoneNumber: doc.id,
          school: doc.data().school,
          displayName: doc.data().displayName,
          email: doc.data().email,
          studentID: doc.data().studentID,
          portrait: doc.data().portrait,
          birthday: doc.data().birthday,
          cardFront: doc.data().cardFront,
          cardBack: doc.data().cardBack,
          key: doc.id + "-Customer",
        };
        updatedUsers.push(user);
      });
      setUsers((prevUsers) => [
        ...prevUsers.filter((user) => user.role !== "Customer"),
        ...updatedUsers,
      ]);
    });
    const unsubscribeRider = onSnapshot(riderQuery, (querySnapshot) => {
      const updatedUsers = [];
      querySnapshot.forEach((doc) => {
        const user = {
          role: "Rider",
          phoneNumber: doc.id,
          school: doc.data().school,
          displayName: doc.data().displayName,
          email: doc.data().email,
          studentID: doc.data().studentID,
          birthday: doc.data().birthday,
          portrait: doc.data().portrait,
          cardFront: doc.data().cardFront,
          cardBack: doc.data().cardBack,
          key: doc.id + "-Rider",
        };
        updatedUsers.push(user);
      });
      setUsers((prevUsers) => [
        ...prevUsers.filter((user) => user.role !== "Rider"),
        ...updatedUsers,
      ]);
    });

    return () => {
      unsubscribeCustomer();
      unsubscribeRider();
    };
  };
  const handleSearchTextChange = (text) => {
    setSearchText(text);
  };
  const filteredUsers = users.filter((user) => {
    const displayName = user.displayName.toLowerCase();
    const studentID = user.studentID.toLowerCase();
    const searchQuery = searchText.toLowerCase();

    return displayName.includes(searchQuery) || studentID.includes(searchQuery);
  });
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
            placeholder={t("search")}
            width="100%"
            variant={"filled"}
            bgColor={COLORS.tertiary}
            borderWidth={0}
            fontSize={SIZES.body3}
            color={COLORS.white}
            marginTop={8}
            onChangeText={handleSearchTextChange}
            InputLeftElement={
              <Icon
                ml="2"
                size="4"
                color={COLORS.white}
                as={<Ionicons name="ios-search" />}
              />
            }
          />
          <FlatList
            data={filteredUsers}
            keyExtractor={(item) => item.key}
            renderItem={({ item }) => (
              <StudentOfficeCard
                onPress={() => {
                  const data = {
                    phoneNumber: "" + item.phoneNumber,
                    role: "" + item.role,
                  };
                  navigation.navigate("StudentOfficeDetail", data);
                }}
                user={item}
                key={item.name}
                // onPressDelete={handleDeleteStudent}
              ></StudentOfficeCard>
            )}
          ></FlatList>
        </VStack>
      </SafeAreaView>
    </VStack>
  );
};

export default StudentOfficeScreen;
