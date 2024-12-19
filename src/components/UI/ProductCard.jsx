import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

import "../../styles/product-card.css";
import { Col } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, showCart } from "../../redux/slices/CartSlice";
import { fetchProductById } from "../../redux/slices/ProductSlice";
import {
  createWishlist,
  deleteWishlist,
} from "../../redux/slices/WishlistSlice";
import HeartIcon from "../common/HeartIcon";

const ProductCard = ({ product, wishlist }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isFavorite, setIsFavorite] = useState(false);
  const { currentUser } = useSelector((state) => state.app);

  useEffect(() => {
    // Fetch wishlist status for the user
    if (wishlist?.length !== 0) {
      setIsFavorite(
        wishlist?.some((data) => data.productId === product.productId)
      );
    }
  }, [dispatch, isFavorite, wishlist]);

  const handleToggleFavorite = async (isFav) => {
    console.log(isFav);
    setIsFavorite(isFav);
    try {
      if (isFav) {
        const data = { userId: currentUser.id, productId: product.productId };
        dispatch(createWishlist(data));
      } else {
        const data = { userId: currentUser.id, productId: product.productId };
        dispatch(deleteWishlist(data));
      }
      setIsFavorite(!isFavorite);
    } catch (error) {
      console.error("Error updating wishlist:", error);
    }
  };

  const handleSubmit = () => {
    dispatch(addToCart({ productId: product.productId }));
    navigate("/cart");
  };

  const handleNavigate = () => {
    dispatch(fetchProductById({ productId: product.productId }));
    navigate(`/product/${product?.productId}`);
  };

  return (
    <Col lg="3" md="4" className="mt-2 mb-2">
      <div
        className={`product_item ${
          product.quantity <= 0 ? "out-of-stock" : ""
        }`}
      >
        <div>
          <div
            className="product_img h-full w-full md:w-[10.5rem] md:h-[15rem] lg:w-[18.5rem] lg:h-[12rem]"
            onClick={handleNavigate}
          >
            <motion.img
              whileHover={{ scale: 0.9 }}
              src={product?.images[0]}
              alt=""
              className="h-full w-full object-cover object-left-top"
            />
          </div>
          <div className="d-flex align-items-center justify-content-between p-2 product_info">
            <div className="pt-1">
              <h3 className="font-semibold product_name">
                {/* <Link to={`/shop/details/${item.productId}`}></Link> */}
                {product.name}
              </h3>

              <h4>
                {product?.provider?.name} (
                {product?.provider?.type === "INDIVIDUAL"
                  ? "Farmer"
                  : "Company"}
                )
              </h4>
              <span>{product?.category?.name}</span>
            </div>
            {product?.quantity !== 0 && (
              <div className="flex">
                <HeartIcon
                  isFavorite={isFavorite}
                  onToggle={handleToggleFavorite}
                />
              </div>
            )}
          </div>
        </div>
        <div className="product_card-bottom d-flex align-items-center justify-content-between p-2">
          <span className="flex space-x-2 items-center">
            <p className="font-semibold">₹{product.specialPrice}</p>
            <p className="opacity-50 line-through">₹{product.price}</p>
            <p className="text-green-600 font-semibold">
              {product.discount}% off
            </p>
          </span>

          {product?.quantity !== 0 && (
            <motion.span whileTap={{ scale: 1.2 }} onClick={handleSubmit}>
              <Link to={`/cart`}>
                {" "}
                <i className="ri-add-line"></i>
              </Link>
            </motion.span>
          )}
        </div>
        {product?.quantity === 0 && (
          <span className="out-of-stock-text">Out of Stock</span>
        )}
      </div>
    </Col>
  );
};

export default ProductCard;
