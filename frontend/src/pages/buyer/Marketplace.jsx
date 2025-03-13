import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { getProducts } from "../../api";

const Marketplace = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getProducts();
        console.log("API Response:", response.data); // Debugging

        if (!response.data || !Array.isArray(response.data.products)) {
          throw new Error("Unexpected API response structure");
        }

        setProducts(response.data.products);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Failed to fetch products. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = products.filter((product) =>
    product.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <p className="text-center text-gray-500">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

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
                src={
                  product.productImage
                    ? `http://localhost:3000/${product.productImage}`
                    : "https://via.placeholder.com/150"
                }
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
                  to={`/buyer-dashboard/product/${product._id}`}
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
