import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { useAuth } from "../../Context/auth";
import { Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

const Header = () => {
  const [auth, setAuth] = useAuth();
  const location = useLocation();
  const [isUserMenuOpen, setUserMenuOpen] = useState(false);
  const [isNavbarOpen, setNavbarOpen] = useState(false);

  const handleSignOut = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
  };

  return (
    <nav className="bg-gray-900 text-white sticky top-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <i className="fa-solid fa-bag-shopping text-white text-2xl mr-3"></i>
            <span className="text-xl font-bold">E-shop</span>
          </Link>

          {/* Navbar Links for Desktop */}
          <div className="hidden md:flex space-x-4">
            {[
              { path: "/", label: "Home" },
              { path: "/about", label: "About" },
              { path: "/services", label: "Services" },
              { path: "/pricing", label: "Pricing" },
              { path: "/contact", label: "Contact" },
            ].map(({ path, label }) => (
              <Link
                key={path}
                to={path}
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  location.pathname === path
                    ? "text-blue-500 font-bold"
                    : "hover:text-blue-400"
                }`}
              >
                {label}
              </Link>
            ))}
          </div>

          {/* User Menu and Hamburger */}
          <div className="flex items-center space-x-4">
            {/* Sign Up and Login Links */}
            {!auth?.token && (
              <>
                <Link
                  to="/register"
                  className="px-3 py-2 rounded-md text-sm font-medium hover:text-blue-400"
                >
                  Sign Up
                </Link>
                <Link
                  to="/login"
                  className="px-3 py-2 rounded-md text-sm font-medium hover:text-blue-400"
                >
                  Login
                </Link>
              </>
            )}

            {/* User Menu */}
            {auth?.token && (
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!isUserMenuOpen)}
                  className="bg-gray-800 rounded-full p-1 focus:outline-none"
                >
                  <span className="sr-only">Open user menu</span>
                  {/* <img
                    className="w-8 h-8 rounded-full"
                    src="/docs/images/people/profile-picture-3.jpg"
                    alt="User"
                  /> */}
                  <i className="fa-solid fa-user-tie p-3"></i>
                </button>
                {isUserMenuOpen && (
                  <div
                    className="absolute right-0 mt-2 w-48 bg-white text-black rounded-lg shadow-lg"
                    style={{ zIndex: 1000 }}
                  >
                    <div className="px-4 py-3">
                      <span className="block text-sm">
                        {auth?.user?.name || "User"}
                      </span>
                      <span className="block text-sm text-gray-500">
                        {auth?.user?.email || "email@example.com"}
                      </span>
                    </div>
                    <ul className="py-2">
                      <li>
                        <Link
                          to={
                            auth?.user?.role === "Admin"
                              ? "/dashboard/admin"
                              : "/dashboard/user"
                          }
                          className="block px-4 py-2 hover:bg-gray-100"
                        >
                          Dashboard
                        </Link>
                      </li>
                      <li>
                        <button
                          onClick={handleSignOut}
                          className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                        >
                          Sign out
                        </button>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            )}

            {/* Hamburger Menu */}
            <button
              onClick={() => setNavbarOpen(!isNavbarOpen)}
              className="text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-white md:hidden"
            >
              <svg
                className="w-6 h-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed top-75 left-0 h-full bg-gray-900 text-white transform transition-transform ${
          isNavbarOpen ? "translate-x-0" : "-translate-x-full"
        } w-1/2 z-50 md:hidden`}
      >
        <ul className="space-y-6 mt-16 px-6">
          {[
            { path: "/", label: "Home" },
            { path: "/about", label: "About" },
            { path: "/services", label: "Services" },
            { path: "/pricing", label: "Pricing" },
            { path: "/contact", label: "Contact" },
          ].map(({ path, label }) => (
            <li key={path}>
              <Link
                to={path}
                onClick={() => setNavbarOpen(false)}
                className={`block px-3 py-2 text-lg ${
                  location.pathname === path
                    ? "text-blue-500 font-bold"
                    : "hover:text-blue-400"
                }`}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Header;
