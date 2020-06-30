import React, { useState, useEffect, Fragment } from 'react';

import { Text, View, FlatList, TouchableOpacity, Modal } from 'react-native';
import moment from 'moment';
import styles from './styles';
import { useFakeRefills } from '../../hooks/fakeData';

import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome5 } from '@expo/vector-icons';

import { useLazyQuery, useMutation } from '@apollo/react-hooks';
import colors from '../../constants/colors';
import { truncate } from '../../utils/strings';

import {
  GET_MY_RX_HISTORY,
  rxError,
  getMyRxHistoryCompleted,
} from '../../graphql/queries/rx/rxs';
import { Loading } from '../Loading';
import {
  addRxToCartError,
  addRxToCartCompleted,
  ADD_RX_TO_CART,
} from '../../graphql/queries/customer/customer';

const RxHistory = () => {
  const [rxHistory, setRxHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [addRxToCart] = useMutation(ADD_RX_TO_CART, {
    onError: addRxToCartError,
    onCompleted: addRxToCartCompleted,
  });

  const [getMyRxHistory] = useLazyQuery(GET_MY_RX_HISTORY, {
    fetchPolicy: 'network-only',
    onError: rxError,
    onCompleted: getMyRxHistoryCompleted(setRxHistory, setIsLoading),
  });

  useEffect(() => {
    getMyRxHistory();
  }, [getMyRxHistory]);

  const renderItem = ({ item }: { item: any }) => {
    const lastFilledDate =
      item.refills.length > 0
        ? moment(item.refills[item.refills.length - 1].filledDate)
        : moment(item.filledDate);
    const nextFillDate = moment(lastFilledDate).add(item.daySupply, 'days');
    return (
      <LinearGradient
        colors={colors.blue.buttonGradientDark}
        start={{ x: 0, y: 1 }}
        style={styles.item}
      >
        <View style={styles.itemContainer}>
          <View style={styles.leftItemContent}>
            <Text style={[styles.text, styles.drugText]}>
              {truncate(item.drug.brand_name.toUpperCase(), 30)}
            </Text>
            <Text
              style={[styles.text, styles.rxNumberText]}
            >{`Rx #${item.rxNumber}`}</Text>
            <Text
              style={[styles.text, styles.doseText]}
            >{`Dose: ${item.dosage}`}</Text>
            <Text style={[styles.text, styles.doseText]}>{`Doctor: ${
              item.doctor.lastName
            }, ${item.doctor.firstName}${
              item.doctor.middleName ? ` ${item.doctor.middleName}` : ''
            }`}</Text>
            <Text style={[styles.text, styles.lastFilledText]}>
              {`Last Filled: ${
                lastFilledDate.isValid()
                  ? lastFilledDate.format('MM-DD-YYYY')
                  : ''
              }`}
            </Text>
            <Text style={[styles.text, styles.lastFilledText]}>
              {`Next Filled: ${
                nextFillDate.isValid() ? nextFillDate.format('MM-DD-YYYY') : ''
              }`}
            </Text>
          </View>
          <View style={styles.rightItemContent}>
            <TouchableOpacity
              style={styles.button}
              onPress={async () => {
                const result = await addRxToCart({
                  variables: {
                    input: { rxId: item.id, price: 50, quantity: 1 },
                  },
                });
              }}
            >
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

  if (isLoading) return <Loading />;

  return (
    <View style={styles.container}>
      <View style={styles.flatList}>
        <FlatList
          data={rxHistory}
          renderItem={renderItem}
          keyExtractor={(item, index) => item.id}
        />
      </View>
    </View>
  );
};
export default RxHistory;
