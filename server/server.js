import express from 'express';
import cors from 'cors';
import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';
import process from 'process';
import fetch from 'node-fetch'; // `npm install node-fetch` ইনস্টল করা নিশ্চিত করুন

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// --- API Keys ---
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const WEATHER_API_KEY = process.env.OPENWEATHER_API_KEY;
if (!GEMINI_API_KEY || !WEATHER_API_KEY) {
    throw new Error("API keys are not set in the .env file");
}
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);


// --- আপনার কাস্টম টুলস (একটি আসল আবহাওয়ার ফাংশন সহ) ---

// আপডেটেড: এই ফাংশনটি এখন একটি লাইভ আবহাওয়া API কল করে
const get_weather = async (location) => {
    console.log(`TOOL: Fetching REAL weather for ${location}`);
    if (!location) return { error: "Location not provided" };
    
    // হ্যাকাথনের জন্য, যদি জিওলোকেশন ব্যর্থ হয়, আমরা একটি ডিফল্টে ফিরে যাই।
    if (location === 'user_current_location' || location === 'default_location') {
        location = "Lucknow"; // যদি GPS ব্যর্থ হয় তবে একটি সংবেদনশীল ডিফল্ট।
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${WEATHER_API_KEY}&units=metric`;
    
    try {
        const response = await fetch(url);
        const data = await response.json();
        if (data.cod !== 200) {
            return { error: data.message };
        }
        return { 
            forecast: data.weather[0].description, 
            temp_c: data.main.temp,
            humidity: data.main.humidity
        };
    } catch (error) {
        console.error("Weather API error:", error);
        return { error: "Could not fetch weather data." };
    }
};

const get_disease_treatment = (disease_name) => {
    console.log(`TOOL: Fetching treatment for ${disease_name}`);
    // একটি আসল অ্যাপে, আপনি treatments.json ফাইল থেকে এটি পড়বেন।
    // এটি হ্যাকাথনের জন্য একটি মক প্রতিক্রিয়া।
    return ["Apply fungicides.", "Prune vines."];
};


const available_tools = {
    get_weather,
    get_disease_treatment,
};

// Gemini API এর জন্য আপনার টুলস বর্ণনা করুন
const tool_descriptions = [
    {
        "name": "get_weather",
        "description": "Get the current weather forecast for a given location.",
        "parameters": {
            "type": "OBJECT",
            "properties": { "location": { "type": "STRING", "description": "The city or area." } },
            "required": ["location"]
        }
    },
    {
        "name": "get_disease_treatment",
        "description": "Provides a list of treatment steps for a specific plant disease.",
        "parameters": {
            "type": "OBJECT",
            "properties": { "disease_name": { "type": "STRING", "description": "The name of the disease." } },
            "required": ["disease_name"]
        }
    },
];


// API এন্ডপয়েন্ট যা আপনার React অ্যাপ কল করবে
app.post('/api/chat', async (req, res) => {
  try {
    const { message, context } = req.body;
    console.log("Received message:", message, "with context:", context);

    const model = genAI.getGenerativeModel({ model: 'gemini-pro', tools: tool_descriptions });
    const chat = model.startChat();
    
    const personalizedPrompt = `Context: The user is a farmer in ${context.location}. User's question: "${message}"`;
    
    const result = await chat.sendMessage(personalizedPrompt);
    const response = result.response;
    const call = response.functionCalls && response.functionCalls()[0];

    if (call) {
        console.log("Model wants to call tool:", call.name);
        const { name, args } = call;
        const functionToCall = available_tools[name];

        // অ্যাসিঙ্ক ফাংশনগুলি পরিচালনা করুন (যেমন আমাদের নতুন আবহাওয়া টুল)
        const toolResponse = await functionToCall(...Object.values(args));

        const result2 = await chat.sendMessage([
            { functionResponse: { name, response: { result: toolResponse } } }
        ]);
        
        const finalResponse = result2.response.text();
        res.json({ reply: finalResponse });

    } else {
        const text = response.text();
        res.json({ reply: text });
    }

  } catch (error) {
    console.error('Error in /api/chat:', error);
    res.status(500).json({ error: 'Failed to get response from AI' });
  }
});


const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

