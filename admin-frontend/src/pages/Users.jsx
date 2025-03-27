import { useState, useEffect } from "react";
import { fetchAllUsers } from "../api";
import Sidebar from "../components/Sidebar";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("all"); // "all", "farmer", "buyer"

  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await fetchAllUsers();
        setUsers(response.data.users || []);
      } catch (err) {
        setError("Failed to fetch users.");
      } finally {
        setLoading(false);
      }
    };

    getUsers();
  }, []);

  // Ensure correct filtering
  const filteredUsers = users.filter((user) => {
    if (filter === "all") return true;
    return user.role === filter;
  });

  return (
    <div className="flex">
      <Sidebar />
      <div className="p-6 w-full">
        <h1 className="text-2xl font-bold mb-4">Manage Users</h1>

        {/* Toggle Buttons */}
        <div className="flex gap-2 mb-4">
          <button
            className={`px-4 py-2 ${
              filter === "all" ? "bg-blue-500 text-white" : "bg-gray-300"
            }`}
            onClick={() => setFilter("all")}
          >
            All Users
          </button>
          <button
            className={`px-4 py-2 ${
              filter === "farmer" ? "bg-green-500 text-white" : "bg-gray-300"
            }`}
            onClick={() => setFilter("farmer")}
          >
            Farmers
          </button>
          <button
            className={`px-4 py-2 ${
              filter === "buyer" ? "bg-yellow-500 text-white" : "bg-gray-300"
            }`}
            onClick={() => setFilter("buyer")}
          >
            Buyers
          </button>
        </div>

        {loading ? (
          <p className="text-center">Loading users...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : (
          <table className="w-full border-collapse border border-gray-200">
            <thead>
              <tr className="bg-gray-100">
                <th className="border p-2">ID</th>
                <th className="border p-2">Name</th>
                <th className="border p-2">Email</th>
                <th className="border p-2">Role</th>
                <th className="border p-2">Phone</th>
                {/* Show different headers based on user type */}
                {filter === "farmer" && (
                  <>
                    <th className="border p-2">Farm Name</th>
                    <th className="border p-2">Farm Location</th>
                  </>
                )}
                {filter === "buyer" && <th className="border p-2">Address</th>}
                {filter === "all" && <th className="border p-2">Details</th>}
                <th className="border p-2">Created At</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user._id} className="text-center">
                  <td className="border p-2">{user._id}</td>
                  <td className="border p-2">{user.name}</td>
                  <td className="border p-2">{user.email}</td>
                  <td className="border p-2 capitalize">{user.role}</td>
                  <td className="border p-2">{user.phone || "N/A"}</td>
                  {/* Dynamic row values */}
                  {filter === "farmer" && (
                    <>
                      <td className="border p-2">
                        {user.farm?.farmName || "N/A"}
                      </td>
                      <td className="border p-2">
                        {user.farm?.location || "N/A"}
                      </td>
                    </>
                  )}
                  {filter === "buyer" && (
                    <td className="border p-2">{user.address || "N/A"}</td>
                  )}
                  {filter === "all" && (
                    <td className="border p-2">
                      {user.role === "farmer"
                        ? `${user.farm?.farmName || "N/A"} (${
                            user.farm?.location || "N/A"
                          })`
                        : user.address || "N/A"}
                    </td>
                  )}
                  <td className="border p-2">
                    {new Date(user.createdAt).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Users;
