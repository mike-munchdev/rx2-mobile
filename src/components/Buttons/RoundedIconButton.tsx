import React, { FC } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  GestureResponderEvent,
} from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

import colors from '../../constants/colors';

export interface IRoundedIconButtonProps {
  onPress: ((event: GestureResponderEvent) => void) | undefined;
  backgroundColor: string | undefined;
  borderColor?: string | undefined;
  size: number | undefined;
  iconSize: number | undefined;
  borderWidth?: number | undefined;
  iconName: string | undefined;
  iconColor?: string | undefined;
}
export const RoundedIconButton: FC<IRoundedIconButtonProps> = ({
  onPress,
  backgroundColor,
  borderColor,
  size,
  iconSize,
  iconName,
  iconColor,
  borderWidth,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        width: size || 60,
        height: size || 60,
        backgroundColor: backgroundColor || colors.white.normal,
        borderRadius: size ? size / 2 : 30,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: borderColor || colors.blue.light,
        borderWidth: borderWidth || 2,
      }}
    >
      <FontAwesome5
        name={iconName}
        size={iconSize}
        color={iconColor || colors.blue.light}
      />
    </TouchableOpacity>
  );
};

export default RoundedIconButton;
