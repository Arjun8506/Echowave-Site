import React, { useState, useEffect } from "react";
import AllPost from "../components/AllPost";

const Home = () => {
  const [posts, setposts] = useState([]);
  const [loading, setloading] = useState(false);
  const [errorgot, seterrorgot] = useState(null);

  useEffect(() => {
    getPosts();
  }, []);

  const getPosts = async () => {
    setloading(true);
    try {
      const res = await fetch("/api/post/posts");
      const data = await res.json();
      if (data.success === false) {
        setloading(false);
        console.log(data.message);
        return;
      }
      setloading(false);
      setposts(data.posts);
    } catch (error) {
      setloading(false);
      console.log(error);
    }
  };

  return (
    <div className=" px-2 md:w-[90vw] md:ml-[8vw] lg:w-[80vw] lg:ml-[18vw] md:pt-6 overflow-x-hidden">
      <h1 className="uppercase text-center font-bold text-xl my-5">All posts of all users</h1>
      {loading && <p className="  md:pt-10 text-center text-2xl">Loading....</p>}
      {posts.map((post) => (
        <AllPost key={post._id} post={post} />
      ))}
    </div>
  );
};

export default Home;
