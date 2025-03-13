import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { viewFarmerProfile, editFarmerProfile } from "../../api";

const FarmerProfile = () => {
  const [farmer, setFarmer] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    farmName: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchFarmerProfile = async () => {
      const userID = Cookies.get("id"); // Retrieve userID from cookies

      if (!userID) {
        setError("User not logged in.");
        setLoading(false);
        return;
      }

      try {
        const response = await viewFarmerProfile(userID);
        setFarmer(response.data.user);
      } catch (err) {
        console.error("Error fetching profile:", err);
        setError("Failed to load profile.");
      } finally {
        setLoading(false);
      }
    };

    fetchFarmerProfile();
  }, []);

  const handleChange = (e) => {
    setFarmer({ ...farmer, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    const userID = Cookies.get("id");
    if (!userID) {
      setError("User not logged in.");
      return;
    }

    const formData = {
      name: farmer.name,
      email: farmer.email,
      phone: farmer.phone,
      location: farmer.location,
      farmName: farmer.farmName,
      id: userID,
    };

    try {
      await editFarmerProfile(formData);
      setIsEditing(false);
      console.log("Profile updated successfully.");
    } catch (err) {
      console.error(
        "Error updating profile:",
        err.response?.data || err.message
      );
      setError("Failed to update profile.");
    }
  };

  if (loading) return <p>Loading profile...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-4">Farmer Profile</h1>
      <div className="bg-gray-100 p-4 rounded-lg">
        <label className="block mb-2">Name:</label>
        <input
          type="text"
          name="name"
          value={farmer.name}
          disabled={!isEditing}
          onChange={handleChange}
          className="w-full p-2 border rounded-lg mb-4"
        />

        <label className="block mb-2">Email:</label>
        <input
          type="email"
          name="email"
          value={farmer.email}
          disabled
          className="w-full p-2 border rounded-lg mb-4 bg-gray-200"
        />

        <label className="block mb-2">Phone Number:</label>
        <input
          type="tel"
          name="phone"
          value={farmer.phone}
          disabled={!isEditing}
          onChange={handleChange}
          className="w-full p-2 border rounded-lg mb-4"
        />

        <label className="block mb-2">Location:</label>
        <input
          type="text"
          name="location"
          value={farmer.location}
          disabled={!isEditing}
          onChange={handleChange}
          className="w-full p-2 border rounded-lg mb-4"
        />

        <label className="block mb-2">Farm Name:</label>
        <input
          type="text"
          name="farmName"
          value={farmer.farmName}
          disabled={!isEditing}
          onChange={handleChange}
          className="w-full p-2 border rounded-lg mb-4"
        />

        {isEditing ? (
          <button
            onClick={handleSave}
            className="bg-green-500 text-white px-4 py-2 rounded-lg w-full"
          >
            Save
          </button>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg w-full"
          >
            Edit Profile
          </button>
        )}
      </div>
    </div>
  );
};

export default FarmerProfile;
