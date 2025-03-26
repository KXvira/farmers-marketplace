import Sidebar from "../components/Sidebar";

const Dashboard = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="p-6 w-full">
        <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Fake Statistics */}
          <div className="bg-blue-500 text-white p-4 rounded-lg">
            <h3 className="text-lg font-semibold">Total Sales</h3>
            <p className="text-2xl font-bold">KES 120,000</p>
          </div>

          <div className="bg-green-500 text-white p-4 rounded-lg">
            <h3 className="text-lg font-semibold">Total Users</h3>
            <p className="text-2xl font-bold">50</p>
          </div>

          <div className="bg-yellow-500 text-white p-4 rounded-lg">
            <h3 className="text-lg font-semibold">Orders Pending</h3>
            <p className="text-2xl font-bold">12</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
