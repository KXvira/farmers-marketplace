import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  // Dummy product data (replace with API fetch)
  const dummyProducts = [
    {
      id: "1",
      name: "Fresh Tomatoes",
      price: 500,
      unit: "per kg",
      description: "Organically grown fresh tomatoes from local farms.",
      image: "https://via.placeholder.com/300",
    },
    {
      id: "2",
      name: "Organic Maize",
      price: 1000,
      unit: "per bag",
      description: "Fresh organic maize, directly from farmers.",
      image: "https://via.placeholder.com/300",
    },
  ];

  useEffect(() => {
    const foundProduct = dummyProducts.find((p) => p.id === id);
    setProduct(foundProduct);
  }, [id]);

  const addToCart = () => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`${product.name} added to cart!`);
  };

  if (!product) return <p className="p-6">Product not found.</p>;

  return (
    <div className="p-6 max-w-lg mx-auto bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold">{product.name}</h1>
      <img
        src={product.image}
        alt={product.name}
        className="w-full max-w-md mt-4 rounded-lg"
      />
      <p className="mt-2 text-lg font-semibold">
        KSh {product.price} {product.unit}
      </p>
      <p className="mt-2">{product.description}</p>
      <button
        onClick={addToCart}
        className="mt-4 p-3 bg-blue-500 text-white rounded-lg w-full"
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductDetails;
