import React, { useState } from "react";
import { motion } from "framer-motion";

// --- Embedded Dataset ---
const fertilizerData = [
    { "Temperature": 26, "Humidity": 52, "Moisture": 38, "Soil Type": "Sandy", "Crop Type": "Maize", "Nitrogen": 37, "Potassium": 0, "Phosphorous": 0, "Fertilizer Name": "Urea" },
    { "Temperature": 29, "Humidity": 52, "Moisture": 45, "Soil Type": "Loamy", "Crop Type": "Sugarcane", "Nitrogen": 12, "Potassium": 0, "Phosphorous": 36, "Fertilizer Name": "DAP" },
    { "Temperature": 34, "Humidity": 65, "Moisture": 62, "Soil Type": "Black", "Crop Type": "Cotton", "Nitrogen": 7, "Potassium": 9, "Phosphorous": 30, "Fertilizer Name": "14-35-14" },
    { "Temperature": 32, "Humidity": 62, "Moisture": 34, "Soil Type": "Red", "Crop Type": "Tobacco", "Nitrogen": 22, "Potassium": 0, "Phosphorous": 20, "Fertilizer Name": "28-28" },
    { "Temperature": 28, "Humidity": 54, "Moisture": 46, "Soil Type": "Clayey", "Crop Type": "Paddy", "Nitrogen": 35, "Potassium": 0, "Phosphorous": 0, "Fertilizer Name": "Urea" },
    { "Temperature": 26, "Humidity": 52, "Moisture": 35, "Soil Type": "Sandy", "Crop Type": "Barley", "Nitrogen": 12, "Potassium": 10, "Phosphorous": 13, "Fertilizer Name": "17-17-17" },
    { "Temperature": 25, "Humidity": 50, "Moisture": 64, "Soil Type": "Red", "Crop Type": "Cotton", "Nitrogen": 9, "Potassium": 0, "Phosphorous": 10, "Fertilizer Name": "20-20" },
    { "Temperature": 33, "Humidity": 64, "Moisture": 50, "Soil Type": "Loamy", "Crop Type": "Wheat", "Nitrogen": 41, "Potassium": 0, "Phosphorous": 0, "Fertilizer Name": "Urea" },
    { "Temperature": 30, "Humidity": 60, "Moisture": 42, "Soil Type": "Sandy", "Crop Type": "Millets", "Nitrogen": 21, "Potassium": 0, "Phosphorous": 18, "Fertilizer Name": "28-28" },
    { "Temperature": 29, "Humidity": 58, "Moisture": 33, "Soil Type": "Black", "Crop Type": "Oil seeds", "Nitrogen": 9, "Potassium": 7, "Phosphorous": 30, "Fertilizer Name": "14-35-14" },
    { "Temperature": 27, "Humidity": 54, "Moisture": 28, "Soil Type": "Clayey", "Crop Type": "Pulses", "Nitrogen": 13, "Potassium": 0, "Phosphorous": 40, "Fertilizer Name": "DAP" },
    { "Temperature": 31, "Humidity": 62, "Moisture": 48, "Soil Type": "Sandy", "Crop Type": "Maize", "Nitrogen": 14, "Potassium": 15, "Phosphorous": 12, "Fertilizer Name": "17-17-17" },
    { "Temperature": 25, "Humidity": 50, "Moisture": 65, "Soil Type": "Loamy", "Crop Type": "Cotton", "Nitrogen": 36, "Potassium": 0, "Phosphorous": 0, "Fertilizer Name": "Urea" },
    { "Temperature": 32, "Humidity": 62, "Moisture": 41, "Soil Type": "Clayey", "Crop Type": "Paddy", "Nitrogen": 24, "Potassium": 0, "Phosphorous": 22, "Fertilizer Name": "28-28" },
    { "Temperature": 26, "Humidity": 52, "Moisture": 31, "Soil Type": "Red", "Crop Type": "Ground Nuts", "Nitrogen": 14, "Potassium": 0, "Phosphorous": 41, "Fertilizer Name": "DAP" },
    { "Temperature": 31, "Humidity": 62, "Moisture": 49, "Soil Type": "Black", "Crop Type": "Sugarcane", "Nitrogen": 10, "Potassium": 13, "Phosphorous": 14, "Fertilizer Name": "17-17-17" },
    { "Temperature": 33, "Humidity": 64, "Moisture": 34, "Soil Type": "Clayey", "Crop Type": "Pulses", "Nitrogen": 38, "Potassium": 0, "Phosphorous": 0, "Fertilizer Name": "Urea" },
    { "Temperature": 25, "Humidity": 50, "Moisture": 39, "Soil Type": "Sandy", "Crop Type": "Barley", "Nitrogen": 21, "Potassium": 0, "Phosphorous": 19, "Fertilizer Name": "28-28" },
    { "Temperature": 28, "Humidity": 54, "Moisture": 65, "Soil Type": "Black", "Crop Type": "Cotton", "Nitrogen": 39, "Potassium": 0, "Phosphorous": 0, "Fertilizer Name": "Urea" },
    { "Temperature": 29, "Humidity": 58, "Moisture": 52, "Soil Type": "Loamy", "Crop Type": "Wheat", "Nitrogen": 13, "Potassium": 0, "Phosphorous": 36, "Fertilizer Name": "DAP" },
    { "Temperature": 30, "Humidity": 60, "Moisture": 44, "Soil Type": "Sandy", "Crop Type": "Millets", "Nitrogen": 10, "Potassium": 0, "Phosphorous": 9, "Fertilizer Name": "20-20" },
    { "Temperature": 34, "Humidity": 65, "Moisture": 53, "Soil Type": "Loamy", "Crop Type": "Sugarcane", "Nitrogen": 12, "Potassium": 14, "Phosphorous": 12, "Fertilizer Name": "17-17-17" },
    { "Temperature": 35, "Humidity": 68, "Moisture": 33, "Soil Type": "Red", "Crop Type": "Tobacco", "Nitrogen": 11, "Potassium": 0, "Phosphorous": 37, "Fertilizer Name": "DAP" },
    { "Temperature": 28, "Humidity": 54, "Moisture": 37, "Soil Type": "Black", "Crop Type": "Millets", "Nitrogen": 36, "Potassium": 0, "Phosphorous": 0, "Fertilizer Name": "Urea" },
    { "Temperature": 33, "Humidity": 64, "Moisture": 39, "Soil Type": "Clayey", "Crop Type": "Paddy", "Nitrogen": 13, "Potassium": 0, "Phosphorous": 10, "Fertilizer Name": "20-20" },
    { "Temperature": 26, "Humidity": 52, "Moisture": 44, "Soil Type": "Sandy", "Crop Type": "Maize", "Nitrogen": 23, "Potassium": 0, "Phosphorous": 20, "Fertilizer Name": "28-28" },
    { "Temperature": 30, "Humidity": 60, "Moisture": 63, "Soil Type": "Red", "Crop Type": "Cotton", "Nitrogen": 9, "Potassium": 9, "Phosphorous": 29, "Fertilizer Name": "14-35-14" },
    { "Temperature": 32, "Humidity": 62, "Moisture": 30, "Soil Type": "Loamy", "Crop Type": "Sugarcane", "Nitrogen": 38, "Potassium": 0, "Phosphorous": 0, "Fertilizer Name": "Urea" },
    { "Temperature": 37, "Humidity": 70, "Moisture": 32, "Soil Type": "Black", "Crop Type": "Oil seeds", "Nitrogen": 12, "Potassium": 0, "Phosphorous": 39, "Fertilizer Name": "DAP" },
    { "Temperature": 26, "Humidity": 52, "Moisture": 36, "Soil Type": "Clayey", "Crop Type": "Pulses", "Nitrogen": 14, "Potassium": 0, "Phosphorous": 13, "Fertilizer Name": "20-20" },
    { "Temperature": 29, "Humidity": 58, "Moisture": 40, "Soil Type": "Red", "Crop Type": "Ground Nuts", "Nitrogen": 24, "Potassium": 0, "Phosphorous": 23, "Fertilizer Name": "28-28" },
    { "Temperature": 30, "Humidity": 60, "Moisture": 27, "Soil Type": "Loamy", "Crop Type": "Sugarcane", "Nitrogen": 12, "Potassium": 0, "Phosphorous": 40, "Fertilizer Name": "DAP" },
    { "Temperature": 34, "Humidity": 65, "Moisture": 38, "Soil Type": "Clayey", "Crop Type": "Paddy", "Nitrogen": 39, "Potassium": 0, "Phosphorous": 0, "Fertilizer Name": "Urea" },
    { "Temperature": 36, "Humidity": 68, "Moisture": 38, "Soil Type": "Sandy", "Crop Type": "Barley", "Nitrogen": 7, "Potassium": 9, "Phosphorous": 30, "Fertilizer Name": "14-35-14" },
    { "Temperature": 26, "Humidity": 52, "Moisture": 48, "Soil Type": "Loamy", "Crop Type": "Wheat", "Nitrogen": 23, "Potassium": 0, "Phosphorous": 19, "Fertilizer Name": "28-28" },
    { "Temperature": 28, "Humidity": 54, "Moisture": 35, "Soil Type": "Black", "Crop Type": "Millets", "Nitrogen": 41, "Potassium": 0, "Phosphorous": 0, "Fertilizer Name": "Urea" },
    { "Temperature": 30, "Humidity": 60, "Moisture": 61, "Soil Type": "Loamy", "Crop Type": "Cotton", "Nitrogen": 8, "Potassium": 10, "Phosphorous": 31, "Fertilizer Name": "14-35-14" },
    { "Temperature": 37, "Humidity": 70, "Moisture": 37, "Soil Type": "Clayey", "Crop Type": "Paddy", "Nitrogen": 12, "Potassium": 0, "Phosphorous": 41, "Fertilizer Name": "DAP" },
    { "Temperature": 25, "Humidity": 50, "Moisture": 26, "Soil Type": "Red", "Crop Type": "Ground Nuts", "Nitrogen": 15, "Potassium": 14, "Phosphorous": 11, "Fertilizer Name": "17-17-17" },
    { "Temperature": 29, "Humidity": 58, "Moisture": 34, "Soil Type": "Sandy", "Crop Type": "Millets", "Nitrogen": 15, "Potassium": 0, "Phosphorous": 37, "Fertilizer Name": "DAP" },
    { "Temperature": 27, "Humidity": 54, "Moisture": 30, "Soil Type": "Clayey", "Crop Type": "Pulses", "Nitrogen": 13, "Potassium": 0, "Phosphorous": 13, "Fertilizer Name": "20-20" },
    { "Temperature": 30, "Humidity": 60, "Moisture": 58, "Soil Type": "Loamy", "Crop Type": "Sugarcane", "Nitrogen": 10, "Potassium": 7, "Phosphorous": 32, "Fertilizer Name": "14-35-14" },
    { "Temperature": 32, "Humidity": 62, "Moisture": 34, "Soil Type": "Red", "Crop Type": "Tobacco", "Nitrogen": 22, "Potassium": 0, "Phosphorous": 24, "Fertilizer Name": "28-28" },
    { "Temperature": 34, "Humidity": 65, "Moisture": 60, "Soil Type": "Black", "Crop Type": "Sugarcane", "Nitrogen": 35, "Potassium": 0, "Phosphorous": 0, "Fertilizer Name": "Urea" },
    { "Temperature": 35, "Humidity": 67, "Moisture": 42, "Soil Type": "Sandy", "Crop Type": "Barley", "Nitrogen": 10, "Potassium": 0, "Phosphorous": 35, "Fertilizer Name": "DAP" },
    { "Temperature": 38, "Humidity": 70, "Moisture": 48, "Soil Type": "Loamy", "Crop Type": "Wheat", "Nitrogen": 8, "Potassium": 8, "Phosphorous": 28, "Fertilizer Name": "14-35-14" },
    { "Temperature": 26, "Humidity": 52, "Moisture": 32, "Soil Type": "Black", "Crop Type": "Oil seeds", "Nitrogen": 12, "Potassium": 0, "Phosphorous": 8, "Fertilizer Name": "20-20" },
    { "Temperature": 29, "Humidity": 58, "Moisture": 43, "Soil Type": "Clayey", "Crop Type": "Paddy", "Nitrogen": 24, "Potassium": 0, "Phosphorous": 18, "Fertilizer Name": "28-28" },
    { "Temperature": 30, "Humidity": 60, "Moisture": 29, "Soil Type": "Red", "Crop Type": "Ground Nuts", "Nitrogen": 41, "Potassium": 0, "Phosphorous": 0, "Fertilizer Name": "Urea" },
    { "Temperature": 33, "Humidity": 64, "Moisture": 51, "Soil Type": "Sandy", "Crop Type": "Maize", "Nitrogen": 5, "Potassium": 9, "Phosphorous": 29, "Fertilizer Name": "14-35-14" },
    { "Temperature": 34, "Humidity": 65, "Moisture": 31, "Soil Type": "Red", "Crop Type": "Tobacco", "Nitrogen": 23, "Potassium": 0, "Phosphorous": 21, "Fertilizer Name": "28-28" },
    { "Temperature": 36, "Humidity": 68, "Moisture": 33, "Soil Type": "Black", "Crop Type": "Oil seeds", "Nitrogen": 13, "Potassium": 0, "Phosphorous": 14, "Fertilizer Name": "20-20" },
    { "Temperature": 28, "Humidity": 54, "Moisture": 38, "Soil Type": "Clayey", "Crop Type": "Pulses", "Nitrogen": 40, "Potassium": 0, "Phosphorous": 0, "Fertilizer Name": "Urea" },
    { "Temperature": 30, "Humidity": 60, "Moisture": 47, "Soil Type": "Sandy", "Crop Type": "Barley", "Nitrogen": 12, "Potassium": 0, "Phosphorous": 42, "Fertilizer Name": "DAP" },
    { "Temperature": 31, "Humidity": 62, "Moisture": 63, "Soil Type": "Red", "Crop Type": "Cotton", "Nitrogen": 11, "Potassium": 12, "Phosphorous": 15, "Fertilizer Name": "17-17-17" },
    { "Temperature": 27, "Humidity": 53, "Moisture": 43, "Soil Type": "Black", "Crop Type": "Millets", "Nitrogen": 23, "Potassium": 0, "Phosphorous": 24, "Fertilizer Name": "28-28" },
    { "Temperature": 34, "Humidity": 65, "Moisture": 54, "Soil Type": "Loamy", "Crop Type": "Wheat", "Nitrogen": 38, "Potassium": 0, "Phosphorous": 0, "Fertilizer Name": "Urea" },
    { "Temperature": 29, "Humidity": 58, "Moisture": 37, "Soil Type": "Sandy", "Crop Type": "Millets", "Nitrogen": 8, "Potassium": 0, "Phosphorous": 15, "Fertilizer Name": "20-20" },
    { "Temperature": 25, "Humidity": 50, "Moisture": 56, "Soil Type": "Loamy", "Crop Type": "Sugarcane", "Nitrogen": 11, "Potassium": 13, "Phosphorous": 15, "Fertilizer Name": "17-17-17" },
    { "Temperature": 32, "Humidity": 62, "Moisture": 34, "Soil Type": "Red", "Crop Type": "Ground Nuts", "Nitrogen": 15, "Potassium": 0, "Phosphorous": 37, "Fertilizer Name": "DAP" },
    { "Temperature": 28, "Humidity": 54, "Moisture": 41, "Soil Type": "Clayey", "Crop Type": "Paddy", "Nitrogen": 36, "Potassium": 0, "Phosphorous": 0, "Fertilizer Name": "Urea" },
    { "Temperature": 30, "Humidity": 60, "Moisture": 49, "Soil Type": "Loamy", "Crop Type": "Wheat", "Nitrogen": 13, "Potassium": 0, "Phosphorous": 9, "Fertilizer Name": "20-20" },
    { "Temperature": 34, "Humidity": 65, "Moisture": 64, "Soil Type": "Black", "Crop Type": "Cotton", "Nitrogen": 24, "Potassium": 0, "Phosphorous": 20, "Fertilizer Name": "28-28" },
    { "Temperature": 28, "Humidity": 54, "Moisture": 47, "Soil Type": "Sandy", "Crop Type": "Barley", "Nitrogen": 5, "Potassium": 18, "Phosphorous": 15, "Fertilizer Name": "10-26-26" },
    { "Temperature": 27, "Humidity": 53, "Moisture": 35, "Soil Type": "Black", "Crop Type": "Oil seeds", "Nitrogen": 37, "Potassium": 0, "Phosphorous": 0, "Fertilizer Name": "Urea" },
    { "Temperature": 36, "Humidity": 68, "Moisture": 62, "Soil Type": "Red", "Crop Type": "Cotton", "Nitrogen": 15, "Potassium": 0, "Phosphorous": 40, "Fertilizer Name": "DAP" },
    { "Temperature": 34, "Humidity": 65, "Moisture": 57, "Soil Type": "Black", "Crop Type": "Sugarcane", "Nitrogen": 9, "Potassium": 0, "Phosphorous": 13, "Fertilizer Name": "20-20" },
    { "Temperature": 29, "Humidity": 58, "Moisture": 55, "Soil Type": "Loamy", "Crop Type": "Sugarcane", "Nitrogen": 8, "Potassium": 8, "Phosphorous": 33, "Fertilizer Name": "14-35-14" },
    { "Temperature": 25, "Humidity": 50, "Moisture": 40, "Soil Type": "Clayey", "Crop Type": "Pulses", "Nitrogen": 6, "Potassium": 19, "Phosphorous": 16, "Fertilizer Name": "10-26-26" },
    { "Temperature": 30, "Humidity": 60, "Moisture": 38, "Soil Type": "Sandy", "Crop Type": "Millets", "Nitrogen": 10, "Potassium": 0, "Phosphorous": 14, "Fertilizer Name": "20-20" },
    { "Temperature": 26, "Humidity": 52, "Moisture": 39, "Soil Type": "Clayey", "Crop Type": "Pulses", "Nitrogen": 21, "Potassium": 0, "Phosphorous": 23, "Fertilizer Name": "28-28" },
    { "Temperature": 31, "Humidity": 62, "Moisture": 32, "Soil Type": "Red", "Crop Type": "Tobacco", "Nitrogen": 39, "Potassium": 0, "Phosphorous": 0, "Fertilizer Name": "Urea" },
    { "Temperature": 34, "Humidity": 65, "Moisture": 48, "Soil Type": "Loamy", "Crop Type": "Wheat", "Nitrogen": 23, "Potassium": 0, "Phosphorous": 19, "Fertilizer Name": "28-28" },
    { "Temperature": 27, "Humidity": 53, "Moisture": 34, "Soil Type": "Black", "Crop Type": "Oil seeds", "Nitrogen": 42, "Potassium": 0, "Phosphorous": 0, "Fertilizer Name": "Urea" },
    { "Temperature": 33, "Humidity": 64, "Moisture": 31, "Soil Type": "Red", "Crop Type": "Ground Nuts", "Nitrogen": 13, "Potassium": 0, "Phosphorous": 39, "Fertilizer Name": "DAP" },
    { "Temperature": 29, "Humidity": 58, "Moisture": 42, "Soil Type": "Clayey", "Crop Type": "Paddy", "Nitrogen": 9, "Potassium": 10, "Phosphorous": 22, "Fertilizer Name": "14-35-14" },
    { "Temperature": 30, "Humidity": 60, "Moisture": 47, "Soil Type": "Sandy", "Crop Type": "Maize", "Nitrogen": 22, "Potassium": 0, "Phosphorous": 21, "Fertilizer Name": "28-28" },
    { "Temperature": 27, "Humidity": 53, "Moisture": 59, "Soil Type": "Loamy", "Crop Type": "Sugarcane", "Nitrogen": 10, "Potassium": 0, "Phosphorous": 15, "Fertilizer Name": "20-20" },
    { "Temperature": 26, "Humidity": 52, "Moisture": 36, "Soil Type": "Clayey", "Crop Type": "Pulses", "Nitrogen": 7, "Potassium": 16, "Phosphorous": 20, "Fertilizer Name": "10-26-26" },
    { "Temperature": 34, "Humidity": 65, "Moisture": 63, "Soil Type": "Red", "Crop Type": "Cotton", "Nitrogen": 14, "Potassium": 0, "Phosphorous": 38, "Fertilizer Name": "DAP" },
    { "Temperature": 28, "Humidity": 54, "Moisture": 43, "Soil Type": "Clayey", "Crop Type": "Paddy", "Nitrogen": 10, "Potassium": 8, "Phosphorous": 29, "Fertilizer Name": "14-35-14" },
    { "Temperature": 30, "Humidity": 60, "Moisture": 40, "Soil Type": "Sandy", "Crop Type": "Millets", "Nitrogen": 41, "Potassium": 0, "Phosphorous": 0, "Fertilizer Name": "Urea" },
    { "Temperature": 29, "Humidity": 58, "Moisture": 65, "Soil Type": "Black", "Crop Type": "Cotton", "Nitrogen": 14, "Potassium": 0, "Phosphorous": 35, "Fertilizer Name": "DAP" },
    { "Temperature": 26, "Humidity": 52, "Moisture": 59, "Soil Type": "Loamy", "Crop Type": "Sugarcane", "Nitrogen": 11, "Potassium": 0, "Phosphorous": 9, "Fertilizer Name": "20-20" },
    { "Temperature": 31, "Humidity": 62, "Moisture": 44, "Soil Type": "Sandy", "Crop Type": "Barley", "Nitrogen": 21, "Potassium": 0, "Phosphorous": 28, "Fertilizer Name": "28-28" },
    { "Temperature": 35, "Humidity": 67, "Moisture": 28, "Soil Type": "Clayey", "Crop Type": "Pulses", "Nitrogen": 8, "Potassium": 7, "Phosphorous": 31, "Fertilizer Name": "14-35-14" },
    { "Temperature": 29, "Humidity": 58, "Moisture": 30, "Soil Type": "Red", "Crop Type": "Tobacco", "Nitrogen": 13, "Potassium": 17, "Phosphorous": 16, "Fertilizer Name": "10-26-26" },
    { "Temperature": 27, "Humidity": 53, "Moisture": 30, "Soil Type": "Black", "Crop Type": "Millets", "Nitrogen": 35, "Potassium": 0, "Phosphorous": 0, "Fertilizer Name": "Urea" },
    { "Temperature": 36, "Humidity": 68, "Moisture": 50, "Soil Type": "Loamy", "Crop Type": "Wheat", "Nitrogen": 12, "Potassium": 18, "Phosphorous": 19, "Fertilizer Name": "10-26-26" },
    { "Temperature": 29, "Humidity": 58, "Moisture": 61, "Soil Type": "Loamy", "Crop Type": "Cotton", "Nitrogen": 11, "Potassium": 0, "Phosphorous": 38, "Fertilizer Name": "DAP" },
    { "Temperature": 30, "Humidity": 60, "Moisture": 26, "Soil Type": "Black", "Crop Type": "Oil seeds", "Nitrogen": 8, "Potassium": 9, "Phosphorous": 30, "Fertilizer Name": "14-35-14" },
    { "Temperature": 34, "Humidity": 65, "Moisture": 45, "Soil Type": "Clayey", "Crop Type": "Paddy", "Nitrogen": 6, "Potassium": 19, "Phosphorous": 21, "Fertilizer Name": "10-26-26" },
    { "Temperature": 36, "Humidity": 68, "Moisture": 41, "Soil Type": "Red", "Crop Type": "Ground Nuts", "Nitrogen": 41, "Potassium": 0, "Phosphorous": 0, "Fertilizer Name": "Urea" },
    { "Temperature": 28, "Humidity": 54, "Moisture": 25, "Soil Type": "Sandy", "Crop Type": "Maize", "Nitrogen": 9, "Potassium": 10, "Phosphorous": 30, "Fertilizer Name": "14-35-14" },
    { "Temperature": 25, "Humidity": 50, "Moisture": 32, "Soil Type": "Clayey", "Crop Type": "Pulses", "Nitrogen": 24, "Potassium": 0, "Phosphorous": 19, "Fertilizer Name": "28-28" },
    { "Temperature": 30, "Humidity": 60, "Moisture": 27, "Soil Type": "Red", "Crop Type": "Tobacco", "Nitrogen": 4, "Potassium": 17, "Phosphorous": 17, "Fertilizer Name": "10-26-26" },
    { "Temperature": 38, "Humidity": 72, "Moisture": 51, "Soil Type": "Loamy", "Crop Type": "Wheat", "Nitrogen": 39, "Potassium": 0, "Phosphorous": 0, "Fertilizer Name": "Urea" },
    { "Temperature": 36, "Humidity": 60, "Moisture": 43, "Soil Type": "Sandy", "Crop Type": "Millets", "Nitrogen": 15, "Potassium": 0, "Phosphorous": 41, "Fertilizer Name": "DAP" },
    { "Temperature": 29, "Humidity": 58, "Moisture": 57, "Soil Type": "Black", "Crop Type": "Sugarcane", "Nitrogen": 12, "Potassium": 0, "Phosphorous": 10, "Fertilizer Name": "20-20" }
];

