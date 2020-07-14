import React, { useState, useEffect } from 'react';

import { Text, View, StatusBar, TouchableOpacity, Image } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';

import styles from './styles';
import colors from '../../constants/colors';
import { useNavigation } from '@react-navigation/native';

const Splash = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require('../../../assets/logo2.png')}
        style={{
          width: 0,
          height: 0,
        }}
        resizeMode="cover"
      />
    </View>
  );
};
export default Splash;
