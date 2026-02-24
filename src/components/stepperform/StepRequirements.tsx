import Input from "../ui/Input";
import Textarea from "../ui/Textarea";

export default function StepRequirements() {
  return (
    <div className="space-y-10">
      {/* Section Header */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900">
          Role Requirements
        </h2>
        <p className="text-sm text-gray-500 mt-1 max-w-xl">
          Define the experience and skills required for this role. Clear
          requirements help attract the right candidates and reduce noise.
        </p>
      </div>

      {/* Experience Level */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        <Input
          placeholder=""
          required
          name="experience"
          label="Experience Level"
        />

        <Input placeholder="" name="education" label="Education (Optional)" />
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
      <div className="rounded-md border border-gray-200 bg-gray-50 p-4">
        <p className="text-sm text-gray-600 leading-relaxed">
          <span className="font-medium text-gray-800">Best practice:</span>{" "}
          Focus on must-have skills and avoid overly long lists. Clear and
          realistic requirements lead to higher-quality applicants.
        </p>
      </div>
    </div>
  );
}
