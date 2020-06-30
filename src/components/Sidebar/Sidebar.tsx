import React, { useState, useEffect, useContext } from 'react';
import { Text, View, SafeAreaView } from 'react-native';
import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';

import styles from './styles';
import colors from '../../constants/colors';

import { AuthContext, CustomerContext } from '../../config/context';

import SidebarMenuItem from './SidebarMenuItem';
import { HorizontalRule } from '../HorizontalRule/';
import { useNavigation } from '@react-navigation/native';

const Sidebar = () => {
  const { signOut } = useContext(AuthContext);
  const { customer } = useContext(CustomerContext);

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ marginLeft: 10 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <FontAwesome name="user-circle" color={colors.blue.dark} size={32} />
          <TouchableOpacity
            onPress={() => alert('Under Development')}
            style={{ marginLeft: 15 }}
          >
            <Text style={{ fontSize: 18 }}>{`${
              customer ? `${customer.firstName} ${customer.lastName}` : ''
            }`}</Text>

            <Text style={{ fontSize: 14 }}>View Profile</Text>
          </TouchableOpacity>
        </View>
      </View>
      <HorizontalRule styles={{ marginTop: 30 }} />
      <View style={{ marginTop: 20, marginLeft: 10 }}>
        <SidebarMenuItem
          onPress={async () => {
            alert('Under Development');
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
        <SidebarMenuItem
          onPress={async () => {
            alert('Under Development');
          }}
          iconName="building"
          iconColor={colors.blue.dark}
          iconSize={20}
          title="Pharmacy"
          viewStyles={{ marginTop: 20 }}
        />
      </View>
      <HorizontalRule styles={{ marginTop: 30 }} />
      <View style={{ marginTop: 10, marginLeft: 10 }}>
        <SidebarMenuItem
          onPress={async () => {
            alert('Under Development');
          }}
          iconName="cog"
          iconColor={colors.blue.dark}
          iconSize={20}
          title="Settings"
          viewStyles={{ marginTop: 15 }}
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
      <HorizontalRule styles={{ marginTop: 30 }} />
    </SafeAreaView>
  );
};
export default Sidebar;
