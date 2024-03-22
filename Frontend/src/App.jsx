import React from 'react'
import Register from './pages/Register'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from './pages/Login'
import Home from './pages/Home'
import SideBar from './components/SideBar'
import Search from './pages/Search'
import Post from './pages/Post'
import Profile from './pages/Profile'

const App = () => {
  return (
    <BrowserRouter>
    <SideBar />
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/search' element={<Search />} />
      <Route path='/post' element={<Post />} />
      <Route path='/profile' element={<Profile />} />
      <Route path='/register' element={<Register />} />
      <Route path='/login' element={<Login />} />
    </Routes>
    </BrowserRouter>
  )
}

export default App