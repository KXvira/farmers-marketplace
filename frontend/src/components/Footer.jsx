import React from "react";

const Footer = () => {
  return (
    <footer className="bg-green-600 text-white text-center p-4 fixed bottom-0 w-full">
      <p>&copy; {new Date().getFullYear()} AgriMarket. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
