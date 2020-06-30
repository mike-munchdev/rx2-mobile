import React, { FC, useState, useContext, useEffect } from 'react';
import styles from './styles';
import gql from 'graphql-tag';
import { useSubscription } from '@apollo/react-hooks';
import { CART_MODIFIED_SUBSCRIPTION } from '../../graphql/queries/customer/customer';
import { FontAwesome } from '@expo/vector-icons';
import IconWithBadge from './IconWithBadge';
import colors from '../../constants/colors';
import { AuthContext, CustomerContext } from '../../config/context';
import { AlertHelper } from '../../utils/alert';

const ShoppingCartIcon: FC = () => {
  const [badgeValue, setBadgeValue] = useState(0);
  const customer = useContext(CustomerContext);

  const { loading, error } = useSubscription(CART_MODIFIED_SUBSCRIPTION, {
    onSubscriptionData: ({ client, subscriptionData }) => {
      console.log('subscription data', subscriptionData.data);
      console.log('customer', customer);
      // console.log('setCustomer', setCustomer);
      // setCustomer(subscriptionData.data.customer);
    },
    fetchPolicy: 'network-only',
  });

  useEffect(() => {
    if (customer) {
      console.log('customer', customer);
      setBadgeValue(customer.cart.length);
    }
  }, [customer]);

  if (error) AlertHelper.show('error', 'Shopping Cart Error', error.message);

  if (badgeValue)
    return (
      <IconWithBadge
        iconName="shopping-cart"
        iconColor={colors.white.normal}
        iconSize={25}
        badgeValue={badgeValue <= 0 ? '' : badgeValue}
        badgeStatus="error"
      />
    );

  return (
    <FontAwesome name="shopping-cart" color={colors.white.normal} size={25} />
  );
};
export default ShoppingCartIcon;
