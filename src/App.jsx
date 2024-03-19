import React from 'react';
import './App.css'
import { createBrowserRouter, createRoutesFromElements, Route, Routes, RouterProvider } from "react-router-dom"; // 
import RootLayuot from './layout/Rootlayout';
import Home from './pages/Home';
import Login from './pages/Login';
import './App.css'
import AddNewProduct from './pages/AddNewProduct';
import Error from './pages/Error';
import { AuthProvider } from './context/Auth';
import RequireAuth from './auth/RequireAuth';
import ActiveProducts from './pages/ActiveProducts';
import EditImage from './pages/EditImage';
import InActiveProducts from './pages/InActiveProducts';
import UpdateProduct from './pages/UpdateProduct';
import { Outlet } from 'react-router-dom';
import AddCategory from './pages/AddCategory';
import UpdateCategory from './pages/UpdateCategory';
import UpdateSubCategory from './pages/UpdateSubCategory';
import AddSubCategory from './pages/AddSubCategory';

const router = createBrowserRouter(

  createRoutesFromElements(

    <Route path="/" element={<RootLayuot />}>

      <Route path="home" element={
        <RequireAuth> <Home /> </RequireAuth>} />

      <Route path="addnewproduct" element={
        <RequireAuth> <AddNewProduct /> </RequireAuth>} />

      <Route path="activeproducts" element={
        <RequireAuth> <ActiveProducts /> </RequireAuth>} />

      <Route path="editimage" element={
        <RequireAuth> <EditImage /> </RequireAuth>} />

      <Route path="inactiveproducts" element={
        <RequireAuth> <InActiveProducts /> </RequireAuth>} />

      <Route path="addcategory" element={
        <RequireAuth> <AddCategory /> </RequireAuth>} />

      <Route path="updatecategory" element={
        <RequireAuth> <UpdateCategory /> </RequireAuth>} />

      <Route path="addsubcategory" element={
        <RequireAuth> <AddSubCategory /> </RequireAuth>} />

      <Route path="updatesubcategory" element={
        <RequireAuth> <UpdateSubCategory /> </RequireAuth>} />

      <Route path="updateproduct" element={
        <Outlet />}>
        <Route path=':ProductId' element={
          <RequireAuth>
            <UpdateProduct />
          </RequireAuth>
        } />

      </Route>

      <Route index element={<Login />} />
      <Route path="*" element={<Error />} />
    </Route>
  )
);

function App() {

  return (
    <>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </>
  )
}

export default App
