import React from "react";
import { Link, Routes, Route, useLocation } from "react-router-dom";
import AddProduct from "./farmer/AddProduct";
import MyProducts from "./farmer/MyProducts";
import Orders from "./farmer/Orders";
import Profile from "./farmer/Profile";
import { PlusCircle, Package, ShoppingBag, User } from "lucide-react";

const FarmerDashboard = () => {
  const location = useLocation();

  const menuItems = [
    {
      name: "Add Product",
      path: "/farmer-dashboard/add-product",
      icon: <PlusCircle />,
    },
    {
      name: "My Products",
      path: "/farmer-dashboard/my-products",
      icon: <Package />,
    },
    { name: "Orders", path: "/farmer-dashboard/orders", icon: <ShoppingBag /> },
    { name: "Profile", path: "/farmer-dashboard/profile", icon: <User /> },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-green-950 text-white p-6 flex flex-col fixed h-full shadow-lg">
        <h1 className="text-2xl font-bold text-center mb-6">
          Farmer Dashboard
        </h1>
        <nav className="space-y-4">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 p-3 rounded-lg transition duration-300 ${
                location.pathname === item.path
                  ? "bg-green-600 text-white shadow-md"
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
          <Route path="add-product" element={<AddProduct />} />
          <Route path="my-products" element={<MyProducts />} />
          <Route path="orders" element={<Orders />} />
          <Route path="profile" element={<Profile />} />
          <Route
            path="*"
            element={<h2 className="text-xl">Select an option</h2>}
          />
        </Routes>
      </main>
    </div>
  );
};

export default FarmerDashboard;
