import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, TextInput} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

import {Colors} from '../../constants/Colors';

const validColor = `rgb(${Colors.accentTwo})`;
const invalidColor = `rgb(${Colors.danger})`;
const primaryColor = `rgb(${Colors.primary})`;
const borderDefaultColor = `rgba(${Colors.text.primary}, 0.08)`;
const labelDefaultColor = `rgb(${Colors.text.secondary})`;

const getColor = (isValid, finishedEditing, focused, defaultColor) => {
  if (focused) {
    return primaryColor;
  }

  if (!isValid && finishedEditing) {
    return invalidColor;
  }

  if (isValid && finishedEditing) {
    return validColor;
  }

  return defaultColor;
};

const LabledInput = ({
  label,
  value,
  keyboardType,
  onChangeText,
  validators,
  isValid,
  setIsValid,
  required,
  multiline,
  large,
  autoCapitalize,
  secure,
  placeholder,
  Icon,
  triggerValidation,
  error,
}) => {
  const [focus, setFocus] = useState(false);
  const [finishedEditing, setFinishedEditing] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const borderColor = getColor(
    isValid,
    finishedEditing,
    focus,
    borderDefaultColor,
  );
  const labelColor = getColor(
    isValid,
    finishedEditing,
    focus,
    labelDefaultColor,
  );

  const validateInput = text => {
    setFocus(false);
    setFinishedEditing(true);

    if (required && !text?.length) {
      setErrorMessage('This field must be provided');
      return;
    }

    if (validators) {
      let foundError = false;
      validators.forEach(validator => {
        const {isValid, error} = validator(text);
        if (!isValid) {
          setErrorMessage(error);
          foundError = true;
          return;
        }
      });

      if (foundError) return;
    }

    setIsValid(true);
    setErrorMessage('');
  };

  useEffect(() => {
    if (triggerValidation) {
      validateInput(value);
    }

    if (error) {
      setErrorMessage(error);
    }
  }, [triggerValidation, error]);

  return (
    <View style={styles.container}>
      <View
        style={{
          ...styles.formControl,
          borderColor: borderColor,
          height: large ? null : 64,
          minHeight: large ? 200 : null,
        }}>
        <Text
          style={{
            ...styles.label,
            color: labelColor,
          }}>
          {label}
        </Text>
        <View style={styles.inputContainer}>
          {Icon && (
            <View
              style={{
                justifyContent: 'center',
                marginStart: 20,
              }}>
              <Icon color={focus ? primaryColor : labelDefaultColor} />
            </View>
          )}
          <TextInput
            autoCorrect={false}
            autoCapitalize={autoCapitalize}
            multiline={multiline}
            secureTextEntry={secure}
            placeholder={placeholder}
            placeholderTextColor={`rgba(${Colors.text.primary}, 0.2)`}
            style={{
              ...styles.input,
              textAlignVertical: large ? 'top' : 'center',
            }}
            onFocus={() => {
              setFocus(true);
              if (isValid) setIsValid(false);
              setFinishedEditing(false);
            }}
            onBlur={() => {
              validateInput(value);
            }}
            value={value}
            keyboardType={keyboardType ? keyboardType : 'default'}
            onChangeText={onChangeText}
            onChange={() => setErrorMessage('')}
            onSubmitEditing={() => validateInput(value)}
          />
          {isValid && finishedEditing && (
            <AntDesign
              style={styles.icon}
              name="checkcircle"
              size={20}
              color={validColor}
            />
          )}
          {!isValid && finishedEditing && (
            <AntDesign
              style={styles.icon}
              name="exclamationcircleo"
              size={20}
              color={invalidColor}
            />
          )}
        </View>
      </View>
      {errorMessage.length ? (
        <Text style={styles.erroMessage}>{errorMessage}</Text>
      ) : null}
    </View>
  );
};

export default LabledInput;

const styles = StyleSheet.create({
  container: {marginBottom: 30},

  formControl: {
    borderWidth: 1,
    borderRadius: 20,
  },
  label: {
    fontFamily: 'Lato-Bold',
    fontSize: 16,
    height: 24,
    textAlignVertical: 'center',
    backgroundColor: `rgb(${Colors.background})`,
    alignSelf: 'flex-start',
    marginStart: 20,
    position: 'absolute',
    top: -12,
    paddingHorizontal: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    flex: 1,
    paddingEnd: 20,
  },
  input: {
    fontFamily: 'Lato-Regular',
    fontSize: 16,
    color: `rgb(${Colors.text.primary})`,
    fontWeight: 'normal',
    flex: 1,
    paddingTop: 12,
    paddingHorizontal: 20,
  },
  icon: {
    alignSelf: 'center',
  },
  erroMessage: {
    color: invalidColor,
    fontFamily: 'Lato-Regular',
    marginTop: 5,
    marginStart: 5,
  },
});
