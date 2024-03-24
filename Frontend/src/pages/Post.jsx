import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import React, { useRef, useState } from "react";
import { FaPlus } from "react-icons/fa";
import app from "../../firebase";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Post = () => {
  const [files, setfiles] = useState([]);
  const fileref = useRef();
  const [imageURLs, setimageURLs] = useState([]);
  const [loading, setloading] = useState(false)

  console.log(imageURLs);

  const handleFormSubmit = (e) => {
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

  const storeImage = async (file) => {
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
          console.log(error.message);
          toast.error("You can only upload 10 images or less and size less than 2MB", error.message)
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    });
  };

  return (
    <div className="w-[80vw] ml-[18vw] py-5 px-8">
      <div className="font-bold text-4xl mb-5" id="logofont">
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
          onClick={handleFormSubmit}
          type="button"
          className="w-full p-2 uppercase bg-green-400 rounded-lg my-4"
        >
          Upload To Preview
        </button>
      </form>
          <h1 className="font-bold underline mb-4 uppercase">Preview</h1>
      {imageURLs &&
        imageURLs.length > 0 &&
        imageURLs.map((url, index) => (
          <div className=" flex justify-between items-center w-full h-20 my-4 p-2 border-2 border-zinc-500 rounded-lg" key={index}>
            <img className="w-16 h-16 object-cover rounded-lg"  src={url} alt={`Image ${index}`} />
            <button className="bg-red-500 text-white p-1 px-2 rounded-lg hover:opacity-80">Delete</button>
          </div>
        ))}
    </div>
  );
};

export default Post;
