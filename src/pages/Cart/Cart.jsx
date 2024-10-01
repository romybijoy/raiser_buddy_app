import React, { useState, useEffect } from "react";
import CartItem from "./CartItem";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { showCart } from "../../redux/slices/CartSlice";
import { updateCartItem } from "../../redux/slices/CartSlice";

const Cart = () => {
  const { cartData, loading } = useSelector((state) => state.cart);
  const [cart, setCart] = useState("");
  const [coupon, setCoupon] = useState("");
  const [totalPrice, setTotalPrice] = useState(cartData?.totalDiscountedPrice)

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(showCart());
    setCart(cartData);

    console.log(cartData);
  }, [dispatch]);

  console.log("cart ", cartData);

  //  console.log(dispatch(showCart()))

  const handleCoupon = () => {
    let data;
    if (coupon === "APPLY10") {
      
        setTotalPrice(cartData?.totalDiscountedPrice * 0.1)
     
    }
    
  };

  return (
    <>
      {cartData && (
        <div className="lg:grid grid-cols-3 lg:px-16 relative">
          <div className="lg:col-span-2 lg:px-5 bg-white">
            <div className=" space-y-3">
              {cartData?.cartItems.map((item, i) => (
                <CartItem key={i} item={item} showButton={true} />
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
                  <span className="text-green-700">Free</span>
                </div>
                <hr />

                <p className="font-bold opacity-60 pb-2">Have a Coupon?</p>

                <form>
                  <input
                  style={{height: "100%", border:"2px solid black", padding:"6px"}}
                    placeholder="APPLY10"
                    value={coupon}
                    onChange={({ target }) => {
                      setCoupon(target.value);
                    }}
                  />

                  <span className="buy_btn mx-1" onClick={handleCoupon}>
                    Apply
                  </span>
                </form>
                <hr />

                <div className="flex justify-between font-bold text-lg">
                  <span>Total Amount</span>
                  <span className="text-green-700">
                    ₹ {totalPrice}
                  </span>
                </div>
              </div>

              <Button
                //onClick={() => navigate("/checkout?step=2")}
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
  );
};

export default Cart;
