import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

// You can get a free API key from openweathermap.org
const API_KEY = "ca9e8e57d54ac1ce482f9360de8f2437";

// Helper to get weather icons
const getWeatherIcon = (condition) => {
    switch (condition) {
        case "Rain": return "🌧";
        case "Clouds": return "☁";
        case "Clear": return "☀";
        case "Thunderstorm": return "⛈";
        case "Snow": return "❄";
        case "Drizzle": return "🌦";
        default: return "🌥";
    }
};

// Static data for alerts
const weatherAlerts = [
    { type: "Heavy Rain Warning", time: "Today, 3:00 PM - 8:00 PM", color: "red" },
    { type: "Heat Wave Alert", time: "Tomorrow, All Day", color: "orange" },
    { type: "Strong Winds Expected", time: "Wednesday, Morning", color: "blue" },
];

// Map colors to full Tailwind CSS class names
const alertColorClasses = {
    red: {
        container: "bg-red-100 border-red-500",
        title: "text-red-800",
        time: "text-red-600",
    },
    orange: {
        container: "bg-orange-100 border-orange-500",
        title: "text-orange-800",
        time: "text-orange-600",
    },
    blue: {
        container: "bg-blue-100 border-blue-500",
        title: "text-blue-800",
        time: "text-blue-600",
    },
};

const recommendations = [
    { title: "Crop Recommendations", desc: "Based on current weather patterns, consider planting rice, soybeans, or maize.", link: "#" },
    { title: "Irrigation Advisory", desc: "Hold irrigation for the next 3 days due to expected rainfall. Resume light irrigation on Friday.", link: "#" },
    { title: "Pest Alert", desc: "High humidity levels increase risk of fungal diseases. Monitor crops for early signs.", link: "#" },
];

