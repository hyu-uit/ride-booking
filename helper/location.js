import * as Location from "expo-location";

export const fetchCurrentUserLocation = async () => {
  const { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== "granted") {
    console.error("Location permission not granted");
    return;
  }

  const location = await Location.getCurrentPositionAsync({
    accuracy: Location.Accuracy.Highest,
    maximumAge: 10000,
  });
  console.log(
    "🚀 ~ file: location.js:11 ~ fetchCurrentUserLocation ~ location:",
    location
  );

  return location.coords;

  // Use the latitude and longitude values as needed
};
