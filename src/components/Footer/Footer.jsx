import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300 py-10">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Logo Section */}
        <div>
          <h1 className="text-white text-2xl font-bold">Raiser Buddy</h1>
          <p className="mt-4 text-white text-sm leading-6">
            Raiser Buddy connects farmers directly with buyers, making it easier
            to sell fresh, organic, and locally grown products with complete
            trust and transparency.
          </p>
        </div>

        {/* Categories */}
        <div>
          <h4 className="text-white font-semibold mb-4">Top Categories</h4>
          <ul className="space-y-2">
            <li>
              <Link to="#" className="hover:text-white">
                Fruits
              </Link>
            </li>
            <li>
              <Link to="#" className="hover:text-white">
                Vegetables
              </Link>
            </li>
            <li>
              <Link to="#" className="hover:text-white">
                Hill Produce
              </Link>
            </li>
            <li>
              <Link to="#" className="hover:text-white">
                Organic Fertilizer
              </Link>
            </li>
          </ul>
        </div>

        {/* Links */}
        <div>
          <h4 className="text-white font-semibold mb-4">Useful Links</h4>
          <ul className="space-y-2">
            <li>
              <Link to="/shop" className="hover:text-white">
                Shop
              </Link>
            </li>
            <li>
              <Link to="/login" className="hover:text-white">
                Login
              </Link>
            </li>
            <li>
              <Link to="#" className="hover:text-white">
                Privacy Policy
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-white font-semibold mb-4">Contact</h4>
          <ul className="space-y-3 text-sm">
            <li>📍 Kannur, Kerala</li>
            <li>📞 +91 1234567896</li>
            <li>✉️ raiserbuddy@gmail.com</li>
          </ul>
        </div>
      </div>

      {/* Bottom */}
      <div className="text-center text-sm text-gray-500 mt-10 border-t border-gray-700 pt-4">
        © {year} developed by Romy. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
