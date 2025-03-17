import React, { useState, useEffect } from "react";
import { getFarmerProducts, editProduct, deleteProduct } from "../../api";
import { FaSearch, FaEdit, FaTrash } from "react-icons/fa";
import { Dialog } from "@headlessui/react";

const MyProducts = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [editingProduct, setEditingProduct] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getFarmerProducts();
        if (!response.data || !Array.isArray(response.data.products)) {
          throw new Error("Unexpected API response structure");
        }
        setProducts(response.data.products);
      } catch (err) {
        console.error("Error fetching products:", err);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    if (!id || !window.confirm("Are you sure you want to delete this product?"))
      return;
    try {
      await deleteProduct(id);
      setProducts(products.filter((product) => product._id !== id));
    } catch (err) {
      console.error("Error deleting product:", err);
      alert("Failed to delete product. Please try again.");
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      await editProduct(editingProduct, editingProduct._id);
      setProducts(
        products.map((p) => (p._id === editingProduct._id ? editingProduct : p))
      );
      setEditingProduct(null);
    } catch (error) {
      console.error("Failed to update product:", error);
      alert("Error updating product. Please try again.");
    }
  };

  const filteredProducts = products.filter((product) =>
    product.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">My Products</h1>
      <div className="relative mb-6">
        <input
          type="text"
          placeholder="Search for products..."
          className="w-full p-3 pl-10 border rounded-lg shadow-sm focus:ring focus:ring-blue-300"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
      </div>
      <div className="grid gap-6">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div
              key={product._id}
              className="flex items-center bg-white p-4 rounded-lg shadow-md"
            >
              <img
                src={
                  product.productImage
                    ? `http://localhost:3000/${product.productImage}`
                    : "https://via.placeholder.com/150"
                }
                alt={product.name}
                className="w-24 h-24 object-cover rounded-lg border"
              />
              <div className="flex-1 ml-4">
                <h2 className="text-xl font-semibold text-gray-800">
                  {product.name}
                </h2>
                <p className="text-gray-600">
                  Price: Ksh {product.price}/{product.unit}
                </p>
                <p className="text-gray-600">
                  Stock: {product.stock} {product.unit} available
                </p>
                <p className="text-gray-600">Category: {product.category}</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setEditingProduct(product)}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-lg"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => handleDelete(product._id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-lg"
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No products found</p>
        )}
      </div>

      {/* Edit Product Modal */}
      {editingProduct && (
        <Dialog
          open={true}
          onClose={() => setEditingProduct(null)}
          className="fixed inset-0 flex items-center justify-center bg-gray-950 opacity-90"
        >
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 opacity-100">
            <h2 className="text-lg font-semibold">Edit Product</h2>
            <form onSubmit={handleSave} className="mt-4 space-y-4">
              <div>
                <label className="block text-gray-700 font-medium">
                  Product Name
                </label>
                <input
                  type="text"
                  value={editingProduct.name}
                  onChange={(e) =>
                    setEditingProduct({
                      ...editingProduct,
                      name: e.target.value,
                    })
                  }
                  className="w-full p-2 border rounded-lg"
                  placeholder="Product Name"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium">
                  Price per unit
                </label>
                <input
                  type="number"
                  value={editingProduct.price}
                  onChange={(e) =>
                    setEditingProduct({
                      ...editingProduct,
                      price: e.target.value,
                    })
                  }
                  className="w-full p-2 border rounded-lg"
                  placeholder="Price per unit"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium">
                  Stock Available
                </label>
                <input
                  type="number"
                  value={editingProduct.stock}
                  onChange={(e) =>
                    setEditingProduct({
                      ...editingProduct,
                      stock: e.target.value,
                    })
                  }
                  className="w-full p-2 border rounded-lg"
                  placeholder="Stock Available"
                />
              </div>

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditingProduct(null)}
                  className="px-4 py-2 bg-gray-300 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-500 text-white rounded-lg"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </Dialog>
      )}
    </div>
  );
};

export default MyProducts;
