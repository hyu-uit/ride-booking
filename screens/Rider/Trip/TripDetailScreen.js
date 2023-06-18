import { VStack, View } from "native-base";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS, FONTS, SIZES } from "../../../constants/theme";
import ButtonBack from "../../../components/Global/ButtonBack/ButtonBack";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../config/config";
import { Dimensions, Platform } from "react-native";
import ReceivedTripCard from "../../../components/Driver/ReceivedTripCard";
import MapView from "react-native-maps";
import { Marker } from "react-native-svg";
import { Text } from 'react-native';

const TripDetailScreen = ({ navigation, route }) => {
  const contentHeight = Dimensions.get("window").height;
  const { idTrip, state, isRead } = route.params;
  const [tripData, setTrip] = useState({});

  useEffect(() => {
    getTrip();
    const disableSwipeBack = () => {
      navigation.setOptions({
        gestureEnabled: false,
      });
    };
    disableSwipeBack();
    return () => {
      navigation.setOptions({
        gestureEnabled: true,
      });
    };
  }, [navigation]);
  const getTrip = () => {
    let data = {};
    getDoc(doc(db, "ListTrip", idTrip)).then((doc) => {
      if (doc.exists()) {
        data = {
          idCustomer: doc.data().idCustomer,
          idRider: doc.data().idRider,
          idTrip: doc.id,
          pickUpLat: doc.data().pickUpLat,
          pickUpLong: doc.data().pickUpLong,
          destLat: doc.data().destLat,
          destLong: doc.data().destLong,
          date: doc.data().date,
          time: doc.data().time,
          totalPrice: doc.data().totalPrice,
          distance: doc.data().distance,
          status: doc.data().status,
        };
      }
      setTrip(data);
    });
  };
  console.log(state);
  return (
    <VStack
      h={Platform.OS === "ios" ? contentHeight : "100%"}
      bgColor={COLORS.background}
    >
      <SafeAreaView>
        <View
          style={{
            position: "absolute",
            top: 50,
            left: 2,
            zIndex: 1,
            display: state === 1 ? "none" : "flex",
          }}
        >
          <ButtonBack
            onPress={() => {
              navigation.goBack();
            }}
          />
        </View>
        <MapView
          provider="google"
          style={{
            width: "100%",
            height: "100%",
            borderRadius: 20,
          }}
        >
          <Marker
            coordinate={{ latitude: 9.90761, longitude: 105.31181 }}
          ></Marker>
        </MapView>
        <ReceivedTripCard
          trip={tripData}
          isRead={isRead}
          navigation={navigation}
        ></ReceivedTripCard>  
      </SafeAreaView>
    </VStack>
  );
};

export default TripDetailScreen;
