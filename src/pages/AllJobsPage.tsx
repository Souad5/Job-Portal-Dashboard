import { Briefcase, MapPin, Clock } from "lucide-react";
import { useState } from "react";

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  postedAt: string;
  color: string;
}
// Fake Data
const jobs: Job[] = [
  {
    id: "1",
    title: "Senior Frontend Engineer",
    company: "Acme Technologies",
    location: "San Francisco, CA",
    type: "Full-time",
    postedAt: "2 days ago",
    color: "bg-indigo-100 text-indigo-800",
  },
  {
    id: "2",
    title: "Product Designer",
    company: "Nimbus Labs",
    location: "Remote",
    type: "Remote",
    postedAt: "5 days ago",
    color: "bg-green-100 text-green-800",
  },
  {
    id: "3",
    title: "Backend Engineer",
    company: "Atlas Systems",
    location: "Berlin, Germany",
    type: "Full-time",
    postedAt: "1 week ago",
    color: "bg-purple-100 text-purple-800",
  },
  {
    id: "4",
    title: "Engineering Manager",
    company: "Vertex Corp",
    location: "New York, NY",
    type: "Hybrid",
    postedAt: "2 weeks ago",
    color: "bg-yellow-100 text-yellow-800",
  },
  {
    id: "5",
    title: "Data Scientist",
    company: "Aurora AI",
    location: "London, UK",
    type: "Full-time",
    postedAt: "3 days ago",
    color: "bg-pink-100 text-pink-800",
  },
  {
    id: "6",
    title: "UX Researcher",
    company: "Nimbus Labs",
    location: "Remote",
    type: "Remote",
    postedAt: "1 day ago",
    color: "bg-green-100 text-green-800",
  },
  {
    id: "7",
    title: "Data Scientist",
    company: "Aurora AI",
    location: "London, UK",
    type: "Full-time",
    postedAt: "3 days ago",
    color: "bg-pink-100 text-pink-800",
  },
];

export default function JobsCardPage() {
  const pageSize = 9;
  const [pageIndex, setPageIndex] = useState(0);

  const paginatedJobs = jobs.slice(
    pageIndex * pageSize,
    (pageIndex + 1) * pageSize,
  );

  return (
    <div className="px-6 py-12">
      <h1 className="text-3xl font-semibold text-[#044635] mb-8">
        Open Positions
      </h1>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
        {paginatedJobs.map((job) => (
          <div
            key={job.id}
            className="
              group cursor-pointer
              rounded-2xl bg-white
              shadow-[0_10px_40px_rgba(0,0,0,0.08)]
              ring-1 ring-gray-200/70
              p-6
              transition-all duration-300
              hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(0,0,0,0.12)]
            "
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900 group-hover:text-indigo-600 transition">
                {job.title}
              </h2>

              <span
                className={`shrink-0 px-3 py-1 rounded-full text-xs font-semibold ${job.color}`}
              >
                {job.type}
              </span>
            </div>

            {/* Company */}
            <div className="flex items-center gap-2 text-gray-600 text-sm mb-2">
              <Briefcase size={16} className="opacity-70" />
              <span className="font-medium">{job.company}</span>
            </div>

            {/* Location */}
            <div className="flex items-center gap-2 text-gray-500 text-sm mb-4">
              <MapPin size={16} className="opacity-70" />
              {job.location}
            </div>

            {/* Footer */}
            <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs text-gray-400">
                <Clock size={14} />
                {job.postedAt}
              </div>

              <span className="text-sm font-medium text-indigo-600 group-hover:underline">
                View Details →
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-end mt-10 gap-4 items-center text-sm text-gray-700">
        <button
          onClick={() => setPageIndex((p) => Math.max(p - 1, 0))}
          disabled={pageIndex === 0}
          className="
            cursor-pointer rounded-lg px-4 py-2
            border border-gray-300
            hover:bg-gray-100
            disabled:opacity-40 disabled:cursor-not-allowed
            transition
          "
        >
          Previous
        </button>

        <span className="font-medium">
          Page {pageIndex + 1} of {Math.ceil(jobs.length / pageSize)}
        </span>

        <button
          onClick={() =>
            setPageIndex((p) =>
              Math.min(p + 1, Math.ceil(jobs.length / pageSize) - 1),
            )
          }
          disabled={(pageIndex + 1) * pageSize >= jobs.length}
          className="
            cursor-pointer rounded-lg px-4 py-2
            border border-gray-300
            hover:bg-gray-100
            disabled:opacity-40 disabled:cursor-not-allowed
            transition
          "
        >
          Next
        </button>
      </div>
    </div>
  );
}
