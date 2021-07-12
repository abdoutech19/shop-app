import React, {useCallback, useContext} from 'react';
import {FlatList, StyleSheet, View, Text} from 'react-native';

import ProductItem from '../components/shop/ProductItem';
import {Context as ProductContext} from '../context/product/ProductContext';
import {Context as CartContext} from '../context/cart/CartContext';
import {CommonActions} from '@react-navigation/native';
import {Colors} from '../constants/Colors';
import Icon from '../components/icons/LightIcons';

const textSecondaryColor = `rgba(${Colors.text.secondary}, 0.7)`;
const DeleteIcon = () => <Icon name="trash-o" size={20} color="white" />;

const UserProductsScreen = ({navigation}) => {
  const {
    state: {userProducts, productsNavKey},
    deleteProduct,
  } = useContext(ProductContext);

  const {removeFromCart} = useContext(CartContext);

  const actionPressHandler = useCallback(
    (item, productsNavKey) => {
      if (productsNavKey) {
        navigation.dispatch({
          ...CommonActions.reset({
            routes: [{name: 'Products'}],
          }),
          target: productsNavKey,
        });
      }
      deleteProduct(item.id);
      removeFromCart(item);
    },
    [navigation],
  );

  const renderItem = useCallback(
    ({item}) => (
      <ProductItem
        product={item}
        navigationRoute="EditProduct"
        ActionIcon={DeleteIcon}
        actionTitle="Delete"
        onActionPress={actionPressHandler}
        params={productsNavKey}
      />
    ),
    [navigation, actionPressHandler, productsNavKey],
  );

  if (!userProducts.length) {
    return (
      <View style={styles.centered}>
        <Icon
          name="warning"
          size={26}
          color={`rgba(${Colors.text.secondary}, 0.6)`}
        />
        <Text style={styles.errorMessage}>You have no products yet.</Text>
      </View>
    );
  }

  return (
    <View>
      <FlatList data={userProducts} renderItem={renderItem} />
    </View>
  );
};

export default UserProductsScreen;

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 100,
  },
  errorMessage: {
    fontFamily: 'Lato-Bold',
    color: textSecondaryColor,
    fontSize: 16,
    marginTop: 10,
  },
});
