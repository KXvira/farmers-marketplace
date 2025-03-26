import Sidebar from "../components/Sidebar";

const Users = () => {
  // Fake users data
  const users = [
    {
      id: 1,
      name: "Kevin Kimurgor",
      email: "kevin@example.com",
      role: "Admin",
    },
    { id: 2, name: "Jane Doe", email: "jane@example.com", role: "Farmer" },
    { id: 3, name: "John Smith", email: "john@example.com", role: "Buyer" },
  ];

  return (
    <div className="flex">
      <Sidebar />
      <div className="p-6 w-full">
        <h1 className="text-2xl font-bold mb-4">Manage Users</h1>
        <table className="w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">ID</th>
              <th className="border p-2">Name</th>
              <th className="border p-2">Email</th>
              <th className="border p-2">Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="text-center">
                <td className="border p-2">{user.id}</td>
                <td className="border p-2">{user.name}</td>
                <td className="border p-2">{user.email}</td>
                <td className="border p-2">{user.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
