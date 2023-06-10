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
