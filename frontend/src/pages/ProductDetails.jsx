import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getProductDetails } from "../api";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await getProductDetails(id);
        console.log("Fetched product:", response.data);
        setProduct(response.data.product);
      } catch (err) {
        console.error("Error fetching product:", err);
        setError("Failed to load product details.");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  const addToCart = () => {
    if (!product) return;
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`${product.name} added to cart!`);
  };

  if (loading) return <p className="p-6 text-center">Loading product...</p>;
  if (error) return <p className="p-6 text-center text-red-500">{error}</p>;
  if (!product) return <p className="p-6 text-center">Product not found.</p>;

  return (
    <div className="p-6 max-w-lg mx-auto bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold">{product.name}</h1>

      <img
        src={
          product.productImage
            ? `http://localhost:3000/${product.productImage}`
            : "https://via.placeholder.com/300"
        }
        alt={product.name}
        className="w-full max-w-md mt-4 rounded-lg"
      />

      <div className="mt-4">
        <p className="text-gray-600 font-semibold">Price:</p>
        <p className="text-lg font-semibold">
          KSh {product.price} {product.unit}
        </p>
      </div>

      <div className="mt-2">
        <p className="text-gray-600 font-semibold">Description:</p>
        <p>{product.description}</p>
      </div>

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
