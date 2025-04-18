"use client";

export default function ContactPage() {
  return (
    <div className="container mx-auto px-6 py-12 text-center">
      {/* Header */}
      <h1 className="text-5xl font-bold text-gold-500 mb-8">Get in Touch</h1>

      <p className="text-gray-300 max-w-2xl mx-auto mb-12 leading-relaxed text-lg">
        Whether you have a question about a product, want to customize a piece, or simply say hello, we’re here for you. ✨
      </p>

      {/* Contact Form */}
      <div className="bg-black bg-opacity-40 rounded-lg p-8 max-w-2xl mx-auto shadow-lg">
        <form className="flex flex-col gap-6">
          <input
            type="text"
            placeholder="Your Name"
            className="px-4 py-3 rounded-md bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gold-500"
            required
          />
          <input
            type="email"
            placeholder="Your Email"
            className="px-4 py-3 rounded-md bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gold-500"
            required
          />
          <textarea
            placeholder="Your Message"
            rows={5}
            className="px-4 py-3 rounded-md bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gold-500"
            required
          ></textarea>
          <button
            type="submit"
            className="bg-gold-500 hover:bg-gold-400 text-black font-semibold py-3 rounded-md transition"
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
