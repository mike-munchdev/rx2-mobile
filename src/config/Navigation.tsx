import React, { useEffect, useState, useMemo, createContext } from 'react';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';

import { MaterialCommunityIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-community/async-storage';
import { Splash, SignIn, SignUp } from '../screens';
import { Rx } from '../screens/Rx';
import { Settings } from '../screens/Settings';
import { Pharmacies } from '../screens/Pharmacies';
import colors from '../constants/colors';
import { AuthContext, CustomerContext } from './context';
import GetStarted from '../screens/GetStarted/GetStarted.screen';
import { useToken } from '../hooks/customerInfo';

import { Sidebar } from '../components/Sidebar';
import { AlertHelper } from '../utils/alert';

const AuthStack = createStackNavigator();
// const Tabs = createMaterialBottomTabNavigator();
const Drawer = createDrawerNavigator();
const RxStack = createStackNavigator();
const PharmaciesStack = createStackNavigator();
const SettingsStack = createStackNavigator();

const RxStackScreen = () => (
  <RxStack.Navigator screenOptions={{ headerShown: false }}>
    <RxStack.Screen name="Rx" component={Rx} />
  </RxStack.Navigator>
);

const PharmaciesStackScreen = () => (
  <PharmaciesStack.Navigator screenOptions={{ headerShown: false }}>
    <PharmaciesStack.Screen name="Pharmacies" component={Pharmacies} />
  </PharmaciesStack.Navigator>
);

const SettingsStackScreen = () => (
  <SettingsStack.Navigator screenOptions={{ headerShown: false }}>
    <SettingsStack.Screen name="Settings" component={Settings} />
  </SettingsStack.Navigator>
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

// const TabsScreen = () => (
//   <Tabs.Navigator
//     barStyle={{ backgroundColor: colors.blue.dark }}
//     screenOptions={({ route }) => ({
//       tabBarIcon: ({ focused, color, size }) => {
//         let iconName;

//         if (route.name === 'Rx') {
//           iconName = 'pill';
//         } else if (route.name === 'Settings') {
//           iconName = 'cogs';
//         } else if (route.name === 'Pharmacies') {
//           iconName = 'pharmacy';
//         }

//         // You can return any component that you like here!
//         return (
//           <MaterialCommunityIcons
//             name={iconName || 'exclamation'}
//             size={25}
//             color={color}
//           />
//         );
//       },
//     })}
//   >
//     <Tabs.Screen name="Rx" component={RxStackScreen} />
//     <Tabs.Screen name="Pharmacies" component={PharmaciesStackScreen} />
//     <Tabs.Screen name="Settings" component={SettingsStackScreen} />
//   </Tabs.Navigator>
// );

const DrawerScreen = () => (
  <Drawer.Navigator initialRouteName="Rx" drawerContent={() => <Sidebar />}>
    <Drawer.Screen name="Rx" component={RxStackScreen} />
    <Drawer.Screen name="Pharmacies" component={PharmaciesStackScreen} />
    <Drawer.Screen name="Settings" component={SettingsStackScreen} />
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
  const authContext = useMemo(() => {
    return {
      getStarted: async () => {
        await AsyncStorage.setItem('getStarted', 'true');
      },
      signIn: async (token: string, customer: any, location?: string) => {
        console.log('signIn', customer, token);
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
    };
  }, []);

  useEffect(() => {
    (async () => {
      const token = await useToken();
      if (token) {
        setUserToken(token);
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
      <CustomerContext.Provider value={customer}>
        <NavigationContainer>
          <RootStackScreen userToken={userToken} />
        </NavigationContainer>
      </CustomerContext.Provider>
    </AuthContext.Provider>
  );
};
