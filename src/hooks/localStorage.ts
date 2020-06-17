import AsyncStorage from '@react-native-community/async-storage';

export const getLocalStorageItem = async (key: string) => {
  const value = await AsyncStorage.getItem(key);
  return value;
};

export const setLocalStorageItem = async (key: string, value: string) => {
  await AsyncStorage.setItem(key, value);
  return;
};
