import React, { Fragment, useState, FC } from 'react';
import { FieldProps } from 'formik';
import { Text, View, TextInput, TouchableOpacity } from 'react-native';
import { FontAwesome, Feather } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';
import colors from '../../constants/colors';
import styles from './styles';

interface ITextInputProps {
  placeholder?: string;
  label?: string;
  secureTextEntry?: boolean;
  iconName?: string;
  name: string;
  value: string;
  errors: any[];
  touched: any[];
  handleChange: (name: string) => void;
  headerStyles?: object;
}

const AnimatableTextInput: FC<ITextInputProps> = ({
  placeholder,
  label,
  secureTextEntry,
  iconName,
  name,
  value,
  errors,
  touched,
  handleChange,
  headerStyles,
}) => {
  const [secureTextVisible, setSecureTextVisible] = useState(false);
  const getIcon = (iconName?: string, secureTextEntry?: boolean) => {
    if (secureTextEntry) {
      return (
        <Feather name={iconName || ''} color={colors.blue.dark} size={20} />
      );
    } else {
      return (
        <FontAwesome name={iconName || ''} color={colors.blue.dark} size={20} />
      );
    }
  };

  return (
    <Fragment>
      <Text style={[styles.textFooter, headerStyles]}>{label}</Text>
      <View style={styles.action}>
        {getIcon(iconName, secureTextEntry)}
        <TextInput
          placeholder={placeholder}
          style={styles.textInput}
          secureTextEntry={secureTextEntry}
          onChangeText={handleChange}
          autoCapitalize="none"
          value={value}
        />
        {secureTextVisible ? (
          <TouchableOpacity
            onPress={() => setSecureTextVisible(!secureTextEntry)}
          >
            <Feather
              name={`${secureTextVisible ? 'eye' : 'eye-off'}`}
              color={`${
                secureTextVisible ? colors.gray.normal : colors.green.normal
              }`}
              size={20}
            />
          </TouchableOpacity>
        ) : null}
        {/* checkTextInputChange ? (
          <Animatable.View animation="bounceIn">
            <Feather
              name="check-circle"
              color={colors.green.normal}
              size={20}
            />
          </Animatable.View>
        ) : null */}
      </View>
      {touched[name] !== undefined && errors[name] !== undefined ? (
        <Text style={styles.errorText}>{errors[name]}</Text>
      ) : null}
    </Fragment>
  );
};

export default AnimatableTextInput;
