import React, {useContext} from 'react';
import {StyleSheet, View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import {Context as ProductContext} from '../context/product/ProductContext';
import ProductForm from '../components/shop/ProductForm';
import {Colors} from '../constants/Colors';

const CreateProductScreen = () => {
  const {addProduct} = useContext(ProductContext);

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView contentContainerStyle={{paddingBottom: 30}}>
        <ProductForm
          submitButtonTitle="Create Product"
          onSubmit={async prodData => {
            try {
              await addProduct(prodData);
            } catch (err) {
              throw err;
            }
          }}
        />
      </KeyboardAwareScrollView>
    </View>
  );
};

export default CreateProductScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  screenTitle: {
    fontFamily: 'Lato-Bold',
    fontSize: 24,
    color: `rgb(${Colors.text.primary})`,
  },
});
