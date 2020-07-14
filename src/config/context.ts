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
  customer: {} | null,

  setPharmacyContext: (pharmacy: any) => {},
  pharmacy: {} | null,

  setLocationContext: (location: any) => {},
  location: {} | null,

  setPaymentMethodContext: (paymentMethod: any) => {},
  paymentMethod: {} | null,
});