// --- Dynamically generate UI data from the dataset ---
const getIcon = (cropName) => {
    const icons = {
        "Maize": "🌽", "Sugarcane": "🎋", "Cotton": "☁️", "Tobacco": "🌿",
        "Paddy": "🌾", "Barley": "🌾", "Wheat": "🍞", "Millets": "🎑",
        "Oil seeds": "🌻", "Pulses": "🌱", "Ground Nuts": "🥜", "Rice": "🌾",
    };
    return icons[cropName] || "🌱";
};

const uniqueCrops = [...new Set(fertilizerData.map(item => item["Crop Type"]))];
const crops = uniqueCrops.map(crop => ({ name: crop, icon: getIcon(crop) }));
const soilTypes = [...new Set(fertilizerData.map(item => item["Soil Type"]))];

// --- Main Component ---
export default function FertilizerRecommendation() {
    // --- State Management ---
    const [selectedCrop, setSelectedCrop] = useState(crops[0]?.name || "");
    const [selectedSoil, setSelectedSoil] = useState(soilTypes[0] || "");
    const [soilData, setSoilData] = useState({
        temperature: "", humidity: "", moisture: "",
        nitrogen: "", potassium: "", phosphorous: "",
    });
    const [recommendation, setRecommendation] = useState("");

    // --- Event Handlers ---
    const handleSoilDataChange = (e) => {
        setSoilData({ ...soilData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const allFieldsFilled = selectedCrop && selectedSoil && Object.values(soilData).every(value => value !== "");

        if (allFieldsFilled) {
            // Convert input strings to numbers for calculation
            const userInput = {
                temp: parseFloat(soilData.temperature),
                humidity: parseFloat(soilData.humidity),
                moisture: parseFloat(soilData.moisture),
                n: parseFloat(soilData.nitrogen),
                k: parseFloat(soilData.potassium),
                p: parseFloat(soilData.phosphorous),
            };

            // Find the best match from the dataset
            let bestMatch = null;
            let smallestDifference = Infinity;

            // Filter data for the selected crop and soil for a more targeted search
            const filteredData = fertilizerData.filter(
                item => item["Crop Type"] === selectedCrop && item["Soil Type"] === selectedSoil
            );
            
            // If no direct match for crop/soil combo, search the whole dataset
            const dataToSearch = filteredData.length > 0 ? filteredData : fertilizerData;

            dataToSearch.forEach(item => {
                // Calculate the 'distance' between user input and dataset entry
                const difference =
                    Math.abs(userInput.temp - item.Temperature) +
                    Math.abs(userInput.humidity - item.Humidity) +
                    Math.abs(userInput.moisture - item.Moisture) +
                    Math.abs(userInput.n - item.Nitrogen) +
                    Math.abs(userInput.k - item.Potassium) +
                    Math.abs(userInput.p - item.Phosphorous);

                if (difference < smallestDifference) {
                    smallestDifference = difference;
                    bestMatch = item;
                }
            });
            
            if (bestMatch) {
                setRecommendation(bestMatch["Fertilizer Name"]);
            } else {
                 setRecommendation("Could not find a specific recommendation. Please check your inputs.");
            }

        } else {
            alert("Please fill in all the fields to get a recommendation.");
        }
    };

    // --- Render ---
    return (
        <div className="bg-gray-50 text-gray-800">
            {/* Full screen hero section */}
            <div className="relative h-screen">
                {/* Background Video */}
                <div className="absolute inset-0 z-0">
                    <video
                        src="https://cdn.pixabay.com/video/2017/06/21/10177-223148994_tiny.mp4"
                        autoPlay
                        loop
                        muted
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/50" />
                </div>

                {/* Hero Content */}
                <div className="relative z-10 flex h-full items-center justify-center text-center text-white px-4">
                    <motion.div
                        initial={{ opacity: 0, y: -30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h1 className="text-4xl md:text-6xl font-bold">Fertilizer Recommendation</h1>
                        <p className="mt-4 text-lg md:text-xl max-w-2xl mx-auto">
                            Get personalized fertilizer suggestions based on soil conditions and crop type.
                        </p>
                    </motion.div>
                </div>
            </div>

            {/* Main Form Container */}
            <div className="relative z-20 bg-white p-6 md:p-10 shadow-2xl max-w-5xl mx-auto -mt-20 rounded-2xl mb-12">
                <form onSubmit={handleSubmit}>
                    <h2 className="text-2xl font-bold text-gray-700 mb-6 text-center">Enter Your Farm Details</h2>

                    {/* Crop Selection */}
                    <div className="mb-8">
                        <label className="block text-lg font-semibold mb-4 text-gray-600">Select Your Crop</label>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {crops.map((crop) => (
                                <motion.div
                                    key={crop.name}
                                    onClick={() => setSelectedCrop(crop.name)}
                                    className={`p-4 border-2 rounded-xl text-center cursor-pointer transition-all duration-300 ${selectedCrop === crop.name ? 'border-green-500 bg-green-50' : 'border-gray-200 bg-white'
                                        }`}
                                    whileHover={{ scale: 1.05 }}
                                >
                                    <div className="text-4xl">{crop.icon}</div>
                                    <p className="mt-2 font-semibold">{crop.name}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Soil Type Selection */}
                    <div className="mb-8">
                        <label className="block text-lg font-semibold mb-4 text-gray-600">Select Soil Type</label>
                        <div className="flex flex-wrap gap-3">
                            {soilTypes.map((soil) => (
                                <button
                                    type="button"
                                    key={soil}
                                    onClick={() => setSelectedSoil(soil)}
                                    className={`px-4 py-2 rounded-full text-sm font-medium border-2 transition-colors duration-300 ${selectedSoil === soil ? 'bg-green-600 text-white border-green-600' : 'bg-gray-100 text-gray-700 border-gray-200'
                                        }`}
                                >
                                    {soil}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Soil and Weather Parameters */}
                    <div className="mb-8">
                        <label className="block text-lg font-semibold mb-6 text-gray-600">Enter Soil & Weather Data</label>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <input name="temperature" type="number" value={soilData.temperature} onChange={handleSoilDataChange} placeholder="Temperature (°C)" className="w-full px-4 py-3 bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" required />
                            <input name="humidity" type="number" value={soilData.humidity} onChange={handleSoilDataChange} placeholder="Humidity (%)" className="w-full px-4 py-3 bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" required />
                            <input name="moisture" type="number" value={soilData.moisture} onChange={handleSoilDataChange} placeholder="Moisture (%)" className="w-full px-4 py-3 bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" required />
                            <input name="nitrogen" type="number" value={soilData.nitrogen} onChange={handleSoilDataChange} placeholder="Nitrogen (kg/ha)" className="w-full px-4 py-3 bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" required />
                            <input name="potassium" type="number" value={soilData.potassium} onChange={handleSoilDataChange} placeholder="Potassium (kg/ha)" className="w-full px-4 py-3 bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" required />
                            <input name="phosphorous" type="number" value={soilData.phosphorous} onChange={handleSoilDataChange} placeholder="Phosphorous (kg/ha)" className="w-full px-4 py-3 bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" required />
                        </div>
                    </div>

                    {/* Submit Button */}
                    <motion.button
                        type="submit"
                        className="w-full py-4 bg-green-600 text-white rounded-lg font-semibold text-lg shadow-md hover:bg-green-700 transition-colors duration-300"
                        whileHover={{ scale: 1.02 }}
                    >
                        Get Fertilizer Recommendation
                    </motion.button>
                </form>

                {/* Recommendation Result */}
                {recommendation && (
                    <motion.div
                        className="mt-8 p-6 bg-green-50 border-l-4 border-green-500 rounded-r-lg"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <h3 className="text-xl font-bold text-green-800">Recommended Fertilizer:</h3>
                        <p className="mt-2 text-gray-700 text-2xl font-semibold">{recommendation}</p>
                    </motion.div>
                )}
            </div>
        </div>
    );
}

 