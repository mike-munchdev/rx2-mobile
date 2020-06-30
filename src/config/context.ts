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

export const CustomerContext = createContext({
  setCustomer: (customer: any) => {},
  customer: {},
});
