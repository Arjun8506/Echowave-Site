import React, { useRef, useState } from "react";
import { FaPlus } from "react-icons/fa";

const Post = () => {
  const [files, setfiles] = useState([]);
  const fileref = useRef();

  console.log(files);

  return (
    <div className="w-[80vw] ml-[20vw] py-5 px-5">
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
    </div>
  );
};

export default Post;
