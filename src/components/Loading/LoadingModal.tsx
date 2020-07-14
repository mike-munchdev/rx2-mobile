import React, { useState, useEffect, FC } from 'react';

import { Text, Modal, View, Animated } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import styles from './styles';
import colors from '../../constants/colors';

const AnimatedIcon = Animated.createAnimatedComponent(MaterialCommunityIcons);
export interface ILoadingModalProps {
  isVisible: boolean;
  animationType?: 'fade' | 'none' | 'slide' | undefined;
}
const loadingSpin = new Animated.Value(0);

const LoadingModal: FC<ILoadingModalProps> = ({ isVisible, animationType }) => {
  useEffect(() => {
    spinAnimation();
  }, []);
  const spinAnimation = () => {
    loadingSpin.setValue(0);
    Animated.timing(loadingSpin, {
      toValue: 1,
      duration: 1000,
    }).start(() => spinAnimation());
  };

  return (
    <Modal
      animationType={animationType || 'fade'}
      supportedOrientations={['landscape', 'portrait']}
      visible={isVisible}
    >
      <View style={styles.loadingContainer}>
        {/* <AnimatedIcon style={{transform: [rotate: spin] }} /> */}
        <MaterialCommunityIcons
          name="pill"
          size={38}
          color={colors.blue.dark}
        />
        <Text>Loading</Text>
      </View>
    </Modal>
  );
};
export default LoadingModal;
