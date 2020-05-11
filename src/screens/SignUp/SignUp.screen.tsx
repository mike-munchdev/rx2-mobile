import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Text, View, TextInput, TouchableOpacity } from 'react-native';
import { FontAwesome, Feather } from '@expo/vector-icons';
import styles from './styles';
import colors from '../../constants/colors';
import * as Animatable from 'react-native-animatable';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';

const SignUp = () => {
  const [checkTextInputChange, setCheckTextInputChange] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordSecureTextEntry, setPasswordSecureTextEntry] = useState(true);
  const [confirmSecureTextEntry, setConfirmSecureTextEntry] = useState(true);
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
        <Text style={[styles.textFooter, { marginTop: 35 }]}>Password</Text>
        <View style={styles.action}>
          <Feather name="lock" color={colors.blue.dark} size={20} />
          <TextInput
            secureTextEntry={passwordSecureTextEntry}
            placeholder="Your password..."
            style={styles.textInput}
            value={password}
            onChangeText={(text) => setPassword(text)}
          />
          <TouchableOpacity
            onPress={() => setPasswordSecureTextEntry(!passwordSecureTextEntry)}
          >
            <Feather
              name={`${passwordSecureTextEntry ? 'eye-off' : 'eye'}`}
              color={`${
                passwordSecureTextEntry ? colors.gray.normal : colors.green.normal
              }`}
              size={20}
            />
          </TouchableOpacity>
        </View>
        <Text style={[styles.textFooter, { marginTop: 35 }]}>Confirm Password</Text>
        <View style={styles.action}>
          <Feather name="lock" color={colors.blue.dark} size={20} />
          <TextInput
            secureTextEntry={confirmSecureTextEntry}
            placeholder="Your password..."
            style={styles.textInput}
            value={confirmPassword}
            onChangeText={(text) => setConfirmPassword(text)}
          />
          <TouchableOpacity
            onPress={() => setConfirmSecureTextEntry(!confirmSecureTextEntry)}
          >
            <Feather
              name={`${confirmSecureTextEntry ? 'eye-off' : 'eye'}`}
              color={`${
                confirmSecureTextEntry ? colors.gray.normal : colors.green.normal
              }`}
              size={20}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.textPrivate}>
          <Text style={styles.textPrivateColor}>By signing up you agree to our</Text>
          <Text>{" "}Terms of Service</Text>
          <Text style={styles.textPrivateColor}>{" "}and</Text>
          <Text>Privacy Policy</Text>
        </View>
        <View style={styles.button}>
          <LinearGradient
            colors={colors.blue.buttonGradient}
            style={styles.signIn}
          >
            <Text style={[styles.textSign, { color: colors.white.normal }]}>
              Sign Up
            </Text>
          </LinearGradient>

        </View>
      </Animatable.View>
    </View>
  );
};
export default SignUp;
