import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { farmerLogin, buyerLogin } from "../api";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("buyer");
  const [error, setError] = useState(""); // Ensure error is always a string
  const navigate = useNavigate();

  useEffect(() => {
    setError(""); // Clear error when component mounts
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const formData = { email, password, role };
      let response;

      if (role === "farmer") {
        response = await farmerLogin(formData);
        navigate("/farmer-dashboard/my-products");
      } else {
        response = await buyerLogin(formData);
        navigate("/buyer-dashboard/marketplace");
      }

      console.log("Login Response:", response.data); // Debugging

      // Store user token in cookies (valid for 1 day)
      Cookies.set("token", response.data.token, {
        expires: 1,
        secure: true,
        sameSite: "Strict",
      });
      Cookies.set("role", role, {
        expires: 1,
        secure: true,
        sameSite: "Strict",
      });
      Cookies.set("id", response.data.id, {
        expires: 1,
        secure: true,
        sameSite: "Strict",
      });

      console.log("Token Stored:", Cookies.get("token")); // Debugging
    } catch (err) {
      setError(err.response?.data?.message || "Invalid credentials");
      console.error("Login Error:", err); // Debugging
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-green-100">
      <div className="bg-gray-100 grid gap-y-2 text-center p-6 rounded-lg shadow-md w-[30%] h-[60%]">
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
        {error && typeof error === "string" && (
          <p className="text-red-500 text-sm mb-2">{error}</p>
        )}
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
