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

export interface IRxHeaderProps {
  title?: string;
}
const RxHeader: FC<IRxHeaderProps> = ({ title }) => {
  const { signOut } = useContext(AuthContext);
  const { pharmacy, setPharmacy, customer } = useContext(RxRunrContext);
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
        {title ? (
          <Text style={styles.headerCenterTitle}>{title}</Text>
        ) : (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('SelectPharmacy');
            }}
          >
            <View style={styles.headerCenterView}>
              <Text style={styles.pharmacyName}>
                {pharmacy ? pharmacy.pharmacyName : 'CLICK TO'}
              </Text>
              <Text style={styles.pharmacyAddress}>
                {pharmacy ? pharmacy.address : 'SELECT PHARMACY'}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.headerRight}>
        <TouchableOpacity
          style={styles.rightIcon}
          onPress={() => {
            if (customer.cart.length === 0) {
              navigation.navigate('Modal', {
                text: 'Your Cart is Empty',
                handleClose: () => navigation.pop(),
              });
            } else {
              navigation.navigate('ShoppingCart');
            }
          }}
        >
          <ShoppingCartIcon />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default RxHeader;
