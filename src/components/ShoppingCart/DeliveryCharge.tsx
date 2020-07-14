import React, { FC } from 'react';
import { View, Text } from 'react-native';

export interface IDeliveryChargeProps {
  cart: [];
  pharmacy: {};
}

const DeliveryCharge: FC<IDeliveryChargeProps> = ({ cart, pharmacy }) => {
  const itemTotal: string = cart
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
      <Text style={{ flex: 3 }}>Delivery Charge</Text>
      <View
        style={{ flex: 3, justifyContent: 'flex-end', alignItems: 'flex-end' }}
      >
        <Text>{`$${fee}`}</Text>
      </View>
    </View>
  );
};

export default DeliveryCharge;
