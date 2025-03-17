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

// Profile

// view profile
export const viewBuyerProfile = (userID) => {
  return API.get(`/api/v1/buyer/viewprofile/${userID}`);
}
// edit profile
export const editBuyerProfile = (formData) => {
  return API.post(`/api/v1/buyer/editprofile/`, formData);
}

// view farmer profile
export const viewFarmerProfile = (userID) => {
  return API.get(`/api/v1/farmer/viewprofile/${userID}`);
}

// edit farmer profile
export const editFarmerProfile = (formData) => {
  return API.post(`/api/v1/farmer/editprofile/`, formData);
}

// View products by farmer
export const getFarmerProducts = () => {
  const farmerId = Cookies.get("id");
  return API.get(`/api/v1/farmer/myproducts/${farmerId}`);
}

// View farmer profile by buyer
export const getFarmerProfile = (id) => {
  return API.get(`/api/v1/buyer/viewfarmer/${id}`);
}

// Delete product
export const deleteProduct = (id) => {
  if (!id) {
    console.error("Error: No product ID provided to deleteProduct");
    return Promise.reject(new Error("No product ID provided"));
  }
  return API.delete(`/api/v1/farmer/deleteproduct/${id}`);
}

// Update product
export const editProduct = (formData, id) => {
  return API.post(`/api/v1/farmer/updateproduct/${id}`, formData);
}