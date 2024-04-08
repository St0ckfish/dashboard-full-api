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
import InActiveProducts from './pages/InActiveProducts';
import UpdateProduct from './pages/UpdateProduct';
import { Outlet } from 'react-router-dom';
import AddCategory from './pages/AddCategory';
import UpdateCategory from './pages/UpdateCategory';
import UpdateSubCategory from './pages/UpdateSubCategory';
import AddSubCategory from './pages/AddSubCategory';
import AddAdvertisement from './pages/AddAdvertisement';
import GetAllAdvertisements from './pages/GetAllAdvertisements';
import AddBlogs from './pages/AddBlogs';
import GetAllBlogs from './pages/GetAllBlogs';
import AddCoupon from './pages/AddCoupon';
import AddCouponNAll from './pages/AddCouponNAll';
import AddCouponNS from './pages/AddCouponNS';
import AllCoupons from './pages/Allcoupons';
import NotifyAllCustomers from './pages/NotifyAllCustomers';
import NotifySelectedCustomers from './pages/NotifySelectedCustomers';
import Users from './pages/Users';
import PreparedOrders from './pages/PreparedOrders';
import DeliverdOrders from './pages/DeliverdOrders';
import ShippedOrders from './pages/ShippedOrders';
import OrderPreview from './pages/OrderPreview';
import Report from './pages/Report';

const router = createBrowserRouter(

  createRoutesFromElements(

    <Route path="/" element={<RootLayuot />}>

      <Route path="home" element={
        <RequireAuth> <Home /> </RequireAuth>} />

      <Route path="addnewproduct" element={
        <RequireAuth> <AddNewProduct /> </RequireAuth>} />

      <Route path="activeproducts" element={
        <RequireAuth> <ActiveProducts /> </RequireAuth>} />

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

      <Route path="addadvertisement" element={
        <RequireAuth> <AddAdvertisement /> </RequireAuth>} />

      <Route path="getalladvertisements" element={
        <RequireAuth> <GetAllAdvertisements /> </RequireAuth>} />

      <Route path="addblogs" element={
        <RequireAuth> <AddBlogs /> </RequireAuth>} />

      <Route path="getallblogs" element={
        <RequireAuth> <GetAllBlogs /> </RequireAuth>} />

      <Route path="addcoupon" element={
        <RequireAuth> <AddCoupon /> </RequireAuth>} />

      <Route path="addcouponnall" element={
        <RequireAuth> <AddCouponNAll /> </RequireAuth>} />

      <Route path="addcouponns" element={
        <RequireAuth> <AddCouponNS /> </RequireAuth>} />

      <Route path="allcoupons" element={
        <RequireAuth> <AllCoupons /> </RequireAuth>} />

      <Route path="notifyallcustomers" element={
        <RequireAuth> <NotifyAllCustomers /> </RequireAuth>} />

      <Route path="notifyselectedcustomers" element={
        <RequireAuth> <NotifySelectedCustomers /> </RequireAuth>} />

      <Route path="users" element={
        <RequireAuth> <Users /> </RequireAuth>} />

      <Route path="preparedorders" element={
        <RequireAuth> <PreparedOrders /> </RequireAuth>} />

      <Route path="deliverdorders" element={
        <RequireAuth> <DeliverdOrders /> </RequireAuth>} />

      <Route path="shippedorders" element={
        <RequireAuth> <ShippedOrders /> </RequireAuth>} />

      <Route path="report" element={
        <RequireAuth> <Report /> </RequireAuth>} />

      <Route path="orderpreview" element={
        <Outlet />}>
        <Route path=':OrderId' element={
          <RequireAuth>
            <OrderPreview />
          </RequireAuth>
        } />
      </Route>

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
