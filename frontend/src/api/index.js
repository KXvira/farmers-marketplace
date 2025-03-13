import axios from "axios";
import Cookies from "js-cookie"; 

const API = axios.create({ baseURL: "http://localhost:3000" });

// Attach token from cookies
API.interceptors.request.use((req) => {
  const token = Cookies.get("token"); // Use cookies instead of localStorage
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

// API calls

// Register
export const farmerRegister = (formData) => API.post("/api/v1/farmer/register", formData);
export const buyerRegister = (formData) => API.post("/api/v1/buyer/register", formData);

// Login
export const farmerLogin = (formData) => API.post("/api/v1/farmer/login", formData);
export const buyerLogin = (formData) => API.post("/api/v1/buyer/login", formData);

// Logout
export const logout = () => {
  Cookies.remove("token");
  Cookies.remove("role");
  Cookies.remove("id");
  return API.delete("/api/v1/logout");
};

// Add product
export const addProduct = (formData) => API.post("/api/v1/farmer/addproduct", formData);

// Get all products
export const getProducts = () => API.get("/api/v1/buyer/getproducts");

// View details of a product
export const getProductDetails = (id) => {
  return API.get(`/api/v1/buyer/viewdetails/${id}`);
}

// View products by farmer
export const getFarmerProducts = () => {
  const farmerId = Cookies.get("id");
  return API.get(`/api/v1/farmer/myproducts/${farmerId}`);

}