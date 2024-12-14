import React, { useEffect } from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Routers from "../../routers/Routers";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { getProf } from "../../redux/slices/UserSlice";
import { useDispatch, useSelector } from "react-redux";

import { showCart } from "../../redux/slices/CartSlice";
import { showWishlist } from "../../redux/slices/WishlistSlice";

const Layout = () => {
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");

  useEffect(() => {
    dispatch(getProf());
    dispatch(showCart());
    dispatch(showWishlist());
  }, [dispatch]);

  return (
    <>
      <Header />
      <ToastContainer />

      <Routers />
      <Footer />
    </>
  );
};

export default Layout;
