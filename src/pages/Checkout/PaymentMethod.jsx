import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrderById, codOrder } from "../../redux/slices/OrderSlice";
import { createPayment } from "../../redux/slices/PaymentSlice";
import { toast } from "react-toastify";

import { motion } from "framer-motion";

const PaymentMethod = () => {
  const { order } = useSelector((state) => state.order);
  const { coupon } = useSelector((state) => state.coupon);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const orderId = searchParams.get("order_id");
  const dispatch = useDispatch();
  const [paymentMethod, setPaymentMethod] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchOrderById({ orderId: Number(orderId) }));
  }, [dispatch, orderId]);

  const handleRazorpayPayment = () => {
    const data = { orderId: orderId, amount: finalTotal };
    dispatch(createPayment(data));
  };

  const handleCodPayment = () => {
    toast.info("COD selected. Payment will be collected on delivery.");
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

  // Delivery charge
  const deliveryCharge = order?.totalPrice < 1000 ? 40 : 0;

  // Coupon discount (only on discounted price)
  const couponDiscount =
    coupon && order?.totalDiscountedPrice
      ? Math.round((order.totalDiscountedPrice * coupon.discount) / 100)
      : 0;

  const finalTotal = order?.totalDiscountedPrice
    ? Math.round(order.totalDiscountedPrice + deliveryCharge - couponDiscount)
    : 0;

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
              {order?.totalPrice < 1000 && (
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

              {coupon && (
                <div className="flex justify-between">
                  <span>Coupon ({coupon.discount}%)</span>
                  <span className="text-green-700">-₹{couponDiscount}</span>
                </div>
              )}
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
                <span className="text-green-700">₹{finalTotal}</span>
              </div>
            </div>
            <hr />

            <hr />
            <button
              onClick={handlePayment}
              className="w-full bg-green-500 text-white py-3 rounded-lg font-medium hover:bg-green-600 mt-4"
            >
              Confirm Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentMethod;
