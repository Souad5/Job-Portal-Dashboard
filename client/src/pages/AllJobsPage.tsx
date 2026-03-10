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
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import Button from "../components/ui/Button";
import { Modal } from "../components/ui/Modal";
import axios from "axios";
import Select from "../components/ui/Select";
import { FormProvider, useForm } from "react-hook-form";
import Input from "../components/ui/Input";
import SecondaryButton from "../components/ui/SecondaryButton";
import toast from "react-hot-toast";
import { API_BASE_URL } from "@/config";

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  employmentType: string;
  experienceLevel: string;
  salaryRange: string;
  postedAt: string;
  description: string;
  requirements: string[];
  niceToHave: string[];
  status?: "approved" | "rejected" | "pending";
}

export default function AllJobsPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [pageIndex, setPageIndex] = useState(0);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

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

  const handleApprove = async (job: Job | null) => {
    if (!job) return;
    try {
      const { data } = await axios.patch(
        `${API_BASE_URL}/jobs/${job.id}/status`,
        {
          status: "approved",
        },
      );

      setJobs((prev) =>
        prev.map((j) => (j.id === job.id ? { ...j, status: data.status } : j)),
      );

      setSelectedJob((prev) =>
        prev && prev.id === job.id ? { ...prev, status: data.status } : prev,
      );
    } catch (err) {
      console.error("Failed to approve job", err);
    }
    setSelectedJob(null);
  };

  const handleReject = async (job: Job | null) => {
    if (!job) return;
    try {
      const { data } = await axios.patch(
        `${API_BASE_URL}/jobs/${job.id}/status`,
        {
          status: "rejected",
        },
      );
      // update client state
      setJobs((prev) =>
        prev.map((j) => (j.id === job.id ? { ...j, status: data.status } : j)),
      );

      setSelectedJob((prev) =>
        prev && prev.id === job.id ? { ...prev, status: data.status } : prev,
      );
    } catch (err) {
      console.error("Failed to reject job", err);
    }
    setSelectedJob(null);
  };

  const handleDelete = async (job: Job | null) => {
    if (!job) return;
    try {
      await axios.delete(`${API_BASE_URL}/jobs/${job.id}`);
      setJobs((prev) => prev.filter((j) => j.id !== job.id));
      setSelectedJob(null); // close modal
      toast.success("Job deleted successfully");
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete job");
    }
  };

  // Fetch & transform jobs
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);

        const response = await axios.get(`${API_BASE_URL}/jobs`);

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const transformed = response?.data?.map((raw: any) => ({
          id: raw._id,

          title: raw.title || raw.jobTitle,

          company: raw.companyName,

          location:
            typeof raw.location === "object"
              ? `${raw.location.city || ""} ${raw.location.country || ""}`.trim() ||
                "Remote"
              : raw.location || "Remote",

          employmentType: raw.type || "Full-time",

          experienceLevel: raw.experience || "Not specified",

          salaryRange: raw.salaryRange
            ? `$${raw.salaryRange.min.toLocaleString()} – $${raw.salaryRange.max.toLocaleString()} ${raw.salaryRange.currency || "USD"} / ${raw.salaryRange.period || "year"}`
            : "Negotiable",

          postedAt: new Date(raw.createdAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          }),

          description:
            raw.summary || raw.companyDescription || "No description available",

          requirements: raw.skills || [],

          niceToHave: raw.niceToHave || [],

          status: raw.status || "pending",
        }));

        setJobs(transformed);
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
      job?.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job?.company?.toLowerCase().includes(searchQuery.toLowerCase());
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

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-white dark:bg-slate-900">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-900 dark:border-sky-400" />
      </div>
    );
  }

  if (error) return <p className="text-red-500 text-center py-10">{error}</p>;

  return (
    <div className="px-4 py-6 bg-white dark:bg-slate-900 min-h-screen transition-colors">
      {/* Header */}
      <div className="mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h1 className="md:text-3xl text-xl font-semibold text-[#044635] dark:text-[#0af0b4]">
          Open Positions
        </h1>
        <Link to="/job-post">
          <Button value="Create Job" />
        </Link>
      </div>

      {/* Filters */}
      <FormProvider {...methods}>
        <form className="py-4 flex justify-between flex-col sm:flex-row gap-4 w-full">
          <div className="w-full sm:w-64 md:w-72">
            <Input
              name="search"
              label="Search"
              placeholder="Search by title or company..."
            />
          </div>
          <div className="w-full sm:w-64 md:w-72">
            <Select
              name="employmentType"
              label="Employment Type"
              options={[
                "All",
                "Full-time",
                "Part-time",
                "Contract",
                "Internship",
                "Remote",
              ]}
            />
          </div>
        </form>
      </FormProvider>

      {/* Job Grid */}
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
          <p className="text-gray-500 dark:text-gray-300 text-center max-w-sm">
            Try adjusting your search or filters.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {paginatedJobs.map((job) => {
            const status = job.status ?? "pending";

            const statusConfig = {
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
                icon: <Hourglass size={12} />,
                styles:
                  "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400",
                label: "Pending",
              },
            };

            const currentStatus = statusConfig[status];

            return (
              <div
                key={job.id}
                className="group relative rounded-xl bg-white dark:bg-slate-800 p-4 shadow-sm ring-1 ring-gray-200/70 dark:ring-slate-700 hover:-translate-y-1 hover:shadow-md transition-all duration-200"
              >
                {/* Title + employment type */}
                <div className="mb-3 flex items-start justify-between gap-3">
                  <h2 className="text-base font-semibold text-gray-900 dark:text-white group-hover:text-indigo-700 dark:group-hover:text-indigo-400 transition">
                    {job.title}
                  </h2>
                  <span
                    className={`shrink-0 px-2.5 py-0.5 rounded-full text-xs font-medium ${employmentTypeColors[job.employmentType] || "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-200"}`}
                  >
                    {job.employmentType}
                  </span>
                </div>

                {/* Company */}
                <div className="mb-1.5 flex items-center gap-1.5 text-sm text-gray-600 dark:text-gray-300">
                  <Briefcase size={15} />
                  {job.company}
                </div>

                {/* Location */}
                <div className="mb-3 flex items-start justify-between gap-1.5 text-sm text-gray-500 dark:text-gray-400">
                  <span className="flex items-start gap-1.5">
                    <MapPin size={15} />
                    {job.location}
                  </span>
                  <span
                    className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium ${currentStatus.styles}`}
                  >
                    {currentStatus.icon} {currentStatus.label}
                  </span>
                </div>

                {/* Footer */}
                <div className="flex items-center gap-2 pt-3 border-t border-gray-100 dark:border-slate-700 text-xs text-gray-500 dark:text-gray-400">
                  <div className="flex items-center gap-1.5">
                    <Clock size={13} />
                    {job.postedAt}
                  </div>
                  <button
                    onClick={() => setSelectedJob(job)}
                    className="ml-auto text-indigo-600 dark:text-indigo-400 font-medium hover:text-indigo-800 dark:hover:text-indigo-300 transition text-sm cursor-pointer"
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
      {totalPages > 1 && (
        <div className="mt-10 flex items-center justify-center gap-2 flex-wrap">
          <button
            onClick={goToFirst}
            disabled={pageIndex === 0}
            className={`cursor-pointer disabled:cursor-not-allowed disabled:opacity-60`}
          >
            <ChevronsLeft size={16} />
          </button>
          <button
            onClick={goPrev}
            disabled={pageIndex === 0}
            className={`cursor-pointer disabled:cursor-not-allowed disabled:opacity-60`}
          >
            <ChevronLeft size={16} />
          </button>

          {Array.from({ length: totalPages }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => setPageIndex(idx)}
              className={`px-3 py-2 rounded-lg border shadow-sm font-medium ${
                idx === pageIndex
                  ? "bg-sky-600 text-white border-sky-600"
                  : "bg-white dark:bg-slate-600 text-gray-700 dark:text-white border-gray-300 dark:border-slate-500 hover:bg-gray-100 dark:hover:bg-slate-500 cursor-pointer"
              }`}
            >
              {idx + 1}
            </button>
          ))}

          <button
            onClick={goNext}
            disabled={pageIndex === totalPages - 1}
            className={`cursor-pointer disabled:cursor-not-allowed disabled:opacity-60`}
          >
            <ChevronRight size={16} />
          </button>
          <button
            onClick={goToLast}
            disabled={pageIndex === totalPages - 1}
            className={`cursor-pointer disabled:cursor-not-allowed disabled:opacity-60`}
          >
            <ChevronsRight size={16} />
          </button>
        </div>
      )}

      {/* Modal */}
      <Modal
        open={!!selectedJob}
        onOpenChange={() => setSelectedJob(null)}
        title={selectedJob?.title}
        description={`${selectedJob?.company} • ${selectedJob?.location}`}
      >
        {selectedJob && (
          <div className="max-h-[75vh] p-1 space-y-8 text-slate-800 dark:text-slate-100 custom-scrollbar">
            <div className="p-6 relative space-y-6">
              {/* Job Overview */}
              <section className="space-y-4">
                <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
                  Overview
                </h2>
                <div className="grid sm:grid-cols-2 gap-6">
                  {[
                    {
                      label: "Employment Type",
                      field: "employmentType" as const,
                    },
                    {
                      label: "Experience Level",
                      field: "experienceLevel" as const,
                    },
                    { label: "Salary Range", field: "salaryRange" as const },
                    { label: "Posted At", field: "postedAt" as const },
                  ].map((item) => (
                    <div
                      key={item.field}
                      className="p-5 rounded-xl bg-linear-to-br from-slate-50 to-white 
                           dark:from-slate-800 dark:to-slate-900 
                           border border-slate-200/60 dark:border-slate-700 shadow-sm"
                    >
                      <p className="text-xs uppercase tracking-wide text-slate-500 mb-2">
                        {item.label}
                      </p>
                      <p className="font-semibold text-slate-900 dark:text-white">
                        {selectedJob[item.field] || "—"}
                      </p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Job Summary */}
              <section className="space-y-4 mt-4">
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white">
                  Job Summary
                </h3>
                <p className="leading-relaxed text-slate-700 dark:text-slate-300 whitespace-pre-line">
                  {selectedJob.description || "No summary provided."}
                </p>
              </section>

              {/* Requirements */}
              <section>
                <h3 className="mb-4 text-xl font-semibold text-slate-900 dark:text-white">
                  Requirements
                </h3>
                <p className="whitespace-pre-line text-slate-700 dark:text-slate-300">
                  {(selectedJob.requirements || []).join("\n")}
                </p>
              </section>

              {/* Nice to Have */}
              <section>
                <h3 className="mb-4 text-xl font-semibold text-slate-900 dark:text-white">
                  Nice to Have
                </h3>
                <p className="whitespace-pre-line text-slate-700 dark:text-slate-300">
                  {(selectedJob.niceToHave || []).join("\n")}
                </p>
              </section>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 border-t border-slate-200 dark:border-slate-700 pt-8 mt-6">
                <div className="flex flex-col gap-4 w-full">
                  <div className="flex md:justify-between gap-3">
                    <Button
                      onClick={() => handleApprove(selectedJob)}
                      className="bg-emerald-600 hover:bg-emerald-700 cursor-pointer w-[50%] md:w-full"
                      value="Approve"
                      disabled={selectedJob.status === "approved"}
                    />
                    <SecondaryButton
                      onClick={() => handleReject(selectedJob)}
                      className="border-rose-600 text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 cursor-pointer w-[50%] md:w-full"
                      value="Reject"
                      disabled={selectedJob.status === "rejected"}
                    />
                  </div>

                  {/* Navigate to Edit Page */}
                  <SecondaryButton
                    value="Edit"
                    onClick={() => {
                      if (selectedJob) navigate(`/edit-job/${selectedJob.id}`);
                    }}
                  />

                  <SecondaryButton
                    value="Delete"
                    onClick={() => handleDelete(selectedJob)}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
