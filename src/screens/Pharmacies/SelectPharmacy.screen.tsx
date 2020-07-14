import React, { useState, useEffect, Fragment, useContext } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Platform,
  FlatList,
  Image,
} from 'react-native';

import styles from './styles';
import { useNavigation } from '@react-navigation/native';

import { SelectPharmacyHeader } from '../../components/Headers';
import { RxRunrContext } from '../../config/context';
import { HorizontalRule } from '../../components/HorizontalRule';
import colors from '../../constants/colors';

import { AlertHelper } from '../../utils/alert';
import { Constants } from 'expo';
import { getLocation } from '../../utils/location';
import { LoadingModal } from '../../components/Loading';
import {
  GET_PHARMACIES_NEAR_LOCATION,
  pharmacyError,
  getPharmaciesNearLocationCompleted,
} from '../../graphql/queries/pharmacy/pharmacies';
import { useLazyQuery } from '@apollo/react-hooks';
import PharmacyOptions from '../../components/Formatting/PharmacyOptions';
import PharmacyDistance from '../../components/Formatting/PharmacyDistance';
import PharmacyOpen from '../../components/Formatting/PharmacyOpen';
import { PharmacyAddress, PharmacyHours } from '../../components/Formatting';
import { Card } from 'react-native-elements';
import { ProgressDialog } from 'react-native-simple-dialogs';

const SelectPharmacy = () => {
  const [pharmacies, setPharmacies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigation = useNavigation();
  const {
    setLocationContext,
    location,
    pharmacy,
    customer,
    setPharmacyContext,
  } = useContext(RxRunrContext);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      if (Platform.OS === 'android' && !Constants.isDevice) {
        AlertHelper.show(
          'error',
          'Error',
          'Oops, this will not work on Sketch in an Android emulator. Try it on your device!'
        );
      } else {
        try {
          const location = await getLocation();
          setLocationContext(location);
        } catch (e) {
          AlertHelper.show(
            'error',
            'Error',
            'There was an error retreiving your location.  Please enter your address manually.'
          );
        } finally {
          setIsLoading(false);
        }
      }
    })();
  }, []);

  useEffect(() => {
    if (location) {
      getPharmaciesNearLocation({
        variables: {
          input: {
            latitude: location.latitude,
            longitude: location.longitude,
            distance: customer.settings.searchDistance,
          },
        },
      });
    }
  }, [location]);

  const [getPharmaciesNearLocation] = useLazyQuery(
    GET_PHARMACIES_NEAR_LOCATION,
    {
      fetchPolicy: 'no-cache',
      onError: pharmacyError,
      onCompleted: getPharmaciesNearLocationCompleted(
        setPharmacies,
        setIsLoading
      ),
    }
  );

  const renderItem = ({ item }: { item: any }) => {
    return (
      <Card>
        <View style={styles.itemContainer}>
          <View style={styles.leftItemContent}>
            {/* <Image source={require('../../assets/icon.png')} /> */}
            <View>
              <Text
                style={{
                  color: colors.blue.dark,
                  fontWeight: 'bold',
                }}
              >
                {item.name}
              </Text>
              <PharmacyAddress pharmacy={item} />
            </View>
          </View>
          <View style={styles.rightItemContent}>
            <TouchableOpacity
              onPress={() => {
                setPharmacyContext(item);
                navigation.pop();
              }}
            >
              <Text>SELECT</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View>
          <View>
            <View>
              <PharmacyDistance pharmacy={item} />
            </View>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
            >
              <PharmacyHours pharmacy={item} />
              <PharmacyOpen pharmacy={item} />
            </View>
          </View>

          <View>
            <PharmacyOptions pharmacy={item} />
          </View>
        </View>
      </Card>
    );
  };

  return (
    <Fragment>
      <SelectPharmacyHeader title="Select Pharmacy" />
      <ProgressDialog
        visible={isLoading}
        message="Loading..."
        activityIndicatorColor={colors.blue.dark}
        activityIndicatorSize="large"
      />
      <View style={styles.flatList}>
        <FlatList
          data={pharmacies}
          renderItem={renderItem}
          keyExtractor={(item, index) => item.id}
          ListEmptyComponent={() => (
            <View>
              <Text>No Records Found</Text>
            </View>
          )}
        />
      </View>
    </Fragment>
  );
};
export default SelectPharmacy;
