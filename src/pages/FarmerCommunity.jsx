import React, { useState } from "react";
import { motion } from "framer-motion";
import { MessageCircle, Users, Leaf, CloudSun } from "lucide-react";

export default function FarmerCommunity() {
  const [joined, setJoined] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, name: "Ramesh", text: "Namaste dosto! 🌾 Aaj maine gehun ki nayi kheti shuru ki hai.", time: "9:10 AM" },
    { id: 2, name: "Sita", text: "Bahut accha Ramesh ji 👏 Aapne kaunsa fertilizer use kiya?", time: "9:12 AM" },
    { id: 3, name: "Arjun", text: "Kal mere yahan barish hui thi ☔, aap logon ke yahan kaisa mausam hai?", time: "9:15 AM" },
    { id: 4, name: "Meena", text: "Mujhe kheti ke liye beej kahan se milega? Koi bata skta hai? 🌱", time: "9:20 AM" },
    { id: 5, name: "Vikram", text: "Dosto, kheton me keede lag gaye h, koi upay batao 😔", time: "9:25 AM" },
    { id: 6, name: "Pooja", text: "Krishi Rakshak app se disease detect kar lo 👍 bahut helpful hai!", time: "9:27 AM" },
  ]);

  const [newMessage, setNewMessage] = useState("");

  const handleSend = () => {
    if (!newMessage.trim()) return;
    const msg = {
      id: messages.length + 1,
      name: "You",
      text: newMessage,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
    setMessages([...messages, msg]);
    setNewMessage("");
  };

  return (
    <div className="min-h-screen bg-white">
      {!joined ? (
        // Hero Section with Video Background
        <section className="relative h-screen flex items-center justify-center">
          <video
            src="https://www.pexels.com/download/video/3616641/"
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
            className="relative z-10 text-center text-white max-w-3xl bg-black/70 p-10 rounded-2xl shadow-xl"
          >
            <h1 className="text-5xl font-bold mb-4"> Farmer Community</h1>
            <p className="text-lg mb-8">
              Connect, share, and grow together with farmers across the country.
            </p>

            {/* Features with Icons */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-sm mb-8">
              <div className="flex flex-col items-center">
                <Users className="w-8 h-8 text-yellow-400 mb-2" />
                <p>1000+ Farmers</p>
              </div>
              <div className="flex flex-col items-center">
                <MessageCircle className="w-8 h-8 text-green-400 mb-2" />
                <p>Active Chats</p>
              </div>
              <div className="flex flex-col items-center">
                <Leaf className="w-8 h-8 text-lime-400 mb-2" />
                <p>Crop Guidance</p>
              </div>
              <div className="flex flex-col items-center">
                <CloudSun className="w-8 h-8 text-blue-400 mb-2" />
                <p>Weather Tips</p>
              </div>
            </div>

            <button
              onClick={() => setJoined(true)}
              className="px-8 py-3 bg-yellow-400 text-black font-bold rounded-full shadow-lg hover:bg-yellow-500 transition"
            >
              Join the Community
            </button>
          </motion.div>
        </section>
      ) : (
        // Chat Section
        <section className="h-screen flex flex-col bg-gradient-to-br from-green-50 to-green-100">
          {/* Header */}
          <div className="bg-green-700 text-white p-4 flex items-center justify-between shadow-md">
            <h2 className="text-xl font-bold">Farmer's Chat Room</h2>
            <button
              onClick={() => setJoined(false)}
              className="text-sm bg-red-500 hover:bg-red-600 px-4 py-1 rounded-lg"
            >
              Exit
            </button>
          </div>

          {/* Chat Box */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className={`flex items-end gap-2 ${msg.name === "You" ? "justify-end" : "justify-start"}`}
              >
                {/* Avatar for others */}
                {msg.name !== "You" && (
                  <div className="w-10 h-10 rounded-full bg-yellow-400 flex items-center justify-center font-bold text-gray-800 shadow">
                    {msg.name[0]}
                  </div>
                )}

                {/* Message Bubble */}
                <div
                  className={`max-w-xs p-4 rounded-2xl shadow ${
                    msg.name === "You"
                      ? "bg-gradient-to-r from-green-500 to-green-600 text-white rounded-br-none"
                      : "bg-yellow-100 text-gray-800 rounded-bl-none"
                  }`}
                >
                  <p className="font-semibold text-sm">{msg.name}</p>
                  <p>{msg.text}</p>
                  <p className="text-xs mt-1 opacity-70">{msg.time}</p>
                </div>

                {/* Avatar for You */}
                {msg.name === "You" && (
                  <div className="w-10 h-10 rounded-full bg-green-600 flex items-center justify-center font-bold text-white shadow">
                    Y
                  </div>
                )}
              </motion.div>
            ))}
          </div>

          {/* Input Box */}
          <div className="p-4 bg-white shadow-md flex gap-2">
            <input
              type="text"
              placeholder="Type your message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              className="flex-1 border border-gray-300 rounded-full px-4 py-2 focus:outline-green-600"
            />
            <button
              onClick={handleSend}
              className="px-6 py-2 bg-green-600 text-white rounded-full shadow hover:bg-green-700"
            >
              Send
            </button>
          </div>
        </section>
      )}
    </div>
  );
}
