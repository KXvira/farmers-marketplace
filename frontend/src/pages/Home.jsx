import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div
      className="flex flex-col items-start justify-center min-h-screen bg-cover bg-center relative pl-10 md:pl-20 lg:pl-32"
      style={{ backgroundImage: "url('/images/farm-bg.jpg')" }}
    >
      <div className="absolute inset-0 bg-black opacity-50"></div>

      <div className="relative z-10 text-left mx-4 md:mx-0 p-8 md:p-10 bg-blue-200 opacity-80 backdrop-filter backdrop-blur-md rounded-xl shadow-2xl max-w-xl">
        <h1 className="text-4xl md:text-5xl font-bold text-green-800 leading-tight">
          Buy and Sell Farm Produce Easily
        </h1>
        <p className="text-lg md:text-xl text-gray-700 mt-4 font-medium">
          Connect with farmers and buyers in a seamless online marketplace.
        </p>

        <div className="sm:flex-row gap-4 mt-8">
          <Link
            to="/register"
            className="px-6 py-3 text-lg font-medium bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300 shadow-md hover:shadow-lg flex-1 text-center"
          >
            Register
          </Link>
        </div>

        <Link
          to="/about"
          className="mt-8 inline-block text-green-700 font-medium hover:text-green-900 transition-colors duration-300"
        >
          Learn more about us →
        </Link>
      </div>
    </div>
  );
};

export default Home;
