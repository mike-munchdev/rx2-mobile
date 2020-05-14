import React, { useState, useEffect, useLayoutEffect } from 'react';
import PropTypes from 'prop-types';
import { Text, View } from 'react-native';
import { FontAwesome, Feather } from '@expo/vector-icons';

import styles from './styles';
import { useNavigation } from '@react-navigation/native';

const Pharmacies = () => {
  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
      
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text>{'Pharmacies'}</Text>
    </View>
  );
};
export default Pharmacies;
