import axios from 'axios';

export default axios.create({
  baseURL: 'https://labella.clinicadeolhos.shop/api/',
  withCredentials: true
});
