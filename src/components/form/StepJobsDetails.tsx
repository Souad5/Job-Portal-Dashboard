import Input from "../ui/Input";
import Select from "../ui/Select";
import Textarea from "../ui/Textarea";

export default function StepJobDetails() {
  return (
    <div className="space-y-10">
      {/* Section Header */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900">Job Details</h2>
        <p className="text-md text-gray-500 mt-1 max-w-xl">
          Provide a clear and concise overview of the role. This information
          will be visible to candidates and used for search relevance.
        </p>
      </div>

      {/* Core Fields */}
      <div className="grid grid-cols-1 gap-8">
        <Input name="title" label="Job Title" />

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

        <Textarea
          name="summary"
          label="Job Summary"
          rows={5}
          placeholder="Briefly describe the role, its impact, and the type of candidate you are looking for."
        />
      </div>

      {/* Guidance Note */}
      <div className="rounded-md bg-gray-50 border border-gray-200 p-4">
        <p className="text-md text-gray-600 leading-relaxed selection:bg-red-400">
          <span className="font-medium text-gray-800">Tip:</span> Job postings
          with a clear title and concise summary receive significantly more
          qualified applicants.
        </p>
      </div>
    </div>
  );
}
