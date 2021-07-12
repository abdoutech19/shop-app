import React, {useEffect, useReducer, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';

import {Colors} from '../../constants/Colors';
import ErrorModal from './ErrorModal';
import FormSubmitButton from './FormSubmitButton';
import {
  SET_EMAIL,
  SET_EMAIL_VALIDATION,
  SET_PASSWORD,
  SET_PASSWORD_VALIDATION,
} from './inputTypes';
import LabledInput from './LabledInput';
import Icon from '../icons/LightIcons';

const primaryColor = `rgb(${Colors.primary})`;
const labelDefaultColor = `rgb(${Colors.text.secondary})`;

const emailValidator = text => {
  const regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

  if (!regex.test(String(text).toLocaleLowerCase())) {
    return {isValid: false, error: 'Please enter a valid email address'};
  }
  return {isValid: true};
};
const passValidator = text => {
  if (text.length < 8) {
    return {
      isValid: false,
      error: 'Password should be at least 8 characters long',
    };
  }
  return {isValid: true};
};

const initialState = {
  email: {value: '', isValid: false, error: ''},
  password: {value: '', isValid: false, error: ''},
  formIsValid: false,
};

const reducer = (state, {type, payload}) => {
  switch (type) {
    case SET_EMAIL: {
      return {...state, email: {...state.email, value: payload}};
    }

    case SET_PASSWORD: {
      return {...state, password: {...state.password, value: payload}};
    }

    case SET_EMAIL_VALIDATION: {
      return {
        ...state,
        email: {...state.email, isValid: payload.isValid, error: payload.error},
        formIsValid: state.password.isValid && payload.isValid,
      };
    }

    case SET_PASSWORD_VALIDATION: {
      return {
        ...state,
        password: {
          ...state.password,
          isValid: payload.isValid,
          error: payload.error,
        },
        formIsValid: state.email.isValid && payload.isValid,
      };
    }

    default:
      return state;
  }
};

const AuthForm = ({buttonTitle, onSubmit}) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [alert, setAlert] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [actionDisabled, setActionDisabled] = useState(false);
  const [triggerValidation, setTriggerValidation] = useState(false);

  const toggleAlert = () => {
    setAlert(value => !value);
  };

  const formSubmitHandler = async () => {
    if (state.formIsValid) {
      setIsSubmitting(true);
      setActionDisabled(true);
      try {
        await onSubmit({
          email: state.email.value,
          password: state.password.value,
        });
      } catch (err) {
        const errResponse = err.response?.data?.error;
        switch (errResponse?.message) {
          case 'EMAIL_EXISTS':
            dispatch({
              type: SET_EMAIL_VALIDATION,
              payload: {
                isValid: false,
                error: 'This email address already exists',
              },
            });
            break;

          case 'EMAIL_NOT_FOUND':
            dispatch({
              type: SET_EMAIL_VALIDATION,
              payload: {
                isValid: false,
                error: 'This email address does not exist',
              },
            });
            break;

          case 'INVALID_PASSWORD':
            dispatch({
              type: SET_PASSWORD_VALIDATION,
              payload: {
                isValid: false,
                error: 'This password is not valid',
              },
            });
            break;

          case errResponse?.message ?? true:
            console.log(errResponse.errors);
            dispatch({
              type: SET_PASSWORD_VALIDATION,
              payload: {
                isValid: false,
                error: errResponse.message,
              },
            });
            break;

          default:
            toggleAlert();

            break;
        }
        setActionDisabled(false);
        setIsSubmitting(false);
      }
    } else {
      if (!state.email.value || !state.password.value) {
        setTriggerValidation(true);
      }
    }
  };

  useEffect(() => {
    if (triggerValidation) {
      setTriggerValidation(false);
    }
  }, [triggerValidation]);

  return (
    <View>
      <LabledInput
        required
        autoCapitalize="none"
        label="Email"
        placeholder="somebody@example.com"
        Icon={({color}) => <Icon name="letter-o" size={20} color={color} />}
        keyboardType="email-address"
        value={state.email.value}
        isValid={state.email.isValid}
        validators={[emailValidator]}
        triggerValidation={triggerValidation}
        error={state.email.error}
        onChangeText={newTxt => {
          dispatch({type: SET_EMAIL, payload: newTxt});
        }}
        setIsValid={isValid =>
          dispatch({type: SET_EMAIL_VALIDATION, payload: {isValid, error: ''}})
        }
      />
      <LabledInput
        required
        secure
        placeholder="Enter your passowrd"
        Icon={({color}) => <Icon name="lock-o" size={20} color={color} />}
        autoCapitalize="none"
        label="Password"
        value={state.password.value}
        isValid={state.password.isValid}
        validators={[passValidator]}
        triggerValidation={triggerValidation}
        error={state.password.error}
        onChangeText={newTxt => {
          dispatch({type: SET_PASSWORD, payload: newTxt});
        }}
        setIsValid={isValid =>
          dispatch({
            type: SET_PASSWORD_VALIDATION,
            payload: {isValid, error: ''},
          })
        }
      />
      <FormSubmitButton
        disabled={actionDisabled}
        title={buttonTitle}
        isSubmitting={isSubmitting}
        submitHandler={formSubmitHandler}
      />
      <ErrorModal
        isVisible={alert}
        title="Oops"
        message="Please check your internet connection"
        buttonTitle="Try Again"
        onCancel={() => toggleAlert()}
        Icon={() => (
          <Icon
            name="wifi-off"
            size={32}
            color={`rgba(${Colors.primary}, 0.7)`}
          />
        )}
      />
    </View>
  );
};

export default AuthForm;

const styles = StyleSheet.create({});
