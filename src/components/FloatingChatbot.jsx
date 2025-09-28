import React, { useState, useRef, useEffect } from 'react';

// --- 1. GET YOUR API KEY ---
// IMPORTANT: Replace "YOUR_API_KEY_HERE" with your key from Google AI Studio.
const API_KEY = "AIzaSyDd26nXEtcmvv6GjP7G0324qZnm92p_Zxo";

// --- 2. RETRY LOGIC using direct fetch ---
const generateContentWithRetry = async (userText, maxRetries = 3) => {
  if (!API_KEY || API_KEY === "YOUR_API_KEY_HERE") {
    throw new Error("API Key not configured.");
  }

  const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`;
  const prompt = `You are KrishiRakshak AI, an expert AI assistant for Indian farmers. Your name is KrishiRakshak. Answer the following question in a helpful and clear manner, primarily in English. If the user asks a question in Hindi, you can reply in Hindi. Question: ${userText}`;
  
  const payload = {
    contents: [{ parts: [{ text: prompt }] }]
  };

  let attempt = 0;
  let delay = 2000;

  while (attempt < maxRetries) {
    try {
      const apiResponse = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (apiResponse.status === 503) {
        throw new Error('503'); // Trigger retry for overloaded model
      }

      if (!apiResponse.ok) {
        const errorData = await apiResponse.json();
        console.error("API Error:", errorData);
        throw new Error(`API request failed with status ${apiResponse.status}`);
      }

      const data = await apiResponse.json();
      
      if (data.candidates && data.candidates[0] && data.candidates[0].content && data.candidates[0].content.parts && data.candidates[0].content.parts[0]) {
        return data.candidates[0].content.parts[0].text;
      } else {
        return "I'm sorry, I couldn't generate a response. Please try rephrasing your question.";
      }

    } catch (error) {
      attempt++;
      if (attempt >= maxRetries) throw error;
      
      if (error.message.includes('503')) {
        console.log(`Model overloaded. Retrying in ${delay / 1000}s... (Attempt ${attempt})`);
        await new Promise(resolve => setTimeout(resolve, delay));
        delay *= 2;
      } else {
        throw error;
      }
    }
  }
};


// --- 3. THE CHAT WINDOW COMPONENT ---
function ChatWindow({ closeChat }) {
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "Hello! I'm KrishiRakshak, your AI farm assistant. How can I help protect and improve your farm today?",
      showSuggestions: true,
    },
  ]);
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef(null);
  const recognitionRef = useRef(null);
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    // Set up Speech Recognition
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = false; // Stop listening after the user finishes speaking
      recognition.lang = 'en-IN'; // Set language to Indian English
      recognition.interimResults = true; // Enable live preview of speech

      recognition.onstart = () => setIsListening(true);
      recognition.onend = () => setIsListening(false);
      
      recognition.onresult = (event) => {
        // Correctly process interim results for live preview
        const transcript = Array.from(event.results)
          .map(result => result[0])
          .map(result => result.transcript)
          .join('');
        setInputText(transcript);
      };

      recognition.onerror = (event) => {
        console.error("Speech recognition error:", event.error);
        if (event.error === 'not-allowed') {
          console.warn("Microphone access was denied. Please allow microphone access in your browser's site settings to use this feature.");
        }
        setIsListening(false);
      };
      recognitionRef.current = recognition;
    }

    const now = new Date();
    const time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setCurrentDate(`Today, ${time}`);
  }, []);

  const handleMicClick = () => {
    if (!recognitionRef.current) {
      console.warn("Voice recognition is not supported in your browser.");
      return;
    }
    if (isListening) {
      recognitionRef.current.stop();
    } else {
      setInputText(""); // Clear text before starting
      recognitionRef.current.start();
    }
  };

  const handleSendMessage = async (userText) => {
    if (!userText || isLoading) return;

    if (isListening) {
      recognitionRef.current.stop();
    }

    const updatedMessages = messages.map(m => ({ ...m, showSuggestions: false }));
    setMessages([...updatedMessages, { sender: "user", text: userText }]);
    setInputText("");
    setIsLoading(true);

    try {
      const botText = await generateContentWithRetry(userText);
      setMessages(prev => [...prev, { sender: "bot", text: botText }]);
    } catch (error) {
      console.error("Error generating content:", error);
      let userFriendlyError = "Sorry, an error occurred.";
      if (error.message.includes('503')) {
        userFriendlyError = "AI model is busy. Please try again in a moment.";
      } else if (error.message.includes("API Key not configured")) {
        userFriendlyError = "Error: Chat service is not configured. Please check your API key.";
      }
      setMessages(prev => [...prev, { sender: "bot", text: userFriendlyError }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleSendMessage(inputText.trim());
  };

  const suggestionButtons = ["Diagnose Crop Issue", "Weather & Soil Info", "Fertilizer Calculator"];

  return (
    <div className="chatbot-window">
      <div className="chatbot-header">
        <div className="header-title">
          <svg className="header-logo" width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L1 9L4 22H20L23 9L12 2Z" fill="#38A169"/>
            <path d="M12 2L4 9V22H20V9L12 2Z" fill="url(#paint0_linear_11_2)"/>
            <path d="M17 14C17 16.7614 14.7614 19 12 19C9.23858 19 7 16.7614 7 14C7 11.2386 9.23858 9 12 9C14.7614 9 17 11.2386 17 14Z" fill="white"/>
            <path d="M12 11C10.3431 11 9 12.3431 9 14C9 15.6569 10.3431 17 12 17C13.6569 17 15 15.6569 15 14C15 12.3431 13.6569 11 12 11Z" fill="#81E6D9"/>
            <defs>
              <linearGradient id="paint0_linear_11_2" x1="12" y1="2" x2="12" y2="22" gradientUnits="userSpaceOnUse">
                <stop stopColor="#48BB78"/>
                <stop offset="1" stopColor="#38A169"/>
              </linearGradient>
            </defs>
          </svg>
          <div>
            <h1>KrishiRakshak AI</h1>
            <p>Your Farm Guardian</p>
          </div>
        </div>
        <div className="header-icons">
          <span 
            title="Menu" 
            style={{cursor: 'pointer', userSelect: 'none'}} 
            onClick={() => console.log('Menu icon clicked!')}
          >
            &#9776;
          </span>
          <button onClick={closeChat} className="close-btn" title="Close Chat">&times;</button>
        </div>
      </div>
      <div className="chatbot-messages">
        <div className="timestamp">{currentDate}</div>
        {messages.map((msg, index) => (
          <div key={index} className="message-container">
            <div className={`message ${msg.sender}`}><p>{msg.text}</p></div>
            {msg.showSuggestions && (
              <div className="suggestion-buttons">
                {suggestionButtons.map(text => (
                  <button key={text} onClick={() => handleSendMessage(text)}>
                    {text}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
        {isLoading && (
          <div className="message bot loading">
            <div className="dot"></div><div className="dot"></div><div className="dot"></div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <div className="chatbot-footer">
        <div className="chatbot-input-form">
          <span 
            className={`mic-icon ${isListening ? 'listening' : ''}`} 
            onClick={handleMicClick} 
            title="Use Microphone"
          >
            &#127908;
          </span>
          <form onSubmit={handleFormSubmit} style={{width: '100%'}}>
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Type or Ask KrishiRakshak..."
              disabled={isLoading}
            />
          </form>
        </div>
        <div className="footer-links">
          <a href="#" onClick={(e) => { e.preventDefault(); console.log('Terms to Use link clicked.'); }} title="View Terms of Use">Terms to Use</a>
          <a href="#" onClick={(e) => { e.preventDefault(); console.log('Privacy Policy link clicked.'); }} title="View Privacy Policy">Privacy Policy</a>
          <span>Powered by AgriAI & FarmGPT</span>
        </div>
      </div>
    </div>
  );
}

// --- 4. FLOATING WIDGET COMPONENT ---
export default function FloatingChatbot() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <style>{`
        body { margin: 0; font-family: 'Inter', sans-serif; }
        .floating-chat-btn-container { position: fixed; bottom: 30px; right: 30px; width: 130px; height: 130px; cursor: pointer; z-index: 999; transition: transform 0.2s ease; }
        .floating-chat-btn-container:hover { transform: scale(1.1); }
        .floating-chat-btn-svg-text { position: absolute; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none; fill: white; font-family: sans-serif; font-weight: bold; font-size: 15px; text-transform: uppercase; letter-spacing: 1px; }
        .floating-chat-btn { width: 100%; height: 100%; border-radius: 50%; background-color: #4CAF50; border: 8px solid #2E7D32; box-sizing: border-box; display: flex; justify-content: center; align-items: center; padding: 20px; }
        .floating-chat-btn img { width: 100%; height: 100%; border-radius: 50%; object-fit: cover; }
        
        .chatbot-window-container { position: fixed; bottom: 30px; right: 30px; width: 100%; max-width: 420px; height: 90vh; max-height: 700px; z-index: 1000; transition: opacity 0.3s ease, transform 0.3s ease; opacity: 0; transform: translateY(20px); pointer-events: none; }
        .chatbot-window-container.open { opacity: 1; transform: translateY(0); pointer-events: auto; }
        
        .chatbot-window { width: 100%; height: 100%; background-color: #E6F2FF; border: 1px solid #ccc; border-radius: 16px; box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2); display: flex; flex-direction: column; overflow: hidden; }
        
        .chatbot-header { background-color: #0C5A42; color: white; padding: 10px 20px; flex-shrink: 0; display: flex; justify-content: space-between; align-items: center; }
        .header-title { display: flex; align-items: center; gap: 15px; }
        .header-title h1 { margin: 0; font-size: 1.2rem; }
        .header-title p { margin: 0; opacity: 0.8; font-size: 0.8rem; }
        .header-icons { display: flex; align-items: center; gap: 15px; font-size: 1.5rem; }
        .close-btn { background: none; border: none; color: white; font-size: 2rem; cursor: pointer; line-height: 1; padding: 0; }
        
        .chatbot-messages { flex-grow: 1; overflow-y: auto; padding: 20px; display: flex; flex-direction: column; gap: 20px; }
        .timestamp { text-align: center; color: #555; font-size: 0.8rem; margin-bottom: 10px; }
        .message-container { display: flex; flex-direction: column; gap: 10px; }
        .message { display: flex; max-width: 85%; word-wrap: break-word; }
        .message p { padding: 12px 16px; border-radius: 18px; margin: 0; line-height: 1.5; }
        .message.user { align-self: flex-end; }
        .message.user p { background-color: #D1E7FD; color: #000; }
        .message.bot { align-self: flex-start; }
        .message.bot p { background-color: #C8E6C9; color: #000; }
        
        .suggestion-buttons { display: flex; flex-direction: column; align-items: flex-start; gap: 10px; margin-left: 10px; }
        .suggestion-buttons button { background-color: #B3E5FC; border: 1px solid #81D4FA; color: #01579B; padding: 10px 15px; border-radius: 20px; cursor: pointer; transition: background-color 0.2s; }
        .suggestion-buttons button:hover { background-color: #81D4FA; }
        
        .message.loading { display: flex; align-items: center; gap: 5px; padding: 12px 16px; background-color: #C8E6C9; border-radius: 18px; }
        .dot { width: 8px; height: 8px; background-color: #555; border-radius: 50%; animation: bounce 1.4s infinite ease-in-out both; }
        .dot:nth-child(2) { animation-delay: -0.16s; }
        .dot:nth-child(3) { animation-delay: -0.32s; }
        @keyframes bounce { 0%, 80%, 100% { transform: scale(0); } 40% { transform: scale(1.0); } }
        
        .chatbot-footer { background-color: #E6F2FF; padding: 10px 20px; flex-shrink: 0; }
        .chatbot-input-form { display: flex; align-items: center; background-color: white; border-radius: 30px; padding: 5px 15px; border: 1px solid #ccc; }
        .mic-icon { font-size: 1.5rem; color: #555; margin-right: 10px; cursor: pointer; transition: color 0.2s; user-select: none; }
        .mic-icon.listening { color: #E53935; animation: pulse 1.5s infinite; }
        @keyframes pulse { 0% { transform: scale(1); } 50% { transform: scale(1.1); } 100% { transform: scale(1); } }
        .chatbot-input-form input { flex-grow: 1; border: none; padding: 10px; font-size: 1rem; background: transparent; }
        .chatbot-input-form input:focus { outline: none; }
        
        .footer-links { text-align: center; padding-top: 10px; font-size: 0.75rem; color: #666; }
        .footer-links a { color: #666; margin: 0 10px; cursor: pointer; }
      `}</style>
      
      <div className={`chatbot-window-container ${isOpen ? 'open' : ''}`}>
        <ChatWindow closeChat={() => setIsOpen(false)} />
      </div>
      
      {!isOpen && (
        <div className="floating-chat-btn-container" onClick={() => setIsOpen(true)}>
          <div className="floating-chat-btn">
            <img src="/gif.gif" alt="Open Chat" />
          </div>
          <svg className="floating-chat-btn-svg-text" viewBox="0 0 130 130">
            <path id="top-curve" fill="none" d="M 25, 65 a 40,40 0 0,1 80,0" />
            <text><textPath href="#top-curve" startOffset="50%" textAnchor="middle">Krishi Sakhi</textPath></text>
            <path id="bottom-curve" fill="none" d="M 105, 65 a 40,40 0 0,1 -80,0" />
            <text><textPath href="#bottom-curve" startOffset="50%" textAnchor="middle">Ask Question</textPath></text>
          </svg>
        </div>
      )}
    </>
  );
}
