import React, { useEffect } from 'react';

import App from './src/index';
import * as Notifications from 'expo-notifications';
import { registerForPushNotificationsAsync } from './src/utils/notifications';

export default () => {
  useEffect(() => {
    (async () => {
      const token = await registerForPushNotificationsAsync();
      console.log('token', token);
    })();
  }, []);
  return <App />;
};
