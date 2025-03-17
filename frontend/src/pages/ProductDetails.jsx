import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getProductDetails, getFarmerProfile } from "../api";
import { FaPhone, FaMapMarkerAlt, FaStar } from "react-icons/fa";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [farmer, setFarmer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [farmerLoading, setFarmerLoading] = useState(true);
  const [farmerError, setFarmerError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await getProductDetails(id);
        setProduct(response.data.product);
        if (response.data.product && response.data.product.farmerId) {
          fetchFarmerDetails(response.data.product.farmerId);
        } else {
          setFarmerLoading(false);
        }
      } catch (err) {
        setError("Failed to load product details.");
        setFarmerLoading(false);
      } finally {
        setLoading(false);
      }
    };

    const fetchFarmerDetails = async (farmerId) => {
      try {
        const response = await getFarmerProfile(farmerId);
        if (response.data) {
          setFarmer(response.data);
        } else {
          setFarmerError("Farmer information not available.");
        }
      } catch (err) {
        setFarmerError("Failed to load farmer details.");
      } finally {
        setFarmerLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    } else {
      setLoading(false);
      setFarmerLoading(false);
      setError("No product ID provided.");
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
    <div className="p-6 max-w-5xl mx-auto bg-white shadow-lg rounded-2xl">
      <div className="grid md:grid-cols-2 gap-8">
        {/* Product Details */}
        <div className="bg-gradient-to-br from-green-100 to-white p-6 rounded-xl shadow-lg">
          <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
          <img
            src={
              product.productImage
                ? `http://localhost:3000/${product.productImage}`
                : "https://source.unsplash.com/400x300/?farm,produce"
            }
            alt={product.name}
            className="w-full mt-4 rounded-xl shadow-md"
          />
          <div className="mt-4 text-gray-700">
            <p className="text-lg font-semibold">Price:</p>
            <p className="text-2xl font-bold text-green-600">
              KSh {product.price} {product.unit}
            </p>
          </div>
          <div className="mt-2">
            <p className="text-lg font-semibold text-gray-700">Description:</p>
            <p className="text-gray-600">{product.description}</p>
          </div>
          <button
            onClick={addToCart}
            className="mt-6 p-3 bg-blue-500 text-white font-semibold rounded-lg w-full transition hover:bg-blue-600 transform hover:scale-105"
          >
            Add to Cart 🛒
          </button>
        </div>

        {/* Farmer Details */}
        <div className="bg-gray-50 border border-gray-200 p-6 rounded-xl shadow-lg">
          {farmerLoading ? (
            <p className="p-4 text-center">Loading farmer details...</p>
          ) : farmerError ? (
            <p className="p-4 text-center text-red-500">{farmerError}</p>
          ) : farmer ? (
            <div>
              <h2 className="text-2xl font-semibold text-gray-900">
                👨‍🌾 Farmer Details
              </h2>
              <p className="mt-3 flex items-center gap-2">
                <span className="font-semibold text-gray-700">Name:</span>
                {farmer.name || "N/A"}
              </p>
              <p className="mt-1 flex items-center gap-2">
                <FaPhone className="text-gray-500" />
                <span className="font-semibold text-gray-700">Phone:</span>{" "}
                {farmer.phone || "N/A"}
              </p>
              <p className="mt-1 flex items-center gap-2">
                <span className="font-semibold text-gray-700">Farm Name:</span>{" "}
                {(farmer.farm && farmer.farm.farmName) || "N/A"}
              </p>
              <p className="mt-1 flex items-center gap-2">
                <FaMapMarkerAlt className="text-gray-500" />
                <span className="font-semibold text-gray-700">
                  Location:
                </span>{" "}
                {(farmer.farm && farmer.farm.location) || "N/A"}
              </p>
              <p className="mt-2 flex items-center gap-2">
                <FaStar className="text-yellow-500" />
                <span className="font-semibold text-gray-700">Rating:</span>
                {farmer.rating || "No ratings yet"} / 5
              </p>
            </div>
          ) : (
            <p className="p-4 text-center text-gray-500">
              No farmer information available for this product
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
