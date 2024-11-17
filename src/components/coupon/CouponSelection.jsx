import React, { useState } from "react";

const CouponSelection = ({ coupon, onSelect }) => {
  const [selectedCoupon, setSelectedCoupon] = useState(null);

  const handleSelect = (coupon) => {
    setSelectedCoupon(coupon);
    onSelect(coupon);
  };

  return (
    <div className="coupon-card">
      {" "}
      <h3>{coupon.title}</h3> <p>{coupon.description}</p>{" "}
      <div className="coupon-code">
        {" "}
        Code: <span>{coupon.code}</span>{" "}
      </div>{" "}
      <button onClick={() => alert(`Coupon ${coupon.code} copied!`)}>
        Copy Code
      </button>{" "}
    </div>
  );
};

export default CouponSelection;
