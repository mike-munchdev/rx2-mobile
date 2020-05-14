import React, { useState, useEffect } from 'react';

import { Text, View, FlatList, TouchableOpacity } from 'react-native';
import moment from 'moment';
import styles from './styles';
import { useFakeRefills } from '../../hooks/fakeData';
import { IRefill } from '../../interfaces/refills';
import { LinearGradient } from 'expo-linear-gradient';
import { AntDesign, FontAwesome5 } from '@expo/vector-icons';
import colors from '../../constants/colors';
import { truncate } from '../../utils/strings';

const RxHistory = () => {
  const refills = useFakeRefills(10);
  const renderItem = ({ item }: { item: IRefill }) => {
    const lastFilledDate = moment(item.lastFilled);
    return (
      <LinearGradient
        colors={colors.blue.buttonGradientDark}
        start={{ x: 0, y: 1 }}
        style={styles.item}
      >
        <View style={styles.itemContainer}>
          <View style={styles.leftItemContent}>
            <Text style={[styles.text, styles.drugText]}>
              {truncate(item.drugName, 30)}
            </Text>

            <Text
              style={[styles.text, styles.doseText]}
            >{`Dose: ${item.drugDose}`}</Text>
            <Text
              style={[styles.text, styles.rxNumberText]}
            >{`Rx #${item.rxNumber}`}</Text>
            <Text style={[styles.text, styles.lastFilledText]}>
              {`Last Filled: ${
                lastFilledDate.isValid()
                  ? lastFilledDate.format('MM/DD/YYYY')
                  : ''
              }`}
            </Text>
          </View>
          <View style={styles.rightItemContent}>
            <TouchableOpacity style={styles.button}>
              <FontAwesome5
                name="prescription-bottle-alt"
                color={colors.blue.light}
                size={20}
              />
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.flatList}>
        <FlatList
          data={refills}
          renderItem={renderItem}
          keyExtractor={(item, index) => item.id}
        />
      </View>
    </View>
  );
};
export default RxHistory;
