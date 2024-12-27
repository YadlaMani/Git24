import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import DotPattern from "@/components/ui/dot-pattern";
import { Toaster } from "react-hot-toast";

export const metadata = {
  title: "Git24",
  description: "Github 2024 wrapped",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-50">
        <header className="sticky top-0 z-10">
          <Navbar />
        </header>
        <main className="min-h-screen pt-4">{children}</main>
        <DotPattern width={24} height={24} />
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
