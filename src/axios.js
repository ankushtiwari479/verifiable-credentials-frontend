import axios from 'axios';
import {baseURL} from './config'
const instance = axios.create({
  baseURL:baseURL, // Replace with your fixed base URL
});

export const setAuthToken = (token) => {
    if (token) {
      // Apply the token to all subsequent Axios requests
      axios.defaults.headers.common['authorization'] = `${token}`;
    } else {
      // Remove the authorization header if there's no token
      delete axios.defaults.headers.common['authorization'];
    }
  };

export default instance;
