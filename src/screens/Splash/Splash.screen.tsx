import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Text, View, StatusBar, TouchableOpacity } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';

import styles from './styles';
import colors from '../../constants/colors';
import { useNavigation } from '@react-navigation/native';
import { useLoggedIn } from '../../hooks/customerInfo';



const Splash = () => {
 
  return (
    <View style={styles.container}>
     <Text>Splash</Text>
    </View>
  );
};
export default Splash;
