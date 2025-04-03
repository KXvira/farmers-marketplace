import React from "react";
import { Link, Routes, Route, useLocation } from "react-router-dom";
import Marketplace from "./buyer/Marketplace";
import Cart from "./buyer/Cart";
import Orders from "./buyer/Orders";
import Profile from "./buyer/Profile";
import ProductDetails from "./ProductDetails";
import Checkout from "./buyer/Checkout";
import Payment from "./buyer/Payment";
import { Home, ShoppingCart, List, User } from "lucide-react";

const BuyerDashboard = () => {
  const location = useLocation();

  const menuItems = [
    {
      name: "Marketplace",
      path: "/buyer-dashboard/marketplace",
      icon: <Home />,
    },
    { name: "Cart", path: "/buyer-dashboard/cart", icon: <ShoppingCart /> },
    { name: "Orders", path: "/buyer-dashboard/orders", icon: <List /> },
    { name: "Profile", path: "/buyer-dashboard/profile", icon: <User /> },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-green-950 text-white p-6 flex flex-col fixed h-full shadow-lg">
        <h1 className="text-2xl font-bold text-center mb-6">Buyer Dashboard</h1>
        <nav className="space-y-4">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 p-3 rounded-lg transition duration-300 ${
                location.pathname === item.path
                  ? "bg-blue-600 text-white shadow-md"
                  : "hover:bg-gray-800"
              }`}
            >
              {item.icon}
              <span>{item.name}</span>
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 ml-64 bg-green-50">
        <Routes>
          <Route path="marketplace" element={<Marketplace />} />
          <Route path="cart" element={<Cart />} />
          <Route path="orders" element={<Orders />} />
          <Route path="profile" element={<Profile />} />
          <Route path="product/:id" element={<ProductDetails />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="payment/:id" element={<Payment />} />
          <Route
            path="*"
            element={<h2 className="text-xl">Select an option</h2>}
          />
        </Routes>
      </main>
    </div>
  );
};

export default BuyerDashboard;
