import React, { useState, useEffect } from "react";
import { MdEdit } from "react-icons/md";
import { NavLink, useNavigate } from "react-router-dom";
import './navbar.css';
import { IoLogoRss } from "react-icons/io";
import { CgProfile } from "react-icons/cg";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is logged in by checking localStorage
    const username = localStorage.getItem("username");
    if (username) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("username"); // Clear the username from localStorage
    setIsLoggedIn(false); // Update the state to reflect logout
    navigate("/"); // Optionally navigate to the home page after logout
  };

  const username = localStorage.getItem("username");

  return (
    <div className="flex justify-between bg-white h-[80px] w-[100%] top-0 border border-gray-100">
      <NavLink to="/" >
        <div className="flex flex-row">
          <h1 className="logo text-2xl font-extrabold m-4 mt-6 transition duration-500 ease-in text-black cursor-pointer flex">
            Blogify<IoLogoRss className="text-2xl mt-1" />
          </h1>
        </div>
      </NavLink>
      {isLoggedIn ? (
        <div className="flex m-4">
          <CgProfile className="text-lg mt-5 mr-1" />
          <h2 className="text-md text-black font-semibold m-4 ml-0 uppercase">
            {username}
          </h2>
          <NavLink to="/create-blog">
            <button className="m-0 bg-black px-3 py-2 justify-center text-sm text-center rounded-lg flex mt-2 text-white">
              <MdEdit className="text-sm mt-1 mr-2 text-white" /> Create Blog
            </button>
          </NavLink>
          <button 
            onClick={handleLogout} 
            className="text-sm border py-1 px-4 rounded-md border-red-500 ml-4 mr-4 mt-2 font-bold text-red-500"
          >
            Logout
          </button>
        </div>
      ) : (
        <div className="flex h-[40px] mt-3">
          <NavLink to="/signup">
            <button className="mr-3 px-4 py-2 rounded-md bg-blue-500 text-white justify-center flex text-center transition duration-500 ease-in-out hover:bg-black text-sm font-semibold">
              Sign Up
            </button>
          </NavLink>
          <NavLink to="/login">
            <button className="mr-3 px-4 py-2 rounded-md text-black justify-center flex text-center text-sm font-semibold">
              Login
            </button>
          </NavLink>
        </div>
      )}
    </div>
  );
};

export default Navbar;
