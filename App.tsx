import React, { useEffect } from 'react';
import * as Notifications from 'expo-notifications';
import App from './src/index';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default () => {
  return <App />;
};
