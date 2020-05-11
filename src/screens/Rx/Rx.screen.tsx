import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Text } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import ScrollableTabView, {
  DefaultTabBar,
} from 'react-native-scrollable-tab-view';
import styles from './styles';
import colors from '../../constants/colors';

const Rx = () => {
  return (
    <ScrollableTabView
      style={{ marginTop: 20 }}
      initialPage={0}
      renderTabBar={() => (
        <DefaultTabBar
          underlineStyle={{ backgroundColor: colors.blue.light }}
          textStyle={{ color: colors.blue.light, fontWeight: 'bold' }}
        />
      )}
    >
      <Text tabLabel="History">History</Text>
      <Text tabLabel="Refill">Refill</Text>
      <Text tabLabel="New">New</Text>
    </ScrollableTabView>
  );
};
export default Rx;
