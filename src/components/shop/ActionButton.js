import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';

import {Colors} from '../../constants/Colors';

const ActionButton = ({title, onPress, Icon}) => {
  return (
    <TouchableOpacity
      style={styles.action}
      activeOpacity={0.9}
      onPress={onPress}>
      <Icon />
      <Text style={styles.actionTitle}>{title}</Text>
    </TouchableOpacity>
  );
};

export default React.memo(ActionButton);

const styles = StyleSheet.create({
  action: {
    height: 50,
    borderRadius: 10,
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: `rgb(${Colors.primary})`,
  },
  actionTitle: {
    fontFamily: 'Lato-Bold',
    fontSize: 18,
    color: 'white',
    marginLeft: 8,
  },
});
