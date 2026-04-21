import React from "react";
import AddDeliveryAddressForm from "./AddAddress";
import { useLocation, useNavigate } from "react-router-dom";
import OrderSummary from "./OrderSummary";
import PaymentMethod from "./PaymentMethod";

const steps = ["Login", "Delivery Address", "Order Summary", "Payment"];

export default function Checkout() {
  const location = useLocation();
  const navigate = useNavigate();

  const queryParams = new URLSearchParams(location.search);
  const step = Number(queryParams.get("step")) || 1;
  const orderId = queryParams.get("order_id");

  // 🔹 Safe Back Navigation
  const handleBack = () => {
    if (step <= 1) return;

    if (step === 2) {
      navigate("/cart");
    } else {
      navigate(`/checkout?step=${step - 1}&order_id=${orderId}`);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen px-4 lg:px-20 py-6">

      {/* 🔹 STEPPER */}
      <div className="max-w-5xl mx-auto mb-6">
        <div className="flex items-center justify-between">
          {steps.map((label, index) => {
            const stepNumber = index + 1;
            const isActive = step === stepNumber;
            const isCompleted = step > stepNumber;

            return (
              <div key={index} className="flex-1 flex items-center">

                {/* Circle */}
                <div
                  className={`w-8 h-8 flex items-center justify-center rounded-full text-sm font-semibold
                    ${
                      isCompleted
                        ? "bg-green-500 text-white"
                        : isActive
                        ? "bg-blue-600 text-white"
                        : "bg-gray-300 text-gray-600"
                    }`}
                >
                  {isCompleted ? "✓" : stepNumber}
                </div>

                {/* Label */}
                <p
                  className={`ml-2 text-sm font-medium hidden sm:block
                    ${
                      isActive
                        ? "text-blue-600"
                        : isCompleted
                        ? "text-green-600"
                        : "text-gray-500"
                    }`}
                >
                  {label}
                </p>

                {/* Line */}
                {index !== steps.length - 1 && (
                  <div className="flex-1 h-[2px] bg-gray-300 mx-2"></div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* 🔹 BACK BUTTON */}
      <div className="max-w-5xl mx-auto flex justify-between mb-4">
        <button
          onClick={handleBack}
          disabled={step === 1}
          className="text-gray-600 hover:text-black disabled:opacity-50"
        >
          ← Back
        </button>
      </div>

      {/* 🔹 CONTENT */}
      <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-sm border p-5">

        {/* STEP 2 → ADDRESS */}
        {step === 2 && (
          <AddDeliveryAddressForm />
        )}

        {/* STEP 3 → ORDER SUMMARY */}
        {step === 3 && (
          <OrderSummary />
        )}

        {/* STEP 4 → PAYMENT */}
        {step === 4 && orderId && (
          <PaymentMethod />
        )}

       
      </div>
    </div>
  );
}