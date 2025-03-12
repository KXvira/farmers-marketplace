import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../api";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/"); // Redirect to home after logout
  };

  return (
    <nav className="bg-green-600 text-white p-4 flex justify-between items-center fixed top-0 w-full z-50">
      <h1 className="text-xl font-bold">AgriMarket</h1>
      <div className="flex gap-4">
        <Link to="/" className="hover:underline">
          Home
        </Link>
        <button onClick={handleLogout} className="hover:underline">
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
