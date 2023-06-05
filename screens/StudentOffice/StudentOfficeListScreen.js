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
} from "firebase/firestore";
import { db } from "../../config/config";
import { getFromAsyncStorage } from "../../helper/asyncStorage";

const StudentOfficeListScreen = ({ navigation }) => {
  const [usersRider, setUsersRider] = useState([]);
  const [usersCustomer, setUsersCustomer] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [phoneNumber, setPhoneNumber] = useState(null);

  useEffect(() => {
    fetchDataAndPhoneNumber();
  }, []);
  const fetchDataAndPhoneNumber = async () => {
    try {
      const phoneNumberValue = await getFromAsyncStorage("phoneNumber");
      setPhoneNumber(phoneNumberValue);

      if (phoneNumberValue) {
        getUsersCustomer();
        getUsersRider();
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getUsersRider = () => {
    const riderCollectionRef = collection(db, "Rider");
    const riderQuery = query(
      riderCollectionRef,
      where("status", "==", "active")
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
          key: doc.id + "-Rider",
        };
        updatedUsers.push(user);
      });
      setUsersRider((prevUsers) => [
        ...prevUsers.filter((user) => user.role !== "Rider"),
        ...updatedUsers,
      ]);
    });
    return () => {
      unsubscribeRider();
    };
  };
  const getUsersCustomer = () => {
    const customerCollectionRef = collection(db, "Customer");
    const customerQuery = query(
      customerCollectionRef,
      where("status", "==", "active")
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
          cardFront: doc.data().cardFront,
          birthday: doc.data().birthday,
          cardBack: doc.data().cardBack,
          key: doc.id + "-Rider",
        };
        updatedUsers.push(user);
      });
      setUsersCustomer((prevUsers) => [
        ...prevUsers.filter((user) => user.role !== "Rider"),
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

  const FirstRoute = () => (
    <VStack paddingX={"10px"} w={"100%"}>
      <Input
        mb={4}
        borderRadius={10}
        h={"50px"}
        placeholder="Search by Student ID"
        width="100%"
        variant={"filled"}
        bgColor={COLORS.tertiary}
        borderWidth={0}
        value={searchText}
        fontSize={SIZES.body3}
        color={COLORS.white}
        marginTop={4}
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
      {/* <StudentListCard
            onPress={() => {
              navigation.navigate("StudentListDetail");
            }}
          /> */}
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

  const SecondRoute = () => (
    <VStack paddingX={"10px"}>
      <Input
        mb={4}
        borderRadius={10}
        h={"50px"}
        placeholder="Search by Student ID"
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

  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
    // third: ThirdRoute,
  });

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "first", title: "Customer" },
    { key: "second", title: "Rider" },
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
              <TabBar
                {...props}
                style={{ backgroundColor: COLORS.tertiary }}
                inactiveColor={COLORS.fourthary}
                indicatorStyle={{ backgroundColor: COLORS.fourthary }}
                labelStyle={{ ...FONTS.h5 }}
              />
            )}
          />
        </VStack>
      </SafeAreaView>
    </VStack>
  );
};

export default StudentOfficeListScreen;
