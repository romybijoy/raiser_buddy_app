import React, { useState, useRef, useEffect } from "react";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/CommonSection";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import ProductReviewCard from "./ProductReviewCard";
import "../styles/product-details.css";

import ProductsList from "../components/UI/ProductsList";
import { fetchProductById, showProduct } from "../redux/slices/ProductSlice";
import { showReviews } from "../redux/slices/ReviewSlice";
import { addToCart } from "../redux/slices/CartSlice";
import ZoomImage from "../components/common/ZoomImage";

const ProductDetails = () => {
  const [tab, setTab] = useState("desc");
  const reviewUser = useRef("");
  const reviewMsg = useRef("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { productId } = useParams();

  const { product, products } = useSelector((state) => state.product);
  const { reviews } = useSelector((state) => state.review);

  const [activeImage, setActiveImage] = useState("");

  useEffect(() => {
    const input = { productId: Number(productId) };
    dispatch(fetchProductById(input));
    dispatch(showProduct());
    dispatch(showReviews(input));
  }, [productId]);

  const relatedProducts = products.filter(
    (item) => item?.category?.categoryId === product?.category?.categoryId,
  );

  const handleSetActiveImage = (image) => {
    setActiveImage(image);
  };

  const handleSubmit = () => {
    dispatch(addToCart({ productId }));
    navigate("/cart");
  };

  const ratingCounts = {
    5: 0,
    4: 0,
    3: 0,
    2: 0,
    1: 0,
  };

  reviews.forEach((review) => {
    const r = Math.round(review.rating);
    if (ratingCounts[r] !== undefined) {
      ratingCounts[r]++;
    }
  });

  const totalReviews = reviews.length;
  // ⭐ Custom Star Rating (Tailwind)
  const StarRating = ({ value = 0 }) => {
    return (
      <div className="flex items-center gap-1 text-yellow-400">
        {[1, 2, 3, 4, 5].map((star) => (
          <span key={star}>
            {value >= star ? "★" : value >= star - 0.5 ? "☆" : "☆"}
          </span>
        ))}
      </div>
    );
  };

  return (
    <Helmet title={product?.name}>
      <CommonSection title="Product Details" subtitle={product?.name} />

      {/* TOP SECTION */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-10 px-4 pt-10">
        {/* IMAGE SECTION */}
        <div className="flex flex-col items-center shadow-md p-4 rounded-lg">
          <div className="rounded-lg max-w-[30rem] max-h-[35rem]">
            <ZoomImage
              image={activeImage || (product ? product?.images[0] : "")}
            />
          </div>

          <div className="flex flex-wrap gap-3 justify-center mt-4">
            {product?.images?.map((image, i) => (
              <div
                key={i}
                onClick={() => handleSetActiveImage(image)}
                className="w-16 h-16 rounded-lg overflow-hidden cursor-pointer border hover:scale-105 transition"
              >
                <img
                  src={image}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* DETAILS SECTION */}
        <div className="p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-xl font-bold text-gray-800">{product?.name}</h2>

          {/* Rating */}
          <div className="flex items-center gap-2 mt-2">
            <div className="text-yellow-400 text-lg">
              <StarRating value={product?.avgRating || 0} />
            </div>
            <p className="text-gray-500 text-sm">({reviews.length} ratings)</p>
          </div>

          {/* Category & Description */}
          <div className="mt-4">
            {product?.category?.name && (
              <h1 className="text-lg font-semibold text-gray-900">
                {product.category.name} Category
              </h1>
            )}
            {product?.shortDesc && (
              <p className="text-gray-700 mt-2">{product.shortDesc}</p>
            )}
          </div>

          {/* Price */}
          <div className="mt-6 flex items-center gap-3 text-lg font-medium">
            <p className="text-green-600 font-bold text-xl">
              ₹{product.specialPrice}
            </p>

            <p className="line-through text-gray-400 text-sm">
              ₹{product.price}
            </p>

            <p className="text-green-600 text-sm font-semibold">
              {product.discount}% Off
            </p>
          </div>

          {/* Stock */}
          <div className="mt-4">
            {product?.quantity > 0 ? (
              <p className="mt-4 font-semibold text-orange-600">
                Only {product.quantity} Kg left
              </p>
            ) : (
              <p className="text-red-600 font-bold">Out Of Stock</p>
            )}
          </div>

          {/* Provider Info */}
          {product?.provider && (
            <div className="mt-6">
              <h3 className="font-semibold text-gray-800 mb-1">
                Provider Contact Info
              </h3>

              <div className="mt-3 space-y-1 text-gray-600 text-sm">
                <p>{product?.provider?.name}</p>
                <p>{product?.provider?.mobile_number}</p>
                <p>{product?.provider?.email}</p>
              </div>
            </div>
          )}

          {/* Button */}
          <div className="border-t mt-3 pt-3">
            <motion.button
              whileTap={{ scale: 1.1 }}
              className="mt-3 px-6 py-2.5 bg-blue-600 text-white rounded-lg 
           font-semibold hover:bg-blue-700 transition"
              onClick={handleSubmit}
              disabled={product?.quantity === 0}
            >
              Add to Cart
            </motion.button>
          </div>
        </div>
      </section>

      {/* TAB SECTION */}
      <section className="px-4 lg:px-10 py-10">
        <div className="max-w-7xl mx-auto">
          {/* Tabs */}
          <div className="flex gap-6 border-b pb-3">
            <h6
              className={`cursor-pointer ${
                tab === "desc" ? "text-blue-600 font-semibold" : "text-gray-500"
              }`}
              onClick={() => setTab("desc")}
            >
              Description
            </h6>

            <h6
              className={`cursor-pointer ${
                tab === "rev" ? "text-blue-600 font-semibold" : "text-gray-500"
              }`}
              onClick={() => setTab("rev")}
            >
              Reviews ({reviews?.length})
            </h6>
          </div>

          {/* Description */}
          {tab === "desc" ? (
            <div className="mt-5">
              <h3 className="font-bold pb-2">Description</h3>
              <p>{product?.desc}</p>
            </div>
          ) : (
            <div className="mt-5 grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Reviews */}
              <div className="max-h-[400px] overflow-y-auto space-y-4 pr-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                {product?.reviews?.length ? (
                  product.reviews.map((item, i) => (
                    <ProductReviewCard key={i} item={item} />
                  ))
                ) : (
                  <h2>No reviews yet!</h2>
                )}
              </div>

              {/* Ratings Summary */}
              <div>
                <h1 className="text-lg font-semibold">Product Ratings</h1>

                <div className="flex items-center gap-3 mt-2">
                  <StarRating value={product?.avgRating || 0} />
                  <p className="text-gray-500">{reviews.length} Ratings</p>
                </div>

                {/* Progress Bars */}
                {[
                  { label: "Excellent", star: 5 },
                  { label: "Very Good", star: 4 },
                  { label: "Good", star: 3 },
                  { label: "Average", star: 2 },
                  { label: "Poor", star: 1 },
                ].map((item, i) => {
                  const count = ratingCounts[item.star];
                  const percent =
                    totalReviews > 0 ? (count / totalReviews) * 100 : 0;

                  return (
                    <div key={i} className="flex items-center gap-3 mt-4">
                      <p className="w-24">{item.label}</p>

                      <div className="flex-1 h-2 bg-gray-200 rounded">
                        <div
                          className="h-2 bg-green-500 rounded transition-all"
                          style={{ width: `${percent}%` }}
                        />
                      </div>

                      <p className="text-gray-400 text-xs">
                        {Math.round(percent)}%
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Related */}
          <div className="mt-10">
            <h2 className="text-xl font-semibold mb-4">You might also like</h2>
            <ProductsList data={relatedProducts} />
          </div>
        </div>
      </section>
    </Helmet>
  );
};

export default ProductDetails;
