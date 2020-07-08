import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';

import styles from './styles';
import { useNavigation } from '@react-navigation/native';

const NewRx = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={{ backgroundColor: 'white', padding: 20 }}
        onPress={() => navigation.pop()}
      >
        <Text>NewRx</Text>
      </TouchableOpacity>
    </View>
  );
};
export default NewRx;
