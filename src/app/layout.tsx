import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Guest Book App",
  description: "Guest Book for Activity Scheduler",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`$(inter.className) bg-slate-800 text-slate-200 container mx-auto p-4`}
      >
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
