import Sidebar from "../components/Sidebar";

const Reports = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="p-6 w-full">
        <h1 className="text-2xl font-bold mb-4">Reports & Analytics</h1>
        <p>Here you will see sales and product performance analytics.</p>
      </div>
    </div>
  );
};

export default Reports;
