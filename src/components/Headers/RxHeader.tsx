import React from 'react';

import { IconButton } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { View, Text, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import styles from './styles';

import { useNavigation } from '@react-navigation/native';
import { useIsFirstRouteInParent } from '../../hooks/navigation';

import colors from '../../constants/colors';

const RxHeader = () => {
  const navigation = useNavigation();
  const isFirstRoute = useIsFirstRouteInParent();

  return (
    <View style={styles.header}>
      <View style={styles.headerLeft}>
        {false && (
          <TouchableOpacity style={styles.leftIcon}>
            <AntDesign
              name="shoppingcart"
              color={colors.white.normal}
              size={25}
            />
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.headerCenter}>
        <Text style={styles.title}>RX</Text>
      </View>
      <View style={styles.headerRight}>
        <TouchableOpacity style={styles.rightIcon}>
          <AntDesign
            name="shoppingcart"
            color={colors.white.normal}
            size={25}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default RxHeader;
