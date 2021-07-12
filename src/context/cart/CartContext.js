import {CartItem} from '../../models/cartItem';
import createDataContext from '../createDataContext';
import {
  ADD_TO_CART,
  DECREASE_QUANTITY,
  REMOVE_FROM_CART,
  CLEAR_CART,
} from './types';

const initialState = {
  items: {},
  totalAmount: 0,
};

const cartReducer = (state, {type, payload}) => {
  switch (type) {
    case ADD_TO_CART: {
      const prodId = payload.id;
      let quantity = 1;
      let prevItemTotal = 0;

      if (state.items[prodId]) {
        quantity = state.items[prodId].quantity + 1;
        prevItemTotal = state.items[prodId].total;
      }

      const cartItem = new CartItem(payload, quantity);
      const newAmount = state.totalAmount + cartItem.total - prevItemTotal;

      return {
        items: {
          ...state.items,
          [prodId]: cartItem,
        },
        totalAmount: newAmount < 0 ? 0 : newAmount,
      };
    }

    case DECREASE_QUANTITY: {
      const prodId = payload.id;
      const prevItem = state.items[prodId];

      if (prevItem.quantity > 1) {
        const newQuantity = prevItem.quantity - 1;
        const cartItem = new CartItem(payload, newQuantity);
        const newAmount = state.totalAmount - payload.price;

        return {
          items: {...state.items, [prodId]: cartItem},
          totalAmount: newAmount < 0 ? 0 : newAmount,
        };
      }

      return state;
    }

    case REMOVE_FROM_CART: {
      const prodId = payload.id;
      if (state.items[prodId]) {
        const updatedItems = {};
        const newAmount = state.totalAmount - state.items[prodId].total;
        for (let id in state.items) {
          if (id !== prodId) updatedItems[id] = state.items[id];
        }

        return {
          items: updatedItems,
          totalAmount: newAmount < 0 ? 0 : newAmount,
        };
      }
      return state;
    }

    case CLEAR_CART: {
      return initialState;
    }

    default:
      return state;
  }
};

const addToCart = dispatch => product => {
  dispatch({type: ADD_TO_CART, payload: product});
};

const decreaseQuantity = dispatch => product => {
  dispatch({type: DECREASE_QUANTITY, payload: product});
};

const removeFromCart = dispatch => product => {
  dispatch({type: REMOVE_FROM_CART, payload: product});
};

const clearCart = dispatch => () => {
  dispatch({type: CLEAR_CART});
};

export const {Context, Provider} = createDataContext(
  cartReducer,
  initialState,
  {addToCart, decreaseQuantity, removeFromCart, clearCart},
);
