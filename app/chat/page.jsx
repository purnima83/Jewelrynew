"use client";

import { useState } from "react";

export default function ChatbotPage() {
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Hello! 👋 I'm your Jewelry Assistant. How can I help you today?" }
  ]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
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
    <div className="flex flex-col min-h-screen p-4 bg-gray-100">
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-white rounded-lg shadow">
        {messages.map((m, i) => (
          <div
            key={i}
            className={`p-3 rounded-lg ${
              m.role === "assistant" ? "bg-blue-100 self-start" : "bg-green-100 self-end"
            } max-w-sm`}
          >
            {m.content}
          </div>
        ))}
      </div>

      <div className="flex mt-4">
        <input
          type="text"
          className="flex-1 p-3 border rounded-l-lg"
          placeholder="Ask me about jewelry..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button
          onClick={sendMessage}
          className="bg-black text-white p-3 rounded-r-lg hover:bg-gray-800"
        >
          Send
        </button>
      </div>
    </div>
  );
}
