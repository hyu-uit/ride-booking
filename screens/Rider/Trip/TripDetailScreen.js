import { VStack, View } from "native-base";
import React, { useEffect, useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS, FONTS, SIZES } from "../../../constants/theme";
import ButtonBack from "../../../components/Global/ButtonBack/ButtonBack";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../config/config";
import { Dimensions, Platform } from "react-native";
import ReceivedTripCard from "../../../components/Driver/ReceivedTripCard";
import MapView, { Marker, Polyline } from "react-native-maps";
import { requestLocationPermissions } from "../../../helper/location";
import { Text } from "react-native";
import { LocationAccuracy, watchPositionAsync } from "expo-location";

const TripDetailScreen = ({ navigation, route }) => {
  const contentHeight = Dimensions.get("window").height;
  const { idTrip, state, isRead, isScheduled } = route.params;
  const [tripData, setTrip] = useState({});
  const [routing, setRouting] = useState([]);
  const [customerLocation, setCustomerLocation] = useState({});
  const mapRef = useRef();
  const [isStarted, setIsStarted] = useState(false);

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
  }, [navigation, tripData.status]);

  useEffect(() => {
    if (isStarted) {
      // Request permission to access the device's location
      (async () => {
        let isAllowed = await requestLocationPermissions();

        if (!isAllowed) return;

        // Subscribe to location updates
        let locationSubscriber = await watchPositionAsync(
          {
            accuracy: LocationAccuracy.BestForNavigation,
            timeInterval: 1000, // Update every 1 seconds
            distanceInterval: 10, // Update every 10 meters
          },
          ({ coords: { latitude, longitude } }) => {
            console.log(
              "🚀 ~ file: TripDetailScreen.js:55 ~ latitude, longitude:",
              latitude,
              longitude
            );
            setCustomerLocation({ latitude, longitude });
          }
        );

        return () => {
          // Cleanup: unsubscribe from location updates
          if (locationSubscriber) {
            locationSubscriber.remove();
          }
        };
      })();
    }
  }, [isStarted]);

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
          isScheduled: doc.data().isScheduled,
        };
        console.log("🚀 ~ file: TripDetailScreen.js:38 ~ getDoc ~ data:", data);
        setCustomerLocation({
          latitude: data.pickUpLat,
          longitude: data.pickUpLong,
        });
      }
      setTrip(data);
    });
  };
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
          {tripData.status !== "accepted" || tripData.isScheduled === "true" ? (
            <>
              <ButtonBack
                onPress={() => {
                  navigation.goBack();
                }}
              />
            </>
          ) : (
            <></>
          )}
        </View>
        {tripData.destLat &&
        tripData.pickUpLat &&
        tripData.destLong &&
        tripData.pickUpLong ? (
          <MapView
            ref={mapRef}
            style={{
              width: "100%",
              height: "100%",
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
              coordinate={customerLocation}
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
            ref={mapRef}
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
          isScheduled={isScheduled}
          sta={1}
          setRoute={setRouting}
          navigation={navigation}
          setIsStarted={setIsStarted}
        ></ReceivedTripCard>
      </SafeAreaView>
    </VStack>
  );
};

export default TripDetailScreen;
