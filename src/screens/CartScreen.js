import React, {useContext, useState, useCallback, useRef} from 'react';
import {StyleSheet, StatusBar, View, ScrollView} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';

import ActionComponent from '../components/shop/ActionComponent';
import CartItem from '../components/shop/CartItem';
import {Context as CartContext} from '../context/cart/CartContext';
import {Context as OrdersContext} from '../context/orders/OrdersContext';
import {Context as AuthContext} from '../context/auth/AuthContext';
import {Colors} from '../constants/Colors';
import ErrorModal from '../components/shop/ErrorModal';
import {useSharedValue} from 'react-native-reanimated';
import Icon from '../components/icons/LightIcons';

const planeIcon = () => <Icon name="plane-o" color="white" size={20} />;

const CartScreen = ({navigation}) => {
  const {
    state: {items, totalAmount},
    clearCart,
    addToCart,
    decreaseQuantity,
    removeFromCart,
  } = useContext(CartContext);

  const {addOrder} = useContext(OrdersContext);
  const {
    state: {userId},
  } = useContext(AuthContext);
  const [alert, setAlert] = useState(false);

  const toggleAlert = () => {
    setAlert(value => !value);
  };

  const data = Object.values(items);
  const handleOrderPress = useCallback(async () => {
    try {
      await addOrder(Object.values(items), totalAmount, userId);
      clearCart();
      navigation.goBack();
    } catch (err) {
      if (err.message === 'Network Error') {
        toggleAlert();
        throw err;
      }
    }
  }, [navigation, items, totalAmount, userId]);

  const onAdd = useCallback(prod => addToCart(prod), []);
  const onDecrease = useCallback(prod => decreaseQuantity(prod), []);
  const onRemove = useCallback(prod => removeFromCart(prod), []);

  const scrollHeight = useRef(data.length * 115);
  const deletedIndex = useSharedValue(0);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={{height: scrollHeight.current}}>
          {data.map((cartItem, index) => (
            <CartItem
              key={cartItem.id}
              cartItem={cartItem}
              index={index}
              onAdd={onAdd}
              onDecrease={onDecrease}
              onRemove={onRemove}
              deletedIndex={deletedIndex}
            />
          ))}
        </View>
      </ScrollView>
      <ActionComponent
        withSpinner
        actionTitle="Order now"
        label="Total amount"
        amount={totalAmount}
        Icon={planeIcon}
        onActionPress={handleOrderPress}
        actionEnabled={Object.values(items).length}
      />
      {alert && (
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
              color={`rgba(${Colors.primary}, 0.8)`}
            />
          )}
        />
      )}
    </View>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    paddingHorizontal: 30,
    paddingBottom: 150,
  },
});
