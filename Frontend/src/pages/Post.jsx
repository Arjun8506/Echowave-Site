import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import React, { useEffect, useRef, useState } from "react";
import { FaPlus } from "react-icons/fa";
import app from "../../firebase";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Spinner from "../components/Spinner";
import { useAuthContext } from "../context/authContext";
import { useNavigate } from "react-router-dom";

const Post = () => {
  const { authUser } = useAuthContext();

  const [files, setfiles] = useState([]);
  const fileref = useRef();
  const [imageURLs, setimageURLs] = useState([]);
  const [loading, setloading] = useState(false);
  const [loadingwhileSubmiting, setloadingwhileSubmiting] = useState(false);
  const navigate = useNavigate()

  const [formData, setformData] = useState({
    caption: "",
    description: "",
    images: [],
  });

  const handleImageSubmit = (e) => {
    e.preventDefault();
    if (files.length > 0 && files.length < 11) {
      const promises = [];
      for (let i = 0; i < files.length; i++) {
        promises.push(storeImage(files[i]));
      }
      Promise.all(promises).then((urls) => {
        setimageURLs(imageURLs.concat(urls));
      });
    }
  };

  useEffect(() => {
    setformData((prevData) => ({
      ...prevData,
      images: imageURLs,
    }));
  }, [imageURLs]);

  const storeImage = async (file) => {
    setloading(true);
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const filename = new Date().getTime() + file.name;
      const storageRef = ref(storage, filename);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(progress);
        },
        (error) => {
          setloading(false);
          console.log(error.message);
          toast.error(
            "You can only upload 10 images or less and size less than 4MB",
            error.message
          );
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
          setloading(false);
        }
      );
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      setloadingwhileSubmiting(true);
      const res = await fetch(`/api/post/create/${authUser._id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      const data = await res.json()
      if (data.success === false) {
        setloadingwhileSubmiting(false)
        toast.error(data.message)
        return
      }
      setloadingwhileSubmiting(false)
      toast.success(data.message)
      navigate("/profile")
    } catch (error) {
      setloadingwhileSubmiting(false)
      toast.error(error.message);
    }
  };

  const handleDeleteImage = (index) => {
    const updatedImageURLs = [...imageURLs];
    updatedImageURLs.splice(index, 1); // Remove the image URL at the specified index
    setimageURLs(updatedImageURLs); // Update the state with the new array
  };

  return (
    <div className="px-2 md:w-[90vw] md:ml-[8vw] lg:w-[80vw] lg:ml-[18vw] md:pt-6 py-5 md:px-8 lg:px-10 mb-10">
      <div className="font-bold text-4xl mb-5 px-2" id="logofont">
        POST
      </div>

      <div className=" border-[1px] border-zinc-400 py-16 rounded-lg">
        <div
          onClick={() => fileref.current.click()}
          className="border-2 border-dashed border-zinc-300 mx-auto cursor-pointer w-fit p-16 rounded-lg text-2xl "
        >
          <FaPlus />
        </div>
      </div>
      <form>
        <input
          type="file"
          id="post"
          ref={fileref}
          hidden
          multiple
          onChange={(e) => {
            const selectedFiles = Array.from(e.target.files);
            setfiles([...files, ...selectedFiles]);
          }}
        />
        <button
          onClick={handleImageSubmit}
          type="button"
          className="w-full p-2 uppercase bg-gray-900 text-white rounded-lg my-4 disabled:opacity-50 hover:opacity-90 font-bold "
          disabled={loading}
        >
          {loading ? <Spinner /> : "Upload To Preview"}
        </button>
        <div className="w-full flex flex-col gap-4">
          <input
            type="text"
            id="caption"
            placeholder="Caption Goes Here...."
            className="border-b-[1px] border-b-zinc-400 focus:outline-none p-2"
            value={formData.caption}
            onChange={(e) =>
              setformData((prevData) => ({
                ...prevData,
                caption: e.target.value,
              }))
            }
          />
          <textarea
            id="description"
            placeholder="Description ang Hashtags Goes Here...."
            className="h-32 border-b-[1px] border-b-zinc-400 focus:outline-none p-2 mb-4"
            value={formData.description}
            onChange={(e) =>
              setformData((prevData) => ({
                ...prevData,
                description: e.target.value,
              }))
            }
          />
        </div>
        <h1 className="font-bold underline mb-4 uppercase">Preview</h1>
        {imageURLs &&
          imageURLs.length > 0 &&
          imageURLs.map((url, index) => (
            <div
              className=" flex justify-between items-center w-full h-20 my-4 p-2 border-2 border-zinc-500 rounded-lg"
              key={index}
            >
              <img
                className="w-16 h-16 object-cover rounded-lg"
                src={url}
                alt={`Image ${index}`}
              />
              <button
                onClick={() => handleDeleteImage(index)}
                className="bg-red-500 text-white p-1 px-2 rounded-lg hover:opacity-80"
              >
                Delete
              </button>
            </div>
          ))}
        <button
          onClick={handleFormSubmit}
          className="w-full p-2 uppercase bg-gray-900 text-white rounded-lg my-4 disabled:opacity-50 hover:opacity-90 font-bold "
          disabled={loadingwhileSubmiting}
        >
          {loadingwhileSubmiting ? <Spinner /> : "post"}
        </button>
      </form>
    </div>
  );
};

export default Post;
