import React from 'react';

export const AuthContext = React.createContext({
  signIn: async (token: string) => {},
  signOut: async () => {},
  signUp: async () => {},
  getStarted: async () => {},
});
