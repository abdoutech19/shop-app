import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const instance = axios.create({
  baseURL:
    'https://shop-app-5a476-default-rtdb.europe-west1.firebasedatabase.app/',
  headers: {
    'Content-Type': 'application/json',
  },
});

instance.interceptors.request.use(
  async config => {
    const data = await AsyncStorage.getItem('shopUserData');
    const shopUserData = JSON.parse(data);
    if (shopUserData.token) {
      config.params = {auth: shopUserData.token};
    }
    return config;
  },
  err => {
    return Promise.reject(err);
  },
);

export default instance;
