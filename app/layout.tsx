import type { Metadata } from "next";
import { Inter, Noto_Sans_Bengali, Playfair_Display } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const notoSansBengali = Noto_Sans_Bengali({
  variable: "--font-noto-sans-bengali",
  subsets: ["bengali"],
  display: "swap",
});

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair-display",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "দাওয়াহ ওয়েলফেয়ার ফাউন্ডেশন বাংলাদেশ | Dawah Welfare Foundation Bangladesh",
    template: "%s | দাওয়াহ ওয়েলফেয়ার ফাউন্ডেশন",
  },
  description:
    "দাওয়াহ, ঈমান ও খিদমাহর মাধ্যমে সমাজ গঠন — Dawah Welfare Foundation Bangladesh",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="bn"
      className={`${inter.variable} ${notoSansBengali.variable} ${playfairDisplay.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground font-sans">
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
