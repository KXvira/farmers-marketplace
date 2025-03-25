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
    <nav className="bg-gradient-to-r from-green-500 to-green-300 text-white p-4 flex justify-between items-center fixed top-0 w-full z-50 shadow-lg">
      {/* Logo */}
      <h1 className="text-2xl font-extrabold tracking-wide">
        <span className="text-yellow-300">Agri</span>Market
      </h1>

      {/* Navigation Links */}
      <div className="flex items-center gap-6">
        <Link
          to="/"
          className="hover:bg-green-800 px-4 py-2 rounded-md transition duration-300"
        >
          Home
        </Link>

        {!isAuthenticated ? (
          <Link
            to="/login"
            className="bg-yellow-400 text-green-900 px-4 py-2 rounded-md font-semibold shadow-md hover:bg-yellow-500 transition duration-300"
          >
            Login
          </Link>
        ) : (
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded-md font-semibold shadow-md hover:bg-red-600 transition duration-300"
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
