import React, { useState, useEffect, useContext } from 'react';
import { Text, View, SafeAreaView } from 'react-native';
import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';

import styles from './styles';
import colors from '../../constants/colors';

import { AuthContext, RxRunrContext } from '../../config/context';

import SidebarMenuItem from './SidebarMenuItem';
import { HorizontalRule } from '../HorizontalRule/';
import { useNavigation } from '@react-navigation/native';

const Sidebar = () => {
  const { signOut } = useContext(AuthContext);
  const { customer } = useContext(RxRunrContext);
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ marginLeft: 10, marginBottom: 20 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <FontAwesome name="user-circle" color={colors.blue.dark} size={32} />
          <TouchableOpacity
            onPress={() => navigation.navigate('Profile')}
            style={{ marginLeft: 15 }}
          >
            <Text style={{ fontSize: 18 }}>{`${
              customer ? `${customer.firstName} ${customer.lastName}` : ''
            }`}</Text>

            <Text style={{ fontSize: 14 }}>View Profile</Text>
          </TouchableOpacity>
        </View>
      </View>
      <HorizontalRule styles={{ marginBottom: 20 }} />
      <View style={{ marginLeft: 10, marginBottom: 20 }}>
        <SidebarMenuItem
          onPress={async () => {
            navigation.navigate('Rx');
          }}
          icon={() => (
            <MaterialCommunityIcons
              name="pill"
              size={20}
              color={colors.blue.dark}
            />
          )}
          title="Rx"
        />
        {/* <SidebarMenuItem
          onPress={async () => {
            alert('Under Development');
          }}
          iconName="building"
          iconColor={colors.blue.dark}
          iconSize={20}
          title="Pharmacy"
          viewStyles={{ marginTop: 20 }}
        /> */}
      </View>
      <HorizontalRule styles={{ marginBottom: 20 }} />
      <View style={{ marginLeft: 10, marginBottom: 20 }}>
        <SidebarMenuItem
          onPress={async () => {
            navigation.navigate('Settings');
          }}
          iconName="cog"
          iconColor={colors.blue.dark}
          iconSize={20}
          title="Settings"
        />
        <SidebarMenuItem
          onPress={async () => {
            await signOut();
          }}
          iconName="sign-out"
          iconColor={colors.blue.dark}
          iconSize={20}
          title="Logout"
          viewStyles={{ marginTop: 20 }}
        />
      </View>
      <HorizontalRule styles={{ marginBottom: 20 }} />
    </SafeAreaView>
  );
};
export default Sidebar;
