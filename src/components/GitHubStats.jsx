import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Trophy,
  Calendar,
  GitCommit,
  Star,
  Code,
  Zap,
  Clock,
  Calendar as CalendarIcon,
} from "lucide-react";
import StatCard from "./StateCard";
import ContributionGraph from "./ContributionGraph";
import { fetchGitHubStats } from "../lib/github-api";

// Bento Grid Layout Animation
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export default function GitHubStats({ username }) {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStats = async () => {
      try {
        const data = await fetchGitHubStats(username);
        setStats(data);
      } catch (error) {
        console.error("Error fetching GitHub stats:", error);
      } finally {
        setLoading(false);
      }
    };

    loadStats();
  }, [username]);

  if (loading) {
    return <div className="text-center text-gray-500">Loading stats...</div>;
  }

  if (!stats) {
    return <div className="text-center text-red-500">Failed to load stats</div>;
  }

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="w-full max-w-5xl mx-auto p-6 bg-white rounded-lg shadow-xl"
    >
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold mb-2 text-red-600">
          Your GitHub Year in Review
        </h2>
        <p className="text-gray-600">Here's what you've accomplished in 2024</p>
      </div>

      {/* Profile Section */}
      <div className="flex justify-center mb-8">
        <img
          src={stats.avatarUrl}
          alt={`${username}'s Avatar`}
          className="w-32 h-32 rounded-full border-4 border-red-500 shadow-lg"
        />
      </div>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          icon={Trophy}
          title="Universal Rank"
          value={stats.universalRank}
          color="bg-red-600"
        />
        <StatCard
          icon={Clock}
          title="Longest Streak"
          value={`${stats.longestStreak} days`}
          color="bg-yellow-500"
        />
        <StatCard
          icon={GitCommit}
          title="Total Commits"
          value={stats.totalCommits}
          color="bg-emerald-500"
        />
        <StatCard
          icon={CalendarIcon}
          title="Most Active Month"
          value={stats.mostActiveMonth}
          color="bg-orange-500"
        />
        <StatCard
          icon={Calendar}
          title="Most Active Day"
          value={stats.mostActiveDay}
          color="bg-blue-500"
        />
        <StatCard
          icon={Star}
          title="Stars Earned"
          value={stats.starsEarned}
          color="bg-yellow-400"
        />
        <StatCard
          icon={Code}
          title="Top Language"
          value={stats.topLanguage}
          color="bg-pink-500"
        />
        <StatCard
          icon={Zap}
          title="Power Level"
          value={stats.powerLevel}
          color="bg-cyan-500"
        />
      </div>

      {/* Contribution Graph */}
      <div className="mt-8">
        <ContributionGraph username={username} />
      </div>
    </motion.div>
  );
}
