import React, { useState, useEffect, FC, Fragment } from 'react';

import { TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { Badge } from 'react-native-elements';
import styles from './styles';
import colors from '../../constants/colors';

export interface IIconWithBadgeProps {
  iconName: string;
  iconColor: string;
  iconSize: number;
  badgeValue: number;
  badgeStatus: 'primary' | 'success' | 'warning' | 'error' | undefined;
}

const IconWithBadge: FC<IIconWithBadgeProps> = ({
  iconName,
  iconColor,
  iconSize,
  badgeValue,
  badgeStatus,
}) => {
  return (
    <Fragment>
      <FontAwesome
        name={iconName}
        color={iconColor || colors.white.normal}
        size={iconSize}
      />
      {badgeValue > 0 ? (
        <Badge
          status={badgeStatus}
          value={badgeValue}
          containerStyle={styles.badge}
        />
      ) : null}
    </Fragment>
  );
};
export default IconWithBadge;
