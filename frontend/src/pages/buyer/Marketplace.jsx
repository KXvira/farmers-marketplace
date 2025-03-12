import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";

const products = [
  {
    id: 1,
    name: "Fresh Tomatoes",
    price: 200,
    unit: "kg",
    stock: 15,
    category: "Vegetables",
    image: "https://via.placeholder.com/150",
  },
  {
    id: 2,
    name: "Organic Maize",
    price: 500,
    unit: "sack",
    stock: 5,
    category: "Cereals",
    image: "https://via.placeholder.com/150",
  },
  {
    id: 3,
    name: "Farm Eggs",
    price: 300,
    unit: "tray",
    stock: 10,
    category: "Poultry",
    image: "https://via.placeholder.com/150",
  },
];

const Marketplace = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Marketplace</h1>

      {/* Search Bar */}
      <div className="relative w-full mb-4">
        <input
          type="text"
          placeholder="Search for products..."
          className="w-full p-2 pl-10 border rounded"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
      </div>
      {/* Products Grid */}
      <div className="grid grid-cols-3 gap-6">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div
              key={product.id}
              className="p-4 border rounded-lg shadow-md bg-white"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-40 object-cover rounded-md"
              />
              <div className="mt-3">
                <h2 className="text-lg font-semibold">{product.name}</h2>
                <p className="text-gray-600">
                  <span className="font-medium">Price:</span> Ksh{" "}
                  {product.price}/{product.unit}
                </p>
                <p className="text-gray-600">
                  <span className="font-medium">Stock:</span> {product.stock}{" "}
                  {product.unit} available
                </p>
                <p className="text-gray-600">
                  <span className="font-medium">Category:</span>{" "}
                  {product.category}
                </p>
                <Link
                  to={`/buyer-dashboard/product/${product.id}`}
                  className="mt-2 block text-center bg-blue-500 text-white px-4 py-2 rounded"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))
        ) : (
          <p className="col-span-3 text-center text-gray-500">
            No products found
          </p>
        )}
      </div>
    </div>
  );
};

export default Marketplace;
