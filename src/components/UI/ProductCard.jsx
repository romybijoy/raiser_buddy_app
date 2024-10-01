import React from "react";
import { motion } from "framer-motion";

import "../../styles/product-card.css";
import { Col } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart,showCart } from "../../redux/slices/CartSlice";
import { fetchProductById } from "../../redux/slices/ProductSlice";



const ProductCard = ({ item }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = () => {
    dispatch(addToCart({ productId: item.productId }));
     navigate("/cart");
  };

  const handleNavigate=()=>{
    dispatch(fetchProductById(item?.productId));
    navigate(`/product/${item?.productId}`)
  }

  return (
    <Col lg="3" md="4" className="mt-2 mb-2">
      <div className="product_item">
        <div onClick={handleNavigate} >
        <div className="product_img w-[32.2rem] h-[15rem] lg:w-[19.2rem] lg:h-[12rem]">
          <motion.img whileHover={{ scale: 0.9 }} src={item?.images[0]} alt="" className='h-full w-full object-cover object-left-top'/>
        </div>
        <div className="p-2 product_info">
          <h3 className="product_name">
            {/* <Link to={`/shop/details/${item.productId}`}></Link> */}
            {item.name}
          </h3>
          <span>{item?.category?.name}</span>
        </div>
        </div>
        <div className="product_card-bottom d-flex align-items-center justify-content-between p-2">
        <span className='flex space-x-2 items-center'>
            <p className='font-semibold'>₹{item.specialPrice}</p>
            <p className='opacity-50 line-through'>₹{item.price}</p>
            <p className='text-green-600 font-semibold'>{item.discount}% off</p>
        </span>
          {/* <span className="price"> ₹{item.price}</span> */}
          <motion.span whileTap={{ scale: 1.2 }} onClick={handleSubmit}>
          <Link to={`/cart`}> <i className="ri-add-line"></i></Link>
          </motion.span>
        </div>
      </div>
    </Col>
  );
};

export default ProductCard;
