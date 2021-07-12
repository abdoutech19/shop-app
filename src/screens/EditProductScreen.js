import React, {useContext} from 'react';
import {StyleSheet, View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import ProductForm from '../components/shop/ProductForm';
import {Context as ProductContext} from '../context/product/ProductContext';

const EditProductScreen = ({route}) => {
  const {
    state: {products},
    editProduct,
  } = useContext(ProductContext);

  const prodId = route.params.prodId;
  const selectedProduct = products.find(prod => prod.id === prodId);

  return (
    <View>
      <KeyboardAwareScrollView contentContainerStyle={{paddingBottom: 30}}>
        <ProductForm
          submitButtonTitle="Save"
          product={selectedProduct}
          onSubmit={async prodData => {
            try {
              await editProduct(prodData);
            } catch (err) {
              throw err;
            }
          }}
        />
      </KeyboardAwareScrollView>
    </View>
  );
};

export default EditProductScreen;

const styles = StyleSheet.create({});
