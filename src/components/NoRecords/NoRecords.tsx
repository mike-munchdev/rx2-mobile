import React, { useState, useEffect, FC } from 'react';
import { Text, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import styles from './styles';
import colors from '../../constants/colors';

export interface INoRecordsProps {
  text: string;
  iconName?: string;
  color?: string;
}
const NoRecords: FC<INoRecordsProps> = ({ text, iconName, color }) => {
  return (
    <View style={styles.container}>
      <MaterialCommunityIcons
        name={iconName || 'pill'}
        size={48}
        color={color || colors.blue.dark}
      />
      <Text style={styles.text}>{text}</Text>
    </View>
  );
};
export default NoRecords;
