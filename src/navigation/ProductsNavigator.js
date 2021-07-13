import React, {useContext, useEffect} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';

import ProductsScreen from '../screens/ProductsScreen';
import ProductDetailScreen from '../screens/ProductDetailScreen';
import {Colors} from '../constants/Colors';
import CartScreen from '../screens/CartScreen';
import CartIcon from '../components/shop/CartIconComponent';
import {Context as CartContext} from '../context/cart/CartContext';
import Icon from '../components/icons/LightIcons';
import LeftIcon from '../components/icons/LeftIcon';
import FriesOddIcon from '../components/icons/FriesOddIcon';

const Stack = createStackNavigator();

const textPrimaryColor = `rgb(${Colors.text.primary})`;

const screenOptions = {
  headerTitleStyle: {
    fontFamily: 'Lato-Black',
    fontSize: 28,
    marginLeft: 20,
  },
  headerStyle: {
    height: 120,
  },
};

const ProductsNavigator = () => {
  const {clearCart} = useContext(CartContext);

  useEffect(() => {
    return () => {
      clearCart();
    };
  }, []);
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen
        name="Products"
        component={ProductsScreen}
        options={({navigation}) => ({
          title: 'Marketplace',
          headerRight: () => (
            <CartIcon
              navigation={navigation}
              color={textPrimaryColor}
              style={styles.cart}
            />
          ),
          headerRightContainerStyle: styles.rightIcon,
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
              <FriesOddIcon
                height={52}
                width={52}
                weight={1}
                color={textPrimaryColor}
              />
            </TouchableOpacity>
          ),
          headerLeftContainerStyle: styles.leftIcon,
        })}
      />
      <Stack.Screen
        name="ProductDetail"
        component={ProductDetailScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Cart"
        component={CartScreen}
        options={({navigation}) => ({
          title: 'My Cart',
          headerLeft: () => (
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => navigation.goBack()}>
              <LeftIcon
                height={42}
                width={42}
                weight={1}
                color={textPrimaryColor}
              />
            </TouchableOpacity>
          ),
        })}
      />
    </Stack.Navigator>
  );
};

export default ProductsNavigator;

const styles = StyleSheet.create({
  backButton: {
    height: 42,
    width: 42,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 20,
    borderWidth: 1,
    borderRadius: 10,
  },
  rightIcon: {
    marginRight: 30,
  },
  leftIcon: {
    marginLeft: 20,
  },
  cart: {
    height: 40,
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
