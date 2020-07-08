import React, { FC } from 'react';
import { View, Text } from 'react-native';

export interface IOrderTotalProps {
  cart: [];
  pharmacy: {};
}

const OrderTotal: FC<IOrderTotalProps> = ({ cart, pharmacy }) => {
  const itemTotal = cart
    .reduce((accumlulator, item) => {
      return accumlulator + item.price;
    }, 0)
    .toFixed(2);
  const two = 5;
  const fee = cart.length > 0 ? two.toFixed(2) : 0;

  // const fee =
  //   pharmacy.deliveryFeeType === 'percent'
  //     ? (itemTotal * pharmacy.deliveryFee).toFixed(2)
  //     : pharmacy.deliveryFee.toFixed(2);

  return (
    <View
      style={{
        marginHorizontal: 10,
        marginVertical: 10,
        // flex: 1,
        flexDirection: 'row',
      }}
    >
      <Text style={{ flex: 3, fontSize: 18, fontWeight: 'bold' }}>Total</Text>
      <View
        style={{ flex: 3, justifyContent: 'flex-end', alignItems: 'flex-end' }}
      >
        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{`$${(
          Number(fee) + Number(itemTotal)
        ).toFixed(2)}`}</Text>
      </View>
    </View>
  );
};

export default OrderTotal;
