import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { logout } from "../api";

const Navbar = () => {
  const navigate = useNavigate();
  const isAuthenticated = !!Cookies.get("token");

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <nav className="bg-green-600 text-white p-4 flex justify-between items-center fixed top-0 w-full z-50">
      <h1 className="text-xl font-bold">AgriMarket</h1>
      <div className="flex gap-4">
        <Link to="/" className="hover:underline">
          Home
        </Link>
        {!isAuthenticated && (
          <Link to="/login" className="hover:underline">
            Login
          </Link>
        )}
        {isAuthenticated && (
          <button onClick={handleLogout} className="hover:underline">
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
