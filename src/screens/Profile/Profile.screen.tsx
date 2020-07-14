import React, { useState, useEffect, Fragment, useContext } from 'react';

import {
  Text,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useMutation } from '@apollo/react-hooks';
import { ProgressDialog } from 'react-native-simple-dialogs';
import { Formik } from 'formik';

import { ProfileHeader } from '../../components/Headers';
import { DismissKeyboard } from '../../components/TextInput';

import { profileSchema } from '../../validation/profile';
import AnimatableTextInput from '../../components/TextInput/AnimatableTextInput';
import colors from '../../constants/colors';
import { RxRunrContext } from '../../config/context';
import {
  UPDATE_CUSTOMER,
  updateCustomerCompleted,
  updateCustomerError,
} from '../../graphql/queries/customer/customer';

import styles from './styles';

const Profile = () => {
  const { customer, setCustomerContext } = useContext(RxRunrContext);
  const [isLoading, setIsLoading] = useState(false);

  const [updateCustomer] = useMutation(UPDATE_CUSTOMER, {
    fetchPolicy: 'no-cache',
    onError: updateCustomerError(setIsLoading),
    onCompleted: updateCustomerCompleted(setIsLoading, setCustomerContext),
  });
  return (
    <Fragment>
      <ProgressDialog
        visible={isLoading}
        message="Loading..."
        activityIndicatorColor={colors.blue.dark}
        activityIndicatorSize="large"
      />
      <ProfileHeader title="Profile" />
      <DismissKeyboard>
        <KeyboardAvoidingView
          style={styles.container}
          behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
          enabled
        >
          <Formik
            initialValues={{
              firstName: customer.firstName,
              lastName: customer.lastName,
            }}
            validationSchema={profileSchema}
            onSubmit={async (values, { setSubmitting }) => {
              const { firstName, lastName } = values;
              const result = await updateCustomer({
                variables: {
                  input: { customerId: customer.id, firstName, lastName },
                },
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
                  <View style={styles.formView}>
                    <AnimatableTextInput
                      label="FIRST NAME"
                      placeholder="Enter First Name"
                      iconName="user-o"
                      name="firstName"
                      value={values.firstName}
                      errors={errors}
                      touched={touched}
                      handleChange={handleChange('firstName')}
                    />
                    <AnimatableTextInput
                      label="LAST NAME"
                      placeholder="Enter Last Name"
                      iconName="user-o"
                      name="lastName"
                      value={values.lastName}
                      errors={errors}
                      touched={touched}
                      handleChange={handleChange('lastName')}
                      headerStyles={{ marginTop: 35 }}
                    />
                  </View>
                  <View
                    style={{
                      position: 'absolute',
                      left: 10,
                      right: 10,
                      justifyContent: 'center',

                      bottom: 20,
                    }}
                  >
                    <TouchableOpacity
                      style={{
                        backgroundColor: colors.blue.dark,
                        height: 50,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                      onPress={handleSubmit}
                    >
                      <Text
                        style={{
                          color: colors.white.normal,
                          fontWeight: 'bold',
                          fontSize: 18,
                        }}
                      >
                        Save
                      </Text>
                    </TouchableOpacity>
                  </View>
                </Fragment>
              );
            }}
          </Formik>
        </KeyboardAvoidingView>
      </DismissKeyboard>
    </Fragment>
  );
};
export default Profile;
