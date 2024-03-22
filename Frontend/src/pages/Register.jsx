import React, { useState } from "react";
import { Link } from "react-router-dom";

const Register = () => {
  const [formData, setformData] = useState({
    email: "",
    fullname: "",
    username: "",
    password: ""
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
    <div className="w-full min-h-screen px-10 py-4">
      <div className="w-full min-h-screen md:w-[80%] lg:w-[40%]  md:mx-auto  border-[1px] border-zinc-400  flex flex-col gap-4 p-8 rounded-lg">
        <div className="flex gap-2">
      <img src="../../logo.png" alt="Logo" className="w-14 h-14 rounded-full" />
        <h1
          className="font-bold text-6xl text-center text-slate-800"
          id="logofont"
        >
          EchoWave
        </h1>

        </div>
        <p className="text-zinc-700 text-center text-sm">
          Register to see photos and videos <br /> from your friends.
        </p>
        <div className="flex items-center gap-3">
          <div className="w-[45%]  border-[1px] border-zinc-400"></div>
          <p className="text-zinc-700 text-sm capitalize">Register</p>
          <div className="w-[45%]  border-[0.5px] border-zinc-400"></div>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            type="email"
            id="email"
            placeholder="Email ID"
            className="w-full border-[1px] rounded-lg border-zinc-500 p-2 text-[14px] focus:outline-none"
            value={formData.email}
            onChange={handleInputChange}
          />
          <input
            type="text"
            id="fullname"
            placeholder="Full Name"
            className="w-full border-[1px] rounded-lg border-zinc-500 p-2 text-[14px] focus:outline-none"
            value={formData.fullname}
            onChange={handleInputChange}
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

          <p className="text-[12px] text-center">
            People who use our service may have uploaded your contact
            information to EchoWave. Learn More
          </p>
          <p className="text-[12px] text-center">
            By Registering, you agree to our Terms , Privacy Policy and Cookies
            Policy .
          </p>

          <button className="bg-blue-500 text-white py-1 rounded-lg hover:opacity-90">
            Register
          </button>
        </form>

        <p className="text-[14px] capitalize text-zinc-700 ">
          Have an account <Link to={"/login"} className="text-blue-900 underline hover:opacity-90">Log In</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
