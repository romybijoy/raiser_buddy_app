import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import AddressCard from "../../components/address/AdreessCard";
import { createOrder } from "../../redux/slices/OrderSlice";
import { validateCoupon } from "../../redux/slices/CouponSlice";

const OrderSummary = () => {
  const { cartData } = useSelector((state) => state.cart);
  const { coupon } = useSelector((state) => state.coupon);
  const { currentUser } = useSelector((state) => state.app);

  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const address = location.state?.address;

  const [couponCode, setCouponCode] = useState("");
  const [useWallet, setUseWallet] = useState(false);

  // ❗ If no address, go back
  if (!address || !address.id) {
    return (
      <div className="text-center text-red-500">
        No address selected. Please go back.
      </div>
    );
  }

  // 🔹 Apply coupon (only validate UI)
  const handleCoupon = (e) => {
    e.preventDefault();
    if (!couponCode) return;
    dispatch(validateCoupon({ code: couponCode }));
  };

  const handlePlaceOrder = async () => {
    try {

      console.log(address)
      const res = await dispatch(createOrder({ address, couponCode, email: currentUser?.email, useWallet })).unwrap();

      console.log("Order response:", res);
      navigate(`/checkout?step=4&order_id=${res.id}&useWallet=${useWallet}`);
    } catch (err) {
      console.error("Order creation failed", err);
      alert("Something went wrong");
    }
  };

  const deliveryCharge = cartData?.totalDiscountedPrice < 1000 ? 40 : 0;

  const couponDiscount = coupon
    ? (cartData?.totalDiscountedPrice * coupon.discount) / 100
    : 0;

  const finalTotal =
    (cartData?.totalDiscountedPrice || 0) + deliveryCharge - couponDiscount;

 const walletBalance = currentUser?.walletBalance ?? 0;

const walletUsed = useWallet
  ? Math.min(walletBalance, finalTotal)
  : 0;

  const finalPayable = finalTotal - walletUsed;

  return (
    <div className="space-y-6">
      {/* ADDRESS */}
      <div className="bg-white border rounded-xl shadow-sm p-5">
        <AddressCard address={address} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* ITEMS */}
        <div className="lg:col-span-2 space-y-4">
          {cartData?.cartItems?.map((item, index) => (
            <div
              key={index}
              className="flex gap-4 p-4 bg-white border rounded-xl shadow-sm hover:shadow-md transition"
            >
              {/* IMAGE */}
              <img
                src={item?.product?.images?.[0] || "/placeholder.png"}
                alt={item?.product?.name}
                className="w-24 h-24 object-cover rounded-lg border"
              />

              {/* DETAILS */}
              <div className="flex flex-col justify-between">
                <div>
                  <h3 className="font-semibold text-gray-800">
                    {item?.product?.name}
                  </h3>

                  <p className="text-sm text-gray-500">
                    {item?.product?.category?.name}
                  </p>
                </div>

                {/* PRICE */}
                <div className="flex items-center gap-2">
                  <span className="line-through text-gray-400 text-sm">
                    ₹{item?.product?.price}
                  </span>

                  <span className="font-semibold text-lg">
                    ₹{item?.product?.specialPrice}
                  </span>

                  <span className="text-green-600 text-sm">
                    {item?.product?.discount}% off
                  </span>
                </div>

                <p className="text-sm text-gray-500">
                  ₹{item.product.specialPrice} × {item.quantity} = ₹
                  {item.product.specialPrice * item.quantity}
                </p>

                <p className="text-xs text-gray-500">
                  Expected delivery in 2–3 days
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* PRICE */}
        <div className="bg-white border shadow-md rounded-xl p-5 space-y-4">
          <h3 className="font-semibold">Price Details</h3>

          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Price ({cartData?.totalItem} items)</span>
              <span>₹{cartData?.totalPrice}</span>
            </div>

            <div className="flex justify-between">
              <span>Discount</span>
              <span className="text-green-600">-₹{cartData?.discount}</span>
            </div>

            {coupon && (
              <div className="flex justify-between">
                <span>Coupon ({coupon.discount}%)</span>
                <span className="text-green-600">-₹{couponDiscount}</span>
              </div>
            )}

            {useWallet && (
              <div className="flex justify-between">
                <span>Wallet Used</span>
                <span className="text-green-600">-₹{walletUsed}</span>
              </div>
            )}

            <div className="flex justify-between">
              <span>Delivery</span>
              {deliveryCharge > 0 ? (
                <span>₹{deliveryCharge}</span>
              ) : (
                <span className="text-green-600">Free</span>
              )}
            </div>
          </div>

          {/* COUPON */}
          <form onSubmit={handleCoupon} className="flex gap-2">
            <input
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
              placeholder="Coupon"
              className="border p-2 flex-1"
            />
            <button className="bg-black text-white px-2">Apply</button>
          </form>

          {/* WALLET */}
          <label className="flex gap-2">
            <input
              type="checkbox"
              checked={useWallet}
               disabled={!currentUser?.walletBalance}
              onChange={() => setUseWallet(!useWallet)}
            />
            Use Wallet ({" "}
            {currentUser?.walletBalance > 0
              ? `₹${currentUser?.walletBalance}`
              : "₹0 available"}
            )
          </label>

          <div className="flex justify-between font-semibold text-lg border-t pt-3">
            <span>Total</span>
            <span className="text-green-600">₹{finalPayable}</span>
          </div>

          {/* CTA */}
          <button
            onClick={handlePlaceOrder}
            className="w-full bg-green-500 text-white py-3 rounded-lg"
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
