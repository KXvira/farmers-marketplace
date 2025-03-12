import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:3000" });

// Attach token if using authentication
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

// API calls

//Register
export const farmerRegister = (formData) => API.post("/api/v1/farmer/register", formData);
export const buyerRegister = (formData) => API.post("/api/v1/buyer/register", formData);

//Login
export const farmerLogin = (formData) => API.post("/api/v1/farmer/login", formData);
export const buyerLogin = (formData) => API.post("/api/v1/buyer/login", formData);
