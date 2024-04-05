import React, { useEffect, useState } from 'react'
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AllPost from './AllPost'

const SeePost = () => {
  const [post, setpost] = useState({})

  const url = window.location.href;
  const parts = url.split("/");
  const id = parts[parts.length - 1];

  useEffect(() => {
    userPost()
  }, [])

  const userPost = async ()=> {
    try {
      const res = await fetch(`/api/post/userpost/${id}`)
      const data = await res.json()
      if (data.success === false) {
        toast.error(data.message);
        return;
      }
      setpost(data.post)
    } catch (error) {
      toast.error(error.message)
    }
  }

  if (!post || !post.author) {
    return null; // Return null or a loading indicator if post or post.author is not defined
  }

  return (
    <div className='w-[80vw] ml-[18vw] pt-6'>
      {post !== null ? (
        <AllPost post={post} />
      ) : "Loading...."}
    </div>
  )
}

export default SeePost