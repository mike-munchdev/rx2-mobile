import gql from 'graphql-tag';
import { useContext } from 'react';

import { ApolloError } from 'apollo-client';
import { AuthContext } from '../../config/context';
import DropdownAlert from 'react-native-dropdownalert';
import { AlertHelper } from '../../utils/alert';

export const GET_CUSTOMER_TOKEN_BY_EMAIL_AND_PASSWORD = gql`
  query GetCustomerTokenByEmailAndPassword(
    $email: String!
    $password: String!
  ) {
    getCustomerTokenByEmailAndPassword(email: $email, password: $password) {
      ok
      token
      error {
        message
      }
    }
  }
`;

export const getCustomerTokenByEmailAndPasswordError = (e: ApolloError) => {
  AlertHelper.show(
    'error',
    'Error',
    'An error occurred retrieving customer information. Please try again.'
  );
};

export const getCustomerTokenByEmailAndPasswordCompleted = (
  signIn: (token: string) => void
) => async ({ getCustomerTokenByEmailAndPassword }) => {
  const { ok, token, error } = getCustomerTokenByEmailAndPassword;
  if (ok) {
    if (!token) {
      AlertHelper.show(
        'error',
        'Error',
        'No customer found with the given information.'
      );
    } else {
      // add client info to local cache and move to accounts page
      await signIn(token);
    }
  } else {
    AlertHelper.show('error', 'Error', error.message);
  }
};