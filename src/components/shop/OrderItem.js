import React, {useCallback} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Icon from '../icons/LightIcons';

import {Colors} from '../../constants/Colors';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  useAnimatedRef,
  runOnUI,
  measure,
} from 'react-native-reanimated';

const LIST_ITEM_HEIGHT = 60;

const OrderItem = ({orderItem: {date, totalAmount, items}}) => {
  // Animations...
  const rotation = useSharedValue(0);
  const height = useSharedValue(0);
  const aRef = useAnimatedRef();

  const iconAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{rotate: `${rotation.value}deg`}],
  }));

  const listAnimatedStyle = useAnimatedStyle(() => ({
    height: 1 + height.value,
    opacity: height.value === 0 ? 0 : 1,
    marginBottom: height.value > 0 ? 5 : 0,
  }));

  const handleItemPress = useCallback(() => {
    if (height.value === 0 && rotation.value < 180) {
      runOnUI(() => {
        'worklet';
        height.value = withSpring(measure(aRef).height, {
          damping: 15,
          stiffness: 150,
        });
      })();
      rotation.value = withSpring(180, {
        damping: 20,
        stiffness: 250,
      });
    } else if (height.value > 0 && rotation.value > 0) {
      runOnUI(() => {
        'worklet';
        height.value = withSpring(0, {
          damping: 13,
          stiffness: 130,
          overshootClamping: true,
        });
      })();
      rotation.value = withSpring(0, {
        damping: 20,
        stiffness: 250,
      });
    }
  }, []);

  return (
    <View>
      <TouchableOpacity activeOpacity={0.75} onPress={handleItemPress}>
        <View style={styles.container}>
          <Text style={styles.date}>{date}</Text>
          <View style={styles.detailsContainer}>
            <Text style={styles.totalAmount}>${totalAmount.toFixed(2)}</Text>
            <TouchableOpacity onPress={handleItemPress}>
              <Animated.View style={[iconAnimatedStyle, {marginEnd: 10}]}>
                <View
                  style={{
                    backgroundColor: `rgb(${Colors.text.secondary})`,
                    padding: 5,
                    borderRadius: 50,
                  }}>
                  <Icon name="down" color="white" size={10} />
                </View>
              </Animated.View>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
      <Animated.View style={[listAnimatedStyle, styles.listAnimatedContainer]}>
        <View ref={aRef} style={styles.listContainer}>
          {items.map(cartItem => {
            return (
              <View key={cartItem.id} style={styles.cartItem}>
                <View style={styles.imageContainer}>
                  <Image
                    style={styles.image}
                    source={{uri: cartItem.imageUrl}}
                  />
                  <View style={styles.titleContainer}>
                    <Text style={styles.title}>{cartItem.title}</Text>
                    <Text style={styles.quantity}>x{cartItem.quantity}</Text>
                  </View>
                </View>
                <Text style={styles.total}>${cartItem.total.toFixed(2)}</Text>
              </View>
            );
          })}
        </View>
      </Animated.View>
    </View>
  );
};

export default OrderItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: LIST_ITEM_HEIGHT,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 5,
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  detailsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  totalAmount: {
    marginEnd: 20,
    fontFamily: 'Lato-Black',
    fontSize: 20,
    color: `rgb(${Colors.text.primary})`,
  },
  date: {
    fontFamily: 'Lato-Bold',
    fontSize: 16,
    color: `rgb(${Colors.text.primary})`,
  },
  listContainer: {
    backgroundColor: 'rgba(255,255,255, 0.7)',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingTop: 20,
  },
  listAnimatedContainer: {
    overflow: 'hidden',
    marginTop: 5,
  },
  cartItem: {
    flexDirection: 'row',
    height: 50,
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  imageContainer: {
    flexDirection: 'row',
  },
  image: {
    height: '100%',
    width: 50,
    borderRadius: 8,
  },
  titleContainer: {
    marginStart: 10,
    justifyContent: 'center',
  },
  title: {
    fontFamily: 'Lato-Bold',
    fontSize: 16,
    color: `rgb(${Colors.text.primary})`,
    marginBottom: 10,
  },
  quantity: {
    fontFamily: 'Lato-Bold',
    fontSize: 16,
    color: `rgb(${Colors.text.secondary})`,
  },
  total: {
    fontFamily: 'Lato-Black',
    fontSize: 18,
    color: `rgb(${Colors.text.primary})`,
    alignSelf: 'center',
    marginEnd: 10,
  },
});
