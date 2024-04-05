import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import { BiSolidLike } from "react-icons/bi";
import { FaRegCommentDots } from "react-icons/fa";
import { IoSendSharp } from "react-icons/io5";

const AllPost = ({ post }) => {
  const [size, setsize] = useState("cover");
  const [likecolor, setlikecolor] = useState("black");

  const cangeSize = () => {
    if (size === "cover") {
      setsize("contain");
    } else {
      setsize("cover");
    }
  };

  function convertToIndianTime(timestamp) {
    const date = new Date(timestamp);
    const day = date.toLocaleString("en-IN", { weekday: "long" });
    const month = date.toLocaleString("en-IN", { month: "long" });
    const year = date.getFullYear();
    const indianDate = `${day}, ${month} ${date.getDate()}, ${year}`;
    return `${indianDate}`;
  }

  const time = convertToIndianTime(post.createdAt);

  return (
    <div className=" md:pl-6 overflow-x-hidden mb-14">
      <div className="flex items-center justify-between px-3 mb-2">
        <div className="flex items-center gap-2">
          <img
            src={post.author.profilePic}
            alt="profilePic"
            className="w-10 h-10 border-2 border-gray-600 object-cover rounded-full aspect-square"
          />
          <Link to={"/"}>
            <h1 className="text-sm md:text-lg font-bold hover:text-blue-600 hover:opacity-90 hover:underline">
              {post.author.username}
            </h1>
          </Link>
        </div>
        <h1 className="text-[10px] font-semibold ">{time}</h1>
      </div>

      <div className="images ">
        <Swiper spaceBetween={0} slidesPerView={1}>
          {post.images.map((image, index) => (
            //   <img key={index} src={image} alt={`Image ${index + 1}`} />
            <SwiperSlide key={index}>
              <div className="w-full h-72 mb-2 flex flex-col items-center select-none  ">
                <img
                  src={image}
                  alt={`Image ${index + 1}`}
                  onClick={cangeSize}
                  className="w-full h-[95%] "
                  style={{ objectFit: size }}
                />
                <p>
                  ({index + 1}/{post.images.length})
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className=" px-2 md:pl-6 text-2xl flex justify-between md:gap-5">
        <h1 className="flex flex-col items-center">
          <BiSolidLike
            onClick={() => {
              if (likecolor === "black") {
                setlikecolor("blue");
              } else {
                setlikecolor("black");
              }
            }}
            className="cursor-pointer select-none" style={{color : likecolor}}
          />
          <span className="text-[14px]">(Likes)</span>
        </h1>
        <FaRegCommentDots />
      </div>
      <div className=" px-2 md:pl-6 my-2 md:mt-4">
        <h3 className="text-sm">
          {post.author.username}{"   "}
          <span className="text-xs md:text-sm font-bold">{post.caption}</span>
        </h3>
        <h4 className=" text-xs md:text-sm my-2">{post.description}</h4>
      </div>
      <div className=" px-2 md:pl-6 mt-4 flex gap-2 items-start">
      <img
            src={post.author.profilePic}
            alt="profilePic"
            className="w-10 h-10 border-2 border-gray-600 object-cover rounded-full aspect-square"
          />
          <form className="w-full relative">
        <textarea  id="comment" className=" text-xs md:text-sm w-full h-20 p-2  border-2 rounded-lg " placeholder="Comment here...." />
            <button type="button" className="absolute top-2 right-2 bg-zinc-800 p-2 text-sm rounded-lg text-white hover:opacity-90"><IoSendSharp /></button>
          </form>
      </div>


    </div>
  );
};

export default AllPost;
