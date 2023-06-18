import { VStack, View } from "native-base";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS, FONTS, SIZES } from "../../../constants/theme";
import ButtonBack from "../../../components/Global/ButtonBack/ButtonBack";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../config/config";
import { Dimensions, Platform } from "react-native";
import ReceivedTripCard from "../../../components/Driver/ReceivedTripCard";
import MapView, { Marker, Polyline } from "react-native-maps";
import { calculateMapDelta } from "../../../helper/location";
import { Text } from "react-native";

const TripDetailScreen = ({ navigation, route }) => {
  const contentHeight = Dimensions.get("window").height;
  const { idTrip, state, isRead } = route.params;
  const [tripData, setTrip] = useState({});
  const [routing, setRouting] = useState([]);

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

  // useEffect(() => {
  //   // Request permission to access the device's location
  //   (async () => {
  //     let isAllowed = requestLocationPermissions();

  //     if (!isAllowed) return;

  //     // Subscribe to location updates
  //     let locationSubscriber = await watchPositionAsync(
  //       {
  //         accuracy: LocationAccuracy.BestForNavigation,
  //         timeInterval: 2000, // Update every 2 seconds
  //         distanceInterval: 10, // Update every 10 meters
  //       },
  //       ({ coords: { latitude, longitude } }) => {
  //         console.log(
  //           "🚀 ~ file: BookingDriverScreen.js:49 ~ newLocation:",
  //           latitude,
  //           longitude
  //         );
  //         animateToCoordinate(mapRef, latitude, longitude);
  //         setMarker({ latitude, longitude });
  //       }
  //     );

  //     return () => {
  //       // Cleanup: unsubscribe from location updates
  //       if (locationSubscriber) {
  //         locationSubscriber.remove();
  //       }
  //     };
  //   })();
  // }, []);

  const getTrip = () => {
    let data = {};
    getDoc(doc(db, "ListTrip", idTrip)).then((doc) => {
      if (doc.exists()) {
        data = {
          idCustomer: doc.data().idCustomer,
          idRider: doc.data().idRider,
          idTrip: doc.id,
          pickUpLat: parseFloat(doc.data().pickUpLat),
          pickUpLong: parseFloat(doc.data().pickUpLong),
          destLat: parseFloat(doc.data().destLat),
          destLong: parseFloat(doc.data().destLong),
          date: doc.data().date,
          time: doc.data().time,
          totalPrice: doc.data().totalPrice,
          distance: doc.data().distance,
          status: doc.data().status,
          destAddress: doc.data().destAddress,
          pickUpAddress: doc.data().pickUpAddress,
        };
        console.log("🚀 ~ file: TripDetailScreen.js:38 ~ getDoc ~ data:", data);
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
        {tripData.destLat &&
        tripData.pickUpLat &&
        tripData.destLong &&
        tripData.pickUpLong ? (
          <MapView
            style={{
              width: "100%",
              height: "100%",
              borderRadius: 20,
            }}
            provider="google"
            region={{
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
              latitude: tripData.pickUpLat, // get center latitude to zoom
              longitude: tripData.pickUpLong, // get center longitude to zoom
            }}
          >
            <Marker
              identifier="pickUp-t"
              key={"pickUp-t"}
              coordinate={{
                latitude: tripData.pickUpLat,
                longitude: tripData.pickUpLong,
              }}
              title={"Pick up"}
              description={tripData ? tripData.pickUpAddress : ""}
            ></Marker>
            <Marker
              identifier="destination-t"
              key={"destination-t"}
              coordinate={{
                latitude: tripData.destLat,
                longitude: tripData.destLong,
              }}
              title={"Destination"}
              description={tripData ? tripData.destAddress : ""}
            ></Marker>
            {routing ? (
              <Polyline
                coordinates={routing}
                strokeWidth={5}
                strokeColor="blue"
              />
            ) : null}
          </MapView>
        ) : (
          <MapView
            style={{
              width: "100%",
              height: "100%",
              borderRadius: 20,
            }}
            provider="google"
          ></MapView>
        )}

        <ReceivedTripCard
          trip={tripData}
          isRead={isRead}
          setRoute={setRouting}
          navigation={navigation}
        ></ReceivedTripCard>
      </SafeAreaView>
    </VStack>
  );
};

export default TripDetailScreen;
