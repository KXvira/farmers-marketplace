import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-green-600 text-white p-4 flex justify-between items-center fixed top-0 w-full z-50">
      <h1 className="text-xl font-bold">AgriMarket</h1>
      <div className="space-x-4">
        <Link to="/" className="hover:underline">
          Home
        </Link>
        <Link to="/logout" className="hover:underline">
          Logout
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
