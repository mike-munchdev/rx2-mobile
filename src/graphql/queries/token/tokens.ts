import gql from 'graphql-tag';
import { ApolloError } from 'apollo-client';
import { AlertHelper } from '../../../utils/alert';
import { customersStructure } from '../customer/customer';

export const GET_CUSTOMER_TOKEN_BY_EMAIL_AND_PASSWORD = gql`
  query GetCustomerTokenByEmailAndPassword(
    $email: String!
    $password: String!
  ) {
    getCustomerTokenByEmailAndPassword(email: $email, password: $password) {
      ok
      token
      customer ${customersStructure}
      
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
  signIn: (token: string, customer: any) => void
) => async ({ getCustomerTokenByEmailAndPassword }) => {
  const { ok, token, customer, error } = getCustomerTokenByEmailAndPassword;
  if (ok) {
    if (!token) {
      AlertHelper.show(
        'error',
        'Error',
        'No customer found with the given information.'
      );
    } else {
      await signIn(token, customer);
    }
  } else {
    AlertHelper.show('error', 'Error', error.message);
  }
};
