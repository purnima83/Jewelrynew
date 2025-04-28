import type { Metadata } from "next";
import "../styles/globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CartProvider } from "@/context/CartContext";
import { AuthProvider } from "@/context/AuthContext";
import SessionProvider from "@/context/SessionProvider";
import ThemeProvider from "@/context/ThemeProvider";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "Jewelry Store",
  description: "Discover exquisite jewelry collections.",
  metadataBase: new URL("https://www.myjewelryshop.xyz"), // ✅ ADD this line
  icons: {
    icon: [
      { url: "/logo.png" },     // ✅ this is your custom logo
      { url: "/favicon.ico" },  // ✅ fallback if browser expects .ico
    ],
  },
  openGraph: {
    title: "Jewelry Store",
    description: "Discover exquisite jewelry collections.",
    url: "https://www.myjewelryshop.xyz",
    siteName: "Jewelry Store",
    images: [
      {
        url: "/logo.png",
        width: 800,
        height: 600,
        alt: "Jewelry Store Logo",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Jewelry Store",
    description: "Discover exquisite jewelry collections.",
    images: ["/logo.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
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
                <Toaster position="top-center" reverseOrder={false} />
              </CartProvider>
            </AuthProvider>
          </SessionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
