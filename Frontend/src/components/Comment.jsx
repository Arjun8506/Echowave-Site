import React from 'react'

const Comment = ({ comment }) => {

  function convertToIndianTime(timestamp) {
    const date = new Date(timestamp);
    const day = date.toLocaleString("en-IN", { weekday: "long" });
    const month = date.toLocaleString("en-IN", { month: "long" });
    const year = date.getFullYear();
    const indianDate = `${day}, ${month} ${date.getDate()}, ${year}`;
    return `${indianDate}`;
  }

  const time = convertToIndianTime(comment.createdAt);

  return (
    <div className='w-full h-fit bg-gray-100 rounded-lg px-2 py-2'>
      <div className='flex items-center justify-between'>
      <div className='flex gap-1 items-center'>
        <img src={comment.userid.profilePic} alt="userProfilePic" className='w-8 h-8 object-cover rounded-full border-2 border-gray-500' />
        <h1 className='text-xs font-bold'>{comment.userid.username}</h1>
      </div>
      <div className='text-[10px]'>
        {time}
      </div>
      </div>
      <div className='text-sm font-semibold py-1'>
        {comment.comment}
      </div>
    </div>
  )
}

export default Comment