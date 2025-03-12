import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Import Axios for API calls

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("buyer"); // Default to buyer
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const formData = { email, password };
      let response;

      if (role === "farmer") {
        response = await axios.post("/api/v1/farmer/login", formData);
        navigate("/farmer-dashboard/my-products");
      } else {
        response = await axios.post("/api/v1/buyer/login", formData);
        navigate("/buyer-dashboard/marketplace");
      }

      // Store token or user data if needed
      localStorage.setItem("token", response.data.token);
    } catch (err) {
      setError(err.response?.data?.message || "Invalid credentials");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-green-100">
      <div className="bg-gray-100 grid gap-y-2 text-center p-6 rounded-lg shadow-md w-[30%] h-[60%]">
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-[80%] px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          <div className="mb-4">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-[80%] px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          <div className="mb-4">
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-[80%] px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="buyer">Buyer</option>
              <option value="farmer">Farmer</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-[30%] bg-blue-500 text-white text-base py-2 rounded-lg hover:bg-blue-600 hover:cursor-pointer"
          >
            Login
          </button>
        </form>
        <p className="text-sm mt-3">
          Don't have an account?{" "}
          <a href="/register" className="text-blue-500">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
