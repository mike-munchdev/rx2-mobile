import React, { createContext, useState, useEffect } from 'react';
import { ApolloProvider } from '@apollo/react-hooks';
import DropdownAlert from 'react-native-dropdownalert';
import Navigation from './config/Navigation';
import setup from './graphql/setup';
import { ToastContext } from './utils/toast';
import AsyncStorage from '@react-native-community/async-storage';
import { AlertHelper } from './utils/alert';

export default () => {
  const [token, setToken] = useState<string | undefined | null>(null);

  useEffect(() => {
    async () => {
      const token = await AsyncStorage.getItem('token');
      setToken(token);
    };
  }, []);

  return (
    <ApolloProvider client={setup(String(token))}>
      <Navigation />
      <DropdownAlert        
        ref={(ref: DropdownAlert) => {
          AlertHelper.setDropDown(ref);
        }}
        onClose={() => AlertHelper.invokeOnClose()}
      />
    </ApolloProvider>
  );
};
