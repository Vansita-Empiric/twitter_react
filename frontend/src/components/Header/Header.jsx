import React from "react";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="shadow sticky z-50 top-0">
      <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5">
        <div className="flex items-center lg:order-2">
          <Link
            to="/"
            className="text-gray-800 hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none"
          >
            Log in
          </Link>
          <Link
            to="/signup"
            className="text-white bg-orange-700 hover:bg-orange-800 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none"
          >
            Sign up
          </Link>
        </div>
      </nav>
    </header>
  );
}
