import React, { useState, Fragment, useContext } from 'react';

import { Text, View, FlatList, Image, Platform } from 'react-native';

import { ProgressDialog, ConfirmDialog } from 'react-native-simple-dialogs';
import { Card } from 'react-native-elements';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';
import Constants from 'expo-constants';
// import { v4 as uuidv4 } from 'uuid';
import short from 'short-uuid';
import axios from 'axios';
import colors from '../../constants/colors';
import styles from './styles';

import { NewRxHeader } from '../../components/Headers';
import { RoundedIconButton } from '../../components/Buttons';
import { NoRecords } from '../../components/NoRecords';
import { verifyPermissions } from '../../utils/camera';
import { AlertHelper } from '../../utils/alert';
import { RxRunrContext } from '../../config/context';
import asyncForEach from '../../utils/asyncForEach';
import { uploadImageOnS3 } from '../../utils/upload';
import { NODE_ENV } from '../../hooks/serverInfo';
import {
  ADD_RX_TO_CART,
  ADD_NEW_RXS_TO_QUEUE,
  addNewRxsToQueueError,
  addNewRxsToQueueCompleted,
} from '../../graphql/queries/customer/customer';
import { useMutation } from '@apollo/react-hooks';

export interface INewRx {
  id: string;
  image: any;
}

