import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { getProducts } from "../../api";

const PRODUCTS_PER_PAGE = 10;

const Marketplace = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500);
    return () => clearTimeout(handler);
  }, [searchTerm]);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await getProducts(
          currentPage,
          PRODUCTS_PER_PAGE,
          debouncedSearchTerm,
          selectedCategory
        );

        if (!response?.data?.products) throw new Error("Invalid API response");

        setProducts(response.data.products);
        setTotalPages(response.data.totalPages || 1);
      } catch (err) {
        setError("Failed to fetch products. Please try again later.");
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [currentPage, debouncedSearchTerm, selectedCategory]);

  return (
    <div className="p-6 max-w-7xl mx-auto min-h-screen">
      <h1 className="text-4xl font-bold mb-8 text-center text-yellow-300">
        <span className="text-green-800">Market</span>place
      </h1>

      {/* Search & Filter */}
      <div className="flex flex-col md:flex-row gap-4 mb-8 items-center justify-center">
        {/* Search Bar */}
        <div className="relative w-full md:w-2/3">
          <input
            type="text"
            placeholder="Search for products..."
            className="w-full p-4 pl-12 border border-gray-300 rounded-full shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
          />
          <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" />
        </div>

        {/* Category Filter */}
        <select
          className="p-4 border border-gray-300 rounded-full shadow-sm bg-white cursor-pointer focus:ring-2 focus:ring-blue-400"
          value={selectedCategory}
          onChange={(e) => {
            setSelectedCategory(e.target.value);
            setCurrentPage(1);
          }}
        >
          <option value="all">All Categories</option>
          {[...new Set(products.map((p) => p.category).filter(Boolean))].map(
            (category) => (
              <option key={category} value={category}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </option>
            )
          )}
        </select>
      </div>

      {/* Product Listing */}
      {loading ? (
        <p className="text-center text-gray-500 text-lg">Loading products...</p>
      ) : error ? (
        <p className="text-center text-red-500 text-lg">{error}</p>
      ) : products.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product._id}
              className="flex flex-col p-5 rounded-xl shadow-lg bg-green-100 hover:shadow-2xl transition-transform transform hover:scale-105"
            >
              {/* Product Image */}
              <img
                src={
                  product.productImage.startsWith("http")
                    ? product.productImage
                    : `http://localhost:3000/${product.productImage}`
                }
                alt={product.name}
                className="w-full h-auto max-h-52 object-cover rounded-lg"
              />

              {/* Product Details */}
              <div className="mt-4 flex flex-col flex-grow">
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

                {/* View Details Button */}
                <Link
                  to={`/buyer-dashboard/product/${product._id}`}
                  className="mt-auto block text-center bg-blue-600 text-white px-5 py-3 rounded-full hover:bg-blue-700 transition"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="col-span-full text-center text-gray-500 text-lg">
          No products found.
        </p>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-8 space-x-3">
          <button
            onClick={() => setCurrentPage((prev) => prev - 1)}
            disabled={currentPage === 1}
            className={`px-5 py-3 rounded-full ${
              currentPage === 1
                ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                : "bg-blue-500 text-white hover:bg-blue-600"
            }`}
          >
            Prev
          </button>

          {[...Array(totalPages).keys()].map((num) => (
            <button
              key={num + 1}
              onClick={() => setCurrentPage(num + 1)}
              className={`px-5 py-3 rounded-full ${
                currentPage === num + 1
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {num + 1}
            </button>
          ))}

          <button
            onClick={() => setCurrentPage((prev) => prev + 1)}
            disabled={currentPage === totalPages}
            className={`px-5 py-3 rounded-full ${
              currentPage === totalPages
                ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                : "bg-blue-500 text-white hover:bg-blue-600"
            }`}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default Marketplace;
