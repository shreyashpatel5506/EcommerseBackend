import React, { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";

const UserMenu = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarRef = useRef(null);

  // Function to close the sidebar
  const closeSidebar = () => setIsSidebarOpen(false);
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  // Click outside to close the sidebar
  useEffect(() => {
    function handleClickOutside(event) {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        closeSidebar();
      }
    }

    if (isSidebarOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSidebarOpen]);

  return (
    <div>
      {/* Toggle Button (Only for Mobile & Tablet) */}
      <button
        onClick={toggleSidebar}
        type="button"
        className="inline-flex items-center p-2 mt-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
      >
        <span className="sr-only">Open sidebar</span>
        <svg
          className="w-6 h-6"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clipRule="evenodd"
            fillRule="evenodd"
            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
          />
        </svg>
      </button>

      {/* Modal Overlay (For Mobile & Tablet) */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={closeSidebar}
        />
      )}

      {/* Sidebar (Mobile & Tablet - Slide In/Out) */}
      <aside
        className={`absolute left-0 w-64 bg-gray-800 text-white border-r border-gray-700 transition-transform transform z-50 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:hidden`}
        style={{ height: "100%", top: "10vh" }} // Adjusted top to 10vh for mobile & tablet
      >
        <div className="overflow-y-auto py-5 px-3">
          {/* Close Button */}
          <button
            onClick={closeSidebar}
            className="absolute top-4 right-4 text-gray-300 hover:text-white"
          >
            ✖
          </button>

          <ul className="space-y-2">
            <li>
              <NavLink
                to="/dashboard/user/Orders"
                className="flex items-center p-2 text-base font-normal text-white hover:bg-gray-700 active:bg-gray-800"
                onClick={closeSidebar}
              >
                <span className="ml-3">Order-List</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard/user/profile"
                className="flex items-center p-2 text-base font-normal text-white hover:bg-gray-700 active:bg-gray-800"
                onClick={closeSidebar}
              >
                <span className="ml-3">Profile</span>
              </NavLink>
            </li>
          </ul>
        </div>
      </aside>

      {/* Sidebar for Desktop (Always Visible & Centered) */}
      <aside
        ref={sidebarRef}
        className="fixed left-0  bg-gray-800 text-white border-r border-gray-700 rounded-lg shadow-lg hidden md:block"
        style={{
          height: "50vh",
          top: "8vh", // Adjusted top to 8vh for desktop
        }}
      >
        <div className="overflow-y-auto py-5 px-3">
          <ul className="space-y-2">
            <li>
              <NavLink
                to="/dashboard/user/Orders"
                className="flex items-center p-2 text-base font-normal text-white hover:bg-gray-700 active:bg-gray-800"
              >
                <span className="ml-3">Order-List</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard/user/profile"
                className="flex items-center p-2 text-base font-normal text-white hover:bg-gray-700 active:bg-gray-800"
              >
                <span className="ml-3">Profile</span>
              </NavLink>
            </li>
          </ul>
        </div>
      </aside>
    </div>
  );
};

export default UserMenu;
