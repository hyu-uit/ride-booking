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
  getDoc,
  doc,
} from "firebase/firestore";
import { db } from "../../config/config";
import { getFromAsyncStorage } from "../../helper/asyncStorage";

const StudentOfficeListScreen = ({ navigation }) => {
  const [usersRider, setUsersRider] = useState([]);
  const [usersCustomer, setUsersCustomer] = useState([]);
  const [usersLock, setUsersLock] = useState([]);
  const [acronym, setAcronym] = useState();
  const [phoneNumber, setPhoneNumber] = useState(null);

  useEffect(() => {
    fetchDataAndPhoneNumber();
  }, []);

  const fetchDataAndPhoneNumber = async () => {
    try {
      const phoneNumberValue = await getFromAsyncStorage("phoneNumber");
      setPhoneNumber(phoneNumberValue);

      if (phoneNumberValue) {
        await fetchData(phoneNumberValue);
        await getUsersCustomer();
        await getUsersRider();
      }
    } catch (err) {
      console.log(err);
    }
  };

  const fetchData = async (phoneNumber) => {
    try {
      console.log(phoneNumber);
      const docData = await getDoc(doc(db, "StudentOffice", phoneNumber));
      setAcronym(docData.data().acronym);
    } catch (error) {
      console.error(error);
    }
  };

  // useEffect(() => {
  //   getUsersCustomer();
  //   getUsersRider();
  //   // getUsersLock();
  //   setAcronym(getFromAsyncStorage("acronym"));
  // }, []);

  const getUsersRider = () => {
    let usersRider = [];
    getDocs(
      query(collection(db, "Rider"), where("status", "==", "active"))
    ).then((docSnap) => {
      docSnap.forEach((doc) => {
        if (doc.data().school === acronym) {
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
        }
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
        if (doc.data().school === acronym) {
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
        }
      });
      setUsersCustomer(usersCustomer);
    });
  };
  // const getUsersLock = () => {
  //   let usersLock = [];
  //   getDocs(
  //     query(collection(db, "Customer"), where("status", "==", "locked"))
  //   ).then((docSnap) => {
  //     docSnap.forEach((doc) => {
  //       if (doc.data().school === acronym) {
  //         usersLock.push({
  //           role: "Customer",
  //           phoneNumber: doc.id,
  //           school: doc.data().school,
  //           displayName: doc.data().displayName,
  //           email: doc.data().email,
  //           studentID: doc.data().studentID,
  //           portrait: doc.data().portrait,
  //           cardFront: doc.data().cardFront,
  //           cardBack: doc.data().cardBack,
  //         });
  //       }
  //     });
  //   });
  //   getDocs(
  //     query(collection(db, "Rider"), where("status", "==", "locked"))
  //   ).then((docSnap) => {
  //     docSnap.forEach((doc) => {
  //       if (doc.data().school === acronym) {
  //         usersLock.push({
  //           role: "Rider",
  //           phoneNumber: doc.id,
  //           school: doc.data().school,
  //           displayName: doc.data().displayName,
  //           email: doc.data().email,
  //           studentID: doc.data().studentID,
  //           portrait: doc.data().portrait,
  //           cardFront: doc.data().cardFront,
  //           cardBack: doc.data().cardBack,
  //         });
  //       }
  //     });
  //     setUsersLock(usersLock);
  //   });
  // };
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
        fontSize={SIZES.body3}
        color={COLORS.white}
        marginTop={4}
        InputLeftElement={
          <Icon
            ml="2"
            size="4"
            color={COLORS.white}
            as={<Ionicons name="ios-search" />}
          />
        }
      />
      <VStack h={"100%"} pb={5} justifyContent={"end"} alignItems={"center"}>
        {/* <StudentListCard
            onPress={() => {
              navigation.navigate("StudentListDetail");
            }}
          /> */}
        <FlatList
          w={"100%"}
          data={usersCustomer}
          keyExtractor={(item) => item.name}
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
          data={usersRider}
          keyExtractor={(item) => item.name}
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
  //       <FlatList
  //         w={"100%"}
  //         data={usersLock}
  //         keyExtractor={(item) => item.name}
  //         renderItem={({ item }) => (
  //           <StudentListCard
  //             onPress={() => {
  //               const data = {
  //                 phoneNumber: "" + item.phoneNumber,
  //                 role: "" + item.role,
  //               };
  //               navigation.navigate("StudentListDetail", data);
  //             }}
  //             list={item}
  //           ></StudentListCard>
  //         )}
  //       ></FlatList>
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
