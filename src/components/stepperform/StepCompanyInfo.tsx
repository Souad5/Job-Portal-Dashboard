import Input from "../ui/Input";
import Textarea from "../ui/Textarea";

export default function StepCompanyInfo() {
  return (
    <div className="space-y-10">
      {/* Section Header */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900">
          Company Information
        </h2>
        <p className="text-md text-gray-500 mt-1 max-w-xl">
          Tell candidates about your organization. This helps build trust and
          improves application quality.
        </p>
      </div>

      {/* Core Company Details */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        <Input
          placeholder="Enter Company Name"
          name="companyName"
          label="Company Name"
        />

        <Input placeholder="Enter Location" name="location" label="Location" />
      </div>

      {/* Company Description */}
      <Textarea
        name="companyDescription"
        label="Company Description"
        rows={5}
        placeholder="Briefly describe your company, mission, and culture."
      />

      {/* Trust / Guidance Block */}
      <div className="rounded-md border border-gray-200 bg-gray-50 p-4">
        <p className="text-md text-gray-600 leading-relaxed">
          <span className="font-medium text-gray-800">Why this matters:</span>{" "}
          Candidates are more likely to apply when they understand your mission,
          values, and work environment.
        </p>
      </div>
    </div>
  );
}
