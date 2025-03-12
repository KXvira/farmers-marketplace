import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { IoTrashBinSharp } from "react-icons/io5";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  // Load cart from localStorage on component mount
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(storedCart);
  }, []);

  // Update localStorage whenever cartItems change
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  // Calculate total price
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  // Remove item from cart
  const removeFromCart = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  // Increase quantity
  const increaseQuantity = (id) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  // Decrease quantity (but not below 1)
  const decreaseQuantity = (id) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

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
                key={item.id}
                className="p-4 bg-gray-100 rounded-lg mb-2 flex justify-between items-center"
              >
                <div>
                  <p className="font-semibold">
                    {item.name} - KES {item.price}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <button
                      onClick={() => decreaseQuantity(item.id)}
                      className="bg-gray-300 px-2 py-1 rounded"
                    >
                      <AiOutlineMinus />
                    </button>
                    <span className="font-bold">{item.quantity}</span>
                    <button
                      onClick={() => increaseQuantity(item.id)}
                      className="bg-gray-300 px-2 py-1 rounded"
                    >
                      <AiOutlinePlus />
                    </button>
                  </div>
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
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
