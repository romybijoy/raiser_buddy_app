import React from "react";

const ProductReviewCard = ({ item }) => {
  const rating = Math.round(item?.rating || 0);

  return (
    <div className="bg-white border rounded-xl shadow-sm p-4 hover:shadow-md transition">

      <div className="flex gap-4">

        {/* AVATAR */}
        <div className="w-12 h-12 flex items-center justify-center rounded-full bg-purple-500 text-white font-semibold text-lg">
          {item?.user?.name?.charAt(0)?.toUpperCase() || "U"}
        </div>

        {/* CONTENT */}
        <div className="flex-1 space-y-2">

          {/* NAME + DATE */}
          <div>
            <p className="font-semibold text-gray-800">
              {item?.user?.name}
            </p>
            <p className="text-sm text-gray-500">
              {new Date(item.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>

          {/* ⭐ RATING */}
          <div className="flex text-yellow-400 text-lg">
            {[1, 2, 3, 4, 5].map((star) => (
              <span key={star}>
                {rating >= star ? "★" : "☆"}
              </span>
            ))}
          </div>

          {/* REVIEW TEXT */}
          <p className="text-gray-700 text-sm leading-relaxed">
            {item?.review}
          </p>

        </div>
      </div>

    </div>
  );
};

export default ProductReviewCard;