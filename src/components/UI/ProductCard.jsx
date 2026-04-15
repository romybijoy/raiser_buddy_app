import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { addToCart } from "../../redux/slices/CartSlice";
import { fetchProductById } from "../../redux/slices/ProductSlice";
import { toggleWishlist } from "../../redux/slices/WishlistSlice";
import HeartIcon from "../common/HeartIcon";
import { toast } from "react-toastify";

const ProductCard = ({ product, wishlist }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.app);

  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    if (Array.isArray(wishlist)) {
      setIsFavorite(
        wishlist.some((item) => item.productId === product.productId),
      );
    }
  }, [wishlist, product.productId]);

  const handleToggleFavorite = () => {
    if (!currentUser?.id) {
      toast.error("Please login to add items to wishlist");
      return;
    }

    const data = {
      userId: currentUser.id,
      productId: product.productId,
    };

    dispatch(toggleWishlist(data));

    // Optimistic UI update
    setIsFavorite((prev) => !prev);

    toast(!isFavorite ? "Added to wishlist ❤️" : "Removed from wishlist ❌");
  };

  const handleAddToCart = () => {
    if (!currentUser?.id) {
      toast.error("Please login to add items to cart");
      return;
    }

    dispatch(
      addToCart({
        userId: currentUser.id,
        productId: product.productId,
      }),
    );

    toast.success("Added to cart 🛒");
    navigate("/cart");
  };

  const handleNavigate = () => {
    dispatch(fetchProductById({ productId: product.productId }));
    navigate(`/product/${product.productId}`);
  };

  return (
    <div className="relative bg-white rounded-xl shadow-md overflow-hidden">
      {/* Image */}
      <div
        className="cursor-pointer h-48 overflow-hidden rounded-t-xl"
        onClick={handleNavigate}
      >
        <motion.img
          whileHover={{ scale: 1.05 }}
          src={product?.images?.[0] || "/logo192.png"}
          alt={product.name}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "/logo192.png";
          }}
        />
      </div>

      {/* Content */}
      <div className="p-3">
        {/* Title */}
        <h3 className="font-semibold text-gray-800 truncate">{product.name}</h3>

        {/* Provider */}
        <p className="text-sm text-gray-500">
          {product?.provider?.name} (
          {product?.provider?.type === "INDIVIDUAL" ? "Farmer" : "Company"})
        </p>

        {/* Category */}
        <p className="text-xs text-gray-400">{product?.category?.name}</p>

        {/* Price */}
        <div className="flex items-center gap-2 mt-2">
          <span className="font-semibold text-lg text-gray-800">
            ₹{product.specialPrice}
          </span>
          <span className="text-sm line-through text-gray-400">
            ₹{product.price}
          </span>
          <span className="text-green-600 text-sm font-medium">
            {product.discount}% off
          </span>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between mt-3">
          {/* Wishlist */}
          {product.quantity > 0 && (
            <HeartIcon
              isFavorite={isFavorite}
              onToggle={handleToggleFavorite}
            />
          )}

          {/* Add to Cart */}
          {product.quantity > 0 && (
            <motion.button
              whileTap={{ scale: 1.1 }}
              onClick={handleAddToCart}
              className="bg-green-600 text-white px-3 py-1 rounded-lg cursor-pointer"
            >
              Add
            </motion.button>
          )}
        </div>
      </div>

      {/* Out of Stock */}
      {product.quantity === 0 && (
        <div className="absolute inset-0 bg-black/60 flex items-center justify-center z-20">
          <span className="bg-red-500 text-white px-4 py-1 rounded-md font-semibold">
            Out of Stock
          </span>
        </div>
      )}
    </div>
  );
};

export default ProductCard;
