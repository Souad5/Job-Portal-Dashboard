import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FormProvider } from "react-hook-form";
import { jobSchema, JobFormValues } from "../types/job";
import Button from "../components/ui/Button";
import Stepper from "../components/stepper/Stepper";
import StepCompanyInfo from "../components/stepperform/StepCompanyInfo";
import StepRequirements from "../components/stepperform/StepRequirements";
import StepReview from "../components/stepperform/StepReview";
import StepJobsDetails from "../components/stepperform/StepJobsDetails";
import SecondaryButton from "../components/ui/SecondaryButton";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";

const steps = [
  "Job Details",
  "Company Info",
  "Requirements",
  "Review & Publish",
];

export default function JobPostPage() {
  const [step, setStep] = useState(1);
  const [isValidating, setIsValidating] = useState(false);
  const methods = useForm<JobFormValues>({
    resolver: zodResolver(jobSchema),
    defaultValues: {
      title: "",
      type: "Full-time",
      summary: "",
      companyName: "",
      location: "",
      companyDescription: "",
      experience: "",
      education: "",
      skills: "",
      niceToHave: "",
    },
    mode: "onChange",
  });
  const {
    trigger,
    formState: { isSubmitting },
    handleSubmit,
    reset,
  } = methods;
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

  const navigate = useNavigate();

  const onSubmit = async (data: JobFormValues) => {
    if (step !== steps.length) return;

    // Simulate API call
    await new Promise((r) => setTimeout(r, 1400));
    console.log("Job posted:", data);
    toast.success("Job published successfully!");
    reset();
    navigate("/all-jobs");
  };

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 py-6 px-4 transition-colors duration-500 ease-in-out">
      <div>
        <div className="mb-10 text-left text-[#044635] dark:text-[#0af0b4]">
          <h1 className="md:text-3xl text-xl font-bold">Post a New Job</h1>
          <p className="mt-3 text-lg text-gray-600 dark:text-gray-200">
            Fill in the details — we'll guide you step by step.
          </p>
        </div>
        <div className="overflow-hidden rounded-2xl bg-white dark:bg-slate-800 shadow-xl ring-1  ring-gray-200/70">
          <div className="px-6 pt-8 pb-10 sm:px-10">
            <FormProvider {...methods}>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (step === steps.length) {
                    handleSubmit(onSubmit)(e);
                  }
                }}
                noValidate
              >
                <Stepper steps={steps} currentStep={step} />
                <div className="mt-10 min-h-90">
                  {step === 1 && <StepJobsDetails />}
                  {step === 2 && <StepCompanyInfo />}
                  {step === 3 && <StepRequirements />}
                  {step === 4 && <StepReview />}
                </div>
                <div className="mt-12 flex items-center justify-between gap-4 border-t border-gray-200 pt-6">
                  {step > 1 && (
                    <SecondaryButton
                      value="Back"
                      type="button"
                      onClick={() => handleBack()}
                      disabled={isSubmitting}
                    ></SecondaryButton>
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
                      <button
                        type="submit"
                        className="px-5 py-2.5 relative rounded group font-medium text-white inline-block cursor-pointer "
                      >
                        <span className="absolute top-0 left-0 w-full h-full rounded opacity-50 filter blur-sm bg-linear-to-br from-[#1e5849] to-green-500"></span>
                        <span className="h-full w-full inset-0 absolute mt-0.5 ml-0.5 bg-linear-to-br filter group-active:opacity-0 rounded opacity-50 from-green-800 to-green-500"></span>
                        <span className="absolute inset-0 w-full h-full transition-all duration-200 ease-out rounded shadow-xl bg-linear-to-br filter group-active:opacity-0 group-hover:blur-sm from-green-600 to-green-500"></span>
                        <span
                          className={`absolute inset-0 w-full h-full transition duration-200 ease-out rounded bg-linear-to-br to-[#1e5849] from-[#1e5849]/40 `}
                        ></span>
                        <span className="relative">Publish Job</span>
                      </button>
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
