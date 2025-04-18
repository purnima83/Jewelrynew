import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CartProvider } from "@/context/CartContext";
import { AuthProvider } from "@/context/AuthContext";
import SessionProvider from "@/context/SessionProvider";
import ThemeProvider from "@/context/ThemeProvider";
import { Toaster } from "react-hot-toast"; // ✅ NEW Import

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
      <body className="antialiased flex flex-col min-h-screen bg-white text-gray-900 dark:bg-gray-900 dark:text-white">
        <ThemeProvider>
          <SessionProvider>
            <AuthProvider>
              <CartProvider>
                <Navbar />
                <main className="flex-grow container mx-auto px-4 py-8">
                  {children}
                </main>
                <Footer />
              </CartProvider>
            </AuthProvider>
          </SessionProvider>
          <Toaster position="top-right" /> {/* ✅ Add Toaster inside ThemeProvider */}
        </ThemeProvider>
      </body>
    </html>
  );
}
