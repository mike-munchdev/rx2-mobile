import React, { useContext } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import styles from './styles';
import colors from '../../constants/colors';
import { AuthContext } from '../../config/context';
import { IconWithBadge } from '../Icons';
import ShoppingCartIcon from '../Icons/ShoppingCartIcon';

const RxHeader = () => {
  const { signOut } = useContext(AuthContext);
  const navigation = useNavigation();

  return (
    <View style={styles.header}>
      <View style={styles.headerLeft}>
        <TouchableOpacity
          style={styles.leftIcon}
          onPress={() => navigation.openDrawer()}
        >
          <FontAwesome
            name="user-circle"
            color={colors.white.normal}
            size={25}
          />
        </TouchableOpacity>
        {/* <TouchableOpacity
          style={styles.leftIcon}
          onPress={async () => {
            await signOut();
          }}
        >
          <FontAwesome name="sign-out" color={colors.white.normal} size={25} />
        </TouchableOpacity> */}
      </View>

      <View style={styles.headerCenter}>
        <Text style={styles.title}>RX</Text>
      </View>
      <View style={styles.headerRight}>
        <TouchableOpacity
          style={styles.rightIcon}
          onPress={() => alert('Under Development')}
        >
          <ShoppingCartIcon />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default RxHeader;
