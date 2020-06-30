import React, { createContext, useState, useEffect } from 'react';
import { ApolloProvider } from '@apollo/react-hooks';
import DropdownAlert from 'react-native-dropdownalert';
import Navigation from './config/Navigation';
import client from './graphql/client';

import { AlertHelper } from './utils/alert';
// import { Modal } from 'react-native';
import { LoadingHelper } from './utils/loading';
import Loading from './components/Loading/LoadingModal';

export default () => {
  const [token, setToken] = useState<string | undefined | null>(null);

  return (
    <ApolloProvider client={client}>
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
