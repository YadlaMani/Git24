import "github-calendar/dist/github-calendar.css";
import GitHubCalendar from "react-github-calendar";

export default function ContributionGraph({ username }) {
  return (
    <div>
      <h3 className="text-xl font-bold mb-4 text-gray-100">
        Contribution Activity (2024)
      </h3>
      <div className="bg-rose-200/80 p-4 rounded-lg shadow-sm">
        <GitHubCalendar username={username} />
      </div>
    </div>
  );
}
