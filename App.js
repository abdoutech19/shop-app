import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import RootNavigator from './src/navigation/RootNavigator';
import {enableScreens} from 'react-native-screens';

import {Colors} from './src/constants/Colors';
import {Provider as AuthProvider} from './src/context/auth/AuthContext';
import {Provider as ProductProvider} from './src/context/product/ProductContext';
import {Provider as CartProvider} from './src/context/cart/CartContext';
import {Provider as OrdersProvider} from './src/context/orders/OrdersContext';

enableScreens();

const App = () => {
  return (
    <NavigationContainer
      theme={{
        colors: {
          background: `rgb(${Colors.background})`,
          text: `rgb(${Colors.text.primary})`,
        },
      }}>
      <AuthProvider>
        <ProductProvider>
          <CartProvider>
            <OrdersProvider>
              <RootNavigator />
            </OrdersProvider>
          </CartProvider>
        </ProductProvider>
      </AuthProvider>
    </NavigationContainer>
  );
};

export default App;
