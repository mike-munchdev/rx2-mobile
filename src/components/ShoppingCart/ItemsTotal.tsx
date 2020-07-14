import React, { useContext, FC } from 'react';
import { View, Text } from 'react-native';
import { RxRunrContext } from '../../config/context';

export interface IItemsTotalProps {
  cart: [];
}

const ItemTotals: FC<IItemsTotalProps> = ({ cart }) => {
  return (
    <View
      style={{
        marginHorizontal: 10,
        marginVertical: 10,
        // flex: 1,
        flexDirection: 'row',
      }}
    >
      <Text style={{ flex: 3 }}>Item Total</Text>
      <View
        style={{ flex: 3, justifyContent: 'flex-end', alignItems: 'flex-end' }}
      >
        <Text>
          {`$${cart
            .reduce((accumlulator: number, item: any) => {
              return accumlulator + item.price;
            }, 0)
            .toFixed(2)}`}
        </Text>
      </View>
    </View>
  );
};

export default ItemTotals;
