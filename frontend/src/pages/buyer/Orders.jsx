import React, { useState, useEffect } from "react";
import { fetchOrders } from "../../api"; // API function to get orders
import { format } from "date-fns"; // For formatting dates

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getOrders = async () => {
      try {
        const response = await fetchOrders();
        setOrders(response.data.orders || []);
        //console.log(response.data.orders);
      } catch (err) {
        setError("Failed to fetch orders.");
      } finally {
        setLoading(false);
      }
    };
    getOrders();
  }, []);

  if (loading) return <p className="p-6 text-center">Loading orders...</p>;
  if (error) return <p className="p-6 text-center text-red-500">{error}</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Your Orders</h1>
      {orders.length === 0 ? (
        <p className="mt-4">You have no orders yet.</p>
      ) : (
        <div className="mt-4">
          <ul>
            {orders.map((order) => (
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
                            : "bg-green-300"
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
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Orders;
