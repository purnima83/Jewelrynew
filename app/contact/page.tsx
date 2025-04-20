"use client";

import { useState } from "react";
import { toast } from "react-hot-toast";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // ✅ Success toast
    toast.success("Your message has been sent successfully! ✨");

    // ✅ Reset form
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="container mx-auto px-6 py-12 text-center">
      {/* Header */}
      <h1 className="text-5xl font-bold text-gold-500 mb-8">Get in Touch</h1>

      <p className="text-gray-300 max-w-2xl mx-auto mb-12 leading-relaxed text-lg">
        Whether you have a question about a product, want to customize a piece, or simply say hello, we’re here for you. ✨
      </p>

      {/* Contact Form */}
      <div className="bg-black bg-opacity-40 rounded-lg p-8 max-w-2xl mx-auto shadow-lg">
        <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            className="px-4 py-3 rounded-md bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gold-500"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            className="px-4 py-3 rounded-md bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gold-500"
            required
          />
          <textarea
            name="message"
            placeholder="Your Message"
            rows={5}
            value={formData.message}
            onChange={handleChange}
            className="px-4 py-3 rounded-md bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gold-500"
            required
          ></textarea>
          <button
            type="submit"
            className="bg-gold-500 hover:bg-yellow-400 text-black font-semibold py-3 rounded-md transition"
          >
            Send Message
          </button>
        </form>
      </div>

      {/* Store Info */}
      <div className="mt-16 text-gray-400">
        <p>📍 Jewelry Store, 123 Diamond Street, Cityname</p>
        <p>📞 +1 (123) 456-7890</p>
        <p>✉️ hello@jewelrystore.com</p>
      </div>
    </div>
  );
}
