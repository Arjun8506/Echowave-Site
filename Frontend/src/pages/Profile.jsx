import React, { useState, useRef } from "react";

const Profile = () => {
  const [isVisible, setIsVisible] = useState(false);
  const fileRef = useRef();
  const [file, setfile] = useState(null);

  console.log(file);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  const copyURL = () => {
    // Get the current URL
    const url = window.location.href;

    // Copy the URL to the clipboard
    navigator.clipboard.writeText(url)
      .then(() => {
        alert('URL copied to clipboard');
      })
      .catch((error) => {
        console.error('Error copying URL: ', error);
      });
  };

  const [formData, setformData] = useState({
    username: "",
    password: "",
  });

  const handleInputChange = (e) => {
    setformData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className="w-full pl-[20vw] overflow-hidden  lg:pl-[22vw] py-5">
      <div
        className="font-bold text-4xl mb-5 uppercase text-center md:text-start"
        id="logofont"
      >
        Profile
      </div>
      <div className="flex flex-col items-center lg:flex-row lg:items-start">
       {isVisible ? (
         <img
         className="w-56 h-56 object-cover border-[1px] border-zinc-400 rounded-full hover:opacity-60 cursor-pointer"
         src="https://i.pinimg.com/564x/72/27/bb/7227bb6cd6cd58f9ccbb009b158605b2.jpg"
         alt="profile"
         onClick={() => fileRef.current.click()}
       />
       ) : (
        <img
        className="w-56 h-56 object-cover border-[1px] border-zinc-400 rounded-full"
        src="https://i.pinimg.com/564x/72/27/bb/7227bb6cd6cd58f9ccbb009b158605b2.jpg"
        alt="profile"
      />
       )}
        <div className="flex flex-col">
          <div className="flex my-10 mx-16 gap-5">
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
          <div className="flex gap-5 mx-16">
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
        </div>
      </div>
      {isVisible && (
        <div className="w-[40vw] my-5 mx-auto  flex flex-col gap-4 rounded-lg">
          <div className="flex items-center gap-3">
            <div className="w-[45%]  border-[1px] border-zinc-400"></div>
            <p className="text-zinc-700 text-lg uppercase">Edit</p>
            <div className="w-[45%]  border-[0.5px] border-zinc-400"></div>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <input
              type="email"
              id="email"
              placeholder="Email ID"
              className="w-full border-[1px] rounded-lg border-zinc-500 p-2 text-[14px] focus:outline-none"
              disabled={true}
            />
            <input
              type="text"
              id="fullname"
              placeholder="Full Name"
              className="w-full border-[1px] rounded-lg border-zinc-500 p-2 text-[14px] focus:outline-none"
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

            <button className="bg-blue-500 text-white py-1 rounded-lg hover:opacity-90">
              Register
            </button>

            <input type="file" id="profile" ref={fileRef} 
            onChange={(e) => setfile(e.target.files[0])}
            hidden
            />
          </form>
        </div>
      )}
    </div>
  );
};

export default Profile;
