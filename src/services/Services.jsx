import React from "react";
import { motion } from "framer-motion";
import serviceData from "../assets/data/serviceData";

const Services = () => {
  return (
    <section className="px-4 py-10 bg-gray-50">
      <div className="max-w-7xl mx-auto">

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {serviceData.map((item, index) => (
            
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className="flex items-start gap-4 p-5 rounded-xl shadow-sm border 
                         transition-all duration-200 cursor-pointer"
              style={{ backgroundColor: item.bg }}
            >
              {/* Icon */}
              <div className="text-2xl text-gray-700">
                <i className={item.icon}></i>
              </div>

              {/* Content */}
              <div>
                <h3 className="text-md font-semibold text-gray-800">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  {item.subtitle}
                </p>
              </div>
            </motion.div>

          ))}
        </div>

      </div>
    </section>
  );
};

export default Services;