import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import React from 'react';
import {BrowserRouter, Route, Router, Routes} from "react-router-dom";
import BlogForm from "./components/BlogForm.tsx";
import BlogOutline from "./components/BlogOutline.tsx";
import EditBlog from "./components/EditBlog.tsx";
import Tiptap from "./components/Tiptap.tsx";
import UsernameModal from "./components/UsernameModal.tsx";
import UserHomePage from "./components/UserHomePage.tsx";

function App() {

  return (
    <>
     <BrowserRouter>
         <Routes>
             <Route path="/blog-question" element={<BlogForm/>}/>
             <Route path="/blog-edit" element={<EditBlog/>}/>
             <Route path="/tiptap" element={<Tiptap/>}/>
             <Route path="/" element={<UsernameModal/>}/>
             <Route path="/home" element={<UserHomePage/>}/>
         </Routes>
     </BrowserRouter>
    </>
  )
}

export default App
