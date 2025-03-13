import React from "react";
import { Link, Routes, Route } from "react-router-dom";
import Marketplace from "./buyer/Marketplace";
import Cart from "./buyer/Cart";
import Orders from "./buyer/Orders";
import Profile from "./buyer/Profile";
import ProductDetails from "./ProductDetails";

const BuyerDashboard = () => {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 text-white p-6 flex flex-col fixed h-full">
        <h1 className="text-xl font-bold mb-6">Buyer Dashboard</h1>
        <nav className="space-y-4">
          <Link
            to="/buyer-dashboard/marketplace"
            className="block p-3 bg-blue-500 rounded"
          >
            Browse Marketplace
          </Link>
          <Link
            to="/buyer-dashboard/cart"
            className="block p-3 bg-red-500 rounded"
          >
            View Cart
          </Link>
          <Link
            to="/buyer-dashboard/orders"
            className="block p-3 bg-yellow-500 rounded"
          >
            Track Orders
          </Link>
          <Link
            to="/buyer-dashboard/profile"
            className="block p-3 bg-purple-500 rounded"
          >
            Profile
          </Link>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 relative ml-64">
        <Routes>
          <Route path="marketplace" element={<Marketplace />} />
          <Route path="cart" element={<Cart />} />
          <Route path="orders" element={<Orders />} />
          <Route path="profile" element={<Profile />} />
          <Route path="product/:id" element={<ProductDetails />} />
          <Route
            path="*"
            element={<h2 className="text-xl">Select an option</h2>}
          />
        </Routes>
      </div>
    </div>
  );
};

export default BuyerDashboard;
