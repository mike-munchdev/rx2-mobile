import React, { useState, useEffect, FC } from 'react';
import PropTypes from 'prop-types';
import { Text, Modal, View } from 'react-native';
import { AntDesign, FontAwesome, FontAwesome5 } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';

import styles from './styles';

export interface ILoadingProps {
  isVisible: boolean;
  animationType?: 'fade' | 'none' | 'slide' | undefined;
}
const Loading: FC<ILoadingProps> = ({ isVisible, animationType }) => {
  return (
    <Modal
      animationType={animationType || 'fade'}
      supportedOrientations={['landscape', 'portrait']}
      transparent
      visible={isVisible}
    >
      <View style={styles.container}>
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            alignContent: 'center',
            justifyContent: 'center',
          }}
        >
          <Animatable.Text
            animation="pulse"
            easing="ease-out"
            iterationCount="infinite"
            style={{ textAlign: 'center', fontSize: 24 }}
          >
            Loading
          </Animatable.Text>
        </View>
      </View>
    </Modal>
  );
};
export default Loading;

Loading.propTypes = {
  text: PropTypes.string,
};
