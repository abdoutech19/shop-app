import React, {useContext, useEffect, useState} from 'react';
import {StyleSheet, StatusBar, View} from 'react-native';
import {useTheme} from '@react-navigation/native';

import DrawerNavigator from './DrawerNavigator';
import AuthNavigator from './AuthNavigator';
import {Context as AuthContext} from '../context/auth/AuthContext';

const RootNavigator = () => {
  const {colors} = useTheme();
  const {
    state: {token},
    tryLocalLogin,
  } = useContext(AuthContext);

  const [triedLocalLogin, setTriedLocalLogin] = useState(false);

  const isLoggedIn = Boolean(token);

  const tryLocalLoginHandler = async () => {
    await tryLocalLogin();
    setTriedLocalLogin(true);
  };

  useEffect(() => {
    tryLocalLoginHandler();
  }, []);

  if (!triedLocalLogin) return null;

  return (
    <View style={{flex: 1, backgroundColor: colors.background}}>
      <StatusBar translucent backgroundColor="transparent" />
      {isLoggedIn ? <DrawerNavigator /> : <AuthNavigator />}
    </View>
  );
};

export default RootNavigator;

const styles = StyleSheet.create({});
