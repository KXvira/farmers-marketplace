import React, { useState } from "react";

const AddProduct = () => {
  const [product, setProduct] = useState({
    name: "",
    price: "",
    unit: "kg", // Default unit
    category: "Fruits", // Default category
    description: "",
    stock: "",
    image: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    setProduct((prev) => ({ ...prev, image: e.target.files[0] }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Product added:", product);
    // Add API call or state update logic here
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

        {/* Price and Unit Selection */}
        <div className="flex gap-2">
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={product.price}
            onChange={handleChange}
            className="w-3/4 p-2 border rounded"
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

        {/* Category Selection */}
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
          name="image"
          onChange={handleImageChange}
          className="w-full p-2 border rounded"
          required
        />

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
