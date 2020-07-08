import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';

import styles from './styles';
import { useNavigation } from '@react-navigation/native';

const SelectPharmacy = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={{ backgroundColor: 'white', padding: 20 }}
        onPress={() => navigation.pop()}
      >
        <Text>SelectPharmacy</Text>
      </TouchableOpacity>
    </View>
  );
};
export default SelectPharmacy;
