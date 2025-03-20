import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { IoTrashBinSharp } from "react-icons/io5";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import { viewCart } from "../../api";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch cart from backend
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await viewCart();
        // Ensure products exist in response and add default quantity of 1
        const products = response.data.cart.products || [];
        const productsWithQuantity = products.map((item) => ({
          ...item,
          quantity: 1, // Default quantity
        }));
        setCartItems(productsWithQuantity);
      } catch (err) {
        setError("Failed to load cart items.");
      } finally {
        setLoading(false);
      }
    };
    fetchCart();
  }, []);

  // Increase quantity
  const increaseQuantity = (id) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item._id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  // Decrease quantity (but not below 1)
  const decreaseQuantity = (id) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item._id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  // Remove item from cart
  const removeFromCart = (id) => {
    setCartItems(cartItems.filter((item) => item._id !== id));
  };

  // Calculate total price
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  if (loading) return <p className="p-6 text-center">Loading cart...</p>;
  if (error) return <p className="p-6 text-center text-red-500">{error}</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <p className="mt-4">Your cart is empty.</p>
      ) : (
        <div className="mt-4">
          <ul>
            {cartItems.map((item) => (
              <li
                key={item._id}
                className="p-4 bg-gray-100 rounded-lg mb-2 flex justify-between items-center"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={`http://localhost:3000/${item.productImage}`}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div>
                    <p className="font-semibold">{item.name}</p>
                    <p className="text-sm text-gray-600">{item.description}</p>
                    <p className="text-lg font-bold text-green-600">
                      KES {item.price} / {item.unit}
                    </p>
                    {/* Quantity Controls */}
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => decreaseQuantity(item._id)}
                        className="bg-gray-300 px-2 py-1 rounded"
                      >
                        <AiOutlineMinus />
                      </button>
                      <span className="font-bold">{item.quantity}</span>
                      <button
                        onClick={() => increaseQuantity(item._id)}
                        className="bg-gray-300 px-2 py-1 rounded"
                      >
                        <AiOutlinePlus />
                      </button>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => removeFromCart(item._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  <IoTrashBinSharp />
                </button>
              </li>
            ))}
          </ul>
          <h2 className="text-xl font-bold mt-4">Total: KES {totalPrice}</h2>
          <Link
            to="/checkout"
            className="mt-4 block p-4 bg-green-500 text-white rounded-lg text-center"
          >
            Proceed to Checkout
          </Link>
        </div>
      )}
    </div>
  );
};

export default Cart;
