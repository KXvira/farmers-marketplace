import axios from "axios";

const API = axios.create({ baseURL: "https://navigation-corn-blue-bit.trycloudflare.com" });

// Attach token if using authentication
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

// API Calls
export const farmerRegister = (formData) => API.post("/api/v1/farmer/register", formData);
export const buyerRegister = (formData) => API.post("/api/v1/buyer/register", formData);


