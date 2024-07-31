import axios from 'axios';

export default axios.create({
  baseURL: 'https://oticamudial.online/api',
  withCredentials: true
});
