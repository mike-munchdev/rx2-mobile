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
import { ButtonGroup } from 'react-native-elements';
import { useMutation } from '@apollo/react-hooks';
import {
  REQUEST_REFILL,
  requestRefillError,
  requestRefillCompleted,
} from '../../graphql/queries/customer/customer';

const ShoppingCart = () => {
  const [deliveryMethodIndex, setDeliveryMethodIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const buttons = ['Pickup', 'Delivery'];

  const navigation = useNavigation();
  const {
    customer,
    pharmacy,
    location,
    paymentMethod,
    setCustomerContext,
  } = useContext(RxRunrContext);

  const [requestRefill] = useMutation(REQUEST_REFILL, {
    fetchPolicy: 'no-cache',
    onError: requestRefillError(setIsLoading),
    onCompleted: requestRefillCompleted(setIsLoading, setCustomerContext),
  });

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

        <ButtonGroup
          onPress={(selectedIndex) => setDeliveryMethodIndex(selectedIndex)}
          selectedIndex={deliveryMethodIndex}
          buttons={buttons}
          containerStyle={{ height: 50 }}
          selectedButtonStyle={{ backgroundColor: colors.blue.dark }}
        />
        <HorizontalRule styles={{ marginHorizontal: 10 }} />
        <View style={styles.orderInfoView}>
          {/* <ItemsTotal cart={customer.cart} />
          <DeliveryCharge cart={customer.cart} pharmacy={pharmacy} />
          <OrderTotal cart={customer.cart} pharmacy={pharmacy} /> */}
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
            }}
            onPress={async () => {
              const result = await requestRefill({
                variables: {
                  input: {
                    customerId: customer.id,
                    isDelivery: deliveryMethodIndex === 1,
                  },
                },
              });
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
