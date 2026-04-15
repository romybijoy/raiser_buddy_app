import React, { useEffect } from "react";
import Helmet from "../components/Helmet/Helmet";
import homeimg from "../assets/images/home.webp";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Services from "../services/Services";
import ProductsList from "../components/UI/ProductsList";
import { useDispatch, useSelector } from "react-redux";
import offerimg from "../assets/images/offer.jpeg";
import Clock from "../components/UI/Clock";
import { showProduct } from "../redux/slices/ProductSlice";

const Home = () => {
  const year = new Date().getFullYear();

  const { products, loading } = useSelector((state) => state.product);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(showProduct());
  }, [dispatch]);

  if (loading) {
    return <h2 className="text-center mt-10">Loading...</h2>;
  }

  return (
    <Helmet title={"Home"}>
      {/* HERO SECTION */}
      <section className="bg-gray-100 py-12">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-8 items-center">
          {/* Left */}
          <div>
            <p className="text-green-600 font-medium mb-2">
              Trending Product in {year}
            </p>

            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Fresh home made items
            </h2>

            <p className="text-gray-600 mb-6">
              Raiser Buddy connects farmers directly with buyers, making it
              easier to sell fresh, organic, and locally grown products with
              trust and transparency.
            </p>

            <motion.button
              whileTap={{ scale: 1.1 }}
              className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700"
            >
              <Link to="/shop">SHOP NOW</Link>
            </motion.button>
          </div>

          {/* Right */}
          <div>
            <img
              src={homeimg}
              alt="home"
              className="w-full rounded-lg shadow-md"
            />
          </div>
        </div>
      </section>

      <Services />

      {/* SECTION TEMPLATE */}
      {[
        { title: "Trending Products", data: products },
        { title: "Best Sales", data: products },
        { title: "New Arrivals", data: products },
        { title: "Popular in Category", data: products },
      ].map((section, index) => (
        <section key={index} className="py-12">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-2xl font-semibold text-center mb-6">
              {section.title}
            </h2>

            {section.data?.length === 0 ? (
              <h1 className="text-center text-gray-500">
                No products are found!
              </h1>
            ) : (
              <ProductsList data={section.data} />
            )}
          </div>
        </section>
      ))}

      {/* OFFER SECTION */}
      <section className="py-14 bg-gradient-to-r from-green-600 via-green-500 to-green-400 text-white">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-10 items-center">
          {/* LEFT CONTENT */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            <p className="uppercase tracking-wide text-sm text-white/80">
              Limited Time Offer
            </p>

            <h2 className="text-4xl md:text-5xl font-bold leading-tight">
              Fresh Fruits at <span className="text-yellow-300">30% OFF</span>
            </h2>

            <p className="text-sm md:text-base text-white/90">
              Enjoy farm-fresh, organic fruits directly from farmers. Healthy,
              affordable, and delivered with trust.
            </p>

            <p className="text-yellow-200 font-medium">
              Hurry! Offer ends soon ⏳
            </p>

            {/* TIMER */}
            <div className="flex items-center gap-4 mt-4">
              <div className="bg-white/20 backdrop-blur-md shadow-md p-4 rounded-lg">
                <Clock />
              </div>

              <motion.button
                whileTap={{ scale: 1.1 }}
                whileHover={{ scale: 1.05 }}
                className="bg-white text-green-600 px-6 py-2 rounded-lg font-semibold shadow-md hover:bg-gray-100 transition duration-200"
              >
                <Link to="/shop">Shop Now</Link>
              </motion.button>
            </div>
          </motion.div>

          {/* RIGHT IMAGE */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            {/* Glow Effect */}
            <div className="absolute inset-0 bg-white/10 blur-xl opacity-60 rounded-full"></div>

            <img
              src={offerimg}
              alt="offer"
              className="relative w-full max-h-[300px] object-contain drop-shadow-xl rounded-xl shadow-2xl"
            />

            {/* Discount Badge */}
            <div className="absolute top-4 right-4 bg-yellow-400 text-black font-bold px-3 py-1 rounded-full shadow-lg">
              30% OFF
            </div>
          </motion.div>
        </div>
      </section>
    </Helmet>
  );
};

export default Home;
