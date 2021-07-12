import shopApi from '../../api/shopApi';
import {Order} from '../../models/order';
import createDataContext from '../createDataContext';
import {ADD_ORDER, SET_ORDERS} from './types';

const intialState = {
  orders: [],
};

const ordersReducer = (state, {type, payload}) => {
  switch (type) {
    case SET_ORDERS: {
      return {...state, orders: payload};
    }

    case ADD_ORDER: {
      return {orders: [...state.orders, payload]};
    }

    default:
      return state;
  }
};

const addOrder = dispatch => async (cartItems, totalAmount, userId) => {
  const date = new Date();
  try {
    const response = await shopApi.post(`/orders/${userId}.json`, {
      cartItems,
      totalAmount,
      date: date.toISOString(),
    });
    const id = response.data.name;
    const orderItem = new Order(id, cartItems, totalAmount, new Date(date));
    dispatch({type: ADD_ORDER, payload: orderItem});
  } catch (err) {
    throw err;
  }
};

const getOrders = dispatch => async userId => {
  try {
    const response = await shopApi.get(`/orders/${userId}.json`);
    const orders = [];
    for (let key in response.data) {
      orders.push(
        new Order(
          key,
          response.data[key].cartItems,
          response.data[key].totalAmount,
          response.data[key].date,
        ),
      );
    }
    dispatch({type: SET_ORDERS, payload: orders});
  } catch (err) {
    throw err;
  }
};

export const {Context, Provider} = createDataContext(
  ordersReducer,
  intialState,
  {addOrder, getOrders},
);
