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

import SignupScreen from '../screens/SignupScreen';
import LoginScreen from '../screens/LoginScreen';
import {Colors} from '../constants/Colors';
import LeftIcon from '../components/icons/LeftIcon';

const Stack = createStackNavigator();
const textColor = `rgb(${Colors.text.primary})`;

const AuthNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Signup"
        component={SignupScreen}
        options={{
          header: () => (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <View style={{...styles.headerStyle, justifyContent: 'flex-end'}}>
                <Text style={styles.screenTitle}>Create {'\n'}Account</Text>
              </View>
            </TouchableWithoutFeedback>
          ),
        }}
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
                  <LeftIcon
                    height={42}
                    width={42}
                    weight={1.3}
                    color={`rgb(${Colors.text.primary})`}
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
    height: 42,
    width: 42,
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
