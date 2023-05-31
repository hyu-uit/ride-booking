import AsyncStorage from "@react-native-async-storage/async-storage";

// Saving data
export const saveToAsyncStorage = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.log(error);
  }
};

// Retrieving data
export const getFromAsyncStorage = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    return JSON.parse(value);
  } catch (error) {
    console.log(error);
  }
};
