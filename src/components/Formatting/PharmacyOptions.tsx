import React, { useState, useEffect, FC } from 'react';
import { Text, View } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import styles from './styles';
import colors from '../../constants/colors';
import { IPharmacyFormatProps } from '.';

const PharmacyOptions: FC<IPharmacyFormatProps> = ({ pharmacy }) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <FontAwesome5
        icon="walk"
        color={pharmacy.canPickup ? colors.blue.dark : 'transparent'}
        size={36}
        style={{ backgroundColor: 'transparent' }}
      />

      <FontAwesome5
        icon="car"
        color={pharmacy.canDeliver ? colors.blue.dark : 'transparent'}
        size={36}
        style={{ backgroundColor: 'transparent' }}
      />
    </View>
  );
};
export default PharmacyOptions;
