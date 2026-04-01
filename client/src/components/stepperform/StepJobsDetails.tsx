import Input from "../ui/Input";
import Select from "../ui/Select";
import Textarea from "../ui/Textarea";
import { MdOutlineTipsAndUpdates } from "react-icons/md";

export default function StepJobDetails() {
  return (
    <div className="space-y-10">
      {/* Section Header */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-200">
          Job Details
        </h2>
        <p className="text-md text-gray-500 dark:text-gray-100 mt-1 max-w-xl">
          Provide a clear and concise overview of the role. This information
          will be visible to candidates and used for search relevance.
        </p>
      </div>

      {/* Core Fields */}
      <div className="grid grid-cols-1 space-y-4">
        <Input
          placeholder="Enter Title"
          name="title"
          label="Job Title"
          required
        />
        <Select
          name="type"
          label="Employment Type"
          options={[
            "Full-time",
            "Part-time",
            "Contract",
            "Internship",
            "Remote",
          ]}
        />
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <Select
            name="currency"
            label="Currency"
            options={["USD", "EUR", "GBP", "INR"]}
          />
          <Input name="salaryMin" label="Min Salary" type="number" />
          <Input name="salaryMax" label="Max Salary" type="number" />
        </div>
        <Textarea
          name="summary"
          label="Job Summary"
          required
          rows={5}
          placeholder="Briefly describe the role, its impact, and the type of candidate you are looking for."
        />
      </div>

      {/* Guidance Note */}
      <div className="rounded-md bg-gray-50 dark:bg-gray-800 dark:text-gray-500 border border-gray-200 dark:border-gray-700 p-4">
        <p className="text-sm text-gray-600 dark:text-gray-400  selection:bg-red-400 flex items-start gap-2">
          <span className="flex items-center gap-1 font-medium text-gray-800 dark:text-gray-50">
            <MdOutlineTipsAndUpdates className="text-lg" />
            Tip:
          </span>
          <span>
            Job postings with a clear title and concise summary receive
            significantly more qualified applicants.
          </span>
        </p>
      </div>
    </div>
  );
}
