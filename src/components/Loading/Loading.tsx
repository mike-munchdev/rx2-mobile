import React, { useState, useEffect, FC, Component } from 'react';
import { View } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { FontAwesome } from '@expo/vector-icons';
import styles from './styles';

const Loading: FC = () => {
  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Animatable.Text
        animation="pulse"
        easing="ease-out"
        iterationCount="infinite"
        style={{ textAlign: 'center' }}
      >
        Loading
      </Animatable.Text>
    </View>
  );
};

export default Loading;
