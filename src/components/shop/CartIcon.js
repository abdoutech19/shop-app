import React, {useContext, useEffect} from 'react';
import {StyleSheet, TouchableOpacity, View, Text} from 'react-native';
import Icon from '../icons/LightIcons';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  interpolate,
} from 'react-native-reanimated';

import {Colors} from '../../constants/Colors';
import {Context as CartContext} from '../../context/cart/CartContext';

const invalidColor = `rgb(${Colors.danger})`;

const CartIcon = ({navigation, color, style}) => {
  const {
    state: {items},
  } = useContext(CartContext);

  const numofAllItems = Object.values(items).reduce(
    (sum, item) => sum + item.quantity,
    0,
  );

  // Animations...

  const opacity = useSharedValue(0);

  const badgeAnimationStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{scale: interpolate(opacity.value, [0, 1], [0, 1])}],
  }));

  useEffect(() => {
    if (numofAllItems) {
      opacity.value = withSpring(1, {
        damping: 10,
        stiffness: 400,
      });
    } else {
      opacity.value = 0;
    }
  }, [numofAllItems]);

  return (
    <TouchableOpacity style={style} onPress={() => navigation.navigate('Cart')}>
      <View>
        <Icon name="cart" color={color} size={26} />

        {Boolean(numofAllItems) && (
          <Animated.View style={[styles.badge, badgeAnimationStyle]}>
            <Text style={styles.numOfItems}>{numofAllItems}</Text>
          </Animated.View>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default React.memo(CartIcon);

const styles = StyleSheet.create({
  badge: {
    position: 'absolute',
    right: -8,
    top: -8,
    backgroundColor: invalidColor,
    height: 16,
    width: 16,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    transform: [{scale: 0}],
  },
  numOfItems: {
    color: 'white',
    fontFamily: 'Lato-Black',
    fontSize: 10,
  },
});
