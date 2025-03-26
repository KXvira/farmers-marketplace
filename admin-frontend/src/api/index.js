import axios from 'axios';
import Cookies from 'js-cookie';

const API = axios.create({ baseURL: 'http://localhost:3000'});

// Attach token from cookies
API.interceptors.request.use((req) => {
  const token = Cookies.get("token"); // Use cookies instead of localStorage
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});