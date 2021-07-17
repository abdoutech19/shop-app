import React, {useContext} from 'react';
import {
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import ProductsNavigator from './ProductsNavigator';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';

import Icon from '../components/icons/LightIcons';
import {Colors} from '../constants/Colors';
import OrdersScreen from '../screens/OrdersScreen';
import AdminNavigator from './AdminNavigator';
import {Context as AuthContext} from '../context/auth/AuthContext';
import FriesOddIcon from '../components/icons/FriesOddIcon';
import FavoritesNavigator from './FavoritesNavigator';

const textColor = `rgba(${Colors.text.primary}, 0.7)`;
const Drawer = createDrawerNavigator();

const CartIcon = ({color}) => <Icon name="cart-o" size={20} color={color} />;
const ShopIcon = ({color}) => <Icon name="shop-o" size={20} color={color} />;
const userIcon = ({color}) => <Icon name="user-o" size={20} color={color} />;
const starIcon = ({color}) => <Icon name="star-o" size={20} color={color} />;

const drawerContentOpts = {
  activeTintColor: `rgb(${Colors.primary})`,
  inactiveTintColor: `rgba(${Colors.text.primary}, 0.7)`,
  labelStyle: {
    fontFamily: 'Lato-Bold',
    fontSize: 16,
  },
  itemStyle: {
    borderRadius: 10,
    paddingLeft: 10,
    marginTop: 0,
  },
};
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

const drawerEdgeWidth = Dimensions.get('window').width / 4;

const DrawerNavigator = () => {
  const {logout} = useContext(AuthContext);

  return (
    <Drawer.Navigator
      drawerContent={props => (
        <DrawerContentScrollView
          {...props}
          contentContainerStyle={{
            height: '100%',
            justifyContent: 'space-between',
          }}>
          <View>
            <Text style={styles.title}>Core Navigation</Text>
            <DrawerItemList {...props} />
          </View>
          <TouchableOpacity style={styles.logoutButton} onPress={logout}>
            <Icon name="logout-left" size={20} color={textColor} />
            <Text style={styles.logoutTitle}>Logout</Text>
          </TouchableOpacity>
        </DrawerContentScrollView>
      )}
      drawerStyle={styles.drawerStyle}
      overlayColor={`rgba(${Colors.primaryDark}, 0.8)`}
      edgeWidth={drawerEdgeWidth}
      drawerContentOptions={drawerContentOpts}
      screenOptions={screenOpts}>
      <Drawer.Screen
        name="ProductsFlow"
        component={ProductsNavigator}
        options={{
          title: 'Marketplace',
          drawerIcon: ShopIcon,
        }}
      />
      <Drawer.Screen
        name="Orders"
        component={OrdersScreen}
        options={({navigation}) => ({
          title: 'My Orders',
          drawerIcon: CartIcon,
          headerShown: true,
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
          drawerLabel: 'Orders',
        })}
      />
      <Drawer.Screen
        name="FavoritesFlow"
        component={FavoritesNavigator}
        options={{
          drawerIcon: starIcon,
          drawerLabel: 'Favorites',
        }}
      />
      <Drawer.Screen
        name="AdminFlow"
        component={AdminNavigator}
        options={{
          title: 'My Products',
          drawerIcon: userIcon,
        }}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;

const styles = StyleSheet.create({
  drawerStyle: {
    backgroundColor: 'white',
    borderTopRightRadius: 16,
    borderBottomRightRadius: 16,
  },
  title: {
    fontSize: 22,
    fontFamily: 'Lato-Bold',
    color: `rgb(${Colors.text.secondary})`,
    marginVertical: 20,
    marginLeft: 10,
  },
  logoutButton: {
    width: '100%',
    marginBottom: 30,
    flexDirection: 'row',
    paddingLeft: 30,
    alignItems: 'center',
  },
  logoutTitle: {
    color: textColor,
    fontFamily: 'Lato-Bold',
    fontSize: 16,
    marginLeft: 30,
  },
});
