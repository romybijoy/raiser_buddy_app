import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import CartItem from "../Cart/CartItem";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrderById } from "../../redux/slices/OrderSlice";
import AddressCard from "../../components/address/AdreessCard";
import { validateCoupon } from "../../redux/slices/CouponSlice";

const OrderSummary = () => {
  const { order } = useSelector((state) => state.order);
  const { coupon } = useSelector((state) => state.coupon);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const orderId = searchParams.get("order_id");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [couponCode, setCouponCode] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);

  // Fetch order
  useEffect(() => {
    dispatch(fetchOrderById({ orderId: Number(orderId) }));
  }, [orderId]);

  // Calculate total
  useEffect(() => {
    if (order) {
      if (order.totalPrice < 1000) {
        setTotalPrice(order.totalDiscountedPrice + 40);
      } else {
        setTotalPrice(order.totalDiscountedPrice);
      }
    }
  }, [order]);

  const handlePayment = () => {
    navigate(`/checkout?step=4&order_id=${order?.id}`);
  };

  const handleCoupon = (e) => {
    e.preventDefault();
    if (!couponCode) return;
    dispatch(validateCoupon({ code: couponCode }));
  };

  return (
    <div className="space-y-6">
      {/* ADDRESS */}
      <div className="bg-white border rounded-xl shadow-sm p-5 hover:shadow-md transition">
        <AddressCard address={order?.shippingAddress} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LEFT: ITEMS */}
        <div className="lg:col-span-2 space-y-4">
          {order?.orderItems?.map((item, index) => (
            <div
              key={index}
              className="flex gap-4 p-4 bg-white border rounded-xl shadow-sm hover:shadow-md transition"
            >
              {/* IMAGE */}
              <img
                src={item?.product?.images?.[0] || "/placeholder.png"}
                alt=""
                className="w-24 h-24 object-cover rounded-lg border"
              />

              {/* DETAILS */}
              <div className="flex flex-col justify-between">
                <div>
                  <h3 className="font-semibold text-gray-800">
                    {item.product.name}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {item.product.category?.name}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <span className="line-through text-gray-400 text-sm">
                    ₹{item.product.price}
                  </span>
                  <span className="font-semibold text-lg">₹{item.price}</span>
                  <span className="text-green-600 text-sm">
                    {item.product.discount}% off
                  </span>
                </div>

                <p className="text-xs text-gray-500">
                  Expected delivery in 2–3 days
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* RIGHT: PRICE DETAILS */}
        <div className="sticky top-24 h-fit">
          <div className="bg-white border border-gray-200 shadow-md rounded-xl p-5 space-y-4">
            <h3 className="font-semibold text-gray-700">Price Details</h3>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Price ({order?.totalItem} items)</span>
                <span>₹{order?.totalPrice}</span>
              </div>

              <div className="flex justify-between">
                <span>Discount</span>
                <span className="text-green-600">-₹{order?.discount}</span>
              </div>

              <div className="flex justify-between">
                <span>Delivery</span>
                {order?.totalPrice < 1000 ? (
                  <span>₹40</span>
                ) : (
                  <span className="text-green-600">Free</span>
                )}
              </div>
            </div>

            {/* SAVINGS */}
            <p className="text-green-600 text-sm font-medium">
              You saved ₹{order?.discount} on this order 🎉
            </p>

            {/* COUPON */}
            <div>
              <p className="text-sm font-medium mb-2">Apply Coupon</p>

              <form onSubmit={handleCoupon} className="flex gap-2 w-full">
                <input
                  type="text"
                  placeholder="Enter code"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  className="flex-1 min-w-[120px] px-3 py-2 border rounded-lg 
                 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <button
                  type="submit"
                  className="px-4 py-2 bg-gray-800 text-white rounded-lg 
                 hover:bg-black transition shrink-0"
                >
                  Apply
                </button>
              </form>
            </div>

            {/* TOTAL */}
            <div className="flex justify-between font-semibold text-lg border-t pt-3">
              <span>Total</span>
              <span className="text-green-600">
                ₹
                {coupon
                  ? totalPrice - (totalPrice * coupon.discount) / 100
                  : totalPrice}
              </span>
            </div>

            {/* CTA */}
            <button
              onClick={handlePayment}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              Place Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
