import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { ChatWidget } from "@/components/ChatWidget";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Zapledge International Pvt Ltd | AI Consulting, AI Solutions, Automation & IoT | Kochi, Kerala",
  description: "Zapledge International Pvt Ltd helps businesses solve real business challenges with practical AI: consulting, engineering, automation, and intelligent operations. Based in Kochi, Kerala.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#00003C]">
        <NavBar />
        <main
          data-reveal-curtain
          className="relative z-10 overflow-clip rounded-b-[28px] bg-white shadow-[0_40px_80px_rgba(0,0,30,var(--curtain-shadow,0))] md:rounded-b-[40px] lg:rounded-b-[48px]"
        >
          {children}
        </main>
        <Footer />
        <ChatWidget />
      </body>
    </html>
  );
}
