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
import { query, collection, getDocs, where } from "firebase/firestore";
import { db } from "../../config/config";
const StudentReportScreen = ({ navigation }) => {
  const [usersRider, setUsersRider] = useState([]);
  const [usersCustomer, setUsersCustomer] = useState([]);
  const [usersLock, setUsersLock] = useState([]);

  useEffect(() => {
    getUsersCustomer();
    getUsersRider();
    getUsersLock();
  }, []);

  const getUsersRider = () => {
    let usersRider = [];
    getDocs(
      query(collection(db, "Rider"), where("status", "==", "active"))
    ).then((docSnap) => {
      docSnap.forEach((doc) => {
        usersRider.push({
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
      setUsersRider(usersRider);
    });
  };
  const getUsersCustomer = () => {
    let usersCustomer = [];
    getDocs(
      query(collection(db, "Customer"), where("status", "==", "active"))
    ).then((docSnap) => {
      docSnap.forEach((doc) => {
        usersCustomer.push({
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
      setUsersCustomer(usersCustomer);
    });
  };
  const getUsersLock = () => {
    let usersLock = [];
    getDocs(
      query(collection(db, "Customer"), where("status", "==", "locked"))
    ).then((docSnap) => {
      docSnap.forEach((doc) => {
        usersLock.push({
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
      query(collection(db, "Rider"), where("status", "==", "locked"))
    ).then((docSnap) => {
      docSnap.forEach((doc) => {
        usersLock.push({
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
      setUsersLock(usersLock);
    });
  };
  const FirstRoute = () => (
    <VStack paddingX={"10px"}>
      <Input
        mb={5}
        borderRadius={10}
        h={"50px"}
        placeholder="Search by Student ID"
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
      <VStack mt={"17px"} justifyContent={"center"} alignItems={"center"}>
        <ScrollView w={"100%"}>
          <FlatList
            data={usersCustomer}
            keyExtractor={(item) => item.name}
            renderItem={({ item }) => (
              <StudentReportCard listUser={item}></StudentReportCard>
            )}
          ></FlatList>
        </ScrollView>
      </VStack>
    </VStack>
  );

  const SecondRoute = () => (
    <VStack paddingX={"10px"}>
      <Input
        mb={5}
        borderRadius={10}
        h={"50px"}
        placeholder="Search by Student ID"
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
      <VStack mt={"17px"} justifyContent={"center"} alignItems={"center"}>
        <ScrollView w={"100%"}>
          <FlatList
            data={usersRider}
            keyExtractor={(item) => item.name}
            renderItem={({ item }) => (
              <StudentReportCard listUser={item}></StudentReportCard>
            )}
          ></FlatList>
        </ScrollView>
      </VStack>
    </VStack>
  );

  // const ThirdRoute = () => (
  //   <VStack paddingX={"10px"}>
  //     <Input
  //       mb={5}
  //       borderRadius={10}
  //       h={"50px"}
  //       placeholder="Search by Student ID"
  //       width="100%"
  //       variant={"filled"}
  //       bgColor={COLORS.tertiary}
  //       borderWidth={0}
  //       fontSize={SIZES.body3}
  //       color={COLORS.white}
  //       marginTop={8}
  //       InputLeftElement={
  //         <Icon
  //           ml="2"
  //           size="4"
  //           color={COLORS.white}
  //           as={<Ionicons name="ios-search" />}
  //         />
  //       }
  //     />
  //     <VStack mt={"17px"} justifyContent={"center"} alignItems={"center"}>
  //       <ScrollView w={"100%"}>
  //         {/* <StudentListCard />
  //         <StudentListCard /> */}
  //         <FlatList
  //           data={usersLock}
  //           keyExtractor={(item) => item.name}
  //           renderItem={({ item }) => (
  //             <StudentListCard list={item}></StudentListCard>
  //           )}
  //         ></FlatList>
  //       </ScrollView>
  //     </VStack>
  //   </VStack>
  // );

  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
    // third: ThirdRoute,
  });

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "first", title: "Customer" },
    { key: "second", title: "Rider" },
    // { key: "third", title: "Locked" },
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

export default StudentReportScreen;
