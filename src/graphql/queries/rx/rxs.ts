import gql from 'graphql-tag';
import { AlertHelper } from '../../../utils/alert';
import { ApolloError } from 'apollo-client';
import { sortByFieldName } from '../../../utils/sort';

const rxStructure = `{
    id
    rxNumber
    numberOfRefillsAllowed
    dosage
    daySupply
    filledDate
    refills {
      id
      filledDate
    }
    drug {
      brand_name
    }
    customer {
      firstName
      lastName
    }
    doctor {
      firstName
      middleName
      lastName
    }
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
  console.log('rxError: error', e);
  AlertHelper.show('error', 'Error', 'An error occurred and has been logged.');
};

export const getMyRxHistoryCompleted = (
  setRxHistory: Function,
  setLoading: Function
) => async ({ getMyRxHistory }) => {
  const { ok, rxs, error } = getMyRxHistory;

  if (ok) {
    const rxList = rxs.map((r: any) => {
      r.refills = sortByFieldName(r.refills, 'filledDate', 'asc');
      return r;
    });

    setRxHistory(rxList);
  } else {
    console.log('getMyRxHistoryCompleted: error', error);
    AlertHelper.show('error', 'Error', error.message);
  }
  setLoading(false);
};
