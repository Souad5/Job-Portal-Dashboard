// JobPostForm.tsx
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FormProvider } from "react-hook-form";

import { jobSchema, JobFormValues } from "../types/job";

import Button from "../components/ui/Button";
import Stepper from "../components/stepper/Stepper";

import StepCompanyInfo from "../components/stepperform/StepCompanyInfo";
import StepRequirements from "../components/stepperform/StepRequirements";
import StepReview from "../components/stepperform/StepReview";
import StepJobDetails from "../components/stepperform/StepJobsDetails";

const steps = [
  "Job Details",
  "Company Info",
  "Requirements",
  "Review & Publish",
];

export default function JobPostForm() {
  const [step, setStep] = useState(1);
  const [isValidating, setIsValidating] = useState(false);

  const methods = useForm<JobFormValues>({
    resolver: zodResolver(jobSchema),
    defaultValues: {
      type: "Full-time",
      summary: "",
      companyDescription: "",
      skills: "",
      niceToHave: "",
    },
    mode: "onChange",
  });

  const {
    trigger,
    formState: { isValid, isSubmitting },
    handleSubmit,
    reset,
  } = methods;

  // Validate only current step fields before allowing "Continue"
  const handleContinue = async () => {
    setIsValidating(true);
    let isStepValid = false;

    if (step === 1) {
      isStepValid = await trigger(["title", "type", "summary"]);
    } else if (step === 2) {
      isStepValid = await trigger([
        "companyName",
        "location",
        "companyDescription",
      ]);
    } else if (step === 3) {
      isStepValid = await trigger(["experience", "skills"]);
    }

    setIsValidating(false);

    if (isStepValid) {
      setStep((prev) => Math.min(prev + 1, steps.length));
    }
  };

  const handleBack = () => {
    setStep((prev) => Math.max(prev - 1, 1));
  };

  const onSubmit = async (data: JobFormValues) => {
    // Simulate API call
    await new Promise((r) => setTimeout(r, 1400));
    console.log("Job posted:", data);
    alert("Job published successfully!");
    reset();
    setStep(1);
  };

  return (
    <div className="min-h-screen bg-gray-50/60 py-8 px-4 sm:px-6 lg:px-4">
      <div className="">
        <div className="mb-10 text-left text-[#044635]">
          <h1 className="text-3xl font-bold">Post a New Job</h1>
          <p className="mt-3 text-lg text-gray-600">
            Fill in the details — we'll guide you step by step.
          </p>
        </div>

        <div className="overflow-hidden rounded-2xl bg-white shadow-xl ring-1 ring-gray-200/70">
          <div className="px-6 pt-8 pb-10 sm:px-10">
            <FormProvider {...methods}>
              <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <Stepper steps={steps} currentStep={step} />

                <div className="mt-10 min-h-[360px]">
                  {step === 1 && <StepJobDetails />}
                  {step === 2 && <StepCompanyInfo />}
                  {step === 3 && <StepRequirements />}
                  {step === 4 && <StepReview />}
                </div>

                <div className="mt-12 flex items-center justify-between gap-4 border-t border-gray-200 pt-6">
                  {step > 1 && (
                    <Button
                      value="Back"
                      type={{}}
                      onClick={() => handleBack}
                      disabled={isSubmitting}
                      loading
                    ></Button>
                  )}

                  <div className="ml-auto flex items-center gap-4">
                    {step < steps.length ? (
                      <Button
                        type="button"
                        onClick={handleContinue}
                        loading={isValidating}
                        value="Continue"
                        disabled={isValidating || isSubmitting}
                      ></Button>
                    ) : (
                      <Button
                        value=" Publish Job"
                        type="submit"
                        loading={isSubmitting}
                        disabled={isSubmitting || !isValid}
                        onClick={() => {}}
                      ></Button>
                    )}
                  </div>
                </div>
              </form>
            </FormProvider>
          </div>
        </div>
      </div>
    </div>
  );
}
