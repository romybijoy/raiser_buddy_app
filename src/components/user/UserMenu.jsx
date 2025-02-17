import { Link, useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Title from "../common/Title";
import { breakpoints, defaultTheme } from "../../styles/themes/default";
import { useDispatch, useSelector } from "react-redux";

import { UserAuth } from "../../context/AuthContext";

import { logout } from "../../redux/slices/AuthSlice";


const NavMenuWrapper = styled.nav`
  margin-top: 32px;

  .nav-menu-list {
    row-gap: 8px;

    @media (max-width: ${breakpoints.md}) {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
    }
  }

  .nav-menu-item {
    border-radius: 4px;

    @media (max-width: ${breakpoints.sm}) {
      flex: 1 1 0;
    }
  }

  .nav-menu-link {
    padding-left: 36px;
    width: 100%;
    height: 40px;
    column-gap: 12px;
    border: 1px solid transparent;

    &:hover {
      background-color: ${defaultTheme.color_whitesmoke};
    }

    .nav-link-text {
      color: ${defaultTheme.color_gray};
    }

    &.active {
      border-left: 2px solid ${defaultTheme.color_gray};
      background-color: ${defaultTheme.color_whitesmoke};

      @media (max-width: ${breakpoints.md}) {
        border-bottom: 2px solid ${defaultTheme.color_gray};
        border-left: 0;
        background-color: transparent;
      }
    }

    @media (max-width: ${breakpoints.md}) {
      padding-left: 16px;
      padding-right: 16px;
    }

    @media (max-width: ${breakpoints.sm}) {
      padding-left: 8px;
      padding-right: 8px;
      column-gap: 8px;
    }
  }
`;

const UserMenu = () => {
  const location = useLocation();

  const { user, logOut, currentPath } = UserAuth();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to logout this user?"
    );
    if (confirmDelete) {
      if (user != null) {
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

  const { currentUser } = useSelector((state) => state.app);

  return (
    <div style={{ width: "100%" }}>
      <Title titleText={currentUser && currentUser.name} />
      <p className="text-base font-light italic">Welcome to your account.</p>

      <NavMenuWrapper>
        <ul className="nav-menu-list grid">
          <li className="nav-menu-item">
            <Link
              to="/account"
              className={`nav-menu-link flex items-center ${
                (window.location.pathname === "/account")
                  ? "active"
                  : ""
              }`}
            >
              <span className="nav-link-icon flex items-center justify-center">
                <img src="./assets/icons/ac_user.svg" alt="" />
              </span>
              <span className="text-base font-semibold nav-link-text no-wrap">
                My Account
              </span>
            </Link>
          </li>
          <li className="nav-menu-item">
            <Link
              to="/account/order"
              className={`nav-menu-link flex items-center ${
                (window.location.pathname === "/account/order")
                  ? "active"
                  : ""
              }`}
            >
              <span className="nav-link-icon flex items-center justify-center">
                <img src="./assets/icons/ac_heart.svg" alt="" />
              </span>
              <span className="text-base font-semibold nav-link-text no-wrap">
                My Orders
              </span>
            </Link>
          </li>

          <li className="nav-menu-item">
            <Link
              to="/wishlist"
              className={`nav-menu-link flex items-center ${
                window.location.pathname === "/wishlist" ? "active" : ""
              }`}
            >
              <span className="nav-link-icon flex items-center justify-center">
                <img src="./assets/icons/ac_heart.svg" alt="" />
              </span>
              <span className="text-base font-semibold nav-link-text no-wrap">
                Wishlist
              </span>
            </Link>
          </li>

          <li className="nav-menu-item">
            <Link
              to="/coupons"
              className={`nav-menu-link flex items-center ${
                window.location.pathname === "/coupons" ? "active" : ""
              }`}
            >
              <span className="nav-link-icon flex items-center justify-center">
                <img src="./assets/icons/ac_heart.svg" alt="" />
              </span>
              <span className="text-base font-semibold nav-link-text no-wrap">
                Coupons
              </span>
            </Link>
          </li>

          <li className="nav-menu-item">
            <Link
              to="/forgotPassword"
              className={`nav-menu-link flex items-center`}
            >
              <span className="nav-link-icon flex items-center justify-center">
                <img src="./assets/icons/ac_user.svg" alt="" />
              </span>
              <span className="text-base font-semibold nav-link-text no-wrap">
                Forgot Password
              </span>
            </Link>
          </li>

          <li className="nav-menu-item">
            <Link
              to=""
              onClick={handleLogout}
              className={`nav-menu-link flex items-center`}
            >
              <span className="nav-link-icon flex items-center justify-center">
                <img src="./assets/icons/ac_sign_out.svg" alt="" />
              </span>
              <span className="text-base font-semibold nav-link-text no-wrap">
                Sign out
              </span>
            </Link>
          </li>
        </ul>
      </NavMenuWrapper>
    </div>
  );
};

export default UserMenu;
