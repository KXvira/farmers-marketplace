import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { getProducts } from "../../api";

const Marketplace = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getProducts();
        if (!response.data || !Array.isArray(response.data.products)) {
          throw new Error("Unexpected API response structure");
        }
        setProducts(response.data.products);
      } catch (err) {
        setError("Failed to fetch products. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const categories = [
    "all",
    ...new Set(products.map((product) => product.category).filter(Boolean)),
  ];

  const filteredProducts = products.filter((product) => {
    return (
      product.name?.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedCategory === "all" || product.category === selectedCategory)
    );
  });

  if (loading) return <p className="text-center text-gray-500">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Marketplace</h1>

      {/* Search & Filter Bar */}
      <div className="flex flex-col md:flex-row gap-4 mb-6 items-center">
        <div className="relative w-full md:w-2/3">
          <input
            type="text"
            placeholder="Search for products..."
            className="w-full p-3 pl-10 border rounded-full shadow-sm focus:ring focus:ring-blue-300"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" />
        </div>

        <select
          className="p-3 border rounded-full shadow-sm bg-white cursor-pointer"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </option>
          ))}
        </select>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div
              key={product._id}
              className="p-4 border rounded-xl shadow-lg bg-white hover:shadow-2xl transition-transform transform hover:scale-105"
            >
              <img
                src={
                  product.productImage
                    ? `http://localhost:3000/${product.productImage}`
                    : "https://via.placeholder.com/200"
                }
                alt={product.name}
                className="w-full h-48 object-cover rounded-lg"
              />
              <div className="mt-4">
                <h2 className="text-lg font-semibold text-gray-800">
                  {product.name}
                </h2>
                <p className="text-gray-600 mt-1 font-medium">
                  Price:{" "}
                  <span className="text-blue-600 font-semibold">
                    Ksh {product.price}/{product.unit}
                  </span>
                </p>
                <p className="text-gray-500 text-sm">
                  Stock: {product.stock} {product.unit} available
                </p>
                <p className="text-gray-500 text-sm">
                  Category: {product.category}
                </p>
                <Link
                  to={`/buyer-dashboard/product/${product._id}`}
                  className="mt-3 block text-center bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">
            No products found
          </p>
        )}
      </div>
    </div>
  );
};

export default Marketplace;
