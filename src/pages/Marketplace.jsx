import React, { useState } from "react";
import { motion } from "framer-motion";
import { ShoppingBag, DollarSign, Leaf, Tractor } from "lucide-react";

export default function FarmerMarketplace() {
  const [activeTab, setActiveTab] = useState("home");

  // Dummy Buy Products
  const products = [
    {
      id: 1,
      name: "Fresh Wheat",
      price: "₹2500 / Quintal",
      seller: "Ramesh Kumar",
      icon: <img 
  src="https://cdn-icons-png.flaticon.com/128/6327/6327254.png" 
  alt="Wheat Icon" 
  className="w-8 h-8 inline-block" 
/>
,
    },
    {
      id: 2,
      name: "Organic Fertilizer",
      price: "₹500 / Bag",
      seller: "Meena Devi",
      icon: <img 
           src="https://cdn-icons-png.flaticon.com/128/1993/1993780.png" 
            alt="fertilizer" 
            className="w-8 h-8 inline-block" 
/>
,
    },
    {
      id: 3,
      name: "Tomatoes",
      price: "₹20 / Kg",
      seller: "Arjun Singh",
      icon: <img 
  src="https://cdn-icons-png.flaticon.com/128/7313/7313003.png" 
  alt="tomato Icon" 
  className="w-8 h-8 inline-block" 
/>
,
    },
    {
      id: 4,
      name: "Farm Tractor (Rent)",
      price: "₹800 / Day",
      seller: "Vikas Yadav",
      icon:<img 
  src="https://cdn-icons-png.flaticon.com/128/2548/2548758.png" 
  alt="tractor Icon" 
  className="w-8 h-8 inline-block" 
/>
,
    },
  {
    id: 1,
    name: "Rice",
    price: "₹2500 / Quintal",
    seller: "Harish Patel",
    icon: (
      <img
        src="https://cdn-icons-png.flaticon.com/128/7088/7088019.png"
        alt="rice Icon"
        className="w-8 h-8 inline-block"
      />
    ),
  },
  {
    id: 2,
    name: "Apples",
    price: "₹100 / Kg",
    seller: "Sita Devi",
    icon: (
      <img
        src="https://cdn-icons-png.flaticon.com/128/415/415733.png"
        alt="Apple Icon"
        className="w-8 h-8 inline-block"
      />
    ),
  },
  {
    id: 3,
    name: "Fresh Vegetables",
    price: "₹50 / Kg",
    seller: "Mohan Singh",
    icon: (
      <img
        src="https://cdn-icons-png.flaticon.com/128/2805/2805947.png"
        alt="Vegetables Icon"
        className="w-8 h-8 inline-block"
      />
    ),
  },

  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Hero Section */}
      {activeTab === "home" && (
        <section className="relative h-[85vh] flex items-center justify-center text-center">
          <video
            src="https://www.pexels.com/download/video/8540430/"
            autoPlay
            loop
            muted
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50" />
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative z-10 text-white max-w-2xl bg-black/40 backdrop-blur-md border border-white/30 p-10 rounded-2xl shadow-xl"
          >
            <h1 className="text-5xl font-bold mb-4 flex items-center justify-center gap-2">
              <ShoppingBag className="w-12 h-12 text-yellow-400" /> Farmer
              Marketplace
            </h1>
            <p className="text-lg mb-6">
              A trusted marketplace where farmers connect directly to buy and
              sell fresh produce, seeds, tools, and more — cutting out the
              middlemen and ensuring fair trade for everyone.
            </p>
            <div className="flex gap-6 justify-center">
              <button
                onClick={() => setActiveTab("buy")}
                className="px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-xl shadow-lg font-bold flex items-center gap-2"
              >
                <Leaf className="w-5 h-5" /> Buy Products
              </button>
              <button
                onClick={() => setActiveTab("sell")}
                className="px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-black rounded-xl shadow-lg font-bold flex items-center gap-2"
              >
                <DollarSign className="w-5 h-5" /> Sell Products
              </button>
            </div>
          </motion.div>
        </section>
      )}

      {/* Buy Section */}
      {activeTab === "buy" && (
        <section className="p-10 bg-gradient-to-b from-green-50 to-green-100 min-h-screen">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-green-800 flex items-center gap-2">
              <Leaf className="w-8 h-8" /> Explore Available Products
            </h2>
            <button
              onClick={() => setActiveTab("home")}
              className="px-4 py-2 bg-gray-700 hover:bg-gray-800 text-white rounded-lg"
            >
              ⬅ Back
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product, idx) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.2 }}
                className="bg-white rounded-2xl shadow-lg p-6 hover:scale-105 transition transform border border-green-200"
              >
                <div className="text-5xl mb-4">{product.icon}</div>
                <h2 className="text-2xl font-bold mb-2 text-green-900">
                  {product.name}
                </h2>
                <p className="text-green-700 font-semibold">{product.price}</p>
                <p className="text-gray-600 text-sm mt-2">
                  Seller: {product.seller}
                </p>
                <button className="mt-4 w-full px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold">
                  Buy Now
                </button>
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* Sell Section */}
      {activeTab === "sell" && (
        <section className="p-10 bg-gradient-to-b from-yellow-50 to-yellow-100 min-h-screen">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-yellow-800 flex items-center gap-2">
              <DollarSign className="w-8 h-8" /> Sell Your Product
            </h2>
            <button
              onClick={() => setActiveTab("home")}
              className="px-4 py-2 bg-gray-700 hover:bg-gray-800 text-white rounded-lg"
            >
              ⬅ Back
            </button>
          </div>
          <motion.form
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-2xl shadow-xl p-8 max-w-lg mx-auto space-y-6 border border-yellow-200"
          >
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Product Name
              </label>
              <input
                type="text"
                placeholder="Enter product name"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-yellow-500"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Price
              </label>
              <input
                type="text"
                placeholder="Enter price"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-yellow-500"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Description
              </label>
              <textarea
                placeholder="Enter product details"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-yellow-500"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Upload Image
              </label>
              <input
                type="file"
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
              />
            </div>
            <button
              type="submit"
              className="w-full px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-black font-bold rounded-lg shadow-lg"
            >
              Submit Product
            </button>
          </motion.form>
        </section>
      )}
    </div>
  );
}
