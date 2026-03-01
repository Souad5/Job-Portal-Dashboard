import {
  Briefcase,
  MapPin,
  Clock,
  CheckCircle,
  XCircle,
  Hourglass,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { JSX, useEffect, useState } from "react";
import { NavLink } from "react-router";
import Button from "../components/ui/Button";
import { Modal } from "../components/ui/Modal";
import axios from "axios";
import Select from "../components/ui/Select";
import { FormProvider, useForm } from "react-hook-form";
import Input from "../components/ui/Input";

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  workMode: string;
  employmentType: string;
  department: string;
  experienceLevel: string;
  salaryRange: string;
  postedAt: string;
  description: string;
  responsibilities: string[];
  requirements: string[];
  niceToHave: string[];
  benefits: string[];
  color: string;
  status?: JobStatus;
}

type JobStatus = "approved" | "rejected" | "pending";

export default function AllJobsPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [pageIndex, setPageIndex] = useState(0);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const pageSize = 9;
  const methods = useForm({
    defaultValues: {
      search: "",
      employmentType: "All",
    },
  });

  const { watch } = methods;
  const searchQuery = watch("search");
  const filterEmploymentType = watch("employmentType");

  const employmentTypeColors: Record<string, string> = {
    "Full-time":
      "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/40 dark:text-indigo-200",
    "Part-time":
      "bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-200",
    Contract:
      "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-200",
    Internship:
      "bg-purple-100 text-purple-800 dark:bg-purple-900/40 dark:text-purple-200",
  };
  const handleApprove = (job: Job | null) => {
    if (!job) return;
    console.log("Approved:", job.id);
    // API call to approve
  };

  const handleReject = (job: Job | null) => {
    if (!job) return;
    console.log("Rejected:", job.id);
    // API call to reject
  };

  const handleDelete = (job: Job | null) => {
    if (!job) return;
    console.log("Deleted:", job.id);
    // API call to delete
  };

  // Fetch jobs
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        const response = await axios.get<Job[]>("/public.json");
        setJobs(response.data);
        setError(null);
      } catch (err) {
        console.error(err);
        setError("Failed to load jobs. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.company.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesEmploymentType =
      filterEmploymentType === "All" ||
      job.employmentType === filterEmploymentType;
    return matchesSearch && matchesEmploymentType;
  });

  const totalPages = Math.ceil(filteredJobs.length / pageSize);
  const paginatedJobs = filteredJobs.slice(
    pageIndex * pageSize,
    (pageIndex + 1) * pageSize,
  );

  const goToFirst = () => setPageIndex(0);
  const goToLast = () => setPageIndex(totalPages - 1);
  const goPrev = () => setPageIndex((p) => Math.max(p - 1, 0));
  const goNext = () => setPageIndex((p) => Math.min(p + 1, totalPages - 1));

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen bg-white dark:bg-slate-900">
        <div className="animate-spin rounded-full h-12 w-32 border-t-2 border-b-2 border-blue-900 dark:border-sky-400"></div>
      </div>
    );
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="px-4 py-6 bg-white dark:bg-slate-900 transition-colors duration-500 ease-in-out min-h-screen">
      {/* Header */}
      <div className="mb-8 flex sm:flex-row items-start sm:items-center justify-between gap-4">
        <h1 className="md:text-3xl text-xl font-semibold text-[#044635] dark:text-[#0af0b4]">
          Open Positions
        </h1>
        <NavLink to="/job-post">
          <Button value="Create Job" />
        </NavLink>
      </div>

      {/* Search & Filters */}
      <FormProvider {...methods}>
        <form className="py-4 flex flex-col justify-between items-center sm:flex-row gap-4 w-full">
          <div className="md:w-md w-full">
            <Input
              name="search"
              label="Search"
              type="text"
              placeholder="Search by title or company"
            />
          </div>
          <div className="md:w-md w-full">
            <Select
              name="employmentType"
              label="Employment Type"
              options={[
                "All",
                "Full-time",
                "Part-time",
                "Contract",
                "Internship",
                "Pending",
                "Approve",
                "Reject",
              ]}
            />
          </div>
        </form>
      </FormProvider>

      {/* Job Cards */}
      {paginatedJobs.length === 0 ? (
        <div className="mt-20 flex flex-col items-center justify-center gap-4">
          <img
            src="/Cyber Bug Search.jpg"
            alt="No jobs found"
            className="w-56 h-56 opacity-70 rounded-full"
          />
          <h3 className="text-xl font-semibold text-gray-700 dark:text-white">
            No jobs match your search.
          </h3>
          <p className="text-gray-500 dark:text-white text-center max-w-sm">
            Try adjusting your search or filters to find relevant jobs.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {paginatedJobs.map((job) => {
            const status: JobStatus = job.status ?? "pending";

            const statusConfig: Record<
              JobStatus,
              {
                icon: JSX.Element;
                styles: string;
                label: string;
              }
            > = {
              approved: {
                icon: <CheckCircle size={16} />,
                styles:
                  "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400",
                label: "Approved",
              },
              rejected: {
                icon: <XCircle size={16} />,
                styles:
                  "bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-400",
                label: "Rejected",
              },
              pending: {
                icon: <Hourglass size={16} />,
                styles:
                  "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400",
                label: "Pending",
              },
            };

            const currentStatus = statusConfig[status];

            return (
              <div
                key={job.id}
                className="group relative rounded-2xl bg-white dark:bg-slate-800 p-6 shadow-md ring-1 ring-gray-200 dark:ring-slate-700 transition-all hover:-translate-y-1 hover:shadow-lg"
              >
                {/* Header */}
                <div className="mb-4 flex items-start justify-between gap-3">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white dark:group-hover:text-slate-200 transition">
                    {job.title}
                  </h2>

                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${employmentTypeColors[job.employmentType]}`}
                  >
                    {job.employmentType}
                  </span>
                </div>

                {/* Company */}
                <div className="mb-2 flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                  <Briefcase size={16} />
                  {job.company}
                </div>

                {/* Location */}
                <div className="mb-4 flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                  <MapPin size={16} />
                  {job.location}
                </div>

                {/* Status Badge with Icon */}
                <div className="mb-4">
                  <span
                    className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold ${currentStatus.styles}`}
                  >
                    {currentStatus.label}
                  </span>
                </div>

                {/* Footer */}
                <div className="flex items-center gap-1 pt-4 border-t border-gray-100 dark:border-slate-700 text-xs text-gray-400 dark:text-gray-500">
                  <Clock size={14} />
                  {job.postedAt}

                  <button
                    onClick={() => setSelectedJob(job)}
                    className="ml-auto inline-flex items-center gap-1 text-indigo-600 dark:text-indigo-400 font-medium hover:underline transition cursor-pointer text-[16px]"
                  >
                    View Details →
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Pagination */}
      <div className="mt-10 flex items-center justify-center gap-2 flex-wrap">
        <button
          onClick={goToFirst}
          disabled={pageIndex === 0}
          className="px-2 py-3 rounded-lg border border-gray-300 bg-white dark:bg-slate-500 text-gray-700 dark:text-white font-medium shadow-sm hover:bg-gray-100 dark:hover:bg-gray-600 disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1 cursor-pointer"
        >
          <ChevronsLeft size={16} />
        </button>
        <button
          onClick={goPrev}
          disabled={pageIndex === 0}
          className="px-2 py-3 rounded-lg border border-gray-300 bg-white dark:bg-slate-500 text-gray-700 dark:text-white font-medium shadow-sm hover:bg-gray-100 dark:hover:bg-gray-600 disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1 cursor-pointer"
        >
          <ChevronLeft size={16} />
        </button>

        {/* Page numbers */}
        {Array.from({ length: totalPages }).map((_, idx) => (
          <button
            key={idx}
            onClick={() => setPageIndex(idx)}
            className={`px-3 py-2 rounded-lg border shadow-sm font-medium ${
              idx === pageIndex
                ? "bg-sky-600 text-white border-sky-600"
                : "bg-white dark:bg-slate-500 text-gray-700 dark:text-white border-gray-300 dark:border-slate-600 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer"
            }`}
          >
            {idx + 1}
          </button>
        ))}

        <button
          onClick={goNext}
          disabled={pageIndex === totalPages - 1}
          className="px-2 py-3 rounded-lg border border-gray-300 bg-white dark:bg-slate-500 text-gray-700 dark:text-white font-medium shadow-sm hover:bg-gray-100 dark:hover:bg-gray-600 disabled:opacity-40 disabled:cursor-not-allowed flex cursor-pointer items-center gap-1"
        >
          <ChevronRight size={16} />
        </button>
        <button
          onClick={goToLast}
          disabled={pageIndex === totalPages - 1}
          className="px-2 py-3 rounded-lg border border-gray-300 bg-white dark:bg-slate-500 text-gray-700 dark:text-white font-medium shadow-sm hover:bg-gray-100 dark:hover:bg-gray-600 disabled:opacity-40 disabled:cursor-not-allowed flex cursor-pointer items-center gap-1"
        >
          <ChevronsRight size={16} />
        </button>
      </div>

      <Modal
        open={!!selectedJob}
        onOpenChange={() => setSelectedJob(null)}
        title={selectedJob?.title}
        description={selectedJob?.company}
      >
        <div className="flex flex-col space-y-4 text-gray-800 dark:text-gray-100 max-h-[70vh] overflow-y-auto">
          {/* Basic Job Info */}
          {selectedJob && (
            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-8 space-y-8">
              {/* Header */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                  Job Details
                </h2>

                {/* Meta Info Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-xl">
                    <p className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
                      Location
                    </p>
                    <p className="text-base font-semibold text-gray-800 dark:text-gray-100">
                      {selectedJob.location}
                    </p>
                  </div>

                  <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-xl">
                    <p className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
                      Employment Type
                    </p>
                    <p className="text-base font-semibold text-indigo-600 dark:text-indigo-400">
                      {selectedJob.employmentType}
                    </p>
                  </div>

                  <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-xl">
                    <p className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
                      Department
                    </p>
                    <p className="text-base font-semibold text-gray-800 dark:text-gray-100">
                      {selectedJob.department}
                    </p>
                  </div>

                  <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-xl">
                    <p className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
                      Experience Level
                    </p>
                    <p className="text-base font-semibold text-gray-800 dark:text-gray-100">
                      {selectedJob.experienceLevel}
                    </p>
                  </div>

                  <div className="sm:col-span-2 bg-gray-50 dark:bg-gray-800 p-4 rounded-xl">
                    <p className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
                      Salary Range
                    </p>
                    <p className="text-base font-semibold text-emerald-600 dark:text-emerald-400">
                      {selectedJob.salaryRange}
                    </p>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  Description
                </h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {selectedJob.description}
                </p>
              </div>

              {/* Responsibilities */}
              {selectedJob.responsibilities?.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                    Responsibilities
                  </h3>
                  <ul className="space-y-2">
                    {selectedJob.responsibilities.map((r, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-3 bg-gray-50 dark:bg-gray-800 p-3 rounded-lg"
                      >
                        <span className="mt-1 w-2 h-2 bg-emerald-500 rounded-full"></span>
                        <span className="text-gray-700 dark:text-gray-300">
                          {r}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Requirements */}
              {selectedJob.requirements?.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                    Requirements
                  </h3>
                  <ul className="space-y-2">
                    {selectedJob.requirements.map((r, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-3 bg-gray-50 dark:bg-gray-800 p-3 rounded-lg"
                      >
                        <span className="mt-1 w-2 h-2 bg-indigo-500 rounded-full"></span>
                        <span className="text-gray-700 dark:text-gray-300">
                          {r}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Nice to Have */}
              {selectedJob.niceToHave?.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                    Nice to Have
                  </h3>
                  <ul className="space-y-2">
                    {selectedJob.niceToHave.map((r, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-3 bg-gray-50 dark:bg-gray-800 p-3 rounded-lg"
                      >
                        <span className="mt-1 w-2 h-2 bg-amber-500 rounded-full"></span>
                        <span className="text-gray-700 dark:text-gray-300">
                          {r}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Benefits */}
              {selectedJob.benefits?.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                    Benefits
                  </h3>
                  <ul className="space-y-2">
                    {selectedJob.benefits.map((r, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-3 bg-gray-50 dark:bg-gray-800 p-3 rounded-lg"
                      >
                        <span className="mt-1 w-2 h-2 bg-rose-500 rounded-full"></span>
                        <span className="text-gray-700 dark:text-gray-300">
                          {r}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Admin Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-end pt-6 border-t border-gray-200 dark:border-gray-700">
                <button
                  onClick={() => handleApprove(selectedJob)}
                  className="px-5 py-2.5 rounded-xl bg-emerald-600 text-white font-medium hover:bg-emerald-700 active:scale-95 transition-all shadow-md cursor-pointer"
                >
                  Approve
                </button>

                <button
                  onClick={() => handleReject(selectedJob)}
                  className="px-5 py-2.5 rounded-xl bg-amber-500 text-white font-medium hover:bg-amber-600 active:scale-95 transition-all shadow-md cursor-pointer"
                >
                  Reject
                </button>

                <button
                  onClick={() => handleDelete(selectedJob)}
                  className="px-5 py-2.5 rounded-xl bg-rose-600 text-white font-medium hover:bg-rose-700 active:scale-95 transition-all shadow-md cursor-pointer"
                >
                  Delete
                </button>
              </div>
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
}
