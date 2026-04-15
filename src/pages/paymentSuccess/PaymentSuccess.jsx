import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updatePayment } from "../../redux/slices/PaymentSlice";
import { useParams } from "react-router-dom";
import { fetchOrderById } from "../../redux/slices/OrderSlice";
import OrderTraker from "../orders/OrderTraker";
import AddressCard from "../../components/address/AdreessCard";

const PaymentSuccess = () => {
  const [paymentId, setPaymentId] = useState("");
  const [paymentStatus, setPaymentStatus] = useState("");

  const { orderId } = useParams();
  const dispatch = useDispatch();
  const { order } = useSelector((store) => store.order);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setPaymentId(params.get("razorpay_payment_id"));
    setPaymentStatus(params.get("razorpay_payment_link_status"));
  }, []);

  useEffect(() => {
    if (paymentId && paymentStatus === "paid") {
      dispatch(updatePayment({ orderId, paymentId }));
      dispatch(fetchOrderById({ orderId }));
    }
  }, [orderId, paymentId]);

  return (
    <div className="bg-gray-50 min-h-screen px-4 lg:px-20 py-8 space-y-6">

      {/* ✅ SUCCESS MESSAGE */}
      <div className="flex flex-col items-center justify-center text-center bg-white border rounded-xl shadow-sm p-6">
        <div className="w-16 h-16 flex items-center justify-center rounded-full bg-green-100 text-green-600 text-2xl">
          ✔
        </div>

        <h2 className="text-xl font-semibold mt-3">
          Payment Successful
        </h2>

        <p className="text-gray-500 mt-1">
          Your order has been placed successfully 🎉
        </p>
      </div>

      {/* ✅ ORDER TRACKER */}
      <div className="bg-white border rounded-xl shadow-sm p-5">
        <OrderTraker activeStep={1} />
      </div>

      {/* ✅ ADDRESS (ONLY ONCE) */}
      <div className="bg-white border rounded-xl shadow-sm p-5">
        <h3 className="font-semibold mb-3">Delivery Address</h3>
        <AddressCard address={order?.shippingAddress} />
      </div>

      {/* ✅ ORDER ITEMS */}
      <div className="space-y-4">
        {order?.orderItems?.map((item, index) => (
          <div
            key={index}
            className="flex flex-col md:flex-row justify-between items-center gap-4 bg-white border rounded-xl shadow-sm p-4 hover:shadow-md transition"
          >

            {/* LEFT: PRODUCT */}
            <div className="flex items-center gap-4 w-full md:w-2/3">
              <img
                src={item?.product?.images?.[0] || "/placeholder.png"}
                alt=""
                className="w-20 h-20 object-cover rounded-lg border"
              />

              <div className="space-y-1">
                <p className="font-medium">{item.product.name}</p>
                <p className="text-sm text-gray-500">
                  Category: {item.product.category?.name}
                </p>
                <p className="font-semibold text-green-600">
                  ₹{item.price}
                </p>
              </div>
            </div>

            {/* RIGHT: STATUS */}
            <div className="text-green-600 font-medium">
              Order Confirmed
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};

export default PaymentSuccess;