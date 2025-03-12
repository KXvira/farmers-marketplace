import React, { useState, useEffect } from "react";

const Profile = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    // Fetch user details (replace with actual API/local storage)
    setUser({
      name: "John Doe",
      email: "john@example.com",
      phone: "+254700000000",
      address: "123 Nairobi Street, Kenya",
    });
  }, []);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    setIsEditing(false);
    // Save updated user details to API or local storage
    console.log("Updated Profile:", user);
  };

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-4">Buyer Profile</h1>
      <div className="bg-gray-100 p-4 rounded-lg">
        <label className="block mb-2">Name:</label>
        <input
          type="text"
          name="name"
          value={user.name}
          disabled={!isEditing}
          onChange={handleChange}
          className="w-full p-2 border rounded-lg mb-4"
        />

        <label className="block mb-2">Email:</label>
        <input
          type="email"
          name="email"
          value={user.email}
          disabled
          className="w-full p-2 border rounded-lg mb-4 bg-gray-200"
        />

        <label className="block mb-2">Phone Number:</label>
        <input
          type="tel"
          name="phone"
          value={user.phone}
          disabled={!isEditing}
          onChange={handleChange}
          className="w-full p-2 border rounded-lg mb-4"
        />

        <label className="block mb-2">Address:</label>
        <input
          type="text"
          name="address"
          value={user.address}
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

export default Profile;
