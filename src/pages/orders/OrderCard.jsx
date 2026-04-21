import React from "react";
import { useNavigate } from "react-router-dom";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import AdjustIcon from "@mui/icons-material/Adjust";
import StarIcon from "@mui/icons-material/Star";

const OrderCard = ({ item, order }) => {
  const navigate = useNavigate();

  // Format Date
  const formatDate = (date) => {
    if (!date) return "";
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
    });
  };

  // Status Colors
  const statusColor = {
    PENDING: "bg-yellow-100 text-yellow-700",
    PLACED: "bg-blue-100 text-blue-700",
    CONFIRMED: "bg-indigo-100 text-indigo-700",
    SHIPPED: "bg-purple-100 text-purple-700",
    DELIVERED: "bg-green-100 text-green-700",
    CANCELLED: "bg-red-100 text-red-700",
  };

  // Navigation
  const handleNavigate = () => {
    console.log("Order clicked:", order);

    if (!order?.id) {
      console.error("Order ID missing");
      return;
    }

    if (order.orderStatus === "PENDING") {
      navigate(`/checkout?step=4&order_id=${order.id}`);
    } else {
      navigate(`/account/order/${order.id}`);
    }
  };
  return (
    <div className="p-5 bg-white border rounded-xl shadow-sm hover:shadow-md transition">
      {/* ORDER ID */}
      <p className="text-xs text-gray-500 mb-3 font-medium">
        ORDER ID - {order?.orderId}
      </p>

      <div className="flex justify-between items-start flex-wrap gap-4">
        {/* 🔹 LEFT: PRODUCT */}
        <div
          onClick={handleNavigate}
          className="flex gap-4 cursor-pointer w-full md:w-[40%]"
        >
          <img
            src={item?.product?.images?.[0] || "/placeholder.png"}
            alt=""
            className="w-20 h-20 object-cover rounded-lg border"
          />

          <div>
            <p className="font-semibold text-gray-800">{item?.product?.name}</p>
            <p className="text-sm text-gray-500">
              {item?.product?.category?.name}
            </p>
          </div>
        </div>

        {/* 🔹 PRICE */}
        <div className="w-full md:w-[10%] font-medium text-gray-800">
          ₹{item?.price}
        </div>

        {/* 🔹 STATUS BADGE */}
        <div className="w-full md:w-[15%]">
          <span
            className={`px-2 py-1 text-xs rounded-full font-medium ${
              statusColor[order?.orderStatus] || "bg-gray-100 text-gray-600"
            }`}
          >
            {order?.orderStatus}
          </span>
        </div>

        {/* 🔹 DELIVERY INFO */}
        <div className="w-full md:w-[30%] space-y-2">
          {order?.orderStatus === "DELIVERED" ? (
            <div className="flex items-center text-green-600 text-sm font-medium">
              <FiberManualRecordIcon
                sx={{ width: 12, height: 12 }}
                className="mr-2"
              />
              Delivered On {formatDate(order?.deliveryDate)}
            </div>
          ) : (
            <div className="flex items-center text-blue-600 text-sm font-medium">
              <AdjustIcon sx={{ width: 12, height: 12 }} className="mr-2" />
              Expected Delivery On {formatDate(order?.deliveryDate)}
            </div>
          )}

          {order?.orderStatus === "DELIVERED" && (
            <p className="text-xs text-gray-500">
              Your item has been delivered
            </p>
          )}

          {/* ⭐ REVIEW */}
          {order?.orderStatus === "DELIVERED" && (
            <div
              onClick={() =>
                navigate(`/account/review/${item.product.productId}`, {
                  state: { productId: item.product.productId },
                })
              }
              className="flex items-center text-blue-600 cursor-pointer text-sm hover:underline"
            >
              <StarIcon sx={{ fontSize: "18px" }} className="mr-1" />
              Rate & Review Product
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderCard;
