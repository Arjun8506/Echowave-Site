import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [formData, setformData] = useState({
    email: "",
    fullname: "",
    username: "",
    password: "",
  });
  const [loading, setloading] = useState(false);
  const [errorGot, seterrorGot] = useState(null);

  const navigate = useNavigate()

  const handleInputChange = (e) => {
    setformData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);

    try {
      setloading(true);
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        seterrorGot(data.message);
        setloading(false);
        toast.error(data.message);
        return;
      }
      setloading(false);
      seterrorGot(null);
      toast.success(data.message);
      navigate("/login")
    } catch (error) {
      console.log(error);
      seterrorGot(error.message);
      setloading(false);
      toast.error(error.message);
    }
  };

  return (
    <div className="w-full min-h-screen px-10 py-4">
      <div className="w-full md:w-[80%] lg:w-[40%] my-auto  md:mx-auto md:my-auto border-[1px] border-zinc-400  flex flex-col gap-4 p-4 lg:p-8 rounded-lg">
        <div className="flex gap-2 items-center">
          <img
            src="../../logo.png"
            alt="Logo"
            className="w-14 h-14 rounded-full"
          />
          <h1
            className="font-bold text-3xl lg:text-6xl text-center text-slate-800"
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

          <button
            className="bg-blue-500 text-white py-1 rounded-lg hover:opacity-90 disabled:opacity-50"
            disabled={loading}
          >
            {loading ? "Loading..." : "Register"}
          </button>
        </form>

        {errorGot ? (
          <p className="text-red-600 text-center text-[16px]">{errorGot}</p>
        ) : (
          ""
        )}

        <p className="text-[14px] capitalize text-zinc-700 ">
          Have an account{" "}
          <Link
            to={"/login"}
            className="text-blue-900 underline hover:opacity-90"
          >
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
