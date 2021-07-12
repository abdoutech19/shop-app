import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import FastImage from 'react-native-fast-image';

import {Colors} from '../../constants/Colors';

const OrderItem = ({orderItem: {date, totalAmount, items}}) => {
  const [dropped, setDropped] = useState(false);

  return (
    <View>
      <TouchableOpacity
        activeOpacity={0.75}
        onPress={() => setDropped(val => !val)}>
        <View style={styles.container}>
          <Text style={styles.date}>{date}</Text>
          <View style={styles.detailsContainer}>
            <Text style={styles.totalAmount}>${totalAmount.toFixed(2)}</Text>
            <TouchableOpacity onPress={() => setDropped(val => !val)}>
              <Icon
                name={dropped ? 'arrow-drop-up' : 'arrow-drop-down'}
                color={`rgb(${Colors.text.secondary})`}
                size={32}
              />
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
      {dropped && (
        <View style={styles.listContainer}>
          {items.map(cartItem => {
            return (
              <View key={cartItem.id} style={styles.cartItem}>
                <View style={styles.imageContainer}>
                  <FastImage
                    style={styles.image}
                    source={{uri: cartItem.imageUrl}}
                  />
                  <View style={styles.titleContainer}>
                    <Text style={styles.title}>{cartItem.title}</Text>
                    <Text style={styles.quantity}>x{cartItem.quantity}</Text>
                  </View>
                </View>
                <Text style={styles.total}>${cartItem.total.toFixed(2)}</Text>
              </View>
            );
          })}
        </View>
      )}
    </View>
  );
};

export default OrderItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 60,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  detailsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  totalAmount: {
    marginEnd: 15,
    fontFamily: 'Lato-Black',
    fontSize: 20,
    color: `rgb(${Colors.text.primary})`,
  },
  date: {
    fontFamily: 'Lato-Bold',
    fontSize: 16,
    color: `rgb(${Colors.text.primary})`,
  },
  listContainer: {
    backgroundColor: 'rgba(255,255,255, 0.7)',
    borderRadius: 10,
    marginTop: 5,
    paddingHorizontal: 10,
    paddingTop: 20,
  },
  cartItem: {
    flexDirection: 'row',
    height: 50,
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  imageContainer: {
    flexDirection: 'row',
  },
  image: {
    height: '100%',
    width: 50,
    borderRadius: 8,
  },
  titleContainer: {
    marginStart: 10,
    justifyContent: 'center',
  },
  title: {
    fontFamily: 'Lato-Bold',
    fontSize: 16,
    color: `rgb(${Colors.text.primary})`,
    marginBottom: 10,
  },
  quantity: {
    fontFamily: 'Lato-Bold',
    fontSize: 16,
    color: `rgb(${Colors.text.secondary})`,
  },
  total: {
    fontFamily: 'Lato-Black',
    fontSize: 18,
    color: `rgb(${Colors.text.primary})`,
    alignSelf: 'center',
    marginEnd: 10,
  },
});
