import React from "react";
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

const RecentJobs = () => {
  return (
    <section className="rounded-2xl p-6 shadow-sm ring-1 ring-slate-200 dark:bg-slate-800">
      {/* Header */}
      <header className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-semibold">Recent Job Posts</h3>
        <Briefcase className="h-5 w-5" />
      </header>

      {/* Job List */}
      <ul className="space-y-3">
        {RECENT_JOBS.map((job) => (
          <li
            key={job.id}
            className="rounded-xl  p-4 transition hover:bg-slate-100"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm font-semibold">{job.title}</p>
                <p className="text-sm">{job.department}</p>
              </div>

              <span className="rounded-full bg-indigo-100 px-2.5 py-0.5 text-xs font-medium text-indigo-600">
                {job.type}
              </span>
            </div>

            <div className="mt-2 flex flex-wrap items-center gap-4 text-xs">
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
        <button className="text-sm font-medium text-indigo-600 hover:underline cursor-pointer">
          View all jobs
        </button>
      </footer>
    </section>
  );
};

export default RecentJobs;
