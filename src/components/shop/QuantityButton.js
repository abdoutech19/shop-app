import React, {useMemo} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import {Colors} from '../../constants/Colors';

const increaseColor = `rgb(${Colors.primary})`;
const decreaseColor = `rgba(${Colors.primaryDark}, 0.3)`;

const QuantityButton = ({decrease, increase, onPress}) => {
  const buttonStyle = useMemo(
    () => ({
      ...styles.action,
      backgroundColor: decrease ? decreaseColor : increaseColor,
    }),
    [increase, decrease],
  );

  return (
    <TouchableOpacity style={buttonStyle} onPress={onPress}>
      <Entypo name={decrease ? 'minus' : 'plus'} size={24} color="white" />
    </TouchableOpacity>
  );
};

export default React.memo(QuantityButton);

const styles = StyleSheet.create({
  action: {
    height: 36,
    width: 36,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
