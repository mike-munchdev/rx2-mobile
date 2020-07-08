import React, { useEffect, useState, useMemo, createContext } from 'react';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';

import AsyncStorage from '@react-native-community/async-storage';
import { Splash, SignIn, SignUp } from '../screens';
import { RxHistory } from '../screens/Rx';
import { Settings } from '../screens/Settings';
import { SelectPharmacy } from '../screens/Pharmacies';
import colors from '../constants/colors';
import { AuthContext, RxRunrContext } from './context';
import GetStarted from '../screens/GetStarted/GetStarted.screen';

import { Sidebar } from '../components/Sidebar';
import { AlertHelper } from '../utils/alert';
import { NewRx } from '../screens/NewRx';
import { ShoppingCart } from '../screens/ShoppingCart';
import { Profile } from '../screens/Profile';
import { useSubscription } from '@apollo/react-hooks';
import { CART_MODIFIED_SUBSCRIPTION } from '../graphql/queries/customer/customer';
import { Modal } from '../screens/Modal';

const AuthStack = createStackNavigator();
const Tabs = createMaterialBottomTabNavigator();
const Drawer = createDrawerNavigator();
const RxStack = createStackNavigator();
const ProfileStack = createStackNavigator();
const SettingsStack = createStackNavigator();

const RxStackScreen = () => (
  <RxStack.Navigator
    initialRouteName="RxHistory"
    screenOptions={{ headerShown: false }}
    mode="modal"
  >
    <RxStack.Screen name="RxHistory" component={RxHistory} />
    <RxStack.Screen name="NewRx" component={NewRx} />
    <RxStack.Screen name="ShoppingCart" component={ShoppingCart} />
    <RxStack.Screen name="SelectPharmacy" component={SelectPharmacy} />
    <RxStack.Screen
      name="Modal"
      component={Modal}
      options={{
        animationEnabled: true,
        cardStyle: { backgroundColor: 'rgba(0,0,0,0.15)' },
        cardOverlayEnabled: true,
        cardStyleInterpolator: ({ current: { progress } }) => {
          return {
            cardStyle: {
              opacity: progress.interpolate({
                inputRange: [0, 0.5, 0.9, 1],
                outputRange: [0, 0.25, 0.7, 1],
              }),
            },
            overlayStyle: {
              opacity: progress.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 0.5],
                extrapolate: 'clamp',
              }),
            },
          };
        },
      }}
    />
  </RxStack.Navigator>
);

const SettingsStackScreen = () => (
  <SettingsStack.Navigator screenOptions={{ headerShown: false }}>
    <SettingsStack.Screen name="Settings" component={Settings} />
  </SettingsStack.Navigator>
);
const ProfileStackScreen = () => (
  <ProfileStack.Navigator screenOptions={{ headerShown: false }}>
    <ProfileStack.Screen name="Profile" component={Profile} />
  </ProfileStack.Navigator>
);

const AuthStackScreen = () => (
  <AuthStack.Navigator headerMode="none">
    <AuthStack.Screen
      name="GetStarted"
      component={GetStarted}
      options={{ headerShown: false }}
    />
    <AuthStack.Screen
      name="SignIn"
      component={SignIn}
      options={{ headerShown: false }}
    />
    <AuthStack.Screen
      name="SignUp"
      component={SignUp}
      options={{ headerShown: false }}
    />
  </AuthStack.Navigator>
);

// const RxTabsScreen = () => (
//   <Tabs.Navigator
//     barStyle={{ backgroundColor: colors.blue.dark }}
//     screenOptions={({ route }) => ({
//       tabBarIcon: ({ focused, color, size }) => {
//         let iconName;
//         console.log('route.name', route.name);
//         switch (route.name) {
//           case 'Rx':
//             return <FontAwesome5 name="history" size={24} color={color} />;
//           default:
//             return <FontAwesome5 name="cog" size={24} color={color} />;
//         }

//         // } else if (route.name === 'Settings') {
//         //   iconName = 'cogs';
//         // } else if (route.name === 'Pharmacies') {
//         //   iconName = 'pharmacy';
//         // }

