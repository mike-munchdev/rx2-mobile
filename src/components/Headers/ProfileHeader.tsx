import React, { useContext, FC } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  TouchableHighlight,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import styles from './styles';
import colors from '../../constants/colors';
import { AuthContext, RxRunrContext } from '../../config/context';
import { IconWithBadge } from '../Icons';
import ShoppingCartIcon from '../Icons/ShoppingCartIcon';

export interface ISettingsHeaderProps {
  title: string;
}
const SettingsHeader: FC<ISettingsHeaderProps> = ({ title }) => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.header}>
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
      </View>

      <View style={styles.headerCenter}>
        <Text style={styles.headerCenterTitle}>{title}</Text>
      </View>
      <View style={styles.headerRight}>
        <TouchableOpacity
          style={styles.rightIcon}
          onPress={() => navigation.navigate('ShoppingCart')}
        >
          <ShoppingCartIcon />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default SettingsHeader;
