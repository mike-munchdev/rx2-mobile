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

  if (!isLoggedIn) return null;

  const customerInfo = await AsyncStorage.getItem('customerInfo');
  const customer = JSON.parse(customerInfo || '');
  return customer;
};

export const useLogout = () => {
  const navigation = useNavigation();
  return async () => {
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('isLoggedIn');
    await AsyncStorage.removeItem('customerInfo');
    navigation.reset({
      index: 0,
      routes: [{ name: 'SignIn' }],
    });
  };
};
