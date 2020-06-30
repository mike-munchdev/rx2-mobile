import React, { useState, useContext, Fragment, useEffect, FC } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { useLazyQuery } from '@apollo/react-hooks';
import { ApolloError } from 'apollo-client';
import { Formik } from 'formik';

import {
  GET_CUSTOMER_TOKEN_BY_EMAIL_AND_PASSWORD,
  getCustomerTokenByEmailAndPasswordCompleted,
  getCustomerTokenByEmailAndPasswordError,
} from '../../graphql/queries/token/tokens';
import styles from './styles';
import colors from '../../constants/colors';

import { signinSchema } from '../../validation/signin';

import { DismissKeyboard } from '../../components/TextInput';
import AnimatableTextInput from '../../components/TextInput/AnimatableTextInput';
import { AuthContext } from '../../config/context';

const SignIn: FC = () => {
  const { signIn, isLoggedIn } = useContext(AuthContext);

  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      const isUserLoggedIn = await isLoggedIn();
    })();
  }, []);

  const [getCustomerTokenByEmailAndPassword, { loading }] = useLazyQuery(
    GET_CUSTOMER_TOKEN_BY_EMAIL_AND_PASSWORD,
    {
      fetchPolicy: 'network-only',
      onError: getCustomerTokenByEmailAndPasswordError,
      onCompleted: getCustomerTokenByEmailAndPasswordCompleted(signIn),
    }
  );

  return (
    <DismissKeyboard>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
        enabled
      >
        <View style={styles.header}>
          <Animatable.Image
            animation="bounceIn"
            source={require('../../../assets/logo2.png')}
            style={styles.logo}
            resizeMode="stretch"
          />
        </View>
        <Animatable.View animation="fadeInUpBig" style={styles.footer}>
          <Formik
            initialValues={{
              email: '',
              password: '',
            }}
            validationSchema={signinSchema}
            onSubmit={(values, { setSubmitting }) => {
              const { email, password } = values;
              getCustomerTokenByEmailAndPassword({
                variables: { email, password },
              });
              setSubmitting(false);
            }}
          >
            {({
              handleSubmit,
              handleReset,
              isSubmitting,
              errors,
              touched,
              values,
              handleChange,
              isValid,
            }) => {
              return (
                <Fragment>
                  <View>
                    <AnimatableTextInput
                      label="E-MAIL"
                      placeholder="Enter email"
                      iconName="user-o"
                      name="email"
                      value={values.email}
                      errors={errors}
                      touched={touched}
                      handleChange={handleChange('email')}
                    />

                    <AnimatableTextInput
                      label="PASSWORD"
                      placeholder="Enter password"
                      iconName="lock"
                      name="password"
                      value={values.email}
                      errors={errors}
                      touched={touched}
                      handleChange={handleChange('password')}
                      secureTextEntry={true}
                      headerStyles={{ marginTop: 35 }}
                    />
                  </View>
                  <View style={styles.buttons}>
                    <TouchableOpacity
                      onPress={handleSubmit}
                      style={styles.button}
                      disabled={isSubmitting || !isValid}
                    >
                      <LinearGradient
                        colors={colors.blue.buttonGradient}
                        style={styles.signIn}
                      >
                        <Text
                          style={[
                            styles.textSign,
                            { color: colors.white.normal },
                          ]}
                        >
                          Sign In
                        </Text>
                      </LinearGradient>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => navigation.navigate('SignUp')}
                      style={[
                        styles.signIn,
                        {
                          borderColor: colors.blue.sky,
                          borderWidth: 1,
                          marginTop: 15,
                        },
                      ]}
                    >
                      <Text
                        style={[styles.textSign, { color: colors.blue.sky }]}
                      >
                        Sign Up
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => navigation.navigate('SignUp')}
                      style={[
                        styles.signIn,
                        {
                          borderColor: colors.blue.sky,
                          borderWidth: 1,
                          marginTop: 15,
                        },
                      ]}
                    >
                      <Text
                        style={[styles.textSign, { color: colors.blue.sky }]}
                      >
                        Forgot Password
                      </Text>
                    </TouchableOpacity>
                  </View>
                </Fragment>
              );
            }}
          </Formik>
        </Animatable.View>
      </KeyboardAvoidingView>
    </DismissKeyboard>
  );
};
export default SignIn;
