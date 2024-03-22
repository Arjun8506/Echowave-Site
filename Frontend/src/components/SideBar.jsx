import React from "react";
import { Link } from "react-router-dom";
import { FaHome, FaSearch, FaPlus, FaPodcast } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";

const SideBar = () => {
  return (
    <div className="fixed w-[20vw] min-h-screen bg-zinc-200 border-r-[1px] rounded-r-lg">
      <div className=" py-10 px-5">
        <Link to={"/"} className="flex gap-1 items-center">
            <img src="../../logo.png" alt="Logo" className="w-10 h-10 rounded-full" />
        <h1
          className="font-bold text-4xl text-center text-slate-800 hover:opacity-90 select-none hidden lg:inline"
          id="logofont"
        >
          EchoWave
        </h1>
        </Link>
        <div className="mt-5 flex flex-col gap-4 lg:ml-5  items-center lg:items-start">
        <Link to={"/"} className="w-fit">
            <div className=" flex gap-2 items-center">
                <FaHome className="text-2xl" />
                <p className="hover:text-blue-600 text-lg  hidden lg:inline">Home</p>
            </div>
        </Link>
        <Link to={"/search"} className="w-fit">
            <div className=" flex gap-2 items-center">
                <FaSearch className="text-2xl" />
                <p className="hover:text-blue-600 text-lg  hidden lg:inline">Search</p>
            </div>
        </Link>
        <Link to={"/post"} className="w-fit">
            <div className=" flex gap-2 items-center">
                <FaPlus className="text-2xl" />
                <p className="hover:text-blue-600 text-lg  hidden lg:inline">Post</p>
            </div>
        </Link>
        <Link to={"/profile"} className="w-fit">
            <div className=" flex gap-2 items-center">
                <CgProfile className="text-2xl" />
                <p className="hover:text-blue-600 text-lg  hidden lg:inline">Profile</p>
            </div>
        </Link>

        </div>

      </div>
    </div>
  );
};

export default SideBar;
