import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import React from 'react';
import {BrowserRouter, Route, Router, Routes} from "react-router-dom";
import BlogForm from "./components/BlogForm.tsx";
import BlogOutline from "./components/BlogOutline.tsx";

function App() {

  return (
    <>
     <BrowserRouter>
         <Routes>
             <Route path="/blog-question" element={<BlogForm/>}/>
             <Route path="/blog-details" element={<BlogOutline/>}/>
         </Routes>
     </BrowserRouter>
    </>
  )
}

export default App
