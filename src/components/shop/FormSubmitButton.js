import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';

import {Colors} from '../../constants/Colors';

const activeColor = `rgb(${Colors.primary})`;
const inactiveColor = `rgba(${Colors.primary}, 0.2)`;

const FormSubmitButton = ({
  disabled,
  shallowAppearance,
  isSubmitting,
  submitHandler,
  title,
}) => {
  return (
    <TouchableOpacity
      disabled={disabled}
      style={{
        ...styles.submit,
        backgroundColor: shallowAppearance ? inactiveColor : activeColor,
      }}
      activeOpacity={0.8}
      onPress={submitHandler}>
      <Text style={styles.buttonTitle}>{title}</Text>
      <ActivityIndicator
        animating={isSubmitting}
        style={styles.spinner}
        color="white"
        size="small"
      />
    </TouchableOpacity>
  );
};

export default FormSubmitButton;

const styles = StyleSheet.create({
  submit: {
    height: 64,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    flexDirection: 'row',
  },
  buttonTitle: {
    fontFamily: 'Lato-Bold',
    fontSize: 18,
    color: 'white',
  },
  spinner: {
    left: 15,
  },
});
