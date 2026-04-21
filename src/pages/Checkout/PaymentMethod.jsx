import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrderById, codOrder } from "../../redux/slices/OrderSlice";
import { createPayment } from "../../redux/slices/PaymentSlice";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

const PaymentMethod = () => {
  const { order } = useSelector((state) => state.order);
  const [loaded, setLoaded] = useState(false);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const orderId = searchParams.get("order_id");
  const useWallet = searchParams.get("useWallet") === "true";

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [paymentMethod, setPaymentMethod] = useState("");
  const [loading, setLoading] = useState(false);

  // ✅ ONLY fetch order (correct)
  useEffect(() => {
    if (orderId) {
      dispatch(fetchOrderById({ orderId: Number(orderId) }));
    }
  }, [dispatch, orderId]);

  useEffect(() => {
  if (order) setLoaded(true);
}, [order]);
  useEffect(() => {
   if (
    order &&
    order.id &&
    order.finalPayableAmount === 0
  )  {
     handleRazorpayPayment(); 
  }
}, [order]);

  // ✅ Razorpay
  const handleRazorpayPayment = async () => {
    if (loading) return;
    setLoading(true);

    try {
      const res = await dispatch(
        createPayment({ orderId: orderId, useWallet })
      ).unwrap();

      console.log("Payment response:", res);

      // ✅ Wallet-only case
      if (res.paymentLinkId === "WALLET_SUCCESS") {
        toast.success("Order placed using wallet");
        navigate(`/payment/${orderId}`);
        return;
      }

      const url = res.paymentLinkUrl || res.short_url;

      if (!url) {
        throw new Error("Invalid payment link");
      }

      // ✅ Redirect to Razorpay
      window.location.href = url;

    } catch (err) {
      console.error(err);
      toast.error("Payment failed");
      setLoading(false);
    }
  };

  // ✅ COD
  const handleCodPayment = async () => {
    try {
      await dispatch(codOrder({ id: orderId, useWallet })).unwrap();

      toast.success("Order placed with COD");
      navigate(`/payment/${orderId}`);
    } catch (err) {
      toast.error("COD failed");
    }
  };

  // ✅ Handle selection
  const handlePayment = () => {
    
    if (paymentMethod === "Razorpay") {
      handleRazorpayPayment();
    } else if (paymentMethod === "COD") {
      handleCodPayment();
    } else {
      alert("Please select a payment method.");
    }
  };

  if (!order) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-5">
      <div className="lg:grid grid-cols-3 gap-5">

        {/* LEFT SIDE */}
        <div className="lg:col-span-2 mt-3">
          <div className="border p-5 bg-white shadow-lg rounded-md">
            <p className="font-bold opacity-60 pb-4">Payment Options</p>

            <div className="grid grid-cols-2 gap-4">

              {/* Razorpay */}
              <motion.button
                whileTap={{ scale: 1.05 }}
                onClick={() => setPaymentMethod("Razorpay")}
                className={`p-4 border ${
                  paymentMethod === "Razorpay"
                    ? "bg-gray-200 shadow-md"
                    : "border-gray-300"
                } rounded-lg`}
              >
                <h3 className="font-semibold">Pay with Razorpay</h3>
                <p>Secure payment</p>
              </motion.button>

              {/* COD */}
              {order?.finalPayableAmount < 1000 && (
                <motion.button
                  whileTap={{ scale: 1.05 }}
                  onClick={() => setPaymentMethod("COD")}
                  className={`p-4 border ${
                    paymentMethod === "COD"
                      ? "bg-gray-200 shadow-md"
                      : "border-gray-300"
                  } rounded-lg`}
                >
                  <h3 className="font-semibold">Cash on Delivery</h3>
                  <p>Pay on delivery</p>
                </motion.button>
              )}

            </div>
          </div>
        </div>

        {/* RIGHT SIDE (PRICE) */}
        <div className="mt-3">
          <div className="border p-5 bg-white shadow-lg rounded-md">
            <p className="font-bold opacity-60 pb-4">PRICE DETAILS</p>
            <hr />

            <div className="space-y-3 font-semibold mt-3">
              <div className="flex justify-between">
                <span>Price ({order?.totalItem} items)</span>
                <span>₹{order?.totalPrice}</span>
              </div>

              <div className="flex justify-between">
                <span>Discount</span>
                <span className="text-green-700">-₹{order?.discount}</span>
              </div>

              {order?.couponDiscount > 0 && (
                <div className="flex justify-between">
                  <span>Coupon</span>
                  <span className="text-green-700">
                    -₹{order?.couponDiscount}
                  </span>
                </div>
              )}

              {order?.walletUsedAmount > 0 && (
                <div className="flex justify-between">
                  <span>Wallet Used</span>
                  <span className="text-green-700">
                    -₹{order?.walletUsedAmount}
                  </span>
                </div>
              )}

              <div className="flex justify-between">
                <span>Delivery</span>
                {order?.deliveryCharge > 0 ? (
                  <span>₹{order.deliveryCharge}</span>
                ) : (
                  <span className="text-green-600">Free</span>
                )}
              </div>

              <hr />

              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span className="text-green-700">
                  ₹{order?.finalPayableAmount}
                </span>
              </div>
            </div>

            <button
              disabled={loading}
              onClick={handlePayment}
              className="w-full bg-green-500 text-white py-3 rounded-lg mt-4 disabled:opacity-50"
            >
              {loading ? "Processing..." : "Confirm Order"}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default PaymentMethod;