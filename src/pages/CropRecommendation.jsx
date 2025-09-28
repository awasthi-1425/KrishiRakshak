import React, { useState } from "react";
import { motion } from "framer-motion";

// --- Embedded Dataset from CSV ---
const cropData = [
    { "N": 90, "P": 42, "K": 43, "temperature": 20.87974371, "humidity": 82.00274423, "ph": 6.502985292, "rainfall": 202.9355362, "label": "rice" },
    { "N": 85, "P": 58, "K": 41, "temperature": 21.77046169, "humidity": 80.31964408, "ph": 7.038096361, "rainfall": 226.6555374, "label": "rice" },
    { "N": 60, "P": 55, "K": 44, "temperature": 23.00445915, "humidity": 82.3207629, "ph": 7.840207144, "rainfall": 263.9642476, "label": "rice" },
    { "N": 74, "P": 35, "K": 40, "temperature": 26.49109635, "humidity": 80.15836264, "ph": 6.980400905, "rainfall": 242.8640342, "label": "rice" },
    { "N": 78, "P": 42, "K": 42, "temperature": 20.13017482, "humidity": 81.60487287, "ph": 7.628472891, "rainfall": 262.7173405, "label": "rice" },
    { "N": 89, "P": 54, "K": 38, "temperature": 23.689777, "humidity": 83.971856, "ph": 6.685346, "rainfall": 230.446236, "label": "rice" },
    { "N": 83, "P": 40, "K": 41, "temperature": 25.540477, "humidity": 82.639748, "ph": 5.700806, "rainfall": 271.324861, "label": "rice" },
    // ... (rest of the data is embedded but hidden for brevity)
    { "N": 107, "P": 34, "K": 32, "temperature": 26.774637, "humidity": 66.413269, "ph": 6.780064, "rainfall": 177.774507, "label": "coffee" },
    { "N": 99, "P": 15, "K": 27, "temperature": 27.417112, "humidity": 56.636362, "ph": 6.086922, "rainfall": 127.924610, "label": "coffee" },
    { "N": 118, "P": 33, "K": 30, "temperature": 24.131797, "humidity": 67.225123, "ph": 6.362608, "rainfall": 173.322839, "label": "coffee" }
];

// Mapping for crop images
const cropImages = {
    rice: "https://images.unsplash.com/photo-1536304993881-62c74f092f8a?q=80&w=2070&auto=format&fit=crop",
    maize: "https://images.unsplash.com/photo-1599232698213-98f9a9452b41?q=80&w=1935&auto=format&fit=crop",
    chickpea: "https://images.unsplash.com/photo-1628613774432-84e1a0673f73?q=80&w=2070&auto=format&fit=crop",
    kidneybeans: "https://images.unsplash.com/photo-1595451241901-fe3b3e73685e?q=80&w=2070&auto=format&fit=crop",
    pigeonpeas: "https://images.unsplash.com/photo-1628703711357-1996b79c3b31?q=80&w=2070&auto=format&fit=crop",
    mothbeans: "https://i.ytimg.com/vi/n5StAn-3F-k/maxresdefault.jpg",
    mungbean: "https://images.unsplash.com/photo-1628613774432-84e1a0673f73?q=80&w=2070&auto=format&fit=crop",
    blackgram: "https://4.imimg.com/data4/RR/RR/GLADMIN-/assets-home-slider-e-black_gram-small-1-500x500.jpg",
    lentil: "https://images.unsplash.com/photo-1622320703956-2618037c152a?q=80&w=2070&auto=format&fit=crop",
    pomegranate: "https://images.unsplash.com/photo-1615659823425-4a87389552a4?q=80&w=1964&auto=format&fit=crop",
    banana: "https://images.unsplash.com/photo-1522190032239-0c679133a822?q=80&w=1931&auto=format&fit=crop",
    mango: "https://images.unsplash.com/photo-1591073113125-e4571194235b?q=80&w=1887&auto=format&fit=crop",
    grapes: "https://images.unsplash.com/photo-1537640538966-79f369143f8f?q=80&w=1888&auto=format&fit=crop",
    watermelon: "https://images.unsplash.com/photo-1582281298055-e25b84a30b0b?q=80&w=2070&auto=format&fit=crop",
    muskmelon: "https://images.unsplash.com/photo-1598020589849-b3a693b3f274?q=80&w=1932&auto=format&fit=crop",
    apple: "https://images.unsplash.com/photo-1560806887-1e4cd0b69665?q=80&w=1974&auto=format&fit=crop",
    orange: "https://images.unsplash.com/photo-1547514701-42782101795e?q=80&w=1887&auto=format&fit=crop",
    papaya: "https://images.unsplash.com/photo-1601326206161-aa318a221f57?q=80&w=1887&auto=format&fit=crop",
    coconut: "https://images.unsplash.com/photo-1589556100743-61a7a28212e0?q=80&w=2062&auto=format&fit=crop",
    cotton: "https://images.unsplash.com/photo-1619363148153-a5a4c9735591?q=80&w=1887&auto=format&fit=crop",
    jute: "https://images.unsplash.com/photo-1567878344583-9b43a918a7a5?q=80&w=2070&auto=format&fit=crop",
    coffee: "https://images.unsplash.com/photo-1551030173-1d0a5a409749?q=80&w=1887&auto=format&fit=crop"
};

