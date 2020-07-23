import React, { useState, useEffect, FC, useContext } from 'react';

import {
  Text,
  View,
  StatusBar,
  TouchableOpacity,
  Image,
  Linking,
  Alert,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';
import * as Permissions from 'expo-permissions';
// import * as Notifications from 'expo-notifications';
import styles from './styles';
import colors from '../../constants/colors';
import { useNavigation } from '@react-navigation/native';
import { AlertHelper } from '../../utils/alert';
import { useMutation } from '@apollo/react-hooks';
import {
  addPushTokenError,
  addPushTokenCompleted,
  ADD_PUSH_TOKEN,
} from '../../graphql/queries/customer/customer';
import { RxRunrContext } from '../../config/context';

import { registerForPushNotificationsAsync } from '../../utils/notifications';
import { Notifications } from 'expo';

export interface ISplashProps {
  setLoading: Function;
  setRequesting: Function;
}
const Splash: FC<ISplashProps> = ({ setLoading, setRequesting }) => {
  const { customer, setCustomerContext } = useContext(RxRunrContext);

  const [addPushToken] = useMutation(ADD_PUSH_TOKEN, {
    fetchPolicy: 'no-cache',
    onError: addPushTokenError(setLoading),
    onCompleted: addPushTokenCompleted(setLoading, setCustomerContext),
  });

  useEffect(() => {
    (async () => {
      const permissions = await Permissions.getAsync(Permissions.NOTIFICATIONS);
      console.log('status', permissions);
      if (permissions.status !== 'granted') {
        if (permissions.canAskAgain) {
          const { status } = await Permissions.askAsync(
            Permissions.NOTIFICATIONS
          );
          console.log('status2', status);
          if (status !== 'granted') {
            AlertHelper.setOnTap(() => {
              Linking.openURL('app-settings:');
            });
            AlertHelper.setOnClose(() => {
              setRequesting(false);
            });
            AlertHelper.show(
              'info',
              'Notifications Not Enabled',
              'Click here to enable Notifications in Settings'
            );
          } else {
            const response = await Notifications.getExpoPushTokenAsync();
            await addPushToken({
              variables: {
                input: {
                  customerId: customer ? customer.id : '',
                  pushToken: response.data,
                },
              },
            });
          }
        }
      } else {
        setRequesting(false);
      }
    })();
    return () => {};
  }, []);

  return (
    <View style={styles.container}>
      {/* <Image
        source={require('../../../assets/logo2.png')}
        style={{
          width: 0,
          height: 0,
        }}
        resizeMode="cover"
      /> */}
      <Text>Splash Screen (awaiting logo)</Text>
    </View>
  );
};
export default Splash;
