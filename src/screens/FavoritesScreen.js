import React, {useContext, useCallback} from 'react';
import {StyleSheet, FlatList, View} from 'react-native';

import {Context as ProductContext} from '../context/product/ProductContext';
import ProductItem from '../components/shop/ProductItem';
import Icon from '../components/icons/LightIcons';

const CartIcon = () => <Icon name="cart-o" color="white" size={20} />;

const FavoritesScreen = () => {
  const {
    state: {favorites},
  } = useContext(ProductContext);

  const renderItem = useCallback(
    ({item}) => (
      <ProductItem
        product={item}
        navigationRoute="ProductDetail"
        ActionIcon={CartIcon}
        actionTitle="To cart"
        hideActionButton
      />
    ),
    [],
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={favorites}
        contentContainerStyle={styles.list}
        renderItem={renderItem}
      />
    </View>
  );
};

export default FavoritesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    alignItems: 'center',
  },
});
