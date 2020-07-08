import React, { useState, useEffect, Fragment, useContext } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';

import styles from './styles';
import { useNavigation } from '@react-navigation/native';
import {
  ShoppingCartList,
  ItemsTotal,
  DeliveryCharge,
  OrderTotal,
} from '../../components/ShoppingCart';
import { ShoppingCartHeader } from '../../components/Headers';
import { RxRunrContext } from '../../config/context';
import { HorizontalRule } from '../../components/HorizontalRule';
import colors from '../../constants/colors';
import EmptyCart from '../../components/ShoppingCart/EmptyCart';

const ShoppingCart = () => {
  const navigation = useNavigation();
  const { customer, pharmacy, location, paymentMethod } = useContext(
    RxRunrContext
  );

  if (!customer.cart || customer.cart.length === 0) navigation.pop();

  return (
    <Fragment>
      <ShoppingCartHeader title="Cart" />
      <View style={styles.container}>
        <ShoppingCartList
          customer={customer}
          pharmacy={pharmacy}
          location={location}
        />
        <HorizontalRule styles={{ marginHorizontal: 10 }} />
        <View style={styles.orderInfoView}>
          <ItemsTotal cart={customer.cart} />
          <DeliveryCharge cart={customer.cart} pharmacy={pharmacy} />
          <OrderTotal cart={customer.cart} pharmacy={pharmacy} />
        </View>
        <View
          style={{
            position: 'absolute',
            left: 10,
            right: 10,
            justifyContent: 'center',

            bottom: 20,
          }}
        >
          <TouchableOpacity
            style={{
              backgroundColor: colors.blue.dark,
              height: 50,
              justifyContent: 'center',
              alignItems: 'center',
              // // flex: 1,
              // flexDirection: 'row',
            }}
          >
            <Text
              style={{
                color: colors.white.normal,
                fontWeight: 'bold',
                fontSize: 18,
              }}
            >
              Request Refill
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Fragment>
  );
};
export default ShoppingCart;
