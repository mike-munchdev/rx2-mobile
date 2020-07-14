import React, { useContext, FC } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  TouchableHighlight,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import styles from './styles';
import colors from '../../constants/colors';

export interface ISelectPharmacyHeaderProps {
  title: string;
}
const SelectPharmacyHeader: FC<ISelectPharmacyHeaderProps> = ({ title }) => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.header}>
      <View style={styles.headerLeft}></View>

      <View style={styles.headerCenter}>
        <Text style={styles.headerCenterTitle}>{title}</Text>
      </View>
      <View style={styles.headerRight}>
        <TouchableOpacity
          style={styles.rightIcon}
          onPress={() => navigation.pop()}
        >
          <FontAwesome
            name="times-circle"
            color={colors.white.normal}
            size={25}
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default SelectPharmacyHeader;
