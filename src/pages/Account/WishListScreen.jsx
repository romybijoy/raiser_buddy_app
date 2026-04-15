import styled from "styled-components";
import React, { useState, useEffect } from "react";
import { Container } from "../../styles/styles";
import Title from "../../components/common/Title";

import { useSelector } from "react-redux";

import WishListEmptyScreen from "./WishListEmptyScreen";
import WishlistCard from "./WishListCard";

const WishListScreenWrapper = styled.main`
  .wishlist {
    gap: 20px;
  }
`;



const WishListScreen = () => {
  const { wishlist } = useSelector((state) => state.wishlist);
  return (
    <WishListScreenWrapper className="page-py-spacing">
      <Container>
            <Title titleText={"Wishlist"} />
            <div className="wishlist grid">
              {wishlist?.length === 0 ? (
                <WishListEmptyScreen />
              ) : (
                wishlist?.map((wishlist) => {
                  return <WishlistCard key={wishlist.productId} wishlist={wishlist} />;
                })
              )}
            </div>
      </Container>
    </WishListScreenWrapper>
  );
};

export default WishListScreen;
