import React, { useState, useEffect } from "react";
import OrderTraker from "./OrderTraker";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import AddressCard from "../../components/address/AdreessCard";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrderById, cancelOrder } from "../../redux/slices/OrderSlice";
import { toast } from "react-toastify";
import InvoiceDownload from "./InvoiceDownload";

const OrderDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { orderId } = useParams();
  const location = useLocation();
  const { order } = useSelector((state) => state.order);

  const [orderData, setOrderData] = useState(null);

  useEffect(() => {
    dispatch(fetchOrderById({ orderId: Number(orderId) }));
    navigate(location.pathname, { replace: true });
  }, [dispatch, orderId]);

  useEffect(() => {
    if (order) setOrderData(order);
  }, [order]);

  const handleCancelOrder = () => {
    const data = { orderId: Number(orderId), userId: order.user.id };

    try {
      dispatch(cancelOrder(data));
      toast.success("Order Cancelled Successfully");
      navigate("/account/order");
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen px-4 lg:px-20 py-6 space-y-6">
      {/* DELIVERY ADDRESS */}
      <div className="bg-white rounded-xl shadow-sm border p-5">
        <h2 className="text-lg font-semibold mb-3">Delivery Address</h2>
        <AddressCard address={order?.shippingAddress} />
      </div>

      {/* ORDER TRACKER */}
      <div className="bg-white rounded-xl shadow-sm border p-5 flex flex-col lg:flex-row justify-between items-center gap-4">
        <div className="w-full lg:w-3/4">
          <OrderTraker orderStatus={order?.orderStatus} />
        </div>

        <div>
          {order?.orderStatus === "DELIVERED" ? (
            <button className="text-red-600 font-medium hover:underline">
              RETURN
            </button>
          ) : (
            <button
              onClick={handleCancelOrder}
              className="text-purple-600 font-medium hover:underline"
            >
              Cancel Order
            </button>
          )}
        </div>
      </div>

      {/* ORDER ITEMS */}
      <div className="space-y-4">
        {order?.orderItems?.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-sm border p-4 flex flex-col md:flex-row justify-between items-center gap-4"
          >
            {/* LEFT: PRODUCT */}
            <div className="flex items-center gap-4 w-full md:w-2/3">
              <img
                className="w-20 h-20 object-cover rounded-lg border"
                src={item?.product?.images[0]}
                alt=""
              />

              <div className="space-y-1">
                <p className="font-medium">{item.product.name}</p>
                <p className="text-sm text-gray-500">{item.product.desc}</p>
                <p className="font-semibold text-green-600">₹{item.price}</p>
              </div>
            </div>

            {/* RIGHT: REVIEW */}
            <div
              onClick={() =>
                navigate(`/account/review/${item.product.productId}`, {
                  state: { productId: item.product.productId },
                })
              }
              className="flex items-center gap-2 text-purple-600 cursor-pointer hover:underline"
            >
              ⭐<span className="text-sm font-medium">Rate & Review</span>
            </div>
          </div>
        ))}
      </div>

      {/* INVOICE */}
      <div className="bg-white rounded-xl shadow-sm border p-5">
        <InvoiceDownload />
      </div>
    </div>
  );
};

export default OrderDetails;
