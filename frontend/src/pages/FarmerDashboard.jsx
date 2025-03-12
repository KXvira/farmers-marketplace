import React from "react";
import { Link, Routes, Route } from "react-router-dom";
import AddProduct from "./farmer/AddProduct";
import MyProducts from "./farmer/MyProducts";
import Orders from "./farmer/Orders";
import Profile from "./farmer/Profile";

const FarmerDashboard = () => {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 text-white p-6">
        <h1 className="text-xl font-bold mb-6">Farmer Dashboard</h1>
        <nav className="space-y-4">
          <Link
            to="/farmer-dashboard/add-product"
            className="block p-3 bg-green-500 rounded"
          >
            Add Product
          </Link>
          <Link
            to="/farmer-dashboard/my-products"
            className="block p-3 bg-blue-500 rounded"
          >
            View My Products
          </Link>
          <Link
            to="/farmer-dashboard/orders"
            className="block p-3 bg-yellow-500 rounded"
          >
            View Orders
          </Link>
          <Link
            to="/farmer-dashboard/profile"
            className="block p-3 bg-purple-500 rounded"
          >
            Profile
          </Link>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        <Routes>
          <Route path="add-product" element={<AddProduct />} />
          <Route path="my-products" element={<MyProducts />} />
          <Route path="orders" element={<Orders />} />
          <Route path="profile" element={<Profile />} />
          <Route
            path="*"
            element={<h2 className="text-xl">Select an option</h2>}
          />
        </Routes>
      </div>
    </div>
  );
};

export default FarmerDashboard;
