import React, { useEffect } from "react";
import ProductCard from "./ProductCard";
import { useSelector } from "react-redux";

const ProductsList = ({ data }) => {
  const { wishlist } = useSelector((state) => state.wishlist);
  useEffect(() => {
    // Fetch wishlist status for the user
   
  }, [wishlist]);

  return (
    <>
      {data &&
        data.map((item, index) => <ProductCard product={item} wishlist={wishlist} key={index} />)}
    </>
  );
};

export default ProductsList;
