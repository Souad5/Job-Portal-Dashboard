import { Check } from "lucide-react";

interface StepperProps {
  currentStep: number;
}

const steps = ["Job Details", "Company Information", "Requirements", "Review"];

export default function Stepper({ currentStep }: StepperProps) {
  return (
    <div className="flex items-center justify-between mb-10">
      {steps.map((label, index) => {
        const stepNumber = index + 1;
        const active = stepNumber <= currentStep;

        return (
          <div key={label} className="flex-1 flex items-center w-full">
            <div
              className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-medium
                ${active ? "bg-indigo-600 text-white" : "bg-gray-200 text-gray-500"}
              `}
            >
              {active ? <Check /> : stepNumber}
            </div>

            {index !== steps.length - 1 && (
              <div
                className={`flex-1 h-0.5 mx-2
                  ${active ? "bg-indigo-600 " : "bg-gray-200"}
                `}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
