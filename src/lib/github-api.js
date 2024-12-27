import axios from "axios";
import { getDaysBetween, getDateRange, formatDate } from "./date";
import { calculatePercentile, getActivityLevel } from "./stats";

const GITHUB_API_BASE = "https://api.github.com";
const CURRENT_YEAR = 2024;

async function fetchUserInfo(username) {
  const response = await axios.get(`${GITHUB_API_BASE}/users/${username}`);
  return response.data;
}

async function fetchUserRepos(username) {
  const response = await axios.get(
    `${GITHUB_API_BASE}/users/${username}/repos?per_page=100`
  );
  return response.data.filter((repo) => {
    const createdYear = new Date(repo.created_at).getFullYear();
    const updatedYear = new Date(repo.updated_at).getFullYear();
    return createdYear === CURRENT_YEAR || updatedYear === CURRENT_YEAR;
  });
}

async function fetchContributions(username) {
  const response = await axios.get(
    `${GITHUB_API_BASE}/users/${username}/events?per_page=100`
  );
  return response.data.filter(
    (event) => new Date(event.created_at).getFullYear() === CURRENT_YEAR
  );
}

function calculatePowerLevel(stats) {
  const activityLevel = getActivityLevel(stats.totalCommits);
  const { totalCommits, starsEarned, repoCount } = stats;

  if (totalCommits > 500 && starsEarned > 50) return "Legendary";
  if (totalCommits > 250 && starsEarned > 25) return "Ninja";
  if (totalCommits > 100 && starsEarned > 10) return "Pro";
  return "Rising Star";
}

function processLanguageStats(repos) {
  const languages = {};
  repos.forEach((repo) => {
    if (repo.language) {
      languages[repo.language] = (languages[repo.language] || 0) + 1;
    }
  });
  return Object.entries(languages)
    .sort(([, a], [, b]) => b - a)
    .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});
}

function calculateStreaks(contributions) {
  let currentStreak = 0;
  let longestStreak = 0;
  let lastContributionDate = null;

  contributions.forEach((event) => {
    const eventDate = new Date(event.created_at);

    if (lastContributionDate) {
      const daysBetween = getDaysBetween(lastContributionDate, eventDate);

      if (daysBetween === 1) {
        currentStreak++;
        longestStreak = Math.max(longestStreak, currentStreak);
      } else if (daysBetween > 1) {
        currentStreak = 1;
      }
    } else {
      currentStreak = 1;
    }

    lastContributionDate = eventDate;
  });

  return { currentStreak, longestStreak };
}

function calculateActivityPatterns(contributions) {
  const dayCount = { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 };
  const monthCount = {};

  contributions.forEach((event) => {
    const date = new Date(event.created_at);
    dayCount[date.getDay()]++;

    const month = date.toLocaleString("default", { month: "long" });
    monthCount[month] = (monthCount[month] || 0) + 1;
  });

  const mostActiveDay = Object.entries(dayCount).sort(
    ([, a], [, b]) => b - a
  )[0][0];

  const mostActiveMonth = Object.entries(monthCount).sort(
    ([, a], [, b]) => b - a
  )[0][0];

  return {
    mostActiveDay: new Date(0, 0, mostActiveDay).toLocaleString("default", {
      weekday: "long",
    }),
    mostActiveMonth,
  };
}

export async function fetchGitHubStats(username) {
  try {
    const [userInfo, repos, contributions] = await Promise.all([
      fetchUserInfo(username),
      fetchUserRepos(username),
      fetchContributions(username),
    ]);

    const languages = processLanguageStats(repos);
    const topLanguage = Object.keys(languages)[0] || "N/A";

    const { currentStreak, longestStreak } = calculateStreaks(contributions);
    const { mostActiveDay, mostActiveMonth } =
      calculateActivityPatterns(contributions);

    const totalCommits = contributions.filter(
      (event) => event.type === "PushEvent"
    ).length;

    const starsEarned = repos.reduce(
      (total, repo) => total + repo.stargazers_count,
      0
    );

    const commitPercentile = calculatePercentile(totalCommits, 500); // Adjusted benchmark for yearly stats
    const universalRank = commitPercentile > 95 ? "Top 5%" : "Top 20%";

    return {
      year: CURRENT_YEAR,
      contributionsCount: totalCommits,
      universalRank,
      longestStreak,
      currentStreak,
      totalCommits,
      mostActiveMonth,
      mostActiveDay,
      starsEarned,
      topLanguage,
      repoCount: repos.length,
      powerLevel: calculatePowerLevel({
        totalCommits,
        starsEarned,
        repoCount: repos.length,
      }),
      followers: userInfo.followers,
      following: userInfo.following,
      publicRepos: userInfo.public_repos,
      accountAge: formatDate(userInfo.created_at),
      avatarUrl: userInfo.avatar_url,
      bio: userInfo.bio,
      location: userInfo.location,
      languages,
      activityLevel: getActivityLevel(totalCommits),
    };
  } catch (error) {
    console.error("Error fetching GitHub stats:", error);
    throw new Error("Failed to fetch GitHub statistics for " + CURRENT_YEAR);
  }
}
