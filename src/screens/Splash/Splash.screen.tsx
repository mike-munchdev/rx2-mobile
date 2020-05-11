import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Text, View, StatusBar, TouchableOpacity } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';

import styles from './styles';
import colors from '../../constants/colors';
import { useNavigation } from '@react-navigation/native';



const Splash = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.header}>
        <Animatable.Image
          animation="bounceIn"
          source={require('../../../assets/logo2.png')}
          style={styles.logo}
          resizeMode="stretch"
        />
      </View>
      <Animatable.View animation="fadeInUpBig" style={styles.footer}>
        <Text style={styles.title}>Get your Rx delivered to your door!</Text>
        <Text style={styles.subTitle}>Sign in with account</Text>
        <TouchableOpacity onPress={() => navigation.navigate("SignIn")}>
          <View style={styles.button}>
            <LinearGradient
              colors={colors.blue.buttonGradient}
              style={styles.signIn}
            >
              <Text style={styles.textSign}>Get Started</Text>
              <MaterialIcons
                name="navigate-next"
                size={20}
                color={colors.white.normal}
              />
            </LinearGradient>
          </View>
        </TouchableOpacity>
      </Animatable.View>
    </View>
  );
};
export default Splash;
