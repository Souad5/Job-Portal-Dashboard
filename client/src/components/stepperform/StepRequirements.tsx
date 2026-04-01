import Input from "../ui/Input";
import Textarea from "../ui/Textarea";
import { PiGlobeStandBold } from "react-icons/pi";

export default function StepRequirements() {
  return (
    <div className="space-y-10">
      {/* Section Header */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          Role Requirements
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 max-w-xl">
          Define the experience and skills required for this role. Clear
          requirements help attract the right candidates and reduce noise.
        </p>
      </div>

      {/* Experience Level */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        <Input
          placeholder="Enter experience level"
          required
          name="experience"
          label="Experience Level"
        />

        <Input
          placeholder="Enter education field"
          name="education"
          label="Education (Optional)"
        />
      </div>

      {/* Skills */}
      <Textarea
        name="skills"
        label="Required Skills"
        rows={5}
        required
        placeholder="List the core technical and soft skills required for this role."
      />

      {/* Nice-to-have */}
      <Textarea
        name="niceToHave"
        label="Nice-to-Have Skills (Optional)"
        rows={4}
        placeholder="Optional skills that would be beneficial but are not required."
      />

      {/* Guidance Block */}
      <div className="rounded-md border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 p-4">
        <p className="text-sm text-gray-600 dark:text-gray-400  selection:bg-red-400 flex items-start gap-2">
          <span className="font-medium flex items-center gap-1 text-gray-800 dark:text-gray-100 text-nowrap">
            <PiGlobeStandBold />
            Best practice:
          </span>
          <span>
            Focus on must-have skills and avoid overly long lists. Clear and
            realistic requirements lead to higher-quality applicants.
          </span>
        </p>
      </div>
    </div>
  );
}
