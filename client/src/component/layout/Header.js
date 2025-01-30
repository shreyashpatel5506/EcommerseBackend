import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../Context/auth";
import { Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { useSearch } from "../../Context/search";
import axios from "axios";

const Header = () => {
  const Navigate = useNavigate();
  const [auth, setAuth] = useAuth();
  const location = useLocation();
  const [isUserMenuOpen, setUserMenuOpen] = useState(false);
  const [isNavbarOpen, setNavbarOpen] = useState(false);
  const [isSearchOpen, setSearchOpen] = useState(false);
  const [values, setValues] = useSearch();

  const handleSignOut = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.get(
        `http://localhost:5020/api/product/search/${values.query}`
      );
      if (data.success) {
        setValues({ ...values, products: data.products });
        Navigate("/search");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return (
    <nav
      className="bg-gray-900 text-white sticky top-0"
      style={{ zIndex: 1000 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <i className="fa-solid fa-bag-shopping text-white text-2xl mr-3"></i>
            <span className="text-xl font-bold">E-shop</span>
          </Link>

          {/* Navbar Links for Desktop */}
          <div className="hidden md:flex space-x-4 items-center">
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

            {/* Search Input */}
            <div className="relative hidden md:block">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              <input
                type="text"
                className="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Search..."
                value={values.query}
                onChange={(e) =>
                  setValues({ ...values, query: e.target.value })
                }
              />
              <button
                className="absolute inset-y-0 right-0 px-4 text-white bg-blue-500 rounded-r-lg"
                onClick={handleSubmit}
              >
                Search
              </button>
            </div>
          </div>

          {/* User Menu and Hamburger */}
          <div className="flex items-center space-x-4">
            {/* Mobile Search Icon */}
            <button
              onClick={() => setSearchOpen(!isSearchOpen)}
              className="text-gray-500 hover:text-white focus:outline-none md:hidden"
            >
              <svg
                className="w-5 h-5"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 17h5l-1.5-1.5m-3.5 0a6 6 0 100-12 6 6 0 000 12z"
                />
              </svg>
            </button>

            {/* Search Input for Mobile */}
            {isSearchOpen && (
              <div
                className="absolute top-16 right-4 md:top-20 md:right-10"
                style={{
                  top: "4rem",
                  right: "2.5rem",
                  backgroundColor: "#1a202c", // Matches the navbar background color
                  borderRadius: "8px", // Rounded corners
                  padding: "0.5rem", // Inner spacing
                  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)", // Subtle shadow for better visibility
                }}
              >
                <input
                  type="text"
                  className="w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50"
                  placeholder="Search..."
                  value={values.query}
                  onChange={(e) =>
                    setValues({ ...values, query: e.target.value })
                  } //state handling
                />
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-2"
                  onClick={handleSubmit} // Passes query parameter
                >
                  Search
                </button>
              </div>
            )}

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
                  <i className="fa-solid fa-user-tie p-3"></i>
                </button>
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-lg shadow-lg">
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
              className="text-gray-400 hover:text-white focus:outline-none md:hidden"
            >
              <svg
                className="w-6 h-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
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
        className={`fixed top-16 left-0 h-full bg-gray-900 text-white transform transition-transform ${
          isNavbarOpen ? "translate-x-0" : "-translate-x-full"
        } w-2/3 z-50`}
      >
        <ul className="space-y-6 mt-8 px-6">
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
