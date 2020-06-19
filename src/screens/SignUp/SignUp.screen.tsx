import React, { useState, useEffect, useContext, Fragment, FC } from 'react';

import {
  Text,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

import styles from './styles';
import colors from '../../constants/colors';
import * as Animatable from 'react-native-animatable';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../../config/context';

import { DismissKeyboard } from '../../components/TextInput';
import { Formik } from 'formik';
import { signupSchema } from '../../validation/signup';
import AnimatableTextInput from '../../components/TextInput/AnimatableTextInput';
import { useMutation } from '@apollo/react-hooks';
import {
  customerSignupError,
  customerSignupCompleted,
  CUSTOMER_SIGNUP,
} from '../../graphql/queries/customer/customer';

const SignUp: FC = () => {
  const [checkTextInputChange, setCheckTextInputChange] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordSecureTextEntry, setPasswordSecureTextEntry] = useState(true);
  const [confirmSecureTextEntry, setConfirmSecureTextEntry] = useState(true);
  const { signUp } = useContext(AuthContext);

  const navigation = useNavigation();

  const [customerSignup] = useMutation(CUSTOMER_SIGNUP, {
    onError: customerSignupError,
    onCompleted: customerSignupCompleted(signUp, navigation),
  });

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
              passwordConfirmation: '',
            }}
            validationSchema={signupSchema}
            onSubmit={async (values, { setSubmitting }) => {
              const { email, password } = values;
              const result = await customerSignup({
                variables: { input: { email, password } },
              });
              
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
                      value={values.password}
                      errors={errors}
                      touched={touched}
                      handleChange={handleChange('password')}
                      secureTextEntry={true}
                      headerStyles={{ marginTop: 35 }}
                    />
                    <AnimatableTextInput
                      label="CONFIRM PASSWORD"
                      placeholder="Confirm password"
                      iconName="lock"
                      name="passwordConfirmation"
                      value={values.passwordConfirmation}
                      errors={errors}
                      touched={touched}
                      handleChange={handleChange('passwordConfirmation')}
                      secureTextEntry={true}
                      headerStyles={{ marginTop: 35 }}
                    />
                    <View style={styles.textPrivate}>
                      <Text style={styles.textPrivateColor}>
                        By signing up you agree to our
                      </Text>
                      <Text> Terms of Service</Text>
                      <Text style={styles.textPrivateColor}>and</Text>
                      <Text> Privacy Policy</Text>
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
                            Sign Up
                          </Text>
                        </LinearGradient>
                      </TouchableOpacity>
                    </View>
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
export default SignUp;
