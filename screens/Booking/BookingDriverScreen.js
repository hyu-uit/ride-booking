import React, { useContext, useEffect, useState } from "react";
import MapView, { Marker, Polyline } from "react-native-maps";
import styled from "styled-components";
import { SafeAreaView } from "react-native-safe-area-context";
import WaitingRiderCard from "../../components/DriverInformationCard/WaitingRiderCard";
import OnTheWayCard from "../../components/DriverInformationCard/OnTheWayCard";
import FinishedTripCard from "../../components/DriverInformationCard/FinishedTripCard";
import ConfirmModal from "../../components/Modal/ConfirmModal";
import DriverInformationModal from "../../components/Modal/DriverInformationModal";
import { VStack } from "native-base";
import { COLORS } from "../../constants";
import { BookingContext } from "../../context/BookingContext";
import { LocationAccuracy, watchPositionAsync } from "expo-location";
import { useRef } from "react";
import { requestLocationPermissions } from "../../helper/location";
import {
  collection,
  doc,
  increment,
  onSnapshot,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../../config/config";
import { getFromAsyncStorage } from "../../helper/asyncStorage";

const BookingDriverScreen = ({ navigation, route }) => {
  const [step, setStep] = useState(1);
  const [isModalCancelShow, setIsModalCancelShow] = useState(false);
  const [isModalInfoShow, setIsModalInfoShow] = useState(false);
  const { booking } = useContext(BookingContext);
  const [marker, setMarker] = useState({ longitude: 0, latitude: 0 });
  const mapRef = useRef(null);
  const { idRider, idTrip } = route.params;
  const [phoneNumber, setPhoneNumber] = useState([]);
  const [tripDetail, setTripDetailDone] = useState([]);

  useEffect(() => {
    try {
      getFromAsyncStorage("phoneNumber").then((phoneNumberValue) => {
        setPhoneNumber(phoneNumberValue);
      });
    } catch (err) {
      console.log(err);
    }
    onFinishTrip();
  }, [phoneNumber]);
  console.log(idTrip);
  useEffect(() => {
    // Request permission to access the device's location
    (async () => {
      let isAllowed = await requestLocationPermissions();

      if (!isAllowed) return;

      // Subscribe to location updates
      let locationSubscriber = await watchPositionAsync(
        {
          accuracy: LocationAccuracy.BestForNavigation,
          timeInterval: 1000, // Update every 2 seconds
          distanceInterval: 10, // Update every 10 meters
        },
        ({ coords: { latitude, longitude } }) => {
          console.log(
            "🚀 ~ file: BookingDriverScreen.js:49 ~ newLocation:",
            latitude,
            longitude
          );
          setMarker({ latitude, longitude });
        }
      );

      return () => {
        // Cleanup: unsubscribe from location updates
        if (locationSubscriber) {
          locationSubscriber.remove();
        }
      };
    })();
  }, [idRider]);

  const handleStep1Button = () => {
    updateDoc(doc(db, "ListTrip", idTrip), {
      status: "canceled",
    });
    updateDoc(doc(db, "Customer", phoneNumber), {
      cancel: increment(1),
    });
    navigation.navigate("Home");
    // Do any necessary form validation or error checking here
    // setStep(2);
  };

  const onFinishTrip = () => {
    // const finishTripQuery = query(
    //   collection(db, "ListTrip"),
    //   where("isScheduled", "==", "false"),
    //   where("status", "in", ["done","canceled"]),
    //   where("idCustomer", "==", phoneNumber)
    // );

    const unsubscribeTrip = onSnapshot(
      doc(db, "ListTrip", idTrip),
      (querySnapshot) => {
        const updatedTrip = [];
        const docData = querySnapshot.data();
        const trip = {
          idTrip: docData.id,
          ...docData,
        };
        updatedTrip.push(trip);
        setTripDetailDone(updatedTrip);
        if (
          updatedTrip[0].status == "done" ||
          updatedTrip[0].status == "canceled"
        ) {
          setStep(2);
        }
      }
    );
    return () => {
      unsubscribeTrip();
    };
  };

  const handleShowModalCancel = () => {
    setIsModalCancelShow((prev) => !prev);
  };

  const handleShowModalInfo = () => {
    setIsModalInfoShow((prev) => !prev);
  };

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <>
            <MapView
              ref={mapRef}
              style={{ height: "50%", borderRadius: 10 }}
              provider="google"
              region={booking.region}
            >
              <Marker
                key={"current-location"}
                coordinate={marker}
                title={"Current location"}
              ></Marker>
              <Marker
                key={"destination"}
                coordinate={booking.destinationLocation}
                title={"Destination"}
                description={
                  booking.destinationLocation.address
                    ? booking.destinationLocation.address
                    : null
                }
              />
              {booking.routing ? (
                <Polyline
                  coordinates={booking.routing}
                  strokeWidth={5}
                  strokeColor="blue"
                />
              ) : null}
            </MapView>
            <OnTheWayCard
              idRider={idRider}
              onPressCancel={handleStep1Button}
              onPressInfo={handleShowModalInfo}
            />
          </>
        );
      case 2:
        return (
          <>
            <MapView
              ref={mapRef}
              style={{ height: "50%", borderRadius: 10 }}
              provider="google"
              region={booking.region}
            >
              <Marker
                key={"pickUp"}
                coordinate={booking.pickUpLocation}
                title={"Pick up"}
                description={
                  booking.pickUpLocation.address
                    ? booking.pickUpLocation.address
                    : null
                }
              ></Marker>
              <Marker
                key={"destination"}
                coordinate={booking.destinationLocation}
                title={"Destination"}
                description={
                  booking.destinationLocation.address
                    ? booking.destinationLocation.address
                    : null
                }
              />
              {booking.routing ? (
                <Polyline
                  coordinates={booking.routing}
                  strokeWidth={5}
                  strokeColor="blue"
                />
              ) : null}
            </MapView>
            <FinishedTripCard
              idRider={idRider}
              onClickRate={() => {
                const data = { idRider: idRider };
                navigation.navigate("BookingRating", data);
              }}
              onPressInfo={handleShowModalInfo}
            />
          </>
        );

      default:
        return null;
    }
  };

  return (
    <VStack h={"100%"} w={"100%"} bgColor={COLORS.background}>
      <BookingContainer>
        {renderStepContent()}
        <ConfirmModal
          isShow={isModalCancelShow}
          title={"Cancel booking"}
          content={"Are you sure that you want to cancel this booking?"}
          onClose={handleShowModalCancel}
          onPressOK={handleShowModalCancel}
        />
        <DriverInformationModal
          isShow={isModalInfoShow}
          onClose={handleShowModalInfo}
        />
      </BookingContainer>
    </VStack>
  );
};

const BookingContainer = styled(SafeAreaView)`
  width: 100%;
  height: 100%;
  background-color: ${(props) => props.bgColor};
  display: flex;
  padding: 0;
  flex-direction: column;
`;

export default BookingDriverScreen;
