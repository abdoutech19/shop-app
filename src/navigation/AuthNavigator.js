import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import Entypo from 'react-native-vector-icons/Entypo';

import SignupScreen from '../screens/SignupScreen';
import LoginScreen from '../screens/LoginScreen';
import {Colors} from '../constants/Colors';

const Stack = createStackNavigator();
const textColor = `rgb(${Colors.text.primary})`;

const AuthNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Signup"
        component={SignupScreen}
        options={({navigation}) => ({
          header: () => (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <View style={{...styles.headerStyle, justifyContent: 'flex-end'}}>
                <Text style={styles.screenTitle}>Create {'\n'}Account</Text>
              </View>
            </TouchableWithoutFeedback>
          ),
        })}
      />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={({navigation}) => ({
          header: () => (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <View
                style={{
                  ...styles.headerStyle,
                  justifyContent: 'space-between',
                }}>
                <TouchableOpacity
                  style={styles.backButton}
                  onPress={() => navigation.goBack()}>
                  <Entypo
                    name="chevron-left"
                    color={`rgb(${Colors.text.primary})`}
                    size={30}
                  />
                </TouchableOpacity>
                <Text style={styles.screenTitle}>Welcome {'\n'}Back</Text>
              </View>
            </TouchableWithoutFeedback>
          ),
        })}
      />
    </Stack.Navigator>
  );
};

export default AuthNavigator;

const styles = StyleSheet.create({
  headerStyle: {
    height: 250,
    paddingBottom: 20,
    paddingHorizontal: 30,
    paddingTop: 55,
  },
  backButton: {
    height: 40,
    width: 40,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: textColor,
    justifyContent: 'center',
    alignItems: 'center',
  },
  screenTitle: {
    fontFamily: 'Lato-Black',
    fontSize: 40,
    color: textColor,
    lineHeight: 60,
  },
});
