"use client";
import Image from "next/image";
import { Search, Loader } from "lucide-react";
import { useState } from "react";
import hero from "../../public/hero.png";
import InteractiveHoverButton from "@/components/ui/interactive-hover-button";
import { Input } from "@/components/ui/input";
import toast from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";
import GitHubStats from "@/components/GitHubStats";

export default function Home() {
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [showStats, setShowStats] = useState(false);

  const handleSearch = async () => {
    if (!username) {
      toast.error("Please enter a username");
      return;
    }
    setLoading(true);
    try {
      const res = await axios.get(`https://api.github.com/users/${username}`);
      toast.success("User found! Fetching details...");
      setShowStats(true);
      // Smooth scroll to stats
      const statsElement = document.getElementById("github-stats");
      if (statsElement) {
        statsElement.scrollIntoView({ behavior: "smooth" });
      }
    } catch (err) {
      toast.error("User not found");
      setShowStats(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="flex flex-col md:flex-row items-center justify-center w-full px-4 py-12">
        <div className="w-full max-w-lg md:mr-8 mb-4 md:mb-0">
          <Image
            src={hero}
            alt="GitHub Wrapped Hero"
            width={552}
            height={552}
            className="max-w-full h-auto"
          />
        </div>

        <div className="w-full max-w-md">
          <div className="w-full text-center mb-8">
            <h1 className="text-4xl font-bold text-rose-500">GitHub Wrapped</h1>
            <p className="text-lg text-gray-600 mt-2">
              Let's see what you've been up to on GitHub in 2024
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
              className={`w-20 flex items-center justify-center px-4 py-2 font-medium text-white bg-rose-500 hover:bg-rose-600 rounded-md shadow-md transition ${
                loading ? "opacity-70 cursor-not-allowed" : ""
              }`}
              disabled={loading}
              text={loading ? "..." : "Go"}
            />
          </div>
        </div>
      </div>

      {showStats && (
        <div id="github-stats" className="py-12">
          <GitHubStats username={username} />
        </div>
      )}
    </div>
  );
}
