import React, { useEffect, useState } from "react";
import OrderCard from "./OrderCard";
import { useDispatch, useSelector } from "react-redux";
import { getOrderHistory } from "../../redux/slices/OrderSlice";

const orderStatus = [
  { label: "Pending", value: "PENDING" },
  { label: "Placed", value: "PLACED" },
  { label: "Confirmed", value: "CONFIRMED" },
  { label: "Shipped", value: "SHIPPED" },
  { label: "Delivered", value: "DELIVERED" },
  { label: "Cancelled", value: "CANCELLED" },
];

const Order = () => {
  const dispatch = useDispatch();
  const { orders } = useSelector((state) => state.order);

  const [selectedStatus, setSelectedStatus] = useState([]);

  useEffect(() => {
    dispatch(getOrderHistory());
  }, []);

  // ✅ Handle checkbox
  const handleStatusChange = (value) => {
    setSelectedStatus((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value],
    );
  };

  // ✅ Filter logic
  const filteredOrders =
    selectedStatus.length === 0
      ? orders
      : orders.filter((order) => selectedStatus.includes(order.orderStatus));

  return (
    <div className="bg-gray-50 min-h-screen px-4 lg:px-10 py-6">
      {/* MAIN LAYOUT */}
      <div className="max-w-7xl mx-auto grid grid-cols-12 gap-6">
        {/* 🔹 MIDDLE: FILTER */}
        <div className="col-span-12 md:col-span-4 lg:col-span-3">
          <div className="bg-white border rounded-xl shadow-sm p-5 sticky top-[180px]">
            <h1 className="font-bold text-lg mb-4">Filters</h1>

            <div className="space-y-4">
              <h2 className="font-semibold text-sm text-gray-700">
                ORDER STATUS
              </h2>

              {orderStatus.map((option) => (
                <div key={option.value} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={selectedStatus.includes(option.value)}
                    onChange={() => handleStatusChange(option.value)}
                    className="h-4 w-4 rounded border-gray-300 text-blue-600"
                  />

                  <label className="ml-3 text-sm text-gray-600">
                    {option.label}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 🔹 RIGHT: ORDER LIST */}
        <div className="col-span-12 md:col-span-8 lg:col-span-7 space-y-4">
          {filteredOrders?.length > 0 ? (
            filteredOrders.flatMap((order,orderIndex) =>
              order?.orderItems?.map((item, i) => (
                <OrderCard key={`${orderIndex}-${i}`} item={item} order={order} />
              )),
            )
          ) : (
            <div className="text-center text-gray-500 py-10">
              No orders found
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Order;
