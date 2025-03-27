import React, { useState, useEffect } from "react";
import { fetchOrders, cancelOrder } from "../../api"; // API function to get orders
import { format } from "date-fns"; // For formatting dates

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    const getOrders = async () => {
      try {
        const response = await fetchOrders();
        setOrders(response.data.orders || []);
        setFilteredOrders(response.data.orders || []); // Initialize filtered orders
      } catch (err) {
        setError("Failed to fetch orders.");
      } finally {
        setLoading(false);
      }
    };
    getOrders();
  }, []);

  const handleCancelOrder = async (id) => {
    const confirmCancel = window.confirm(
      "Are you sure you want to cancel this order?"
    );
    if (!confirmCancel) return;

    try {
      await cancelOrder(id);
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === id ? { ...order, status: "Cancelled" } : order
        )
      );
    } catch (error) {
      console.error("Error cancelling order:", error);
    }
  };

  // Filter orders based on selected status
  useEffect(() => {
    if (filter === "All") {
      setFilteredOrders(orders);
    } else {
      setFilteredOrders(orders.filter((order) => order.status === filter));
    }
  }, [filter, orders]);

  if (loading) return <p className="p-6 text-center">Loading orders...</p>;
  if (error) return <p className="p-6 text-center text-red-500">{error}</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Your Orders</h1>

      {/* Filter Dropdown */}
      <div className="mt-4">
        <label className="mr-2 font-semibold">Filter by Status:</label>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="All">All</option>
          <option value="Pending">Pending</option>
          <option value="Confirmed">Confirmed</option>
          <option value="Cancelled">Cancelled</option>
        </select>
      </div>

      {/* Orders List */}
      {filteredOrders.length === 0 ? (
        <p className="mt-4">No orders match the selected filter.</p>
      ) : (
        <div className="mt-4">
          <ul>
            {filteredOrders.map((order) => (
              <li
                key={order._id}
                className="p-4 bg-gray-100 rounded-lg mb-2 flex justify-between items-center"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={`http://localhost:3000/${order.product.productImage}`}
                    alt={order.product.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div>
                    <p className="font-semibold">{order.product.name}</p>
                    <p className="text-sm text-gray-600">
                      {order.product.description}
                    </p>
                    <p className="text-lg font-bold text-green-600">
                      KES {order.product.price} / {order.product.unit}
                    </p>
                    <p className="text-sm">
                      Quantity: <strong>{order.product.quantity}</strong>
                    </p>
                    <p className="text-sm">
                      Total: <strong>KES {order.totalAmount}</strong>
                    </p>
                    <p className="text-sm">
                      Status:{" "}
                      <span
                        className={`px-2 py-1 rounded ${
                          order.status === "Pending"
                            ? "bg-yellow-300"
                            : order.status === "Confirmed"
                            ? "bg-green-300"
                            : order.status === "Cancelled"
                            ? "bg-red-300"
                            : "bg-gray-300"
                        }`}
                      >
                        {order.status}
                      </span>
                    </p>
                    <p className="text-xs text-gray-500">
                      Ordered on:{" "}
                      {order.createdAt
                        ? format(new Date(order.createdAt), "PPpp")
                        : "N/A"}
                    </p>
                  </div>
                </div>

                {/* Cancel Order Button (Visible Only for Pending Orders) */}
                {order.status === "Pending" && (
                  <button
                    onClick={() => handleCancelOrder(order._id)}
                    className="bg-red-500 text-white px-4 py-2 rounded-md cursor-pointer shadow-md transition-all duration-300 
                           hover:bg-red-600 hover:shadow-lg active:scale-95 disabled:bg-gray-400 disabled:cursor-not-allowed"
                  >
                    Cancel Order
                  </button>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Orders;
