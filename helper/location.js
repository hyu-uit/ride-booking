import * as Location from "expo-location";
import { Dimensions } from "react-native";

export const requestLocationPermissions = async () => {
  const { status } = await Location.requestForegroundPermissionsAsync();
  console.log(
    "🚀 ~ file: location.js:6 ~ requestLocationPermissions ~ status:",
    status
  );

  if (status !== "granted") {
    console.error("Location permission not granted");
    return false;
  }
  return true;
};

export const fetchCurrentUserLocation = async () => {
  const isPermissionsGranted = await requestLocationPermissions();

  if (!isPermissionsGranted) return;
  const location = await Location.getCurrentPositionAsync({
    accuracy: Location.Accuracy.Highest,
  });
  console.log(
    "🚀 ~ file: location.js:11 ~ fetchCurrentUserLocation ~ location:",
    location
  );

  return location.coords;

  // Use the latitude and longitude values as needed
};

export const centerMapToCoordinates = (
  mapRef,
  pickUpCoords,
  destinationCoords
) => {
  const coordinates = [
    {
      latitude: pickUpCoords.latitude,
      longitude: pickUpCoords.longitude,
    },
    {
      latitude: destinationCoords.latitude,
      longitude: destinationCoords.longitude,
    },
  ];
  mapRef.current.fitToCoordinates(coordinates, {
    edgePadding: { top: 50, right: 50, bottom: 100, left: 50 },
    animated: true,
  });
};

export const animateToCoordinate = (mapRef, latitude, longitude) => {
  const coordinate = {
    latitude,
    longitude,
  };
  mapRef.current.animateToRegion(
    {
      latitude,
      longitude,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    },
    1000 // Duration of the animation in milliseconds
  );
};

export const calculateMapDelta = (marker1, marker2, paddingPercentage) => {
  const { latitude: lat1, longitude: lon1 } = marker1;
  const { latitude: lat2, longitude: lon2 } = marker2;

  // Calculate the absolute differences between latitudes and longitudes
  const latDelta = Math.abs(lat1 - lat2);
  const lonDelta = Math.abs(lon1 - lon2);

  // Calculate padding based on percentage
  const padding = Math.max(latDelta, lonDelta) * (paddingPercentage / 100);

  // Calculate latitudeDelta and longitudeDelta
  const { width, height } = Dimensions.get("window");
  const aspectRatio = width / height;
  const latitudeDelta = latDelta + padding;
  const longitudeDelta = lonDelta + padding * aspectRatio;

  return { latitudeDelta, longitudeDelta };
};
