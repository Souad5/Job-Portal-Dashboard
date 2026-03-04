import Input from "../ui/Input";
import Textarea from "../ui/Textarea";
import { SiMatternet } from "react-icons/si";

export default function StepCompanyInfo() {
  return (
    <div className="space-y-10">
      {/* Section Header */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          Company Information
        </h2>
        <p className="text-md text-gray-500 dark:text-gray-400 mt-1 max-w-xl">
          Tell candidates about your organization. This helps build trust and
          improves application quality.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        <Input
          placeholder="Enter Company Name"
          name="companyName"
          label="Company Name"
          required
        />

        <Input
          placeholder="Enter Location"
          name="location"
          label="Location"
          required
        />
      </div>

      <Textarea
        name="companyDescription"
        label="Company Description"
        rows={5}
        required
        placeholder="Briefly describe your company, mission, and culture."
      />

      <div className="rounded-md border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 p-4">
        <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed flex items-start gap-2">
          <span className="flex items-center gap-1 text-nowrap font-medium text-gray-800 dark:text-gray-100">
            <SiMatternet className="text-lg" />
            Why this matters:
          </span>
          <span>
            Candidates are more likely to apply when they understand your
            mission, values, and work environment.
          </span>
        </p>
      </div>
    </div>
  );
}
