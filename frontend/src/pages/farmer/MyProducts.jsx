import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { getFarmerProducts, editProduct, deleteProduct } from "../../api";
import { FaSearch } from "react-icons/fa";

const MyProducts = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [editingProduct, setEditingProduct] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getFarmerProducts();
        //console.log("API Response:", response.data); // Debugging

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
    if (!id) {
      //console.error("Error: Product ID is undefined");
      return;
    }

    if (!window.confirm("Are you sure you want to delete this product?"))
      return;

    try {
      console.log("Deleting product with ID:", id);
      await deleteProduct(id);
      setProducts(products.filter((product) => product._id !== id));
    } catch (err) {
      console.error("Error deleting product:", err);
      alert("Failed to delete product. Please try again.");
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
  };

  const handleSave = (e) => {
    e.preventDefault();
    setProducts(
      products.map((p) => (p.id === editingProduct.id ? editingProduct : p))
    );
    setEditingProduct(null);
  };

  const filteredProducts = products.filter((product) =>
    product.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <p className="text-center text-gray-500">Loading...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">My Products</h1>
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
      <div className="grid grid-cols-1 gap-4">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div
              key={product.id}
              className="p-4 border rounded-lg flex items-center gap-4"
            >
              <img
                src={
                  product.productImage
                    ? `http://localhost:3000/${product.productImage}`
                    : "https://via.placeholder.com/150"
                }
                alt={product.name}
                className="w-24 h-24 object-cover rounded-lg"
              />
              <div className="flex-1">
                <h2 className="text-xl font-semibold">{product.name}</h2>
                <p>
                  <span className="font-medium">Price:</span> Ksh{" "}
                  {product.price}/{product.unit}
                </p>
                <p>
                  <span className="font-medium">Stock:</span> {product.stock}{" "}
                  {product.unit} available
                </p>
                <p>
                  <span className="font-medium">Category:</span>{" "}
                  {product.category}
                </p>
                <div className="mt-2 flex gap-2">
                  <button
                    onClick={() => handleEdit(product)}
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(product._id)}
                    className="bg-red-500 text-white px-4 py-2 rounded"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No products found</p>
        )}
      </div>

      {editingProduct && (
        <div className="mt-6 p-4 border rounded-lg">
          <h2 className="text-lg font-semibold">Edit Product</h2>
          <form onSubmit={handleSave} className="mt-2">
            <label className="block font-medium">Product Name</label>
            <input
              type="text"
              value={editingProduct.name}
              onChange={(e) =>
                setEditingProduct({ ...editingProduct, name: e.target.value })
              }
              className="w-full p-2 border rounded mb-2"
            />
            <label className="block font-medium">Price Per Unit</label>
            <input
              type="number"
              value={editingProduct.price}
              placeholder="Price per unit"
              onChange={(e) =>
                setEditingProduct({ ...editingProduct, price: e.target.value })
              }
              className="w-full p-2 border rounded mb-2"
            />
            <label className="block font-medium">Stock</label>
            <input
              type="number"
              value={editingProduct.stock}
              placeholder="Stock Available"
              onChange={(e) =>
                setEditingProduct({ ...editingProduct, stock: e.target.value })
              }
              className="w-full p-2 border rounded mb-2"
            />
            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded"
            >
              Save Changes
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default MyProducts;