//         // You can return any component that you like here!
//         // return (
//         //   <MaterialCommunityIcons
//         //     name={iconName || 'exclamation'}
//         //     size={25}
//         //     color={color}
//         //   />
//         // );
//       },
//     })}
//   >
//     <Tabs.Screen name="Rx" component={RxStackScreen} />
//   </Tabs.Navigator>
// );

const DrawerScreen = () => (
  <Drawer.Navigator initialRouteName="Rx" drawerContent={() => <Sidebar />}>
    <Drawer.Screen name="Rx" component={RxStackScreen} />
    <Drawer.Screen name="Settings" component={SettingsStackScreen} />
    <Drawer.Screen name="Profile" component={ProfileStackScreen} />
  </Drawer.Navigator>
);

const RootStack = createStackNavigator();

const RootStackScreen = (props: any) => {
  const { userToken } = props;

  return (
    <RootStack.Navigator headerMode="none">
      {userToken ? (
        <RootStack.Screen
          name="App"
          component={DrawerScreen}
          options={{
            animationEnabled: false,
          }}
        />
      ) : (
        <RootStack.Screen
          name="Auth"
          component={AuthStackScreen}
          options={{
            animationEnabled: false,
          }}
        />
      )}
    </RootStack.Navigator>
  );
};

export default () => {
  const [isLoading, setIsLoading] = useState(true);
  const [userToken, setUserToken] = useState(null);
  const [customer, setCustomer] = useState(null);

  const { loading, error } = useSubscription(CART_MODIFIED_SUBSCRIPTION, {
    onSubscriptionData: ({ client, subscriptionData }) => {
      const { cartModified } = subscriptionData.data;
      if (cartModified.ok) {
        updateCustomer(cartModified.customer);
      }
    },
    fetchPolicy: 'network-only',
  });

  const updateCustomer = async (customer: any) => {
    console.log('updateCustomer', customer);
    setCustomer(customer);
    await AsyncStorage.setItem('customer', JSON.stringify(customer));
  };

  const authContext = useMemo(() => {
    return {
      getIsStarted: async () => {
        const isStarted = await AsyncStorage.getItem('isStarted');
        return isStarted;
      },
      setIsStarted: async (value: boolean) => {
        await AsyncStorage.setItem('isStarted', String(value));
      },
      signIn: async (token: string, customer: any, location?: string) => {
        setIsLoading(false);
        setUserToken(token);
        setCustomer(customer);
        await AsyncStorage.setItem('token', token);
        await AsyncStorage.setItem('customer', JSON.stringify(customer));
      },
      signUp: (message: string, navigation: any) => {
        AlertHelper.setOnClose(() => {
          navigation.navigate('SignIn');
        });
        AlertHelper.show('success', 'Sign Up', message);
      },
      signOut: async () => {
        await AsyncStorage.removeItem('token');
        await AsyncStorage.removeItem('isLoggedIn');
        await AsyncStorage.removeItem('customer');
        setIsLoading(false);
        setUserToken(null);
        setCustomer(null);
      },
      isLoggedIn: async () => {
        const isLoggedIn = await AsyncStorage.getItem('isLoggedIn');
        return isLoggedIn;
      },
    };
  }, []);

  useEffect(() => {
    (async () => {
      console.log('Navigation useEffect');
      const token = await AsyncStorage.getItem('token');
      const customer = await AsyncStorage.getItem('customer');
      if (token) {
        setUserToken(token);
      }
      if (customer) {
        setCustomer(JSON.parse(customer));
      }
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    })();
  }, []);

  if (isLoading) {
    return <Splash />;
  }

  return (
    <AuthContext.Provider value={authContext}>
      <RxRunrContext.Provider
        value={{
          customer: customer || {},
          setCustomerContext: updateCustomer,
        }}
      >
        <NavigationContainer>
          <RootStackScreen userToken={userToken} />
        </NavigationContainer>
      </RxRunrContext.Provider>
    </AuthContext.Provider>
  );
};
