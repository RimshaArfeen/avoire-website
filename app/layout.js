

import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import Footer from "./Components/Footer";
import Providers from "./providers";
import Navbar from "./Components/Navbar/Navbar";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "AVOIRE — Luxury Parfumerie",
  description:
    "Crafting sensory experiences through rare essences. Designed in Paris, inspired by the world.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className=" dark">
      <body className={`${playfair.variable} ${inter.variable}`}>
        <Providers>
          <Navbar/>
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