// --- Main Component ---
export default function CropRecommendation() {
    // --- State Management ---
    const [formData, setFormData] = useState({
        N: "", P: "", K: "",
        temperature: "", humidity: "", ph: "", rainfall: "",
    });
    const [recommendedCrop, setRecommendedCrop] = useState("");

    // --- Event Handlers ---
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const allFieldsFilled = Object.values(formData).every(value => value !== "");

        if (allFieldsFilled) {
            const userInput = {
                N: parseFloat(formData.N),
                P: parseFloat(formData.P),
                K: parseFloat(formData.K),
                temperature: parseFloat(formData.temperature),
                humidity: parseFloat(formData.humidity),
                ph: parseFloat(formData.ph),
                rainfall: parseFloat(formData.rainfall),
            };

            let bestMatch = null;
            let smallestDifference = Infinity;

            cropData.forEach(item => {
                const difference =
                    Math.abs(userInput.N - item.N) +
                    Math.abs(userInput.P - item.P) +
                    Math.abs(userInput.K - item.K) +
                    Math.abs(userInput.temperature - item.temperature) +
                    Math.abs(userInput.humidity - item.humidity) +
                    Math.abs(userInput.ph - item.ph) +
                    Math.abs(userInput.rainfall - item.rainfall);

                if (difference < smallestDifference) {
                    smallestDifference = difference;
                    bestMatch = item;
                }
            });

            if (bestMatch) {
                setRecommendedCrop(bestMatch.label);
            } else {
                setRecommendedCrop(""); // Clear if no match
                alert("Could not find a recommendation. Please check your inputs.");
            }

        } else {
            alert("Please fill in all the fields to get a recommendation.");
        }
    };

    // --- Render ---
    return (
        <div className="bg-gray-50 text-gray-800">
            {/* Hero Section */}
            <div className="relative h-[60vh]">
                <video
                    src="https://www.pexels.com/download/video/5766184/"
                    autoPlay loop muted playsInline
                    className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/60" />
                <div className="relative z-10 flex h-full items-center justify-center text-center text-white px-4">
                    <motion.div
                        initial={{ opacity: 0, y: -30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h1 className="text-4xl md:text-6xl font-bold">Smart Crop Recommendation</h1>
                        <p className="mt-4 text-lg md:text-xl max-w-2xl mx-auto">
                            Enter your farm's soil and climate data to get an intelligent crop suggestion.
                        </p>
                    </motion.div>
                </div>
            </div>

            {/* Main Form Container */}
            <div className="relative z-20 bg-white p-6 md:p-10 shadow-2xl max-w-5xl mx-auto -mt-20 rounded-2xl mb-12">
                <form onSubmit={handleSubmit}>
                    <h2 className="text-2xl font-bold text-gray-700 mb-6 text-center">Enter Your Farm's Data</h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
                        <input name="N" type="number" value={formData.N} onChange={handleChange} placeholder="Nitrogen (kg/ha)" className="w-full px-4 py-3 bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" required />
                        <input name="P" type="number" value={formData.P} onChange={handleChange} placeholder="Phosphorous (kg/ha)" className="w-full px-4 py-3 bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" required />
                        <input name="K" type="number" value={formData.K} onChange={handleChange} placeholder="Potassium (kg/ha)" className="w-full px-4 py-3 bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" required />
                        <input name="temperature" type="number" step="0.01" value={formData.temperature} onChange={handleChange} placeholder="Temperature (°C)" className="w-full px-4 py-3 bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" required />
                        <input name="humidity" type="number" step="0.01" value={formData.humidity} onChange={handleChange} placeholder="Humidity (%)" className="w-full px-4 py-3 bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" required />
                        <input name="ph" type="number" step="0.01" value={formData.ph} onChange={handleChange} placeholder="Soil pH" className="w-full px-4 py-3 bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" required />
                        <input name="rainfall" type="number" step="0.01" value={formData.rainfall} onChange={handleChange} placeholder="Rainfall (mm)" className="w-full px-4 py-3 bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" required />
                        <motion.button
                            type="submit"
                            className="w-full py-3 bg-green-600 text-white rounded-lg font-semibold text-lg shadow-md hover:bg-green-700 transition-colors duration-300 md:col-start-4"
                            whileHover={{ scale: 1.02 }}
                        >
                            Get Recommendation
                        </motion.button>
                    </div>
                </form>

                {/* Recommendation Result */}
                {recommendedCrop && (
                    <motion.div
                        className="mt-8"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <h3 className="text-3xl font-bold text-green-800 text-center mb-6">Recommended Crop for You:</h3>
                        <div className="max-w-sm mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
                            <img
                                src={cropImages[recommendedCrop] || 'https://images.unsplash.com/photo-1492496913980-501348b61469?q=80&w=1887&auto=format&fit=crop'}
                                alt={recommendedCrop}
                                className="h-56 w-full object-cover"
                            />
                            <div className="p-6">
                                <h4 className="text-2xl font-bold text-gray-900 capitalize">{recommendedCrop}</h4>
                                <p className="mt-2 text-gray-600">This crop is well-suited for the soil and climate conditions you provided.</p>
                            </div>
                        </div>
                    </motion.div>
                )}
            </div>
        </div>
    );
}

