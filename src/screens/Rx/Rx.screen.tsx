import React, { useState, useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Text, View } from 'react-native';

import ScrollableTabView, {
  DefaultTabBar,
} from 'react-native-scrollable-tab-view';
import styles from './styles';
import colors from '../../constants/colors';
import { RxHeader } from '../../components/Headers';
import { RxHistory } from '../../components/RxHistory';

const Rx = () => {
  return (
    <View style={styles.container}>
      <RxHeader />
      <ScrollableTabView
        initialPage={0}
        renderTabBar={() => (
          <DefaultTabBar
            underlineStyle={{ backgroundColor: colors.blue.light }}
            textStyle={{ color: colors.blue.light, fontWeight: 'bold' }}
          />
        )}
      >
        <RxHistory tabLabel="History"></RxHistory>
        <Text tabLabel="Refill">Refill</Text>
        <Text tabLabel="New">New</Text>
      </ScrollableTabView>
    </View>
  );
};
export default Rx;
