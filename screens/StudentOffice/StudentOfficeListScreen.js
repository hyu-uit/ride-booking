import React, { useState, useEffect } from "react";
import {
  Button,
  HStack,
  Image,
  Input,
  ScrollView,
  Spacer,
  Text,
  VStack,
  FlatList,
  View,
  Icon,
} from "native-base";
import { COLORS, FONTS, SIZES } from "../../constants/theme";
import { SafeAreaView } from "react-native-safe-area-context";
import ButtonBack from "../../components/Global/ButtonBack/ButtonBack";
import { PixelRatio } from "react-native";
import { TabView, TabBar, SceneMap } from "react-native-tab-view";
import { Ionicons } from "@expo/vector-icons";
import StudentListCard from "../../components/StudentOffice/StudentListCard";
import {
  query,
  collection,
  getDocs,
  where,
  onSnapshot,
  getDoc,
  doc,
} from "firebase/firestore";
import { db } from "../../config/config";
import { getFromAsyncStorage } from "../../helper/asyncStorage";
import { useTranslation } from "react-i18next";

const StudentOfficeListScreen = ({ navigation }) => {
  const [usersRider, setUsersRider] = useState([]);
  const [usersCustomer, setUsersCustomer] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [phoneNumber, setPhoneNumber] = useState(null);
  const { t } = useTranslation();

  useEffect(() => {
    fetchDataAndPhoneNumber();
  }, []);
  const fetchDataAndPhoneNumber = async () => {
    try {
      const phoneNumberValue = await getFromAsyncStorage("phoneNumber");
      setPhoneNumber(phoneNumberValue);
      if (phoneNumberValue) {
        const docData = await getDoc(
          doc(db, "StudentOffice", phoneNumberValue)
        );

        getUsersCustomer(docData.data().acronym);
        getUsersRider(docData.data().acronym);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getUsersRider = (ac) => {
    const riderCollectionRef = collection(db, "Rider");
    const riderQuery = query(
      riderCollectionRef,
      where("status", "==", "active"),
      where("school", "==", ac)
    );
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
          portrait: doc.data().portrait,
          birthday: doc.data().birthday,
          cardFront: doc.data().cardFront,
          cardBack: doc.data().cardBack,
          key: doc.id + "Rider",
        };
        updatedUsers.push(user);
      });
      setUsersRider([]);
      setUsersRider((prevUsers) => [
        ...prevUsers.filter((user) => user.role !== "Rider"),
        ...updatedUsers,
      ]);
    });
    return () => {
      unsubscribeRider();
    };
  };

  const getUsersCustomer = (ac) => {
    const customerCollectionRef = collection(db, "Customer");
    const customerQuery = query(
      customerCollectionRef,
      where("status", "==", "active"),
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
          birthday: doc.data().birthday,
          portrait: doc.data().portrait,
          cardFront: doc.data().cardFront,
          cardBack: doc.data().cardBack,
          key: doc.id + "-Customer",
        };
        updatedUsers.push(user);
      });
      setUsersCustomer((prevUsers) => [
        ...prevUsers.filter((user) => user.role !== "Customer"),
        ...updatedUsers,
      ]);
    });
    return () => {
      unsubscribeCustomer();
    };
  };

  const handleSearchTextChange = (text) => {
    setSearchText(text);
  };

  const filteredCustomerUsers = usersCustomer.filter((user) => {
    const studentID = user.studentID.toLowerCase();
    const searchQuery = searchText.toLowerCase();

    return studentID.includes(searchQuery);
  });
  const filteredRiderUsers = usersRider.filter((user) => {
    const studentID = user.studentID.toLowerCase();
    const searchQuery = searchText.toLowerCase();

    return studentID.includes(searchQuery);
  });

  const FirstRoute = () => {
    return (
      <VStack paddingX={"10px"} w={"100%"}>
        <FlatList
          data={filteredCustomerUsers}
          keyExtractor={(item) => item.key}
          renderItem={({ item }) => (
            <StudentListCard
              onPress={() => {
                const data = {
                  phoneNumber: "" + item.phoneNumber,
                  role: "" + item.role,
                };
                navigation.navigate("StudentListDetail", data);
              }}
              list={item}
            ></StudentListCard>
          )}
        ></FlatList>
      </VStack>
    );
  };

  const SecondRoute = () => {
    return (
      <VStack paddingX={"10px"}>
        <FlatList
          data={filteredRiderUsers}
          keyExtractor={(item) => item.key}
          renderItem={({ item }) => (
            <StudentListCard
              onPress={() => {
                const data = {
                  phoneNumber: "" + item.phoneNumber,
                  role: "" + item.role,
                };
                navigation.navigate("StudentListDetail", data);
              }}
              list={item}
            ></StudentListCard>
          )}
        ></FlatList>
      </VStack>
    );
  };

  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
    // third: ThirdRoute,
  });

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "first", title: t("customer") },
    { key: "second", title: t("rider") },
    // { key: "third", title: "Bad" },
  ]);

  return (
    <VStack h={"100%"} bgColor={COLORS.background}>
      <SafeAreaView>
        <VStack h={"100%"} mt={"17px"}>
          <TabView
            navigationState={{ index, routes }}
            renderScene={renderScene}
            onIndexChange={setIndex}
            initialLayout={{ width: SIZES.width }}
            renderTabBar={(props) => (
              <VStack>
                <TabBar
                  {...props}
                  style={{ backgroundColor: COLORS.tertiary, marginBottom: 2 }}
                  inactiveColor={COLORS.fourthary}
                  indicatorStyle={{ backgroundColor: COLORS.fourthary }}
                  labelStyle={{ ...FONTS.h5 }}
                />
                <VStack paddingX={"10px"}>
                  <Input
                    mb={4}
                    borderRadius={10}
                    h={"50px"}
                    placeholder={t("search")}
                    width="100%"
                    variant={"filled"}
                    bgColor={COLORS.tertiary}
                    borderWidth={0}
                    fontSize={SIZES.body3}
                    color={COLORS.white}
                    marginTop={4}
                    value={searchText}
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
                </VStack>
              </VStack>
            )}
          />
        </VStack>
      </SafeAreaView>
    </VStack>
  );
};

export default StudentOfficeListScreen;
