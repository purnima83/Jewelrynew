"use client";

export default function AboutPage() {
  return (
    <div className="container mx-auto px-6 py-12 text-center">
      {/* Header */}
      <h1 className="text-5xl font-bold text-gold-500 mb-8">Our Story</h1>

      <p className="text-gray-300 max-w-3xl mx-auto leading-relaxed text-lg mb-12">
        Jewelry Store is a celebration of timeless beauty, artistry, and passion. ✨
        Each of our collections is meticulously crafted to capture the elegance and
        emotions of life's most precious moments.
      </p>

      {/* Mission & Vision */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-10 mt-10">
        <div className="bg-black bg-opacity-40 rounded-lg p-8 w-full md:w-1/3 shadow-lg hover:shadow-2xl transition">
          <h2 className="text-3xl font-semibold text-gold-500 mb-4">Our Mission</h2>
          <p className="text-gray-400">
            To craft timeless jewelry that becomes part of your personal story — your milestones, your memories, your magic.
          </p>
        </div>

        <div className="bg-black bg-opacity-40 rounded-lg p-8 w-full md:w-1/3 shadow-lg hover:shadow-2xl transition">
          <h2 className="text-3xl font-semibold text-gold-500 mb-4">Our Promise</h2>
          <p className="text-gray-400">
            To deliver excellence, authenticity, and emotional resonance with every piece we create.
          </p>
        </div>
      </div>

      {/* Final Quote */}
      <div className="mt-16 text-gray-500 italic text-sm">
        "Jewelry Store — Where your story shines brighter."
      </div>
    </div>
  );
}
