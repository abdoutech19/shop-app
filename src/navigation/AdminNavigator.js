import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {useTheme} from '@react-navigation/native';

import UserProductsScreen from '../screens/UserProductsScreen';
import Icon from '../components/icons/LightIcons';
import EditProductScreen from '../screens/EditProductScreen';
import {Colors} from '../constants/Colors';
import CreateProductScreen from '../screens/CreateProductScreen';
import FriesOddIcon from '../components/icons/FriesOddIcon';
import PlusIcon from '../components/icons/PlusIcon';
import LeftIcon from '../components/icons/LeftIcon';

const Stack = createStackNavigator();
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

const AdminNavigator = () => {
  const {colors} = useTheme();

  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen
        name="Admin"
        component={UserProductsScreen}
        options={({navigation}) => ({
          title: 'My Products',
          headerLeft: () => (
            <TouchableOpacity
              style={{marginLeft: 20}}
              onPress={() => navigation.toggleDrawer()}>
              <FriesOddIcon
                height={52}
                width={52}
                weight={1}
                color={colors.text}
              />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate('CreateProduct')}>
              <PlusIcon height={42} width={42} weight={1.3} />
            </TouchableOpacity>
          ),
          headerRightContainerStyle: {
            marginEnd: 30,
          },
        })}
      />
      <Stack.Screen
        name="CreateProduct"
        component={CreateProductScreen}
        options={({navigation}) => ({
          title: 'Create Product',
          headerLeft: () => (
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => navigation.goBack()}>
              <LeftIcon
                height={42}
                width={42}
                weight={1.3}
                color={`rgb(${Colors.text.primary})`}
              />
            </TouchableOpacity>
          ),
          headerLeftContainerStyle: styles.leftIcon,
        })}
      />
      <Stack.Screen
        name="EditProduct"
        component={EditProductScreen}
        options={({navigation}) => ({
          title: 'Edit',
          headerLeft: () => (
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => navigation.goBack()}>
              <LeftIcon
                height={42}
                width={42}
                weight={1.3}
                color={`rgb(${Colors.text.primary})`}
              />
            </TouchableOpacity>
          ),
          headerLeftContainerStyle: styles.leftIcon,
        })}
      />
    </Stack.Navigator>
  );
};

export default AdminNavigator;

const styles = StyleSheet.create({
  backButton: {
    height: 42,
    width: 42,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: `rgb(${Colors.text.primary})`,
  },
  leftIcon: {
    marginLeft: 20,
  },
});
