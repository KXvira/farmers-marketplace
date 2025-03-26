import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="h-screen w-64 bg-gray-800 text-white p-5">
      <h2 className="text-xl font-bold">Admin Panel</h2>
      <ul className="mt-4">
        <li className="py-2">
          <Link to="/dashboard">Dashboard</Link>
        </li>
        <li className="py-2">
          <Link to="/users">Manage Users</Link>
        </li>
        <li className="py-2">
          <Link to="/products">Products</Link>
        </li>
        <li className="py-2">
          <Link to="/reports">Reports</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
