import React from "react";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-gray-100 text-gray-900">
      <div className="max-w-3xl bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-green-600 mb-4">
          About AgriMarket
        </h1>
        <p className="text-lg">
          AgriMarket is a digital marketplace designed to connect farmers and
          buyers, making agricultural trade easier, faster, and more efficient.
          Our platform provides farmers with a space to showcase their products
          while giving buyers access to fresh produce directly from the source.
        </p>

        <h2 className="text-2xl font-semibold text-green-500 mt-6">
          Our Mission
        </h2>
        <p className="text-lg">
          Our goal is to empower local farmers by providing them with a platform
          to sell their products seamlessly. We aim to eliminate middlemen,
          ensuring fair prices for farmers while offering buyers quality
          products at competitive rates.
        </p>

        <h2 className="text-2xl font-semibold text-green-500 mt-6">
          Why Choose Us?
        </h2>
        <ul className="list-disc pl-5 text-lg">
          <li>Direct access to farmers and fresh produce.</li>
          <li>Secure and seamless transactions.</li>
          <li>Easy-to-use platform for both farmers and buyers.</li>
          <li>Real-time order tracking and communication.</li>
        </ul>

        <h2 className="text-2xl font-semibold text-green-500 mt-6">
          Get Involved
        </h2>
        <p className="text-lg">
          Whether you're a farmer looking to expand your market or a buyer
          searching for quality products, AgriMarket is here to serve you. Join
          us today and be a part of the agricultural revolution!
        </p>
      </div>
    </div>
  );
};

export default About;