const NewRx = () => {
  const [currentItem, setCurrentItem] = useState<INewRx | null | undefined>(
    null
  );
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showUploadConfirm, setShowUploadConfirm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const {
    newRx,
    addNewRxToContext,
    removeNewRxFromContext,
    clearNewRxContext,
    pharmacy,
    setCustomerContext,
    customer,
  } = useContext(RxRunrContext);

  const [addNewRxsToQueue] = useMutation(ADD_NEW_RXS_TO_QUEUE, {
    fetchPolicy: 'no-cache',
    onError: addNewRxsToQueueError(setIsLoading),
    onCompleted: addNewRxsToQueueCompleted(
      setIsLoading,
      setCustomerContext,
      clearNewRxContext
    ),
  });
  const navigation = useNavigation();
  const renderItem = ({ item }: { item: INewRx }) => {
    return (
      <Card>
        <View style={styles.itemContainer}>
          <View style={styles.leftItemContent}>
            <Image source={{ uri: item.image.uri }} style={styles.image} />
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
                setShowDeleteConfirm(true);
                setCurrentItem(item);
              }}
            />
          </View>
        </View>
      </Card>
    );
  };
  const photoLibraryHandler = async () => {
    const hasPermission = await verifyPermissions();
    if (!hasPermission) {
      return;
    }
    const image = await ImagePicker.launchImageLibraryAsync();

    if (!image.cancelled) {
      addNewRxToContext({ id: short.generate(), image });
    }
  };
  const cameraHandler = async () => {
    const hasPermission = await verifyPermissions();
    if (!hasPermission) {
      return;
    }
    const image = await ImagePicker.launchCameraAsync({
      allowsEditing: false,
    });

    if (!image.cancelled) {
      addNewRxToContext({ id: short.generate(), image });
    }
  };

  const createFormData = (photo: any, body: any) => {
    const data = new FormData();

    data.append('file', {
      name: photo.uri,
      type: photo.type,
      uri:
        Platform.OS === 'android'
          ? photo.uri
          : photo.uri.replace('file://', ''),
    });

    Object.keys(body).forEach((key) => {
      data.append(key, body[key]);
    });

    return data;
  };

  return (
    <Fragment>
      <NewRxHeader title="New Rx" onRightPress={() => navigation.pop()} />
      <ProgressDialog
        visible={isLoading}
        message="Loading..."
        activityIndicatorColor={colors.blue.dark}
        activityIndicatorSize="large"
      />
      <ConfirmDialog
        title="Upload New Rx"
        message={`Are you sure you send the Rx to ${
          pharmacy ? pharmacy.name : ''
        } ?`}
        onTouchOutside={() => setShowUploadConfirm(false)}
        visible={showUploadConfirm}
        negativeButton={{
          title: 'NO',
          onPress: () => {
            setShowUploadConfirm(false);
          },
          disabled: false,
          titleStyle: {
            color: 'blue',
            colorDisabled: 'aqua',
          },
          style: {
            backgroundColor: 'transparent',
            backgroundColorDisabled: 'transparent',
          },
        }}
        positiveButton={{
          title: 'YES',
          onPress: async () => {
            const uris = [];
            setShowUploadConfirm(false);
            setIsLoading(true);
            await asyncForEach(newRx, async (rx, index, array) => {
              try {
                // upload to cloudinary

                const url =
                  Constants.manifest.extra.rxrunr[String(NODE_ENV)]
                    .mediaServerUrl;
                const res = await axios.post(
                  url,
                  createFormData(rx.image, {
                    upload_preset:
                      Constants.manifest.extra.rxrunr[String(NODE_ENV)]
                        .uploadPreset,
                  })
                );

                uris.push(res.data.secure_url);
              } catch (error) {
                setIsLoading(false);
                AlertHelper.show('error', 'Error', error.text);
              }
            });
            try {
              const result = await addNewRxsToQueue({
                variables: {
                  input: { customerId: customer.id, uris },
                },
              });
              AlertHelper.show(
                'success',
                'Rx Uploaded',
                'You will receive alerts when your Rx is ready!'
              );
            } catch (error) {
              setIsLoading(false);
              AlertHelper.show('error', 'Error', error.message);
            }
          },
        }}
      />
      <ConfirmDialog
        title="Delete Rx"
        message="Are you sure you want to delete?"
        onTouchOutside={() => setShowDeleteConfirm(false)}
        visible={showDeleteConfirm}
        negativeButton={{
          title: 'NO',
          onPress: () => {
            setCurrentItem(null);
            setShowDeleteConfirm(false);
          },
          disabled: false,
          titleStyle: {
            color: 'blue',
            colorDisabled: 'aqua',
          },
          style: {
            backgroundColor: 'transparent',
            backgroundColorDisabled: 'transparent',
          },
        }}
        positiveButton={{
          title: 'YES',
          onPress: async () => {
            if (currentItem) {
              removeNewRxFromContext(currentItem.id);
              setShowDeleteConfirm(false);
            }
          },
        }}
      />
      <View style={styles.container}>
        {!isLoading && newRx.length === 0 ? (
          <NoRecords text="No Rx Found" />
        ) : (
          <View style={styles.flatList}>
            <FlatList
              data={newRx}
              renderItem={renderItem}
              keyExtractor={(item) => item.id}
            />
          </View>
        )}
        <View
          style={{
            // position: 'absolute',
            alignItems: 'flex-end',
            // right: 20,
            justifyContent: 'space-between',
            width: '100%',
            paddingHorizontal: 10,
            flexDirection: 'row',
            bottom: 30,
          }}
        >
          <RoundedIconButton
            size={60}
            borderColor={colors.blue.dark}
            backgroundColor={colors.white.normal}
            iconName="file-image"
            iconSize={36}
            iconColor={colors.blue.dark}
            onPress={async () => {
              try {
                await photoLibraryHandler();
              } catch (error) {
                AlertHelper.show('error', 'Error', error.message);
              }
            }}
            text="Choose Photo"
          />
          <RoundedIconButton
            size={60}
            borderColor={colors.blue.dark}
            backgroundColor={colors.white.normal}
            iconName="upload"
            iconSize={36}
            iconColor={colors.blue.dark}
            onPress={() => setShowUploadConfirm(true)}
            text="Send to Pharmacy"
            disabled={newRx.length === 0}
          />
          <RoundedIconButton
            size={60}
            borderColor={colors.blue.dark}
            backgroundColor={colors.white.normal}
            iconName="camera"
            iconSize={36}
            iconColor={colors.blue.dark}
            onPress={async () => {
              await cameraHandler();
            }}
            text="Capture Photo"
          />

          {/* <RoundedIconButton
            size={60}
            borderColor={colors.blue.dark}
            backgroundColor={colors.white.normal}
            iconName="file-prescription"
            iconSize={36}
            iconColor={colors.blue.dark}
            onPress={() => alert('manual entry')}
            text="Enter Manually"
          />
          <RoundedIconButton
            size={60}
            borderColor={colors.blue.dark}
            backgroundColor={colors.white.normal}
            iconName="barcode"
            iconSize={36}
            iconColor={colors.blue.dark}
            onPress={() => alert('scan')}
            text="Scan Barcode"
          /> */}
        </View>
      </View>
    </Fragment>
  );
};
export default NewRx;
