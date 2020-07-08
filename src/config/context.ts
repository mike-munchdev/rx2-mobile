import React, { createContext } from 'react';

export const AuthContext = createContext({
  signIn: async (token: string) => {},
  signOut: async () => {},
  signUp: async () => {},
  setIsStarted: async (value: boolean) => {},
  getIsStarted: async () => {
    return false;
  },
  isLoggedIn: async () => {
    return false;
  },
});

export const RxRunrContext = createContext({
  setCustomerContext: (customer: any) => {},
  customer: {},

  setPharmacyContext: (pharmacy: any) => {},
  pharmacy: {},

  setLocationContext: (location: any) => {},
  location: {},

  setPaymentMethodContext: (paymentMethod: any) => {},
  paymentMethod: {},
});
