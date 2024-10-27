"use client";

import axios from "axios";
import Image from "next/image";
import { useState } from "react";
import { IoMdSend } from "react-icons/io";

export default function Home() {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userInput) return;
    const newMessage = { sender: 'user', text: userInput };
    setMessages((prevMessages) => [...prevMessages, newMessage]);

    try {
      const response = await axios.post('/api/chat',
        {text: userInput},
      );
      const botMessage = { sender: 'bot', text: response.data.output };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
      setUserInput("");
    } catch (error) {
      console.error(error)
    }

  }

  return (
    <div className="my-8 w-[600px] mx-auto">
      <h1 className="mb-4 text-2xl font-bold text-white">Geminai Chatbot</h1>
      <div className="h-[500px] rounded-lg shadow-lg overflow-y-scroll bg-gradient-to-b from-gray-400 to-black">
        {messages.map((msg, index) => (
          <div key={index}
            className={`p-4 mb-4 text-white ${msg.sender === 'user' ? 'text-right' : 'text-left'}`}
            >
            <span className="font-bold">{msg.sender === 'user' ? 'You: ' : 'AI: '}</span>
            <span>{msg.text}</span>
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="flex mt-4">
        <input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Geminai에게 궁금한걸 물어보세요!"
          className="bg-[#2f2f2f] focus:outline-none  text-white flex-1 p-4 rounded-full shadow-xl"
        />
        <button type="submit" >
          <IoMdSend className="m-2 text-4xl text-white"/>
        </button>
      </form>
    </div>
  );
}
