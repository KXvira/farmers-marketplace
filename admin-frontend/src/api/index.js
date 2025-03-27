import axios from 'axios';
import Cookies from 'js-cookie';

const API = axios.create({ baseURL: 'http://localhost:3000'});

// Attach token from cookies
API.interceptors.request.use((req) => {
  const token = Cookies.get("token"); 
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});