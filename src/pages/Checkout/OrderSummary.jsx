import React, { useState, useEffect } from "react";
import { Button } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import CartItem from "../Cart/CartItem";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrderById } from "../../redux/slices/OrderSlice";
import AddressCard from "../../components/address/AdreessCard";
import { validateCoupon } from "../../redux/slices/CouponSlice";

import TagInput from "../../components/common/TagInput";

const OrderSummary = () => {
  const { order } = useSelector((state) => state.order);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const orderId = searchParams.get("order_id");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { coupon } = useSelector((state) => state.coupon);
  const [couponCode, setCouponCode] = useState([]);

  const [totalPrice, setTotalPrice] = useState(order?.totalDiscountedPrice);
  useEffect(() => {
    const input = { orderId: Number(orderId) };
    dispatch(fetchOrderById(input));
    if (order?.totalPrice < 1000) {
      setTotalPrice(order?.totalDiscountedPrice + 40);
    }
  }, [dispatch]);

  const handlePayment = () => {
    navigate({ search: `step=4&order_id=${order?.id}` });
  };

  const handleCoupon = (e) => {
    e.preventDefault();

    dispatch(validateCoupon({ code: couponCode }));
  };
  return (
    <div className="space-y-5">
      <div className="p-5 shadow-lg rounded-md border ">
        <AddressCard address={order?.shippingAddress} />
      </div>
      <div className="lg:grid grid-cols-3 relative justify-between">
        <div className="lg:col-span-2 ">
          <div className=" space-y-3">
            {order &&
              order?.orderItems?.map((item, index) => (
                <>
                  <CartItem item={item} key={index} showButton={false} />
                </>
              ))}
          </div>
        </div>
        <div className="sticky top-0 h-[100vh] mt-5 lg:mt-0 ml-5">
          <div className="border p-5 bg-white shadow-lg rounded-md">
            <p className="font-bold opacity-60 pb-4">PRICE DETAILS</p>
            <hr />

            <div className="space-y-3 font-semibold">
              <div className="flex justify-between pt-3 text-black ">
                <span>Price ({order && order?.totalItem} item)</span>
                <span>₹{order && order?.totalPrice}</span>
              </div>
              <div className="flex justify-between">
                <span>Discount</span>
                <span className="text-green-700">
                  -₹{order && order?.discount}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Delivery Charges</span>
                {order?.totalPrice < 1000 ? (
                  <span className="flex space-x-2 items-center">
                    <span className="opacity-50 line-through">Free </span>{" "}
                    <span className="text-green-700">40</span>
                  </span>
                ) : (
                  <span className="opacity-50">Free </span>
                )}
              </div>

              <hr />
              <p className="font-bold opacity-60 pb-2">Have a Coupon?</p>

              <form className="flex">
                {/* <input
                  style={{
                    height: "100%",
                    border: "2px solid black",
                    width: "150px",
                    padding: "6px",
                    marginRight: "1px",
                  }}
                  placeholder="APPLY10"
                  value={couponCode}
                  onChange={({ target }) => {
                    setCouponCode(target.value);
                  }}
                /> */}
                <TagInput
                  tags={couponCode}
                  setTags={setCouponCode}
                  inputFieldPosition="bottom"
                />

                <span className="buy_btn mx-1" onClick={handleCoupon}>
                  Apply
                </span>
              </form>
              <hr />
              <div className="flex justify-between font-bold text-lg">
                <span>Total Amount</span>
                <span className="text-green-700">
                  {" "}
                  ₹{" "}
                  {coupon !== ""
                    ? totalPrice * coupon?.discount * 0.01
                    : totalPrice}
                </span>
              </div>
            </div>

            <hr />
            <Button
              onClick={handlePayment}
              variant="contained"
              type="submit"
              sx={{ padding: ".8rem 2rem", marginTop: "2rem", width: "100%" }}
            >
              Place Order
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
