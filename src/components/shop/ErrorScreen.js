import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Feather from 'react-native-vector-icons/Feather';

import {Colors} from '../../constants/Colors';

const textSecondaryColor = `rgba(${Colors.text.secondary}, 0.7)`;
const invalidColor = `rgb(${Colors.danger})`;
const resetColor = `rgb(${Colors.warning})`;

const ErrorScreen = ({errorMessage, onRetry}) => {
  return (
    <View style={styles.centered}>
      <Feather name="wifi-off" size={24} color={textSecondaryColor} />
      <Text style={styles.errorMessage}>{errorMessage}</Text>
      <TouchableOpacity
        activeOpacity={0.7}
        style={styles.redoButton}
        onPress={onRetry}>
        <Fontisto name="redo" size={18} color="white" />
        <Text style={styles.redoTitle}>Retry</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ErrorScreen;

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 100,
  },
  errorMessage: {
    fontFamily: 'Lato-Bold',
    color: textSecondaryColor,
    fontSize: 16,
    marginTop: 10,
  },
  redoButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
    backgroundColor: resetColor, //'transparent',
    height: 48,
    width: 80,
    marginTop: 30,
  },
  redoTitle: {
    fontFamily: 'Lato-Bold',
    color: 'white', //invalidColor,
    marginStart: 10,
    fontSize: 16,
  },
});
