import React, { useState } from "react";

const MyProducts = () => {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Tomatoes",
      price: 5,
      unit: "kg",
      stock: 20,
      category: "Vegetables",
      image: "https://via.placeholder.com/100",
    },
    {
      id: 2,
      name: "Milk",
      price: 1,
      unit: "liters",
      stock: 50,
      category: "Dairy",
      image: "https://via.placeholder.com/100",
    },
  ]);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingProduct, setEditingProduct] = useState(null);

  const handleDelete = (id) => {
    setProducts(products.filter((product) => product.id !== id));
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
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">My Products</h1>
      <input
        type="text"
        placeholder="Search for products..."
        className="w-full p-2 border rounded mb-4"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="grid grid-cols-1 gap-4">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="p-4 border rounded-lg flex items-center gap-4"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-24 h-24 object-cover rounded-lg"
            />
            <div className="flex-1">
              <h2 className="text-xl font-semibold">{product.name}</h2>
              <p>
                <span className="font-medium">Price:</span> ${product.price}/
                {product.unit}
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
                  onClick={() => handleDelete(product.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
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
