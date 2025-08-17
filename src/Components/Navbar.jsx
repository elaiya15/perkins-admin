import { initFlowbite } from "flowbite";
import React, { useEffect } from "react";
import logo from "../assets/pp 1.png";
import acc from "../assets/user (1).png";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const user = JSON.parse(window.localStorage.getItem("user"));
  const navigate = useNavigate();
  useEffect(() => {
    if (user === null) {
      navigate("/");
    }
  }, [user]);
  useEffect(() => {
    initFlowbite();
  }, []);
  return (
    <React.Fragment>
      <nav className="fixed top-0 z-50 w-full flex flex-col justify-center h-20 bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
        <div className="px-3 py-3 lg:px-5 lg:pl-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start rtl:justify-end">
              <button
                data-drawer-target="logo-sidebar"
                data-drawer-toggle="logo-sidebar"
                aria-controls="logo-sidebar"
                type="button"
                className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
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
                  ></path>
                </svg>
              </button>
              <Link to="/admin/job-post/list" className="flex">
                <img
                  src={logo}
                  className="h-5 w-20 sm:h-6 sm:w-20 md:h-8 md:w-24 lg:h-9 lg:w-36 xl:h-10 xl:w-40 2xl:h-12 2xl:w-48"
                  alt="Logo"
                />
              </Link>
            </div>
            <div className="flex items-center space-x-2 sm:space-x-4 md:space-x-6 lg:space-x-7">
              <div className="border h-7 sm:h-8 md:h-9 border-gray-400"></div>
              <div className="flex items-center space-x-2 sm:space-x-4 md:space-x-5">
                <button
                  type="button"
                  className="rounded-full focus:ring-2 focus:ring-spangles-500"
                  id="user-menu-button"
                >
                  <img
                    className="rounded-full w-7 sm:w-9 md:w-11"
                    src={acc}
                    alt="user photo"
                  />
                </button>
                <div>
                  <span className="block text-xs sm:text-sm md:text-base font-medium text-gray-900 dark:text-white">
                    {user && user.name}
                  </span>
                  <span className="block text-[10px] sm:text-xs md:text-sm text-gray-500 truncate dark:text-gray-400">
                    {user && user.isAdmin ? "Admin" : "User"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </React.Fragment>
  );
}

export default Navbar;
