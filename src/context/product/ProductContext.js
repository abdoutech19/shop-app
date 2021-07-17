import createDataContext from '../createDataContext';
import shopApi from '../../api/shopApi';
import {
  DELETE_PRODUCT,
  ADD_PRODUCT,
  EDIT_PRODUCT,
  SET_NAV_KEY,
  SET_PRODUCTS,
  SET_ERROR_MESSAGE,
  NO_PRODUCTS,
  REQUEST_NETWORK_ERROR,
  ADD_TO_FAVORITES,
  REMOVE_FROM_FAVORITES,
  SET_FAVORITES,
} from './types';
import {Product} from '../../models/product';
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState = {
  products: [],
  userProducts: [],
  favorites: [],
  productsNavKey: '',
  error: {},
};

const productsReducer = (state, {type, payload}) => {
  switch (type) {
    case SET_PRODUCTS: {
      return {
        ...state,
        error: {},
        products: payload.products,
        userProducts: payload.products.filter(
          prod => prod.ownerId === payload.userId,
        ),
      };
    }

    case SET_ERROR_MESSAGE: {
      return {...state, error: payload};
    }

    case DELETE_PRODUCT: {
      return {
        ...state,
        userProducts: state.userProducts.filter(prod => prod.id !== payload),
        products: state.products.filter(prod => prod.id !== payload),
      };
    }

    case ADD_PRODUCT: {
      return {
        ...state,
        products: [...state.products, payload],
        userProducts: [...state.userProducts, payload],
      };
    }

    case EDIT_PRODUCT: {
      {
        const index = state.products.findIndex(prod => prod.id === payload.id);
        const updatedProducts = [...state.products];
        updatedProducts[index] = payload;
        return {
          ...state,
          products: updatedProducts,
          userProducts: updatedProducts.filter(
            prod => prod.ownerId === payload.ownerId,
          ),
        };
      }
    }

    case ADD_TO_FAVORITES: {
      const favoritesIds = JSON.stringify([
        ...state.favorites.map(prod => prod.id),
        payload.id,
      ]);
      AsyncStorage.setItem('favorites', favoritesIds);

      return {...state, favorites: [...state.favorites, payload]};
    }

    case REMOVE_FROM_FAVORITES: {
      const newFavorites = state.favorites.filter(prod => prod.id !== payload);

      const favoritesIds = JSON.stringify([
        ...newFavorites.map(prod => prod.id),
      ]);
      AsyncStorage.setItem('favorites', favoritesIds);

      return {
        ...state,
        favorites: newFavorites,
      };
    }

    case SET_FAVORITES: {
      const favorites = [];
      payload.forEach(id => {
        let product = state.products.find(prod => prod.id === id);
        if (product) {
          favorites.push(product);
        }
      });

      return {...state, favorites: favorites};
    }

    case SET_NAV_KEY: {
      return {...state, productsNavKey: payload};
    }

    default:
      return state;
  }
};

const deleteProduct = dispatch => async prodId => {
  try {
    await shopApi.delete(`/products/${prodId}.json`);
    dispatch({type: DELETE_PRODUCT, payload: prodId});
  } catch (err) {
    if (!err.response) {
      const error = {
        type: REQUEST_NETWORK_ERROR,
        message: 'Please check your internet connection',
      };
      dispatch({
        type: SET_ERROR_MESSAGE,
        payload: error,
      });
    } else {
      console.log(JSON.stringify(err));
    }
  }
};

const addProduct = dispatch => async prodData => {
  try {
    const response = await shopApi.post('/products.json', {...prodData});
    const product = new Product(
      response.data.name,
      prodData.ownerId,
      prodData.title,
      prodData.imageUrl,
      prodData.description,
      prodData.price,
    );
    dispatch({type: ADD_PRODUCT, payload: product});
  } catch (err) {
    throw err;
  }
};

const editProduct = dispatch => async prodData => {
  const product = new Product(
    prodData.id,
    prodData.ownerId,
    prodData.title,
    prodData.imageUrl,
    prodData.description,
    prodData.price,
  );
  try {
    await shopApi.patch(`/products/${product.id}.json`, {
      title: prodData.title,
      imageUrl: prodData.imageUrl,
      description: prodData.description,
    });
    dispatch({type: EDIT_PRODUCT, payload: product});
  } catch (err) {
    throw err;
  }
};

const setProductsNavKey = dispatch => key => {
  dispatch({type: SET_NAV_KEY, payload: key});
};

const getProducts = dispatch => async userId => {
  try {
    const response = await shopApi.get('/products.json');
    const data = response.data;
    const products = [];
    for (let key in data) {
      products.push(
        new Product(
          key,
          data[key].ownerId,
          data[key].title,
          data[key].imageUrl,
          data[key].description,
          data[key].price,
        ),
      );
    }
    if (products.length) {
      dispatch({type: SET_PRODUCTS, payload: {products, userId}});
    } else {
      const error = {
        type: NO_PRODUCTS,
        message: 'No products were found',
      };
      dispatch({
        type: SET_ERROR_MESSAGE,
        payload: error,
      });
    }
  } catch (err) {
    if (!err.response) {
      const error = {
        type: REQUEST_NETWORK_ERROR,
        message: 'Please check your internet connection.',
      };
      dispatch({
        type: SET_ERROR_MESSAGE,
        payload: error,
      });
    } else {
      console.log(JSON.stringify(err));
    }
  }
};

const addToFavorites = dispatch => product => {
  dispatch({type: ADD_TO_FAVORITES, payload: product});
};
const removeFromFavorites = dispatch => prodId => {
  dispatch({type: REMOVE_FROM_FAVORITES, payload: prodId});
};
const getFavorites = dispatch => async () => {
  const favoritesJson = await AsyncStorage.getItem('favorites');
  const favoritesIds = JSON.parse(favoritesJson);
  if (favoritesIds?.length) {
    dispatch({type: SET_FAVORITES, payload: favoritesIds});
  }
};

export const {Context, Provider} = createDataContext(
  productsReducer,
  initialState,
  {
    deleteProduct,
    addProduct,
    editProduct,
    setProductsNavKey,
    getProducts,
    addToFavorites,
    removeFromFavorites,
    getFavorites,
  },
);
