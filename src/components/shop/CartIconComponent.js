import React, {useContext, useEffect} from 'react';
import {StyleSheet, TouchableOpacity, View, Text} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  interpolate,
} from 'react-native-reanimated';

import {Colors} from '../../constants/Colors';
import {Context as CartContext} from '../../context/cart/CartContext';
import CartIcon from '../icons/CartIcon';

const invalidColor = `rgb(${Colors.danger})`;

const CartIconComponent = ({navigation, color, style}) => {
  const {
    state: {items},
  } = useContext(CartContext);

  const numofAllItems = Object.values(items).length;

  // Animations...

  const opacity = useSharedValue(0);

  const badgeAnimationStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{scale: interpolate(opacity.value, [0, 1], [0, 1])}],
  }));

  useEffect(() => {
    if (numofAllItems) {
      opacity.value = withSpring(1, {
        stiffness: 400,
      });
    } else {
      opacity.value = 0;
    }
  }, [numofAllItems]);

  return (
    <TouchableOpacity style={style} onPress={() => navigation.navigate('Cart')}>
      <View>
        <CartIcon color={color} height={52} width={52} />

        {Boolean(numofAllItems) && (
          <Animated.View style={[styles.badge, badgeAnimationStyle]}>
            <Text style={styles.numOfItems}>{numofAllItems}</Text>
          </Animated.View>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default React.memo(CartIconComponent);

const styles = StyleSheet.create({
  badge: {
    position: 'absolute',
    right: 8,
    top: 4,
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
