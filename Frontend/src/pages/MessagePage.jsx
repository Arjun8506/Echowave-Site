import React, { useEffect, useRef, useState } from "react";
import { useAuthContext } from "../context/authContext";
import bgImage from "../../public/messagePageBG.jpg";
import { FaPlus, FaSpinner } from "react-icons/fa";
import { LuSend } from "react-icons/lu";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Message from "../components/Message";

const MessagePage = () => {
  const { authUser } = useAuthContext();
  const fileref = useRef(null);

  const url = window.location.href;
  const parts = url.split("/");
  const id = parts[parts.length - 1];

  const [user, setuser] = useState({});
  const [loading, setloading] = useState(false);
  const [loadingWhileSending, setloadingWhileSending] = useState(false);
  const [formData, setformData] = useState({
    senderid: authUser._id,
    message: "",
    imageurl: "",
  });

  const [messages, setmessages] = useState([]);

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    try {
      setloading(true);
      const res = await fetch(`/api/user/getuser/${id}`);
      const data = await res.json();
      if (data.success === false) {
        setloading(false);
        toast.error(data.message);
        return;
      }
      setloading(false);
      setuser(data.user);
    } catch (error) {
      setloading(false);
      toast.error(data.message);
    }
  };

  const sendMessage = async (e) => {
    e.preventDefault();

    setloadingWhileSending(true);
    try {
      const res = await fetch(`/api/message/createmessage/${user._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        setloadingWhileSending(false);
        toast.error(data.message);
        return;
      }
      setloadingWhileSending(false);
      setformData({ message: "" });
    } catch (error) {
      setloadingWhileSending(false);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getMessages();
  }, [user]);

  const getMessages = async () => {
    try {
      const res = await fetch(`/api/message/getmessages/${user._id}`);
      const data = await res.json();
      if (data.success === false) {
        toast.error(data.message);
        return;
      }
      if (data.message === 0) {
        return;
      } else {
        setmessages(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="md:w-[80vw] md:ml-[20vw] h-screen">
      <div className="w-full h-screen bg-black/50">
        <div className=" fixed z-50 w-full py-2 px-2 flex justify-between items-center bg-zinc-200 rounded-b-lg">
          <div className=" flex items-center gap-2 ">
            <img
              className="w-8 h-8 rounded-full border-2 border-zinc-600 object-cover aspect-square"
              src={user.profilePic}
              alt=""
            />
            <h1 className="text-xs font-bold">{user.username}</h1>
          </div>
          <div>
            <p className="text-[11px]">Last seen: 8:20AM, Today </p>
          </div>
        </div>
        <div className="w-full h-screen">
          <img
            src={bgImage}
            alt="bgImage"
            className="fixed top-0 left-0 -z-50 brightness-75"
          />
        </div>
        <div className="absolute top-0 w-full h-screen">
          <div className="fixed top-12 w-full h-72 overflow-y-auto">
            {messages.length > 0 ? (
              messages.map((message, index) => (
                <div  key={index} className="flex flex-col gap-2">
                  <Message message={message} />
                </div>
              ))
            ) : (
              <h1 className="text-center text-sm text-white mt-4">
                Start Chat Now
              </h1>
            )}
          </div>
          <div className="w-full fixed flex items-center gap-2 bottom-16 z-40 px-2">
            <div
              onClick={() => fileref.current.click()}
              className=" p-1 border-4 border-zinc-600 bg-zinc-600 text-white w-fit h-fit rounded-lg hover:opacity-80"
            >
              <FaPlus />
            </div>
            <form className="flex items-center w-full" onSubmit={sendMessage}>
              <input
                type="file"
                ref={fileref}
                id="file"
                hidden
                className="bg-zinc-400"
              />
              <input
                type="text"
                id="message"
                className=" text-white w-full bg-transparent border-4 border-zinc-300 rounded-lg p-1 focus:outline-none text-sm"
                value={formData.message}
                onChange={(e) =>
                  setformData({ ...formData, message: e.target.value })
                }
              />
              <button
                className=" absolute right-4 p-1  bg-zinc-300 w-fit h-fit rounded-lg hover:opacity-80 text-lg disabled:opacity-50"
                disabled={loadingWhileSending}
                id="clickmetosend"
              >
                {loadingWhileSending ? <FaSpinner /> : <LuSend />}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessagePage;