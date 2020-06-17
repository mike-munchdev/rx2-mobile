import gql from 'graphql-tag';
import { useContext } from 'react';
import DropdownAlert from 'react-native-dropdownalert';
import { ApolloError } from 'apollo-client';
import { AlertHelper } from '../../utils/alert';

const customersStructure = `{
    id
    firstName
    middleInit
    lastName
    email
    code
    ssn
    phoneNumber
    address
    address2
    addressType
    addressUnit
    addressNumber
    addressType
    addressPostDirection
    addressPreDirection
    addressStreet
    city
    state
    zipCode
    accountCount
    accountNumber
    routingNumber
  }`;

export const GET_CUSTOMER_BY_ID = gql`
  query GetCustomerById($customerId: String!) {
    getCustomerById(customerId: $customerId) {
      ok
      customer ${customersStructure}
      error {        
        message
      }
    }
  }
`;

export const UPDATE_CUSTOMER = gql`
  mutation UpdateCustomer($input: UpdateCustomerInput) {
    updateCustomer(input: $input) {
      ok
      customer ${customersStructure}
      error {        
        message
      }
    }
  }
`;

export const CREATE_CUSTOMER = gql`
  mutation CreateCustomer($input: CreateCustomerInput) {
    createCustomer(input: $input) {
      ok
      customer ${customersStructure}
      error {        
        message
      }
    }
  }
`;

export const CUSTOMER_SIGNUP = gql`
  mutation CustomerSignup($input: CustomerSignupInput!) {
    customerSignup(input: $input) {
      ok
      message
      error {
        message
      }
    }
  }
`;

export const customerSignupError = (e: ApolloError) => {
  AlertHelper.show(
    'error',
    'Error',
    'An error occurred during signup. Please try again.'
  );
};

export const customerSignupCompleted = (
  signUp: Function,
  navigation: any
) => async ({ customerSignup }) => {
  const { ok, message, error } = customerSignup;

  if (ok) {
    if (!message) {
      AlertHelper.show(
        'error',
        'Error',
        'No customer found with the given information.'
      );
    } else {
      // add client info to local cache and move to accounts page
      await signUp(message, navigation);
    }
  } else {
    AlertHelper.show('error', 'Error', error.message);
  }
};
