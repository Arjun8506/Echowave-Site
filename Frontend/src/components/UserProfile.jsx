import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom"
import { MdOutlineDeleteForever } from "react-icons/md";
import { useAuthContext } from "../context/authContext";

const UserProfile = () => {
  const copyURL = () => {
    const url = window.location.href;
    navigator.clipboard
      .writeText(url)
      .then(() => {
        toast.success("URL Copied");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  const { authUser } = useAuthContext()

  const url = window.location.href;
  const parts = url.split("/");
  const id = parts[parts.length - 1];

  const [user, setuser] = useState([]);
  const [loading, setloading] = useState(false);
  const [posts, setposts] = useState([])

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
    getPosts()
  }, [user])
  
  const getPosts = async () => {
    try {
      const res = await fetch(`/api/post/spacifivuserpost/${user._id}`);
      const data = await res.json();
      if (data.success === false) {
        toast.error(data.message)
        return
      }else{
        setposts(data.posts)
      }
    } catch (error) {
      toast.error(error.message);
    }
  }

  const handleDeletePost = async ({ post }) => {
    var confirmDelete = window.confirm(
      "Are you sure you want to delete this post?"
    );
    if (confirmDelete) {
      try {
        const res = await fetch(`/api/post/deletepost/${post._id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await res.json();
        if (data.success === false) {
          toast.error(data.message);
          return;
        }
        toast.success("Deletion Successful!");
      } catch (error) {
        toast.error(error.message);
      }
    } else {
      toast.success("Deletion Canceled!");
    }
  };

  const follow = async () => {
    try {
      const res = await fetch(`/api/followroute/follow/${user._id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" }
      });
      const data = await res.json();
      if (data.success === false) {
        toast.error(data.message);
        return;
      }
      console.log(data);
      toast.success(data.message)
      toast.success(`You started Fllowing ${user.username}`)
    } catch (error) {
      toast.error(error.message);
    }
  }

  const [followingno, setfollowingno] = useState(0)

  const following = async () => {
    try {
      const res = await fetch(`/api/followroute/following/${user._id}`);
      const data = await res.json();
      if (data.success === false) {
        toast.error(data.message);
        return;
      }
      if (data.followingCount === 0) {
        toast.error("No One is Following you")
        return
      }else{
        setfollowingno(data.followingCount)
      }
    } catch (error) {
      toast.error(error.message);
    }
  }

  useEffect(() => {
    following()
  }, [])
  

  return (
    <div className=" md:w-[90vw] md:ml-[8vw] lg:w-[80vw] lg:ml-[18vw] overflow-hidden  py-5 mb-10 px-2">
      {loading ? <p className="text-2xl text-center  md:px-6 lg:px-10">Loading....</p> : ""}

      <div className=" font-bold text-2xl mb-5 uppercase text-center md:text-start md:px-6 lg:px-10">
        {user.fullname}
      </div>
      <div className="flex flex-col items-center md:flex-row md:gap-x-16 md:px-6 lg:px-10 lg:items-start mb-5">
        <img
          className="w-32 h-32 object-cover border-[1px] border-zinc-400 rounded-full"
          src={user.profilePic}
          alt="profile"
        />
        <div className="flex flex-col items-center">
          <div className="text-center text-2xl font-bold mt-2" id="logofont">
            <h1>{user.username}</h1>
          </div>
          <div className="flex mx-auto gap-4 py-2 justify-between">
            <div className="flex flex-col items-center">
              <h1>{posts?.length === 0 ? "0" : (posts?.length)}</h1>
              <h1>Posts</h1>
            </div>
            <div className="flex flex-col items-center">
              <h1>40</h1>
              <h1>Follwers</h1>
            </div>
            <div className="flex flex-col items-center">
              <h1>{followingno}</h1>
              <h1>Following</h1>
            </div>
          </div>
          <div className=" w-full gap-6 flex justify-between mx-auto my-2">
            <button
              type="button"
              className="bg-blue-800 text-white p-2 px-4 capitalize rounded-lg hover:opacity-90"
              onClick={copyURL}
            >
              share Profile
            </button>
            <button
              type="button"
              className="bg-blue-800 text-white p-2 px-4 capitalize rounded-lg hover:opacity-90"
              onClick={follow}
            >
              Follow
            </button>
          </div>
        </div>
      </div>

      <div className="min-h-screen w-full border-t-2 border-t-zinc-700 grid grid-cols-2 md:grid-cols-3">
        {posts ? (
          posts.map((post) => (
            <div key={post._id} className="w-full h-full bg-black relative">
              <Link to={`/userpost/${post._id}`}>
                <img
                  src={post.images}
                  alt=""
                  className=" w-full h-full object-cover bg-gray-600"
                />
              </Link>
              {post.author === authUser._id && (
              <button
                onClick={() => handleDeletePost({ post })}
                className="absolute top-2 right-2 text-2xl p-2 bg-black/80 rounded-lg hover:opacity-50 text-white cursor-grab"
              >
                <MdOutlineDeleteForever />
              </button>
              )}
            </div>
          ))
        ) : (
          <div className="text-center mt-2">No Posts Yet</div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
