import React, { useState, useEffect, FC } from 'react';
import { Text, View, TouchableOpacity, Image } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

import styles from './styles';
import colors from '../../constants/colors';

export interface IPaymentMethodProps {
  paymentMethod: any;
}
const PaymentMethod: FC<IPaymentMethodProps> = ({ paymentMethod }) => {
  const [paymentMethodModalVisible, setPaymentMethodModalVisible] = useState(
    false
  );
  return (
    <View
      style={{
        marginHorizontal: 10,
        marginVertical: 20,
        flex: 1,
        flexDirection: 'row',
      }}
    >
      {paymentMethod ? (
        <TouchableOpacity
          style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-start',
          }}
          onPress={() => setPaymentMethodModalVisible(true)}
        >
          <Text style={{ fontWeight: 'bold', marginRight: 10 }}>
            {paymentMethod.description}
          </Text>
          <Image
            source={paymentMethod.image}
            style={{
              width: paymentMethod.width,
              height: paymentMethod.height,
            }}
            resizeMode="cover"
          />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-start',
          }}
          onPress={() => setPaymentMethodModalVisible(true)}
        >
          <FontAwesome5
            icon="plus-box-outline"
            color={colors.blue.dark}
            size={36}
            style={{ backgroundColor: 'transparent' }}
          />
          <Text>Add Payment Method</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};
export default PaymentMethod;
