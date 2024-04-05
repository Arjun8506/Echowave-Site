import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { FaHandPointDown } from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UserProfile from "../components/UserProfile";
import { Link } from "react-router-dom";
import Spinner from "../components/Spinner";

const Search = () => {
  const [users, setusers] = useState([]);
  const [loading, setloading] = useState(false);
  const [loadingsearch, setloadingsearch] = useState(false);
  const [search, setsearch] = useState({
    search: "",
  });

  const [serachResults, setserachResults] = useState([]);

  useEffect(() => {
    allUsers();
  }, []);

  const allUsers = async () => {
    try {
      setloading(true);
      const res = await fetch("/api/user/alluser");
      const data = await res.json();
      if (data.success === false) {
        setloading(false);
        toast.error(data.message);
        return;
      }
      setloading(false);
      setusers(data.users);
    } catch (error) {
      setloading(false);
      toast.error(data.message);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();

    try {
      setserachResults("")
      setloadingsearch(true);
      const res = await fetch("/api/user/searcheduser", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(search),
      });
      const data = await res.json();
      if (data.success === false) {
        setloadingsearch(false);
        toast.error(data.message);
        return;
      }
      setloadingsearch(false);
      console.log(data);
      setserachResults(data.users);
    } catch (error) {
      setloadingsearch(false);
      toast.error(error.message);
    }
  };

  return (
    <div className="md:w-[80vw] md:ml-[19vw] md:px-10 py-4 mb-12">
      <div className="w-full h-20 px-2">
        <form
          className="w-full md:py-4 flex items-center justify-center  relative"
          onSubmit={handleSearch}
        >
          <input
            type="text"
            id="search"
            placeholder="Search...."
            className="w-[80%] lg:w-[50%] p-4 rounded-lg font-[gilroy] focus:outline-none border-4 border-black/80 "
            value={search.search}
            onChange={(e) => setsearch({ search: e.target.value })}
          />
          <button
            type="submit"
            className="absolute right-[14%] lg:right-[26%] p-2 bg-black/80 text-white rounded-lg hover:opacity-80 disabled:opacity-50"
            disabled={loadingsearch}
          >
            {loadingsearch ? <Spinner /> : <FaSearch />}
          </button>
        </form>
      </div>

      {serachResults && serachResults.length > 0 ? (
        <div className="bg-zinc-300">
              <h1 className="text-xl my-2 px-2 capitalize font-bold flex items-center justify-start">
                Search Results
              </h1>
          {serachResults.map((user) => (
            <>
              <div
                key={user._id}
                className="  overflow-hidden px-2 md:pl-6 py-2 flex gap-0 items-center justify-between"
              >
                <div className="flex gap-2 items-center">
                  <img
                    src={user.profilePic}
                    alt="profilePic"
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <Link to={`/seeuser/${user._id}`}>
                    <h1 className="hover:text-blue-600 hover:opacity-90 font-bold text-sm">
                      {user.username}
                    </h1>
                  </Link>
                </div>
              </div>
            </>
          ))}
        </div>
      ) : (
        ""
      )}

      <h1 className="my-6 px-2 md:px-6 capitalize font-semibold flex items-center gap-2">
        All Users are here below <FaHandPointDown />
      </h1>
      {loading ? <p className="text-2xl text-center ">Loading....</p> : ""}

      {users.map((user) => (
        <div
          key={user._id}
          className=" overflow-hidden  px-2 md:px-6 py-2 flex gap-0 items-center justify-between"
        >
          <div className="flex gap-1 md:gap-4 items-center">
            <img
              src={user.profilePic}
              alt="profilePic"
              className="w-8 h-8 rounded-full object-cover"
            />
            <Link to={`/seeuser/${user._id}`}>
              <h1 className="hover:text-blue-600 hover:opacity-90 font-bold text-sm">
                {user.username}
              </h1>
            </Link>
          </div>
          <div>
            <button
              type="button"
              className="bg-blue-800 text-white p-1 px-2 capitalize rounded-lg hover:opacity-90"
            >
              Follow
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Search;
