import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createReview,
  createRating,
  showRating,
} from "../../redux/slices/ReviewSlice";
import { useLocation, useNavigate } from "react-router-dom";
import { fetchProductById } from "../../redux/slices/ProductSlice";
import { toast } from "react-toastify";

const RateProduct = () => {
  const [formData, setFormData] = useState({ title: "", description: "" });
  const [rating, setRating] = useState(0);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { productId } = location.state || {};
  const { product } = useSelector((state) => state.product);

  useEffect(() => {
    if (productId) {
      dispatch(fetchProductById({ productId: Number(productId) }));
      dispatch(showRating(productId));
    }
  }, [productId]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.title.trim() || !rating) {
      toast.error("Please add rating and review");
      return;
    }

    dispatch(
      createReview({
        review: formData.title,
        productId,
        rating,
      }),
    );

    dispatch(createRating({ rating, productId }));

    toast.success("Review added successfully");
    navigate(`/product/${productId}`);
  };

  return (
    <div className="bg-gray-50 min-h-screen px-4 lg:px-20 py-8">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* HEADER */}
        <h1 className="text-xl font-semibold bg-white p-4 rounded-xl shadow-sm border">
          Rate & Review Product
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* LEFT: PRODUCT */}
          <div className="bg-white border rounded-xl shadow-sm p-5 flex gap-4">
            <img
              src={product?.images?.[0] || "/placeholder.png"}
              alt=""
              className="w-24 h-24 lg:w-40 lg:h-40 object-cover rounded-lg border"
            />

            <div className="space-y-2">
              <h2 className="font-semibold text-lg">{product?.name}</h2>
              <p className="text-gray-500 text-sm">{product?.desc}</p>
              <p className="font-semibold">₹{product?.price}</p>

              {/* Existing Rating */}
              <div className="flex items-center gap-1 text-yellow-400">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span key={star}>
                    {product?.avgRating >= star ? "★" : "☆"}
                  </span>
                ))}
              </div>

              <p className="text-sm text-green-600">Delivered successfully</p>
            </div>
          </div>

          {/* RIGHT: REVIEW */}
          <div className="space-y-5">
            {/* ⭐ RATING */}
            <div className="bg-white border rounded-xl shadow-sm p-5">
              <p className="font-medium mb-2">Rate this product</p>

              <div className="flex gap-2 text-2xl cursor-pointer">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    onClick={() => setRating(star)}
                    className={
                      rating >= star ? "text-yellow-400" : "text-gray-300"
                    }
                  >
                    ★
                  </span>
                ))}
              </div>
            </div>

            {/* ✍ REVIEW FORM */}
            <form
              onSubmit={handleSubmit}
              className="bg-white border rounded-xl shadow-sm p-5 space-y-4"
            >
              <input
                type="text"
                placeholder="Review title"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                className="input"
              />

              <textarea
                placeholder="Write your review..."
                rows={4}
                value={formData.description}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    description: e.target.value,
                  })
                }
                className="input"
              />

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
              >
                Submit Review
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RateProduct;
