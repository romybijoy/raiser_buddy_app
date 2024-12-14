import styled from "styled-components";
import React, { useState, useEffect } from "react";
import { Container } from "../../styles/styles";
import Breadcrumb from "../../components/common/Breadcrumb";
import { UserContent, UserDashboardWrapper } from "../../styles/user";
import UserMenu from "../../components/user/UserMenu";
import Title from "../../components/common/Title";

import { useDispatch, useSelector } from "react-redux";

import WishListEmptyScreen from "./WishListEmptyScreen";
import WishlistCard from "./WishListCard";

const WishListScreenWrapper = styled.main`
  .wishlist {
    gap: 20px;
  }
`;

const breadcrumbItems = [
  { label: "Home", link: "/" },
  { label: "Wishlist", link: "/wishlist" },
];

const WishListScreen = () => {
  const { wishlist } = useSelector((state) => state.wishlist);
  console.log(wishlist) ; 
  return (
    <WishListScreenWrapper className="page-py-spacing">
      <Container>
        <Breadcrumb items={breadcrumbItems} />
        <UserDashboardWrapper>
          <UserMenu />
          <UserContent>
            <Title titleText={"Wishlist"} />
            <div className="wishlist grid">
              {wishlist?.length === 0 ? (
                <WishListEmptyScreen />
              ) : (
                wishlist?.map((wishlist) => {
                  return <WishlistCard wishlist={wishlist} />;
                })
              )}
            </div>
          </UserContent>
        </UserDashboardWrapper>
      </Container>
    </WishListScreenWrapper>
  );
};

export default WishListScreen;
