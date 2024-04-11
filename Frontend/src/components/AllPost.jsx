import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import { BiSolidLike } from "react-icons/bi";
import { FaRegCommentDots } from "react-icons/fa";
import { IoSendSharp } from "react-icons/io5";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Spinner from "./Spinner";
import Comment from "./Comment";
import { useAuthContext } from "../context/authContext";

const AllPost = ({ post }) => {
  const { authUser } = useAuthContext()
  const [size, setsize] = useState("cover");
  const [likecolor, setlikecolor] = useState("black");
  const [loading, setloading] = useState(false);
  const [formData, setformData] = useState({
    postid: post._id,
    comment: ""
  })
  const [comments, setcomments] = useState([])

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

  const sendComment = async (e) => {
    e.preventDefault();
    if (formData.comment === "") {
      return toast.error("Empty field is not allowd")
    }

    try {
      setloading(true);
      const res = await fetch("/api/comment/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        setloading(false);
        toast.error(data.message);
        return;
      }
      setloading(false);
      setformData({ comment: "" })
      toast.success(data.message);
    } catch (error) {
      setloading(false);
      toast.error(error.message);
    }
  }

  const getComments = async () => {
    try {
      const res = await fetch(`/api/comment/allcomments/${post._id}`);
      const data = await res.json();
      if (data.success === false) {
        toast.error(data.message);
        return;
      }
      setcomments(data.comments)
    } catch (error) {
      toast.error(error.message);
    }
  }

  
  const likeThePost = async ()=> {
    try {
      const res = await fetch(`/api/post/likepost/${post._id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" }
      });
      const data = await res.json();
      if (data.success === false) {
        toast.error(data.message);
        return;
      }
      toast.success(data.message);
      setLiked(!liked);
    } catch (error) {
      toast.error(error.message);
    }
  }

  const [liked, setLiked] = useState(false);

  useEffect(() => {
    if (post.likes.includes(authUser._id)) {
      setLiked(true);
    } else {
      setLiked(false);
    }
  }, [post.likes, authUser, likeThePost]);
  
  return (
    <div className=" overflow-x-hidden mb-14">
      <div className="flex items-center justify-between md:px-6 lg:px-8 mb-2 px-2">
        <div className="flex items-center gap-2  overflow-hidden ">
          <img
            src={post.author.profilePic}
            alt="profilePic"
            className="w-10 h-10 border-2 border-gray-600 object-cover rounded-full aspect-square"
          />
            <h1 className="text-sm md:text-lg font-bold hover:text-blue-600 hover:opacity-90 hover:underline">
              {post.author.username}
            </h1>
        </div>
        <h1 className="text-[10px] md:text-[12px] lg:text-xs font-semibold ">{time}</h1>
      </div>

      <div className="images ">
        <Swiper spaceBetween={0} slidesPerView={1}>
          {post.images.map((image, index) => (
            //   <img key={index} src={image} alt={`Image ${index + 1}`} />
            <SwiperSlide key={index}>
              <div className="w-full h-72 md:h-80 mb-2 flex flex-col items-center select-none overflow-x-hidden">
                <img
                  src={image}
                  alt={`Image ${index + 1}`}
                  onClick={cangeSize}
                  className="w-full h-[90%] "
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
      <div className=" px-2 md:px-8 lg:px-10 text-2xl flex justify-between md:gap-5">
        <h1 className="flex flex-col items-center">
          <BiSolidLike
            onClick={() => likeThePost()}
            className= {`cursor-pointer select-none 
            ${liked ? "text-blue-600" : ""}
            `}
          />
          <span className="text-[14px]">(Likes {post.likes.length} )</span>
        </h1>
        <button type="button" onClick={() =>getComments()}>
        <FaRegCommentDots />
        </button>
      </div>
      <div className=" px-2 md:px-8 lg:px-10 my-2 md:mt-4">
        <h3 className="text-sm">
          {post.author.username}{"   "}
          <span className="text-xs md:text-sm font-bold">{post.caption}</span>
        </h3>
        <h4 className=" text-xs md:text-sm my-2">{post.description}</h4>
      </div>
      <div className=" px-2 md:px-8 lg:px-10 mt-4 flex gap-2 items-start">
      <img
            src={authUser.profilePic}
            alt="profilePic"
            className="w-10 h-10 border-2 border-gray-600 object-cover rounded-full aspect-square"
          />
          <form className="w-full relative" onSubmit={sendComment}>
        <textarea  id="comment" className=" text-xs md:text-sm w-full h-20 p-2  border-2 rounded-lg " placeholder="Comment here...."
        value={formData.comment}
        onChange={(e) => setformData({...formData, comment: e.target.value})}
        />
            <button type="submit" className="absolute top-2 right-2 bg-zinc-800 p-2 text-sm rounded-lg text-white hover:opacity-90 disabled:opacity-50"
            disabled={loading}
            >
              {loading ? <Spinner /> : <IoSendSharp />}
            </button>
          </form>
      </div>
      <div className="w-full min-h-fit px-2 md:px-8 lg:px-10">
        {comments.length > 0 ? (
          comments.map((comment) => (
            <div key={comment._id} className="w-full min-h-fit my-4 ">
              <Comment comment= {comment} />
            </div>
          ))
        ) : <p className="text-center text-lg text-red-500 font-bold">No Comments</p>}
      </div>
    </div>
  );
};

export default AllPost;
