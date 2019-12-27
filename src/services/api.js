import axios from 'axios';

const api = axios.create({
  // baseURL: 'http://10.230.30.69:3333',
  baseURL: 'http://192.168.43.7:3333',
});

export default api;
