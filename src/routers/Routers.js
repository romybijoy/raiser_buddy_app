import React, { Suspense} from "react";
import { Routes, Route, Navigate } from "react-router-dom";
const Home = React.lazy(() => import("../pages/Home"));
const Shop = React.lazy(() => import("../pages/Shop"));
const Checkout = React.lazy(() => import("../pages/Checkout/Checkout"));
const ProductDetails = React.lazy(() => import("../pages/ProductDetails"));
const Login = React.lazy(() => import("../pages/auth/Login"));
const Signup = React.lazy(() => import("../pages/auth/Register"));
const VerifyOtp = React.lazy(() => import("../pages/auth/VerifyOtp"));
const ForgotPassword = React.lazy(() => import("../pages/auth/ForgotPassword"));
const ResetPassword = React.lazy(() => import("../pages/auth/ResetPassword"));
const Order = React.lazy(() => import("../pages/orders/Order"));
const OrderDetails = React.lazy(() => import("../pages/orders/OrderDetails"));
const Protected = React.lazy(() => import("../components/Protected/Protected"));
const Cart = React.lazy(() => import("../pages/Cart/Cart"));
const RateProduct = React.lazy(() =>
  import("../pages/ReviewProduct/RateProduct")
);
const Account = React.lazy(() => import("../pages/Account/Account"));
const Address = React.lazy(() => import("../pages/Account/Address"));
const PaymentSuccess = React.lazy(() =>
  import("../pages/paymentSuccess/PaymentSuccess")
);
const WishList = React.lazy(() => import("../pages/Account/WishListScreen"));
const Coupons = React.lazy(() => import("../pages/Account/Coupons"));

const Routers = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
    <Routes>
      <Route path="/" element={<Navigate to={"home"} />} />

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
    </Suspense>
  );
};

export default Routers;
