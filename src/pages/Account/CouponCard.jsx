import React from "react";

import "../../styles/coupon.css";
const CouponCard = ({ coupon }) => {
  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(coupon.code)
      .then(() => {
        alert(`Coupon ${coupon.code} copied to clipboard!`);
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  };
  return (
    <div className="coupon-card">
      {" "}
      <h3>{coupon.title}</h3> <p>{coupon.desc}</p>{" "}
      <div className="coupon-code">
        {" "}
        Code: <span>{coupon.code}</span>{" "}
      </div>{" "}
      <button onClick={copyToClipboard}>Copy Code</button>{" "}
    </div>
  );
};
export default CouponCard;
