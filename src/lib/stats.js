export function calculatePercentile(value, total) {
  return Math.round((value / total) * 100);
}

export function calculateGrowthRate(current, previous) {
  return previous ? Math.round(((current - previous) / previous) * 100) : 0;
}

export function getActivityLevel(commits) {
  if (commits > 1000) return "Super Active";
  if (commits > 500) return "Very Active";
  if (commits > 200) return "Active";
  return "Getting Started";
}
