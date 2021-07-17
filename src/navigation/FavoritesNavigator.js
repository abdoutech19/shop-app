import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';

import {createStackNavigator} from '@react-navigation/stack';
import FavoritesScreen from '../screens/FavoritesScreen';
import FriesOddIcon from '../components/icons/FriesOddIcon';
import {Colors} from '../constants/Colors';
import ProductDetailScreen from '../screens/ProductDetailScreen';
import CartScreen from '../screens/CartScreen';
import LeftIcon from '../components/icons/LeftIcon';

const Stack = createStackNavigator();
const screenOpts = {
  headerTitleStyle: {
    fontFamily: 'Lato-Black',
    fontSize: 28,
    marginLeft: 20,
  },
  headerStyle: {
    height: 120,
  },
};
const textColor = `rgba(${Colors.text.primary}, 0.7)`;
const textPrimaryColor = `rgb(${Colors.text.primary})`;

const FavoritesNavigator = ({navigation}) => {
  return (
    <Stack.Navigator screenOptions={screenOpts}>
      <Stack.Screen
        name="Favorites"
        component={FavoritesScreen}
        options={{
          headerLeft: () => (
            <TouchableOpacity
              style={{marginLeft: 20}}
              onPress={navigation.toggleDrawer}>
              <FriesOddIcon
                height={52}
                width={52}
                weight={1}
                color={textColor}
              />
            </TouchableOpacity>
          ),
          title: 'My Favorites',
        }}
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
              onPress={navigation.goBack}>
              <LeftIcon
                height={42}
                width={42}
                weight={1.3}
                color={textPrimaryColor}
              />
            </TouchableOpacity>
          ),
        })}
      />
    </Stack.Navigator>
  );
};

export default FavoritesNavigator;

const styles = StyleSheet.create({
  backButton: {
    height: 42,
    width: 42,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 30,
    borderWidth: 1,
    borderRadius: 10,
  },
});
