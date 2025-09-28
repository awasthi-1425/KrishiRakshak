import React from "react";
import { motion } from "framer-motion";

export default function LabourScheduling() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-green-100 to-green-200 relative overflow-hidden">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/white-wall-3.png')] opacity-20"></div>

      {/* Form Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative z-10 w-[85%] md:w-[70%] lg:w-[60%] bg-white/95 backdrop-blur-md p-12 rounded-3xl shadow-2xl border border-green-300"
      >
        {/* Header */}
        <h1 className="text-4xl font-bold text-green-800 text-center mb-8 drop-shadow">
          Labour Scheduling & Alerts
        </h1>
        <p className="text-center text-gray-600 mb-10">
          Post your labour requirement and connect with workers instantly 🚜
        </p>

        {/* Form */}
        <form className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Work Type */}
          <div>
            <label className="block text-sm mb-2 text-green-800">Type of Work</label>
            <select className="w-full p-4 rounded-lg bg-green-50 border border-green-300 focus:border-green-600 focus:ring-2 focus:ring-green-400">
              <option>Select Work Type</option>
              <option>Sowing</option>
              <option>Harvesting</option>
              <option>Weeding</option>
            </select>
          </div>

          {/* People Required */}
          <div>
            <label className="block text-sm mb-2 text-green-800">Number of People</label>
            <input
              type="number"
              placeholder="e.g. 5"
              className="w-full p-4 rounded-lg bg-green-50 border border-green-300 focus:border-green-600 focus:ring-2 focus:ring-green-400"
            />
          </div>

          {/* Date Needed */}
          <div>
            <label className="block text-sm mb-2 text-green-800">Date Needed</label>
            <input
              type="date"
              className="w-full p-4 rounded-lg bg-green-50 border border-green-300 focus:border-green-600 focus:ring-2 focus:ring-green-400"
            />
          </div>

          {/* Duration */}
          <div>
            <label className="block text-sm mb-2 text-green-800">Duration (Days)</label>
            <input
              type="number"
              placeholder="e.g. 3"
              className="w-full p-4 rounded-lg bg-green-50 border border-green-300 focus:border-green-600 focus:ring-2 focus:ring-green-400"
            />
          </div>

          {/* Village */}
          <div>
            <label className="block text-sm mb-2 text-green-800">Village Name</label>
            <input
              type="text"
              placeholder="Enter village name"
              className="w-full p-4 rounded-lg bg-green-50 border border-green-300 focus:border-green-600 focus:ring-2 focus:ring-green-400"
            />
          </div>

          {/* Taluka */}
          <div>
            <label className="block text-sm mb-2 text-green-800">Taluka / District</label>
            <input
              type="text"
              placeholder="Enter Taluka/District"
              className="w-full p-4 rounded-lg bg-green-50 border border-green-300 focus:border-green-600 focus:ring-2 focus:ring-green-400"
            />
          </div>

          {/* Address */}
          <div className="md:col-span-2">
            <label className="block text-sm mb-2 text-green-800">Full Address (Optional)</label>
            <input
              type="text"
              placeholder="House no, street, landmark"
              className="w-full p-4 rounded-lg bg-green-50 border border-green-300 focus:border-green-600 focus:ring-2 focus:ring-green-400"
            />
          </div>

          {/* Wage */}
          <div>
            <label className="block text-sm mb-2 text-green-800">Wage per Day (₹)</label>
            <input
              type="number"
              placeholder="e.g. 300"
              className="w-full p-4 rounded-lg bg-green-50 border border-green-300 focus:border-green-600 focus:ring-2 focus:ring-green-400"
            />
          </div>

          {/* Contact */}
          <div>
            <label className="block text-sm mb-2 text-green-800">Contact Number</label>
            <input
              type="tel"
              placeholder="9876543210"
              className="w-full p-4 rounded-lg bg-green-50 border border-green-300 focus:border-green-600 focus:ring-2 focus:ring-green-400"
            />
          </div>

          {/* Additional Info */}
          <div className="md:col-span-2">
            <label className="block text-sm mb-2 text-green-800">Additional Information</label>
            <textarea
              rows="3"
              placeholder="Any specific requirements..."
              className="w-full p-4 rounded-lg bg-green-50 border border-green-300 focus:border-green-600 focus:ring-2 focus:ring-green-400"
            ></textarea>
          </div>
        </form>

        {/* Button */}
        <div className="text-center mt-10">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-10 py-4 bg-green-600 text-white text-lg font-semibold rounded-full shadow-lg hover:bg-green-700 transition"
          >
            🚀 Post Requirement
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}
