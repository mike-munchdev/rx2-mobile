import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';

const NewRx = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={{ backgroundColor: 'white', padding: 20 }}
        onPress={() => navigation.pop()}
      >
        <Text>Coming Soon</Text>
      </TouchableOpacity>
    </View>
  );
};
export default NewRx;
