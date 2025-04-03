import { useState, useEffect } from "react";
import { fetchAllUsers, fetchAllProducts, fetchCompletedOrders } from "../api"; // Include fetchCompletedOrders
import Sidebar from "../components/Sidebar";
import jsPDF from "jspdf";
import domtoimage from "dom-to-image";
import Papa from "papaparse";

const Reports = () => {
  const [reportType, setReportType] = useState("sales");
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [sales, setSales] = useState([]); // State for sales data
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (reportType === "users") {
      setLoading(true);
      fetchAllUsers()
        .then((response) => {
          setUsers(response.data.users || []);
        })
        .catch(() => setError("Failed to fetch users."))
        .finally(() => setLoading(false));
    } else if (reportType === "products") {
      setLoading(true);
      fetchAllProducts()
        .then((response) => {
          setProducts(response.data.products || []);
        })
        .catch(() => setError("Failed to fetch products."))
        .finally(() => setLoading(false));
    } else if (reportType === "sales") {
      setLoading(true);
      fetchCompletedOrders() // Fetch completed orders for sales report
        .then((response) => {
          setSales(response.data.orders || []);
        })
        .catch(() => setError("Failed to fetch sales data."))
        .finally(() => setLoading(false));
    }
  }, [reportType]);

  const getReportData = () => {
    if (reportType === "users") {
      return users.map((user) => ({
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        phone: user.phone || "N/A",
        createdAt: new Date(user.createdAt).toLocaleString(),
      }));
    }
    if (reportType === "products") {
      return products.map((product) => ({
        id: product._id,
        name: product.name,
        category: product.category,
        price: product.price,
        stock: product.stock,
      }));
    }
    if (reportType === "sales") {
      return sales.map((order) => ({
        orderId: order._id,
        date: new Date(order.createdAt).toLocaleString(),
        product: order.product.name,
        quantity: order.product.quantity,
        total: order.totalAmount,
      }));
    }
    return []; // Default case if no data found
  };

  const getTableHeaders = () => {
    if (reportType === "users")
      return ["ID", "Name", "Email", "Role", "Phone", "Created At"];
    if (reportType === "products")
      return ["ID", "Name", "Category", "Price", "Stock"];
    if (reportType === "sales")
      return ["Order ID", "Date", "Product", "Quantity", "Total (KES)"];
    return [];
  };

  const handleExportPDF = () => {
    const input = document.getElementById("report-content");
    input.style.backgroundColor = "#ffffff";

    domtoimage.toPng(input).then((dataUrl) => {
      const pdf = new jsPDF();
      pdf.addImage(dataUrl, "PNG", 10, 10, 190, 0);
      pdf.save(`${reportType}_report.pdf`);
    });
  };

  const handleExportCSV = () => {
    const csv = Papa.unparse(getReportData());
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.setAttribute("download", `${reportType}_report.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="p-6 w-full">
        <h1 className="text-2xl font-bold mb-4">Reports & Analytics</h1>

        <select
          className="mt-4 p-2 border rounded"
          value={reportType}
          onChange={(e) => setReportType(e.target.value)}
        >
          <option value="sales">Sales Report</option>
          <option value="users">Users Report</option>
          <option value="products">Products Report</option>
        </select>

        <div
          id="report-content"
          className="mt-6 bg-white p-4 shadow rounded-lg"
        >
          <h2 className="text-xl font-semibold capitalize">
            {reportType} Report
          </h2>

          {loading ? (
            <p className="text-center">Loading data...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            <table className="w-full mt-4 border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-100">
                  {getTableHeaders().map((header, index) => (
                    <th key={index} className="border p-2">
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {getReportData().map((item, index) => (
                  <tr key={index} className="border">
                    {Object.values(item).map((value, idx) => (
                      <td key={idx} className="border p-2">
                        {value || "N/A"}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        <div className="mt-6 flex gap-4">
          <button
            onClick={handleExportPDF}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Export as PDF
          </button>
          <button
            onClick={handleExportCSV}
            className="bg-yellow-500 text-white px-4 py-2 rounded"
          >
            Export as CSV
          </button>
        </div>
      </div>
    </div>
  );
};

export default Reports;
