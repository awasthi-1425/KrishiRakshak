import React from "react";
import { motion } from "framer-motion";

const cropCalendar = [
  {
    month: "January",
    sow: ["Carrot", "Radish", "Spinach", "Fenugreek (Methi)", "Lettuce", "Coriander", "Turnip", "Peas", "Cauliflower", "Cabbage"],
    harvest: ["Wheat", "Mustard", "Potato"],
  },
  {
    month: "February",
    sow: ["Tomato", "Okra", "Brinjal"],
    harvest: ["Peas", "Mustard", "Carrot"],
  },
  {
    month: "March",
    sow: ["Rice (nursery)", "Sugarcane", "Cucumber"],
    harvest: ["Wheat", "Chickpea", "Barley"],
  },
  {
    month: "April",
    sow: ["Cotton", "Maize", "Bajra"],
    harvest: ["Lentils", "Onion", "Mustard"],
  },
  {
    month: "May",
    sow: ["Rice", "Sorghum", "Soybean"],
    harvest: ["Barley", "Peas", "Garlic"],
  },
  {
    month: "June",
    sow: ["Rice", "Maize", "Millets"],
    harvest: ["Potato", "Wheat (late)", "Coriander"],
  },
  {
    month: "July",
    sow: ["Maize", "Rice", "Cotton"],
    harvest: ["Onion", "Garlic", "Green Gram"],
  },
  {
    month: "August",
    sow: ["Rice (late)", "Soybean", "Sesame"],
    harvest: ["Maize (early)", "Groundnut"],
  },
  {
    month: "September",
    sow: ["Mustard", "Wheat (early)", "Barley"],
    harvest: ["Rice", "Sugarcane", "Cotton"],
  },
  {
    month: "October",
    sow: ["Wheat", "Barley", "Peas"],
    harvest: ["Rice", "Maize", "Groundnut"],
  },
  {
    month: "November",
    sow: ["Wheat", "Gram", "Mustard"],
    harvest: ["Soybean", "Sesame", "Rice (late)"],
  },
  {
    month: "December",
    sow: ["Wheat", "Carrot", "Spinach"],
    harvest: ["Sugarcane", "Potato", "Mustard (early)"],
  },
];

const CropCalendar = () => {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* 🎥 Background Video */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        src="https://www.pexels.com/download/video/25693382/"
        autoPlay
        loop
        muted
        playsInline
      ></video>

      {/* Dark overlay (no blur) */}
      <div className="absolute inset-0 bg-black/50"></div>

      <div className="relative z-10 p-8">
        <motion.h1
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl font-extrabold text-center text-white drop-shadow-md mb-12"
        >
         Crop Calendar
        </motion.h1>

        {/* Month-wise Cards */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {cropCalendar.map((season, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              whileHover={{ scale: 1.05, rotate: 1 }}
              className="rounded-2xl shadow-2xl p-6 border border-green-200 
              bg-gradient-to-br from-green-50 via-white to-green-100 
              hover:from-green-100 hover:to-green-50 transition-all duration-500"
            >
              <h2 className="text-2xl font-bold text-green-700 mb-4 text-center drop-shadow-sm">
                {season.month}
              </h2>

              {/* Sow Section */}
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-green-800 mb-2">
                  <img 
                     src="https://cdn-icons-png.flaticon.com/128/10127/10127301.png" 
                      alt="sow icon" 
                      className="w-6 h-6"
                  />Crops to Sow:
                </h3>
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                  {season.sow.map((crop, idx) => (
                    <li key={idx} className="hover:text-green-900 transition">
                      {crop}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Harvest Section */}
              <div>
                <h3 className="text-lg font-semibold text-yellow-700 mb-2">
                  <img 
                     src="https://cdn-icons-png.flaticon.com/128/10367/10367765.png" 
                      alt="sow icon" 
                      className="w-6 h-6"
                  />
                   Crops to Harvest:
                </h3>
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                  {season.harvest.map((crop, idx) => (
                    <li key={idx} className="hover:text-yellow-800 transition">
                      {crop}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CropCalendar;
