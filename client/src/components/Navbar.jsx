import React, { useState } from "react";
import { MdEdit } from "react-icons/md";
import { NavLink } from "react-router-dom";

import { FaPenAlt } from "react-icons/fa";
const Navbar = () => {
  const [user, setUser] = useState(true);

  const username = localStorage.getItem("username");
  return (
    <div className="flex justify-between shadow-lg bg-gray-200 h-[80px]  w-[100%] top-0 border-b  border-gray-300">
      <NavLink to="/" >
      <div className="flex flex-row">
      <h1 className="text-2xl font-extrabold m-4 mt-6 transition duration-500 ease-in text-violet-950 cursor-pointer font-serif flex  ">
        <FaPenAlt  className="text-2xl mr-2 ml-5 mt-1"/> My Blog.
        </h1>
      </div>
       
      </NavLink>
      {username ? (
        <div className="flex m-4 bg-">
          <h2 className="text-md text-blue-500 underline font-semibold m-4 ">
            {username}
          </h2>
          <NavLink to="/create-blog">
            <button className="m-0 bg-black px-4 py-2 justify-center text-md text-center rounded-lg flex mt-2 text-white font-bold">
              {" "}
              <MdEdit className="text-xl mt-1 mr-2 text-white " /> Create Blog
            </button>
          </NavLink>
        </div>
      ) : (
        <>
          <div className="flex h-[40px] mt-3">
            <NavLink to="/signup">
              {" "}
              <button className="mr-3  px-4 py-2 rounded-md bg-blue-500 text-white justify-center flex text-center transition duration-500 ease-in-out hover:bg-black text-md font-semibold">
                Sign Up
              </button>
            </NavLink>
            <NavLink to="/login">
              <button className="mr-3  px-4 py-2 rounded-md bg-gray-800 text-white justify-center flex text-center transition duration-500 ease-in-out hover:bg-black text-md font-semibold ">
                Login
              </button>
            </NavLink>
          </div>
        </>
      )}
    </div>
  );
};

export default Navbar;
