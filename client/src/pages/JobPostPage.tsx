import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FormProvider } from "react-hook-form";
import { jobSchema, type JobFormValues } from "../types/job";
import Button from "../components/ui/Button";
import Stepper from "../components/stepper/Stepper";
import StepCompanyInfo from "../components/stepperform/StepCompanyInfo";
import StepRequirements from "../components/stepperform/StepRequirements";
import StepReview from "../components/stepperform/StepReview";
import StepJobsDetails from "../components/stepperform/StepJobsDetails";
import SecondaryButton from "../components/ui/SecondaryButton";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { API_BASE_URL } from "@/config";

const steps = [
  "Job Details",
  "Company Info",
  "Requirements",
  "Review & Publish",
];

const JobPostPage = () => {
  const [step, setStep] = useState(1);
  const [isValidating, setIsValidating] = useState(false);

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const methods = useForm<JobFormValues>({
    resolver: zodResolver(jobSchema),
    defaultValues: {
      title: "",
      type: "Full-time",
      summary: "",
      companyName: "",
      companyDescription: "",
      experience: "",
      education: "",
      skills: "",
      niceToHave: "",
      salaryMin: "",
      salaryMax: "",
      workMode: "Onsite",
    },
    mode: "onChange",
  });

  const { trigger, handleSubmit, reset } = methods;

  // ---------------- TanStack Mutation ----------------

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const createJobMutation = useMutation<any, any, JobFormValues>({
    mutationFn: async (jobData: JobFormValues) => {
      try {
        const res = await axios.post(
          `${API_BASE_URL}/jobs/create-job`,
          jobData,
        );
        return res.data;
      } catch (err) {
        const error = err as AxiosError;
        console.error("Backend response error:", error.response?.data);
        throw err;
      }
    },
    onSuccess: () => {
      toast.success("Job published successfully!");
      reset();
      navigate("/all-jobs");
      queryClient.invalidateQueries({ queryKey: ["jobs"] });
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      console.error("Failed to create job:", error.response?.data || error);
      toast.error(error.response?.data?.message || "Failed to publish job");
    },
  });

  // ---------------- Step Navigation ----------------
  const handleContinue = async () => {
    setIsValidating(true);
    let isStepValid = false;

    if (step === 1) {
      isStepValid = await trigger(["title", "type", "summary"]);
    } else if (step === 2) {
      isStepValid = await trigger([
        "companyName",
        "workMode",
        "companyDescription",
      ]);
    } else if (step === 3) {
      isStepValid = await trigger(["experience", "skills"]);
    }

    setIsValidating(false);
    if (isStepValid) setStep((prev) => Math.min(prev + 1, steps.length));
  };

  const handleBack = () => setStep((prev) => Math.max(prev - 1, 1));

  const onSubmit = (data: JobFormValues) => {
    console.log("Sending job data:", data);
    if (step !== steps.length) return;
    const payload = {
      ...data,
      salaryRange: {
        min: data.salaryMin ? Number(data.salaryMin) : undefined,
        max: data.salaryMax ? Number(data.salaryMax) : undefined,
        currency: "USD",
        period: "year",
      },
    };
    createJobMutation.mutate(payload);
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

        <div className="overflow-hidden rounded-2xl bg-white dark:bg-slate-800 shadow-xl ring-1 ring-gray-200/70">
          <div className="px-6 pt-8 pb-10 sm:px-10">
            <FormProvider {...methods}>
              <form noValidate>
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
                      onClick={handleBack}
                      disabled={createJobMutation.isPending}
                    />
                  )}

                  <div className="ml-auto flex items-center gap-4">
                    {step < steps.length ? (
                      <Button
                        type="button"
                        onClick={handleContinue}
                        loading={isValidating}
                        value="Continue"
                        disabled={isValidating || createJobMutation.isPending}
                      />
                    ) : (
                      <Button
                        type="button"
                        onClick={handleSubmit(onSubmit)}
                        value={
                          createJobMutation.isPending
                            ? "Publishing..."
                            : "Publish Job"
                        }
                        disabled={createJobMutation.isPending}
                      />
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
};

export default JobPostPage;
