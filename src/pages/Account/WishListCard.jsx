import React from "react";
import { BaseLinkBlack } from "../../styles/button";
import { useDispatch, useSelector } from "react-redux";
import { toggleWishlist } from "../../redux/slices/WishlistSlice";
import { addToCart } from "../../redux/slices/CartSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const WishlistCard = ({ wishlist }) => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.app);
  const isOutOfStock = wishlist.quantity === 0;

  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(`/product/${wishlist.productId}`);
  };
  const handleDelete = () => {
    dispatch(
      toggleWishlist({
        userId: currentUser.id,
        productId: wishlist.productId,
      }),
    );
    toast.info("Removed from wishlist ❌");
  };

  const handleAddToCart = () => {
    if (!currentUser?.id) {
      toast.error("Please login first");
      return;
    }

    dispatch(
      addToCart({
        userId: currentUser.id,
        productId: wishlist.productId,
      }),
    );

    toast.success("Added to cart 🛒");

    // OPTIONAL: remove from wishlist
    dispatch(
      toggleWishlist({
        userId: currentUser.id,
        productId: wishlist.productId,
      }),
    );
  };

  return (
    <div className="flex gap-6 max-w-[900px] relative p-4 bg-white rounded-xl shadow-sm">
      {/* IMAGE SECTION */}
      <div
        onClick={handleNavigate}
        className="relative w-[110px] min-w-[110px] h-[110px] rounded overflow-hidden cursor-pointer"
      >
        <img
          src={wishlist.images[0]}
          alt=""
          className="w-full h-full object-cover"
        />
      </div>

      {/* INFO SECTION */}
      <div className="flex flex-1 justify-between flex-wrap gap-4">
        {/* LEFT */}
        <div className="flex flex-col gap-1">
          <p className="text-lg font-semibold text-gray-800">{wishlist.name}</p>

          <div className="text-sm text-gray-500">
            <span className="font-medium text-gray-700">Category:</span>{" "}
            {wishlist.category.name}
          </div>

          <div className="text-sm text-gray-500">
            <span className="font-medium text-gray-700">Quantity:</span>{" "}
            {wishlist.quantity}
          </div>
        </div>

        {/* RIGHT */}
        <div className="flex flex-col items-end justify-between h-full">
          {/* PRICE */}
          <span className="text-xl font-semibold text-gray-800">
            ₹{wishlist.price}
          </span>

          {/* ACTIONS */}
          <div className="flex flex-col items-end gap-2 mt-4">
            {/* ADD TO CART */}
            <button
              onClick={handleAddToCart}
              disabled={isOutOfStock}
              className={`px-4 py-1.5 rounded-lg text-sm text-white transition
      ${
        isOutOfStock
          ? "bg-gray-400 cursor-not-allowed"
          : "bg-green-600 hover:bg-green-700"
      }`}
            >
              {isOutOfStock ? "Out of Stock" : "Add to cart"}
            </button>

            {/* REMOVE */}
            <button
              onClick={handleDelete}
              className="text-xs text-gray-400 hover:text-red-500 transition"
            >
              Remove
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WishlistCard;
