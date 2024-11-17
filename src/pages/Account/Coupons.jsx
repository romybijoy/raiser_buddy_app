import React, { useState, useEffect } from "react";
import { Container } from "../../styles/styles";
import Breadcrumb from "../../components/common/Breadcrumb";
import { UserContent, UserDashboardWrapper } from "../../styles/user";
import UserMenu from "../../components/user/UserMenu";
import Title from "../../components/common/Title";
import { useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { showCoupon } from "../../redux/slices/CouponSlice";

import CouponCard from "./CouponCard";

const breadcrumbItems = [
  { label: "Home", link: "/" },
  { label: "Coupons", link: "/coupons" },
];


const Coupons = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { coupons } = useSelector((state) => state.coupon);

  useEffect(() => {
    dispatch(showCoupon());
  }, [dispatch]);
  
 
  return (
    <div className="page-py-spacing">
      <Container>
        <Breadcrumb items={breadcrumbItems} />
        <UserDashboardWrapper>
          <UserMenu />
          <UserContent>
            <Title titleText={"Coupons"} />
            <div className="row">
              {coupons.map((coupon, index) => (
                <CouponCard key={index} coupon={coupon} />
              ))}
            </div>
          </UserContent>
        </UserDashboardWrapper>
      </Container>
    </div>
  );
};

export default Coupons;
