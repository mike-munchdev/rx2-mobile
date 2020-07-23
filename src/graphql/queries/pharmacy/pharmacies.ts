import gql from 'graphql-tag';
import { ApolloError } from 'apollo-client';
import { AlertHelper } from '../../../utils/alert';
import { sortByFieldName } from '../../../utils/sort';
const pharmacyHoursObj = `{
    id
    day
    isClosed
    hoursStart
    hoursEnd        
}`;
const pharmacyObj = `{
      id
      name
      address {
          id
          streetInfo
          unitInfo
          city
          state
          zipCode
      }
      location {
          coordinates
          type          
      }
      distance
      website
      phoneNumber
      distance
      thumbnailUrl
      imgUrl
      is24Hour
      canPickup
      canDeliver
      deliveryFee
      deliveryFeeType
      timeZone
      hours ${pharmacyHoursObj}

}`;

const errorObj = `{    
    message
}`;

export const CREATE_PHARMACY = gql`
    mutation CreatePharmacy($input: CreatePharmacyInput!) {
        createNewPharmacy(input: $input) {
            ok
            pharmacy ${pharmacyObj}
            error ${errorObj}
        }
    }
    `;
export const GET_PHARMACIES_NEAR_LOCATION = gql`
  query GetPharmaciesNearLocation($input: LocationInput!) {
    getPharmaciesNearLocation(
      input: $input
    ) {
      ok
      pharmacies ${pharmacyObj}
      error ${errorObj}
    }
  }
`;
export const UPDATE_ONE_PHARMACY = gql`
    mutation UpdateOnePharmacy($input: UpdatePharmacyInput!) {
        updateOnePharmacy(input: $input) {
            ok
            pharmacy ${pharmacyObj}
            error ${errorObj}
        }
    }
    `;

export const pharmacyError = (e: ApolloError) => {
  AlertHelper.show('error', 'Error', 'An error occurred and has been logged.');
};

export const getPharmaciesNearLocationCompleted = (
  setPharmacies: Function,
  setLoading: Function
) => async ({ getPharmaciesNearLocation }) => {
  const { ok, pharmacies, error } = getPharmaciesNearLocation;

  if (ok) {
    const pharmacyList = sortByFieldName(pharmacies, 'distance', 'asc');
    setPharmacies(pharmacyList);
    setLoading(false);
  } else {
    setLoading(false);
    AlertHelper.show('error', 'Error', error.message);
  }
};
