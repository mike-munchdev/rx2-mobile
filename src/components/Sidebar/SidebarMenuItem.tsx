import React, { useState, useEffect, Fragment, FC } from 'react';
import { FontAwesome } from '@expo/vector-icons';
import {
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  GestureResponderEvent,
  ViewStyle,
} from 'react-native';

export interface ISidebarMenuItemProps {
  onPress: (event: GestureResponderEvent) => void;
  iconName?: string;
  iconColor?: string;
  iconSize?: number;
  title: string;
  viewStyles?: ViewStyle;
  icon?: Function;
}
const SidebarMenuItem: FC<ISidebarMenuItemProps> = ({
  onPress,
  iconName,
  iconColor,
  iconSize,
  title,
  viewStyles,
  icon,
}) => {
  return (
    <View style={[viewStyles]}>
      <TouchableOpacity
        onPress={onPress}
        style={{
          flexDirection: 'row',
          justifyContent: 'flex-start',
          alignItems: 'center',
        }}
      >
        <View style={{ width: 20 }}>
          {icon ? (
            icon()
          ) : (
            <FontAwesome
              name={iconName || 'cog'}
              color={iconColor}
              size={iconSize}
            />
          )}
        </View>
        <Text
          style={{
            fontSize: 16,
            marginLeft: 15,
          }}
        >
          {title}
        </Text>
      </TouchableOpacity>
    </View>
  );
};
export default SidebarMenuItem;
