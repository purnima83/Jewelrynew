// /app/admin/layout.tsx
"use client";

import { ReactNode } from "react";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-black text-white">
      <header className="p-6 bg-gold-500 text-black font-bold text-2xl text-center">
        Admin Panel
      </header>
      <main className="p-6">{children}</main>
    </div>
  );
}
