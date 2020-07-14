import React, { useState, Fragment, useContext } from 'react';

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

import { SettingsHeader } from '../../components/Headers';
import { DismissKeyboard } from '../../components/TextInput';

import colors from '../../constants/colors';
import { RxRunrContext } from '../../config/context';
import {
  UPDATE_CUSTOMER_SETTINGS,
  updateCustomerSettingsError,
  updateCustomerSettingsCompleted,
} from '../../graphql/queries/customer/customer';

import styles from './styles';
import { ButtonGroup } from 'react-native-elements';
import { settingsSchema } from '../../validation/settings';

const Settings = () => {
  const { customer, setCustomerContext } = useContext(RxRunrContext);
  const [isLoading, setIsLoading] = useState(false);

  const buttons = ['5', '10', '15', '20', '25'];
  const [searchDistanceIndex, setSearchDistanceIndex] = useState(
    buttons.findIndex((b) => Number(b) === customer.settings.searchDistance)
  );
  const [updateCustomerSettings] = useMutation(UPDATE_CUSTOMER_SETTINGS, {
    fetchPolicy: 'no-cache',
    onError: updateCustomerSettingsError(setIsLoading),
    onCompleted: updateCustomerSettingsCompleted(
      setIsLoading,
      setCustomerContext
    ),
  });

  return (
    <Fragment>
      <ProgressDialog
        visible={isLoading}
        message="Loading..."
        activityIndicatorColor={colors.blue.dark}
        activityIndicatorSize="large"
      />
      <SettingsHeader title="Settings" />
      <DismissKeyboard>
        <KeyboardAvoidingView
          style={styles.container}
          behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
          enabled
        >
          <Formik
            initialValues={{
              searchDistance: customer.settings.searchDistance,
            }}
            validationSchema={settingsSchema}
            onSubmit={async (values, { setSubmitting }) => {
              setIsLoading(true);
              const { searchDistance } = values;
              const result = await updateCustomerSettings({
                variables: {
                  input: {
                    customerId: customer.id,
                    searchDistance: Number(buttons[searchDistanceIndex]),
                  },
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
                    <View>
                      <Text style={{ color: colors.blue.dark, fontSize: 18 }}>
                        SEARCH DISTANCE
                      </Text>
                      <ButtonGroup
                        onPress={(selectedIndex) =>
                          setSearchDistanceIndex(selectedIndex)
                        }
                        selectedIndex={searchDistanceIndex}
                        buttons={buttons}
                        containerStyle={{ height: 50 }}
                        selectedButtonStyle={{
                          backgroundColor: colors.blue.dark,
                        }}
                      />
                    </View>
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
export default Settings;
