"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ReactNode } from "react";

export default function ThemeProvider({ children }: { children: ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class" // Applies "dark" class to <html>
      defaultTheme="system" // Start with user's OS preference
      enableSystem={true} // Allow system preference
      storageKey="theme-preference" // Save in localStorage
    >
      {children}
    </NextThemesProvider>
  );
}
