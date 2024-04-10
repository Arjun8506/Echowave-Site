import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import { FaHandPointDown } from "react-icons/fa";
import { useSocketContext } from "../context/SocketContext";

const MessageList = () => {
  const [users, setusers] = useState([]);
  const [loading, setloading] = useState(false);
  const { onlineUsers } = useSocketContext()

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

  return <div className="md:w-[90vw] md:ml-[10vw] lg:px-10 lg:w-[80vw] lg:ml-[18vw]">
  <h1 className="py-6 capitalize font-semibold flex items-center gap-2 px-2">
    All Users are here below <FaHandPointDown />
  </h1>
  {loading ? <p className="text-2xl text-center ">Loading....</p> : ""}

  {users.map((user) => (
    <div
      key={user._id}
      className=" overflow-hidden py-2 flex gap-0 items-center justify-between px-2"
    >
      <div className="flex gap-2 items-center relative">
        <img
          src={user.profilePic}
          alt="profilePic"
          className="w-8 h-8 border-2 border-zinc-500 rounded-full object-cover"
        />

          {onlineUsers.map((onlineuser) => (
            onlineuser === user._id ? (
              <div className="w-2 h-2 rounded-full bg-green-500 absolute top-0 -z-50" key={onlineuser}>
              </div>
            ) : ""
          )) }

        <Link to={`/message/${user._id}`}>
          <h1 className="hover:text-blue-600 hover:opacity-90 font-bold">
            {user.username}
          </h1>
        </Link>
      </div>
      <div>
        <button
          type="button"
          className="bg-blue-800 text-white p-2 px-4 text-xs capitalize rounded-lg hover:opacity-90"
        >
          Follow
        </button>
      </div>
    </div>
  ))}
</div>
};

export default MessageList;
