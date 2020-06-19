import React, { createContext, useState, useEffect } from 'react';
import { ApolloProvider } from '@apollo/react-hooks';
import DropdownAlert from 'react-native-dropdownalert';
import Navigation from './config/Navigation';
import client from './graphql/setup';

import { AlertHelper } from './utils/alert';
// import { Modal } from 'react-native';
// import { ModalHelper } from './utils/modal';

export default () => {
  const [token, setToken] = useState<string | undefined | null>(null);

  return (
    <ApolloProvider client={client}>
      <Navigation />
      {/* <Modal visible={LoadingHelper.isVisible}>
        <FontAwesome name="loading" />
        {LoadingHelper.message ? <Text>{LoadingHelper.message}</Text> : null}
  </Modal> */}
      <DropdownAlert
        ref={(ref: DropdownAlert) => {
          AlertHelper.setDropDown(ref);
        }}
        onClose={() => AlertHelper.invokeOnClose()}
      />
    </ApolloProvider>
  );
};
