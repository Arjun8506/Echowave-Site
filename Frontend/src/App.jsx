import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import SideBar from "./components/SideBar";
import Search from "./pages/Search";
import Post from "./pages/Post";
import Profile from "./pages/Profile";
import { useAuthContext } from "./context/authContext";

const App = () => {
  const { authUser } = useAuthContext();

  return (
    <BrowserRouter>
      {authUser ? <SideBar /> : ""}
      <Routes>
        <Route
          path="/"
          element={authUser ? <Home /> : <Navigate to={"/login"} />}
        />
        <Route
          path="/search"
          element={authUser ? <Search /> : <Navigate to={"/login"} />}
        />
        <Route
          path="/post"
          element={authUser ? <Post /> : <Navigate to={"/login"} />}
        />
        <Route
          path="/profile"
          element={authUser ? <Profile /> : <Navigate to={"/login"} />}
        />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
};

export default App;
