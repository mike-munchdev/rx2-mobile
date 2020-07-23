import React, { useState, useEffect, Fragment } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  FlatList,
  GestureResponderEvent,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';
import { NewRxHeader } from '../../components/Headers';
import styles from './styles';
import colors from '../../constants/colors';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import { NoRecords } from '../../components/NoRecords';
import { Card } from 'react-native-elements';
import { AlertHelper } from '../../utils/alert';
import { useMutation } from '@apollo/react-hooks';
import { ReactNativeFile } from 'apollo-upload-client';
import {
  UPLOAD_RX_PHOTO,
  uploadRxPhotoError,
  uploadRxPhotoCompleted,
} from '../../graphql/queries/customer/customer';

interface ILinksProps {
  id: string;
  title: string;
  iconName: string;
  onPress: Function;
}

const NewRx = () => {
  const [pickedImage, setPickedImage] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();
  const [uploadRxPhoto] = useMutation(UPLOAD_RX_PHOTO, {
    fetchPolicy: 'no-cache',
    onError: uploadRxPhotoError(setIsLoading),
    onCompleted: uploadRxPhotoCompleted(setIsLoading),
  });

  const links: ILinksProps[] = [
    {
      id: '1',
      title: 'Upload Rx Photo (Library)',
      iconName: 'file-image',
      onPress: async () => {
        await photoLibraryHandler();
      },
    },
    {
      id: '2',
      title: 'Upload Rx Photo (Camera)',
      iconName: 'camera',
      onPress: async () => {
        await cameraHandler();
      },
    },
    // {
    //   id: '3',
    //   title: 'Scan Rx Bottle',
    //   iconName: 'prescription-bottle',
    //   onPress: () => {
    //     alert('Scan Rx Bottle');
    //   },
    // },
    // {
    //   id: '4',
    //   title: 'Enter Rs Manually',
    //   iconName: 'file-prescription',
    //   onPress: () => {
    //     alert('Enter Rs Manually');
    //   },
    // },
  ];
  const renderItem = ({ item }: { item: ILinksProps }) => {
    return (
      <TouchableOpacity
        key={item.id}
        style={styles.item}
        onPress={() => item.onPress()}
      >
        <FontAwesome5 name={item.iconName} size={64} color={colors.blue.dark} />
        <Text style={styles.text}>{item.title}</Text>
      </TouchableOpacity>
    );
  };

  const verifyPermissions = async () => {
    const result = await Permissions.askAsync(
      Permissions.CAMERA_ROLL,
      Permissions.CAMERA
    );
    if (result.status !== 'granted') {
      AlertHelper.show(
        'error',
        'Insufficient permissions!',
        'You need to grant camera permissions to use this app.'
      );
      return false;
    }
    return true;
  };

  const photoLibraryHandler = async () => {
    const hasPermission = await verifyPermissions();
    if (!hasPermission) {
      return;
    }
    const image = await ImagePicker.launchImageLibraryAsync();

    if (!image.cancelled) {
      if (pickedImage) {
        const file = new ReactNativeFile({
          uri: image.uri,
          name: 'a.jpg',
          type: 'image/jpeg',
        });
        const result = await uploadRxPhoto({
          variables: {
            file: file,
          },
        });
      }
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
      if (pickedImage) {
        const file = new ReactNativeFile({
          uri: image.uri,
          name: 'a.jpg',
          type: 'image/jpeg',
        });
        const result = await uploadRxPhoto({
          variables: {
            file: file,
          },
        });
      }
    }
  };

  return (
    <Fragment>
      <NewRxHeader
        title="New Rx"
        onLeftPress={() => alert('leftPressed')}
        onRightPress={() => navigation.pop()}
      />
      <View style={styles.flatList}>
        <FlatList
          data={links}
          renderItem={renderItem}
          keyExtractor={(item, index) => item.id}
        />
      </View>
    </Fragment>
  );
};
export default NewRx;
