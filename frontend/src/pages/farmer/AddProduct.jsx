import React, { useState } from "react";
import { addProduct } from "../../api";
import Cookies from "js-cookie";

const AddProduct = () => {
  const [product, setProduct] = useState({
    name: "",
    price: "",
    unit: "kg",
    category: "Fruits",
    description: "",
    stock: "",
    productImage: null,
  });

  const [imagePreview, setImagePreview] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setProduct((prev) => ({ ...prev, productImage: file }));

    // Preview image
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    // Fetch farmerId from cookies
    const farmerId = Cookies.get("id");
    if (!farmerId) {
      alert("Farmer ID not found. Please log in again.");
      return;
    }

    // Append farmerId and other product data
    formData.append("farmerId", farmerId);
    Object.entries(product).forEach(([key, value]) => {
      formData.append(key, value);
    });

    try {
      await addProduct(formData);
      alert("Product added successfully!");
      setProduct({
        name: "",
        price: "",
        unit: "kg",
        category: "Fruits",
        description: "",
        stock: "",
        productImage: null,
      });
      setImagePreview(null);
    } catch (error) {
      console.error("Error adding product:", error);
      alert("Failed to add product.");
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Add New Product</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={product.name}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />

        {/* Price and Unit */}
        <div className="flex gap-2">
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={product.price}
            onChange={handleChange}
            className="w-3/4 p-2 border rounded"
            min="0"
            required
          />
          <select
            name="unit"
            value={product.unit}
            onChange={handleChange}
            className="w-1/4 p-2 border rounded"
          >
            <option value="kg">Kg</option>
            <option value="liters">Liters</option>
            <option value="pieces">Pieces</option>
          </select>
        </div>

        {/* Category */}
        <select
          name="category"
          value={product.category}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        >
          <option value="Fruits">Fruits</option>
          <option value="Vegetables">Vegetables</option>
          <option value="Dairy">Dairy Products</option>
          <option value="Meat">Meat</option>
          <option value="Grains">Grains</option>
        </select>

        {/* Stock */}
        <input
          type="number"
          name="stock"
          placeholder="Stock Available"
          value={product.stock}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          min="0"
          required
        />

        {/* Description */}
        <textarea
          name="description"
          placeholder="Description"
          value={product.description}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        ></textarea>

        {/* Image Upload */}
        <label className="block text-sm font-semibold">Insert Image</label>
        <input
          type="file"
          name="productImage"
          accept="image/*"
          onChange={handleImageChange}
          className="w-full p-2 border rounded"
          required
        />

        {/* Image Preview */}
        {imagePreview && (
          <img
            src={imagePreview}
            alt="Preview"
            className="w-full h-32 object-cover rounded mt-2"
          />
        )}

        <button
          type="submit"
          className="w-full bg-green-500 text-white p-2 rounded"
        >
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
