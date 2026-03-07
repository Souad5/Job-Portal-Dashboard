import { Check } from "lucide-react";
import clsx from "clsx";

interface StepperProps {
  steps: string[];
  currentStep: number; // 1-based index
}

const Stepper = ({ steps, currentStep }: StepperProps) => {
  return (
    <nav aria-label="Progress">
      <ol className="flex w-full items-center">
        {steps.map((label, index) => {
          const step = index + 1;
          const isActive = step === currentStep;
          const isCompleted = step < currentStep;
          const isLast = index === steps.length - 1;
          return (
            <li
              key={label}
              className={clsx(
                "flex items-center",
                !isLast ? "w-full" : "shrink-0",
              )}
            >
              <div className="flex flex-col items-center">
                <span
                  role="listitem"
                  aria-current={isActive ? "step" : undefined}
                  className={clsx(
                    "z-10 flex h-9 w-9 items-center justify-center rounded-full text-sm font-semibold transition-all duration-300",
                    isCompleted &&
                      "bg-blue-600 text-white ring-4 ring-blue-600/20 shadow-sm",
                    isActive &&
                      "bg-white text-blue-600 ring-4 ring-blue-600/30 shadow dark:bg-gray-700 dark:text-blue-400 dark:ring-blue-400/30",
                    !isCompleted &&
                      !isActive &&
                      "bg-gray-100 text-gray-500 ring-1 ring-gray-300 dark:bg-gray-600 dark:text-gray-300 dark:ring-gray-500",
                  )}
                >
                  {isCompleted ? (
                    <Check className="h-5 w-5" aria-hidden="true" />
                  ) : (
                    step
                  )}
                </span>

                {/* Step Label */}
                <span
                  className={clsx(
                    "mt-3 text-center text-sm transition-colors hidden md:block",
                    isCompleted || isActive
                      ? "font-medium text-gray-900 dark:text-gray-50"
                      : "font-normal text-gray-500 dark:text-gray-400",
                  )}
                >
                  {label}
                </span>
              </div>
              {!isLast && (
                <div
                  className={clsx(
                    "md:ml-4 flex-auto md:h-0.5 md:-mt-8 hidden md:block",
                    step < currentStep ? "bg-blue-600" : "bg-gray-200",
                  )}
                />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Stepper;
