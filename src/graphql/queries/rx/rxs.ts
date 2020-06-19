import gql from 'graphql-tag';
import { AlertHelper } from '../../../utils/alert';
import { ApolloError } from 'apollo-client';

const rxStructure = `{
    id
    rxNumber
    numberOfRefillsAllowed
    refills {
        filledDate  
    }
    dosage
    daySupply
    doctor {
        firstName
        middleName
        lastName
        prefix
        suffix
    }
    drug {
        brandName
        labelerName
        genericName
    }
    customerId
    createdAt
  }`;

export const GET_MY_RX_HISTORY = gql`
query GetMyRxHistory {
    getMyRxHistory {
        ok
        rxs ${rxStructure}
        error {
            message
        }

    }
}`;

export const rxError = (e: ApolloError) => {
  AlertHelper.show('error', 'Error', 'An error occurred and has been logged.');
};

export const getMyRxHistoryCompleted = (
  setRxHistory: Function,
  setLoading: Function
) => async ({ getMyRxHistory }) => {
  const { ok, rxs, error } = getMyRxHistory;
  console.log('rxs', rxs);
  if (ok) {
    setRxHistory(rxs);
  } else {
    AlertHelper.show('error', 'Error', error.message);
  }
  setLoading(false);
};
