import React, { useState, useEffect, FC } from 'react';
import { Text, View } from 'react-native';

import styles from './styles';
import { IPharmacyFormatProps } from '.';

const PharmacyDistance: FC<IPharmacyFormatProps> = ({ pharmacy }) => {
  return (
    <Text
      style={{ color: 'black', opacity: 0.7 }}
    >{`${pharmacy.distance.toFixed(2)} mi`}</Text>
  );
};
export default PharmacyDistance;
