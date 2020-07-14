import React, { useState, useEffect, FC } from 'react';
import { Text, View } from 'react-native';

import styles from './styles';
import { IPharmacyFormatProps } from '.';
import colors from '../../constants/colors';

const PharmacyAddress: FC<IPharmacyFormatProps> = ({ pharmacy }) => {
  const { address } = pharmacy;
  return (
    <View>
      <Text style={{ color: colors.blue.dark }}>{`${address.streetInfo}`}</Text>
      {address.unitInfo ? (
        <Text style={{ color: colors.blue.dark }}>{`${address.unitInfo}`}</Text>
      ) : null}
      <View style={{ flex: 1, flexDirection: 'row' }}>
        <Text
          style={{ color: colors.blue.dark }}
        >{`${address.city}, ${address.state}`}</Text>
        <Text style={{ color: colors.blue.dark }}>{` ${address.zipCode}`}</Text>
      </View>
    </View>
  );
};
export default PharmacyAddress;
