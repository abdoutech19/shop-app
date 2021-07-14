import React, {useContext, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  StatusBar,
  ScrollView,
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

const ProductDetailScreen = ({route, navigation}) => {
  const {
    state: {products},
    setProductsNavKey,
  } = useContext(ProductContext);

  const {addToCart} = useContext(CartContext);

  const prodId = route.params?.prodId;
  const selectedProd = products.find(prod => prod.id === prodId);

  const key = useNavigationState(state => state.key);
  useEffect(() => {
    setProductsNavKey(key);

    return () => {
      setProductsNavKey('');
    };
  }, []);

  if (!selectedProd) {
    return null;
  }
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <Image style={styles.image} source={{uri: selectedProd.imageUrl}} />
      <LinearGradient
        colors={[
          `rgba(${Colors.primaryDarker}, 0.85)`,
          `rgba(${Colors.primaryDarker}, 0)`,
        ]}
        style={styles.gradient}
        start={{x: 0, y: 0}}
        end={{x: 0, y: 0.4}}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}>
          <LeftIcon height={42} width={42} weight={1.3} color="white" />
        </TouchableOpacity>
        <CartIcon style={styles.cart} navigation={navigation} color="white" />
      </LinearGradient>
      <View style={styles.prodInfo}>
        <Text style={styles.title}>{selectedProd.title}</Text>
        <View style={styles.line} />
        <ScrollView>
          <Text style={styles.description}>{selectedProd.description}</Text>
        </ScrollView>
      </View>
      <ActionComponent
        actionTitle="To cart"
        label="Price"
        amount={selectedProd.price}
        Icon={() => <Icon name="cart-o" color="white" size={20} />}
        onActionPress={() => addToCart(selectedProd)}
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
    height: '55%',
    width: '100%',
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  image: {
    height: '55%',
    width: '100%',
  },
  prodInfo: {
    paddingHorizontal: 40,
    paddingVertical: 20,
    backgroundColor: `rgb(${Colors.background})`,
    borderRadius: 60,
    top: -55,
    height: '45%',
  },
  title: {
    fontFamily: 'Lato-Black',
    fontSize: 32,
    color: `rgb(${Colors.text.primary})`,
    marginBottom: 10,
  },
  line: {
    backgroundColor: `rgb(${Colors.primary})`,
    height: 5,
    width: '18%',
    borderRadius: 50,
    marginBottom: 25,
  },
  description: {
    fontFamily: 'Lato-Regular',
    fontSize: 18,
    color: `rgb(${Colors.text.primary})`,
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
