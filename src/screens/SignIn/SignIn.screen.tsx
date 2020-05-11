import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Text, View, TextInput, TouchableOpacity } from 'react-native';
import { FontAwesome, Feather } from '@expo/vector-icons';
import styles from './styles';
import colors from '../../constants/colors';
import * as Animatable from 'react-native-animatable';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';

const SignIn = () => {
  const [checkTextInputChange, setCheckTextInputChange] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const navigation = useNavigation();
  const textInputChange = (value: string) => {
    setCheckTextInputChange(value.length !== 0);
    setEmail(value);
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Animatable.Image
          animation="bounceIn"
          source={require('../../../assets/logo2.png')}
          style={styles.logo}
          resizeMode="stretch"
        />
      </View>
      <Animatable.View animation="fadeInUpBig" style={styles.footer}>
        <Text style={styles.textFooter}>E-MAIL</Text>
        <View style={styles.action}>
          <FontAwesome name="user-o" color={colors.blue.dark} size={20} />
          <TextInput
            placeholder="Your email..."
            style={styles.textInput}
            onChangeText={(text) => textInputChange(text)}
            value={email}
          />
          {checkTextInputChange ? (
            <Animatable.View animation="bounceIn">
              <Feather
                name="check-circle"
                color={colors.green.normal}
                size={20}
              />
            </Animatable.View>
          ) : null}
        </View>
        <Text style={[styles.textFooter, { marginTop: 35 }]}>PASSWORD</Text>
        <View style={styles.action}>
          <Feather name="lock" color={colors.blue.dark} size={20} />
          <TextInput
            secureTextEntry={secureTextEntry}
            placeholder="Your password..."
            style={styles.textInput}
            value={password}
            onChangeText={(text) => setPassword(text)}
          />
          <TouchableOpacity
            onPress={() => setSecureTextEntry(!secureTextEntry)}
          >
            <Feather
              name={`${secureTextEntry ? 'eye-off' : 'eye'}`}
              color={`${
                secureTextEntry ? colors.gray.normal : colors.green.normal
              }`}
              size={20}
            />
          </TouchableOpacity>
        </View>
        <Text style={styles.forgotText}>Forgot password?</Text>
        <View style={styles.buttons}>
          <TouchableOpacity onPress={() => navigation.navigate('Rx')} style={styles.button}>
            <LinearGradient
              colors={colors.blue.buttonGradient}
              style={styles.signIn}
            >
              <Text style={[styles.textSign, { color: colors.white.normal }]}>
                Sign In
              </Text>
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('SignUp')}
            style={[
              styles.signIn,
              { borderColor: colors.blue.sky, borderWidth: 1, marginTop: 15 },
            ]}
          >
            <Text style={[styles.textSign, { color: colors.blue.sky }]}>
              Sign Up
            </Text>
          </TouchableOpacity>
        </View>
      </Animatable.View>
    </View>
  );
};
export default SignIn;
