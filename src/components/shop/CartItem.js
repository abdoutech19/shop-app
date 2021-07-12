import React, {useContext, useEffect} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FastImage from 'react-native-fast-image';
import Animated, {
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSequence,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

import {Colors} from '../../constants/Colors';
import {Context as ProductContext} from '../../context/product/ProductContext';
import QuantityButton from './QuantityButton';

const CartItem = ({
  cartItem: {id, title, total, imageUrl, quantity},
  index,
  onAdd,
  onDecrease,
  onRemove,
  deletedIndex,
}) => {
  const {state} = useContext(ProductContext);

  const selectedProduct = state.products.find(prod => prod.id === id);

  // Animation...

  const opacity = useSharedValue(0);
  const itemIsLoaded = useSharedValue(false);

  const positionAnimStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      top: withDelay(
        (index - deletedIndex.value) * 80,
        withSpring(index * 115, {stiffness: 150, damping: 16}),
      ),
      transform: !itemIsLoaded.value
        ? [{translateY: interpolate(opacity.value, [0, 1], [50, 0])}]
        : [{scale: interpolate(opacity.value, [1, 0], [1, 0])}],
    };
  });

  useEffect(() => {
    opacity.value = withDelay(
      index * 150,
      withSpring(
        1,
        {stiffness: 150, damping: 14},
        () => (itemIsLoaded.value = true),
      ),
    );
  }, []);

  return (
    <Animated.View style={[styles.container, positionAnimStyle]}>
      <FastImage style={styles.image} source={{uri: imageUrl}} />
      <View style={styles.details}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.total}>${total.toFixed(2)}</Text>
      </View>
      <View style={styles.actionSection}>
        <View style={styles.actionContainer}>
          <QuantityButton
            decrease
            onPress={() => onDecrease(selectedProduct)}
          />
          <Text style={styles.quantity}>x{quantity}</Text>
          <QuantityButton increase onPress={() => onAdd(selectedProduct)} />
        </View>
      </View>
      <TouchableOpacity
        style={styles.delete}
        onPress={() => {
          if (opacity.value === 1) {
            deletedIndex.value = index;
            opacity.value = withSequence(
              withTiming(1.05, {duration: 100}),
              withTiming(0, {duration: 200}, () =>
                runOnJS(onRemove)(selectedProduct),
              ),
            );
          }
        }}>
        <Ionicons name="close" size={18} color="white" />
      </TouchableOpacity>
    </Animated.View>
  );
};

export default React.memo(CartItem);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: 'white',
    flex: 1,
    height: 100,
    borderRadius: 16,
    marginBottom: 15,
    paddingHorizontal: 15,
    paddingVertical: 10,
    justifyContent: 'space-between',
    position: 'absolute',
    top: 0,
  },
  image: {
    height: '100%',
    width: '20%',
    borderRadius: 8,
  },
  details: {
    paddingLeft: 10,
    marginVertical: 10,
    justifyContent: 'space-between',
    width: '35%',
  },
  title: {
    fontFamily: 'Lato-Regular',
    fontSize: 16,
    color: `rgb(${Colors.text.primary})`,
  },
  total: {
    fontFamily: 'Lato-Black',
    fontSize: 18,
    color: `rgb(${Colors.text.primary})`,
    marginTop: 10,
  },
  actionSection: {
    justifyContent: 'flex-end',
    width: '40%',
  },
  actionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 5,
  },
  quantity: {
    fontFamily: 'Lato-Black',
    fontSize: 16,
    color: `rgb(${Colors.text.primary})`,
  },
  delete: {
    height: 22,
    width: 22,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: `rgba(${Colors.primaryDark}, 0.15)`,
    borderRadius: 50,
  },
});
