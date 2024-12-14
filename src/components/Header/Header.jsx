import React, { useRef, useEffect } from "react";
import {
  Link,
  NavLink,
  useNavigate,
  LinkContainer,
  useLocation,
} from "react-router-dom";
import { motion } from "framer-motion";
import logo from "../../assets/images/logo.png";
import userIcon from "../../assets/images/user-icon.png";
import { Container, Row } from "reactstrap";
import "./header.css";
import { useDispatch, useSelector } from "react-redux";
import { Navbar, NavDropdown } from "react-bootstrap";
import { UserAuth } from "../../context/AuthContext";

import { logout } from "../../redux/slices/AuthSlice";

const nav_links = [
  {
    path: "home",
    display: "Home",
  },
  {
    path: "shop",
    display: "Shop",
  },

  {
    path: "cart",
    display: "Cart",
  },
];

const Header = () => {
  const location = useLocation();
  const headerRef = useRef();
  const menuRef = useRef();
  const { totalItem } = useSelector((state) => state.cart);
  const { wishlist, count } = useSelector((state) => state.wishlist);

  const stickyHeaderFunc = () => {
    window.addEventListener("scroll", () => {
      if (
        document.body.scrollTop > 80 ||
        document.documentElement.scrollTop > 80
      ) {
        if (headerRef.current) {
          headerRef.current.classList.add("sticky_header");
        }
      } else {
        if (headerRef.current) {
          headerRef.current.classList.remove("sticky_header");
        }
      }
    });
  };

  const { userInfo } = useSelector((state) => state.auth);
  const { currentUser } = useSelector((state) => state.app);

  const { user, logOut } = UserAuth();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const handleLogout = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to logout this user?"
    );
    if (confirmDelete) {
      if (user) {
        try {
          await logOut();
        } catch (error) {
          console.log(error);
        }
      }

      dispatch(logout());
      navigate("/login");
    }
  };

  const handleOrders = () => {
    navigate("/account/order");
  };

  useEffect(() => {
    stickyHeaderFunc();

    return () => window.removeEventListener("scroll", stickyHeaderFunc);
  }, []);

  const menuToggle = () => menuRef.current.classList.toggle("active_menu");

  return (
    <header className="header" ref={headerRef}>
      <Container>
        <Row>
          <div className="nav_wrapper">
            <div className="logo">
              <img src={logo} alt="logo" />
              <div>
                <h1>Raiser Buddy</h1>
              </div>
            </div>
            <div className="navigation" ref={menuRef} onClick={menuToggle}>
              <ul className="menu">
                {nav_links.map((item, index) => (
                  <li className="nav_item" key={index}>
                    <NavLink
                      to={item.path}
                      className={(navClass) =>
                        navClass.isActive ? "nav_active" : ""
                      }
                    >
                      {item.display}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>

            {userInfo || user?.displayName ? (
              <div className="nav_icons">
                <span className="fav_icon">
                  <Link
                    to="/wishlist"
                    className={`icon-link items-center justify-center`}
                  >
                    <i className="ri-heart-line"></i>
                    <span className="badge">{count} </span>
                  </Link>
                </span>
                <span className="cart_icon">
                  <Link
                    to="/cart"
                    className={`icon-link items-center justify-center`}
                  >
                    <i className="ri-shopping-bag-line"></i>
                    <span className="badge">{totalItem}</span>
                  </Link>
                </span>
                <span>
                  <Link
                    to="/account"
                    className={`icon-link items-center justify-center`}
                  >
                    {currentUser && currentUser.image ? (
                      <motion.img
                        whileTap={{ scale: 1.1 }}
                        src={currentUser && currentUser.image}
                        alt="user"
                      />
                    ) : (
                      <motion.img
                        whileTap={{ scale: 1.1 }}
                        src={userIcon}
                        alt="user"
                      />
                    )}
                  </Link>
                </span>

                {/* <NavDropdown title={userInfo?.name} id="username">
                  <NavLink to="/profile">
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </NavLink>

                  <NavLink to="/login">
                    <NavDropdown.Item onClick={handleOrders}>
                      My Orders
                    </NavDropdown.Item>
                  </NavLink>
                  <NavLink to="/login">
                    <NavDropdown.Item onClick={handleLogout}>
                      Logout
                    </NavDropdown.Item>
                  </NavLink>
                </NavDropdown> */}

                <div className="mobile_menu">
                  <span onClick={menuToggle}>
                    <i className="ri-menu-line"></i>
                  </span>
                </div>
              </div>
            ) : (
              <div>
                <NavLink className="p-3" to="/login">
                  <i className="ri-login-box-line"></i> Sign In
                </NavLink>
                <NavLink to="/signup">
                  <i className="ri-logout-box-line"></i> Sign Up
                </NavLink>
              </div>
            )}
          </div>
        </Row>
      </Container>
    </header>
  );
};

export default Header;
