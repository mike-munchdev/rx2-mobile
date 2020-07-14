import React, { useState, useEffect, FC, Component } from 'react';
import { View, Text } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import styles from './styles';
import colors from '../../constants/colors';

const Loading: FC = () => {
  return (
    <View style={styles.loadingContainer}>
      <MaterialCommunityIcons name="pill" size={36} color={colors.blue.dark} />
      <Text>Loading</Text>
    </View>
  );
};

export default Loading;
