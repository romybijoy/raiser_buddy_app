import React, { useEffect } from "react";
import ProductCard from "./ProductCard";
import { useSelector } from "react-redux";

const ProductsList = ({ data }) => {
  const { wishlist } = useSelector((state) => state.wishlist);
  useEffect(() => {
    // Fetch wishlist status for the user
   
  }, [wishlist]);

  return (
   <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {data &&
        data.map((item, index) => <ProductCard product={item} wishlist={wishlist} key={index} />)}
    </div>
  );
};

export default ProductsList;
