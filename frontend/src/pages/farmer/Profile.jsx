import React, { useState } from "react";

const Profile = () => {
  const [farmer, setFarmer] = useState({
    name: "John Doe",
    email: "johndoe@example.com",
    phone: "+254700000000",
    location: "Nairobi, Kenya",
    farmName: "Doe's Organic Farm",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFarmer((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Profile updated successfully!");
    console.log("Updated Farmer Profile:", farmer);
  };

  return (
    <div className="p-6 max-w-lg mx-auto bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Farmer Profile</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <label className="block">
          Name:
          <input
            type="text"
            name="name"
            value={farmer.name}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </label>

        <label className="block">
          Email:
          <input
            type="email"
            name="email"
            value={farmer.email}
            disabled
            className="w-full p-2 border rounded bg-gray-200"
          />
        </label>

        <label className="block">
          Phone:
          <input
            type="text"
            name="phone"
            value={farmer.phone}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </label>

        <label className="block">
          Location:
          <input
            type="text"
            name="location"
            value={farmer.location}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </label>

        <label className="block">
          Farm Name:
          <input
            type="text"
            name="farmName"
            value={farmer.farmName}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </label>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default Profile;
