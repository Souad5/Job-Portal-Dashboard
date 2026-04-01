import { Briefcase, MapPin, Clock } from "lucide-react";

interface JobItem {
  id: string;
  title: string;
  department: string;
  location: string;
  postedAt: string;
  type: "Full-time" | "Part-time" | "Contract";
}

const RECENT_JOBS: JobItem[] = [
  {
    id: "1",
    title: "Senior Frontend Developer",
    department: "Engineering",
    location: "Remote",
    postedAt: "2 hours ago",
    type: "Full-time",
  },
  {
    id: "2",
    title: "UI/UX Designer",
    department: "Design",
    location: "New York, US",
    postedAt: "1 day ago",
    type: "Contract",
  },
  {
    id: "3",
    title: "Marketing Lead",
    department: "Marketing",
    location: "London, UK",
    postedAt: "3 days ago",
    type: "Full-time",
  },
];

const TYPE_COLORS: Record<JobItem["type"], string> = {
  "Full-time":
    "bg-indigo-100 text-indigo-600 dark:bg-indigo-500/20 dark:text-indigo-400",
  "Part-time":
    "bg-amber-100 text-amber-600 dark:bg-amber-500/20 dark:text-amber-400",
  Contract:
    "bg-emerald-100 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400",
};

const RecentJobs = () => {
  return (
    <section className="rounded-2xl p-6 shadow-sm ring-1 ring-slate-200 dark:ring-slate-700 dark:bg-slate-800">
      {/* Header */}
      <header className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
          Recent Job Posts
        </h3>
        <Briefcase className="h-5 w-5 text-slate-500 dark:text-slate-400" />
      </header>

      {/* Job List */}
      <ul className="space-y-2">
        {RECENT_JOBS.map((job) => (
          <li
            key={job.id}
            className="rounded-xl p-4 transition-colors hover:bg-slate-100 dark:hover:bg-slate-700/50"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                  {job.title}
                </p>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  {job.department}
                </p>
              </div>

              <span
                className={`whitespace-nowrap rounded-full px-2.5 py-0.5 text-xs font-medium ${TYPE_COLORS[job.type]}`}
              >
                {job.type}
              </span>
            </div>

            <div className="mt-2 flex flex-wrap items-center gap-4 text-xs text-slate-500 dark:text-slate-400">
              <div className="flex items-center gap-1">
                <MapPin className="h-3.5 w-3.5" />
                <span>{job.location}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-3.5 w-3.5" />
                <span>{job.postedAt}</span>
              </div>
            </div>
          </li>
        ))}
      </ul>

      {/* Footer */}
      <footer className="mt-4 text-center">
        <button className="text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer">
          View all jobs
        </button>
      </footer>
    </section>
  );
};

export default RecentJobs;
