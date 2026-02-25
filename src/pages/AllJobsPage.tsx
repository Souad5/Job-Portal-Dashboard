import { Briefcase, MapPin, Clock } from "lucide-react";
import { useEffect, useState } from "react";
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
}

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

  // Filtered & searched jobs
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

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-32 border-t-2 border-b-2 border-blue-900"></div>
      </div>
    );
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="px-4 py-6 bg-white dark:bg-slate-900 h-screen transition-colors duration-500 ease-in-out">
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
        <form className="py-4 flex flex-col justify-center items-center sm:flex-row gap-4 w-full">
          <div className="w-full">
            <Input
              name="search"
              label="Search"
              type="text"
              placeholder="Search by title or company"
            />
          </div>
          <div className="w-full">
            <Select
              name="employmentType"
              label="Employment Type"
              options={[
                "All",
                "Full-time",
                "Part-time",
                "Contract",
                "Internship",
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
          {paginatedJobs.map((job) => (
            <div
              key={job.id}
              className="group rounded-2xl bg-white dark:bg-slate-800 p-6 shadow-md ring-1 ring-gray-200 transition-all hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="mb-4 flex items-start justify-between">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-indigo-600">
                  {job.title}
                </h2>
                <span
                  className={`px-3 py-1 rounded-full text-xs text-nowrap font-semibold ${job.color}`}
                >
                  {job.employmentType}
                </span>
              </div>
              <div className="mb-2 flex items-center gap-2 text-sm text-gray-600 dark:text-white">
                <Briefcase size={16} />
                {job.company}
              </div>
              <div className="mb-4 flex items-center gap-2 text-sm text-gray-500 dark:text-white">
                <MapPin size={16} />
                {job.location}
              </div>
              <div className="flex items-center gap-1 justify-center pt-4 text-xs text-gray-400 dark:text-white">
                <Clock size={14} />
                {job.postedAt}
                <button
                  onClick={() => setSelectedJob(job)}
                  className="text-indigo-600 dark:text-sky-100 text-lg hover:underline ml-auto cursor-pointer"
                >
                  View Details →
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      <div className="mt-10 flex items-center justify-center gap-3">
        {/* Prev Button */}
        <button
          onClick={() => setPageIndex((p) => Math.max(p - 1, 0))}
          disabled={pageIndex === 0}
          className="
      px-4 py-2 rounded-lg border border-gray-300 bg-white dark:bg-slate-500
      text-gray-700 dark:text-white font-medium
      shadow-sm hover:bg-gray-100 hover:border-gray-400
      disabled:opacity-40 disabled:cursor-not-allowed
      transition-colors duration-150 cursor-pointer dark:hover:bg-gray-600
    "
        >
          Prev
        </button>

        {/* Page Indicator */}
        <span className="px-3 py-2 rounded-full bg-gray-100 dark:bg-slate-500 text-gray-800 dark:text-white font-medium shadow-inner">
          Page {pageIndex + 1} of {totalPages}
        </span>

        {/* Next Button */}
        <button
          onClick={() => setPageIndex((p) => Math.min(p + 1, totalPages - 1))}
          disabled={pageIndex === totalPages - 1}
          className="
      px-4 py-2 rounded-lg border border-gray-300 bg-white dark:bg-slate-500
      text-gray-700 dark:text-white font-medium
      shadow-sm hover:bg-gray-100 hover:border-gray-400 dark:hover:bg-gray-600
      disabled:opacity-40 disabled:cursor-not-allowed
      transition-colors duration-150 cursor-pointer
    "
        >
          Next
        </button>
      </div>

      {/* Job Modal */}
      <Modal
        open={!!selectedJob}
        onOpenChange={(open) => {
          if (!open) setSelectedJob(null);
        }}
        title={selectedJob?.title}
        description={selectedJob?.company}
      >
        {selectedJob && (
          <div className="space-y-2 text-md text-gray-600 dark:text-white md:max-h-[90vh]">
            <p>
              <strong>Location:</strong> {selectedJob.location}
            </p>
            <p>
              <strong>Employment Type:</strong> {selectedJob.employmentType}
            </p>
            <p>
              <strong>Work Mode:</strong> {selectedJob.workMode}
            </p>
            <p>
              <strong>Department:</strong> {selectedJob.department}
            </p>
            <p>
              <strong>Experience Level:</strong> {selectedJob.experienceLevel}
            </p>
            <p>
              <strong>Salary Range:</strong> {selectedJob.salaryRange}
            </p>
            <p>
              <strong>Description:</strong> {selectedJob.description}
            </p>
            <div>
              <strong>Responsibilities:</strong>
              <ul className="list-disc ml-6">
                {selectedJob.responsibilities.map((r, i) => (
                  <li key={i}>{r}</li>
                ))}
              </ul>
            </div>
            <div>
              <strong>Requirements:</strong>
              <ul className="list-disc ml-6">
                {selectedJob.requirements.map((r, i) => (
                  <li key={i}>{r}</li>
                ))}
              </ul>
            </div>
            {selectedJob.niceToHave.length > 0 && (
              <div>
                <strong>Nice-to-Have:</strong>
                <ul className="list-disc ml-6">
                  {selectedJob.niceToHave.map((r, i) => (
                    <li key={i}>{r}</li>
                  ))}
                </ul>
              </div>
            )}
            {selectedJob.benefits.length > 0 && (
              <div>
                <strong>Benefits:</strong>
                <ul className="list-disc ml-6">
                  {selectedJob.benefits.map((r, i) => (
                    <li key={i}>{r}</li>
                  ))}
                </ul>
              </div>
            )}
            <Button value="Apply" />
          </div>
        )}
      </Modal>
    </div>
  );
}
