import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProductDetails from "./pages/ProductDetails";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import BuyerDashboard from "./pages/BuyerDashboard";
import FarmerDashboard from "./pages/FarmerDashboard";
import Marketplace from "./pages/buyer/Marketplace";
import Cart from "./pages/buyer/Cart";
import Orders from "./pages/buyer/Orders";
import Profile from "./pages/buyer/Profile";
import AddProduct from "./pages/farmer/AddProduct";
import MyProducts from "./pages/farmer/MyProducts";
import ProfileFarmer from "./pages/farmer/Profile";
import OrdersFarmer from "./pages/farmer/Orders";
import About from "./pages/About";

// protected route
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Router>
      <Navbar />
      <div className="pt-16 pb-16">
        {" "}
        {/* Ensures content is not hidden by fixed navbar/footer */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route element={<ProtectedRoute />}>
            {/* ✅ Nested Routing for Buyer Dashboard */}
            <Route path="/farmer-dashboard/*" element={<FarmerDashboard />} />

            {/* ✅ Nested Routing for Farmer Dashboard */}
            <Route path="/buyer-dashboard/*" element={<BuyerDashboard />} />
          </Route>

          <Route path="/about/" element={<About />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
