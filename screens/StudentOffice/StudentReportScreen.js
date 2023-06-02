import React, { useState, useEffect } from "react";
import {
  Button,
  HStack,
  Image,
  Input,
  ScrollView,
  Spacer,
  FlatList,
  Text,
  VStack,
  View,
  Icon,
} from "native-base";
import { COLORS, FONTS, SIZES } from "../../constants/theme";
import { SafeAreaView } from "react-native-safe-area-context";
import ButtonBack from "../../components/Global/ButtonBack/ButtonBack";
import { PixelRatio } from "react-native";
import RejectModal from "../../components/Modal/RejectModal";
import { TabView, TabBar, SceneMap } from "react-native-tab-view";
import BookingCard from "../../components/BookingCard/BookingCard";
import { Ionicons } from "@expo/vector-icons";
import StudentListCard from "../../components/StudentOffice/StudentListCard";
import StudentReportCard from "../../components/StudentOffice/StudentReportCard";
import { query, collection, getDocs, where, onSnapshot } from "firebase/firestore";
import { db } from "../../config/config";
import { getFromAsyncStorage } from "../../helper/asyncStorage";
const StudentReportScreen = ({ navigation }) => {
  const [usersRider, setUsersRider] = useState([]);
  const [usersCustomer, setUsersCustomer] = useState([]);
  const [usersLock, setUsersLock] = useState([]);

  const [searchText, setSearchText] = useState('');
  const [phoneNumber, setPhoneNumber] = useState(null);

  useEffect(() => {
    fetchDataAndPhoneNumber()
  }, []);
  const fetchDataAndPhoneNumber = async () => {
    try {
      const phoneNumberValue = await getFromAsyncStorage("phoneNumber");
      setPhoneNumber(phoneNumberValue);

      if (phoneNumberValue) {
        getUsersCustomer();
        getUsersRider();
        getUsersLock();
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getUsersRider = () => {
    const riderCollectionRef = collection(db, "Rider");
    const riderQuery = query(riderCollectionRef, where("status", "==", "active"));
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
          cardFront: doc.data().cardFront,
          cardBack: doc.data().cardBack,
          key: doc.id + "-Rider",
        };
        updatedUsers.push(user);
      });
      setUsersRider((prevUsers) => [...prevUsers.filter((user) => user.role !== "Rider"), ...updatedUsers]);
    });
    return () => {
      unsubscribeRider();
    };
  };
  const getUsersCustomer = () => {
    const customerCollectionRef = collection(db, "Customer");
    const customerQuery = query(customerCollectionRef, where("status", "==", "active"));
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
          cardBack: doc.data().cardBack,
          key: doc.id + "-Customer",
        };
        updatedUsers.push(user);
      });
      setUsersCustomer((prevUsers) => [...prevUsers.filter((user) => user.role !== "Customer"), ...updatedUsers]);
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
  const filteredLockedUsers = usersLock.filter((user) => {
    const studentID = user.studentID.toLowerCase();
    const searchQuery = searchText.toLowerCase();
  
    return studentID.includes(searchQuery);
  });
  const getUsersLock = () => {
    const customerCollectionRef = collection(db, "Customer");
    const riderCollectionRef = collection(db, "Rider");

    const customerQuery = query(customerCollectionRef, where("status", "==", "locked"));
    const riderQuery = query(riderCollectionRef, where("status", "==", "locked"));

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
          cardBack: doc.data().cardBack,
          key: doc.id + "-Customer",
        };
        updatedUsers.push(user);
      });
      setUsersLock((prevUsers) => [...prevUsers.filter((user) => user.role !== "Customer"), ...updatedUsers]);
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
          portrait: doc.data().portrait,
          cardFront: doc.data().cardFront,
          cardBack: doc.data().cardBack,
          key: doc.id + "-Rider",
        };
        updatedUsers.push(user);
      });
      setUsersLock((prevUsers) => [...prevUsers.filter((user) => user.role !== "Rider"), ...updatedUsers]);
    });

    return () => {
      unsubscribeCustomer();
      unsubscribeRider();
    };
  };
  const FirstRoute = () => (
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
      <VStack justifyContent={"center"} alignItems={"center"}>
        <FlatList
          w={"100%"}
          data={filteredCustomerUsers}
          keyExtractor={(item) => item.name}
          renderItem={({ item }) => (
            <StudentReportCard
              listUser={item}
              onPress={() => {
                const data = {
                  phoneNumber: "" + item.phoneNumber,
                  role: "" + item.role,
                };
                navigation.navigate("StudentReportDetail", data);
              }}
            ></StudentReportCard>
          )}
        ></FlatList>
      </VStack>
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
      <VStack justifyContent={"center"} alignItems={"center"}>
        <ScrollView w={"100%"}>
          <FlatList
            data={filteredRiderUsers}
            keyExtractor={(item) => item.name}
            renderItem={({ item }) => (
              <StudentReportCard
                listUser={item}
                onPress={() => {
                  const data = {
                    phoneNumber: "" + item.phoneNumber,
                    role: "" + item.role,
                  };
                  navigation.navigate("StudentReportDetail", data);
                }}
              ></StudentReportCard>
            )}
          ></FlatList>
        </ScrollView>
      </VStack>
    </VStack>
  );

  const ThirdRoute = () => (
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
      <VStack justifyContent={"center"} alignItems={"center"}>
        {/* <StudentListCard />
          <StudentListCard /> */}
        {/* <FlatList
            data={usersLock}
            keyExtractor={(item) => item.name}
            renderItem={({ item }) => (
              <StudentListCard list={item}></StudentListCard>
            )}
          ></FlatList> */}
        <FlatList
          w={"100%"}
          h={"87%"}
          data={filteredLockedUsers}
          keyExtractor={(item) => item.name}
          renderItem={({ item }) => (
            <StudentReportCard
              listUser={item}
              onPress={() => {
                const data = {
                  phoneNumber: "" + item.phoneNumber,
                  role: "" + item.role,
                };
                navigation.navigate("StudentReportDetail", data);
              }}
            ></StudentReportCard>
          )}
        ></FlatList>
      </VStack>
    </VStack>
  );

  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
    third: ThirdRoute,
  });

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "first", title: "Customer" },
    { key: "second", title: "Rider" },
    { key: "third", title: "Locked" },
  ]);

  return (
    <VStack h={"100%"} bgColor={COLORS.background}>
      <SafeAreaView>
        <VStack h={"full"} mt={"17px"}>
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

export default StudentReportScreen;
