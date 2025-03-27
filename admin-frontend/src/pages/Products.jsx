import React, { useState, useEffect } from "react";
import { fetchAllProducts } from "../api";
import { FaEdit, FaTrash } from "react-icons/fa";
import Sidebar from "../components/Sidebar";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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

  return (
    <div className="flex">
      <Sidebar />
      <div className="p-6 w-full">
        <h1 className="text-2xl font-bold mb-4">Manage Products</h1>

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
                <th className="border p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.length > 0 ? (
                products.map((product) => (
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
                    <td className="border p-2 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <button className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded-lg">
                          <FaEdit />
                        </button>
                        <button className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded-lg">
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center text-gray-500 p-4">
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
