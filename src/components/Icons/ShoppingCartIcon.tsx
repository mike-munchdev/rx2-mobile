import React, { FC, useState, useContext, useEffect } from 'react';
import styles from './styles';
import gql from 'graphql-tag';
import { useSubscription } from '@apollo/react-hooks';
import { CART_MODIFIED_SUBSCRIPTION } from '../../graphql/queries/customer/customer';
import { FontAwesome } from '@expo/vector-icons';
import IconWithBadge from './IconWithBadge';
import colors from '../../constants/colors';
import { AuthContext, RxRunrContext } from '../../config/context';
import { AlertHelper } from '../../utils/alert';

const ShoppingCartIcon: FC = () => {
  const { customer } = useContext(RxRunrContext);

  if (customer.cart) {
    return (
      <IconWithBadge
        iconName="shopping-cart"
        iconColor={colors.white.normal}
        iconSize={25}
        badgeValue={customer.cart.length}
        badgeStatus="error"
      />
    );
  }

  return (
    <FontAwesome name="shopping-cart" color={colors.white.normal} size={25} />
  );
};
export default ShoppingCartIcon;
