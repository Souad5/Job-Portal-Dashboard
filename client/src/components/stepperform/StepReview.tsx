import { useFormContext } from "react-hook-form";
import type { JobFormValues } from "../../types/job";

interface ReviewItemProps {
  label: string;
  value?: string;
}

function ReviewItem({ label, value }: ReviewItemProps) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
        {label}
      </span>
      <span className="text-sm text-gray-900 dark:text-gray-100">
        {value || "—"}
      </span>
    </div>
  );
}

export default function StepReview() {
  const { getValues } = useFormContext<JobFormValues>();
  const values = getValues();

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          Review Job Posting
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Please review the information below before publishing.
        </p>
      </div>

      {/* Job Details */}
      <section className="rounded-lg border border-gray-200 dark:border-gray-700 p-6 space-y-4">
        <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200">
          Job Details
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <ReviewItem label="Job Title" value={values.title} />
          <ReviewItem label="Employment Type" value={values.type} />
        </div>
      </section>

      {/* Company Info */}
      <section className="rounded-lg border border-gray-200 dark:border-gray-700 p-6 space-y-4">
        <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200">
          Company Information
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <ReviewItem label="Company Name" value={values.companyName} />
          <ReviewItem label="Work Mode" value={values.workMode} />
        </div>
      </section>

      {/* Requirements */}
      <section className="rounded-lg border border-gray-200 dark:border-gray-700 p-6 space-y-4">
        <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200">
          Requirements
        </h3>

        <div className="space-y-6">
          <ReviewItem label="Experience Level" value={values.experience} />

          <div className="flex flex-col gap-1">
            <span className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
              Required Skills
            </span>
            <p className="text-sm text-gray-900 dark:text-gray-100 whitespace-pre-line">
              {values.skills || "—"}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
