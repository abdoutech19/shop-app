import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Modal from 'react-native-modal';

import {Colors} from '../../constants/Colors';

const invalidColor = `rgba(${Colors.danger}, 0.7)`;
const textColor = `rgb(${Colors.text.primary})`;

const ErrorModal = ({
  isVisible,
  onCancel,
  title,
  message,
  buttonTitle,
  Icon,
}) => {
  return (
    <Modal
      backdropTransitionOutTiming={0}
      style={styles.centered}
      isVisible={isVisible}
      animationIn="fadeInDown"
      animationOut="fadeOutDown">
      <View style={styles.conatiner}>
        <View
          style={{
            padding: 10,
            borderRadius: 50,
            backgroundColor: `rgba(${Colors.primary}, 0.1)`,
          }}>
          <Icon />
        </View>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.message}>{message}</Text>
        <TouchableOpacity style={styles.cancelButton} onPress={onCancel}>
          <Text style={styles.buttonTitle}>{buttonTitle}</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default ErrorModal;

const styles = StyleSheet.create({
  conatiner: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 16,
    alignItems: 'center',
    paddingVertical: 20,
  },
  centered: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontFamily: 'Lato-Black',
    fontSize: 20,
    color: textColor,
    marginTop: 15,
  },
  message: {
    marginTop: 15,
    marginBottom: 30,
    fontFamily: 'Lato-Regular',
    fontSize: 16,
    color: textColor,
  },
  cancelButton: {
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    width: '60%',
    borderRadius: 16,
  },
  buttonTitle: {
    color: invalidColor,
    fontFamily: 'Lato-Regular',
    fontSize: 18,
  },
});
