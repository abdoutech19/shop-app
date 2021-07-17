import {useNavigation} from '@react-navigation/native';
import React, {useCallback} from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import {BoxShadow} from 'react-native-shadow';
import FastImage from 'react-native-fast-image';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  useAnimatedGestureHandler,
  interpolate,
  useAnimatedRef,
  useDerivedValue,
  measure,
  runOnUI,
} from 'react-native-reanimated';
import {PanGestureHandler} from 'react-native-gesture-handler';

import {Colors} from '../../constants/Colors';
import ActionButton from './ActionButton';

const CARD_HEIGHT = 300;

const shadowOpts = {
  width: 320,
  height: 260,
  color: '#0f0521',
  border: 33,
  radius: 20,
  opacity: 0.1,
  x: 15,
  y: 25,
  style: {
    // The parent view that contains all the content

    height: CARD_HEIGHT,
    width: 350,
    marginBottom: 30,
    marginHorizontal: 30,
    marginLeft: 30,
  },
};

const ProductItem = ({
  product,
  onActionPress,
  navigationRoute,
  ActionIcon,
  actionTitle,
  params,
  hideActionButton,
}) => {
  const navigation = useNavigation();

  const onItemPress = useCallback(() => {
    navigation.navigate(navigationRoute, {
      prodId: product.id,
      title: product.title,
    });
  }, [product]);

  const actionPressHandler = useCallback(() => {
    if (params) {
      onActionPress(product, params);
      return;
    }

    onActionPress(product);
  }, [product, params]);

  return (
    <BoxShadow setting={shadowOpts}>
      <TouchableOpacity activeOpacity={0.8} onPress={onItemPress}>
        <View style={styles.contentContainer}>
          <Animated.Image
            style={[styles.image]}
            source={{uri: product.imageUrl}}
          />
          <View style={styles.infoSection}>
            <View style={styles.details}>
              <Text style={styles.title}>{product.title}</Text>
              <Text style={styles.price}>${product.price.toFixed(2)}</Text>
            </View>
            {!hideActionButton && (
              <ActionButton
                title={actionTitle}
                Icon={ActionIcon}
                onPress={actionPressHandler}
              />
            )}
          </View>
        </View>
      </TouchableOpacity>
    </BoxShadow>
  );
};

export default React.memo(ProductItem);

const styles = StyleSheet.create({
  contentContainer: {
    height: '100%',
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 20,
    overflow: 'hidden',
    flexDirection: 'row',
    paddingLeft: 20,
    paddingVertical: 20,
  },
  image: {
    flex: 5,
    borderRadius: 10,
  },
  infoSection: {
    flex: 3,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  details: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontFamily: 'Lato-Regular',
    fontSize: 20,
    color: `rgb(${Colors.text.primary})`,
    marginBottom: 8,
  },
  price: {
    fontFamily: 'Lato-Black',
    fontSize: 24,
    color: `rgb(${Colors.text.primary})`,
  },
});
