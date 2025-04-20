"use client";

import { useState, useEffect } from "react";

export default function FloatingChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    const savedMessages = localStorage.getItem("chatbotMessages");
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages));
    } else {
      setMessages([
        {
          role: "assistant",
          content: "Hello! 👋 How can I assist you today?",
        },
      ]);
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 10000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem("chatbotMessages", JSON.stringify(messages));
    }
  }, [messages]);

  const sendMessage = async (customMessage?: string) => {
    const content = customMessage || input;
    if (!content.trim()) return;

    const userMessage = { role: "user", content };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    try {
      const res = await fetch("/api/chatbot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [...messages, userMessage] }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessages((prev) => [...prev, { role: "assistant", content: data.reply }]);
      } else {
        alert(data.message || "Chatbot error");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong.");
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-gold-500 text-black rounded-full p-4 shadow-lg hover:bg-yellow-400 transition-transform animate-pulse transform hover:scale-110"
        >
          💬
        </button>
      )}

      {isOpen && (
        <div className="bg-[#111111] w-80 h-[500px] rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-slide-down border border-gold-500">
          {/* Header */}
          <div className="bg-black text-white p-4 flex justify-between items-center">
            <span>Jewelry Assistant</span>
            <button onClick={() => setIsOpen(false)} className="bg-gold-500 text-black px-2 rounded text-lg">×</button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-3 space-y-3">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`p-2 rounded-lg max-w-xs ${
                  m.role === "assistant" ? "bg-gold-500/20 text-gold-300 self-start" : "bg-gray-800 text-white self-end"
                }`}
              >
                {m.content}
              </div>
            ))}
          </div>

          {/* Quick Suggestions */}
          <div className="p-3 flex flex-wrap gap-2">
            <button
              onClick={() => sendMessage("💍 Show me rings")}
              className="bg-gold-500 hover:bg-yellow-400 text-black px-3 py-1 rounded-lg text-sm"
            >
              💍 Show Rings
            </button>
            <button
              onClick={() => sendMessage("🎁 Gift ideas for anniversary")}
              className="bg-gold-500 hover:bg-yellow-400 text-black px-3 py-1 rounded-lg text-sm"
            >
              🎁 Gift Ideas
            </button>
            <button
              onClick={() => sendMessage("💎 Show me necklaces")}
              className="bg-gold-500 hover:bg-yellow-400 text-black px-3 py-1 rounded-lg text-sm"
            >
              💎 Show Necklaces
            </button>
            <button
              onClick={() => sendMessage("🔖 Show discounts and offers")}
              className="bg-gold-500 hover:bg-yellow-400 text-black px-3 py-1 rounded-lg text-sm"
            >
              🔖 Discounts?
            </button>
          </div>

          {/* Input */}
          <div className="p-3 flex">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              className="flex-1 p-2 border border-gray-600 bg-gray-900 text-white rounded-l-lg placeholder-gray-400"
              placeholder="Ask me anything..."
            />
            <button
              onClick={() => sendMessage()}
              className="bg-gold-500 hover:bg-yellow-400 text-black px-4 rounded-r-lg"
            >
              ➤
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
