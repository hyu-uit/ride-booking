import * as Location from "expo-location";
import { Platform } from "react-native";
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

function delay(timeInMilliseconds) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(null), timeInMilliseconds);
  });
}

export async function getLocation() {
  const ANDROID_DELAY_IN_MS = 4 * 1000; // 👈 4s
  const IOS_DELAY_IN_MS = 10 * 1000; // 👈 15s

  const DELAY_IN_MS =
    Platform.OS === "ios" ? IOS_DELAY_IN_MS : ANDROID_DELAY_IN_MS;

  const MAX_TRIES = 999;
  let tries = 1;

  let location = null;

  let locationError = null;

  do {
    try {
      location = await Promise.race([
        delay(DELAY_IN_MS),
        Location.getCurrentPositionAsync({
          accuracy: Location.LocationAccuracy.Lowest,
        }),
      ]);

      if (!location) {
        throw new Error("Timeout");
      }
    } catch (err) {
      locationError = err;
    } finally {
      tries += 1; // 👈 Here
    }
  } while (!location && tries <= MAX_TRIES);

  if (!location) {
    const error = locationError;
    throw error;
  }

  return location.coords;
}

export const checkUserLocationEnable = () => {
  return Location.hasServicesEnabledAsync();
};

export const fetchCurrentUserLocation = async () => {
  const isPermissionsGranted = await requestLocationPermissions();

  if (!isPermissionsGranted) return null;

  const location = await Location.getLastKnownPositionAsync();
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
