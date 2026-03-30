import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FormProvider } from "react-hook-form";
import { jobSchema, type JobFormValues } from "../types/job";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";
import Button from "../components/ui/Button";
import SecondaryButton from "../components/ui/SecondaryButton";
import Stepper from "../components/stepper/Stepper";
import StepCompanyInfo from "../components/stepperform/StepCompanyInfo";
import StepRequirements from "../components/stepperform/StepRequirements";
import StepReview from "../components/stepperform/StepReview";
import StepJobsDetails from "../components/stepperform/StepJobsDetails";
import { API_BASE_URL } from "@/config";
import Loading from "@/components/ui/Loading";

const steps = [
  "Job Details",
  "Company Info",
  "Requirements",
  "Review & Publish",
];

const JobEditPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

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

  const { reset, trigger, handleSubmit } = methods;

  // ---------------- Fetch Job ----------------
  useEffect(() => {
    const fetchJob = async () => {
      try {
        const { data } = await axios.get(`${API_BASE_URL}/jobs/${id}`);
        reset({
          title: data.title,
          type: data.type,
          summary: data.summary,
          companyName: data.companyName,
          companyDescription: data.companyDescription,
          experience: data.experience,
          education: data.education,
          skills: data.skills.join("\n"),
          niceToHave: (data.niceToHave || []).join("\n"),
          salaryMin: data.salaryRange?.min?.toString() || "",
          salaryMax: data.salaryRange?.max?.toString() || "",
          workMode: data.workMode || "Onsite",
        });
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (err) {
        toast.error("Failed to fetch job details");
        navigate("/all-jobs");
      } finally {
        setIsLoading(false);
      }
    };
    fetchJob();
  }, [id, reset, navigate]);

  // ---------------- Mutation ----------------
  const updateJobMutation = useMutation({
    mutationFn: async (jobData: JobFormValues) => {
      return axios.put(`${API_BASE_URL}/jobs/${id}`, {
        ...jobData,
        salaryRange: {
          min: jobData.salaryMin ? Number(jobData.salaryMin) : undefined,
          max: jobData.salaryMax ? Number(jobData.salaryMax) : undefined,
          currency: "USD",
          period: "year",
        },
      });
    },
    onSuccess: () => {
      toast.success("Job updated successfully");
      queryClient.invalidateQueries({ queryKey: ["jobs"] });
      navigate("/all-jobs");
    },
    onError: () => {
      toast.error("Failed to update job");
    },
  });

  // ---------------- Step Navigation ----------------
  const handleContinue = async () => {
    let isStepValid = false;
    if (step === 1) isStepValid = await trigger(["title", "type", "summary"]);
    else if (step === 2)
      isStepValid = await trigger([
        "companyName",
        "workMode",
        "companyDescription",
      ]);
    else if (step === 3) isStepValid = await trigger(["experience", "skills"]);
    if (isStepValid) setStep((prev) => Math.min(prev + 1, steps.length));
  };

  const handleBack = () => setStep((prev) => Math.max(prev - 1, 1));

  const onSubmit = (data: JobFormValues) => {
    if (step !== steps.length) return;
    updateJobMutation.mutate(data);
  };

  if (isLoading)
    return (
      <p className="text-center py-10">
        <Loading />
      </p>
    );

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 py-6 px-4">
      <div className="mb-10 text-left text-[#044635] dark:text-[#0af0b4]">
        <h1 className="md:text-3xl text-xl font-bold">Edit Job</h1>
        <p className="mt-3 text-lg text-gray-600 dark:text-gray-200">
          Update the job details step by step.
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
                  />
                )}
                <div className="ml-auto flex items-center gap-4">
                  {step < steps.length ? (
                    <Button
                      type="button"
                      onClick={handleContinue}
                      value="Continue"
                    />
                  ) : (
                    <Button
                      type="button"
                      onClick={handleSubmit(onSubmit)}
                      value="Update Job"
                    />
                  )}
                </div>
              </div>
            </form>
          </FormProvider>
        </div>
      </div>
    </div>
  );
};

export default JobEditPage;
