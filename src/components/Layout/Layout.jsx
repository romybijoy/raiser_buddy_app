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

  const { currentUser } = useSelector((state) => state.app);

  useEffect(() => {
    if (token) {
      dispatch(getProf());
    }
  }, [dispatch, token]);

  // Step 2: Load dependent data AFTER user is available
  useEffect(() => {
    if (currentUser?.id) {
      dispatch(showCart(currentUser.id));
      dispatch(showWishlist(currentUser.id));
    }
  }, [currentUser, dispatch]);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <ToastContainer />

      {/* MAIN CONTENT */}
      <div className="flex-grow">
        <Routers />
      </div>

      <Footer />
    </div>
  );
};

export default Layout;
