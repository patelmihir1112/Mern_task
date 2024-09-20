import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-orange-500">
          MyShop
        </Link>

        <nav className="absolute left-1/2 transform -translate-x-1/2">
          <Link to="/" className="text-xl text-gray-700 hover:text-orange-500 font-semibold">
            Home
          </Link>
        </nav>

      </div>


      <div className="md:hidden flex justify-between items-center px-4 py-4">
        <button className="text-gray-700 hover:text-orange-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>
      </div>
    </header>
  );
};

export default Header;
