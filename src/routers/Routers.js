import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/Home";
import Shop from "../pages/Shop";
import ProductDetails from "../pages/ProductDetails";
import Login from "../pages/auth/Login";
import Signup from "../pages/auth/Register";
import VerifyOtp from "../pages/auth/VerifyOtp";
import ForgotPassword from "../pages/auth/ForgotPassword";
import ResetPassword from "../pages/auth/ResetPassword";
import Protected from "../components/Protected/Protected";
import Cart from "../pages/Cart/Cart";

const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to={"login"} />} />

      <Route
        path="home"
        element={
          
            <Home />
       
        }
      />
      <Route path="login" element={<Login />} />
      <Route path="signup" element={<Signup />} />

      <Route
        path="/product/:productId"
        exact
        element={
          <Protected>
            <ProductDetails />
          </Protected>
        }
      />
      <Route
        path="shop"
        element={
          <Protected>
            <Shop />
          </Protected>
        }
      />

      <Route
        path="cart"
        element={
          <Protected>
            <Cart />
          </Protected>
        }
      />

      <Route path="verifyotp" element={<VerifyOtp />} />
      <Route path="forgotPassword" element={<ForgotPassword />} />
      <Route path="set-Password" element={<ResetPassword />} />
    </Routes>
  );
};

export default Routers;
