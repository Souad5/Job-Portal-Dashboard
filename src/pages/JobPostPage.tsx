import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import Stepper from "../components/stepper/Stepper";
import StepJobDetails from "../components/form/StepJobsDetails";
import StepCompanyInfo from "../components/form/StepCompanyInfo";
import StepRequirements from "../components/form/StepRequirements";
import StepReview from "../components/form/StepReview";

import { JobFormValues } from "../types/job";

export default function JobPostForm() {
  const [step, setStep] = useState(1);

  const methods = useForm<JobFormValues>({
    defaultValues: {
      type: "Full-time",
    },
  });

  const onSubmit = (data: JobFormValues) => {
    console.log("Job Posted:", data);
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className="bg-white m-4 p-10 rounded shadow-sm"
      >
        <Stepper currentStep={step} />

        {step === 1 && <StepJobDetails />}
        {step === 2 && <StepCompanyInfo />}
        {step === 3 && <StepRequirements />}
        {step === 4 && <StepReview />}

        <div className="flex justify-between mt-10">
          {step > 1 && (
            <button
              type="button"
              onClick={() => setStep(step - 1)}
              className="text-sm font-medium text-gray-600 border px-6 py-2 rounded-md cursor-pointer hover:bg-gray-50 transition-transform active:scale-95 duration-100"
            >
              Back
            </button>
          )}

          {step < 4 ? (
            <button
              type="button"
              onClick={() => setStep(step + 1)}
              className="ml-auto rounded-md bg-indigo-600 px-6 py-2 text-sm font-medium text-white cursor-pointer transition-transform active:scale-95"
            >
              Continue
            </button>
          ) : (
            <button
              type="submit"
              className="ml-auto rounded-md bg-indigo-600 px-6 py-2 text-sm font-medium text-white"
            >
              Publish Job
            </button>
          )}
        </div>
      </form>
    </FormProvider>
  );
}
