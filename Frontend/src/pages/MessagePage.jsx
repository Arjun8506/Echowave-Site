import React, { useEffect, useRef, useState } from "react";
import { useAuthContext } from "../context/authContext";
import bgImage from "../../public/messagePageBG.jpg";
import { FaPlus, FaSpinner } from "react-icons/fa";
import { LuSend } from "react-icons/lu";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Message from "../components/Message";
import { useSocketContext } from "../context/SocketContext";

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
        setmessages(prevMessages => {
          const allMessages = [...prevMessages, ...data.message]
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .reverse();
          return allMessages;
        });
      }
    } catch (error) {
      toast.error(error.message);
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
      setmessages(prevMessages => {
        const allMessages = [...prevMessages, ...data.message]
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .reverse();
        return allMessages;
      });
      setloadingWhileSending(false);
      setformData({ message: "" });
    } catch (error) {
      setloadingWhileSending(false);
      toast.error(error.message);
    }
  };

  const messageContainerRef = useRef(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]); // Scroll to bottom whenever messages change

  const scrollToBottom = () => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop =
        messageContainerRef.current.scrollHeight;
    }
  };

  function useListenMessages() {
    const {socket} = useSocketContext();
  
    useEffect(() => {
      socket?.on("newMessage", (newMessage) => {
        setmessages(prevMessages => [...prevMessages, newMessage]);
      })
  
      return () => socket?.off("newMessage")
    }, [socket, setmessages, messages])
    
  }

  useListenMessages()

  return (
    <div className="md:w-[90vw] md:ml-[10vw] lg:w-[80vw] lg:ml-[20vw] h-screen md:overflow-x-hidden px-2">
      <div className="w-full h-screen bg-black/50">
        <div className=" fixed z-50 w-full md:w-[90vw] lg:w-[80vw] py-2 px-2 flex justify-between items-center bg-zinc-200 rounded-b-lg">
          <div className=" flex items-center gap-2 ">
            <img
              className="w-8 h-8 rounded-full border-2 border-zinc-600 object-cover aspect-square"
              src={user.profilePic}
              alt=""
            />
            <h1 className="text-xs font-bold md:text-base">{user.username}</h1>
          </div>
          <div>
            <p className="text-[11px] md:text-xs">Last seen: 8:20AM, Today </p>
          </div>
        </div>
        <div className="w-full md:w-[90vw] lg:w-[80vw] min-h-screen">
          <img
            src={bgImage}
            alt="bgImage"
            className="fixed top-0 left-0 -z-50 brightness-75 min-h-screen w-full"
          />
        </div>
        <div className="absolute top-0 w-full md:w-[90vw] lg:w-[80vw] h-screen">
          <div
            ref={messageContainerRef}
            className="fixed top-12 w-full h-[65%] sm:h-[70%] overflow-y-auto"
          >
            {messages.length > 0 ? (
              messages.map((message, index) => (
                <div key={index} className="flex flex-col gap-2">
                  <Message message={message} />
                </div>
              ))
            ) : (
              <h1 className="text-center text-sm text-white mt-4 mx-auto">
                Start Chat Now
              </h1>
            )}
          </div>
          <div className="w-full md:w-[90vw] lg:w-[80vw] fixed flex items-center gap-2 bottom-16 md:bottom-6 z-40 px-2">
            <div
              onClick={() => fileref.current.click()}
              className=" p-1 border-4 border-zinc-600 bg-zinc-600 text-white w-fit h-fit rounded-lg hover:opacity-80"
            >
              <FaPlus />
            </div>
            <form className="flex items-center w-full " onSubmit={sendMessage}>
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
                className=" text-white w-full bg-transparent border-4 border-zinc-300 rounded-lg p-1 focus:outline-none text-sm md:p-2"
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
