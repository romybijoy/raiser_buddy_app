import React, { useState, useEffect } from "react";
import CartItem from "./CartItem";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { showCart } from "../../redux/slices/CartSlice";
import CommonSection from "../../components/UI/CommonSection";
import Helmet from "../../components/Helmet/Helmet";
import CartEmptyScreen from "./CartEmptyScreen";

const Cart = () => {
  const { cartData, loading } = useSelector((state) => state.cart);
  const [totalPrice, setTotalPrice] = useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(showCart());
    if (cartData?.totalPrice < 1000) {
      setTotalPrice((cartData?.totalDiscountedPrice) + 40);
      console.log(totalPrice);
    }
    else{
    setTotalPrice(cartData?.totalDiscountedPrice);
    }
    console.log(totalPrice);
  }, [dispatch]);

  return (
    <Helmet title="Shop">
      <CommonSection title="Cart" />
      <>
        {cartData?.cartItems?.length === 0 ||
        cartData?.cartItems === undefined ? (
          <div className="lg:grid grid-cols-1 lg:px-16 relative p-5">
            {/* <h1 className="text-center fs-4">No cart items are found !</h1> */}
            <CartEmptyScreen />
          </div>
        ) : (
          <div className="lg:grid grid-cols-3 lg:px-16 relative">
            <div className="lg:col-span-2 lg:px-5 bg-white">
              <div className=" space-y-3">
                {cartData?.cartItems.map((item, i) => (
                  <CartItem key={i} item={item} showButton={true} loading={loading}/>
                ))}
              </div>
            </div>
            <div className="px-5 sticky top-0 h-[100vh] mt-5 lg:mt-0 ">
              <div className="border p-5 bg-white shadow-lg rounded-md">
                <p className="font-bold opacity-60 pb-4">PRICE DETAILS</p>
                <hr />

                <div className="space-y-3 font-semibold">
                  <div className="flex justify-between pt-3 text-black ">
                    <span>Price ({cartData?.totalItem} item)</span>
                    <span>₹ {cartData?.totalPrice}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Discount</span>
                    <span className="text-green-700">
                      -₹ {cartData?.discount}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Delivery Charges</span>
                    {cartData?.totalPrice < 1000 ? (
                      <span className="flex space-x-2 items-center">
                        <span className="opacity-50 line-through">Free </span>{" "}
                        <span className="text-green-700">40</span>
                      </span>
                    ) : (
                      <span className="flex space-x-2 items-center">
                        <span className="opacity-50 line-through">40</span>
                        <span className="text-green-700">Free </span>
                      </span>
                    )}
                  </div>
                  <hr />

                  <div className="flex justify-between font-bold text-lg">
                    <span>Total Amount</span>
                    <span className="text-green-700">₹ {totalPrice}</span>
                  </div>
                </div>

                <Button
                  onClick={() => navigate("/checkout?step=2")}
                  className="buy_btn"
                  variant="contained"
                  type="submit"
                  style={{
                    padding: ".8rem 2rem",
                    marginTop: "2rem",
                    width: "100%",
                  }}
                >
                  Check Out
                </Button>
              </div>
            </div>
          </div>
        )}
      </>
    </Helmet>
  );
};

export default Cart;
