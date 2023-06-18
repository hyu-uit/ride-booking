import * as Location from "expo-location";

export const requestLocationPermissions = async () => {
  const { status } = await Location.requestForegroundPermissionsAsync();
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
    accuracy: Location.Accuracy.BestForNavigation,
    timeInterval: 10000,
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
