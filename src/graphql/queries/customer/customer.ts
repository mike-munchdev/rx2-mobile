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
      message
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
      message
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
    console.log('customerSignupCompleted: error', error);
    AlertHelper.show('error', 'Error', error.message);
  }
};

export const addRxToCartError = (e: ApolloError) => {
  AlertHelper.show(
    'error',
    'Error',
    'An error occurred adding Rx to cart. Please try again.'
  );
};

export const addRxToCartCompleted = (setLoading: Function) => async ({
  addRxToCart,
}) => {
  setLoading(true);
  setTimeout(() => {
    console.log('timeout');
  }, 5000);
  const { ok, message, error } = addRxToCart;

  if (ok) {
    if (!message) {
      setLoading(false);
      AlertHelper.show(
        'error',
        'Error',
        'No customer found with the given information.'
      );
    } else {
      // add client info to local cache and move to accounts page
      // await signUp(message, navigation);
      setLoading(false);
    }
  } else {
    console.log('addRxToCartCompleted: error', error);
    setLoading(false);
    AlertHelper.show('error', 'Error', error.message);
  }
};
export const removeRxFromCartError = (e: ApolloError) => {
  AlertHelper.show(
    'error',
    'Error',
    'An error occurred removing Rx from cart. Please try again.'
  );
};

export const removeRxFromCartCompleted = async ({ removeRxFromCart }) => {
  const { ok, message, error } = removeRxFromCart;

  if (ok) {
    if (!message) {
      AlertHelper.show(
        'error',
        'Error',
        'No customer found with the given information.'
      );
    } else {
      // add client info to local cache and move to accounts page
      // await signUp(message, navigation);
    }
  } else {
    console.log('removeRxFromCartCompleted: error', error);
    AlertHelper.show('error', 'Error', error.message);
  }
};
