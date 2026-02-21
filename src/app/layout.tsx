import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Flixo - Premium Discord Music Bot",
  description: "The premium, high-quality music companion for your Discord server. Designed with elegance.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased selection:bg-purple-500/30`}>
        {/* Watercolor Background */}
        <div className="watercolor-bg">
          <div className="watercolor-blob blob-1"></div>
          <div className="watercolor-blob blob-2"></div>
          <div className="watercolor-blob blob-3"></div>
          <div className="watercolor-blob blob-4"></div>
        </div>

        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
