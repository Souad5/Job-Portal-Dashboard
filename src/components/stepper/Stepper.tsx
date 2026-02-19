import { Check } from "lucide-react";
import clsx from "clsx";

interface StepperProps {
  steps: string[];
  currentStep: number; // 1-based index
}

export default function Stepper({ steps, currentStep }: StepperProps) {
  return (
    <nav aria-label="Progress">
      <ol className="flex items-center">
        {steps.map((label, index) => {
          const step = index + 1;
          const isActive = step === currentStep;
          const isCompleted = step < currentStep;
          const isLast = index === steps.length - 1;

          return (
            <li
              key={label}
              className={clsx(
                "relative flex flex-1 flex-col items-center",
                !isLast && "pr-4",
              )}
            >
              {/* Connector */}
              {!isLast && (
                <span
                  aria-hidden="true"
                  className={clsx(
                    "absolute left-96 top-5 h-0.5 w-full -translate-x-1/2",
                    isCompleted ? "bg-blue-600" : "bg-gray-200",
                  )}
                />
              )}

              {/* Step circle */}
              <span
                role="listitem"
                aria-current={isActive ? "step" : undefined}
                className={clsx(
                  "relative z-10 flex h-9 w-9 items-center justify-center rounded-full text-sm font-semibold transition-all duration-300",
                  isCompleted &&
                    "bg-blue-600 text-white ring-4 ring-blue-600/20",
                  isActive && "bg-white text-blue-600 ring-4 ring-blue-600/30",
                  !isCompleted &&
                    !isActive &&
                    "bg-gray-100 text-gray-500 ring-1 ring-gray-300",
                )}
              >
                {isCompleted ? (
                  <Check className="h-5 w-5" aria-hidden="true" />
                ) : (
                  step
                )}
              </span>

              {/* Label */}
              <span
                className={clsx(
                  "mt-3 text-center text-xs font-medium transition-colors",
                  isCompleted || isActive ? "text-gray-900" : "text-gray-500",
                )}
              >
                {label}
              </span>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
