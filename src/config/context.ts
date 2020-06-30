import React, { createContext } from 'react';

export const AuthContext = createContext({
  signIn: async (token: string) => {},
  signOut: async () => {},
  signUp: async () => {},
  getStarted: async () => {},
});

export const CustomerContext = createContext({
  setCustomer: (customer: any) => {},
  customer: {},
});
