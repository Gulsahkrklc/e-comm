import React, { useState } from "react";
//import SignupForm from "../pages/SignupForm";
import { Link } from "react-router-dom";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  

  return (
    <header className="bg-white border-b border-gray-200 shadow-md">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        {/* Logo */}
        <div className="text-2xl font-bold">BrandName</div>

        {/* Navigation (Visible on Desktop) */}
        <nav className="hidden md:flex space-x-6">
          <a href="/" className="text-gray-700 hover:text-blue-500">
            Home
          </a>
          <a href="/shop" className="text-gray-700 hover:text-blue-500">
            Product
          </a>
          <a href="#" className="text-gray-700 hover:text-blue-500">
            Pricing
          </a>
          <a href="#" className="text-gray-700 hover:text-blue-500">
            Contact
          </a>
        </nav>

        {/* Icons */}
        <div className="flex items-center space-x-4">
          <a href="#" className="text-gray-700 hover:text-blue-500">
            🔍
          </a>
          <a href="#" className="text-gray-700 hover:text-blue-500">
            🛒
          </a>
          <button
            className="text-gray-700 hover:text-blue-500"
            
          >
            <Link to="/login">Login</Link>
          </button>
          <button
            className="text-gray-700 hover:text-blue-500"
            
          >
            <Link to="/signup">Signup</Link>
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            className="md:hidden text-gray-700 hover:text-blue-500 focus:outline-none"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            ☰
          </button>
        </div>
      </div>

      {/* Mobile Menu (Visible on Mobile) */}
      <div
        className={`md:hidden bg-white shadow-md ${
          menuOpen ? "block" : "hidden"
        }`}
      >
        <nav className="flex flex-col space-y-2 p-4">
          <a
            href="#"
            className="block text-gray-700 hover:text-blue-500 border-b pb-2"
          >
            Home
          </a>
          <a
            href="#"
            className="block text-gray-700 hover:text-blue-500 border-b pb-2"
          >
            Product
          </a>
          <a
            href="#"
            className="block text-gray-700 hover:text-blue-500 border-b pb-2"
          >
            Pricing
          </a>
          <a
            href="#"
            className="block text-gray-700 hover:text-blue-500 border-b pb-2"
          >
            Contact
          </a>
        </nav>
      </div>

      {/* Login Form Modal */}
      
    </header>
  );
};

export default Header;

