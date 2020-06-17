import { useQuery, useApolloClient } from '@apollo/react-hooks';
import jwt from 'expo-jwt';
import Constants from 'expo-constants';
import AsyncStorage from '@react-native-community/async-storage';
import { useNavigation } from '@react-navigation/native';
import { NODE_ENV } from './serverInfo';

export const useGetStarted = async () => {
  const getStarted = await AsyncStorage.getItem('getStarted');
  return getStarted;
};
export const useLoggedIn = async () => {
  const isLoggedIn = await AsyncStorage.getItem('isLoggedIn');
  return isLoggedIn;
};

export const useToken = async () => {
  const token = await AsyncStorage.getItem('token');
  return token;
};

export const useCustomerInfo = async () => {
  const isLoggedIn = await useLoggedIn();

  const token = await useToken();

  if (!isLoggedIn) return null;

  const decoded = jwt.decode(
    token,
    Constants.manifest.extra.rxrunr[String(NODE_ENV)].jwtSecret
  );

  const decodedCustomer = (decoded as any).info;

  return decodedCustomer;
};

export const useLogout = () => {
  const navigation = useNavigation();
  return async () => {
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('isLoggedIn');
    navigation.reset({
      index: 0,
      routes: [{ name: 'SignIn' }],
    });
  };
};
