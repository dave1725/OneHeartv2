import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Footer from "./footer/page";
import Navbar from "./navbar/page";
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "OneHeart - Music Club of SRM-AP",
  description: "OneHeart is the music club of SRM-AP. We are a family of OneHeartians!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body

        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navbar />
        {children}
        <Analytics />
        <SpeedInsights />
        <Footer />
      </body>
    </html>
  );
}
