import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { Splash, SignIn, SignUp } from '../screens';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Rx } from '../screens/Rx';
import { Settings } from '../screens/Settings';
import { Pharmacies } from '../screens/Pharmacies';
import colors from '../constants/colors';

const AppTabs = createMaterialBottomTabNavigator();

const AppTabsScreen = () => (
  <AppTabs.Navigator
    barStyle={{ backgroundColor: colors.blue.dark }}
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;

        if (route.name === 'Rx') {
          iconName = 'pill';
        } else if (route.name === 'Settings') {
          iconName = 'cogs';
        } else if (route.name === 'Pharmacies') {
          iconName = 'pharmacy';
        }

        // You can return any component that you like here!
        return (
          <MaterialCommunityIcons
            name={iconName || 'exclamation'}
            size={25}
            color={color}
          />
        );
      },
    })}
  >
    <AppTabs.Screen name="Rx" component={RxStackScreen} />
    <AppTabs.Screen name="Pharmacies" component={PharmaciesStackScreen} />
    <AppTabs.Screen name="Settings" component={SettingsStackScreen} />
  </AppTabs.Navigator>
);

const RxStack = createStackNavigator();
const RxStackScreen = () => (
  <RxStack.Navigator screenOptions={{ headerShown: false }}>
    <RxStack.Screen name="Rx" component={Rx} />
  </RxStack.Navigator>
);
const PharmaciesStack = createStackNavigator();
const PharmaciesStackScreen = () => (
  <PharmaciesStack.Navigator screenOptions={{ headerShown: false }}>
    <PharmaciesStack.Screen name="Pharmacies" component={Pharmacies} />
  </PharmaciesStack.Navigator>
);

const SettingsStack = createStackNavigator();
const SettingsStackScreen = () => (
  <SettingsStack.Navigator screenOptions={{ headerShown: false }}>
    <SettingsStack.Screen name="Settings" component={Settings} />
  </SettingsStack.Navigator>
);

const RootStack = createStackNavigator();

const RootStackScreen = () => (
  <RootStack.Navigator headerMode="none">
    <RootStack.Screen
      name="Splash"
      component={Splash}
      options={{ headerShown: false }}
    />
    <RootStack.Screen
      name="SignIn"
      component={SignIn}
      options={{ headerShown: false }}
    />
    <RootStack.Screen
      name="SignUp"
      component={SignUp}
      options={{ headerShown: false }}
    />
    <RootStack.Screen name="Rx" component={AppTabsScreen} />
  </RootStack.Navigator>
);

export default () => (
  <NavigationContainer>
    <RootStackScreen />
  </NavigationContainer>
);
