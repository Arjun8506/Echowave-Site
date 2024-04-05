import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaHome, FaSearch, FaPlus, FaPodcast } from "react-icons/fa";
import { useAuthContext } from "../context/authContext";
import { MdOutlineMessage } from "react-icons/md";

const SideBar = () => {
  const { authUser } = useAuthContext();

  const [menubar, setmenubar] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 500) {
        setmenubar(true);
      } else {
        setmenubar(false);
      }
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };

  }, []);

  return (
    <>
      {menubar ? (
        <div>
          <div className=" fixed bottom-0 bg-zinc-200  z-50 rounded-t-lg py-2 px-2 h-fit flex justify-between items-center w-full">
          <Link
              to={"/"}
              className="flex gap-1 items-center justify-center lg:justify-start"
            >
              <img
                src="../../logo.png"
                alt="Logo"
                className="w-10 h-10 rounded-full"
              />
              <h1
                className="font-bold text-4xl text-center text-slate-800 hover:opacity-90 select-none hidden lg:inline"
                id="logofont"
              >
                EchoWave
              </h1>
            </Link>
            <div className=" flex gap-4 lg:ml-5  items-center lg:items-start">
              <Link to={"/"} className="w-fit">
                <div className=" flex gap-2 items-center">
                  <FaHome className="text-2xl" />
                  <p className="hover:text-blue-600 text-lg  hidden lg:inline">
                    Home
                  </p>
                </div>
              </Link>
              <Link to={"/search"} className="w-fit">
                <div className=" flex gap-2 items-center">
                  <FaSearch className="text-2xl" />
                  <p className="hover:text-blue-600 text-lg  hidden lg:inline">
                    Search
                  </p>
                </div>
              </Link>
              <Link to={"/post"} className="w-fit">
                <div className=" flex gap-2 items-center">
                  <FaPlus className="text-2xl" />
                  <p className="hover:text-blue-600 text-lg  hidden lg:inline">
                    Post
                  </p>
                </div>
              </Link>
              <Link to={"/profile"} className="w-fit">
                <div className=" flex gap-2 items-center">
                  <img
                    src={authUser.profilePic}
                    alt="profile"
                    className="w-8 h-8 object-cover rounded-full aspect-square"
                  />
                  <p className="hover:text-blue-600 text-lg  hidden lg:inline">
                    Profile
                  </p>
                </div>
              </Link>
              <Link to={"/messageuserslist"} className="w-fit">
                <div className=" flex gap-2 items-center">
                  <MdOutlineMessage className="text-2xl" />
                  <p className="hover:text-blue-600 text-lg  hidden lg:inline">
                    Message
                  </p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <div className="fixed w-[20vw] min-h-screen bg-zinc-200 border-r-[1px] rounded-r-lg">
          <div className=" py-10 px-2 md:p-5">
            <Link
              to={"/"}
              className="flex gap-1 items-center justify-center lg:justify-start"
            >
              <img
                src="../../logo.png"
                alt="Logo"
                className="w-10 h-10 rounded-full"
              />
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
                  <p className="hover:text-blue-600 text-lg  hidden lg:inline">
                    Home
                  </p>
                </div>
              </Link>
              <Link to={"/search"} className="w-fit">
                <div className=" flex gap-2 items-center">
                  <FaSearch className="text-2xl" />
                  <p className="hover:text-blue-600 text-lg  hidden lg:inline">
                    Search
                  </p>
                </div>
              </Link>
              <Link to={"/post"} className="w-fit">
                <div className=" flex gap-2 items-center">
                  <FaPlus className="text-2xl" />
                  <p className="hover:text-blue-600 text-lg  hidden lg:inline">
                    Post
                  </p>
                </div>
              </Link>
              <Link to={"/profile"} className="w-fit">
                <div className=" flex gap-2 items-center">
                  <img
                    src={authUser.profilePic}
                    alt="profile"
                    className="w-8 h-8 object-cover rounded-full aspect-square"
                  />
                  <p className="hover:text-blue-600 text-lg  hidden lg:inline">
                    Profile
                  </p>
                </div>
              </Link>
              <Link to={"/messageuserslist"} className="w-fit">
                <div className=" flex gap-2 items-center">
                  <MdOutlineMessage className="text-2xl" />
                  <p className="hover:text-blue-600 text-lg  hidden lg:inline">
                    Message
                  </p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SideBar;
