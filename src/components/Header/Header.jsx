import React, { useRef, useEffect } from "react";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import logo from "../../assets/images/logo.png";
import userIcon from "../../assets/images/user-icon.png";
import "./header.css";
import { useDispatch, useSelector } from "react-redux";
import { UserAuth } from "../../context/AuthContext";
import { logout } from "../../redux/slices/AuthSlice";

const nav_links = [
  { path: "home", display: "Home" },
  { path: "shop", display: "Shop" },
  { path: "cart", display: "Cart" },
];

const Header = () => {
  const location = useLocation();
  const headerRef = useRef();
  const menuRef = useRef();

  const { totalItem } = useSelector((state) => state.cart);
  const { count } = useSelector((state) => state.wishlist);
  const { userInfo } = useSelector((state) => state.auth);
  const { currentUser } = useSelector((state) => state.app);

  const { user, logOut } = UserAuth();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const stickyHeaderFunc = () => {
    if (
      document.body.scrollTop > 80 ||
      document.documentElement.scrollTop > 80
    ) {
      headerRef.current?.classList.add("sticky_header");
    } else {
      headerRef.current?.classList.remove("sticky_header");
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", stickyHeaderFunc);
    return () => window.removeEventListener("scroll", stickyHeaderFunc);
  }, []);

  const handleLogout = async () => {
    if (window.confirm("Are you sure you want to logout?")) {
      if (user) await logOut();
      dispatch(logout());
      navigate("/login");
    }
  };

  const menuToggle = () => menuRef.current.classList.toggle("active_menu");

  return (
    <header className="bg-white shadow-md sticky top-0 z-50" ref={headerRef}>
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between py-3">

        {/* Logo */}
        <div className="flex items-center gap-2">
          <img src={logo} alt="logo" className="w-10 h-10" />
          <h1 className="text-xl font-bold">Raiser Buddy</h1>
        </div>

        {/* Navigation */}
        <div ref={menuRef} className="hidden md:flex">
          <ul className="flex gap-6">
            {nav_links.map((item, index) => (
              <li key={index}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    isActive
                      ? "text-green-600 font-semibold"
                      : "text-gray-700 hover:text-green-500"
                  }
                >
                  {item.display}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        {/* Right Side */}
        {userInfo || user?.displayName ? (
          <div className="flex items-center gap-4">

            {/* Wishlist */}
            <Link to="/account/wishlist" className="relative">
              <i className="ri-heart-line text-xl"></i>
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1 rounded-full">
                {count}
              </span>
            </Link>

            {/* Cart */}
            <Link to="/cart" className="relative">
              <i className="ri-shopping-bag-line text-xl"></i>
              <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-1 rounded-full">
                {totalItem}
              </span>
            </Link>

            {/* Profile */}
            <Link to="/account">
              <motion.img
                whileTap={{ scale: 1.1 }}
                src={currentUser?.image || userIcon}
                alt="user"
                className="w-8 h-8 rounded-full"
              />
            </Link>

            {/* Logout */}
            <button
              onClick={handleLogout}
              className="text-sm text-red-500 hover:underline"
            >
              Logout
            </button>

            {/* Mobile Menu */}
            <div className="md:hidden" onClick={menuToggle}>
              <i className="ri-menu-line text-2xl"></i>
            </div>
          </div>
        ) : (
          <div className="flex gap-4">
            <NavLink to="/login" className="text-gray-700">
              Sign In
            </NavLink>
            <NavLink to="/signup" className="text-green-600 font-semibold">
              Sign Up
            </NavLink>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;