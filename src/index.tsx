import React, { createContext, useState, useEffect } from 'react';
import { ApolloProvider } from '@apollo/react-hooks';
import DropdownAlert from 'react-native-dropdownalert';
import { AppLoading } from 'expo';
import { Asset } from 'expo-asset';
import * as Font from 'expo-font';
import {
  FontAwesome,
  FontAwesome5,
  Feather,
  MaterialIcons,
} from '@expo/vector-icons';

import Navigation from './config/Navigation';
import client from './graphql/client';

import { AlertHelper } from './utils/alert';

export default () => {
  const [token, setToken] = useState<string | undefined | null>(null);
  const [isReady, setIsReady] = useState(false);

  const cacheImages = (images: []) => {
    return images.map((image) => {
      if (typeof image === 'string') {
        return Image.prefetch(image);
      } else {
        return Asset.fromModule(image).downloadAsync();
      }
    });
  };

  const cacheFonts = (fonts: []) => {
    return fonts.map((font) => Font.loadAsync(font));
  };

  const _loadAssetsAsync = async () => {
    const imageAssets = cacheImages([require('../assets/logo2.png')]);

    const fontAssets = cacheFonts([
      FontAwesome.font,
      MaterialIcons.font,
      Feather.font,
    ]);

    await Promise.all([...imageAssets, ...fontAssets]);
  };

  if (!isReady) {
    return (
      <AppLoading
        startAsync={_loadAssetsAsync}
        onFinish={() => {
          setIsReady(true);
        }}
        onError={console.warn}
      />
    );
  }

  return (
    <ApolloProvider client={client}>
      <Navigation />
      <DropdownAlert
        ref={(ref: DropdownAlert) => {
          AlertHelper.setDropDown(ref);
        }}
        onClose={() => AlertHelper.invokeOnClose()}
      />
    </ApolloProvider>
  );
};
