import React, { useState, useEffect } from "react";
import { Container } from "../../styles/styles";
import Title from "../../components/common/Title";
import { useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { showCoupon } from "../../redux/slices/CouponSlice";

import CouponCard from "./CouponCard";

const Coupons = () => {
  const dispatch = useDispatch();
  const { coupons } = useSelector((state) => state.coupon);

  useEffect(() => {
    dispatch(showCoupon());
  }, [dispatch]);

  return (
    <div className="page-py-spacing">
      <Container>
        <Title titleText={"Coupons"} />
        <div className="row">
          {coupons.map((coupon, index) => (
            <CouponCard key={index} coupon={coupon} />
          ))}
        </div>
      </Container>
    </div>
  );
};

export default Coupons;
