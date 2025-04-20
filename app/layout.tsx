import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../styles/globals.css"; // ✅ Correct path
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CartProvider } from "@/context/CartContext";
import { AuthProvider } from "@/context/AuthContext";
import SessionProvider from "@/context/SessionProvider";
import ThemeProvider from "@/context/ThemeProvider";
import { Toaster } from "react-hot-toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Jewelry Store",
  description: "Discover exquisite jewelry collections.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="antialiased flex flex-col min-h-screen bg-black text-white">
        <ThemeProvider>
          <SessionProvider>
            <AuthProvider>
              <CartProvider>
                <Navbar />
                <main className="flex-grow container mx-auto px-4 py-8 animate-fade-in">
                  {children}
                </main>
                <Footer />
              </CartProvider>
            </AuthProvider>
          </SessionProvider>
          <Toaster position="top-right" />
        </ThemeProvider>
      </body>
    </html>
  );
}
