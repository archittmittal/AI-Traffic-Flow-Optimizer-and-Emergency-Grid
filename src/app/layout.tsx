import type { Metadata } from "next";
import "./globals.css";
import Sidebar from "@/components/layout/Sidebar";
import TopBar from "@/components/layout/TopBar";

export const metadata: Metadata = {
  title: "TrafficAI - Smart City Command Center",
  description: "AI-powered Traffic Management System for real-time monitoring, signal control, and emergency response.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased bg-dark-900 text-slate-200">
        <Sidebar />
        <TopBar />
        <main className="ml-[240px] mt-14 min-h-[calc(100vh-3.5rem)] p-5">
          {children}
        </main>
      </body>
    </html>
  );
}
