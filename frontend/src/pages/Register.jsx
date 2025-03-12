import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { farmerRegister, buyerRegister } from "../api";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    role: "buyer", // Default to buyer
    address: "",
    farmName: "",
    location: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const {
      name,
      email,
      password,
      confirmPassword,
      phone,
      role,
      address,
      farmName,
      location,
    } = formData;

    // Validation
    if (
      !name ||
      !email ||
      !password ||
      !confirmPassword ||
      !phone ||
      (role === "buyer" && !address) ||
      (role === "farmer" && (!farmName || !location))
    ) {
      setError("All fields are required");
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      let response;
      if (role === "farmer") {
        response = await farmerRegister({
          name,
          email,
          password,
          phone,
          farmName,
          location,
          role,
        });
      } else {
        response = await buyerRegister({
          name,
          email,
          password,
          phone,
          address,
          role,
        });
      }

      console.log("User registered:", response.data);

      // Store token and navigate to dashboard
      localStorage.setItem("token", response.data.token);
      navigate(role === "farmer" ? "/login" : "/login");
    } catch (err) {
      setError(
        err.response?.data?.message || "Registration failed. Try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-green-100">
      <div className="bg-gray-100 text-center grid gap-y-2 p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>
        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border rounded mb-4"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border rounded mb-4"
          />
          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            className="w-full p-2 border rounded mb-4"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-2 border rounded mb-4"
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="w-full p-2 border rounded mb-4"
          />
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full p-2 border rounded mb-4"
          >
            <option value="buyer">Buyer</option>
            <option value="farmer">Farmer</option>
          </select>

          {formData.role === "buyer" && (
            <input
              type="text"
              name="address"
              placeholder="Address"
              value={formData.address}
              onChange={handleChange}
              className="w-full p-2 border rounded mb-4"
            />
          )}

          {formData.role === "farmer" && (
            <>
              <input
                type="text"
                name="farmName"
                placeholder="Farm Name"
                value={formData.farmName}
                onChange={handleChange}
                className="w-full p-2 border rounded mb-4"
              />
              <input
                type="text"
                name="location"
                placeholder="Farm Location"
                value={formData.location}
                onChange={handleChange}
                className="w-full p-2 border rounded mb-4"
              />
            </>
          )}

          <button
            type="submit"
            className="w-[30%] bg-blue-500 text-white p-2 rounded"
            disabled={loading}
          >
            {loading ? "Signing Up..." : "Sign Up"}
          </button>
        </form>
        <p className="text-sm mt-4 text-center">
          Already have an account?{" "}
          <a href="/login" className="text-blue-500">
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;
