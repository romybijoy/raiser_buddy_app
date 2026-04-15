import React from "react";
import { Link } from "react-router-dom";
import bgImage from "../../assets/images/fruitBack.webp";

const CommonSection = ({ title, subtitle }) => {
  return (
    <section
      className="relative py-24 flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage: `url(${bgImage})`,
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4">
        
        {/* Breadcrumb */}
        <nav className="text-sm mb-2">
          <Link to="/shop" className="hover:text-green-400">
            Shop
          </Link>
          <span className="mx-2">/</span>
          <span>{title}</span>
          {subtitle && (
            <>
              <span className="mx-2">/</span>
              <span className="text-gray-300">{subtitle}</span>
            </>
          )}
        </nav>

        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-semibold">
          {title}
        </h1>

        {/* Subtitle */}
        {subtitle && (
          <p className="mt-2 text-gray-300">{subtitle}</p>
        )}
      </div>
    </section>
  );
};

export default CommonSection;