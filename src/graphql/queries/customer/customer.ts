import gql from 'graphql-tag';
import { ApolloError } from 'apollo-client';
import { AlertHelper } from '../../../utils/alert';

export const customersStructure = `{
    id
    email
    firstName
    middleName
    lastName
    suffix
    phoneNumber
    cart {
      id
      rx {
        id
        rxNumber
        drug {
          id
          brand_name
        }
      }     
      price
      quantity
    }
    addresses {
      streetInfo
      unitInfo
      city
      state
      zipCode
      isDefault
      isDelivery
    }
    paymentMethods {
      id
      stripeId
      isDefault
      isActive
    }
    stripeId
    googleId
    facebookId
    createdAt
    settings {
      searchDistance
    }
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
  mutation UpdateCustomer($input: UpdateCustomerInput!) {
    updateCustomer(input: $input) {
      ok
      customer ${customersStructure}
      error {        
        message
      }
    }
  }
`;

export const UPDATE_CUSTOMER_SETTINGS = gql`
  mutation UpdateCustomerSettings($input: UpdateCustomerSettingsInput!) {
    updateCustomerSettings(input: $input) {
      ok
      customer ${customersStructure}
      error {        
        message
      }
    }
  }
`;

export const CREATE_CUSTOMER = gql`
  mutation CreateCustomer($input: CreateCustomerInput!) {
    createCustomer(input: $input) {
      ok
      customer ${customersStructure}
      error {        
        message
      }
    }
  }
`;

export const CART_MODIFIED_SUBSCRIPTION = gql`
  subscription CartModified {
    cartModified {
      ok
      customer {
        id
        cart {
          id
          rx {
            id
            rxNumber
            drug {
              brand_name
            }
          }
          price
          quantity
        }
      }
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
      customer ${customersStructure}
      error {
        message
      }
    }
  }
`;
export const ADD_RX_TO_CART = gql`
  mutation AddRxToCart($input: AddItemToCartInput!) {
    addRxToCart(input: $input) {
      ok
      customer ${customersStructure}
      error {
        message
      }
    }
  }
`;
export const REMOVE_RX_FROM_CART = gql`
  mutation RemoveRxFromCart($input: RemoveRxFromCartInput!) {
    removeRxFromCart(input: $input) {
      ok
      customer ${customersStructure}
      error {
        message
      }
    }
  }
`;

export const REQUEST_REFILL = gql`
  mutation RequestRefill($input: RequestRefillInput!) {
    requestRefill(input: $input) {
      ok
      customer ${customersStructure}
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
      await signUp(message, navigation);
    }
  } else {
    AlertHelper.show('error', 'Error', error.message);
  }
};

export const addRxToCartError = (setLoading: Function) => (e: ApolloError) => {
  setLoading(false);
  AlertHelper.show(
    'error',
    'Error',
    'An error occurred adding Rx to cart. Please try again.'
  );
};

export const addRxToCartCompleted = (
  setLoading: Function,
  setCustomer: Function
) => async ({ addRxToCart }) => {
  const { ok, customer, error } = addRxToCart;

  if (ok) {
    setLoading(false);
    if (!customer) {
      AlertHelper.show('error', 'Error', 'Error retrieving information.');
    } else {
      setCustomer(customer);
    }
  } else {
    setLoading(false);
    AlertHelper.show('error', 'Error', error.message);
  }
};
export const removeRxFromCartError = (e: ApolloError) => {
  AlertHelper.show('error', 'Error', e.message);
};

export const removeRxFromCartCompleted = (
  setLoading: Function,
  setCustomer: Function
) => async ({ removeRxFromCart }) => {
  const { ok, customer, error } = removeRxFromCart;

  if (ok) {
    if (!customer) {
      AlertHelper.show(
        'error',
        'Error',
        'No customer found with the given information.'
      );
    } else {
      setCustomer(customer);
      setLoading(false);
    }
  } else {
    AlertHelper.show('error', 'Error', error.message);
  }
};

export const requestRefillError = (setLoading: Function) => (
  e: ApolloError
) => {
  AlertHelper.show('error', 'Error', e.message);
};

export const requestRefillCompleted = (
  setLoading: Function,
  setCustomer: Function
) => async ({ requestRefill }) => {
  const { ok, customer, error } = requestRefill;

  if (ok) {
    AlertHelper.show(
      'success',
      'Success!',
      'Your refill was received and will be processed shortly.'
    );
    setLoading(false);
    setTimeout(() => {
      setCustomer(customer);
    }, 5000);
  } else {
    AlertHelper.show('error', 'Error', error.message);
  }
};

export const updateCustomerError = (setLoading: Function) => (
  e: ApolloError
) => {
  setLoading(false);
  AlertHelper.show(
    'error',
    'Error',
    'An error occurred adding Rx to cart. Please try again.'
  );
};

export const updateCustomerCompleted = (
  setLoading: Function,
  setCustomer: Function
) => async ({ updateCustomer }) => {
  const { ok, customer, error } = updateCustomer;

  if (ok) {
    setLoading(false);
    if (!customer) {
      AlertHelper.show('error', 'Error', 'Error retrieving information.');
    } else {
      AlertHelper.show('success', 'Success', 'Information saved.');
      setCustomer(customer);
    }
  } else {
    setLoading(false);
    AlertHelper.show('error', 'Error', error.message);
  }
};

export const updateCustomerSettingsError = (setLoading: Function) => (
  e: ApolloError
) => {
  setLoading(false);
  AlertHelper.show(
    'error',
    'Error',
    'An error occurred adding Rx to cart. Please try again.'
  );
};

export const updateCustomerSettingsCompleted = (
  setLoading: Function,
  setCustomer: Function
) => async ({ updateCustomerSettings }) => {
  const { ok, customer, error } = updateCustomerSettings;

  if (ok) {
    setLoading(false);
    if (!customer) {
      AlertHelper.show('error', 'Error', 'Error retrieving information.');
    } else {
      AlertHelper.show('success', 'Success', 'Information saved.');
      setCustomer(customer);
    }
  } else {
    setLoading(false);
    AlertHelper.show('error', 'Error', error.message);
  }
};
