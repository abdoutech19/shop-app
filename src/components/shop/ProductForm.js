import React, {useReducer, useState, useEffect, useContext} from 'react';
import {StyleSheet, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Feather from 'react-native-vector-icons/Feather';

import {Colors} from '../../constants/Colors';
import LabledInput from './LabledInput';
import {
  SET_TITLE,
  SET_IMAGE,
  SET_PRICE,
  SET_DESCRIPTION,
  SET_TITLE_VALIDATION,
  SET_IMAGE_VALIDATION,
  SET_PRICE_VALIDATION,
  SET_DESCRIPTION_VALIDATION,
} from './inputTypes';
import ErrorModal from './ErrorModal';
import FormSubmitButton from './FormSubmitButton';
import {Context as AuthContext} from '../../context/auth/AuthContext';

const priceValidator = text => {
  if (isNaN(text) || parseFloat(text) < 0) {
    return {isValid: false, error: 'Please enter a valid positive price'};
  }
  return {isValid: true};
};

const reducer = (state, {type, payload}) => {
  switch (type) {
    case SET_TITLE: {
      return {...state, title: {...state.title, value: payload}};
    }
    case SET_IMAGE: {
      return {...state, imageUrl: {...state.imageUrl, value: payload}};
    }
    case SET_PRICE: {
      return {...state, price: {...state.price, value: payload}};
    }
    case SET_DESCRIPTION: {
      return {...state, description: {...state.description, value: payload}};
    }
    case SET_TITLE_VALIDATION: {
      return {...state, title: {...state.title, isValid: payload}};
    }
    case SET_IMAGE_VALIDATION: {
      return {...state, imageUrl: {...state.imageUrl, isValid: payload}};
    }
    case SET_PRICE_VALIDATION: {
      return {...state, price: {...state.price, isValid: payload}};
    }
    case SET_DESCRIPTION_VALIDATION: {
      return {...state, description: {...state.description, isValid: payload}};
    }

    default:
      return state;
  }
};

const ProductForm = ({submitButtonTitle, product, onSubmit}) => {
  const initialFormState = {
    title: {value: product?.title, isValid: product ? true : false},
    imageUrl: {value: product?.imageUrl, isValid: product ? true : false},
    price: {value: product?.price, isValid: product ? true : false},
    description: {value: product?.description, isValid: product ? true : false},
  };

  const [{title, imageUrl, price, description}, dispatch] = useReducer(
    reducer,
    initialFormState,
  );
  const [formIsValid, setFormIsValid] = useState(false);
  const [actionDisabled, setActionDisabled] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [alert, setAlert] = useState(false);
  const navigation = useNavigation();

  const {
    state: {userId},
  } = useContext(AuthContext);

  useEffect(() => {
    if (
      title.value &&
      imageUrl.value &&
      price.value &&
      description.value &&
      title.isValid &&
      imageUrl.isValid &&
      price.isValid &&
      description.isValid
    ) {
      setFormIsValid(true);
    } else {
      setFormIsValid(false);
    }
  }, [
    title.value,
    imageUrl.value,
    price.value,
    description.value,
    title.isValid,
    imageUrl.isValid,
    price.isValid,
    description.isValid,
    formIsValid,
  ]);

  const prodData = product
    ? {
        id: product.id,
        ownerId: product.ownerId,
        title: title.value,
        imageUrl: imageUrl.value,
        description: description.value,
        price: product.price,
      }
    : {
        ownerId: userId,
        title: title.value,
        imageUrl: imageUrl.value,
        description: description.value,
        price: parseFloat(price.value),
      };

  const formSubmitHandler = async () => {
    setIsSubmitting(true);
    setActionDisabled(true);

    try {
      await onSubmit(prodData);
      navigation.goBack();
    } catch (err) {
      if (!err.response) {
        toggleAlert();
      }
      setActionDisabled(false);
    }

    setIsSubmitting(false);
  };

  const toggleAlert = () => {
    setAlert(value => !value);
  };

  return (
    <View style={styles.form}>
      <LabledInput
        required
        autoCapitalize="sentences"
        value={title.value}
        label="Title"
        onChangeText={newTxt => dispatch({type: SET_TITLE, payload: newTxt})}
        isValid={title.isValid}
        setIsValid={val => dispatch({type: SET_TITLE_VALIDATION, payload: val})}
      />
      <LabledInput
        required
        autoCapitalize="none"
        value={imageUrl.value}
        label="Image URL"
        onChangeText={newTxt => dispatch({type: SET_IMAGE, payload: newTxt})}
        isValid={imageUrl.isValid}
        setIsValid={val => dispatch({type: SET_IMAGE_VALIDATION, payload: val})}
      />
      <LabledInput
        required
        value={price.value?.toString()}
        label="Price"
        keyboardType="numeric"
        onChangeText={
          product?.price
            ? null
            : newTxt => dispatch({type: SET_PRICE, payload: newTxt})
        }
        validators={[priceValidator]}
        isValid={price.isValid}
        setIsValid={val => dispatch({type: SET_PRICE_VALIDATION, payload: val})}
      />
      <LabledInput
        required
        multiline
        large
        autoCapitalize="sentences"
        value={description.value}
        label="Description"
        onChangeText={newTxt =>
          dispatch({type: SET_DESCRIPTION, payload: newTxt})
        }
        isValid={description.isValid}
        setIsValid={val =>
          dispatch({type: SET_DESCRIPTION_VALIDATION, payload: val})
        }
      />
      <FormSubmitButton
        shallowAppearance={!formIsValid}
        disabled={!formIsValid || actionDisabled}
        title={submitButtonTitle}
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
          <Feather
            name="wifi-off"
            size={32}
            color={`rgba(${Colors.primary}, 0.8)`}
          />
        )}
      />
    </View>
  );
};

export default ProductForm;

const styles = StyleSheet.create({
  form: {
    paddingTop: 10,
    paddingHorizontal: 25,
  },
});
