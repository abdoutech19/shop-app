import React, {useContext} from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';

import {Context as CartContext} from '../../context/cart/CartContext';

import {Colors} from '../../constants/Colors';

const ActionButton = ({title, onPress, Icon, prodId}) => {
  const {
    state: {items},
  } = useContext(CartContext);

  const isInCart = prodId && items.hasOwnProperty(`${prodId}`);

  return (
    <TouchableOpacity
      style={[
        styles.action,
        {
          backgroundColor: isInCart
            ? `rgba(${Colors.primary}, 0.3)`
            : `rgb(${Colors.primary})`,
        },
      ]}
      disabled={isInCart}
      activeOpacity={0.9}
      onPress={onPress}>
      <Icon />
      <Text style={styles.actionTitle}>{title}</Text>
    </TouchableOpacity>
  );
};

export default React.memo(ActionButton);

const styles = StyleSheet.create({
  action: {
    height: 50,
    borderRadius: 10,
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    // backgroundColor: `rgb(${Colors.primary})`,
  },
  actionTitle: {
    fontFamily: 'Lato-Bold',
    fontSize: 18,
    color: 'white',
    marginLeft: 8,
  },
});
