import React, { useState, useEffect, Fragment, useContext } from 'react';

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
import { LoadingModal, Loading } from '../Loading';
import {
  addRxToCartError,
  addRxToCartCompleted,
  ADD_RX_TO_CART,
} from '../../graphql/queries/customer/customer';
import { RxRunrContext } from '../../config/context';
import { AlertHelper } from '../../utils/alert';
import { RxHeader } from '../Headers';
import { useNavigation } from '@react-navigation/native';
import { RoundedIconButton } from '../Buttons';
import { color } from 'react-native-reanimated';

const RxHistory = () => {
  const [rxHistory, setRxHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { customer, setCustomerContext } = useContext(RxRunrContext);

  const [addRxToCart] = useMutation(ADD_RX_TO_CART, {
    fetchPolicy: 'no-cache',
    onError: addRxToCartError,
    onCompleted: addRxToCartCompleted(setIsLoading, setCustomerContext),
  });

  const [getMyRxHistory] = useLazyQuery(GET_MY_RX_HISTORY, {
    fetchPolicy: 'no-cache',
    onError: rxError,
    onCompleted: getMyRxHistoryCompleted(setRxHistory, setIsLoading),
  });

  useEffect(() => {
    getMyRxHistory();
  }, [getMyRxHistory]);

  const shouldDisplayAddToCartButton = (item: any, cart: []) => {
    const alreadyInCart = cart.findIndex((c) => c.rx.id === item.id) >= 0;
    if (alreadyInCart) return false;

    const lastFilledDate =
      item.refills.length > 0
        ? moment(item.refills[item.refills.length - 1].filledDate)
        : moment(item.filledDate);
    const nextFillDate = moment(lastFilledDate).add(item.daySupply, 'days');
    const today = moment();
    // console.log('today', today);
    // console.log('nextFillDate', nextFillDate);

    const daysUntilNextRefill = today.diff(nextFillDate, 'days');

    return daysUntilNextRefill > 0;
  };

  const renderItem = ({ item }: { item: any }) => {
    const lastFilledDate =
      item.refills.length > 0
        ? moment(item.refills[item.refills.length - 1].filledDate)
        : moment(item.filledDate);
    const nextFillDate = moment(lastFilledDate).add(item.daySupply, 'days');
    const displayAddToCart = shouldDisplayAddToCartButton(item, customer.cart);
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
            {displayAddToCart ? (
              <RoundedIconButton
                size={30}
                borderColor={colors.blue.sky}
                backgroundColor={colors.white.normal}
                iconName="prescription-bottle"
                iconSize={20}
                iconColor={colors.blue.light}
                borderWidth={1}
                onPress={async () => {
                  // const cartIndex = customer.cart.findIndex(
                  //   (c: any) => c.rx.id === item.id
                  // );
                  // if (cartIndex >= 0) {
                  //   AlertHelper.show(
                  //     'warn',
                  //     'Duplicate Rx',
                  //     'The Rx is already in your cart'
                  //   );
                  // } else {
                  const result = await addRxToCart({
                    variables: {
                      input: { rxId: item.id, quantity: 1 },
                    },
                  });
                  // }
                }}
              >
                <FontAwesome5
                  name="prescription-bottle"
                  color={colors.blue.light}
                  size={20}
                />
              </RoundedIconButton>
            ) : null}
          </View>
        </View>
      </LinearGradient>
    );
  };

  // if (isLoading) return <Loading />;

  return (
    <Fragment>
      <LoadingModal isVisible={isLoading} animationType="none" />
      <View style={styles.flatList}>
        <FlatList
          data={rxHistory}
          renderItem={renderItem}
          keyExtractor={(item, index) => item.id}
        />
      </View>
    </Fragment>
  );
};
export default RxHistory;
