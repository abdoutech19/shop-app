import createDataContext from '../createDataContext';
import axios from 'axios';
import {SIGNUP, LOGIN, LOCAL_LOGIN, LOGOUT} from './types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {LogBox} from 'react-native';

LogBox.ignoreLogs(['Setting a timer']);

const initialState = {
  token: null,
  userId: null,
};
let logoutTimer;

const authReducer = (state, {type, payload}) => {
  switch (type) {
    case LOGIN:
      return {token: payload.token, userId: payload.userId};

    case SIGNUP:
      return {token: payload.token, userId: payload.userId};

    case LOCAL_LOGIN:
      return {token: payload.token, userId: payload.userId};

    case LOGOUT:
      return initialState;

    default:
      return state;
  }
};

const tryLocalLogin = dispatch => async () => {
  try {
    const data = await AsyncStorage.getItem('shopUserData');
    const shopUserData = JSON.parse(data);
    const expirationDate = new Date(shopUserData?.expirationDate);

    if (
      shopUserData?.token &&
      shopUserData?.userId &&
      !(expirationDate <= new Date())
    ) {
      dispatch({
        type: LOCAL_LOGIN,
        payload: {token: shopUserData.token, userId: shopUserData.userId},
      });
      const remainingTime = expirationDate.getTime() - new Date().getTime();
      setLogoutTimer(remainingTime, dispatch);
    }
  } catch (err) {
    console.log(err);
  }
};

const signUp = dispatch => async ({email, password}) => {
  try {
    const response = await axios.post(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCPrUOcTWvUSZ4n5kuTSier5YFuF2DfgQY',
      {email, password, returnSecureToken: true},
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    const expirationDate = new Date(
      new Date().getTime() + parseInt(response.data.expiresIn) * 1000,
    );

    saveDataToStorage(
      response.data.idToken,
      response.data.localId,
      expirationDate,
    );

    dispatch({
      type: SIGNUP,
      payload: {token: response.data.idToken, userId: response.data.localId},
    });
    setLogoutTimer(parseInt(response.data.expiresIn) * 1000, dispatch);

    console.log(response.data);
  } catch (err) {
    console.log(err.response.data);
    throw err;
  }
};

const login = dispatch => async ({email, password}) => {
  try {
    const response = await axios.post(
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCPrUOcTWvUSZ4n5kuTSier5YFuF2DfgQY',
      {email, password, returnSecureToken: true},
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    const expirationDate = new Date(
      new Date().getTime() + parseInt(response.data.expiresIn) * 1000,
    );

    console.log(expirationDate);
    saveDataToStorage(
      response.data.idToken,
      response.data.localId,
      expirationDate,
    );

    dispatch({
      type: LOGIN,
      payload: {token: response.data.idToken, userId: response.data.localId},
    });
    setLogoutTimer(parseInt(response.data.expiresIn) * 1000, dispatch);

    console.log('SUCCESS: ', response.data);
  } catch (err) {
    console.log('ERROR: ', err.response.data);
    throw err;
  }
};

const logout = dispatch => async () => {
  await AsyncStorage.removeItem('shopUserData');
  clearLogoutTimer();
  dispatch({type: LOGOUT});
};
const setLogoutTimer = (expirationDate, dispatch) => {
  logoutTimer = setTimeout(() => {
    dispatch({type: LOGOUT});
  }, expirationDate);
};

const clearLogoutTimer = () => {
  if (logoutTimer) {
    clearTimeout(logoutTimer);
  }
};

const saveDataToStorage = async (token, userId, expirationDate) => {
  await AsyncStorage.setItem(
    'shopUserData',
    JSON.stringify({
      token,
      userId,
      expirationDate: expirationDate.toISOString(),
    }),
  );
};

export const {Context, Provider} = createDataContext(
  authReducer,
  initialState,
  {
    signUp,
    login,
    tryLocalLogin,
    logout,
  },
);
