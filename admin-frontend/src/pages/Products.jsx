import Sidebar from "../components/Sidebar";

const Products = () => {
  // Fake product data
  const products = [
    {
      id: 1,
      name: "Cabbage",
      category: "Vegetables",
      price: "40 KES",
      stock: 100,
    },
    { id: 2, name: "Milk", category: "Dairy", price: "60 KES", stock: 50 },
    { id: 3, name: "Eggs", category: "Dairy", price: "15 KES", stock: 300 },
  ];

  return (
    <div className="flex">
      <Sidebar />
      <div className="p-6 w-full">
        <h1 className="text-2xl font-bold mb-4">Manage Products</h1>
        <table className="w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">ID</th>
              <th className="border p-2">Name</th>
              <th className="border p-2">Category</th>
              <th className="border p-2">Price</th>
              <th className="border p-2">Stock</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="text-center">
                <td className="border p-2">{product.id}</td>
                <td className="border p-2">{product.name}</td>
                <td className="border p-2">{product.category}</td>
                <td className="border p-2">{product.price}</td>
                <td className="border p-2">{product.stock}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Products;
