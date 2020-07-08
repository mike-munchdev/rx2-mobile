import React, { useState, useEffect, Fragment, useContext, FC } from 'react';

import { Text, View, FlatList, TouchableOpacity, Modal } from 'react-native';

import { FontAwesome5 } from '@expo/vector-icons';

import { useMutation } from '@apollo/react-hooks';
import { useNavigation } from '@react-navigation/native';

import colors from '../../constants/colors';
import { truncate } from '../../utils/strings';
import styles from './styles';

import { Loading } from '../Loading';
import {
  removeRxFromCartCompleted,
  removeRxFromCartError,
  REMOVE_RX_FROM_CART,
} from '../../graphql/queries/customer/customer';

import { AlertHelper } from '../../utils/alert';

import { RoundedIconButton } from '../Buttons';
import { HorizontalRule } from '../HorizontalRule';

export interface IShoppingCartListProps {
  customer: any;
  pharmacy: any;
  location: any;
}
const ShoppingCartList: FC<IShoppingCartListProps> = ({
  customer,
  pharmacy,
  location,
}) => {
  const [rxHistory, setShoppingCartList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [removeRxFromCart] = useMutation(REMOVE_RX_FROM_CART, {
    fetchPolicy: 'no-cache',
    onError: removeRxFromCartError,
    onCompleted: removeRxFromCartCompleted,
  });

  const renderItem = ({ item }: { item: any }) => {
    return (
      <View style={styles.item}>
        <View style={styles.itemContainer}>
          <View style={[styles.leftItemContent]}>
            <Text style={[styles.text, styles.drugText]}>
              {truncate(item.rx.drug.brand_name.toUpperCase(), 30)}
            </Text>
            {item.price > 0 ? (
              <Text style={[styles.text, styles.priceText]}>
                Price: ${item.price.toFixed(2)}
              </Text>
            ) : null}
          </View>
          <View style={[styles.rightItemContent, { justifyContent: 'center' }]}>
            <RoundedIconButton
              size={30}
              borderColor={colors.red.normal}
              backgroundColor={colors.white.normal}
              iconName="trash-alt"
              iconSize={16}
              borderWidth={1}
              iconColor={colors.red.normal}
              onPress={async () => {
                const result = await removeRxFromCart({
                  variables: {
                    input: { rxId: item.id, customerId: customer.id },
                  },
                });
              }}
            >
              <FontAwesome5
                name="prescription-bottle"
                color={colors.blue.light}
                size={20}
              />
            </RoundedIconButton>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.flatList}>
      <FlatList
        data={customer.cart}
        renderItem={renderItem}
        keyExtractor={(item, index) => item.id}
        ItemSeparatorComponent={() => (
          <HorizontalRule styles={{ marginHorizontal: 10 }} />
        )}
      />
    </View>
  );
};
export default ShoppingCartList;
