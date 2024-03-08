import React from 'react';
import './App.css'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom"; // 
import RootLayuot from './layout/Rootlayout';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import './App.css'
import AddNewProduct from './pages/AddNewProduct';

const router = createBrowserRouter(
  
  createRoutesFromElements(
  <Route path="/" element={<RootLayuot/>}>
      <Route path="Home" element={<Home />} />
      <Route path="AddNewProduct" element={<AddNewProduct />} />
      <Route index element={<Login />} />
  </Route>
  )
);

function App() {

  return (
    <>
      <RouterProvider router={router}  />
    </>
  )
}

export default App