export default function WeatherPage() {
    const [city, setCity] = useState("Pune"); // Default city
    const [weatherData, setWeatherData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [searchInput, setSearchInput] = useState("");

    useEffect(() => {
        if (city) fetchWeather(city);
    }, [city]);

    async function fetchWeather(cityName) {
        setLoading(true);
        setError("");
        try {
            const res = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${API_KEY}&units=metric`);
            const data = await res.json();

            if (data.cod !== "200") {
                setError(data.message || "City not found.");
                setWeatherData(null);
                return;
            }

            // Process data for UI
            const dailyForecasts = {};
            data.list.forEach(item => {
                const date = item.dt_txt.split(' ')[0];
                if (!dailyForecasts[date]) {
                    dailyForecasts[date] = {
                        temps: [],
                        humidities: [],
                        winds: [],
                        conditions: {},
                    };
                }
                dailyForecasts[date].temps.push(item.main.temp);
                dailyForecasts[date].humidities.push(item.main.humidity);
                dailyForecasts[date].winds.push(item.wind.speed);
                const condition = item.weather[0].main;
                dailyForecasts[date].conditions[condition] = (dailyForecasts[date].conditions[condition] || 0) + 1;
            });
            
            const processedForecast = Object.entries(dailyForecasts).map(([date, values]) => {
                const day = new Date(date);
                return {
                    date: day.toLocaleDateString('en-US', { weekday: 'long' }),
                    shortDate: day.toLocaleDateString('en-US', { weekday: 'short' }),
                    temp_max: Math.round(Math.max(...values.temps)),
                    temp_min: Math.round(Math.min(...values.temps)),
                    humidity: Math.round(values.humidities.reduce((a, b) => a + b, 0) / values.humidities.length),
                    wind: Math.round(Math.max(...values.winds) * 3.6), // m/s to km/h
                    condition: Object.keys(values.conditions).reduce((a, b) => values.conditions[a] > values.conditions[b] ? a : b),
                };
            }).slice(0, 7);

            setWeatherData({
                current: {
                    city: data.city.name,
                    country: data.city.country,
                    temp: Math.round(data.list[0].main.temp),
                    condition: data.list[0].weather[0].main,
                    humidity: data.list[0].main.humidity,
                    wind: Math.round(data.list[0].wind.speed * 3.6), // m/s to km/h
                    icon: getWeatherIcon(data.list[0].weather[0].main),
                },
                daily: processedForecast.slice(0, 6),
                weekly: processedForecast,
            });

        } catch (err) {
            console.error("Error fetching weather:", err);
            setError("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    }

    const handleSearch = () => {
        if (searchInput.trim()) {
            setCity(searchInput.trim());
        }
    };

    return (
        <div className="bg-gray-100 min-h-screen">
            {/* Header */}
            <header className="bg-white shadow-sm p-4 flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-800">Weather Dashboard</h1>
                <div className="relative">
                    <input
                        type="text"
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                        placeholder="Search location..."
                        className="pl-4 pr-10 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                </div>
            </header>

            <main className="p-4 md:p-8">
    {loading ? (
        <div className="text-center py-10">Loading weather data...</div>
    ) : error ? (
        <div className="text-center py-10 text-red-500 font-semibold">{error}</div>
    ) : weatherData && (
        <>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column */}
                <div className="lg:col-span-2 space-y-8">
                    {/* Real-Time Forecast Card */}
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="relative rounded-xl shadow-lg text-white overflow-hidden">
                        <video src="https://cdn.pixabay.com/video/2023/04/11/158384-816637349_large.mp4" autoPlay loop muted className="absolute top-0 left-0 w-full h-full object-cover z-0"></video>
                        <div className="absolute inset-0 bg-black/50 z-10"></div>
                        <div className="relative p-6 z-20">
                            <h2 className="text-2xl font-bold">{weatherData.current.city}, {weatherData.current.country}</h2>
                            <p>{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</p>
                            <div className="flex items-center justify-between mt-4">
                                <div>
                                    <p className="text-7xl font-bold">{weatherData.current.temp}°C</p>
                                    <p className="text-xl">{weatherData.current.condition}</p>
                                </div>
                                <p className="text-8xl">{weatherData.current.icon}</p>
                            </div>
                            <div className="flex justify-between mt-6 text-sm">
                                <span>Humidity: {weatherData.current.humidity}%</span>
                                <span>Wind: {weatherData.current.wind} km/h</span>
                            </div>
                        </div>
                    </motion.div>

                    {/* Daily Forecast */}
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
                        <h3 className="text-xl font-bold mb-4">Daily Forecast</h3>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
                            {weatherData.daily.map((day, i) => (
                                <div key={i} className="bg-white p-4 rounded-xl shadow text-center">
                                    <p className="font-bold">{i === 0 ? "Today" : day.shortDate}</p>
                                    <p className="text-3xl my-2">{getWeatherIcon(day.condition)}</p>
                                    <p className="font-semibold">{day.temp_max}°C</p>
                                    <p className="text-sm text-gray-500">{day.condition}</p>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Weekly Forecast Table */}
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }}>
                        <h3 className="text-xl font-bold mb-4">Weekly Forecast</h3>
                        <div className="bg-white p-4 rounded-xl shadow overflow-x-auto">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="border-b">
                                        <th className="py-2 px-2">Day</th>
                                        <th className="px-2">Condition</th>
                                        <th className="px-2">Temp</th>
                                        <th className="px-2">Humidity</th>
                                        <th className="px-2">Wind</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {weatherData.weekly.map((day, i) => (
                                        <tr key={i} className="border-b last:border-b-0">
                                            <td className="py-3 px-2 font-semibold">{day.date}</td>
                                            <td className="px-2">{day.condition}</td>
                                            <td className="px-2">{day.temp_max}° / {day.temp_min}°C</td>
                                            <td className="px-2">{day.humidity}%</td>
                                            <td className="px-2">{day.wind} km/h</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </motion.div>
                </div>

                {/* Right Column */}
                <div className="space-y-8">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }} className="bg-white p-6 rounded-xl shadow">
                        <h3 className="text-xl font-bold mb-4">Weather Alerts</h3>
                        <div className="space-y-3">
                            {weatherAlerts.map((alert, i) => {
                                const colors = alertColorClasses[alert.color] || alertColorClasses.blue;
                                return (
                                    <div key={i} className={`p-3 rounded-lg border-l-4 ${colors.container}`}>
                                        <p className={`font-bold ${colors.title}`}>{alert.type}</p>
                                        <p className={`text-sm ${colors.time}`}>{alert.time}</p>
                                    </div>
                                );
                            })}
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Recommendations */}
            <div className="mt-8">
                <h3 className="text-xl font-bold mb-4">Advisories</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {recommendations.map((rec, i) => (
                        <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.5 + i * 0.1 }} className="bg-white p-6 rounded-xl shadow">
                            <h4 className="font-bold text-lg mb-2">{rec.title}</h4>
                            <p className="text-gray-600 text-sm mb-4">{rec.desc}</p>
                            <a href={rec.link} className="font-semibold text-green-600 hover:underline">Learn More →</a>
                        </motion.div>
                    ))}
                </div>
            </div>
  
        </>
    )}
</main>
        </div>
    );
}