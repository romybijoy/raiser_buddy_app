import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/Home";
import Shop from "../pages/Shop";
import Checkout from "../pages/Checkout/Checkout";
import ProductDetails from "../pages/ProductDetails";
import Login from "../pages/auth/Login";
import Signup from "../pages/auth/Register";
import VerifyOtp from "../pages/auth/VerifyOtp";
import ForgotPassword from "../pages/auth/ForgotPassword";
import ResetPassword from "../pages/auth/ResetPassword";
import Order from "../pages/orders/Order";
import OrderDetails from "../pages/orders/OrderDetails";
import Protected from "../components/Protected/Protected";
import Cart from "../pages/Cart/Cart";
import RateProduct from "../pages/ReviewProduct/RateProduct";
import Account from "../pages/Account/Account";
import Address from "../pages/Account/Address";
import PaymentSuccess from "../pages/paymentSuccess/PaymentSuccess";

import WishList from "../pages/Account/WishListScreen";
import Coupons from "../pages/Account/Coupons";

const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to={"login"} />} />

      <Route path="home" element={<Home />} />
      <Route path="/login" element={<Login />} />
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
      <Route path="shop" element={<Shop />} />

      <Route path="cart" element={<Cart />} />
      <Route
        path="/checkout"
        element={
          <Protected>
            <Checkout />
          </Protected>
        }
      />

      <Route
        path="/coupons"
        element={
          <Protected>
            <Coupons />
          </Protected>
        }
      />

      <Route
        exact
        path="/account/order"
        element={
          <Protected>
            <Order />
          </Protected>
        }
      ></Route>
      <Route
        exact
        path="/account/order/:orderId"
        element={
          <Protected>
            <OrderDetails />
          </Protected>
        }
      ></Route>

      <Route
        path="/payment/:orderId"
        element={
          <Protected>
            <PaymentSuccess />
          </Protected>
        }
      ></Route>

      <Route
        path="/account/review/:productId"
        element={<RateProduct />}
      ></Route>
      <Route path="verifyotp" element={<VerifyOtp />} />
      <Route path="/forgotPassword" element={<ForgotPassword />} />
      <Route path="set-Password" element={<ResetPassword />} />
      <Route
        path="/wishlist"
        element={
          <Protected>
            <WishList />
          </Protected>
        }
      />
      <Route
        path="/account"
        element={
          <Protected>
            <Account />
          </Protected>
        }
      />
      <Route
        path="/account/add"
        element={
          <Protected>
            <Address />
          </Protected>
        }
      />
    </Routes>
  );
};

export default Routers;
