import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// Corrected paths to include the .jsx file extension
import Home from "./pages/Home.jsx";
import Weather from "./pages/Weather.jsx";
import CropCalendar from "./pages/CropCalendar.jsx";
import CropDisease from "./pages/CropDisease.jsx";
import FertilizerRecommendation from "./pages/FertilizerRecommendation.jsx";
import CropRecommendation from "./pages/CropRecommendation.jsx";
import FarmerCommunity from "./pages/FarmerCommunity.jsx";
import Marketplace from "./pages/Marketplace.jsx";
import LabourScheduling from "./pages/LabourScheduling.jsx";

// Make sure you have created a 'components' folder inside 'src' for the chatbot
import FloatingChatbot from "./components/FloatingChatbot.jsx";

export default function App() {
  return (
    <BrowserRouter>
      {/* This Routes component handles all your page navigation */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/weather" element={<Weather />} />
        <Route path="/cropcalendar" element={<CropCalendar />} />
        <Route path="/farmercommunity" element={<FarmerCommunity />} />
        <Route path="/croprecommendation" element={<CropRecommendation />} />
        <Route
          path="/fertilizerrecommendation"
          element={<FertilizerRecommendation />}
        />
        <Route path="/cropdisease" element={<CropDisease />} />
        <Route path="/marketplace" element={<Marketplace />} />
        <Route path="/labourscheduling" element={<LabourScheduling />} />
      </Routes>

      {/* Add the FloatingChatbot here, outside the Routes */}
      <FloatingChatbot />
    </BrowserRouter>
  );
}

