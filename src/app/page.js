"use client";
import Image from "next/image";
import { Search, Loader } from "lucide-react";
import { useState } from "react";
import hero from "../../public/hero.png";
import InteractiveHoverButton from "@/components/ui/interactive-hover-button";
import { Input } from "@/components/ui/input";

export default function Home() {
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    // Validation
    if (!username.trim()) {
      setError("Username cannot be empty");
      return;
    }

    setError(""); // Clear error if validation passes
    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      alert(`Searching for GitHub user: ${username}`);
    }, 1500);
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-center w-full px-4 bg-gray-50">
      <div className="w-full max-w-lg md:mr-8 mb-4 md:mb-0">
        <Image
          src={hero}
          alt="hero"
          height={552}
          width={552}
          className="max-w-full h-auto"
        />
      </div>

      <div className="w-full max-w-md">
        <div className="w-full text-center mb-4">
          <h1 className="text-4xl font-bold text-rose-500">GitHub Wrapped</h1>
          <p className="text-lg text-gray-600 mt-2">
            Let's see what have you been up to on GitHub in 2024
          </p>
        </div>

        <div className="flex flex-col md:flex-row items-center w-full max-w-md space-y-4 md:space-x-4 md:space-y-0">
          <Input
            placeholder="GitHub username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full md:w-72 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-rose-500"
          />
          <InteractiveHoverButton
            onClick={handleSearch}
            className={`w-20  flex items-center justify-center px-4 py-2 font-medium text-white bg-rose-500 hover:bg-rose-600 rounded-md shadow-md transition ${
              loading ? "opacity-70 cursor-not-allowed" : ""
            }`}
            disabled={loading}
            text="Go"
          ></InteractiveHoverButton>
        </div>
      </div>
    </div>
  );
}
