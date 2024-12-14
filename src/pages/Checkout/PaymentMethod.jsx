import React, { useState, useEffect } from "react";
import { Button } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import CartItem from "../Cart/CartItem";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrderById, codOrder } from "../../redux/slices/OrderSlice";
import AddressCard from "../../components/address/AdreessCard";
import { Form, Row, Col, Card } from "react-bootstrap";
import { createPayment } from "../../redux/slices/PaymentSlice";

// import useRazorpay from "react-razorpay";

import { motion } from "framer-motion";
// import { createPayment } from "../../../Redux/Customers/Payment/Action";

const PaymentMethod = () => {
  const { order } = useSelector((state) => state.order);
  const { coupon } = useSelector((state) => state.coupon);
  const [orderData, setOrderData] = useState("");
  const [method, setMethod] = useState("");
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const orderId = searchParams.get("order_id");
  const dispatch = useDispatch();
  const [paymentMethod, setPaymentMethod] = useState("");
    const [totalPrice, setTotalPrice] = useState(0);

  const navigate = useNavigate();

  // const { status, data, error, isFetching } = useQuery(
  //   ["orders"],
  //   fetchOrderById(orderId),
  //   {staleTime: 6000}
  // );

  // dispatch(fetchOrderById(orderId));
  useEffect(() => {
    const input = { orderId: Number(orderId) };
    dispatch(fetchOrderById(input));
    setOrderData(order);
    if (order?.totalPrice < 1000) {
      setTotalPrice(order?.totalDiscountedPrice + 40);
    } else{
    setTotalPrice(order?.totalDiscountedPrice);
    }
  }, [dispatch]);

  // const Razorpay = useRazorpay();

  const handleRazorpayPayment = () => {
    let value = 0;
    if (coupon !== "") {
      value = totalPrice * (coupon?.discount * 0.01);
    } else {
      value = totalPrice;
    }

    const data = { orderId: orderId, amount: value };

    dispatch(createPayment(data));

    // const rzp = new Razorpay(options);
    // rzp.open();
  };

  const handleCodPayment = () => {
    alert("COD selected. Payment will be collected on delivery.");
    dispatch(codOrder({ id: orderId }));
    navigate("/home");
  };

  const handlePayment = () => {
    if (paymentMethod === "Razorpay") {
      handleRazorpayPayment();
    } else if (paymentMethod === "COD") {
      handleCodPayment();
    } else {
      alert("Please select a payment method.");
    }
  };

  return (
    <div className="space-y-5">
      <div className="lg:grid grid-cols-3 relative justify-between">
        <div className="lg:col-span-2 mt-3">
          {/* <div className=" space-y-3">
            <Form>
              <Button variant="primary" onClick={handleRazorpayPayment}>
                Pay with Razorpay
              </Button>
              <Button variant="secondary" onClick={handleCodPayment}>
                Cash on Delivery
              </Button>
            </Form>
          </div> */}

          <div className="border p-5 bg-white shadow-lg rounded-md">
            <p className="font-bold opacity-60 pb-4">Payment Options</p>

            <div className="grid grid-cols-2 gap-4">
              <motion.button
                whileTap={{ scale: 1.1 }}
                onClick={() => setPaymentMethod("Razorpay")}
                className={`p-4 border ${
                  paymentMethod === "Razorpay"
                    ? "bg-gray-300 shadow-md"
                    : "border-gray-300"
                } rounded-lg cursor-pointer`}
              >
                <h3 className="font-semibold">Pay with Razorpay</h3>
                <p>Secure payment with Razorpay</p>
              </motion.button>
              {order?.totalDiscountedPrice < 1000 && (
                <motion.button
                  whileTap={{ scale: 1.1 }}
                  onClick={() => setPaymentMethod("COD")}
                  className={`p-4 border ${
                    paymentMethod === "COD"
                      ? "bg-gray-300 shadow-md"
                      : "border-gray-300"
                  } rounded-lg cursor-pointer`}
                >
                  <h3 className="font-semibold">Cash on Delivery</h3>
                  <p>Pay when you receive the product</p>
                </motion.button>
              )}
            </div>
          </div>
        </div>

        <div className="sticky top-0 h-[100vh] mt-3 lg:mt-0 ml-5">
          <div className="border p-5 bg-white shadow-lg rounded-md">
            <p className="font-bold opacity-60 pb-4">PRICE DETAILS</p>
            <hr />

            <div className="space-y-3 font-semibold">
              <div className="flex justify-between pt-3 text-black ">
                <span>Price ({order?.totalItem} item)</span>
                <span>₹{order?.totalPrice}</span>
              </div>
              <div className="flex justify-between">
                <span>Discount</span>
                <span className="text-green-700">-₹{order?.discount}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery Charges</span>
                {order?.totalPrice < 1000 ? (
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
                <span className="text-green-700">
                  ₹{" "}
                  {coupon !== ""
                    ? totalPrice * (coupon?.discount * 0.01)
                    : totalPrice}
                </span>
              </div>
            </div>
            <hr />

            <hr />
            <Button
              onClick={handlePayment}
              variant="contained"
              type="submit"
              sx={{ padding: ".8rem 2rem", marginTop: "2rem", width: "100%" }}
            >
              Confirm Order
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentMethod;
