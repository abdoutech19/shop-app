import React, {useContext} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import Feather from 'react-native-vector-icons/Feather';

import {Colors} from '../../constants/Colors';

const textColor = `rgba(${Colors.text.primary}, 0.7)`;

const TitledDrawer = props => {
  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={{height: '100%', justifyContent: 'space-between'}}>
      <View>
        <Text style={styles.title}>Core Navigation</Text>
        <DrawerItemList {...props} />
      </View>
      <TouchableOpacity style={styles.logoutButton} onPress={() => {}}>
        <Feather name="log-out" size={22} color={textColor} />
        <Text style={styles.logoutTitle}>Logout</Text>
      </TouchableOpacity>
    </DrawerContentScrollView>
  );
};

export default TitledDrawer;

const styles = StyleSheet.create({
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
