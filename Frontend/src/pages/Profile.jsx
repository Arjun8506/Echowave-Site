import React, { useState, useRef, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuthContext } from "../context/authContext";
import { MdChangeCircle } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import app from "../../firebase";
import { MdOutlineDeleteForever } from "react-icons/md";
import Spinner from "../components/Spinner";

const Profile = () => {
  const [isVisible, setIsVisible] = useState(false);
  const fileRef = useRef();
  const [file, setfile] = useState(null);
  const [fileUploadPerc, setfileUploadPerc] = useState(0);
  const [uploadError, setuploadError] = useState(null);

  const { authUser, setauthUser, updateUser } = useAuthContext();
  const navigate = useNavigate();
  const [userPosts, setuserPosts] = useState([]);
  const [loading, setloading] = useState(false);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

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

  const [formData, setformData] = useState({
    username: "",
    password: "",
    profilePic: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`/api/post/getposts/${authUser._id}`);
        const data = await res.json();
        setuserPosts(data.posts);
      } catch (error) {
        toast.error(error.message);
      }
    };

    if (authUser && authUser._id) {
      // Check if authUser and authUser._id exist
      fetchData();
    }
  }, [authUser]);

  const handleInputChange = (e) => {
    setformData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleLogout = async () => {
    try {
      const res = await fetch("/api/auth/logout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      if (data.success === false) {
        toast.error(data.message);
        return;
      }
      localStorage.removeItem("chat-user");
      setauthUser(null);

      toast.success(data.message);
      navigate("/login");
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (file) {
      handleUploadImage(file);
    }
  }, [file]);

  const handleUploadImage = (file) => {
    const storage = getStorage(app);
    const filename = new Date().getTime() + file.name;
    const storageRef = ref(storage, filename);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setfileUploadPerc(progress);
      },
      (error) => {
        setuploadError(error.message);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setformData({
            ...formData,
            profilePic: downloadURL,
          });
        });
      }
    );
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      setloading(true);
      const res = await fetch("/api/user/updateuser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData)
      });
      const data = await res.json()
      if (data.success === false) {
        setloading(false)
        toast.error(data.message);
        return;
      }
      setloading(false)
      console.log(data);
      localStorage.setItem('chat-user', JSON.stringify(data.user));
      const updatedUserData = { 
        username: data.user.username,
        password: data.user.password,
        profilePic: data.user.profilePic
       }
      updateUser(updatedUserData)
       navigate("/")
    } catch (error) {
      console.log(error);
      setloading(false);
      toast.error(error.message);
    }
  };

  return (
    <div className="w-full overflow-hidden md:w-[90vw] md:ml-[8vw] lg:w-[80vw] lg:ml-[18vw] py-5">
      <div
        className=" font-bold text-4xl mb-5 uppercase text-center md:text-start md:px-6 lg:px-10"
        id="logofont"
      >
        Profile
      </div>
      <div className="flex flex-col sm:flex-row  sm:justify-center md:justify-start items-center lg:flex-row lg:items-start md:px-6 lg:px-10">
        {isVisible ? (
          <div className="relative">
            <img
              className="w-40 h-40 object-cover border-[1px] border-zinc-400 rounded-full hover:opacity-60 cursor-pointer"
              src={formData.profilePic || authUser.profilePic}
              onClick={() => fileRef.current.click()}
            />
            <MdChangeCircle className="absolute bottom-6 right-0 text-3xl" />
            {fileUploadPerc ? (
              <p className="text-[14px] text-green-400 text-center">
                {fileUploadPerc}
              </p>
            ) : (
              ""
            )}

            {uploadError ? (
              <p className="text-[14px] text-red-400 text-center">
                {uploadError}
              </p>
            ) : (
              ""
            )}
          </div>
        ) : (
          <img
            className="w-40 h-40 object-cover border-[1px] border-zinc-400 rounded-full"
            src={authUser.profilePic}
            alt="profile"
          />
        )}
        <div className="flex flex-col">
          <div className="text-center my-2 text-2xl" id="logofont">
            <h1>{authUser.username}</h1>
          </div>
          <div className="flex mb-2 items-center mx-16 gap-5 md:gap-7">
            <div className="flex flex-col items-center">
              <h1>6</h1>
              <h1>Posts</h1>
            </div>
            <div className="flex flex-col items-center">
              <h1>40</h1>
              <h1>Follwers</h1>
            </div>
            <div className="flex flex-col items-center">
              <h1>66</h1>
              <h1>Following</h1>
            </div>
          </div>
          <div className="flex justify-between gap-2 mx-10">
            <button
              onClick={toggleVisibility}
              type="button"
              className="bg-blue-800 text-white p-2 px-4 capitalize rounded-lg hover:opacity-90 "
            >
              Edit Profile
            </button>
            <button
              type="button"
              className="bg-blue-800 text-white p-2 px-4 capitalize rounded-lg hover:opacity-90"
              onClick={copyURL}
            >
              share Profile
            </button>
          </div>
          <div className="flex items-center justify-center my-4">
            <button
              onClick={handleLogout}
              type="button"
              className="bg-red-500 text-white p-2 px-4 capitalize rounded-lg hover:opacity-90 "
            >
              Logout
            </button>
          </div>
        </div>
      </div>
      {isVisible && (
        <div className="w-[90vw] lg:w-[80vw] my-5 mx-auto  flex flex-col gap-4 rounded-lg">
          <div className="flex items-center gap-3">
            <div className="w-[45%]  border-[1px] border-zinc-400"></div>
            <p className="text-zinc-700 text-lg uppercase">Edit</p>
            <div className="w-[45%]  border-[0.5px] border-zinc-400"></div>
          </div>

          <form onSubmit={handleUpdate} className="flex flex-col gap-3 md:px-10">
            <input
              type="email"
              id="email"
              placeholder="Email ID"
              className="w-full border-[1px] rounded-lg border-zinc-500 p-2 text-[14px] focus:outline-none"
              value={authUser.email}
              disabled={true}
            />
            <input
              type="text"
              id="fullname"
              placeholder="Full Name"
              className="w-full border-[1px] rounded-lg border-zinc-500 p-2 text-[14px] focus:outline-none"
              value={authUser.fullname}
              disabled={true}
            />
            <input
              type="text"
              id="username"
              placeholder="User Name"
              className="w-full border-[1px] rounded-lg border-zinc-500 p-2 text-[14px] focus:outline-none"
              value={formData.username}
              onChange={handleInputChange}
            />
            <input
              type="password"
              id="password"
              placeholder="password"
              className="w-full border-[1px] rounded-lg border-zinc-500 p-2 text-[14px] focus:outline-none"
              value={formData.password}
              onChange={handleInputChange}
            />

            <button className="bg-blue-900 font-bold text-white py-1 rounded-lg hover:opacity-90 disabled:opacity-50 uppercase"
            disabled={loading}
            >
              {loading ? <Spinner /> : "Update"}
            </button>

            <input
              type="file"
              id="profile"
              ref={fileRef}
              onChange={(e) => setfile(e.target.files[0])}
              hidden
            />
          </form>
        </div>
      )}

      <div className="min-h-screen w-full border-t-2 border-t-zinc-700 grid grid-cols-2 md:grid-cols-3 md:pl-[10vw]">
        {userPosts ? (
          userPosts.map((post) => (
            <div key={post._id} className="w-full h-full bg-black relative">
              <Link to={`/userpost/${post._id}`}>
                <img
                  src={post.images}
                  alt=""
                  className=" w-full h-full object-cover bg-gray-600"
                />
              </Link>
              <button
                onClick={() => handleDeletePost({ post })}
                className="absolute top-2 right-2 text-2xl p-2 bg-black/80 rounded-lg hover:opacity-50 text-white cursor-grab"
              >
                <MdOutlineDeleteForever />
              </button>
            </div>
          ))
        ) : (
          <div>No Posts Yet</div>
        )}
      </div>
    </div>
  );
};

export default Profile;
