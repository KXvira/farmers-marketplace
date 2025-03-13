import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-top min-h-screen bg-green-100">
      <div className="space-x-4 mt-4 ml-auto p-4">
        <Link
          to="/login"
          className="px-6 py-1 bg-blue-500 text-white text-lg rounded-lg hover:bg-blue-600"
        >
          Login
        </Link>
        <Link
          to="/register"
          className="px-6 py-1 bg-green-500 text-white rounded-lg hover:bg-green-600"
        >
          Sign Up
        </Link>
      </div>
      <main className="flex flex-col  items-center p-10 text-center">
        <h1 className="text-4xl font-extrabold mb-4">
          Buy and Sell Farm Produce Easily
        </h1>
        <p className="text-lg text-gray-600 mb-6">
          Connect with farmers and buyers in a seamless online marketplace.
        </p>
        <Link
          to="/about"
          className="px-6 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          About Us
        </Link>
      </main>
    </div>
  );
};

export default Home;
