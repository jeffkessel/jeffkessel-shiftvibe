import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "ShiftVibe",
  description: "Manage Shifts, Vibe Higher.",
  manifest: "/manifest.json",
};

// Hardcoded auth status for prototype. In a real app, this would come from a session.
const isAuthenticated = true; 

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-slate-900 text-white min-h-screen text-slate-200 flex flex-col">
        <Header isAuthenticated={isAuthenticated} />
        <main className="flex-grow container mx-auto px-4 py-8">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}