import React, { useState, useEffect, FC } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';

import styles from './styles';
import { useNavigation, useRoute } from '@react-navigation/native';
import colors from '../../constants/colors';

const Modal: FC = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { text, handleClose } = route.params;
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={{ backgroundColor: 'white', padding: 20, marginTop: 10 }}
        onPress={handleClose}
      >
        <Text>{text}</Text>
      </TouchableOpacity>
    </View>
  );
};
export default Modal;
