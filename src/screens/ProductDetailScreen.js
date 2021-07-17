import React, {useCallback, useContext, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  StatusBar,
  ScrollView,
  useWindowDimensions,
} from 'react-native';
import Icon from '../components/icons/LightIcons';

import {Context as ProductContext} from '../context/product/ProductContext';
import {Context as CartContext} from '../context/cart/CartContext';
import {Colors} from '../constants/Colors';
import LinearGradient from 'react-native-linear-gradient';
import ActionComponent from '../components/shop/ActionComponent';
import {useNavigationState} from '@react-navigation/core';
import CartIcon from '../components/shop/CartIconComponent';
import LeftIcon from '../components/icons/LeftIcon';
import {PanGestureHandler, State} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import FavoriteButton from '../components/shop/FavoriteButton';

const CartIconOutline = () => <Icon name="cart-o" color="white" size={20} />;
const snapValue = 24;

const ProductDetailScreen = ({route, navigation}) => {
  const {
    state: {products, favorites},
    setProductsNavKey,
    addToFavorites,
    removeFromFavorites,
  } = useContext(ProductContext);

  const {addToCart} = useContext(CartContext);

  const prodId = route.params?.prodId;
  const selectedProd = products.find(prod => prod.id === prodId);

  const isFavorite = favorites.some(prod => prod.id === prodId);

  const key = useNavigationState(state => state.key);
  useEffect(() => {
    setProductsNavKey(key);

    return () => {
      setProductsNavKey('');
    };
  }, []);

  const onAddToCart = useCallback(() => addToCart(selectedProd), []);

  if (!selectedProd) {
    return null;
  }

  // Animation...
  const dimentions = useWindowDimensions();
  const sheetHeight = useSharedValue(0);
  const scale = useSharedValue(1);

  const sheetAnimtedStyle = useAnimatedStyle(() => ({
    height: sheetHeight.value,
  }));

  const handleAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{scale: withSpring(scale.value, {stiffness: 300})}],
    backgroundColor:
      scale.value > 1
        ? `rgba(${Colors.primaryDark}, 0.5)`
        : `rgba(${Colors.primaryDark}, 0.3)`,
  }));

  const resizeEventHandler = useAnimatedGestureHandler({
    onStart: (event, ctx) => {
      ctx.startY = event.absoluteY;
      ctx.startHeight = sheetHeight.value;
    },
    onActive: (event, ctx) => {
      sheetHeight.value = withSpring(
        ctx.startHeight + (ctx.startY - event.absoluteY),
      );
    },
    onEnd: (_, ctx) => {
      if (
        sheetHeight.value - ctx.startHeight > snapValue &&
        ctx.startHeight < dimentions.height / 1.5
      ) {
        sheetHeight.value = withSpring(dimentions.height / 1.5);
      } else if (
        sheetHeight.value - ctx.startHeight < snapValue &&
        ctx.startHeight < dimentions.height / 1.5
      ) {
        sheetHeight.value = withSpring(dimentions.height / 3);
      }
      if (
        sheetHeight.value - ctx.startHeight > snapValue &&
        ctx.startHeight > dimentions.height / 3
      ) {
        sheetHeight.value = withSpring(dimentions.height / 1.5);
      } else if (
        sheetHeight.value - ctx.startHeight < snapValue &&
        ctx.startHeight > dimentions.height / 3
      ) {
        sheetHeight.value = withSpring(dimentions.height / 3);
      }
    },
  });

  const touchEventHandler = ({nativeEvent}) => {
    if (
      nativeEvent.state === State.BEGAN ||
      nativeEvent.state === State.ACTIVE
    ) {
      scale.value = 1.3;
      return;
    }
    scale.value = 1;
  };

  useEffect(() => {
    sheetHeight.value = withSpring(dimentions.height / 3, {
      damping: 9,
      stiffness: 50,
    });
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.image}>
        <Image style={styles.image} source={{uri: selectedProd.imageUrl}} />
        <FavoriteButton
          product={selectedProd}
          isFavorite={isFavorite}
          addToFavorite={addToFavorites}
          removeFromFavorite={removeFromFavorites}
        />
      </View>
      <LinearGradient
        colors={[
          `rgba(${Colors.primaryDarker}, 0.70)`,
          `rgba(${Colors.primaryDarker}, 0)`,
        ]}
        style={styles.gradient}
        start={{x: 0, y: 0}}
        end={{x: 0, y: 1}}>
        <TouchableOpacity style={styles.backButton} onPress={navigation.goBack}>
          <LeftIcon height={42} width={42} weight={1.3} color="white" />
        </TouchableOpacity>
        <CartIcon style={styles.cart} navigation={navigation} color="white" />
      </LinearGradient>
      <Animated.View style={sheetAnimtedStyle}>
        <View style={styles.prodInfo}>
          <PanGestureHandler
            onHandlerStateChange={touchEventHandler}
            onGestureEvent={resizeEventHandler}>
            <Animated.View style={styles.handleContainer}>
              <Animated.View style={[styles.handle, handleAnimatedStyle]} />
            </Animated.View>
          </PanGestureHandler>
          <Text style={styles.title}>{selectedProd.title}</Text>
          <ScrollView>
            <Text style={styles.description}>{selectedProd.description}</Text>
          </ScrollView>
        </View>
      </Animated.View>
      <ActionComponent
        actionTitle="To cart"
        label="Price"
        amount={selectedProd.price}
        Icon={CartIconOutline}
        onActionPress={onAddToCart}
        actionEnabled
      />
    </View>
  );
};

export default ProductDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    height: '20%',
    width: '100%',
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  image: {
    position: 'relative',
    flex: 1,
    width: '100%',
  },
  prodInfo: {
    paddingHorizontal: 40,
    backgroundColor: `rgb(${Colors.background})`,
    borderRadius: 70,
    flex: 1,
    top: -55,
  },
  handleContainer: {
    height: 50,
    width: '100%',
    justifyContent: 'center',
  },
  handle: {
    height: 5,
    width: 30,
    alignSelf: 'center',
    borderRadius: 50,
  },
  title: {
    fontFamily: 'Lato-Black',
    fontSize: 32,
    color: `rgb(${Colors.text.primary})`,
    marginBottom: 30,
  },
  description: {
    fontFamily: 'Lato-Regular',
    fontSize: 18,
    color: `rgba(${Colors.text.primary}, 0.7)`,
    paddingRight: '20%',
  },
  backButton: {
    height: 42,
    width: 42,
    marginLeft: 30,
    marginTop: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 10,
    borderColor: 'white',
  },
  cart: {
    height: 40,
    width: 40,
    marginRight: 30,
    marginTop: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
