import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen bg-cover bg-center relative px-6 md:px-12"
      style={{ backgroundImage: "url('/images/farm-bg.jpg')" }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-65"></div>

      {/* Content Container */}
      <div className="relative z-10 text-center p-8 md:p-12 bg-white/80 opacity-70 backdrop-blur-md rounded-xl shadow-2xl max-w-2xl">
        <h1 className="text-4xl md:text-5xl font-extrabold text-green-800 leading-tight">
          Buy & Sell Farm Produce with Ease
        </h1>
        <p className="text-lg md:text-xl text-gray-700 mt-4 font-medium">
          A seamless online marketplace connecting farmers and buyers directly.
        </p>

        {/* Call-to-Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mt-6">
          <Link
            to="/register"
            className="px-6 py-3 text-lg font-semibold bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-300 shadow-md flex-1 text-center"
          >
            Get Started
          </Link>
          <Link
            to="/about"
            className="px-6 py-3 text-lg font-semibold bg-gray-100 text-green-800 border border-green-600 rounded-lg hover:bg-green-200 transition duration-300 shadow-md flex-1 text-center"
          >
            Learn More
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
