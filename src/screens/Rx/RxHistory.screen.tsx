import React, { useState, useEffect, Fragment } from 'react';

import { Text, View } from 'react-native';

import ScrollableTabView, {
  DefaultTabBar,
} from 'react-native-scrollable-tab-view';
import styles from './styles';
import colors from '../../constants/colors';
import { RxHeader } from '../../components/Headers';
import { RxHistoryList } from '../../components/RxHistoryList';
import { RoundedIconButton } from '../../components/Buttons';
import { useNavigation } from '@react-navigation/native';

const RxHistory = () => {
  const navigation = useNavigation();
  return (
    <Fragment>
      <RxHeader />
      <View style={styles.container}>
        <RxHistoryList />
        <View
          style={{
            position: 'absolute',
            alignItems: 'flex-end',
            right: 20,
            justifyContent: 'center',
            width: '100%',
            bottom: 20,
          }}
        >
          <RoundedIconButton
            size={60}
            borderColor={colors.blue.dark}
            backgroundColor={colors.white.normal}
            iconName="prescription-bottle-alt"
            iconSize={36}
            iconColor={colors.blue.dark}
            onPress={() => navigation.navigate('NewRx')}
            text="Add New Rx"
          />
        </View>
      </View>
    </Fragment>
  );
};
export default RxHistory;
