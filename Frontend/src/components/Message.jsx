import React from "react";
import { useAuthContext } from "../context/authContext";

const Message = ({ message }) => {
  
    const { authUser } = useAuthContext()

    const date = new Date(message.createdAt);
  let hours = date.getUTCHours();
  const minutes = date.getUTCMinutes();
  const seconds = date.getUTCSeconds();
  const currentDate = new Date();
  let period = "AM";

  if (hours >= 12) {
    period = "PM";
    if (hours > 12) {
      hours -= 12;
    }
  }
  if (hours === 0) {
    hours = 12;
  }
  const time = `${hours}:${minutes}${period}`;

  let day;
  if (date.toDateString() === currentDate.toDateString()) {
    day = "Today";
  } else if (
    date.getFullYear() === currentDate.getFullYear() &&
    date.getMonth() === currentDate.getMonth() &&
    date.getDate() === currentDate.getDate() - 1
  ) {
    day = "Yesterday";
  } else {
    // If neither "Today" nor "Yesterday", display the actual date
    day = date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }

  return (
    <div className={` top-2 bg-green-300 px-2 py-1 w-fit rounded-b-lg rounded-l-lg my-2 
    ${authUser._id === message.senderid ? "bg-green-400" : "bg-blue-400"}
    ${authUser._id === message.senderid ? "right-2" : "left-2"}
    `}>
      <h1 className="text-xs">{message.message}</h1>
      <p className="text-[12px] text-end">
        {day}, {time}
      </p>
    </div>
  );
};

export default Message;
