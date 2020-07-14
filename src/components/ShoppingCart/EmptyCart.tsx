import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';

import styles from './styles';
import { useNavigation } from '@react-navigation/native';
import colors from '../../constants/colors';

const EmptyCart = () => {
  const navigation = useNavigation();
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Text
        style={{ fontSize: 18, fontWeight: 'bold', color: colors.blue.dark }}
      >
        Your Cart Is Empty
      </Text>
      <TouchableOpacity
        style={{ backgroundColor: 'white', padding: 20, marginTop: 10 }}
        onPress={() => navigation.pop()}
      >
        <Text>Close</Text>
      </TouchableOpacity>
    </View>
  );
};
export default EmptyCart;
