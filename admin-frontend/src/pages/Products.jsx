import React, { useState, useEffect } from "react";
import { fetchAllProducts, approveProduct } from "../api";
import { FaCheckCircle } from "react-icons/fa";
import Sidebar from "../components/Sidebar";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await fetchAllProducts();
        setProducts(response.data.products || []);
      } catch (err) {
        setError("Failed to fetch products.");
      } finally {
        setLoading(false);
      }
    };

    getProducts();
  }, []);

  const handleApprove = async (productId) => {
    try {
      const response = await approveProduct(productId);
      if (response.data.success) {
        setProducts((prevProducts) =>
          prevProducts.map((product) =>
            product._id === productId ? { ...product, approved: true } : product
          )
        );
      }
    } catch (err) {
      setError("Failed to approve product.");
    }
  };

  const filteredProducts = products.filter((product) => {
    if (filterStatus === "all") return true;
    if (filterStatus === "approved") return product.approved;
    if (filterStatus === "pending") return !product.approved;
    return true; // Default to showing all if filterStatus is invalid
  });

  return (
    <div className="flex">
      <Sidebar />
      <div className="p-6 w-full">
        <h1 className="text-2xl font-bold mb-4">Manage Products</h1>

        <div className="mb-4">
          <label className="mr-2">Filter by Approval Status:</label>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="border p-2 rounded"
          >
            <option value="all">All</option>
            <option value="approved">Approved</option>
            <option value="pending">Pending</option>
          </select>
        </div>

        {loading ? (
          <p className="text-center">Loading products...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : (
          <table className="w-full border-collapse border border-gray-200">
            <thead>
              <tr className="bg-gray-100">
                <th className="border p-2">Image</th>
                <th className="border p-2">Name</th>
                <th className="border p-2">Category</th>
                <th className="border p-2">Price</th>
                <th className="border p-2">Stock</th>
                <th className="border p-2">Approval Status</th>
                <th className="border p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <tr key={product._id} className="text-center">
                    <td className="border p-2">
                      <img
                        src={
                          product.productImage
                            ? `http://localhost:3000/${product.productImage}`
                            : "https://via.placeholder.com/100"
                        }
                        alt={product.name}
                        className="w-12 h-12 object-cover rounded-lg border"
                      />
                    </td>
                    <td className="border p-2">{product.name}</td>
                    <td className="border p-2">{product.category}</td>
                    <td className="border p-2">
                      {product.price} KES / {product.unit}
                    </td>
                    <td className="border p-2">{product.stock}</td>
                    <td className="border p-2">
                      {product.approved ? (
                        <span className="text-green-500">Approved</span>
                      ) : (
                        <span className="text-yellow-500">Pending</span>
                      )}
                    </td>

                    <td className="border p-2 text-center">
                      {product.approved ? (
                        <button
                          className="bg-gray-500 text-white px-2 py-1 rounded-lg cursor-not-allowed"
                          disabled
                        >
                          Approved
                        </button>
                      ) : (
                        <button
                          className="bg-green-500 hover:bg-green-600 text-white px-2 py-1 rounded-lg"
                          onClick={() => handleApprove(product._id)}
                        >
                          <FaCheckCircle />
                          Approve
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center text-gray-500 p-4">
                    No products available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Products;
