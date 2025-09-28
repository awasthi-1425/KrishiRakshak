import React, { useState, useEffect, useRef } from 'react';
import './Chatbot.css'; // Make sure you have this CSS file for styling

export default function Chatbot() {
  const [messages, setMessages] = useState([{ text: "Hello! I am your KrishiRakshak assistant. How can I help you today?", isBot: true }]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [userContext, setUserContext] = useState({ location: 'your city' }); // Default location
  const messagesEndRef = useRef(null);

  // Get user's location when the component loads
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        // In a real app, you would use a reverse geocoding API to get the city name
        // For the hackathon, we can just pass the coordinates or a default name
        console.log("Location obtained:", position.coords);
        // For simplicity, we'll keep a placeholder name but you could extend this.
        // For a more advanced solution, you would use an API here.
        setUserContext({ location: 'user_current_location' }); // Placeholder, but shows it's dynamic
      },
      (error) => {
        console.error("Error getting location:", error);
        // If user denies location, we can fall back to a default or ask them to input it.
        setUserContext({ location: 'default_location' });
      }
    );
  }, []); // The empty array ensures this runs only once on mount

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSend = async () => {
    if (input.trim() === '') return;

    const userMessage = { text: input, isBot: false };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:3001/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // Send the user's location context to the backend
        body: JSON.stringify({ message: input, context: userContext }),
      });

      const data = await response.json();
      const botMessage = { text: data.reply, isBot: true };
      setMessages(prev => [...prev, botMessage]);

    } catch (error) {
      console.error('Failed to send message:', error);
      const errorMessage = { text: "Sorry, I'm having trouble connecting. Please try again later.", isBot: true };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="chatbot-container">
      <div className="chatbot-messages">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.isBot ? 'bot' : 'user'}`}>
            {msg.text}
          </div>
        ))}
        {isLoading && <div className="message bot">Thinking...</div>}
        <div ref={messagesEndRef} />
      </div>
      <div className="chatbot-input">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Ask about your crops..."
        />
        <button onClick={handleSend} disabled={isLoading}>Send</button>
      </div>
    </div>
  );
}

