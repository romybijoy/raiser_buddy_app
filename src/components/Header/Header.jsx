import React, { useRef, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import logo from "../../assets/images/LOGO.png";
import userIcon from "../../assets/images/user-icon.png";
import { Container, Row } from "reactstrap";
import "./header.css";
import { useDispatch, useSelector } from "react-redux";
import { Navbar, NavDropdown } from "react-bootstrap";
import { UserAuth } from "../../context/AuthContext";

import { logout } from "../../redux/slices/AuthSlice";
import { showCart } from "../../redux/slices/CartSlice";

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
  const headerRef = useRef(null);
  const menuRef = useRef(null);
  const { totalItem } = useSelector((state) => state.cart);

  const stickyHeaderFunc = () => {
    window.addEventListener("scroll", () => {
      if (
        document.body.scrollTop > 80 ||
        document.documentElement.scrollTop > 80
      ) {
        headerRef.current.classList.add("sticky_header");
      } else {
        headerRef.current.classList.remove("sticky_header");
      }
    });
  };

  const { userInfo } = useSelector((state) => state.auth);
  const { user, logOut } = UserAuth();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const handleLogout = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to logout this user?"
    );
    if (confirmDelete) {
      if (user != {}) {
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

  useEffect(() => {
    stickyHeaderFunc();
    dispatch(showCart());

    return () => window.removeEventListener("scroll", stickyHeaderFunc);
  },[]);

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
                  <i className="ri-heart-line"></i>
                  <span className="badge">2</span>
                </span>
                <span className="cart_icon">
                  <i className="ri-shopping-bag-line"></i>
                  <span className="badge">{totalItem}</span>
                </span>
                <span>
                  <motion.img
                    whileTap={{ scale: 1.1 }}
                    src={userIcon}
                    alt="user"
                  />
                </span>

                <NavDropdown title={userInfo?.name} id="username">
                  {/* <LinkContainer to="/profile">
                      <NavDropdown.Item>Profile</NavDropdown.Item>
                    </LinkContainer> */}
                  <NavLink to="/login">
                    <NavDropdown.Item onClick={handleLogout}>
                      Logout
                    </NavDropdown.Item>
                  </NavLink>
                </NavDropdown>

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
